'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const performance = require('../js/performance-program');

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

test('Monday variations contain five lower-body movements and three core movements', () => {
  for (const week of [1, 2]) {
    const exercises = requiredStrength('Monday', week);
    assert.equal(exercises.filter(item => item.category === 'Core').length, 3);
    assert.equal(exercises.filter(item => item.category !== 'Core').length, 5);
    assert.equal(exercises.reduce((sum, item) => sum + item.durationMinutes, 0) <= 48, true);
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

test('Thursday variations contain four back or rear-shoulder movements and three arm movements', () => {
  for (const week of [1, 2]) {
    const exercises = requiredStrength('Thursday', week);
    assert.equal(exercises.filter(item => ['Biceps', 'Triceps'].includes(item.category)).length, 3);
    assert.equal(exercises.filter(item => !['Biceps', 'Triceps'].includes(item.category)).length, 4);
    const optional = performance.getMission('Thursday', week).phases.flatMap(phase => phase.activities).filter(item => item.required === false);
    assert.equal(optional.length, 1);
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
