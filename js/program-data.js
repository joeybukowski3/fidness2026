// 12-WEEK KNEE-SAFE UPPER BODY + CORE FOCUS PROGRAM
// Target: Joey, 35yo, 200lbs, belly fat loss + upper body toning (chest, biceps, core)
// Full progression with specific starting weights, exercise rotations, and deload protocol

window.buildProgramData = function buildProgramData(legacyWorkouts) {
  const ex = (phase, exercise, sets, reps, rest, tempo, notes, equipment) => ({
    phase, exercise, sets, reps, rest, tempo, notes, equipment
  });

  const recovery = (phase, activity, duration, notes) => ({ phase, activity, duration, notes });

  // WARM-UP & STRETCH BLOCKS (reusable)
  const warmup15 = [
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '10-15 min', 0, 'Steady', '10° / 3 mph', 'Treadmill'),
    ex('Warm-Up', 'Arm Circles', '1', '1 min', 0, 'Controlled', 'Forward & back slow rotations', 'Bodyweight'),
    ex('Warm-Up', 'Band Pull-Aparts', '2', '15', 0, 'Controlled', 'Open chest before pressing', 'Resistance Band')
  ];

  const cooldown5 = [
    ex('Cooldown', 'Standing Chest Stretch', '1', '30 sec', 0, 'Hold', 'Against wall, gentle', 'Bodyweight'),
    ex('Cooldown', 'Standing Quad Stretch', '1', '30 sec/leg', 0, 'Hold', 'Hold wall, minimal knee bend', 'Bodyweight'),
    ex('Cooldown', 'Standing Forward Fold', '1', '45 sec', 0, 'Hold', 'Soft knees, relax neck', 'Bodyweight')
  ];

  const coreMid = [
    ex('Core', 'Decline Sit-Ups', '3', '15', 45, 'Controlled', 'No neck pull, controlled descent', 'Decline Bench'),
    ex('Core', 'Plank Hold', '3', '30-45 sec', 45, 'Hold', 'Ribs down, brace hard', 'Bodyweight'),
    ex('Core', 'Russian Twists (Feet Down)', '2', '20', 45, 'Controlled', 'Feet down = less knee stress', 'Bodyweight')
  ];

  const coreFull = [
    ex('Core', 'Decline Sit-Ups', '3', '20', 45, 'Controlled', 'Full range controlled', 'Decline Bench'),
    ex('Core', 'Plank Hold', '3', '45-60 sec', 45, 'Hold', 'Extended holds', 'Bodyweight'),
    ex('Core', 'Russian Twists (Light Plate)', '3', '20', 45, 'Controlled', 'Add 5-10 lb plate', 'Decline Bench'),
    ex('Core', 'Leg Raises (Lying)', '2', '15', 45, 'Controlled', 'Knees soft, not fully straight', 'Bodyweight')
  ];

  const kneeStretch = [
    ex('Mobility', 'Supine Hamstring Stretch', '1', '45 sec/leg', 0, 'Hold', 'Band under foot, lying back', 'Resistance Band'),
    ex('Mobility', 'Figure-4 Stretch', '1', '45 sec/leg', 0, 'Hold', 'Hip external rotation, lying', 'Bodyweight'),
    ex('Mobility', 'Supine IT Band Stretch', '1', '45 sec/leg', 0, 'Hold', 'Cross leg over, shoulders flat', 'Bodyweight'),
    ex('Mobility', 'Hip Flexor Stretch', '1', '45 sec/leg', 0, 'Hold', 'Half kneeling or standing', 'Bodyweight'),
    ex('Mobility', 'Calf Stretch (Towel)', '1', '30 sec/leg', 0, 'Hold', 'Calf tightness = knee stress', 'Towel')
  ];

  const walkCooldown = [
    ex('Cooldown', 'Incline Walk', '1', '5-10 min', 0, 'Steady', 'Slow pace, extra calories', 'Treadmill')
  ];

  // ===== WEEK 1 (FOUNDATION) =====
  const w1Mon = [...warmup15,
    ex('Chest', 'Machine Chest Press', '3', '12', 60, 'Controlled', 'Start 130 lbs. This is your current working weight — focus on form and full ROM.', 'Machine'),
    ex('Back', 'Seated Cable Row', '3', '12', 60, 'Controlled', 'Light weight, balance chest', 'Cable'),
    ex('Biceps', 'Dumbbell Curls', '3', '12', 45, 'Controlled', 'Start 30 lbs each. This is your proven working weight.', 'Dumbbells'),
    ex('Triceps', 'Overhead Dumbbell Extension', '3', '12', 45, 'Controlled', 'Start 25 lbs. Control the descent on each rep.', 'Dumbbells'),
    ...coreMid, ...cooldown5
  ];

  const w1Tue = [...warmup15,
    ex('Chest', 'Barbell Bench Press', '3', '10', 90, 'Controlled', 'Start 115 lbs (incline barbell). This is your established incline baseline.', 'Barbell'),
    ex('Chest', 'Incline Dumbbell Press', '3', '10', 75, 'Controlled', 'Start 60-65 lbs each. Your proven DB press weight.', 'Dumbbells'),
    ex('Chest', 'Pec Deck Fly', '3', '12', 60, 'Controlled', 'Start 140 lbs. Your current pec deck working weight — full stretch at open.', 'Machine'),
    ex('Biceps', 'Barbell or EZ Curl', '3', '10', 60, 'Controlled', 'Start 70 lbs. Your DB curl is 30 lbs so barbell/EZ should be ~70 lbs.', 'Barbell'),
    ex('Biceps', 'Hammer Curl', '3', '12', 45, 'Controlled', '25 lbs each — your confirmed working weight. Neutral grip, no sway.', 'Dumbbells'),
    ex('Back', 'Lat Pulldown (Wide)', '3', '12', 60, 'Controlled', 'Start 130 lbs. Your proven lat pulldown working weight.', 'Machine'),
    ex('Back', 'Cable Face Pull', '3', '15', 45, 'Controlled', 'Light, rear delt + rotator', 'Cable'),
    ...coreFull, ...cooldown5
  ];

  const w1Wed = [...warmup15,
    ex('Lower', 'Leg Press (Shallow Depth)', '3', '12', 75, 'Controlled', 'Start 200 lbs. Your knee-safe working weight — feet high, 60-70° bend max.', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Start 80 lbs. Your confirmed hamstring curl working weight.', 'Machine'),
    ex('Lower', 'Hip Abduction Machine', '3', '15', 45, 'Controlled', 'Knee stabilizer priority', 'Machine'),
    ex('Lower', 'Standing Hip Extension (Cable)', '3', '12 each leg', 45, 'Controlled', 'Glute + hip stability', 'Cable'),
    ex('Lower', 'Glute Bridge (Bodyweight)', '3', '15', 45, 'Controlled', 'Squeeze at top, activation week', 'Bodyweight'),
    ...kneeStretch, ...walkCooldown
  ];

  const w1Thu = [...warmup15,
    ex('Back', 'Seated Cable Row', '3', '10', 75, 'Controlled', 'Start 110 lbs. Your confirmed seated row working weight.', 'Cable'),
    ex('Back', 'Lat Pulldown (Underhand)', '3', '12', 60, 'Controlled', 'Different grip angle', 'Machine'),
    ex('Back', 'Single-Arm Dumbbell Row', '3', '10 each', 60, 'Controlled', 'Start 55-60 lbs each. Strong single-arm rows — use a bench for support.', 'Dumbbells'),
    ex('Shoulders', 'Dumbbell Shoulder Press (Seated)', '3', '10', 75, 'Controlled', 'Start 35 lbs each. Your confirmed overhead DB press weight.', 'Dumbbells'),
    ex('Shoulders', 'Dumbbell Lateral Raise', '3', '12', 45, 'Controlled', 'Start 15 lbs. Your confirmed lateral raise weight — strict form, no swing.', 'Dumbbells'),
    ex('Triceps', 'Cable Pushdown (Rope)', '3', '12', 45, 'Controlled', 'Start 75 lbs rope pushdown. Your confirmed tricep working weight.', 'Cable'),
    ex('Back', 'Cable Face Pull', '3', '15', 45, 'Controlled', 'Light, rotator cuff', 'Cable'),
    ...coreFull, ...cooldown5
  ];

  const w1Fri = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', '200 lbs leg press. Maintain W1 — prioritize form and knee tracking.', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Stabilizer every lower day', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Hamstring focus', 'Machine'),
    ex('Lower', 'Standing Calf Raise (Machine)', '3', '20', 30, 'Controlled', 'Ankle-knee chain strength', 'Machine'),
    ex('Lower', 'Glute Bridge (Bodyweight)', '3', '15', 45, 'Controlled', 'Activation, no load', 'Bodyweight'),
    ...coreMid, ...kneeStretch, ...walkCooldown
  ];

  // ===== WEEK 2 (FOUNDATION - SAME WEIGHT, FOCUS FORM) =====
  const w2Mon = [...warmup15,
    ex('Chest', 'Machine Chest Press', '3', '12', 60, 'Controlled', '130 lbs — same as W1. Focus on deeper ROM and slower descent.', 'Machine'),
    ex('Back', 'Seated Cable Row', '3', '12', 60, 'Controlled', 'Same weight, balance work', 'Cable'),
    ex('Biceps', 'Dumbbell Curls', '3', '12', 45, 'Controlled', '30 lbs — W1 weight. Full control on the negative.', 'Dumbbells'),
    ex('Triceps', 'Overhead Dumbbell Extension', '3', '12', 45, 'Controlled', '15 lbs, full range', 'Dumbbells'),
    ...coreMid, ...cooldown5
  ];

  const w2Tue = [...warmup15,
    ex('Chest', 'Barbell Bench Press', '3', '10', 90, 'Controlled', '115 lbs incline barbell. Hit all 10 clean reps before considering +5.', 'Barbell'),
    ex('Chest', 'Incline Dumbbell Press', '3', '10', 75, 'Controlled', '45 lbs, controlled descent', 'Dumbbells'),
    ex('Chest', 'Pec Deck Fly', '3', '12', 60, 'Controlled', '145 lbs pec deck. Small progression from 140.', 'Machine'),
    ex('Biceps', 'Barbell Curl', '3', '10', 60, 'Controlled', '70 lbs — maintain baseline or +5 if reps felt easy.', 'Barbell'),
    ex('Biceps', 'Hammer Curl', '3', '12', 45, 'Controlled', '25 lbs — maintain. Add 2.5 only if W1 felt very easy.', 'Dumbbells'),
    ex('Back', 'Lat Pulldown (Wide)', '3', '12', 60, 'Controlled', '135 lbs lat pulldown. +5 from W1 only if all reps were clean.', 'Machine'),
    ex('Back', 'Cable Face Pull', '3', '15', 45, 'Controlled', 'Maintain light', 'Cable'),
    ...coreFull, ...cooldown5
  ];

  const w2Wed = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', 'Maintain form, no pain', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', '80 lbs — maintain W1 weight.', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', '120 lbs hip abduction — your confirmed working weight.', 'Machine'),
    ex('Lower', 'Standing Hip Extension (Cable)', '3', '12 each', 45, 'Controlled', 'Moderate cable weight, controlled hip extension.', 'Cable'),
    ex('Lower', 'Glute Bridge (Bodyweight)', '3', '15', 45, 'Controlled', 'Squeeze at top', 'Bodyweight'),
    ...kneeStretch, ...walkCooldown
  ];

  const w2Thu = [...warmup15,
    ex('Back', 'Seated Cable Row', '3', '10', 75, 'Controlled', '110 lbs seated row — maintain W1.', 'Cable'),
    ex('Back', 'Lat Pulldown (Underhand)', '3', '12', 60, 'Controlled', '135 lbs lat pulldown — maintain or +5.', 'Machine'),
    ex('Back', 'Single-Arm Row', '3', '10 each', 60, 'Controlled', '55-60 lbs single-arm row — slight build from W1.', 'Dumbbells'),
    ex('Shoulders', 'Dumbbell Shoulder Press', '3', '10', 75, 'Controlled', '35 lbs shoulder press — maintain W1, perfect reps.', 'Dumbbells'),
    ex('Shoulders', 'Dumbbell Lateral Raise', '3', '12', 45, 'Controlled', '15 lbs lateral raise — maintain W1.', 'Dumbbells'),
    ex('Triceps', 'Cable Pushdown (Rope)', '3', '12', 45, 'Controlled', '75 lbs rope pushdown — maintain W1.', 'Cable'),
    ex('Back', 'Cable Face Pull', '3', '15', 45, 'Controlled', 'Maintain', 'Cable'),
    ...coreFull, ...cooldown5
  ];

  const w2Fri = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', '200 lbs leg press — maintain W1 form.', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Build weight', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Build weight', 'Machine'),
    ex('Lower', 'Standing Calf Raise', '3', '20', 30, 'Controlled', 'Add weight if easy', 'Machine'),
    ex('Lower', 'Glute Bridge (Bodyweight or Light DB)', '3', '15', 45, 'Controlled', 'Light DB if ready', 'Dumbbells'),
    ...coreMid, ...kneeStretch, ...walkCooldown
  ];

  // ===== WEEK 3 (FOUNDATION - PUSH HARDER) =====
  const w3Mon = [...warmup15,
    ex('Chest', 'Machine Chest Press', '3', '12', 60, 'Controlled', '135 lbs. +5 from W1. Push week — earn every rep.', 'Machine'),
    ex('Back', 'Seated Cable Row', '3', '12', 60, 'Controlled', 'Light build', 'Cable'),
    ex('Biceps', 'Dumbbell Curls', '3', '12', 45, 'Controlled', '22 lbs each', 'Dumbbells'),
    ex('Triceps', 'Overhead Dumbbell Extension', '3', '12', 45, 'Controlled', '17 lbs each or build', 'Dumbbells'),
    ...coreMid, ...cooldown5
  ];

  const w3Tue = [...warmup15,
    ex('Chest', 'Barbell Bench Press', '3', '10', 90, 'Controlled', '+5 lbs (now 120 lbs incline barbell) if W1-2 felt clean', 'Barbell'),
    ex('Chest', 'Incline Dumbbell Press', '3', '10', 75, 'Controlled', '+5 lbs each (now 65-70 lbs DB) if form held', 'Dumbbells'),
    ex('Chest', 'Pec Deck Fly', '3', '12', 60, 'Controlled', '150 lbs pec deck — build on your strong baseline.', 'Machine'),
    ex('Biceps', 'Barbell Curl', '3', '10', 60, 'Controlled', '+5 lbs (now 75 lbs)', 'Barbell'),
    ex('Biceps', 'Hammer Curl', '3', '12', 45, 'Controlled', '27.5 lbs hammer curl if available, else stay at 25.', 'Dumbbells'),
    ex('Back', 'Lat Pulldown (Wide)', '3', '12', 60, 'Controlled', 'Build weight', 'Machine'),
    ex('Back', 'Cable Face Pull', '3', '15', 45, 'Controlled', 'Light, rotator priority', 'Cable'),
    ...coreFull, ...cooldown5
  ];

  const w3Wed = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', '210 lbs leg press — +10 only if zero knee discomfort.', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', '+10 lbs', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Add weight', 'Machine'),
    ex('Lower', 'Standing Hip Extension (Cable)', '3', '12 each', 45, 'Controlled', 'Build resistance', 'Cable'),
    ex('Lower', 'Glute Bridge (Weighted)', '3', '15', 45, 'Controlled', '25-35 lb dumbbell if ready', 'Dumbbells'),
    ...kneeStretch, ...walkCooldown
  ];

  const w3Thu = [...warmup15,
    ex('Back', 'Seated Cable Row', '3', '10', 75, 'Controlled', '+10 lbs', 'Cable'),
    ex('Back', 'Lat Pulldown (Underhand)', '3', '12', 60, 'Controlled', 'Build weight', 'Machine'),
    ex('Back', 'Single-Arm Row', '3', '10 each', 60, 'Controlled', '+5 lbs each', 'Dumbbells'),
    ex('Shoulders', 'Dumbbell Shoulder Press', '3', '10', 75, 'Controlled', '40 lbs each shoulder press. Build from 35.', 'Dumbbells'),
    ex('Shoulders', 'Dumbbell Lateral Raise', '3', '12', 45, 'Controlled', '17.5 lbs lateral raise if available, else 20 lbs.', 'Dumbbells'),
    ex('Triceps', 'Cable Pushdown', '3', '12', 45, 'Controlled', 'Add weight', 'Cable'),
    ex('Back', 'Cable Face Pull', '3', '15', 45, 'Controlled', 'Light, rotator', 'Cable'),
    ...coreFull, ...cooldown5
  ];

  const w3Fri = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', '+10 lbs', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Build weight', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', '+10 lbs', 'Machine'),
    ex('Lower', 'Standing Calf Raise', '3', '20', 30, 'Controlled', 'Add weight', 'Machine'),
    ex('Lower', 'Glute Bridge (Weighted)', '3', '15', 45, 'Controlled', '+10 lbs dumbbell', 'Dumbbells'),
    ...coreFull, ...kneeStretch, ...walkCooldown
  ];

  // ===== WEEK 4 (BUILD - MAINTAIN W3 WEIGHT) =====
  const w4Mon = [...warmup15,
    ex('Chest', 'Machine Chest Press', '3', '12', 60, 'Controlled', 'W3 weight, focus form', 'Machine'),
    ex('Back', 'Seated Cable Row', '3', '12', 60, 'Controlled', 'Maintain', 'Cable'),
    ex('Biceps', 'Dumbbell Curls', '3', '12', 45, 'Controlled', '22 lbs, smooth reps', 'Dumbbells'),
    ex('Triceps', 'Overhead Dumbbell Extension', '3', '12', 45, 'Controlled', '17 lbs', 'Dumbbells'),
    ...coreMid, ...cooldown5
  ];

  const w4Tue = [...warmup15,
    ex('Chest', 'Barbell Bench Press', '3', '10', 90, 'Controlled', '120 lbs incline barbell — W3 weight or +5 if clean.', 'Barbell'),
    ex('Chest', 'Incline Smith Machine Press', '3', '10', 75, 'Controlled', 'Switch to variation: 90 lbs total', 'Smith Machine'),
    ex('Chest', 'Pec Deck Fly', '3', '12', 60, 'Controlled', '150 lbs pec deck — maintain W3.', 'Machine'),
    ex('Biceps', 'Barbell Curl', '3', '10', 60, 'Controlled', '75 lbs barbell curl — build.', 'Barbell'),
    ex('Biceps', 'Cable Curl (Machine)', '3', '12', 45, 'Controlled', 'Switch variation: moderate weight', 'Machine'),
    ex('Back', 'Lat Pulldown (Close Neutral)', '3', '12', 60, 'Controlled', 'Variation: narrow grip neutral', 'Machine'),
    ex('Back', 'Reverse Pec Deck (Rear Delt)', '3', '15', 45, 'Controlled', 'Variation: rear delt emphasis', 'Machine'),
    ...coreFull, ...cooldown5
  ];

  const w4Wed = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', 'W3 weight', 'Machine'),
    ex('Lower', 'Leg Curl (Seated)', '3', '12', 60, 'Controlled', 'Variation: seated vs lying', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Maintain w3', 'Machine'),
    ex('Lower', 'Standing Cable Kickbacks', '3', '12 each', 45, 'Controlled', 'Variation: cable vs machine', 'Cable'),
    ex('Lower', 'Glute Bridge (Weighted)', '3', '15', 45, 'Controlled', '+5 lbs', 'Dumbbells'),
    ...kneeStretch, ...walkCooldown
  ];

  const w4Thu = [...warmup15,
    ex('Back', 'Seal Rows (or Machine Chest-Supported Row)', '3', '10', 75, 'Controlled', 'Variation: chest support for back', 'Machine'),
    ex('Back', 'Lat Pulldown (Underhand)', '3', '12', 60, 'Controlled', 'Maintain weight', 'Machine'),
    ex('Back', 'Dumbbell Rows (Alternating)', '3', '10 each', 60, 'Controlled', 'Variation: alternating vs single', 'Dumbbells'),
    ex('Shoulders', 'Machine Shoulder Press', '3', '10', 75, 'Controlled', 'Variation: machine vs dumbbell', 'Machine'),
    ex('Shoulders', 'Plate Loaded Lateral Raise Machine', '3', '12', 45, 'Controlled', 'Variation: machine vs free weight', 'Machine'),
    ex('Triceps', 'Dips (Assisted if needed)', '3', '8-10', 45, 'Controlled', 'Variation: bodyweight progression', 'Machine'),
    ex('Back', 'Machine Face Pull (or Cable)', '3', '15', 45, 'Controlled', 'Rotator cuff', 'Machine'),
    ...coreFull, ...cooldown5
  ];

  const w4Fri = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', 'Maintain w3', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Maintain', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Maintain w3', 'Machine'),
    ex('Lower', 'Standing Calf Raise', '3', '20', 30, 'Controlled', 'Add weight if easy', 'Machine'),
    ex('Lower', 'Glute Bridge (Weighted)', '3', '15', 45, 'Controlled', '+5 lbs', 'Dumbbells'),
    ...coreFull, ...kneeStretch, ...walkCooldown
  ];

  // ===== WEEKS 5-6 (PUSH - PEAK EFFORT WEEKS) =====
  // Week 5: Peak loads, add sets on main lifts
  const w5Mon = [...warmup15,
    ex('Chest', 'Machine Chest Press', '4', '12', 60, '3010', '135 lbs × 4 sets. Slow 3-sec descent. Feel the chest load.', 'Machine'),
    ex('Back', 'Seated Cable Row', '3', '12', 60, 'Controlled', 'Heavy week — push last 1-2 reps hard.', 'Cable'),
    ex('Biceps', 'Dumbbell Curls', '3', '12', 45, 'Controlled', '+5 lbs each (now 27)', 'Dumbbells'),
    ex('Triceps', 'Overhead Dumbbell Extension', '3', '12', 45, 'Controlled', '+5 lbs', 'Dumbbells'),
    ...coreFull, ...cooldown5
  ];

  const w5Tue = [...warmup15,
    ex('Chest', 'Barbell Bench Press', '4', '10', 90, '3010', '125 lbs incline barbell, 4 sets, 3-sec descent. +10 from W1.', 'Barbell'),
    ex('Chest', 'Incline Smith Machine Press', '3', '10', 75, 'Controlled', '130 lbs incline barbell. Keep building.', 'Smith Machine'),
    ex('Chest', 'Pec Deck Fly', '3', '12', 60, 'Controlled', '160 lbs pec deck. Heavy week.', 'Machine'),
    ex('Biceps', 'Barbell Curl', '3', '10', 60, 'Controlled', '80 lbs barbell curl — heavy week.', 'Barbell'),
    ex('Biceps', 'Cable Curl (Machine)', '3', '12', 45, 'Controlled', 'Heavy week', 'Machine'),
    ex('Back', 'Lat Pulldown (Close Neutral)', '3', '12', 60, 'Controlled', 'Max weight this cycle', 'Machine'),
    ex('Back', 'Reverse Pec Deck', '3', '15', 45, 'Controlled', 'Heavy week', 'Machine'),
    ...coreFull, ...cooldown5
  ];

  const w5Wed = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', '+10 lbs if pain-free', 'Machine'),
    ex('Lower', 'Leg Curl (Seated)', '3', '12', 60, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Standing Cable Kickbacks', '3', '12 each', 45, 'Controlled', 'Heavy week', 'Cable'),
    ex('Lower', 'Glute Bridge (Weighted)', '3', '15', 45, 'Controlled', '+5 lbs', 'Dumbbells'),
    ...kneeStretch, ...walkCooldown
  ];

  const w5Thu = [...warmup15,
    ex('Back', 'Seal Rows (Machine)', '3', '10', 75, 'Controlled', 'Heavy week', 'Machine'),
    ex('Back', 'Lat Pulldown (Underhand)', '3', '12', 60, 'Controlled', 'Heavy week', 'Machine'),
    ex('Back', 'Dumbbell Rows (Alternating)', '3', '10 each', 60, 'Controlled', '55 lbs each, heavy', 'Dumbbells'),
    ex('Shoulders', 'Machine Shoulder Press', '3', '10', 75, 'Controlled', '+10 lbs (now 95 total)', 'Machine'),
    ex('Shoulders', 'Plate Lateral Raise Machine', '3', '12', 45, 'Controlled', 'Heavy week', 'Machine'),
    ex('Triceps', 'Dips (Assisted)', '3', '8-10', 45, 'Controlled', 'Heavy week, add weight if able', 'Machine'),
    ex('Back', 'Machine Face Pull', '3', '15', 45, 'Controlled', 'Maintain light', 'Machine'),
    ...coreFull, ...cooldown5
  ];

  const w5Fri = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Standing Calf Raise', '3', '20', 30, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Glute Bridge (Weighted)', '3', '15', 45, 'Controlled', 'Heavy week', 'Dumbbells'),
    ...coreFull, ...kneeStretch, ...walkCooldown
  ];

  // Week 6: Maintain W5 loads
  const w6Mon = [...w5Mon];
  const w6Tue = [...w5Tue];
  const w6Wed = [...w5Wed];
  const w6Thu = [...w5Thu];
  const w6Fri = [...w5Fri];

  // ===== WEEKS 7-9 (PUSH HARD - MAX EFFORT) =====
  // Week 7: Peak effort, technical failure
  const w7Mon = [...warmup15,
    ex('Chest', 'Machine Chest Press', '4', '12', 60, '3010', '145 lbs × 4 sets. Your peak machine chest press target.', 'Machine'),
    ex('Back', 'Seated Cable Row', '3', '12', 60, 'Controlled', 'Heavy', 'Cable'),
    ex('Biceps', 'Dumbbell Curls', '3', '12', 45, 'Controlled', '+5 lbs (now 32)', 'Dumbbells'),
    ex('Triceps', 'Overhead Dumbbell Extension', '3', '12', 45, 'Controlled', '+5 lbs (now 22)', 'Dumbbells'),
    ...coreFull, ...cooldown5
  ];

  const w7Tue = [...warmup15,
    ex('Chest', 'Barbell Bench Press', '4', '10', 90, '3010', '135 lbs incline barbell, 4 sets. Your 12-week incline peak.', 'Barbell'),
    ex('Chest', 'Incline Barbell Press', '3', '10', 75, 'Controlled', '135 lbs incline barbell — max effort this cycle.', 'Barbell'),
    ex('Chest', 'Pec Deck Fly', '3', '12', 60, 'Controlled', '165 lbs pec deck. Peak weight this cycle.', 'Machine'),
    ex('Biceps', 'Barbell Curl', '3', '10', 60, 'Controlled', '85 lbs barbell curl. Peak effort.', 'Barbell'),
    ex('Biceps', 'Incline Dumbbell Curl', '3', '12', 45, 'Controlled', 'Variation: incline bench setup', 'Dumbbells'),
    ex('Back', 'Lat Pulldown (Close Grip)', '3', '12', 60, 'Controlled', 'Variation: close neutral grip', 'Machine'),
    ex('Back', 'Reverse Pec Deck', '3', '15', 45, 'Controlled', 'Heavy', 'Machine'),
    ...coreFull, ...cooldown5
  ];

  const w7Wed = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', '+10 lbs if pain-free', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Cable Hip Flexion (or Kickbacks)', '3', '12 each', 45, 'Controlled', 'Heavy week', 'Cable'),
    ex('Lower', 'Glute Bridge (Weighted)', '3', '15', 45, 'Controlled', '+10 lbs', 'Dumbbells'),
    ...kneeStretch, ...walkCooldown
  ];

  const w7Thu = [...warmup15,
    ex('Back', 'T-Bar Rows (or Seal Rows)', '3', '10', 75, 'Controlled', 'Variation: heavy rowing', 'Machine'),
    ex('Back', 'Lat Pulldown (Underhand)', '3', '12', 60, 'Controlled', 'Heavy week', 'Machine'),
    ex('Back', 'Single-Arm Landmine Row', '3', '10 each', 60, 'Controlled', 'Variation: landmine setup', 'Landmine'),
    ex('Shoulders', 'Machine Shoulder Press', '3', '10', 75, 'Controlled', '+15 lbs (now 110)', 'Machine'),
    ex('Shoulders', 'Lateral Raise Machine', '3', '12', 45, 'Controlled', 'Heavy week', 'Machine'),
    ex('Triceps', 'Rope Pushdown (Heavy)', '3', '12', 45, 'Controlled', 'Heavy week', 'Cable'),
    ex('Back', 'Reverse Pec Deck', '3', '15', 45, 'Controlled', 'Rotator cuff maintenance', 'Machine'),
    ...coreFull, ...cooldown5
  ];

  const w7Fri = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Standing Calf Raise', '3', '20', 30, 'Controlled', 'Heavy week', 'Machine'),
    ex('Lower', 'Glute Bridge (Weighted)', '3', '15', 45, 'Controlled', 'Heavy week', 'Dumbbells'),
    ...coreFull, ...kneeStretch, ...walkCooldown
  ];

  // Weeks 8-9: Maintain W7 loads
  const w8Mon = [...w7Mon];
  const w8Tue = [...w7Tue];
  const w8Wed = [...w7Wed];
  const w8Thu = [...w7Thu];
  const w8Fri = [...w7Fri];

  const w9Mon = [...w7Mon];
  const w9Tue = [...w7Tue];
  const w9Wed = [...w7Wed];
  const w9Thu = [...w7Thu];
  const w9Fri = [...w7Fri];

  // ===== WEEK 10 (DELOAD - 30% WEIGHT DROP) =====
  const w10Mon = [...warmup15,
    ex('Chest', 'Machine Chest Press', '3', '12', 60, 'Controlled', '~90 lbs machine chest press. Drop 30%. Recovery week.', 'Machine'),
    ex('Back', 'Seated Cable Row', '3', '12', 60, 'Controlled', 'Light weight deload', 'Cable'),
    ex('Biceps', 'Dumbbell Curls', '3', '12', 45, 'Controlled', '20 lbs each, light', 'Dumbbells'),
    ex('Triceps', 'Overhead Dumbbell Extension', '3', '12', 45, 'Controlled', '15 lbs, light', 'Dumbbells'),
    ...coreMid, ...cooldown5
  ];

  const w10Tue = [...warmup15,
    ex('Chest', 'Barbell Bench Press', '3', '12', 90, 'Controlled', '~80 lbs incline barbell. Drop 30% — deload is mandatory.', 'Barbell'),
    ex('Chest', 'Incline Barbell Press', '3', '12', 75, 'Controlled', '90 lbs incline barbell light.', 'Barbell'),
    ex('Chest', 'Pec Deck Fly', '3', '12', 60, 'Controlled', '100 lbs pec deck light.', 'Machine'),
    ex('Biceps', 'Barbell Curl', '3', '12', 60, 'Controlled', '50 lbs barbell curl light.', 'Barbell'),
    ex('Biceps', 'Incline Dumbbell Curl', '3', '12', 45, 'Controlled', 'Light recovery', 'Dumbbells'),
    ex('Back', 'Lat Pulldown (Close)', '3', '12', 60, 'Controlled', 'Light', 'Machine'),
    ex('Back', 'Reverse Pec Deck', '3', '15', 45, 'Controlled', 'Light', 'Machine'),
    ...coreMid, ...cooldown5
  ];

  const w10Wed = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', 'Drop 30% weight, light', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Light recovery', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Light recovery', 'Machine'),
    ex('Lower', 'Cable Hip Flexion', '3', '12 each', 45, 'Controlled', 'Light recovery', 'Cable'),
    ex('Lower', 'Glute Bridge (Bodyweight)', '3', '15', 45, 'Controlled', 'Bodyweight only deload', 'Bodyweight'),
    ...kneeStretch, ...walkCooldown
  ];

  const w10Thu = [...warmup15,
    ex('Back', 'T-Bar Rows', '3', '10', 75, 'Controlled', 'Light recovery weight', 'Machine'),
    ex('Back', 'Lat Pulldown (Underhand)', '3', '12', 60, 'Controlled', 'Light', 'Machine'),
    ex('Back', 'Single-Arm Landmine Row', '3', '10 each', 60, 'Controlled', 'Light recovery', 'Landmine'),
    ex('Shoulders', 'Machine Shoulder Press', '3', '10', 75, 'Controlled', 'Light recovery weight', 'Machine'),
    ex('Shoulders', 'Lateral Raise Machine', '3', '12', 45, 'Controlled', 'Light', 'Machine'),
    ex('Triceps', 'Rope Pushdown', '3', '12', 45, 'Controlled', 'Light recovery', 'Cable'),
    ex('Back', 'Reverse Pec Deck', '3', '15', 45, 'Controlled', 'Light maintenance', 'Machine'),
    ...coreMid, ...cooldown5
  ];

  const w10Fri = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', 'Light recovery', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Light recovery', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Light recovery', 'Machine'),
    ex('Lower', 'Standing Calf Raise', '3', '20', 30, 'Controlled', 'Light recovery', 'Machine'),
    ex('Lower', 'Glute Bridge (Bodyweight)', '3', '15', 45, 'Controlled', 'Bodyweight deload', 'Bodyweight'),
    ...coreMid, ...kneeStretch, ...walkCooldown
  ];

  // ===== WEEKS 11-12 (PEAK - PUSH PAST W7-9 MAXES) =====
  // Week 11: New max attempt
  const w11Mon = [...warmup15,
    ex('Chest', 'Machine Chest Press', '3', '12', 60, 'Controlled', '150 lbs machine chest press. New personal record attempt.', 'Machine'),
    ex('Back', 'Seated Cable Row', '3', '12', 60, 'Controlled', 'Build past max', 'Cable'),
    ex('Biceps', 'Dumbbell Curls', '3', '12', 45, 'Controlled', '+5 lbs (now 37)', 'Dumbbells'),
    ex('Triceps', 'Overhead Dumbbell Extension', '3', '12', 45, 'Controlled', '+5 lbs (now 27)', 'Dumbbells'),
    ...coreFull, ...cooldown5
  ];

  const w11Tue = [...warmup15,
    ex('Chest', 'Barbell Bench Press', '3', '10', 90, 'Controlled', '140 lbs incline barbell. Push past W7 peak.', 'Barbell'),
    ex('Chest', 'Incline Barbell Press', '3', '10', 75, 'Controlled', '140 lbs incline barbell — peak week.', 'Barbell'),
    ex('Chest', 'Pec Deck Fly', '3', '12', 60, 'Controlled', '170 lbs pec deck. Final peak.', 'Machine'),
    ex('Biceps', 'Barbell Curl', '3', '10', 60, 'Controlled', '90 lbs barbell curl. New PR attempt.', 'Barbell'),
    ex('Biceps', 'Incline Dumbbell Curl', '3', '12', 45, 'Controlled', '+5 lbs each', 'Dumbbells'),
    ex('Back', 'Lat Pulldown (Close)', '3', '12', 60, 'Controlled', 'Build past max', 'Machine'),
    ex('Back', 'Reverse Pec Deck', '3', '15', 45, 'Controlled', 'Peak effort', 'Machine'),
    ...coreFull, ...cooldown5
  ];

  const w11Wed = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', '+5-10 lbs past max', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Build past max', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Build past max', 'Machine'),
    ex('Lower', 'Cable Hip Flexion', '3', '12 each', 45, 'Controlled', 'Build past max', 'Cable'),
    ex('Lower', 'Glute Bridge (Weighted)', '3', '15', 45, 'Controlled', '+10 lbs', 'Dumbbells'),
    ...kneeStretch, ...walkCooldown
  ];

  const w11Thu = [...warmup15,
    ex('Back', 'T-Bar Rows', '3', '10', 75, 'Controlled', 'Add weight past max', 'Machine'),
    ex('Back', 'Lat Pulldown (Underhand)', '3', '12', 60, 'Controlled', 'Build past max', 'Machine'),
    ex('Back', 'Single-Arm Landmine Row', '3', '10 each', 60, 'Controlled', '+5 lbs each', 'Landmine'),
    ex('Shoulders', 'Machine Shoulder Press', '3', '10', 75, 'Controlled', '+10 lbs (now 125)', 'Machine'),
    ex('Shoulders', 'Lateral Raise Machine', '3', '12', 45, 'Controlled', 'Build weight', 'Machine'),
    ex('Triceps', 'Rope Pushdown', '3', '12', 45, 'Controlled', 'Build past max', 'Cable'),
    ex('Back', 'Reverse Pec Deck', '3', '15', 45, 'Controlled', 'Rotator maintenance', 'Machine'),
    ...coreFull, ...cooldown5
  ];

  const w11Fri = [...warmup15,
    ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', 'Build past max', 'Machine'),
    ex('Lower', 'Hip Abduction', '3', '15', 45, 'Controlled', 'Build past max', 'Machine'),
    ex('Lower', 'Lying Leg Curl', '3', '12', 60, 'Controlled', 'Build past max', 'Machine'),
    ex('Lower', 'Standing Calf Raise', '3', '20', 30, 'Controlled', 'Build weight', 'Machine'),
    ex('Lower', 'Glute Bridge (Weighted)', '3', '15', 45, 'Controlled', 'Peak weight', 'Dumbbells'),
    ...coreFull, ...kneeStretch, ...walkCooldown
  ];

  // Week 12: Maintain W11 peak loads
  const w12Mon = [...w11Mon];
  const w12Tue = [...w11Tue];
  const w12Wed = [...w11Wed];
  const w12Thu = [...w11Thu];
  const w12Fri = [...w11Fri];

  // ===== PROGRAM STRUCTURE =====
  const PROGRAMS = [
    { id: 'joey-12wk-knee-safe', name: '12-Week Knee-Safe Upper Focus 2026', weeks: 12 }
  ];

  const GUIDE_HTML = `
<h2>12-Week Knee-Safe Upper Body + Core Focus Program</h2>
<p><strong>Duration:</strong> 12 weeks | <strong>Target:</strong> Joey, 35yo, 200 lbs, burn belly fat + tone upper body (chest, biceps, core)</p>
<p><strong>Location:</strong> Planet Fitness | <strong>Schedule:</strong> Monday 60 min, Tue/Wed/Thu/Fri 90 min each</p>

<h2>Progression Protocol</h2>
<ul>
<li><strong>Weeks 1-3 (Foundation):</strong> Establish baseline weights. Master form. Light-moderate loads, focus on smooth reps and control. Rep range: 10-15.</li>
<li><strong>Weeks 4-6 (Build):</strong> Increase weight 5 lbs upper / 10 lbs lower after 2 consecutive sessions at top of rep range. Push closer to failure (1-2 reps in reserve). Maintain strict form. Introduce exercise variations.</li>
<li><strong>Weeks 7-9 (Push Hard):</strong> Peak effort weeks. Maximum weight maintaining perfect form. Technical failure (form breakdown) = stop set. Add sets on main lifts. Four sets on barbell bench / machine chest press. Heavy everything.</li>
<li><strong>Week 10 (Deload):</strong> Reduce all weights 30%. Same volume, lighter intensity. Joint recovery week. Focus on movement quality and breathing. Essential for tendon recovery.</li>
<li><strong>Weeks 11-12 (Peak):</strong> Return refreshed. Attempt new personal records. Maintain heavy loads from weeks 7-9 or exceed them. Final push before next cycle.</li>
</ul>

<h2>Exercise Variations (Weekly Rotation)</h2>
<p><strong>Upper Body Pressing Variations:</strong></p>
<ul>
<li>Machine Chest Press (W1-3, 5-6, 7-9, 11-12)</li>
<li>Barbell Bench Press (W1-3, 5-6, 7-9, 11-12)</li>
<li>Incline Dumbbell Press (W1-3, 5-6, 7-9, 11-12)</li>
<li>Incline Smith Machine Press (W4-6, 8-9)</li>
<li>Incline Barbell Press (W5-6, 7-9, 11-12)</li>
</ul>

<p><strong>Back Variations:</strong></p>
<ul>
<li>Seated Cable Row (W1-4)</li>
<li>T-Bar Rows (W7-9, 11-12)</li>
<li>Seal Rows (W4, 7-9)</li>
<li>Single-Arm Landmine Row (W7-9, 11-12)</li>
<li>Lat Pulldown Grips: Wide, Underhand, Close Neutral, Narrow</li>
</ul>

<p><strong>Arm Variations:</strong></p>
<ul>
<li>Barbell Curl, Cable Curl, Incline Dumbbell Curl (Biceps)</li>
<li>Rope Pushdown, Overhead DB Extension, Machine Dips (Triceps)</li>
</ul>

<h2>Starting Weights (Week 1 Baseline)</h2>
<ul>
<li><strong>Barbell Bench Press:</strong> 135 lbs × 3 × 10</li>
<li><strong>Incline Dumbbell Press:</strong> 45 lbs each × 3 × 10</li>
<li><strong>Barbell Curl:</strong> 65 lbs × 3 × 10</li>
<li><strong>Dumbbell Curl:</strong> 20 lbs each × 3 × 12</li>
<li><strong>Dumbbell Shoulder Press:</strong> 35 lbs each × 3 × 10</li>
<li><strong>Leg Press (Shallow):</strong> Light-moderate weight, 60-70° bend only</li>
<li><strong>Note:</strong> Adjust ±5-10 lbs week 1 if starting weights feel too light/heavy</li>
</ul>

<h2>The 2-Rep Rule (Progression Trigger)</h2>
<p>When you complete the <strong>top of your rep range with perfect form for 2 consecutive sessions</strong>, increase weight by smallest increment: +5 lbs upper body, +10 lbs lower body machines. Example: If you hit 3×12 with 45 lbs dumbbell curls in W2 Monday and W2 Tuesday, increase to 47.5 lbs (or round to 50) on next week.</p>

<h2>Cardio for Belly Fat Loss</h2>
<ul>
<li><strong>Weeks 1-4:</strong> 10-15 min incline walk warm-up only</li>
<li><strong>Weeks 5-8:</strong> Add 10 min cooldown walk (Friday only) = 20-25 min walking per week</li>
<li><strong>Weeks 9-12:</strong> Extend Friday cooldown to 15 min = 25-30 min walking per week</li>
<li><strong>No running, jumping, or HIIT — steady incline walk only (3 mph, 5-10% grade)</strong></li>
</ul>

<h2>Knee Safety — MANDATORY STOPS</h2>
<ul>
<li><strong>Stop immediately if:</strong> Sharp pain, instability/giving way, swelling, painful clicking</li>
<li><strong>Reduce or modify if:</strong> Dull ache during exercise, reduced range of motion, stiffness</li>
<li><strong>Always avoid:</strong> Deep knee bends, squats, lunges, side-to-side cutting, jumping, leg extension machine</li>
<li><strong>Protect the knee with:</strong> Hip abduction machine (lateral stabilizers), hamstring curls (secondary ACL), glute bridges (reduce knee load)</li>
<li><strong>Warm-up priority:</strong> Hip mobility, ankle mobility, knee activation before each lower session</li>
</ul>

<h2>Nutrition for Belly Fat + Muscle Tone</h2>
<ul>
<li><strong>Calorie Goal:</strong> Slight deficit (200-300 cal below maintenance) to burn fat, preserve muscle</li>
<li><strong>Protein:</strong> 180-200g daily (0.9-1.0 g/lb) — essential for muscle retention during fat loss</li>
<li><strong>Pre-workout:</strong> Carbs + protein 60-90 min before (banana + yogurt, oats + eggs)</li>
<li><strong>Post-workout:</strong> 40g protein + 60g carbs within 60 min (shake + rice, chicken + sweet potato)</li>
<li><strong>Hydration:</strong> 100+ oz water daily, +16-20 oz per hour training</li>
</ul>

<h2>Timeline for Visible Results</h2>
<ul>
<li><strong>Weeks 1-2:</strong> Baseline established, form mastery</li>
<li><strong>Weeks 3-4:</strong> Upper body definition starting, chest/arms beginning to show</li>
<li><strong>Weeks 5-6:</strong> Visible chest and bicep gains, belly fat reduction beginning</li>
<li><strong>Weeks 7-9:</strong> Shoulder and back gains, core strength visible, noticeable belly fat loss</li>
<li><strong>Week 10:</strong> Recovery and deload — mental refresh, tendon/joint recovery</li>
<li><strong>Weeks 11-12:</strong> Final strength push, visible abs upper definition (with diet), full program benefits realized</li>
</ul>

<h2>Critical Knee Safety Rules</h2>
<ol>
<li><strong>Leg Press Depth:</strong> Feet always high on platform. Only 60-70° knee bend. Never lockout or go below parallel.</li>
<li><strong>Hip Abduction (Every Lower Day):</strong> Build lateral stabilizers. This is your knee insurance.</li>
<li><strong>Hamstring Curls (3x/week):</strong> Strong hamstrings = secondary ACL. Non-negotiable.</li>
<li><strong>Stop At Pain:</strong> Dull ache = ease up. Sharp pain = STOP immediately. Swelling = ice + rest day.</li>
<li><strong>No Leg Extension Machine:</strong> This loads the knee at worst angle. Avoid entirely.</li>
</ol>

<h2>FAQ</h2>
<ul>
<li><strong>Missed a workout?</strong> Continue next scheduled day. Don't "make up" workouts. After 2+ days off, reduce weights 10%.</li>
<li><strong>Knee pain or discomfort?</strong> Stop immediately. Use substitution from program. If it persists 2+ days, consult a PT.</li>
<li><strong>Bonus work?</strong> Optional. Prioritize the main sessions. Extra volume = extra recovery needed.</li>
<li><strong>Slow progress?</strong> Check sleep (8+ hours), nutrition (protein intake), stress levels, knee pain. Progress compounds weekly.</li>
<li><strong>After 12 weeks?</strong> Restart at Week 1 with new baseline weights (heavier now). Or begin different program cycle (Weeks 1-6 → 7-12 new program).</li>
</ul>
`;

  const PROGRAM_GUIDES = {
    'joey-12wk-knee-safe': GUIDE_HTML
  };

  const PROGRAM_TEMPLATES = {
    'joey-12wk-knee-safe': {
      weeks: {
        1: { Monday: w1Mon, Tuesday: w1Tue, Wednesday: w1Wed, Thursday: w1Thu, Friday: w1Fri, Saturday: [], Sunday: [] },
        2: { Monday: w2Mon, Tuesday: w2Tue, Wednesday: w2Wed, Thursday: w2Thu, Friday: w2Fri, Saturday: [], Sunday: [] },
        3: { Monday: w3Mon, Tuesday: w3Tue, Wednesday: w3Wed, Thursday: w3Thu, Friday: w3Fri, Saturday: [], Sunday: [] },
        4: { Monday: w4Mon, Tuesday: w4Tue, Wednesday: w4Wed, Thursday: w4Thu, Friday: w4Fri, Saturday: [], Sunday: [] },
        5: { Monday: w5Mon, Tuesday: w5Tue, Wednesday: w5Wed, Thursday: w5Thu, Friday: w5Fri, Saturday: [], Sunday: [] },
        6: { Monday: w6Mon, Tuesday: w6Tue, Wednesday: w6Wed, Thursday: w6Thu, Friday: w6Fri, Saturday: [], Sunday: [] },
        7: { Monday: w7Mon, Tuesday: w7Tue, Wednesday: w7Wed, Thursday: w7Thu, Friday: w7Fri, Saturday: [], Sunday: [] },
        8: { Monday: w8Mon, Tuesday: w8Tue, Wednesday: w8Wed, Thursday: w8Thu, Friday: w8Fri, Saturday: [], Sunday: [] },
        9: { Monday: w9Mon, Tuesday: w9Tue, Wednesday: w9Wed, Thursday: w9Thu, Friday: w9Fri, Saturday: [], Sunday: [] },
        10: { Monday: w10Mon, Tuesday: w10Tue, Wednesday: w10Wed, Thursday: w10Thu, Friday: w10Fri, Saturday: [], Sunday: [] },
        11: { Monday: w11Mon, Tuesday: w11Tue, Wednesday: w11Wed, Thursday: w11Thu, Friday: w11Fri, Saturday: [], Sunday: [] },
        12: { Monday: w12Mon, Tuesday: w12Tue, Wednesday: w12Wed, Thursday: w12Thu, Friday: w12Fri, Saturday: [], Sunday: [] }
      }
    }
  };

  return { PROGRAMS, PROGRAM_GUIDES, PROGRAM_TEMPLATES };
};
