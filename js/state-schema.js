(function initStateSchema(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FidnessStateSchema = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function buildStateSchemaModule() {
  'use strict';

  const SCHEMA_VERSION = 2;
  const DEFAULT_PROGRAM_ID = 'performance-5day-v1';
  const LEGACY_PROGRAM_ID = 'joey-12wk-knee-safe';
  const BACKUP_KEY = 'wt_state_backup_schema_v1';
  const PRIVATE_JOURNAL_KEY = 'wt_private_journal_v1';
  const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Weight Log'];

  const clone = value => JSON.parse(JSON.stringify(value));

  function safeParseState(raw) {
    if (!raw) return {};
    if (typeof raw === 'object') return clone(raw);
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  function formatLocalISO(date) {
    const value = date instanceof Date ? date : new Date(date);
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function currentWeekMondayISO(now = new Date()) {
    const date = now instanceof Date ? new Date(now.getTime()) : new Date(now);
    const mondayOffset = (date.getDay() + 6) % 7;
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - mondayOffset);
    return formatLocalISO(date);
  }

  function isNonEmptyObject(value) {
    return !!value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0;
  }

  function establishedPlanReasons(input) {
    const state = input && typeof input === 'object' ? input : {};
    const reasons = [];
    const selection = state.programSelection || {};
    if (selection.explicitlySelected === true || selection.source === 'user') reasons.push('explicit-program-selection');
    if (isNonEmptyObject(state.programStarts) && Object.values(state.programStarts).some(Boolean)) reasons.push('program-start-date');
    if (isNonEmptyObject(state.data)) reasons.push('saved-workout-state');
    if (isNonEmptyObject(state.coachOverrides)) reasons.push('coach-overrides');
    return reasons;
  }

  function hasEstablishedPlan(input) {
    return establishedPlanReasons(input).length > 0;
  }

  function ensureRecordMaps(state) {
    if (!isNonEmptyObject(state.missionRecords)) state.missionRecords = state.missionRecords && typeof state.missionRecords === 'object' ? state.missionRecords : {};
    if (!isNonEmptyObject(state.activityRecords)) state.activityRecords = state.activityRecords && typeof state.activityRecords === 'object' ? state.activityRecords : {};
    if (!isNonEmptyObject(state.setRecords)) state.setRecords = state.setRecords && typeof state.setRecords === 'object' ? state.setRecords : {};
    if (!isNonEmptyObject(state.metricRecords)) state.metricRecords = state.metricRecords && typeof state.metricRecords === 'object' ? state.metricRecords : {};
  }

  function migrateState(input, options = {}) {
    const original = safeParseState(input);
    const state = clone(original);
    const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());
    const nowISO = now.toISOString();
    const previousVersion = Number(state.schemaVersion) || 1;
    const alreadyMigrated = previousVersion >= SCHEMA_VERSION && !!state.migration?.performanceFoundationV1;
    const establishedReasons = establishedPlanReasons(state);
    const established = establishedReasons.length > 0;
    const hadState = Object.keys(original).length > 0;
    let decision = state.migration?.performanceFoundationV1?.decision || '';

    if (!alreadyMigrated) {
      if (established) {
        decision = 'preserve-established-plan';
        state.programId = state.programId || state.defaultProgramId || LEGACY_PROGRAM_ID;
        state.defaultProgramId = state.defaultProgramId || state.programId;
        state.programSelection = {
          source: state.programSelection?.source === 'user' ? 'user' : 'system-default',
          explicitlySelected: state.programSelection?.explicitlySelected === true,
          selectedAt: state.programSelection?.selectedAt || nowISO,
          migrationDecision: decision
        };
      } else {
        decision = hadState ? 'assign-performance-default-unused-install' : 'assign-performance-default-fresh-user';
        state.programId = DEFAULT_PROGRAM_ID;
        state.defaultProgramId = DEFAULT_PROGRAM_ID;
        state.programStarts = state.programStarts && typeof state.programStarts === 'object' ? state.programStarts : {};
        if (!state.programStarts[DEFAULT_PROGRAM_ID]) state.programStarts[DEFAULT_PROGRAM_ID] = currentWeekMondayISO(now);
        state.programSelection = {
          source: 'system-default',
          explicitlySelected: false,
          selectedAt: nowISO,
          migrationDecision: decision
        };
      }
    }

    state.schemaVersion = SCHEMA_VERSION;
    state.week = Math.max(1, parseInt(state.week, 10) || 1);
    state.dark = state.dark === true;
    state.day = WEEKDAYS.includes(state.day) ? state.day : 'Monday';
    state.activeWorkoutTab = ['pre', 'main', 'bonus'].includes(state.activeWorkoutTab) ? state.activeWorkoutTab : 'pre';
    state.lastAccessedDate = typeof state.lastAccessedDate === 'string' ? state.lastAccessedDate : '';
    state.programStarts = state.programStarts && typeof state.programStarts === 'object' ? state.programStarts : {};
    state.data = state.data && typeof state.data === 'object' ? state.data : {};
    state.ui = state.ui && typeof state.ui === 'object' ? state.ui : {};
    state.ui.phaseCollapsed = state.ui.phaseCollapsed && typeof state.ui.phaseCollapsed === 'object' ? state.ui.phaseCollapsed : {};
    state.ui.bwCollapsedDate = typeof state.ui.bwCollapsedDate === 'string' ? state.ui.bwCollapsedDate : '';
    state.ui.completedCelebrations = state.ui.completedCelebrations && typeof state.ui.completedCelebrations === 'object' ? state.ui.completedCelebrations : {};
    state.programId = state.programId || state.defaultProgramId || DEFAULT_PROGRAM_ID;
    state.defaultProgramId = state.defaultProgramId || state.programId || DEFAULT_PROGRAM_ID;
    state.programSelection = state.programSelection && typeof state.programSelection === 'object' ? state.programSelection : {
      source: 'system-default',
      explicitlySelected: false,
      selectedAt: nowISO,
      migrationDecision: decision || 'normalize-schema-v2'
    };
    ensureRecordMaps(state);
    state.migration = state.migration && typeof state.migration === 'object' ? state.migration : {};
    if (!state.migration.performanceFoundationV1) {
      state.migration.performanceFoundationV1 = {
        appliedAt: nowISO,
        fromSchemaVersion: previousVersion,
        decision: decision || 'normalize-schema-v2',
        backupKey: hadState && previousVersion < SCHEMA_VERSION ? BACKUP_KEY : null,
        establishedReasons
      };
    }

    return {
      state,
      decision: state.migration.performanceFoundationV1.decision,
      established,
      establishedReasons,
      backupRecommended: hadState && previousVersion < SCHEMA_VERSION,
      backupKey: BACKUP_KEY,
      original
    };
  }

  function markProgramSelected(input, programId, options = {}) {
    if (!programId || typeof programId !== 'string') return migrateState(input, options).state;
    const migrated = migrateState(input, options).state;
    const now = options.now instanceof Date ? options.now : new Date(options.now || Date.now());
    if (options.activate !== false) migrated.programId = programId;
    if (options.setDefault === true) migrated.defaultProgramId = programId;
    migrated.programSelection = {
      source: 'user',
      explicitlySelected: true,
      selectedAt: now.toISOString(),
      migrationDecision: migrated.programSelection?.migrationDecision || 'explicit-user-selection'
    };
    return migrated;
  }

  function stripPrivateText(value) {
    if (Array.isArray(value)) return value.map(stripPrivateText);
    if (!value || typeof value !== 'object') return value;
    const output = {};
    Object.entries(value).forEach(([key, entry]) => {
      if (['journalText', 'responseText', 'privateResponseText', 'privateJournal', 'privateJournalEntries', 'journalResponses'].includes(key)) return;
      output[key] = stripPrivateText(entry);
    });
    return output;
  }

  function toSyncableState(input) {
    return stripPrivateText(safeParseState(input));
  }

  return {
    SCHEMA_VERSION,
    DEFAULT_PROGRAM_ID,
    LEGACY_PROGRAM_ID,
    BACKUP_KEY,
    PRIVATE_JOURNAL_KEY,
    safeParseState,
    formatLocalISO,
    currentWeekMondayISO,
    establishedPlanReasons,
    hasEstablishedPlan,
    migrateState,
    markProgramSelected,
    toSyncableState
  };
});
