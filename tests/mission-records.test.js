'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const records = require('../js/mission-records');

const IDENTITY = {
  programId: 'performance-5day-v1',
  missionId: 'p5d-mission-monday-foundation',
  localDate: '2026-07-20',
  programWeek: 3,
  variation: 'A'
};

test('mission record IDs are stable and date scoped', () => {
  assert.equal(
    records.buildMissionRecordId(IDENTITY.programId, IDENTITY.missionId, IDENTITY.localDate),
    'mission:performance-5day-v1:p5d-mission-monday-foundation:2026-07-20'
  );
  assert.notEqual(
    records.buildMissionRecordId(IDENTITY.programId, IDENTITY.missionId, '2026-07-27'),
    records.buildMissionRecordId(IDENTITY.programId, IDENTITY.missionId, IDENTITY.localDate)
  );
});

test('Start Mission creates the minimum durable in-progress record', () => {
  const state = { missionRecords: {} };
  const record = records.startMission(state, IDENTITY, '2026-07-20T08:30:00.000Z');
  assert.deepEqual(Object.keys(record).sort(), [
    'completedAt', 'id', 'lastUpdatedAt', 'localDate', 'missionId', 'programId',
    'programWeek', 'startedAt', 'status', 'variation'
  ].sort());
  assert.equal(record.status, 'in-progress');
  assert.equal(record.startedAt, '2026-07-20T08:30:00.000Z');
  assert.equal(record.completedAt, null);
  assert.equal(records.getMissionStatus(state, IDENTITY), 'in-progress');
});

test('Resume Mission preserves the original start and refreshes last-updated time', () => {
  const state = { missionRecords: {} };
  records.startMission(state, IDENTITY, '2026-07-20T08:30:00.000Z');
  const resumed = records.resumeMission(state, IDENTITY, '2026-07-20T09:00:00.000Z');
  assert.equal(resumed.status, 'in-progress');
  assert.equal(resumed.startedAt, '2026-07-20T08:30:00.000Z');
  assert.equal(resumed.lastUpdatedAt, '2026-07-20T09:00:00.000Z');
});

test('Complete Mission preserves start time and writes completion time', () => {
  const state = { missionRecords: {} };
  records.startMission(state, IDENTITY, '2026-07-20T08:30:00.000Z');
  const completed = records.completeMission(state, IDENTITY, '2026-07-20T10:00:00.000Z');
  assert.equal(completed.status, 'completed');
  assert.equal(completed.startedAt, '2026-07-20T08:30:00.000Z');
  assert.equal(completed.completedAt, '2026-07-20T10:00:00.000Z');
  assert.equal(records.getMissionStatus(state, IDENTITY), 'completed');
});

test('mission records survive JSON refresh persistence', () => {
  const state = { missionRecords: {} };
  records.startMission(state, IDENTITY, '2026-07-20T08:30:00.000Z');
  const refreshed = JSON.parse(JSON.stringify(state));
  assert.deepEqual(records.getMissionRecord(refreshed, IDENTITY), records.getMissionRecord(state, IDENTITY));
});

test('records for the same mission remain separate across local dates', () => {
  const state = { missionRecords: {} };
  records.completeMission(state, IDENTITY, '2026-07-20T10:00:00.000Z');
  const nextWeek = { ...IDENTITY, localDate: '2026-07-27', programWeek: 4, variation: 'B' };
  records.startMission(state, nextWeek, '2026-07-27T08:30:00.000Z');
  assert.equal(Object.keys(state.missionRecords).length, 2);
  assert.equal(records.getMissionStatus(state, IDENTITY), 'completed');
  assert.equal(records.getMissionStatus(state, nextWeek), 'in-progress');
});

test('weekly schedule dates are calculated from the local calendar week', () => {
  const reference = new Date(2026, 6, 22, 4, 30);
  assert.equal(records.getWeekDateISO(reference, 'Monday'), '2026-07-20');
  assert.equal(records.getWeekDateISO(reference, 'Friday'), '2026-07-24');
  assert.equal(records.getWeekDateISO(reference, 'Sunday'), '2026-07-26');
});
