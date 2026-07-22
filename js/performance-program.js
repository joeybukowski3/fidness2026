(function initPerformanceProgram(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FidnessPerformanceProgram = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function buildPerformanceProgramModule() {
  'use strict';

  const PROGRAM_ID = 'performance-5day-v1';
  const REVIEW_INTERVAL_WEEKS = 6;
  const REQUIRED_WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const clone = value => JSON.parse(JSON.stringify(value));

  function activity(id, type, title, durationMinutes, details = {}) {
    return {
      id,
      type,
      title,
      durationMinutes,
      required: details.required !== false,
      ...details
    };
  }

  function strength(id, exerciseId, title, sets, reps, budgetMinutes, details = {}) {
    return activity(id, 'strength', title, budgetMinutes, {
      exerciseId,
      sets,
      reps,
      restSeconds: details.restSeconds || 60,
      targetRir: details.targetRir || { default: 2 },
      tempo: details.tempo || 'Controlled',
      equipment: details.equipment || 'Bodyweight',
      notes: details.notes || '',
      substitutions: details.substitutions || [],
      category: details.category || 'Strength',
      ...details
    });
  }

  function phase(id, title, startTime, endTime, activities, details = {}) {
    return { id, title, startTime, endTime, activities, ...details };
  }

  function trackLap(id, title, lapNumber, paceType, details = {}) {
    const timed = details.timed === true || paceType === 'timed-run';
    return activity(id, 'outdoor-track-lap', title, 0, {
      exerciseId: id,
      lapNumber,
      paceType,
      timed,
      timingRequired: timed,
      lengthLabel: '1 lap',
      sets: '1',
      reps: '1 lap',
      equipment: 'Outdoor Track',
      category: 'Cardio',
      metrics: timed ? ['lap-time'] : [],
      ...details
    });
  }

  function trackLapSequence(prefix) {
    return [
      trackLap(`${prefix}-walk-1`, 'Lap 1 — Brisk Walk', 1, 'walk'),
      trackLap(`${prefix}-timed-run-1`, 'Lap 2 — Timed Light Run/Jog', 2, 'timed-run'),
      trackLap(`${prefix}-walk-2`, 'Lap 3 — Brisk Walk', 3, 'walk'),
      trackLap(`${prefix}-timed-run-2`, 'Lap 4 — Timed Light Run/Jog', 4, 'timed-run')
    ];
  }

  const MONDAY_A = [
    strength('p5d-mon-a-chest-press', 'machine-chest-press', 'Machine Chest Press', 3, '8-12', 9, {
      restSeconds: 90,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine',
      notes: 'Primary chest press after the track block; controlled reps and full shoulder comfort.'
    }),
    strength('p5d-mon-a-incline-press', 'incline-chest-press-machine', 'Incline Chest-Press Machine', 3, '8-12', 8, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine',
      notes: 'Upper-chest emphasis without rushing after the run laps.'
    }),
    strength('p5d-mon-a-cable-fly', 'standing-cable-chest-fly', 'Standing Cable Chest Fly', 2, '12-15', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: 1 },
      equipment: 'Cable'
    }),
    strength('p5d-mon-a-cable-curl', 'cable-curl', 'Cable Curl', 3, '8-12', 6, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Cable',
      category: 'Biceps'
    }),
    strength('p5d-mon-a-hammer-curl', 'hammer-curl', 'Hammer Curl', 2, '10-15', 5, {
      restSeconds: 45,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Dumbbells',
      category: 'Biceps'
    }),
    strength('p5d-mon-a-pallof', 'pallof-press', 'Pallof Press', 2, '8-12/side', 6, {
      restSeconds: 45,
      targetRir: { rule: 'Stop when trunk position or control deteriorates.' },
      equipment: 'Cable',
      category: 'Core',
      substitutions: ['band-pallof-press']
    }),
    strength('p5d-mon-a-dead-bug', 'dead-bug', 'Dead Bug', 2, '8-10/side', 3, {
      restSeconds: 45,
      targetRir: { rule: 'Stop when the lower back or rib position cannot be controlled.' },
      category: 'Core',
      substitutions: ['bird-dog']
    }),
    strength('p5d-mon-a-front-plank', 'front-plank', 'Front Plank', 2, 'Controlled holds', 1, {
      restSeconds: 45,
      targetRir: { rule: 'End the hold when position deteriorates.' },
      category: 'Core',
      substitutions: ['incline-plank']
    })
  ];

  const MONDAY_B = [
    strength('p5d-mon-b-smith-bench', 'smith-machine-bench-press', 'Smith-Machine Bench Press', 3, '6-10', 9, {
      restSeconds: 90,
      targetRir: { default: '2-3', final: 1 },
      equipment: 'Smith Machine'
    }),
    strength('p5d-mon-b-incline-db-press', 'incline-dumbbell-press', 'Incline Dumbbell or Machine Press', 3, '8-12', 7, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Dumbbells or Machine'
    }),
    strength('p5d-mon-b-pec-deck', 'pec-deck', 'Pec Deck', 2, '12-15', 5, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: 1 },
      equipment: 'Machine'
    }),
    strength('p5d-mon-b-ez-curl', 'ez-bar-or-cable-bicep-curl', 'EZ-Bar or Cable Bicep Curl', 3, '8-12', 6, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'EZ Bar or Cable',
      category: 'Biceps'
    }),
    strength('p5d-mon-b-incline-curl', 'incline-dumbbell-curl', 'Incline Dumbbell Curl', 2, '10-15', 5, {
      restSeconds: 45,
      equipment: 'Dumbbells',
      category: 'Biceps',
      targetRir: { default: 1, final: '0-1' }
    }),
    strength('p5d-mon-b-wood-chop', 'cable-wood-chop', 'Cable Wood Chop', 2, '8-12/side', 4, {
      restSeconds: 45,
      targetRir: { rule: 'Use controlled trunk rotation without forcing range.' },
      equipment: 'Cable',
      category: 'Core',
      substitutions: ['band-wood-chop']
    }),
    strength('p5d-mon-b-side-plank', 'side-plank', 'Side Plank or Modified Side Plank', 2, 'Controlled holds/side', 4, {
      restSeconds: 45,
      targetRir: { rule: 'End the hold when hip or trunk position deteriorates.' },
      category: 'Core',
      substitutions: ['modified-side-plank']
    }),
    strength('p5d-mon-b-dead-bug', 'dead-bug', 'Dead Bug', 2, '8-10/side', 3, {
      restSeconds: 45,
      targetRir: { rule: 'Stop when the lower back or rib position cannot be controlled.' },
      category: 'Core',
      substitutions: ['bird-dog']
    }),
    strength('p5d-mon-b-pallof', 'pallof-press', 'Pallof Press', 1, '8-12/side', 2, {
      restSeconds: 45,
      targetRir: { rule: 'Stop when trunk position or control deteriorates.' },
      equipment: 'Cable',
      category: 'Core',
      substitutions: ['band-pallof-press']
    })
  ];

  const TUESDAY_A = [
    strength('p5d-tue-a-smith-bench', 'smith-machine-bench-press', 'Smith-Machine Bench Press', 3, '6-10', 10, {
      restSeconds: 90,
      targetRir: { default: '2-3', final: 1 },
      equipment: 'Smith Machine'
    }),
    strength('p5d-tue-a-incline-press', 'incline-chest-press-machine', 'Incline Chest-Press Machine', 3, '8-12', 9, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine'
    }),
    strength('p5d-tue-a-shoulder-press', 'machine-shoulder-press', 'Machine Shoulder Press', 3, '8-12', 9, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine'
    }),
    strength('p5d-tue-a-lateral-raise', 'lateral-raise', 'Dumbbell or Cable Lateral Raise', 2, '12-15', 5, {
      restSeconds: 45,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Dumbbells or Cable'
    }),
    strength('p5d-tue-a-preacher-curl', 'preacher-curl', 'Preacher Curl', 3, '8-12', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Machine, Cable, or EZ Bar',
      category: 'Biceps'
    }),
    strength('p5d-tue-a-hammer-curl', 'hammer-curl', 'Hammer Curl', 3, '10-15', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Dumbbells or Rope Cable',
      category: 'Biceps'
    }),
    strength('p5d-tue-a-cable-curl', 'cable-curl', 'Cable Curl', 2, '12-15', 5, {
      restSeconds: 45,
      targetRir: { default: 1, final: '0-1' },
      equipment: 'Cable',
      category: 'Biceps'
    }),
    activity('p5d-tue-a-transition-buffer', 'transition', 'Equipment transitions and set logging', 8, { legacyVisible: false }),
    strength('p5d-tue-a-pec-deck-finisher', 'pec-deck', 'Optional Pec Deck Finisher', 2, '10-15', 0, {
      required: false,
      restSeconds: 45,
      targetRir: { final: '0-1' },
      equipment: 'Machine',
      notes: 'Only when at least six minutes remain; never required for mission completion.'
    })
  ];

  const TUESDAY_B = [
    strength('p5d-tue-b-chest-press', 'machine-chest-press', 'Machine Chest Press', 3, '8-12', 9, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine'
    }),
    strength('p5d-tue-b-incline-press', 'incline-dumbbell-press', 'Incline Dumbbell or Alternate Machine Press', 3, '8-12', 9, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Dumbbells or Machine'
    }),
    strength('p5d-tue-b-cable-fly', 'cable-fly', 'Cable Fly', 2, '10-15', 5, {
      restSeconds: 45,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Cable'
    }),
    strength('p5d-tue-b-shoulder-press', 'shoulder-press-variation', 'Shoulder-Press Variation', 3, '8-12', 9, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine or Dumbbells'
    }),
    strength('p5d-tue-b-bayesian-curl', 'bayesian-cable-curl', 'Bayesian or Behind-the-Body Cable Curl', 3, '10-15', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Cable',
      category: 'Biceps'
    }),
    strength('p5d-tue-b-incline-curl', 'incline-dumbbell-curl', 'Incline Dumbbell Curl', 3, '8-12', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Dumbbells and Bench',
      category: 'Biceps'
    }),
    strength('p5d-tue-b-preacher-curl', 'preacher-machine-curl', 'Preacher-Curl or Machine-Curl Variation', 2, '10-15', 5, {
      restSeconds: 45,
      targetRir: { default: 1, final: '0-1' },
      equipment: 'Machine, Cable, or EZ Bar',
      category: 'Biceps'
    }),
    activity('p5d-tue-b-transition-buffer', 'transition', 'Equipment transitions and set logging', 9, { legacyVisible: false }),
    strength('p5d-tue-b-lateral-finisher', 'cable-lateral-raise', 'Optional Cable Lateral Raise Finisher', 2, '12-15', 0, {
      required: false,
      restSeconds: 45,
      targetRir: { final: '0-1' },
      equipment: 'Cable',
      notes: 'Only when time remains; never required for mission completion.'
    })
  ];

  const THURSDAY_A = [
    strength('p5d-thu-a-lat-pulldown', 'lat-pulldown', 'Lat Pulldown', 3, '8-12', 8, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine'
    }),
    strength('p5d-thu-a-seated-row', 'seated-cable-row', 'Seated Cable Row', 3, '8-12', 8, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Cable'
    }),
    strength('p5d-thu-a-reverse-pec', 'reverse-pec-deck', 'Reverse Pec Deck', 2, '12-15', 6, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: 1 },
      equipment: 'Machine'
    }),
    strength('p5d-thu-a-face-pull', 'rope-face-pull', 'Rope Face Pull', 2, '12-15', 5, {
      restSeconds: 45,
      targetRir: { default: 2 },
      equipment: 'Cable'
    }),
    strength('p5d-thu-a-shoulder-press', 'machine-shoulder-press', 'Machine Shoulder Press', 3, '8-12', 7, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine',
      category: 'Shoulders'
    }),
    strength('p5d-thu-a-lateral-raise', 'cable-lateral-raise', 'Cable Lateral Raise', 2, '12-15', 4, {
      restSeconds: 45,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Cable',
      category: 'Shoulders'
    }),
    strength('p5d-thu-a-pushdown', 'rope-triceps-pushdown', 'Rope Triceps Pushdown', 3, '10-15', 5, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Cable',
      category: 'Triceps'
    }),
    strength('p5d-thu-a-overhead-triceps', 'overhead-cable-triceps-extension', 'Overhead Cable Triceps Extension', 2, '10-15', 2, {
      restSeconds: 45,
      targetRir: { default: 1, final: '0-1' },
      equipment: 'Cable',
      category: 'Triceps'
    })
  ];

  const THURSDAY_B = [
    strength('p5d-thu-b-assisted-pullup', 'assisted-pull-up', 'Assisted Pull-Up or Alternate Pulldown', 3, '6-10', 8, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Assisted Pull-Up or Pulldown Machine'
    }),
    strength('p5d-thu-b-chest-row', 'chest-supported-row', 'Chest-Supported Row', 3, '8-12', 8, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine or Bench and Dumbbells'
    }),
    strength('p5d-thu-b-single-row', 'single-arm-cable-row', 'Single-Arm Cable or Machine Row', 2, '8-12/side', 6, {
      restSeconds: 60,
      targetRir: { default: 2, final: 1 },
      equipment: 'Cable or Machine'
    }),
    strength('p5d-thu-b-rear-delt', 'rear-delt-fly', 'Rear-Delt Fly', 2, '12-15', 5, {
      restSeconds: 45,
      targetRir: { default: '1-2', final: 1 },
      equipment: 'Machine or Cable'
    }),
    strength('p5d-thu-b-arnold-press', 'landmine-press-or-db-arnold-press', 'Landmine Press or DB Arnold Press', 3, '8-12', 7, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Landmine or Dumbbells',
      category: 'Shoulders'
    }),
    strength('p5d-thu-b-face-pull', 'face-pulls-rope-attachment', 'Face Pulls', 2, '12-15', 4, {
      restSeconds: 45,
      targetRir: { default: 2 },
      equipment: 'Cable',
      category: 'Shoulders'
    }),
    strength('p5d-thu-b-overhead-triceps', 'overhead-cable-triceps-extension', 'Overhead Cable Triceps Extension', 3, '10-15', 5, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Cable',
      category: 'Triceps'
    }),
    strength('p5d-thu-b-rope-pushdown', 'rope-triceps-pushdown', 'Rope Triceps Pushdown', 2, '10-15', 2, {
      restSeconds: 45,
      targetRir: { default: 1, final: '0-1' },
      equipment: 'Cable',
      category: 'Triceps'
    })
  ];

  const MISSIONS = {
    Monday: {
      id: 'p5d-mission-monday-foundation',
      weekday: 'Monday',
      name: 'Track + Push Foundation',
      description: 'Start with controlled track laps, then build chest, biceps, and core strength.',
      location: 'Outdoor track and Planet Fitness',
      locationType: 'track-and-gym',
      startTime: '04:30',
      endTime: '06:00',
      required: true,
      focus: ['Track intervals', 'Chest', 'Biceps', 'Core', 'Controlled pacing'],
      pillars: ['cardio', 'strength', 'core'],
      goalIds: ['goal-running-endurance', 'goal-bicep-size', 'goal-core-stability'],
      progressTarget: 'Record both timed run laps and complete chest, biceps, and core work with controlled effort.',
      safetyNote: 'Keep track laps controlled. Stop for sharp knee pain, instability, swelling, dizziness, or concerning symptoms.',
      fasting: { id: 'p5d-fast-mon-12h', type: '12-hour overnight', required: true, start: 'Sunday 19:30', end: 'Monday 07:30', notes: 'Recommended target. Eat a protein-rich breakfast after training and adjust as needed.' },
      meditation: { required: false, minutes: 0 },
      journalPrompt: 'How did the track work affect my pressing and core session?',
      phases: [
        phase('p5d-mon-track', 'Track Session', '04:30', '05:00', trackLapSequence('p5d-mon-track')),
        phase('p5d-mon-strength-core', 'Chest, Biceps, and Core', '05:00', '05:45', [], { variations: { A: MONDAY_A, B: MONDAY_B } }),
        phase('p5d-mon-cooldown', 'Cooldown Mobility', '05:45', '05:55', [
          activity('p5d-mon-chest-stretch', 'mobility', 'Chest Stretch', 2, { exerciseId: 'chest-stretch' }),
          activity('p5d-mon-biceps-stretch', 'mobility', 'Biceps Stretch', 2, { exerciseId: 'biceps-stretch' }),
          activity('p5d-mon-shoulder-mobility', 'mobility', 'Shoulder Mobility', 2, { exerciseId: 'shoulder-mobility' }),
          activity('p5d-mon-hip-flexor-reset', 'mobility', 'Hip-Flexor Reset', 2, { exerciseId: 'hip-flexor-stretch' }),
          activity('p5d-mon-breathing', 'cooldown', 'Light Breathing', 2, { exerciseId: 'light-breathing' })
        ]),
        phase('p5d-mon-checkin', 'Completion Check', '05:55', '06:00', [activity('p5d-mon-checkin-record', 'check-in', 'Record lap times, chest performance, bicep effort, core control, energy, and knee comfort', 5, { metrics: ['lap-times', 'chest-performance', 'bicep-effort', 'core-control', 'energy', 'knee-comfort'], legacyVisible: false })])
      ]
    },
    Tuesday: {
      id: 'p5d-mission-tuesday-muscle', weekday: 'Tuesday', name: 'Build Muscle',
      description: 'Build chest, shoulder, and bicep size with controlled progressive overload.',
      location: 'Planet Fitness', locationType: 'gym', startTime: '04:30', endTime: '06:00', required: true,
      focus: ['Chest', 'Shoulders', 'Biceps', 'Bicep hypertrophy', 'Progressive overload'],
      pillars: ['strength'], goalIds: ['goal-bicep-size', 'goal-upper-strength'],
      progressTarget: 'Complete three direct bicep movements and record each working set with RIR.',
      safetyNote: 'Technical failure is optional only on safe isolation work. Stop when form deteriorates or pain occurs.',
      fasting: { id: 'p5d-fast-tue-12h', type: '12-hour overnight', required: true, start: 'Monday 19:30', end: 'Tuesday 07:30', notes: 'Recommended target. Eat a protein-rich breakfast after training and adjust as needed.' },
      meditation: { required: false, minutes: 0 }, journalPrompt: 'What effort today made me stronger or more confident?',
      phases: [
        phase('p5d-tue-orientation', 'Daily Orientation', '04:30', '04:35', [activity('p5d-tue-orientation-review', 'orientation', 'Review bicep target, variation, RIR guidance, and progression target', 5, { legacyVisible: false })]),
        phase('p5d-tue-warmup', 'Upper-Body Warm-Up', '04:35', '04:45', [
          activity('p5d-tue-easy-cardio', 'warmup', 'Easy Cardio', 3, { exerciseId: 'easy-cardio' }),
          activity('p5d-tue-shoulder-circles', 'warmup', 'Shoulder Circles', 1, { exerciseId: 'shoulder-circles' }),
          activity('p5d-tue-scapular', 'warmup', 'Scapular Movement', 2, { exerciseId: 'scapular-movement' }),
          activity('p5d-tue-chest-activation', 'warmup', 'Light Chest Activation', 2, { exerciseId: 'light-chest-activation' }),
          activity('p5d-tue-warmup-sets', 'warmup', 'Light Warm-Up Sets', 2, { exerciseId: 'press-warmup-sets' })
        ]),
        phase('p5d-tue-strength', 'Strength Training', '04:45', '05:45', [], { variations: { A: TUESDAY_A, B: TUESDAY_B } }),
        phase('p5d-tue-cooldown', 'Cooldown', '05:45', '05:55', [
          activity('p5d-tue-chest-stretch', 'mobility', 'Chest Stretch', 3, { exerciseId: 'chest-stretch' }),
          activity('p5d-tue-biceps-stretch', 'mobility', 'Biceps Stretch', 3, { exerciseId: 'biceps-stretch' }),
          activity('p5d-tue-shoulder-mobility', 'mobility', 'Shoulder Mobility', 2, { exerciseId: 'shoulder-mobility' }),
          activity('p5d-tue-breathing', 'cooldown', 'Light Breathing', 2, { exerciseId: 'light-breathing' })
        ]),
        phase('p5d-tue-checkin', 'Completion Check', '05:55', '06:00', [activity('p5d-tue-checkin-record', 'check-in', 'Record progress, bicep effort, pain or discomfort, and mission completion', 5, { metrics: ['bicep-pump', 'effort', 'progression', 'pain-discomfort'], legacyVisible: false })])
      ]
    },
    Wednesday: {
      id: 'p5d-mission-wednesday-endurance', weekday: 'Wednesday', name: 'Build Endurance',
      description: 'Build aerobic capacity, pace control, attention, and recovery without a gym workout.',
      location: 'Track across from Planet Fitness or another outdoor track', locationType: 'outdoor-track', startTime: '04:30', endTime: '06:00', required: true,
      focus: ['Meditation', 'Walking and light jogging', 'Pace awareness', 'Mental discipline', 'Recovery'],
      pillars: ['cardio', 'mobility', 'mental-performance'], goalIds: ['goal-running-endurance', 'goal-attention-control', 'goal-knee-health'],
      progressTarget: 'Complete both jogging laps comfortably and keep their pace consistent before trying to run faster.',
      safetyNote: 'This is not a maximum-speed time trial. Reduce pace or stop if knee pain or concerning symptoms occur.',
      fasting: { id: 'p5d-fast-wed-16-8', type: '16:8', required: true, start: 'Tuesday 19:30', end: 'Wednesday 11:30', notes: 'Water and user-approved noncaloric beverages are allowed. Adjust as needed.' },
      meditation: { required: true, minutes: 10, guidance: 'Breath-focused. Mind-wandering is normal; gently return attention.' },
      journalPrompt: 'What distracted me today, and how effectively did I return my attention?',
      phases: [
        phase('p5d-wed-meditation', 'Meditation', '04:30', '04:40', [activity('p5d-wed-breath-meditation', 'meditation', 'Breath-Focused Meditation', 10, { metrics: ['focus-before', 'focus-after', 'completion'] })]),
        phase('p5d-wed-warmup', 'Dynamic Track Warm-Up', '04:40', '04:50', [
          activity('p5d-wed-easy-walk', 'warmup', 'Easy Walking', 3, { exerciseId: 'easy-walk' }),
          activity('p5d-wed-leg-swings', 'warmup', 'Leg Swings', 1, { exerciseId: 'leg-swings' }),
          activity('p5d-wed-marching', 'warmup', 'Marching', 2, { exerciseId: 'marching' }),
          activity('p5d-wed-calf-raises', 'warmup', 'Calf Raises', 1, { exerciseId: 'bodyweight-calf-raise' }),
          activity('p5d-wed-hip-circles', 'warmup', 'Hip Circles', 1, { exerciseId: 'hip-circles' }),
          activity('p5d-wed-pace-build', 'warmup', 'Gradual Pace Increase', 2, { exerciseId: 'gradual-pace-increase' })
        ]),
        phase('p5d-wed-track', 'Track Session', '04:50', '05:15', [
          ...trackLapSequence('p5d-wed-track'),
          trackLap('p5d-wed-track-cooldown-walk', 'Optional Cooldown Walk', 5, 'cooldown-walk', {
            required: false,
            notes: 'Optional only. Use this as an easy cooldown when time and knee comfort allow; it is not one of the four required laps.'
          })
        ]),
        phase('p5d-wed-mobility', 'Post-Track Mobility, Knee Stability, and Core', '05:15', '05:45', [
          activity('p5d-wed-calf-stretch', 'mobility', 'Calves', 3, { exerciseId: 'calf-stretch' }),
          activity('p5d-wed-hamstring-stretch', 'mobility', 'Hamstrings', 4, { exerciseId: 'hamstring-stretch' }),
          activity('p5d-wed-hip-flexor', 'mobility', 'Hip Flexors', 4, { exerciseId: 'hip-flexor-stretch' }),
          activity('p5d-wed-quad-stretch', 'mobility', 'Quadriceps', 3, { exerciseId: 'gentle-quad-stretch' }),
          activity('p5d-wed-glute-stretch', 'mobility', 'Glutes', 3, { exerciseId: 'figure-four-glute-stretch' }),
          activity('p5d-wed-ankle-mobility', 'mobility', 'Ankles', 3, { exerciseId: 'ankle-mobility' }),
          activity('p5d-wed-knee-stability', 'mobility', 'Knee Stability Control', 4, { exerciseId: 'controlled-sit-to-stand', notes: 'Slow, pain-free control only.' }),
          activity('p5d-wed-dead-bug', 'strength', 'Dead Bug', 3, { exerciseId: 'dead-bug', sets: '2', reps: '8-10/side', category: 'Core' }),
          activity('p5d-wed-side-plank', 'strength', 'Side Plank', 3, { exerciseId: 'side-plank', sets: '2', reps: 'Controlled holds/side', category: 'Core' })
        ]),
        phase('p5d-wed-journal', 'Short Journal', '05:45', '05:55', [activity('p5d-wed-journal-entry', 'journal', 'Attention Reflection', 10, { prompt: 'What distracted me today, and how effectively did I return my attention?', privateResponse: true })]),
        phase('p5d-wed-checkin', 'Completion Check', '05:55', '06:00', [activity('p5d-wed-checkin-record', 'check-in', 'Record meditation, lap times, effort, knee comfort, energy, and mood', 5, { metrics: ['meditation-completion', 'lap-times', 'effort', 'knee-comfort', 'energy', 'mood'], legacyVisible: false })])
      ]
    },
    Thursday: {
      id: 'p5d-mission-thursday-strength', weekday: 'Thursday', name: 'Build Strength',
      description: 'Start with controlled track laps, then train back, shoulders, and triceps.',
      location: 'Outdoor track and Planet Fitness', locationType: 'track-and-gym', startTime: '04:30', endTime: '06:00', required: true,
      focus: ['Track intervals', 'Back', 'Shoulders', 'Triceps', 'Rear shoulders'],
      pillars: ['cardio', 'strength'], goalIds: ['goal-running-endurance', 'goal-upper-strength'],
      progressTarget: 'Record both timed run laps and improve one controlled back, shoulder, or triceps performance marker.',
      safetyNote: 'Keep track laps controlled and keep pulling, shoulder, and triceps work strict. Stop if pain or concerning symptoms occur.',
      fasting: { id: 'p5d-fast-thu-12h', type: '12-hour overnight', required: true, start: 'Wednesday 19:30', end: 'Thursday 07:30', notes: 'Recommended target. Eat a protein-rich breakfast after training and adjust as needed.' },
      meditation: { required: false, minutes: 0 }, journalPrompt: 'Where did I improve compared with my previous workout?',
      phases: [
        phase('p5d-thu-track', 'Track Session', '04:30', '05:00', trackLapSequence('p5d-thu-track')),
        phase('p5d-thu-strength', 'Back, Shoulders, and Triceps', '05:00', '05:45', [], { variations: { A: THURSDAY_A, B: THURSDAY_B } }),
        phase('p5d-thu-cooldown', 'Cooldown', '05:45', '05:55', [
          activity('p5d-thu-lat-stretch', 'mobility', 'Lat Stretch', 2, { exerciseId: 'lat-stretch' }),
          activity('p5d-thu-chest-opener', 'mobility', 'Chest and Shoulder Opener', 2, { exerciseId: 'chest-and-shoulder-static-stretch' }),
          activity('p5d-thu-triceps-stretch', 'mobility', 'Triceps Stretch', 2, { exerciseId: 'triceps-stretch' }),
          activity('p5d-thu-thoracic', 'mobility', 'Thoracic Rotation', 2, { exerciseId: 'thoracic-rotation' }),
          activity('p5d-thu-shoulder-mobility', 'mobility', 'Shoulder Mobility', 2, { exerciseId: 'shoulder-mobility' })
        ]),
        phase('p5d-thu-checkin', 'Completion Check', '05:55', '06:00', [activity('p5d-thu-checkin-record', 'check-in', 'Record lap times, strength progress, RIR accuracy, energy, and recovery', 5, { metrics: ['lap-times', 'strength-progress', 'rir-accuracy', 'energy', 'recovery-status'], legacyVisible: false })])
      ]
    },
    Friday: {
      id: 'p5d-mission-friday-recover', weekday: 'Friday', name: 'Recover and Reflect',
      description: 'Restore mobility, accumulate easy movement, and review the week without guilt or pressure.',
      location: 'Home, track, neighborhood, gym stretching area, or another low-intensity setting', locationType: 'flexible-low-intensity', startTime: '04:30', endTime: '06:00', required: true,
      focus: ['Flexibility', 'Hip and leg mobility', 'Walking', 'Meditation', 'Weekly reflection', 'Recovery'],
      pillars: ['mobility', 'cardio', 'mental-performance'], goalIds: ['goal-mobility', 'goal-recovery-awareness', 'goal-attention-control'],
      progressTarget: 'Complete the recovery sequence and identify one evidence-based adjustment for next week.',
      safetyNote: 'Avoid forcing painful ranges. Choose an easy conversational walking or cycling effort.',
      fasting: { id: 'p5d-fast-fri-16-8', type: '16:8', required: true, start: 'Thursday 19:30', end: 'Friday 11:30', notes: 'Recommended target. Adjust as needed without punitive language.' },
      meditation: { required: true, minutes: 10, guidance: 'Breath-focused or quiet attention practice.' },
      journalPrompt: 'Complete the structured weekly reflection.',
      phases: [
        phase('p5d-fri-meditation', 'Meditation', '04:30', '04:40', [activity('p5d-fri-meditation-session', 'meditation', 'Meditation', 10, { metrics: ['focus-before', 'focus-after', 'mood-before', 'mood-after', 'completion'] })]),
        phase('p5d-fri-mobility', 'Guided Mobility', '04:40', '05:15', [
          activity('p5d-fri-hip-flexors', 'mobility', 'Hip Flexors', 4, { exerciseId: 'hip-flexor-stretch' }),
          activity('p5d-fri-hamstrings', 'mobility', 'Hamstrings', 4, { exerciseId: 'hamstring-stretch' }),
          activity('p5d-fri-quads', 'mobility', 'Quadriceps', 3, { exerciseId: 'gentle-quad-stretch' }),
          activity('p5d-fri-glutes', 'mobility', 'Glutes', 4, { exerciseId: 'figure-four-glute-stretch' }),
          activity('p5d-fri-adductors', 'mobility', 'Adductors', 4, { exerciseId: 'adductor-stretch' }),
          activity('p5d-fri-calves', 'mobility', 'Calves', 4, { exerciseId: 'calf-stretch' }),
          activity('p5d-fri-ankles', 'mobility', 'Ankles', 4, { exerciseId: 'ankle-mobility' }),
          activity('p5d-fri-thoracic', 'mobility', 'Thoracic Spine', 4, { exerciseId: 'thoracic-mobility' }),
          activity('p5d-fri-shoulders', 'mobility', 'Shoulders', 4, { exerciseId: 'shoulder-mobility' })
        ]),
        phase('p5d-fri-walk', 'Easy Walk', '05:15', '05:40', [activity('p5d-fri-easy-walk', 'walk', 'Easy Walk or Light Bike', 25, { options: ['outdoor-walk', 'track-walk', 'treadmill-walk', 'light-bike'], metrics: ['time', 'distance', 'effort'] })]),
        phase('p5d-fri-reflection', 'Weekly Reflection', '05:40', '05:55', [activity('p5d-fri-reflection-entry', 'reflection', 'Structured Weekly Reflection', 15, {
          privateResponse: true,
          prompts: ['What went well this week?', 'What challenged me?', 'How did my knees, hips, and legs feel?', 'How did my energy and recovery feel?', 'Where did I make measurable progress?', 'What should I adjust next week?', 'What is my main intention for the coming week?']
        })]),
        phase('p5d-fri-summary', 'Weekly Completion', '05:55', '06:00', [activity('p5d-fri-summary-review', 'check-in', 'Review weekly completion and consistency', 5, { metrics: ['strength-sessions', 'bicep-sets', 'core-work', 'meditation-minutes', 'track-times', 'walking-time', 'mobility-sessions', 'fasting-days', 'journal-entries', 'average-knee-comfort', 'consistency'], legacyVisible: false })])
      ]
    },
    Saturday: {
      id: 'p5d-mission-saturday-optional', weekday: 'Saturday', name: 'Optional Active Recovery', required: false,
      description: 'Choose walking, family activity, yard work, golf, easy cycling, mobility, or full rest.',
      location: 'Flexible', focus: ['Optional recovery'], pillars: ['recovery'], goalIds: ['goal-recovery-awareness'],
      fasting: { id: 'p5d-fast-sat-optional', type: '16:8 optional opportunity', required: false, notes: 'Skipping this optional fast is not a failure.' },
      phases: []
    },
    Sunday: {
      id: 'p5d-mission-sunday-optional', weekday: 'Sunday', name: 'Optional Recovery or Full Rest', required: false,
      description: 'Choose gentle activity or full rest based on recovery and family plans.',
      location: 'Flexible', focus: ['Optional recovery'], pillars: ['recovery'], goalIds: ['goal-recovery-awareness'],
      fasting: { id: 'p5d-fast-sun-optional', type: '16:8 optional opportunity', required: false, notes: 'Use either Saturday or Sunday if desired. Skipping it is not a failure.' },
      phases: []
    }
  };

  const PROGRAM = {
    id: PROGRAM_ID,
    name: 'Five-Day Performance System',
    version: 1,
    ongoing: true,
    rotation: { type: 'week-parity', odd: 'A', even: 'B' },
    reviewIntervalWeeks: REVIEW_INTERVAL_WEEKS,
    requiredWeekdays: REQUIRED_WEEKDAYS,
    activityTypes: ['orientation', 'strength', 'warmup', 'mobility', 'cooldown', 'hang', 'meditation', 'walk', 'run-lap', 'outdoor-track-lap', 'journal', 'reflection', 'check-in', 'transition'],
    goals: [
      { id: 'goal-bicep-size', name: 'Increase bicep size' },
      { id: 'goal-core-stability', name: 'Improve core strength and stability' },
      { id: 'goal-mobility', name: 'Improve lower-body and thoracic mobility' },
      { id: 'goal-knee-health', name: 'Build knee-tolerant lower-body capacity' },
      { id: 'goal-running-endurance', name: 'Improve controlled running endurance' },
      { id: 'goal-attention-control', name: 'Build attention control and meditation consistency' },
      { id: 'goal-recovery-awareness', name: 'Build recovery awareness and reflection' },
      { id: 'goal-upper-strength', name: 'Improve upper-body strength' }
    ],
    missions: MISSIONS,
    optionalWeekend: { required: false, fastingRequired: false }
  };

  function variationForWeek(programWeek) {
    const week = Math.max(1, parseInt(programWeek, 10) || 1);
    return week % 2 === 1 ? 'A' : 'B';
  }

  function getMission(weekday, programWeek = 1) {
    const source = PROGRAM.missions[weekday];
    if (!source) return null;
    const mission = clone(source);
    const variation = variationForWeek(programWeek);
    mission.programId = PROGRAM_ID;
    mission.programWeek = Math.max(1, parseInt(programWeek, 10) || 1);
    mission.variation = variation;
    mission.phases = (mission.phases || []).map(item => {
      if (!item.variations) return item;
      return { ...item, activities: clone(item.variations[variation] || []), variations: undefined };
    });
    return mission;
  }

  function timeToMinutes(value) {
    const match = /^(\d{2}):(\d{2})$/.exec(String(value || ''));
    if (!match) return NaN;
    return Number(match[1]) * 60 + Number(match[2]);
  }

  function phaseMinutes(item) {
    return timeToMinutes(item.endTime) - timeToMinutes(item.startTime);
  }

  function validateProgram(program = PROGRAM) {
    const errors = [];
    const ids = new Set();
    const addId = (id, label) => {
      if (!id) errors.push(`${label} is missing a stable id.`);
      else if (ids.has(id)) errors.push(`Duplicate stable id: ${id}`);
      else ids.add(id);
    };

    addId(program.id, 'Program');
    REQUIRED_WEEKDAYS.forEach(weekday => {
      const source = program.missions[weekday];
      if (!source) {
        errors.push(`Missing required mission: ${weekday}`);
        return;
      }
      addId(source.id, `${weekday} mission`);
      const start = timeToMinutes(source.startTime);
      const end = timeToMinutes(source.endTime);
      if (end - start !== 90) errors.push(`${weekday} must run exactly 90 minutes.`);
      if (start !== 270 || end !== 360) errors.push(`${weekday} must run from 04:30 to 06:00.`);

      ['A', 'B'].forEach(variation => {
        const mission = getMission(weekday, variation === 'A' ? 1 : 2);
        let cursor = start;
        (mission.phases || []).forEach(item => {
          addId(`${item.id}-${variation}`, `${weekday} ${variation} phase`);
          const phaseStart = timeToMinutes(item.startTime);
          const phaseEnd = timeToMinutes(item.endTime);
          if (phaseStart !== cursor) errors.push(`${weekday} ${variation} has a phase gap or overlap before ${item.id}.`);
          cursor = phaseEnd;
          const distanceBased = (item.activities || []).some(entry => entry.type === 'outdoor-track-lap' && entry.lengthLabel);
          const requiredBudget = (item.activities || []).filter(entry => entry.required !== false).reduce((sum, entry) => sum + (Number(entry.durationMinutes) || 0), 0);
          if (!distanceBased && requiredBudget !== phaseMinutes(item)) errors.push(`${weekday} ${variation} phase ${item.id} budgets ${requiredBudget} minutes but has ${phaseMinutes(item)} minutes.`);
          if (distanceBased && requiredBudget > phaseMinutes(item)) errors.push(`${weekday} ${variation} phase ${item.id} exceeds its estimated session window.`);
          (item.activities || []).forEach(entry => addId(`${entry.id}-${variation}`, `${weekday} ${variation} activity`));
        });
        if (cursor !== end) errors.push(`${weekday} ${variation} does not end at 06:00.`);
      });
    });

    ['Saturday', 'Sunday'].forEach(weekday => {
      const mission = program.missions[weekday];
      if (!mission) errors.push(`Missing optional weekend mission: ${weekday}`);
      else addId(mission.id, `${weekday} mission`);
    });

    if (program.missions.Wednesday.locationType === 'gym') {
      errors.push('Wednesday location must not schedule a Planet Fitness workout.');
    }
    if (program.missions.Wednesday.fasting.type !== '16:8' || !program.missions.Wednesday.fasting.required) errors.push('Wednesday must be a required 16:8 fasting day.');
    if (program.missions.Friday.fasting.type !== '16:8' || !program.missions.Friday.fasting.required) errors.push('Friday must be a required 16:8 fasting day.');
    if (program.missions.Saturday.fasting.required || program.missions.Sunday.fasting.required) errors.push('Weekend fasting must remain optional.');
    return errors;
  }

  function legacyPhaseFor(entry) {
    if (entry.required === false) return 'Bonus (Optional)';
    if (entry.type === 'outdoor-track-lap') return 'Track';
    if (['warmup', 'mobility', 'cooldown'].includes(entry.type)) return 'Pre-Workout Stretch';
    return 'Main Workout';
  }

  function toLegacyWorkout(weekday, programWeek = 1) {
    const mission = getMission(weekday, programWeek);
    if (!mission) return [];
    const rows = [];
    const compatibleTypes = new Set(['strength', 'warmup', 'mobility', 'cooldown', 'hang', 'meditation', 'walk', 'run-lap', 'outdoor-track-lap']);
    mission.phases.forEach(item => {
      item.activities.forEach(entry => {
        if (entry.legacyVisible === false || !compatibleTypes.has(entry.type)) return;
        const exerciseId = entry.exerciseId || entry.id;
        const sets = entry.sets || '1';
        const reps = entry.lengthLabel || entry.reps || entry.duration || (entry.durationMinutes ? `${entry.durationMinutes} min` : '');
        const alternatives = (entry.substitutions || []).join(' or ');
        const notes = `${entry.notes || ''}${alternatives ? `${entry.notes ? ' ' : ''}SUB: ${alternatives}` : ''}`.trim();
        rows.push({
          id: entry.id,
          activityId: entry.id,
          activityType: entry.type,
          exerciseId,
          phaseId: item.id,
          phase: legacyPhaseFor(entry),
          exercise: entry.title,
          sets: String(sets),
          reps: String(reps),
          rest: parseInt(entry.restSeconds, 10) || 0,
          tempo: entry.tempo || (entry.type === 'mobility' ? 'Controlled' : 'Easy'),
          notes,
          equipment: entry.equipment || 'Bodyweight',
          category: entry.category || (entry.type === 'mobility' ? 'Stretches' : ['warmup', 'walk', 'run-lap'].includes(entry.type) ? 'Cardio' : entry.type === 'meditation' ? 'Yoga' : 'Strength'),
          targetRir: entry.targetRir || null,
          required: entry.required !== false,
          optional: entry.required === false,
          budgetMinutes: entry.durationMinutes,
          lengthLabel: entry.lengthLabel || '',
          lapNumber: entry.lapNumber || null,
          paceType: entry.paceType || '',
          timed: entry.timed === true,
          timingRequired: entry.timingRequired === true,
          outdoorTrack: entry.type === 'outdoor-track-lap'
        });
      });
    });
    return rows;
  }

  return {
    PROGRAM_ID,
    REVIEW_INTERVAL_WEEKS,
    REQUIRED_WEEKDAYS,
    PROGRAM,
    variationForWeek,
    getMission,
    validateProgram,
    toLegacyWorkout,
    timeToMinutes,
    phaseMinutes
  };
});
