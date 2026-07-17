(function initMissionRecords(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FidnessMissionRecords = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function buildMissionRecordsModule() {
  'use strict';

  const STATUSES = Object.freeze({
    NOT_STARTED: 'not-started',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed'
  });
  const WEEKDAYS = Object.freeze(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);

  function localDateISO(value = new Date()) {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const date = value instanceof Date ? value : new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function localNoon(value = new Date()) {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split('-').map(Number);
      return new Date(year, month - 1, day, 12, 0, 0, 0);
    }
    const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
    date.setHours(12, 0, 0, 0);
    return date;
  }

  function getWeekDateISO(referenceDate, weekday) {
    const weekdayIndex = typeof weekday === 'number' ? weekday : WEEKDAYS.indexOf(weekday);
    if (weekdayIndex < 0 || weekdayIndex > 6) return '';
    const date = localNoon(referenceDate);
    const mondayOffset = (date.getDay() + 6) % 7;
    date.setDate(date.getDate() - mondayOffset + weekdayIndex);
    return localDateISO(date);
  }

  function buildMissionRecordId(programId, missionId, localDate) {
    if (!programId || !missionId || !localDate) return '';
    return `mission:${programId}:${missionId}:${localDate}`;
  }

  function normalizeIdentity(details = {}) {
    const localDate = localDateISO(details.localDate || new Date());
    return {
      programId: details.programId || '',
      missionId: details.missionId || '',
      localDate,
      programWeek: Math.max(1, parseInt(details.programWeek, 10) || 1),
      variation: details.variation === 'B' ? 'B' : 'A'
    };
  }

  function ensureMissionRecords(state) {
    if (!state || typeof state !== 'object') throw new TypeError('Mission records require a state object.');
    if (!state.missionRecords || typeof state.missionRecords !== 'object' || Array.isArray(state.missionRecords)) {
      state.missionRecords = {};
    }
    return state.missionRecords;
  }

  function getMissionRecord(state, details = {}) {
    if (!state || typeof state !== 'object') return null;
    const identity = normalizeIdentity(details);
    const id = buildMissionRecordId(identity.programId, identity.missionId, identity.localDate);
    return id && state.missionRecords && state.missionRecords[id] ? state.missionRecords[id] : null;
  }

  function getMissionStatus(state, details = {}) {
    return getMissionRecord(state, details)?.status || STATUSES.NOT_STARTED;
  }

  function writeMissionRecord(state, details, status, now = new Date()) {
    const identity = normalizeIdentity(details);
    const id = buildMissionRecordId(identity.programId, identity.missionId, identity.localDate);
    if (!id) throw new TypeError('Program ID, mission ID, and local date are required.');
    const records = ensureMissionRecords(state);
    const existing = records[id] || null;
    const timestamp = (now instanceof Date ? now : new Date(now)).toISOString();
    const startedAt = existing?.startedAt || timestamp;
    records[id] = {
      id,
      programId: identity.programId,
      missionId: identity.missionId,
      localDate: identity.localDate,
      status,
      startedAt,
      completedAt: status === STATUSES.COMPLETED ? (existing?.completedAt || timestamp) : null,
      programWeek: identity.programWeek,
      variation: identity.variation,
      lastUpdatedAt: timestamp
    };
    return records[id];
  }

  function startMission(state, details, now = new Date()) {
    const existing = getMissionRecord(state, details);
    if (existing?.status === STATUSES.COMPLETED) return existing;
    return writeMissionRecord(state, details, STATUSES.IN_PROGRESS, now);
  }

  function resumeMission(state, details, now = new Date()) {
    return startMission(state, details, now);
  }

  function completeMission(state, details, now = new Date()) {
    return writeMissionRecord(state, details, STATUSES.COMPLETED, now);
  }

  function completeMissionWithConfirmation(state, details, confirmCompletion, now = new Date()) {
    if (typeof confirmCompletion !== 'function' || confirmCompletion() !== true) {
      return { confirmed: false, record: getMissionRecord(state, details) };
    }
    return { confirmed: true, record: completeMission(state, details, now) };
  }

  function reopenMission(state, details, now = new Date()) {
    const existing = getMissionRecord(state, details);
    if (!existing || existing.status !== STATUSES.COMPLETED) return existing;
    return writeMissionRecord(state, details, STATUSES.IN_PROGRESS, now);
  }

  return {
    STATUSES,
    WEEKDAYS,
    localDateISO,
    getWeekDateISO,
    buildMissionRecordId,
    ensureMissionRecords,
    getMissionRecord,
    getMissionStatus,
    startMission,
    resumeMission,
    completeMission,
    completeMissionWithConfirmation,
    reopenMission
  };
});
