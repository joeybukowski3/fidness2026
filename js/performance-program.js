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

  const MONDAY_A = [
    strength('p5d-mon-a-leg-press', 'leg-press', 'Leg Press', 3, '8-12', 8, {
      restSeconds: 90,
      targetRir: { default: 2 },
      equipment: 'Leg Press Machine',
      notes: 'Use a comfortable, knee-tolerated range. Stop if pain occurs.',
      substitutions: ['smith-squat-to-bench']
    }),
    strength('p5d-mon-a-smith-rdl', 'smith-machine-romanian-deadlift', 'Smith-Machine Romanian Deadlift', 3, '8-12', 9, {
      restSeconds: 90,
      targetRir: { default: 2 },
      equipment: 'Smith Machine',
      notes: 'Controlled hinge; prioritize hamstrings, glutes, and spinal position.',
      substitutions: ['dumbbell-romanian-deadlift']
    }),
    strength('p5d-mon-a-ham-curl', 'seated-hamstring-curl', 'Seated Hamstring Curl', 2, '10-15', 5, {
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine',
      substitutions: ['lying-leg-curl']
    }),
    strength('p5d-mon-a-hip-abduction', 'hip-abduction-machine', 'Hip Abduction Machine', 2, '12-15', 4, {
      targetRir: { default: 2 },
      equipment: 'Machine',
      notes: 'Controlled hip-stability work; do not bounce.'
    }),
    strength('p5d-mon-a-calf-raise', 'machine-calf-raise', 'Standing or Machine Calf Raise', 2, '12-15', 5, {
      targetRir: { default: 2 },
      equipment: 'Machine or Smith Machine',
      substitutions: ['bodyweight-calf-raise']
    }),
    strength('p5d-mon-a-pallof', 'pallof-press', 'Pallof Press', 2, '8-12/side', 6, {
      restSeconds: 45,
      targetRir: { rule: 'Stop when trunk position or control deteriorates.' },
      equipment: 'Cable',
      category: 'Core',
      substitutions: ['band-pallof-press']
    }),
    strength('p5d-mon-a-dead-bug', 'dead-bug', 'Dead Bug', 2, '8-10/side', 5, {
      restSeconds: 45,
      targetRir: { rule: 'Stop when the lower back or rib position cannot be controlled.' },
      category: 'Core',
      substitutions: ['bird-dog']
    }),
    strength('p5d-mon-a-front-plank', 'front-plank', 'Front Plank', 2, 'Controlled holds', 4, {
      restSeconds: 45,
      targetRir: { rule: 'End the hold when position deteriorates.' },
      category: 'Core',
      substitutions: ['incline-plank']
    }),
    activity('p5d-mon-a-transition-buffer', 'transition', 'Equipment transitions and set logging', 2, { legacyVisible: false })
  ];

  const MONDAY_B = [
    strength('p5d-mon-b-hip-thrust', 'hip-thrust', 'Hip Thrust or Glute Bridge', 3, '8-12', 8, {
      restSeconds: 75,
      targetRir: { default: 2 },
      equipment: 'Smith Machine, Bench, or Floor',
      substitutions: ['glute-bridge']
    }),
    strength('p5d-mon-b-split-squat', 'supported-split-squat', 'Supported Split Squat or Controlled Step-Up', 2, '8-10/side', 8, {
      restSeconds: 75,
      targetRir: { default: 2 },
      equipment: 'Smith Machine, Rail, or Low Step',
      notes: 'Use only a comfortable, knee-tolerated range.',
      substitutions: ['controlled-step-up', 'sit-to-stand']
    }),
    strength('p5d-mon-b-staggered-rdl', 'staggered-stance-rdl', 'Staggered-Stance Romanian Deadlift', 2, '8-10/side', 8, {
      restSeconds: 75,
      targetRir: { default: 2 },
      equipment: 'Dumbbells or Smith Machine',
      substitutions: ['single-leg-rdl-supported']
    }),
    strength('p5d-mon-b-ham-curl', 'seated-hamstring-curl', 'Seated Hamstring Curl', 2, '10-15', 5, {
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine',
      substitutions: ['lying-leg-curl']
    }),
    strength('p5d-mon-b-calf-raise', 'machine-calf-raise', 'Calf Raise', 2, '12-15', 5, {
      targetRir: { default: 2 },
      equipment: 'Machine or Smith Machine',
      substitutions: ['bodyweight-calf-raise']
    }),
    strength('p5d-mon-b-farmer-carry', 'farmer-carry', 'Farmer Carry', 3, 'Timed carries', 5, {
      restSeconds: 45,
      targetRir: { rule: 'Stop when posture or grip control deteriorates.' },
      equipment: 'Dumbbells',
      category: 'Core',
      substitutions: ['suitcase-carry']
    }),
    strength('p5d-mon-b-wood-chop', 'cable-wood-chop', 'Cable Wood Chop', 2, '8-12/side', 5, {
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
    strength('p5d-thu-a-lat-pulldown', 'lat-pulldown', 'Lat Pulldown', 3, '8-12', 9, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine'
    }),
    strength('p5d-thu-a-seated-row', 'seated-cable-row', 'Seated Cable Row', 3, '8-12', 9, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Cable'
    }),
    strength('p5d-thu-a-reverse-pec', 'reverse-pec-deck', 'Reverse Pec Deck', 3, '12-15', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: 1 },
      equipment: 'Machine'
    }),
    strength('p5d-thu-a-face-pull', 'rope-face-pull', 'Rope Face Pull', 2, '12-15', 5, {
      restSeconds: 45,
      targetRir: { default: 2 },
      equipment: 'Cable'
    }),
    strength('p5d-thu-a-pushdown', 'rope-triceps-pushdown', 'Rope Triceps Pushdown', 3, '10-15', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Cable',
      category: 'Triceps'
    }),
    strength('p5d-thu-a-spider-curl', 'spider-curl', 'Spider Curl or Chest-Supported Curl', 3, '8-12', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Dumbbells and Bench',
      category: 'Biceps'
    }),
    strength('p5d-thu-a-cable-curl', 'cable-curl', 'Cable Curl', 2, '10-15', 5, {
      restSeconds: 45,
      targetRir: { default: 1, final: '0-1' },
      equipment: 'Cable',
      category: 'Biceps'
    }),
    activity('p5d-thu-a-transition-buffer', 'transition', 'Equipment transitions and set logging', 11, { legacyVisible: false }),
    strength('p5d-thu-a-hammer-finisher', 'hammer-curl', 'Optional Hammer Curl Finisher', 2, '10-15', 0, {
      required: false,
      restSeconds: 45,
      targetRir: { final: '0-1' },
      equipment: 'Dumbbells',
      category: 'Biceps',
      notes: 'Only when time remains; never required for mission completion.'
    })
  ];

  const THURSDAY_B = [
    strength('p5d-thu-b-assisted-pullup', 'assisted-pull-up', 'Assisted Pull-Up or Alternate Pulldown', 3, '6-10', 9, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Assisted Pull-Up or Pulldown Machine'
    }),
    strength('p5d-thu-b-chest-row', 'chest-supported-row', 'Chest-Supported Row', 3, '8-12', 9, {
      restSeconds: 75,
      targetRir: { default: 2, final: 1 },
      equipment: 'Machine or Bench and Dumbbells'
    }),
    strength('p5d-thu-b-single-row', 'single-arm-cable-row', 'Single-Arm Cable or Machine Row', 2, '8-12/side', 9, {
      restSeconds: 60,
      targetRir: { default: 2, final: 1 },
      equipment: 'Cable or Machine'
    }),
    strength('p5d-thu-b-rear-delt', 'rear-delt-fly', 'Rear-Delt Fly', 2, '12-15', 5, {
      restSeconds: 45,
      targetRir: { default: '1-2', final: 1 },
      equipment: 'Machine or Cable'
    }),
    strength('p5d-thu-b-overhead-triceps', 'overhead-cable-triceps-extension', 'Overhead Cable Triceps Extension', 3, '10-15', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Cable',
      category: 'Triceps'
    }),
    strength('p5d-thu-b-preacher-curl', 'preacher-curl', 'Preacher Curl', 3, '8-12', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Machine, Cable, or EZ Bar',
      category: 'Biceps'
    }),
    strength('p5d-thu-b-hammer-curl', 'hammer-curl', 'Hammer Curl', 3, '10-15', 7, {
      restSeconds: 60,
      targetRir: { default: '1-2', final: '0-1' },
      equipment: 'Dumbbells or Rope Cable',
      category: 'Biceps'
    }),
    activity('p5d-thu-b-transition-buffer', 'transition', 'Equipment transitions and set logging', 7, { legacyVisible: false }),
    strength('p5d-thu-b-cable-finisher', 'high-rep-cable-curl', 'Optional High-Repetition Cable Curl', 1, '15-20', 0, {
      required: false,
      restSeconds: 45,
      targetRir: { final: '0-1' },
      equipment: 'Cable',
      category: 'Biceps',
      notes: 'One controlled set only when time remains; never required for mission completion.'
    })
  ];

  const MISSIONS = {
    Monday: {
      id: 'p5d-mission-monday-foundation',
      weekday: 'Monday',
      name: 'Build the Foundation',
      description: 'Build knee-tolerant lower-body strength, core control, hip stability, and grip.',
      location: 'Planet Fitness',
      locationType: 'gym',
      startTime: '04:30',
      endTime: '06:00',
      required: true,
      focus: ['Lower-body strength', 'Core strength', 'Hip stability', 'Knee support', 'Temporary unloading and decompression sensation'],
      pillars: ['strength', 'core', 'mobility'],
      goalIds: ['goal-knee-health', 'goal-core-stability', 'goal-mobility'],
      progressTarget: 'Complete controlled lower-body work at the prescribed RIR and record knee comfort, hang duration, and core performance.',
      safetyNote: 'Use a comfortable range and stop if joint pain occurs. Hanging should stop for sharp shoulder pain, numbness, tingling, dizziness, or worsening symptoms.',
      fasting: { id: 'p5d-fast-mon-12h', type: '12-hour overnight', required: true, start: 'Sunday 19:30', end: 'Monday 07:30', notes: 'Recommended target. Eat a protein-rich breakfast after training and adjust as needed.' },
      meditation: { required: false, minutes: 0 },
      journalPrompt: 'What physical foundation did I strengthen today?',
      phases: [
        phase('p5d-mon-orientation', 'Daily Orientation', '04:30', '04:35', [activity('p5d-mon-orientation-review', 'orientation', 'Review today’s mission, fasting target, goals, and safety reminder', 5, { legacyVisible: false })]),
        phase('p5d-mon-warmup', 'Warm-Up and Mobility', '04:35', '04:45', [
          activity('p5d-mon-easy-cardio', 'warmup', 'Easy Treadmill or Stationary Bike', 4, { exerciseId: 'easy-treadmill-or-bike', equipment: 'Treadmill or Bike' }),
          activity('p5d-mon-hip-circles', 'warmup', 'Hip Circles', 1, { exerciseId: 'hip-circles' }),
          activity('p5d-mon-leg-swings', 'warmup', 'Leg Swings', 1, { exerciseId: 'leg-swings' }),
          activity('p5d-mon-sit-stand', 'warmup', 'Controlled Sit-to-Stand or Squat-to-Bench', 1, { exerciseId: 'sit-to-stand' }),
          activity('p5d-mon-dynamic-hamstring', 'warmup', 'Dynamic Hamstring Movement', 1, { exerciseId: 'dynamic-hamstring-movement' }),
          activity('p5d-mon-calf-ankle-prep', 'warmup', 'Calf and Ankle Preparation', 1, { exerciseId: 'calf-ankle-preparation' }),
          activity('p5d-mon-shoulder-prep', 'warmup', 'Shoulder Preparation for Hanging', 1, { exerciseId: 'shoulder-preparation-for-hanging' })
        ]),
        phase('p5d-mon-hang', 'Hanging and Decompression', '04:45', '04:52', [activity('p5d-mon-hang-sets', 'hang', 'Passive or Supported Hang', 7, {
          exerciseId: 'passive-or-supported-hang', sets: '2-3', duration: '20-30 sec', restSeconds: '30-45', progression: 'Progress toward 45 seconds per set.',
          variants: ['full-passive', 'feet-supported', 'neutral-grip'], metrics: ['duration-seconds', 'grip', 'support-type', 'comfort-rating'],
          notes: 'Supports grip, shoulder mobility, thoracic opening, and a temporary unloading sensation. It does not permanently lengthen or repair the spine.'
        })]),
        phase('p5d-mon-strength-core', 'Lower Body and Core', '04:52', '05:40', [], { variations: { A: MONDAY_A, B: MONDAY_B } }),
        phase('p5d-mon-mobility', 'Lower-Body Mobility', '05:40', '05:55', [
          activity('p5d-mon-hip-flexor-stretch', 'mobility', 'Hip-Flexor Stretch', 3, { exerciseId: 'hip-flexor-stretch' }),
          activity('p5d-mon-hamstring-stretch', 'mobility', 'Hamstring Stretch', 3, { exerciseId: 'hamstring-stretch' }),
          activity('p5d-mon-figure-four', 'mobility', 'Figure-Four Glute Stretch', 3, { exerciseId: 'figure-four-glute-stretch' }),
          activity('p5d-mon-calf-stretch', 'mobility', 'Calf Stretch', 2, { exerciseId: 'calf-stretch' }),
          activity('p5d-mon-ankle-mobility', 'mobility', 'Ankle Mobility', 2, { exerciseId: 'ankle-mobility' }),
          activity('p5d-mon-quad-stretch', 'mobility', 'Gentle Quad Stretch', 2, { exerciseId: 'gentle-quad-stretch', notes: 'Avoid forcing a painful range.' })
        ]),
        phase('p5d-mon-checkin', 'Completion Check', '05:55', '06:00', [activity('p5d-mon-checkin-record', 'check-in', 'Record knee comfort, hip mobility, energy, hang time, core performance, and completion', 5, { metrics: ['knee-comfort', 'hip-mobility', 'energy', 'hang-duration', 'core-performance'], legacyVisible: false })])
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
        phase('p5d-wed-track', 'Track Session', '04:50', '05:25', [
          activity('p5d-wed-lap-1', 'run-lap', 'Lap 1 — Brisk Walk', 7, { lapNumber: 1, paceType: 'brisk-walk' }),
          activity('p5d-wed-lap-2', 'run-lap', 'Lap 2 — Light Jog', 7, { lapNumber: 2, paceType: 'light-jog', timed: true }),
          activity('p5d-wed-lap-3', 'run-lap', 'Lap 3 — Brisk Walk', 7, { lapNumber: 3, paceType: 'brisk-walk' }),
          activity('p5d-wed-lap-4', 'run-lap', 'Lap 4 — Light Jog', 7, { lapNumber: 4, paceType: 'light-jog', timed: true }),
          activity('p5d-wed-lap-5', 'run-lap', 'Lap 5 — Cooldown Walk', 7, { lapNumber: 5, paceType: 'cooldown-walk', metrics: ['lap-time', 'total-distance', 'effort', 'knee-comfort', 'breathing-difficulty', 'pace-consistency'] })
        ]),
        phase('p5d-wed-mobility', 'Post-Track Mobility', '05:25', '05:45', [
          activity('p5d-wed-calf-stretch', 'mobility', 'Calves', 3, { exerciseId: 'calf-stretch' }),
          activity('p5d-wed-hamstring-stretch', 'mobility', 'Hamstrings', 4, { exerciseId: 'hamstring-stretch' }),
          activity('p5d-wed-hip-flexor', 'mobility', 'Hip Flexors', 4, { exerciseId: 'hip-flexor-stretch' }),
          activity('p5d-wed-quad-stretch', 'mobility', 'Quadriceps', 3, { exerciseId: 'gentle-quad-stretch' }),
          activity('p5d-wed-glute-stretch', 'mobility', 'Glutes', 3, { exerciseId: 'figure-four-glute-stretch' }),
          activity('p5d-wed-ankle-mobility', 'mobility', 'Ankles', 3, { exerciseId: 'ankle-mobility' })
        ]),
        phase('p5d-wed-journal', 'Short Journal', '05:45', '05:55', [activity('p5d-wed-journal-entry', 'journal', 'Attention Reflection', 10, { prompt: 'What distracted me today, and how effectively did I return my attention?', privateResponse: true })]),
        phase('p5d-wed-checkin', 'Completion Check', '05:55', '06:00', [activity('p5d-wed-checkin-record', 'check-in', 'Record meditation, lap times, effort, knee comfort, energy, and mood', 5, { metrics: ['meditation-completion', 'lap-times', 'effort', 'knee-comfort', 'energy', 'mood'], legacyVisible: false })])
      ]
    },
    Thursday: {
      id: 'p5d-mission-thursday-strength', weekday: 'Thursday', name: 'Build Strength',
      description: 'Build back and arm strength while delivering the second weekly bicep stimulus.',
      location: 'Planet Fitness', locationType: 'gym', startTime: '04:30', endTime: '06:00', required: true,
      focus: ['Back', 'Rear shoulders', 'Triceps', 'Biceps', 'Second weekly bicep stimulus'],
      pillars: ['strength'], goalIds: ['goal-bicep-size', 'goal-upper-strength'],
      progressTarget: 'Improve one controlled back or bicep performance marker while matching the prescribed RIR.',
      safetyNote: 'Keep pulling and arm work controlled. Technical failure is optional only on safe isolation work.',
      fasting: { id: 'p5d-fast-thu-12h', type: '12-hour overnight', required: true, start: 'Wednesday 19:30', end: 'Thursday 07:30', notes: 'Recommended target. Eat a protein-rich breakfast after training and adjust as needed.' },
      meditation: { required: false, minutes: 0 }, journalPrompt: 'Where did I improve compared with my previous workout?',
      phases: [
        phase('p5d-thu-orientation', 'Daily Orientation', '04:30', '04:35', [activity('p5d-thu-orientation-review', 'orientation', 'Review upper-body targets, bicep goal, RIR, and variation', 5, { legacyVisible: false })]),
        phase('p5d-thu-warmup', 'Upper-Body Warm-Up', '04:35', '04:45', [
          activity('p5d-thu-easy-cardio', 'warmup', 'Easy Cardio', 3, { exerciseId: 'easy-cardio' }),
          activity('p5d-thu-scapular', 'warmup', 'Scapular Mobility', 2, { exerciseId: 'scapular-mobility' }),
          activity('p5d-thu-shoulder-prep', 'warmup', 'Shoulder Preparation', 2, { exerciseId: 'shoulder-preparation' }),
          activity('p5d-thu-pull-warmup', 'warmup', 'Light Pulldown or Row Warm-Up Sets', 3, { exerciseId: 'pull-warmup-sets' })
        ]),
        phase('p5d-thu-strength', 'Strength Training', '04:45', '05:45', [], { variations: { A: THURSDAY_A, B: THURSDAY_B } }),
        phase('p5d-thu-cooldown', 'Cooldown', '05:45', '05:55', [
          activity('p5d-thu-lat-stretch', 'mobility', 'Lat Stretch', 2, { exerciseId: 'lat-stretch' }),
          activity('p5d-thu-biceps-stretch', 'mobility', 'Biceps Stretch', 2, { exerciseId: 'biceps-stretch' }),
          activity('p5d-thu-triceps-stretch', 'mobility', 'Triceps Stretch', 2, { exerciseId: 'triceps-stretch' }),
          activity('p5d-thu-thoracic', 'mobility', 'Thoracic Rotation', 2, { exerciseId: 'thoracic-rotation' }),
          activity('p5d-thu-shoulder-mobility', 'mobility', 'Shoulder Mobility', 2, { exerciseId: 'shoulder-mobility' })
        ]),
        phase('p5d-thu-checkin', 'Completion Check', '05:55', '06:00', [activity('p5d-thu-checkin-record', 'check-in', 'Record strength progress, bicep volume, RIR accuracy, energy, and recovery', 5, { metrics: ['strength-progress', 'bicep-volume', 'rir-accuracy', 'energy', 'recovery-status'], legacyVisible: false })])
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
    activityTypes: ['orientation', 'strength', 'warmup', 'mobility', 'cooldown', 'hang', 'meditation', 'walk', 'run-lap', 'journal', 'reflection', 'check-in', 'transition'],
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
          const requiredBudget = (item.activities || []).filter(entry => entry.required !== false).reduce((sum, entry) => sum + (Number(entry.durationMinutes) || 0), 0);
          if (requiredBudget !== phaseMinutes(item)) errors.push(`${weekday} ${variation} phase ${item.id} budgets ${requiredBudget} minutes but has ${phaseMinutes(item)} minutes.`);
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
    if (['warmup', 'mobility', 'cooldown'].includes(entry.type)) return 'Pre-Workout Stretch';
    return 'Main Workout';
  }

  function toLegacyWorkout(weekday, programWeek = 1) {
    const mission = getMission(weekday, programWeek);
    if (!mission) return [];
    const rows = [];
    const compatibleTypes = new Set(['strength', 'warmup', 'mobility', 'cooldown', 'hang', 'meditation', 'walk', 'run-lap']);
    mission.phases.forEach(item => {
      item.activities.forEach(entry => {
        if (entry.legacyVisible === false || !compatibleTypes.has(entry.type)) return;
        const exerciseId = entry.exerciseId || entry.id;
        const sets = entry.sets || '1';
        const reps = entry.reps || entry.duration || `${entry.durationMinutes} min`;
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
          budgetMinutes: entry.durationMinutes
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
