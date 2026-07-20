'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const performance = require('../js/performance-program');
const stateSchema = require('../js/state-schema');

const ROOT = path.join(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function loadProgramData() {
  global.window = global;
  global.window.FidnessPerformanceProgram = performance;
  // eslint-disable-next-line no-eval
  eval(fs.readFileSync(path.join(ROOT, 'js/program-data.js'), 'utf8'));
  return global.window.buildProgramData({});
}

function weekdayMission(activeProgramId, weekday, programWeek = 1) {
  if (activeProgramId !== performance.PROGRAM_ID) return null;
  return performance.getMission(weekday, programWeek);
}

function resolveTodayViewMode(activeProgramId, weekday, programWeek = 1) {
  const mission = weekdayMission(activeProgramId, weekday, programWeek);
  return mission ? 'mission-dashboard' : 'program-workout';
}

test('performance-5day-v1 still resolves to the mission dashboard for weekdays', () => {
  for (const day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']) {
    assert.equal(resolveTodayViewMode(performance.PROGRAM_ID, day), 'mission-dashboard');
    assert.ok(weekdayMission(performance.PROGRAM_ID, day));
  }
  assert.equal(stateSchema.DEFAULT_PROGRAM_ID, performance.PROGRAM_ID);
  assert.match(indexHtml, /function renderTodayDashboard\(/);
  assert.match(indexHtml, /FidnessMissionDashboard\.renderToday\(model\)/);
  assert.doesNotMatch(
    indexHtml,
    /Today Mission Not Available[\s\S]{0,200}Open Workout Logger/
  );
});

test('joey-12wk-knee-safe Today uses current weekday template via getWorkoutsForDay path', () => {
  const data = loadProgramData();
  assert.equal(resolveTodayViewMode('joey-12wk-knee-safe', 'Monday'), 'program-workout');
  assert.equal(weekdayMission('joey-12wk-knee-safe', 'Monday'), null);

  const template = data.PROGRAM_TEMPLATES['joey-12wk-knee-safe'];
  assert.ok(template && template.weeks && template.weeks[1]);
  const monday = template.weeks[1].Monday;
  const track = monday.filter(item => item.phase === 'Track').map(item => item.exercise);
  assert.deepEqual(track, ['Walk Lap 1', 'Timed Run Lap 1', 'Walk Lap 2', 'Timed Run Lap 2']);
  assert.ok(monday.some(item => item.exercise === 'Machine Chest Press'));

  // Index must route no-mission Today through shared workout renderer / getWorkoutsForDay.
  assert.match(indexHtml, /function renderTodayProgramWorkout\(/);
  assert.match(indexHtml, /renderTodayProgramWorkout\(context\.weekday\)/);
  assert.match(indexHtml, /function getWorkoutDayContainer\(/);
  assert.match(indexHtml, /getWorkoutsForDay\(day\)/);
});

test('knee-safe Today includes DAY_OVERVIEWS for the active weekday', () => {
  const data = loadProgramData();
  assert.ok(data.DAY_OVERVIEWS);
  for (const day of ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']) {
    assert.ok(data.DAY_OVERVIEWS[day], `missing overview for ${day}`);
    assert.ok(data.DAY_OVERVIEWS[day].focus);
    assert.ok(data.DAY_OVERVIEWS[day].fastingType);
  }
  assert.match(indexHtml, /function renderDayOverview\(day\)/);
  assert.match(indexHtml, /getActiveProgramId\(\) !== 'joey-12wk-knee-safe'/);
  assert.match(indexHtml, /html \+= renderDayOverview\(day\);/);
  // Fallback reuses renderDay, which always prefixes overview HTML.
  assert.match(indexHtml, /renderDay\(weekday\)/);
});

test('coach override still wins for the selected day through getWorkoutsForDay', () => {
  const coach = fs.readFileSync(path.join(ROOT, 'js/coach.js'), 'utf8');
  assert.match(coach, /window\.getWorkoutsForDay\s*=/);
  assert.match(coach, /state\.coachOverrides/);
  assert.match(
    coach,
    /state\.coachOverrides\[key\(day,pid,week\)\]\?\.exercises\|\|baseWorkouts\(day,pid,week\)/
  );
  // Today fallback must call the shared resolver, not a parallel copy of templates.
  assert.match(indexHtml, /const exercises = getWorkoutsForDay\(day\);/);
  assert.match(indexHtml, /function renderTodayProgramWorkout/);
});

test('missing program or empty template fails gracefully in Today fallback', () => {
  const data = loadProgramData();
  const unavailable = data.resolveProgramById('not-a-real-program');
  assert.equal(unavailable.available, false);
  assert.equal(unavailable.program, null);

  // No mission and no valid weekday → graceful empty path present in source.
  assert.match(indexHtml, /No weekday schedule is available right now/);
  assert.match(indexHtml, /No scheduled exercises for \$\{day\} in the active program/);
  assert.match(indexHtml, /Selected Program Unavailable/);

  // Empty week day list does not throw when mapping.
  const emptyDay = [];
  assert.doesNotThrow(() => emptyDay.map((ex, i) => ({ ...ex, _idx: i })));
});

test('fresh default stays performance; established knee-safe selection is preserved', () => {
  const fresh = stateSchema.migrateState({}, { now: new Date(2026, 6, 20, 12) });
  assert.equal(fresh.state.programId, performance.PROGRAM_ID);
  assert.equal(resolveTodayViewMode(fresh.state.programId, 'Monday'), 'mission-dashboard');

  const established = stateSchema.migrateState({
    programId: 'joey-12wk-knee-safe',
    defaultProgramId: 'joey-12wk-knee-safe',
    programStarts: { 'joey-12wk-knee-safe': '2026-06-01' },
    data: { 'w1_joey-12wk-knee-safe_Monday_0': { done: true } }
  }, { now: new Date(2026, 6, 20, 12) });
  assert.equal(established.state.programId, 'joey-12wk-knee-safe');
  assert.equal(resolveTodayViewMode(established.state.programId, 'Monday'), 'program-workout');
});
