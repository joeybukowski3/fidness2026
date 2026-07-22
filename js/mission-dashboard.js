(function initMissionDashboard(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FidnessMissionDashboard = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function buildMissionDashboardModule() {
  'use strict';

  const REQUIRED_WEEKDAYS = Object.freeze(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const WEEKEND_DAYS = Object.freeze(['Saturday', 'Sunday']);

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function timeToMinutes(value) {
    const match = /^(\d{2}):(\d{2})$/.exec(String(value || ''));
    return match ? Number(match[1]) * 60 + Number(match[2]) : 0;
  }

  function formatClock(value) {
    if (!/^\d{2}:\d{2}$/.test(String(value || ''))) return '';
    const minutes = timeToMinutes(value);
    const hour24 = Math.floor(minutes / 60);
    const minute = String(minutes % 60).padStart(2, '0');
    const suffix = hour24 >= 12 ? 'PM' : 'AM';
    const hour = hour24 % 12 || 12;
    return `${hour}:${minute} ${suffix}`;
  }

  function formatScheduledPoint(value) {
    const match = /^(.+?)\s(\d{2}:\d{2})$/.exec(String(value || ''));
    return match ? `${match[1]} ${formatClock(match[2])}` : String(value || '');
  }

  function formatFasting(fasting = {}) {
    const optional = fasting.required === false;
    const prefix = optional ? 'Optional' : 'Recommended';
    const window = fasting.start && fasting.end
      ? ` • approximately ${formatScheduledPoint(fasting.start)} to ${formatScheduledPoint(fasting.end)}`
      : '';
    return `${prefix} ${fasting.type || 'fasting target'}${window}`;
  }

  function formatRir(targetRir) {
    if (!targetRir) return '';
    if (targetRir.rule) return targetRir.rule;
    const parts = [];
    if (targetRir.default !== undefined) parts.push(`${targetRir.default} RIR`);
    if (targetRir.final !== undefined) parts.push(`final set ${targetRir.final} RIR`);
    return parts.join(' • ');
  }

  function formatActivityTarget(activity = {}) {
    const parts = [];
    if (activity.lengthLabel) parts.push(activity.lengthLabel);
    if (!activity.lengthLabel && activity.sets) parts.push(`${activity.sets} sets`);
    if (activity.reps && activity.reps !== activity.lengthLabel) parts.push(activity.reps);
    if (activity.duration) parts.push(activity.duration);
    if (!activity.sets && !activity.reps && !activity.duration && activity.durationMinutes) parts.push(`${activity.durationMinutes} min`);
    if (activity.restSeconds) parts.push(`${activity.restSeconds} sec rest`);
    if (activity.timed) parts.push('record lap time');
    return parts.join(' • ');
  }

  function humanizeIdentifier(value) {
    return String(value || '')
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, character => character.toUpperCase());
  }

  function buildActivityModel(activity = {}) {
    return {
      id: activity.id,
      type: activity.type,
      typeLabel: humanizeIdentifier(activity.type),
      title: activity.title,
      required: activity.required !== false,
      optional: activity.required === false,
      target: formatActivityTarget(activity),
      rir: formatRir(activity.targetRir),
      notes: activity.notes || '',
      substitutions: Array.isArray(activity.substitutions) ? activity.substitutions.map(humanizeIdentifier) : [],
      metrics: Array.isArray(activity.metrics) ? activity.metrics.map(humanizeIdentifier) : [],
      prompts: Array.isArray(activity.prompts) ? activity.prompts : [],
      paceType: activity.paceType || '',
      lengthLabel: activity.lengthLabel || '',
      lapNumber: activity.lapNumber || null,
      timed: activity.timed === true,
      isTrackLap: activity.type === 'outdoor-track-lap',
      durationMinutes: Number(activity.durationMinutes) || 0,
      privateResponse: activity.privateResponse === true,
      deferredNote: activity.id === 'p5d-fri-summary-review'
        ? 'Calculated weekly totals are intentionally deferred to the progress phase.'
        : ''
    };
  }

  function buildMissionModel(options = {}) {
    const mission = options.mission;
    if (!mission) return null;
    const goals = new Map((options.program?.goals || []).map(goal => [goal.id, goal.name]));
    const status = options.record?.status || 'not-started';
    const phases = (mission.phases || []).map((phase, phaseIndex) => {
      const activities = (phase.activities || []).map(buildActivityModel);
      return {
        id: phase.id,
        title: phase.title,
        startTime: phase.startTime,
        endTime: phase.endTime,
        startLabel: formatClock(phase.startTime),
        endLabel: formatClock(phase.endTime),
        durationMinutes: timeToMinutes(phase.endTime) - timeToMinutes(phase.startTime),
        activities,
        requiredCount: activities.filter(activity => activity.required).length,
        optionalCount: activities.filter(activity => activity.optional).length,
        initiallyOpen: phaseIndex === 0
      };
    });
    const hasTimeWindow = !!mission.startTime && !!mission.endTime;
    const requiredMinutes = hasTimeWindow ? timeToMinutes(mission.endTime) - timeToMinutes(mission.startTime) : 0;
    const hasStrength = phases.some(phase => phase.activities.some(activity => activity.type === 'strength'));
    return {
      programId: mission.programId || options.program?.id,
      missionId: mission.id,
      weekday: mission.weekday,
      localDate: options.localDate,
      dateLabel: options.dateLabel || '',
      name: mission.name,
      description: mission.description,
      location: mission.location,
      locationType: mission.locationType,
      startTime: mission.startTime,
      endTime: mission.endTime,
      timeWindow: hasTimeWindow ? `${formatClock(mission.startTime)}–${formatClock(mission.endTime)}` : 'Flexible',
      required: mission.required !== false,
      requiredMinutes,
      focus: mission.focus || [],
      goals: (mission.goalIds || []).map(goalId => goals.get(goalId) || goalId),
      progressTarget: mission.progressTarget || '',
      safetyNote: mission.safetyNote || '',
      fasting: formatFasting(mission.fasting),
      fastingNotes: mission.fasting?.notes || '',
      meditation: mission.meditation?.required
        ? `${mission.meditation.minutes || 0}-minute meditation assigned`
        : 'No formal meditation assigned',
      meditationGuidance: mission.meditation?.guidance || '',
      journalPrompt: mission.journalPrompt || '',
      programWeek: Math.max(1, parseInt(mission.programWeek || options.programWeek, 10) || 1),
      variation: mission.variation || 'A',
      status,
      statusLabel: status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In progress' : 'Not started',
      primaryAction: status === 'completed' ? 'View Completed Mission' : status === 'in-progress' ? 'Resume Mission' : 'Start Mission',
      hasStrength,
      phases,
      isWednesdayTrack: mission.weekday === 'Wednesday' && mission.locationType === 'outdoor-track',
      isFridayRecovery: mission.weekday === 'Friday',
      isWeekendOptional: mission.required === false
    };
  }

  function scheduleLabels({ date, today, status, optional }) {
    const labels = [];
    if (date === today) labels.push('Today');
    if (status === 'completed') labels.push('Completed');
    else if (status === 'in-progress') labels.push('In progress');
    else if (optional) labels.push('Optional');
    else if (date > today) labels.push('Upcoming');
    else labels.push('Scheduled');
    return labels;
  }

  function buildScheduleModel(options = {}) {
    const days = [...REQUIRED_WEEKDAYS, ...WEEKEND_DAYS].map((weekday, index) => {
      const mission = options.getMission(weekday, options.programWeek);
      const localDate = options.getWeekDateISO(options.referenceDate, index);
      const record = options.getRecord(mission, localDate);
      const status = record?.status || 'not-started';
      return {
        weekday,
        localDate,
        mission,
        status,
        labels: scheduleLabels({ date: localDate, today: options.todayDate, status, optional: mission?.required === false }),
        selected: weekday === options.previewWeekday,
        optional: mission?.required === false
      };
    });
    return {
      programWeek: Math.max(1, parseInt(options.programWeek, 10) || 1),
      variation: Math.max(1, parseInt(options.programWeek, 10) || 1) % 2 === 0 ? 'B' : 'A',
      weekdays: days.slice(0, 5),
      weekend: days.slice(5)
    };
  }

  function badge(label, className = '') {
    return `<span class="mission-badge ${className}">${escapeHtml(label)}</span>`;
  }

  function renderActivity(activity, options = {}) {
    const classes = activity.optional ? ' mission-activity-optional' : '';
    const requirement = activity.optional ? badge('Optional finisher', 'optional') : badge('Required', 'required');
    const substitutions = activity.substitutions.length
      ? `<div class="mission-activity-note"><strong>Substitutions:</strong> ${escapeHtml(activity.substitutions.join(' or '))}</div>`
      : '';
    const metrics = activity.metrics.length
      ? `<div class="mission-activity-note"><strong>Record later:</strong> ${escapeHtml(activity.metrics.join(', '))}</div>`
      : '';
    const prompts = activity.prompts.length
      ? `<ol class="mission-prompt-list">${activity.prompts.map(prompt => `<li>${escapeHtml(prompt)}</li>`).join('')}</ol>`
      : '';
    const privateNote = activity.privateResponse || activity.type === 'reflection'
      ? '<div class="mission-private-note">Private response entry is intentionally not collected on this screen.</div>'
      : '';
    const deferredNote = activity.deferredNote
      ? `<div class="mission-private-note">${escapeHtml(activity.deferredNote)}</div>`
      : '';
    const lapControls = options.interactiveLapControls && activity.isTrackLap
      ? `<div class="mission-track-lap-control" data-track-lap-control="${escapeHtml(activity.id)}"></div>`
      : '';
    return `<div class="mission-activity${classes}" data-activity-id="${escapeHtml(activity.id)}">
      <div class="mission-activity-heading"><div><span class="mission-activity-type">${escapeHtml(activity.typeLabel)}</span><h4>${escapeHtml(activity.title)}</h4></div>${requirement}</div>
      ${activity.target ? `<div class="mission-target">${escapeHtml(activity.target)}</div>` : ''}
      ${activity.rir ? `<div class="mission-rir"><strong>RIR guidance:</strong> ${escapeHtml(activity.rir)}</div>` : ''}
      ${activity.notes ? `<div class="mission-activity-note">${escapeHtml(activity.notes)}</div>` : ''}
      ${substitutions}${metrics}${prompts}${privateNote}${deferredNote}${lapControls}
    </div>`;
  }

  function renderPhase(phase, options = {}) {
    const counts = [
      phase.requiredCount ? `${phase.requiredCount} required` : '',
      phase.optionalCount ? `${phase.optionalCount} optional` : ''
    ].filter(Boolean).join(' • ');
    const idPrefix = options.phaseIdPrefix ? `${escapeHtml(options.phaseIdPrefix)}-` : '';
    return `<details class="mission-phase" id="mission-phase-${idPrefix}${escapeHtml(phase.id)}" data-required-phase="${phase.requiredCount > 0}" ${phase.initiallyOpen ? 'open' : ''}>
      <summary>
        <span class="mission-phase-time">${escapeHtml(phase.startLabel)}–${escapeHtml(phase.endLabel)}</span>
        <span class="mission-phase-title">${escapeHtml(phase.title)}</span>
        <span class="mission-phase-meta">${phase.durationMinutes} min${counts ? ` • ${escapeHtml(counts)}` : ''}</span>
      </summary>
      <div class="mission-phase-body">${phase.activities.map(activity => renderActivity(activity, options)).join('')}</div>
    </details>`;
  }

  function renderToday(model) {
    if (!model) return '';
    const primaryHandler = model.status === 'completed'
      ? 'scrollToTodayTimeline()'
      : model.status === 'in-progress' && model.hasStrength
        ? `openTodayWorkoutLogger('${escapeHtml(model.weekday)}')`
        : model.status === 'in-progress' ? 'resumeTodayMission()' : 'startTodayMission()';
    const primaryLabel = model.status === 'in-progress' && model.hasStrength
      ? 'Open Workout Logger'
      : model.primaryAction;
    const completeButton = model.status === 'in-progress'
      ? '<button class="mission-btn secondary" onclick="completeTodayMission()">Complete Mission</button>'
      : '';
    const reopenButton = model.status === 'completed'
      ? '<button class="mission-btn secondary" onclick="reopenTodayMission()">Reopen Mission</button>'
      : '';
    const loggerButton = model.hasStrength && model.status === 'not-started'
      ? `<button class="mission-btn ghost" onclick="openTodayWorkoutLogger('${escapeHtml(model.weekday)}')">Open Workout Logger</button>`
      : '';
    const trackNote = model.isWednesdayTrack
      ? '<div class="mission-coach-note"><strong>Today’s pacing objective:</strong> Complete both light-jog laps comfortably, keep them consistent, and reduce effort before chasing speed. This is not a weekly race.</div>'
      : '';
    const fridayNote = model.isFridayRecovery
      ? '<div class="mission-coach-note"><strong>Recovery objective:</strong> Use comfortable ranges, keep the walk conversational, and review the week without scoring private responses here.</div>'
      : '';
    return `<section class="mission-dashboard" aria-labelledby="todayMissionTitle">
      <div class="mission-hero">
        <div class="mission-kicker">${escapeHtml(model.dateLabel)} • Week ${model.programWeek} • Variation ${escapeHtml(model.variation)}</div>
        <div class="mission-hero-row"><div><h1 id="todayMissionTitle">${escapeHtml(model.name)}</h1><p>${escapeHtml(model.description)}</p></div>${badge(model.statusLabel, model.status)}</div>
        <div class="mission-facts">
          <div><span>Time</span><strong>${escapeHtml(model.timeWindow)}</strong><small>${model.requiredMinutes ? `${model.requiredMinutes} required minutes` : 'No required duration'}</small></div>
          <div><span>Location</span><strong>${escapeHtml(model.location)}</strong></div>
          <div><span>Fasting</span><strong>${escapeHtml(model.fasting)}</strong></div>
          <div class="mission-meditation-fact"><span>Meditation</span><strong>${escapeHtml(model.meditation)}</strong></div>
        </div>
        <div class="mission-actions">
          <button class="mission-btn primary" onclick="${primaryHandler}">${escapeHtml(primaryLabel)}</button>
          ${completeButton}${reopenButton}${loggerButton}
        </div>
      </div>

      <div class="mission-timeline" id="todayMissionTimeline">
        <div class="mission-section-heading"><div><span>Morning plan</span><h2>Complete timeline</h2></div><strong>${escapeHtml(model.timeWindow)}</strong></div>
        ${model.phases.length ? model.phases.map(phase => renderPhase(phase, { interactiveLapControls: true })).join('') : '<div class="mission-empty">This optional day is flexible. Choose recovery movement or full rest without penalty.</div>'}
      </div>

      <details class="mission-guidance" id="todayMissionGuidance" open>
        <summary>Today’s Guidance</summary>
        <div class="mission-guidance-body">
          <div class="mission-orientation-grid">
            <article class="mission-info-card"><span>Primary focus</span><p>${escapeHtml(model.focus.join(' • '))}</p></article>
            <article class="mission-info-card"><span>Long-term goals</span><ul>${model.goals.map(goal => `<li>${escapeHtml(goal)}</li>`).join('')}</ul></article>
            <article class="mission-info-card"><span>Progress target</span><p>${escapeHtml(model.progressTarget)}</p></article>
            <article class="mission-info-card"><span>Journal prompt</span><p>“${escapeHtml(model.journalPrompt)}”</p></article>
            <article class="mission-info-card"><span>Meditation</span><p>${escapeHtml(model.meditation)}${model.meditationGuidance ? ` • ${escapeHtml(model.meditationGuidance)}` : ''}</p></article>
            <article class="mission-info-card mission-safety"><span>Safety and recovery</span><p>${escapeHtml(model.safetyNote)}</p></article>
          </div>
          ${trackNote}${fridayNote}
        </div>
      </details>

      <div class="mission-sticky-actions" aria-label="Mission actions">
        ${model.status === 'not-started'
          ? '<button class="mission-btn primary" onclick="startTodayMission()">Start Mission</button>'
          : model.status === 'completed'
            ? '<button class="mission-btn primary" onclick="scrollToTodayTimeline()">View Completed Mission</button><button class="mission-btn secondary" onclick="reopenTodayMission()">Reopen Mission</button>'
            : model.hasStrength
              ? `<button class="mission-btn primary" onclick="openTodayWorkoutLogger('${escapeHtml(model.weekday)}')">Open Workout Logger</button><button class="mission-btn secondary" onclick="completeTodayMission()">Complete Mission</button>`
              : '<button class="mission-btn primary" onclick="resumeTodayMission()">Resume Mission</button><button class="mission-btn secondary" onclick="completeTodayMission()">Complete Mission</button>'}
      </div>
    </section>`;
  }

  function renderScheduleCard(day) {
    const mission = day.mission;
    if (!mission) return '';
    return `<button id="schedule-day-${escapeHtml(day.weekday.toLowerCase())}" data-schedule-day="${escapeHtml(day.weekday)}" class="schedule-day-card${day.selected ? ' selected' : ''}${day.optional ? ' optional' : ''}" onclick="previewScheduleMission('${escapeHtml(day.weekday)}')">
      <div class="schedule-card-top"><span>${escapeHtml(day.weekday)}</span><div>${day.labels.map(label => badge(label, label.toLowerCase().replace(/\s+/g, '-'))).join('')}</div></div>
      <h3>${escapeHtml(mission.name)}</h3>
      <p>${escapeHtml((mission.focus || []).slice(0, 3).join(' • '))}</p>
      <div class="schedule-card-meta"><span>${escapeHtml(mission.location)}</span><span>${mission.startTime && mission.endTime ? `${formatClock(mission.startTime)}–${formatClock(mission.endTime)}` : 'Flexible timing'}</span><span>${escapeHtml(mission.fasting?.type || '')}</span><span>${mission.meditation?.required ? `${mission.meditation.minutes} min meditation` : 'No meditation assigned'}</span></div>
    </button>`;
  }

  function renderSchedule(schedule, previewModel) {
    return `<section class="mission-schedule" aria-labelledby="weeklyScheduleTitle">
      <div class="schedule-heading"><div><span>Five-Day Performance System</span><h2 id="weeklyScheduleTitle">Week ${schedule.programWeek} Schedule</h2></div>${badge(`Variation ${schedule.variation}`, 'variation')}</div>
      <div class="schedule-weekdays">${schedule.weekdays.map(renderScheduleCard).join('')}</div>
      <details class="schedule-weekend">
        <summary>Optional weekend recovery</summary>
        <p>Walking, family activity, yard work, golf, easy cycling, mobility, or full rest. One optional 16:8 opportunity may be used; skipping it is not a failure.</p>
        <div class="schedule-weekend-grid">${schedule.weekend.map(renderScheduleCard).join('')}</div>
      </details>
      ${previewModel ? renderSchedulePreview(previewModel) : ''}
    </section>`;
  }

  function renderSchedulePreview(model) {
    const trackNote = model.isWednesdayTrack
      ? '<div class="mission-coach-note">Controlled consistency comes before faster laps or more jogging distance.</div>'
      : '';
    return `<section class="schedule-preview" aria-labelledby="schedulePreviewTitle">
      <button class="schedule-back" onclick="returnToWeeklySchedule('${escapeHtml(model.weekday)}')">← Back to Weekly Schedule</button>
      <div class="mission-section-heading"><div><span>${escapeHtml(model.weekday)} preview • Week ${model.programWeek} • Variation ${escapeHtml(model.variation)}</span><h2 id="schedulePreviewTitle">${escapeHtml(model.name)}</h2></div>${badge(model.statusLabel, model.status)}</div>
      <p class="schedule-preview-purpose">${escapeHtml(model.description)}</p>
      <div class="schedule-preview-facts"><span><strong>Time:</strong> ${escapeHtml(model.timeWindow)}</span><span><strong>Location:</strong> ${escapeHtml(model.location)}</span><span><strong>Fast:</strong> ${escapeHtml(model.fasting)}</span><span><strong>Meditation:</strong> ${escapeHtml(model.meditation)}</span></div>
      ${trackNote}
      <div class="mission-timeline">${model.phases.length ? model.phases.map(phase => renderPhase(phase, { phaseIdPrefix: 'schedule-preview' })).join('') : '<div class="mission-empty">Optional flexible recovery or full rest.</div>'}</div>
      <button class="schedule-back schedule-back-bottom" onclick="returnToWeeklySchedule('${escapeHtml(model.weekday)}')">← Back to Weekly Schedule</button>
    </section>`;
  }

  return {
    REQUIRED_WEEKDAYS,
    WEEKEND_DAYS,
    escapeHtml,
    formatClock,
    formatFasting,
    formatRir,
    buildActivityModel,
    buildMissionModel,
    buildScheduleModel,
    renderToday,
    renderSchedule,
    renderSchedulePreview
  };
});
