'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const schema = require('../js/state-schema');

const NOW = new Date(2026, 6, 17, 12, 0, 0);

test('fresh users receive the performance default anchored to the current Monday', () => {
  const result = schema.migrateState({}, { now: NOW });
  assert.equal(result.decision, 'assign-performance-default-fresh-user');
  assert.equal(result.state.schemaVersion, 2);
  assert.equal(result.state.programId, schema.DEFAULT_PROGRAM_ID);
  assert.equal(result.state.defaultProgramId, schema.DEFAULT_PROGRAM_ID);
  assert.equal(result.state.programStarts[schema.DEFAULT_PROGRAM_ID], '2026-07-13');
  assert.equal(result.state.programSelection.source, 'system-default');
  assert.equal(result.state.programSelection.explicitlySelected, false);
  assert.equal(result.backupRecommended, false);
});

test('unused legacy installs migrate program assignment while preserving unrelated records', () => {
  const history = [{ exercise: 'Cable Curl', weight: '40', reps: '12', ts: '2026-07-01T10:00:00.000Z' }];
  const diagrams = { 'cable-curl': 'data:image/jpeg;base64,abc' };
  const photos = [{ id: 'arm-progress-1', localRef: 'indexeddb://arm-progress-1' }];
  const input = {
    programId: schema.LEGACY_PROGRAM_ID,
    defaultProgramId: schema.LEGACY_PROGRAM_ID,
    dark: true,
    history,
    weightLog: [{ weight: 200, ts: '2026-07-01T10:00:00.000Z' }],
    customDiagrams: diagrams,
    progressPhotos: photos,
    ui: { phaseCollapsed: { x: true } }
  };
  const result = schema.migrateState(input, { now: NOW });
  assert.equal(result.decision, 'assign-performance-default-unused-install');
  assert.equal(result.state.programId, schema.DEFAULT_PROGRAM_ID);
  assert.deepEqual(result.state.history, history);
  assert.deepEqual(result.state.customDiagrams, diagrams);
  assert.deepEqual(result.state.progressPhotos, photos);
  assert.equal(result.state.dark, true);
  assert.equal(result.backupRecommended, true);
  assert.equal(result.state.migration.performanceFoundationV1.backupKey, schema.BACKUP_KEY);
});

test('a program start date preserves an established legacy plan', () => {
  const input = {
    programId: schema.LEGACY_PROGRAM_ID,
    defaultProgramId: schema.LEGACY_PROGRAM_ID,
    programStarts: { [schema.LEGACY_PROGRAM_ID]: '2026-06-01' }
  };
  const result = schema.migrateState(input, { now: NOW });
  assert.equal(result.decision, 'preserve-established-plan');
  assert.equal(result.state.programId, schema.LEGACY_PROGRAM_ID);
  assert.equal(result.state.defaultProgramId, schema.LEGACY_PROGRAM_ID);
  assert.deepEqual(result.establishedReasons, ['program-start-date']);
});

test('saved workout state preserves the active program', () => {
  const input = {
    programId: schema.LEGACY_PROGRAM_ID,
    defaultProgramId: schema.LEGACY_PROGRAM_ID,
    data: { 'w1_joey-12wk-knee-safe_Monday_0': { done: true, weight: '100' } }
  };
  const result = schema.migrateState(input, { now: NOW });
  assert.equal(result.state.programId, schema.LEGACY_PROGRAM_ID);
  assert.deepEqual(result.establishedReasons, ['saved-workout-state']);
  assert.deepEqual(result.state.data, input.data);
});

test('legacy unscoped workout state is conservatively treated as established', () => {
  const input = {
    programId: schema.LEGACY_PROGRAM_ID,
    data: { w1_Monday_0: { done: true } }
  };
  const result = schema.migrateState(input, { now: NOW });
  assert.equal(result.decision, 'preserve-established-plan');
  assert.equal(result.state.programId, schema.LEGACY_PROGRAM_ID);
});

test('coach overrides preserve the associated plan and override data', () => {
  const overrides = { 'joey-12wk-knee-safe|1|Tuesday': { title: 'Knee-safe adjustment', exercises: [] } };
  const result = schema.migrateState({ programId: schema.LEGACY_PROGRAM_ID, coachOverrides: overrides }, { now: NOW });
  assert.equal(result.state.programId, schema.LEGACY_PROGRAM_ID);
  assert.deepEqual(result.state.coachOverrides, overrides);
  assert.deepEqual(result.establishedReasons, ['coach-overrides']);
});

test('explicit selection preserves known and unknown program IDs', () => {
  for (const programId of [schema.LEGACY_PROGRAM_ID, 'future-custom-program']) {
    const result = schema.migrateState({
      programId,
      defaultProgramId: programId,
      programSelection: { source: 'user', explicitlySelected: true, selectedAt: '2026-07-01T00:00:00.000Z' }
    }, { now: NOW });
    assert.equal(result.state.programId, programId);
    assert.equal(result.state.defaultProgramId, programId);
    assert.equal(result.state.programSelection.source, 'user');
  }
});

test('schema migration is idempotent and never recommends a second backup', () => {
  const first = schema.migrateState({ dark: true }, { now: NOW });
  const second = schema.migrateState(first.state, { now: new Date(2026, 6, 18, 12) });
  assert.deepEqual(second.state, first.state);
  assert.equal(second.backupRecommended, false);
});

test('explicit program selection can update active and default independently', () => {
  const fresh = schema.migrateState({}, { now: NOW }).state;
  const activeOnly = schema.markProgramSelected(fresh, schema.LEGACY_PROGRAM_ID, { now: NOW });
  assert.equal(activeOnly.programId, schema.LEGACY_PROGRAM_ID);
  assert.equal(activeOnly.defaultProgramId, schema.DEFAULT_PROGRAM_ID);
  assert.equal(activeOnly.programSelection.explicitlySelected, true);

  const defaultOnly = schema.markProgramSelected(activeOnly, schema.DEFAULT_PROGRAM_ID, { now: NOW, setDefault: true, activate: false });
  assert.equal(defaultOnly.programId, schema.LEGACY_PROGRAM_ID);
  assert.equal(defaultOnly.defaultProgramId, schema.DEFAULT_PROGRAM_ID);
});

test('sync serialization strips journal response text but keeps non-sensitive completion data', () => {
  const input = schema.migrateState({}, { now: NOW }).state;
  input.privateJournal = { secret: 'local only' };
  input.activityRecords.entry = {
    id: 'entry',
    activityType: 'journal',
    status: 'completed',
    completedAt: '2026-07-17T10:00:00.000Z',
    responseText: 'private response',
    metadata: { journalText: 'also private', mood: 4 }
  };
  const syncable = schema.toSyncableState(input);
  assert.equal(syncable.privateJournal, undefined);
  assert.equal(syncable.activityRecords.entry.responseText, undefined);
  assert.equal(syncable.activityRecords.entry.metadata.journalText, undefined);
  assert.equal(syncable.activityRecords.entry.status, 'completed');
  assert.equal(syncable.activityRecords.entry.metadata.mood, 4);
});

test('invalid serialized state safely becomes a fresh state', () => {
  assert.deepEqual(schema.safeParseState('{broken'), {});
  const result = schema.migrateState('{broken', { now: NOW });
  assert.equal(result.state.programId, schema.DEFAULT_PROGRAM_ID);
});
