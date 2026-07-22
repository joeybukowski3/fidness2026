'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const performance = require('../js/performance-program');
const schema = require('../js/state-schema');

function buildRegistry() {
  global.window = global;
  global.FidnessPerformanceProgram = performance;
  delete require.cache[require.resolve('../js/program-data')];
  require('../js/program-data');
  return global.buildProgramData({});
}

test('registry uses an explicit default instead of array position', () => {
  const registry = buildRegistry();
  assert.equal(registry.PROGRAMS[0].id, 'joey-12wk-knee-safe');
  assert.equal(registry.DEFAULT_PROGRAM_ID, 'performance-5day-v1');
  assert.ok(registry.PROGRAMS.some(program => program.id === 'joey-12wk-knee-safe'));
  assert.ok(registry.PROGRAMS.some(program => program.id === 'performance-5day-v1'));
});

test('registry resolves the known performance program exactly', () => {
  const resolution = buildRegistry().resolveProgramById('performance-5day-v1');
  assert.equal(resolution.status, 'available');
  assert.equal(resolution.available, true);
  assert.equal(resolution.selectedId, 'performance-5day-v1');
  assert.equal(resolution.program.id, 'performance-5day-v1');
});

test('registry resolves the known legacy program exactly', () => {
  const resolution = buildRegistry().resolveProgramById('joey-12wk-knee-safe');
  assert.equal(resolution.status, 'available');
  assert.equal(resolution.available, true);
  assert.equal(resolution.selectedId, 'joey-12wk-knee-safe');
  assert.equal(resolution.program.id, 'joey-12wk-knee-safe');
});

test('unknown explicit selection resolves as unavailable without a silent fallback', () => {
  const registry = buildRegistry();
  const selectedState = schema.migrateState({
    programId: 'future-custom-program',
    defaultProgramId: 'future-custom-program',
    programSelection: { source: 'user', explicitlySelected: true, selectedAt: '2026-07-01T00:00:00.000Z' }
  }).state;
  const resolution = registry.resolveProgramById(selectedState.programId);
  assert.equal(resolution.status, 'unavailable');
  assert.equal(resolution.available, false);
  assert.equal(resolution.selectedId, 'future-custom-program');
  assert.equal(resolution.program, null);
  assert.equal(selectedState.programId, 'future-custom-program');
  assert.notEqual(resolution.program?.id, registry.DEFAULT_PROGRAM_ID);
});

test('user recovery explicitly replaces an unavailable selection with a known program', () => {
  const registry = buildRegistry();
  const unavailableId = 'future-custom-program';
  const selectedState = schema.migrateState({
    programId: unavailableId,
    defaultProgramId: unavailableId,
    programSelection: { source: 'user', explicitlySelected: true, selectedAt: '2026-07-01T00:00:00.000Z' }
  }).state;
  const untouched = schema.recoverUnavailableProgramSelection(
    selectedState,
    unavailableId,
    'not-registered',
    registry.PROGRAMS.map(program => program.id)
  );
  assert.equal(untouched.programId, unavailableId);

  const recovered = schema.recoverUnavailableProgramSelection(
    selectedState,
    unavailableId,
    registry.DEFAULT_PROGRAM_ID,
    registry.PROGRAMS.map(program => program.id),
    { now: '2026-07-17T12:00:00.000Z' }
  );
  assert.equal(selectedState.programId, unavailableId);
  assert.equal(recovered.programId, registry.DEFAULT_PROGRAM_ID);
  assert.equal(recovered.defaultProgramId, registry.DEFAULT_PROGRAM_ID);
  assert.equal(recovered.programSelection.explicitlySelected, true);
  assert.equal(registry.resolveProgramById(recovered.programId).available, true);
});

test('performance program has the explicit stable program ID and is ongoing', () => {
  assert.equal(performance.PROGRAM_ID, 'performance-5day-v1');
  assert.equal(performance.PROGRAM.id, 'performance-5day-v1');
  assert.equal(performance.PROGRAM.ongoing, true);
  assert.equal(performance.PROGRAM.reviewIntervalWeeks, 6);
});

test('program validator accepts every required 90-minute mission', () => {
  assert.deepEqual(performance.validateProgram(), []);
  for (const weekday of performance.REQUIRED_WEEKDAYS) {
    for (const week of [1, 2]) {
      const mission = performance.getMission(weekday, week);
      assert.equal(performance.timeToMinutes(mission.startTime), 270);
      assert.equal(performance.timeToMinutes(mission.endTime), 360);
      assert.equal(performance.timeToMinutes(mission.endTime) - performance.timeToMinutes(mission.startTime), 90);
      assert.equal(mission.phases[0].startTime, '04:30');
      assert.equal(mission.phases.at(-1).endTime, '06:00');
    }
  }
});

test('odd weeks use A and even weeks use B without an end week', () => {
  assert.equal(performance.variationForWeek(1), 'A');
  assert.equal(performance.variationForWeek(2), 'B');
  assert.equal(performance.variationForWeek(3), 'A');
  assert.equal(performance.variationForWeek(100), 'B');
  assert.equal(performance.getMission('Tuesday', 101).variation, 'A');
  assert.equal(performance.getMission('Tuesday', 102).variation, 'B');
});

function requiredStrength(day, week) {
  return performance.getMission(day, week).phases
    .flatMap(phase => phase.activities)
    .filter(item => item.type === 'strength' && item.required !== false);
}

test('Monday includes track plus chest, biceps, and core strength', () => {
  for (const week of [1, 2]) {
    const mission = performance.getMission('Monday', week);
    const track = mission.phases.find(phase => phase.title === 'Track Session');
    assert.ok(track);
    assert.equal(track.startTime, '04:30');
    assert.equal(track.endTime, '05:00');
    assert.deepEqual(track.activities.map(item => item.lengthLabel), ['1 lap', '1 lap', '1 lap', '1 lap']);
    const exercises = requiredStrength('Monday', week);
    assert.ok(exercises.filter(item => item.category === 'Core').length >= 3);
    assert.equal(exercises.filter(item => item.category === 'Biceps').length, 2);
    assert.equal(exercises.filter(item => !['Core', 'Biceps'].includes(item.category)).length, 3);
    assert.equal(exercises.reduce((sum, item) => sum + item.durationMinutes, 0), 45);
  }
});

test('Tuesday variations contain four press or shoulder movements and three direct bicep movements', () => {
  for (const week of [1, 2]) {
    const exercises = requiredStrength('Tuesday', week);
    assert.equal(exercises.filter(item => item.category === 'Biceps').length, 3);
    assert.equal(exercises.filter(item => item.category !== 'Biceps').length, 4);
    const optional = performance.getMission('Tuesday', week).phases.flatMap(phase => phase.activities).filter(item => item.required === false);
    assert.equal(optional.length, 1);
    assert.equal(optional[0].durationMinutes, 0);
  }
});

test('Thursday includes track plus back, shoulders, and triceps strength', () => {
  for (const week of [1, 2]) {
    const mission = performance.getMission('Thursday', week);
    const track = mission.phases.find(phase => phase.title === 'Track Session');
    assert.ok(track);
    assert.equal(track.startTime, '04:30');
    assert.equal(track.endTime, '05:00');
    assert.deepEqual(track.activities.map(item => item.lengthLabel), ['1 lap', '1 lap', '1 lap', '1 lap']);
    const exercises = requiredStrength('Thursday', week);
    assert.equal(exercises.filter(item => item.category === 'Triceps').length, 2);
    assert.equal(exercises.some(item => item.category === 'Biceps'), false);
    assert.equal(exercises.reduce((sum, item) => sum + item.durationMinutes, 0), 45);
  }
});

test('every required strength exercise has stable identity and RIR guidance', () => {
  for (const weekday of ['Monday', 'Tuesday', 'Thursday']) {
    for (const week of [1, 2]) {
      for (const item of requiredStrength(weekday, week)) {
        assert.match(item.id, /^p5d-/);
        assert.equal(typeof item.exerciseId, 'string');
        assert.ok(item.exerciseId.length > 0);
        assert.ok(item.targetRir);
      }
    }
  }
});

test('Wednesday is track-based and required fasting labels are correct', () => {
  const wednesday = performance.getMission('Wednesday', 1);
  const friday = performance.getMission('Friday', 1);
  assert.equal(wednesday.locationType, 'outdoor-track');
  assert.notEqual(wednesday.locationType, 'gym');
  assert.deepEqual([wednesday.fasting.type, wednesday.fasting.required], ['16:8', true]);
  assert.deepEqual([friday.fasting.type, friday.fasting.required], ['16:8', true]);
  const track = wednesday.phases.find(phase => phase.title === 'Track Session');
  const required = track.activities.filter(item => item.required !== false);
  assert.deepEqual(required.map(item => item.title), [
    'Lap 1 — Brisk Walk',
    'Lap 2 — Timed Light Run/Jog',
    'Lap 3 — Brisk Walk',
    'Lap 4 — Timed Light Run/Jog'
  ]);
  assert.deepEqual(required.map(item => item.lengthLabel), ['1 lap', '1 lap', '1 lap', '1 lap']);
  assert.deepEqual(required.map(item => item.timed === true), [false, true, false, true]);
  assert.equal(track.activities.filter(item => item.required === false).length, 1);
  assert.equal(track.activities.some(item => item.durationMinutes === 7), false);
});

test('weekend missions and fasting remain optional', () => {
  for (const weekday of ['Saturday', 'Sunday']) {
    const mission = performance.getMission(weekday, 1);
    assert.equal(mission.required, false);
    assert.equal(mission.fasting.required, false);
    assert.match(mission.fasting.notes, /not a failure/i);
  }
});

test('legacy adapter preserves stable IDs and marks finishers optional', () => {
  const rows = performance.toLegacyWorkout('Tuesday', 1);
  assert.ok(rows.length > 0);
  assert.ok(rows.every(row => row.activityId && row.exerciseId && row.phaseId));
  const finisher = rows.find(row => row.required === false);
  assert.ok(finisher);
  assert.equal(finisher.phase, 'Bonus (Optional)');
});

test('legacy adapter carries outdoor track lap metadata into Workout rows', () => {
  const rows = performance.toLegacyWorkout('Wednesday', 1);
  const laps = rows.filter(row => row.activityType === 'outdoor-track-lap');
  assert.equal(laps.filter(row => row.required !== false).length, 4);
  assert.deepEqual(laps.filter(row => row.required !== false).map(row => row.reps), ['1 lap', '1 lap', '1 lap', '1 lap']);
  assert.deepEqual(laps.filter(row => row.required !== false).map(row => row.timed === true), [false, true, false, true]);
  assert.ok(laps.every(row => row.outdoorTrack === true));
  assert.ok(laps.every(row => row.lengthLabel === '1 lap'));
  assert.equal(laps.some(row => row.budgetMinutes === 7), false);
});
