'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const performance = require('../js/performance-program');
const dashboard = require('../js/mission-dashboard');
const records = require('../js/mission-records');
const stateSchema = require('../js/state-schema');

function missionModel(weekday, week = 1, record = null) {
  const mission = performance.getMission(weekday, week);
  return dashboard.buildMissionModel({
    program: performance.PROGRAM,
    mission,
    record,
    localDate: records.getWeekDateISO('2026-07-20', weekday),
    dateLabel: weekday,
    programWeek: week
  });
}

test('Monday through Friday render the correct mission titles, locations, times, and fasting data', () => {
  const expected = {
    Monday: ['Track + Push Foundation', 'Outdoor track and Planet Fitness', '12-hour overnight'],
    Tuesday: ['Build Muscle', 'Planet Fitness', '12-hour overnight'],
    Wednesday: ['Build Endurance', 'Track across from Planet Fitness or another outdoor track', '16:8'],
    Thursday: ['Build Strength', 'Outdoor track and Planet Fitness', '12-hour overnight'],
    Friday: ['Recover and Reflect', 'Home, track, neighborhood, gym stretching area, or another low-intensity setting', '16:8']
  };
  Object.entries(expected).forEach(([weekday, [title, location, fasting]]) => {
    const model = missionModel(weekday);
    assert.equal(model.name, title);
    assert.equal(model.location, location);
    assert.equal(model.timeWindow, '4:30 AM–6:00 AM');
    assert.equal(model.requiredMinutes, 90);
    assert.match(model.fasting, new RegExp(fasting));
  });
});

test('Wednesday is a track mission with four required laps and optional cooldown', () => {
  const model = missionModel('Wednesday');
  assert.equal(model.locationType, 'outdoor-track');
  assert.equal(model.isWednesdayTrack, true);
  assert.notEqual(model.location, 'Planet Fitness');
  const track = model.phases.find(phase => phase.title === 'Track Session');
  const required = track.activities.filter(activity => activity.required);
  assert.deepEqual(required.map(activity => activity.title), [
    'Lap 1 — Brisk Walk',
    'Lap 2 — Timed Light Run/Jog',
    'Lap 3 — Brisk Walk',
    'Lap 4 — Timed Light Run/Jog'
  ]);
  assert.deepEqual(required.map(activity => activity.target), [
    '1 lap',
    '1 lap • record lap time',
    '1 lap',
    '1 lap • record lap time'
  ]);
  assert.equal(track.activities.filter(activity => activity.optional).length, 1);
  assert.equal(track.activities.find(activity => activity.optional).title, 'Optional Cooldown Walk');
  assert.equal(track.activities.filter(activity => activity.target.includes('record lap time')).length, 2);
  assert.equal(track.activities.some(activity => /7 min/.test(activity.target)), false);
  assert.match(dashboard.renderToday(model), /not a weekly race/i);
  assert.equal((dashboard.renderToday(model).match(/data-track-lap-control=/g) || []).length, 5);
});

test('Friday shows meditation, guided mobility, easy walking, reflection prompts, and weekly completion', () => {
  const model = missionModel('Friday');
  assert.equal(model.isFridayRecovery, true);
  assert.match(model.meditation, /10-minute meditation/);
  assert.deepEqual(model.phases.map(phase => phase.title), [
    'Meditation', 'Guided Mobility', 'Easy Walk', 'Weekly Reflection', 'Weekly Completion'
  ]);
  const reflection = model.phases.find(phase => phase.title === 'Weekly Reflection').activities[0];
  assert.equal(reflection.prompts.length, 7);
  const html = dashboard.renderToday(model);
  assert.match(html, /Private response entry is intentionally not collected/);
  assert.match(html, /Calculated weekly totals are intentionally deferred/);
  assert.doesNotMatch(html, /textarea|contenteditable/i);
});

test('A/B variation is visible and strength activities expose read-only targets and RIR', () => {
  const tuesdayA = missionModel('Tuesday', 1);
  const tuesdayB = missionModel('Tuesday', 2);
  assert.equal(tuesdayA.variation, 'A');
  assert.equal(tuesdayB.variation, 'B');
  assert.notEqual(
    tuesdayA.phases.find(phase => phase.title === 'Strength Training').activities[0].title,
    tuesdayB.phases.find(phase => phase.title === 'Strength Training').activities[0].title
  );
  const activity = tuesdayA.phases.find(phase => phase.title === 'Strength Training').activities[0];
  assert.match(activity.target, /3 sets/);
  assert.match(activity.rir, /RIR/);
  const html = dashboard.renderToday(tuesdayA);
  assert.match(html, /RIR guidance/);
  assert.doesNotMatch(html, /name="rir"|data-rir-input/);
});

test('required work and optional finishers are distinguished', () => {
  for (const weekday of ['Tuesday']) {
    const model = missionModel(weekday);
    const activities = model.phases.flatMap(phase => phase.activities);
    assert.ok(activities.some(activity => activity.required));
    assert.equal(activities.filter(activity => activity.optional).length, 1);
    assert.match(dashboard.renderToday(model), /Optional finisher/);
  }
});

test('Today action labels reflect not-started, in-progress, and completed mission records', () => {
  assert.equal(missionModel('Monday').primaryAction, 'Start Mission');
  assert.equal(missionModel('Monday', 1, { status: 'in-progress' }).primaryAction, 'Resume Mission');
  assert.equal(missionModel('Monday', 1, { status: 'completed' }).primaryAction, 'View Completed Mission');
});

test('mobile-first Today source order puts the timeline before collapsed guidance and sticky actions', () => {
  const html = dashboard.renderToday(missionModel('Monday'));
  const heroIndex = html.indexOf('class="mission-hero"');
  const timelineIndex = html.indexOf('id="todayMissionTimeline"');
  const guidanceIndex = html.indexOf('id="todayMissionGuidance"');
  const stickyIndex = html.indexOf('class="mission-sticky-actions"');
  assert.ok(heroIndex >= 0);
  assert.ok(heroIndex < timelineIndex);
  assert.ok(timelineIndex < guidanceIndex);
  assert.ok(guidanceIndex < stickyIndex);
  assert.match(html, /Today’s Guidance/);
});

test('mobile sticky actions reflect mission status and strength-day logger priority', () => {
  const notStarted = dashboard.renderToday(missionModel('Monday'));
  const strengthInProgress = dashboard.renderToday(missionModel('Monday', 1, { status: 'in-progress' }));
  const trackInProgress = dashboard.renderToday(missionModel('Wednesday', 1, { status: 'in-progress' }));
  const completed = dashboard.renderToday(missionModel('Friday', 1, { status: 'completed' }));
  assert.match(notStarted, /mission-sticky-actions[\s\S]*Start Mission/);
  assert.match(strengthInProgress, /mission-sticky-actions[\s\S]*Open Workout Logger[\s\S]*Complete Mission/);
  assert.match(trackInProgress, /mission-sticky-actions[\s\S]*Open Workout Logger[\s\S]*Complete Mission/);
  assert.match(completed, /mission-sticky-actions[\s\S]*View Completed Mission[\s\S]*Reopen Mission/);
});

test('weekly schedule previews all weekdays, status labels, and optional weekends without mutation', () => {
  const state = { missionRecords: {} };
  const monday = performance.getMission('Monday', 1);
  records.completeMission(state, {
    programId: monday.programId,
    missionId: monday.id,
    localDate: '2026-07-20',
    programWeek: 1,
    variation: 'A'
  }, '2026-07-20T10:00:00.000Z');
  const before = JSON.stringify(state);
  const schedule = dashboard.buildScheduleModel({
    programWeek: 1,
    referenceDate: '2026-07-22',
    todayDate: '2026-07-22',
    previewWeekday: 'Wednesday',
    getMission: performance.getMission,
    getWeekDateISO: records.getWeekDateISO,
    getRecord: (mission, localDate) => records.getMissionRecord(state, {
      programId: mission.programId,
      missionId: mission.id,
      localDate
    })
  });
  assert.equal(schedule.weekdays.length, 5);
  assert.equal(schedule.weekend.length, 2);
  assert.ok(schedule.weekdays.find(day => day.weekday === 'Monday').labels.includes('Completed'));
  assert.ok(schedule.weekdays.find(day => day.weekday === 'Wednesday').labels.includes('Today'));
  assert.ok(schedule.weekend.every(day => day.labels.includes('Optional')));
  assert.ok(schedule.weekend.every(day => day.mission.required === false));
  assert.equal(JSON.stringify(state), before);
});

test('optional weekend missions use flexible timing and never imply required duration', () => {
  for (const weekday of ['Saturday', 'Sunday']) {
    const model = missionModel(weekday);
    assert.equal(model.isWeekendOptional, true);
    assert.equal(model.timeWindow, 'Flexible');
    assert.equal(model.requiredMinutes, 0);
    assert.match(model.fasting, /Optional/);
    assert.match(dashboard.renderToday(model), /No required duration/);
  }
});

test('schedule rendering includes previews and does not expose completion controls', () => {
  const schedule = dashboard.buildScheduleModel({
    programWeek: 2,
    referenceDate: '2026-07-22',
    todayDate: '2026-07-22',
    previewWeekday: 'Friday',
    getMission: performance.getMission,
    getWeekDateISO: records.getWeekDateISO,
    getRecord: () => null
  });
  const html = dashboard.renderSchedule(schedule, missionModel('Friday', 2));
  assert.match(html, /Week 2 Schedule/);
  assert.match(html, /Variation B/);
  assert.match(html, /Recover and Reflect/);
  assert.match(html, /Optional weekend recovery/);
  assert.equal((html.match(/Back to Weekly Schedule/g) || []).length, 2);
  assert.doesNotMatch(html, /startTodayMission|completeTodayMission/);
});

test('schedule preview phase ids do not collide with Today phase ids', () => {
  const today = dashboard.renderToday(missionModel('Wednesday', 1));
  const schedule = dashboard.buildScheduleModel({
    programWeek: 1,
    referenceDate: '2026-07-20',
    todayDate: '2026-07-22',
    previewWeekday: 'Wednesday',
    getMission: performance.getMission,
    getWeekDateISO: records.getWeekDateISO,
    getRecord: () => null
  });
  const html = `${today}${dashboard.renderSchedule(schedule, missionModel('Wednesday', 1))}`;
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  assert.deepEqual(duplicateIds, []);
  assert.match(html, /id="mission-phase-p5d-wed-track"/);
  assert.match(html, /id="mission-phase-schedule-preview-p5d-wed-track"/);
});

test('core mobile navigation CSS supports five touch-safe tabs without Coach-injected nav rules', () => {
  const root = path.join(__dirname, '..');
  const css = fs.readFileSync(path.join(root, 'css', 'mission-dashboard.css'), 'utf8');
  const coach = fs.readFileSync(path.join(root, 'js', 'coach.js'), 'utf8');
  assert.match(css, /@media\(max-width:640px\)[\s\S]*\.top-tab\{[^}]*flex:1 1 20%[^}]*min-height:48px/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
  assert.match(css, /\.mission-sticky-actions\.is-active/);
  assert.doesNotMatch(coach, /\.top-tabs-inner\{overflow-x:auto/);
});

test('legacy and unknown programs remain compatible with exact registry resolution', () => {
  global.window = global;
  global.FidnessPerformanceProgram = performance;
  delete require.cache[require.resolve('../js/program-data')];
  require('../js/program-data');
  const registry = global.buildProgramData({});
  assert.equal(registry.resolveProgramById('joey-12wk-knee-safe').status, 'available');
  assert.equal(registry.resolveProgramById('unknown-program').status, 'unavailable');
  assert.equal(registry.resolveProgramById('unknown-program').program, null);
});

test('private-data sync rules remain unchanged while mission completion can sync', () => {
  const state = stateSchema.migrateState({}).state;
  state.missionRecords.example = {
    id: 'example', status: 'completed', missionCompleted: true, completedAt: '2026-07-20T10:00:00.000Z'
  };
  state.activityRecords.private = {
    status: 'completed', journalCompleted: true, moodBefore: 2, reflectionText: 'private'
  };
  const syncable = stateSchema.toSyncableState(state);
  assert.equal(syncable.missionRecords.example.status, 'completed');
  assert.equal(syncable.missionRecords.example.completedAt, '2026-07-20T10:00:00.000Z');
  assert.equal(syncable.activityRecords.private.journalCompleted, true);
  assert.equal(syncable.activityRecords.private.moodBefore, undefined);
  assert.equal(syncable.activityRecords.private.reflectionText, undefined);
});
