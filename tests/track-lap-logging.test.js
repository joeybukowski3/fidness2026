'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const performance = require('../js/performance-program');
const schema = require('../js/state-schema');

const ROOT = path.join(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function loadProgramData() {
  global.window = global;
  global.window.FidnessPerformanceProgram = performance;
  // eslint-disable-next-line no-eval
  eval(fs.readFileSync(path.join(ROOT, 'js/program-data.js'), 'utf8'));
  return global.window.buildProgramData({});
}

function performanceRows(day = 'Wednesday') {
  return loadProgramData().PROGRAM_TEMPLATES[performance.PROGRAM_ID].weeks[1][day];
}

function workoutKey({ week = 1, programId = performance.PROGRAM_ID, day = 'Wednesday', idx }) {
  return `w${week}_${programId}_${day}_${idx}`;
}

function formatLapTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

test('Wednesday performance mission exposes four required one-lap activities with only two timed runs', () => {
  const track = performance.getMission('Wednesday', 1).phases.find(phase => phase.title === 'Track Session');
  const required = track.activities.filter(activity => activity.required !== false);
  assert.deepEqual(required.map(activity => activity.id), [
    'p5d-wed-track-walk-1',
    'p5d-wed-track-timed-run-1',
    'p5d-wed-track-walk-2',
    'p5d-wed-track-timed-run-2'
  ]);
  assert.deepEqual(required.map(activity => activity.lengthLabel), ['1 lap', '1 lap', '1 lap', '1 lap']);
  assert.deepEqual(required.map(activity => activity.timed === true), [false, true, false, true]);
  assert.equal(track.activities.filter(activity => activity.required === false).length, 1);
  assert.equal(track.activities.some(activity => activity.durationMinutes === 7), false);
});

test('Workout rows carry outdoor lap metadata and exclude treadmill-specific schema fields', () => {
  const laps = performanceRows().filter(row => row.activityType === 'outdoor-track-lap');
  assert.equal(laps.filter(row => row.required !== false).length, 4);
  assert.ok(laps.every(row => row.lengthLabel === '1 lap'));
  assert.deepEqual(laps.filter(row => row.required !== false).map(row => row.timed === true), [false, true, false, true]);
  assert.ok(laps.every(row => row.speed === undefined));
  assert.ok(laps.every(row => row.incline === undefined));
});

test('Today and Workout lap writes resolve to the same canonical workout state key', () => {
  const rows = performanceRows();
  const idx = rows.findIndex(row => row.activityId === 'p5d-wed-track-timed-run-1');
  assert.ok(idx >= 0);
  const state = schema.migrateState({
    programId: performance.PROGRAM_ID,
    defaultProgramId: performance.PROGRAM_ID,
    week: 1,
    data: {}
  }).state;
  const key = workoutKey({ idx });

  state.data[key] = { lapTimeSeconds: 222, time: formatLapTime(222), done: true };
  assert.equal(state.data[key].time, '3:42');

  state.data[key] = { ...state.data[key], lapTimeSeconds: 215, time: formatLapTime(215) };
  assert.equal(state.data[key].time, '3:35');
  assert.equal(state.data[key].done, true);

  const hydrated = schema.migrateState(JSON.parse(JSON.stringify(state))).state;
  assert.equal(hydrated.data[key].lapTimeSeconds, 215);
  assert.equal(hydrated.data[key].time, '3:35');
  assert.equal(hydrated.data[key].done, true);
});

test('older workout state without lapTimeSeconds remains safe after hydration', () => {
  const rows = performanceRows();
  const idx = rows.findIndex(row => row.activityId === 'p5d-wed-track-timed-run-2');
  const key = workoutKey({ idx });
  const hydrated = schema.migrateState({
    programId: performance.PROGRAM_ID,
    defaultProgramId: performance.PROGRAM_ID,
    week: 1,
    data: { [key]: { done: true, time: '3:58' } }
  }).state;
  assert.equal(hydrated.data[key].done, true);
  assert.equal(hydrated.data[key].time, '3:58');
  assert.equal(hydrated.data[key].lapTimeSeconds, undefined);
});

test('inline Today and Workout renderers use shared state helpers for lap controls', () => {
  assert.match(indexHtml, /function renderTodayTrackLapControls\(mission\)/);
  assert.match(indexHtml, /placeholder\.innerHTML = renderTrackLapControlHtml\(mission\.weekday, idx, ex, s, 'today', true\)/);
  assert.match(indexHtml, /function renderExerciseInputs\(day, ex, s, nameToFind, previousWeight\)/);
  assert.match(indexHtml, /if \(isOutdoorTrackLap\(ex\)\) return renderTrackLapControlHtml\(day, ex\._idx, ex, s, 'workout', false\)/);
  assert.match(indexHtml, /const s = getExState\(mission\.weekday, idx\)/);
  assert.match(indexHtml, /setExState\(day, idx, s\)/);
});

test('track-specific renderer is selected before treadmill cardio fields', () => {
  const trackBranch = indexHtml.indexOf('if (isOutdoorTrackLap(ex)) return renderTrackLapControlHtml');
  const cardioBranch = indexHtml.indexOf('if (isCardioExercise(ex)) return `<div class="log-field"><span>Speed</span>');
  assert.ok(trackBranch >= 0);
  assert.ok(cardioBranch >= 0);
  assert.ok(trackBranch < cardioBranch);
});
