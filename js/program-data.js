window.buildProgramData = function buildProgramData(legacyWorkouts) {
  const ex = (phase, exercise, sets, reps, rest, tempo, notes, equipment) => ({
    phase, exercise, sets, reps, rest, tempo, notes, equipment
  });

  // ── REUSABLE BLOCKS ──────────────────────────────────────────────
  const WU = [
    ex('Warm-Up','Arm Circles + Band Pull-Aparts','1','1 min',0,'Controlled','Open chest before pressing','Bodyweight'),
    ex('Warm-Up','Cat-Cow Spine Waves','1','10 reps',0,'Smooth','Spinal mobility before loading','Bodyweight')
  ];
  const CD = [
    ex('Cooldown','Standing Chest Stretch','1','30 sec',0,'Hold','Against wall, gentle pull','Bodyweight'),
    ex('Cooldown','Standing Forward Fold','1','45 sec',0,'Hold','Soft knees, relax neck','Bodyweight')
  ];
  const CORE_A = [
    ex('Core','Decline Sit-Ups','3','15',45,'Controlled','No neck pull, controlled descent','Decline Bench'),
    ex('Core','Plank Hold','3','30 sec',45,'Hold','Ribs down, brace hard','Bodyweight'),
    ex('Core','Russian Twists','2','20',45,'Controlled','Feet down — less knee stress','Bodyweight')
  ];
  const CORE_B = [
    ex('Core','Decline Sit-Ups','3','20',45,'Controlled','Full range, controlled','Decline Bench'),
    ex('Core','Plank Hold','3','45 sec',45,'Hold','Extended holds','Bodyweight'),
    ex('Core','Dead Bug','3','10/side',45,'Controlled','Low back pressed to floor','Bodyweight'),
    ex('Core','Side Plank','2','30 sec/side',45,'Hold','Hips stacked, no sag','Bodyweight')
  ];
  const CORE_LIGHT = [
    ex('Core','Plank Hold','2','30 sec',30,'Hold','Optional light finisher — skip if fatigued','Bodyweight'),
    ex('Core','Dead Bug','2','8/side',30,'Controlled','Quality over volume','Bodyweight')
  ];
  const FOAM = [
    ex('Foam Rolling','IT Band Foam Roll','1','60 sec/leg',0,'Slow','Pause on tender spots','Foam Roller'),
    ex('Foam Rolling','Quad Foam Roll','1','60 sec/leg',0,'Slow','Inner, middle, outer passes','Foam Roller'),
    ex('Foam Rolling','Hamstring Foam Roll','1','60 sec/leg',0,'Slow','Toes rotated in and out','Foam Roller'),
    ex('Foam Rolling','Calf Foam Roll','1','45 sec/leg',0,'Slow','Cross one leg for more pressure','Foam Roller')
  ];
  const HIP = [
    ex('Hip Flexor','Couch Stretch','1','60 sec/leg',0,'Hold','Back foot on bench, sink hips forward','Bench'),
    ex('Hip Flexor','Hip Flexor Stretch (Kneeling or Standing)','1','60 sec/leg',0,'Hold','Skip kneeling if it hurts — use standing lunge','Bodyweight'),
    ex('Hip Flexor','Pigeon Pose (Modified)','1','60 sec/leg',0,'Hold','Mat, lie forward over front shin','Mat')
  ];
  const FLEX = [
    ex('Flexibility','Supine Hamstring Stretch (Band)','1','90 sec/leg',0,'Hold','Lying, band under foot, pull gently','Resistance Band'),
    ex('Flexibility','Seated Butterfly Stretch','1','60 sec',0,'Hold','Inner thigh / adductor release','Bodyweight'),
    ex('Flexibility','Side Lunge Hold','1','45 sec/leg',0,'Hold','Shift weight to one side, other leg straight','Bodyweight')
  ];
  const ANKLE = [
    ex('Ankle Mobility','Knee-to-Wall Drill','1','10 reps/leg',0,'Controlled','Foot 4-6 in from wall, knee over pinky toe','Bodyweight'),
    ex('Ankle Mobility','Standing Calf Stretch (Wall)','1','45 sec/leg',0,'Hold','Straight leg, then bent knee','Bodyweight'),
    ex('Ankle Mobility','Ankle Circles','1','20 each dir/leg',0,'Controlled','Full range slow circles','Bodyweight')
  ];
  const VMO_BASE = [
    ex('VMO','Terminal Knee Extension (Band)','3','15/leg',30,'Controlled','Band behind knee, straighten from 30° — feel inner quad fire','Resistance Band'),
    ex('VMO','Wall Sit (Toes Slightly Out)','3','30 sec',45,'Hold','10-15° out activates VMO — stop if sharp pain','Bodyweight'),
    ex('VMO','Step-Down (Stair or Low Box)','3','10/leg',45,'Controlled','Slow descent — VMO fires on the way down','Bodyweight')
  ];
  const VMO_ADV = [
    ex('VMO','Terminal Knee Extension (Band)','3','20/leg',30,'Controlled','Stronger band — inner quad fire','Resistance Band'),
    ex('VMO','Wall Sit (Toes Out)','3','45 sec',45,'Hold','Longer hold — feel VMO throughout','Bodyweight'),
    ex('VMO','Step-Down (Box)','3','12/leg',45,'Controlled','Add 5-10 lb dumbbell if easy','Bodyweight')
  ];
  const VMO_PEAK = [
    ex('VMO','Terminal Knee Extension (Band)','4','25/leg',30,'Controlled','Heaviest band of cycle','Resistance Band'),
    ex('VMO','Wall Sit (Toes Out)','4','60 sec',45,'Hold','Peak hold — compare to Week 1','Bodyweight'),
    ex('VMO','Step-Down (Box + Light DB)','4','15/leg',45,'Controlled','5-10 lb dumbbell, controlled descent','Dumbbells')
  ];
  const VMO_DELOAD = [
    ex('VMO','Terminal Knee Extension (Light Band)','2','12/leg',30,'Controlled','Light band, recovery week','Resistance Band'),
    ex('VMO','Wall Sit','2','30 sec',45,'Hold','Short hold, deload','Bodyweight')
  ];
  const GLUTE_BASE = [
    ex('Glute','Clamshells (Banded)','3','15/leg',30,'Controlled','Band above knees, slow open','Resistance Band'),
    ex('Glute','Glute Bridge (Bodyweight)','3','15',30,'Controlled','Squeeze at top, 2-sec hold','Bodyweight'),
    ex('Glute','Hip Abduction Machine (Light)','3','15',30,'Controlled','Light — activation not strength today','Machine')
  ];
  const GLUTE_ADV = [
    ex('Glute','Clamshells (Heavy Band)','3','20/leg',30,'Controlled','Stronger band, slow and controlled','Resistance Band'),
    ex('Glute','Single-Leg Glute Bridge','3','12/leg',30,'Controlled','One leg up, drive through heel','Bodyweight'),
    ex('Glute','Hip Abduction Machine (Light)','3','20',30,'Controlled','High reps, light weight','Machine')
  ];
  const COOL_MOB = [
    ex('Cooldown','Supine Spinal Twist','1','60 sec/side',0,'Hold','Knee crosses over, shoulders flat','Mat'),
    ex('Cooldown','Childs Pose','1','60 sec',0,'Hold','Arms extended, breathe into lower back','Mat'),
    ex('Cooldown','Diaphragmatic Breathing','1','2 min',0,'Slow','4 sec inhale, 6 sec exhale','Bodyweight')
  ];
  const ROTATOR = [
    ex('Rotator Cuff','Band External Rotation','2','15/side',30,'Controlled','Elbow pinned to side — light band','Resistance Band'),
    ex('Rotator Cuff','Band Internal Rotation','2','15/side',30,'Controlled','Elbow pinned — protect shoulder health','Resistance Band'),
    ex('Rotator Cuff','Cable Face Pull (Light)','2','15',30,'Controlled','Light — rear delts and cuff care','Cable')
  ];
  const FULL_STRETCH = [
    ex('Full-Body Stretch','Standing Chest Stretch','1','45 sec',0,'Hold','Gentle doorway or wall stretch','Bodyweight'),
    ex('Full-Body Stretch','Seated Forward Fold','1','60 sec',0,'Hold','Soft knees, relax neck and hips','Bodyweight'),
    ex('Full-Body Stretch','Figure-4 Glute Stretch','1','45 sec/side',0,'Hold','Supine or seated — no force into pain','Mat'),
    ex('Full-Body Stretch','Neck and Upper Trap Stretch','1','30 sec/side',0,'Hold','Gentle ear-to-shoulder lean','Bodyweight')
  ];
  const MEDITATION = [
    ex('Mental Performance','Seated Meditation','1','10 min',0,'Slow','Breath focus — box breath or natural breathing. No running today.','Bodyweight')
  ];
  const REFLECT = [
    ex('Reflection','Journaling / Reflection','1','5-10 min',0,'Calm','Note energy, knees, sleep, and one win from the week','Bodyweight')
  ];

  // Track block: 4:30–5:00 AM Mon/Thu — record both timed run laps
  const TRACK = [
    ex('Track','Walk Lap 1','1','1 lap',0,'Easy','Easy pace warmup lap — cardio','Track'),
    ex('Track','Timed Run Lap 1','1','1 lap',0,'Hard','Record this timed lap — cardio. Controlled pace; stop if sharp knee pain','Track'),
    ex('Track','Walk Lap 2','1','1 lap',0,'Easy','Active recovery between timed efforts — cardio','Track'),
    ex('Track','Timed Run Lap 2','1','1 lap',0,'Hard','Record this second timed lap — cardio. Compare both timed lap times','Track')
  ];

  // ── FRIDAY MOBILITY / LONGEVITY BY PHASE ─────────────────────────
  // Reflection + cooldown appended in makeFriday after optional light upper accessories
  const FRI_BASE = [
    ...WU, ...FOAM, ...HIP, ...FLEX, ...ANKLE, ...ROTATOR, ...VMO_BASE, ...GLUTE_BASE, ...CORE_A, ...FULL_STRETCH
  ];
  const FRI_BUILD = [
    ...WU, ...FOAM, ...HIP, ...FLEX, ...ANKLE, ...ROTATOR, ...VMO_ADV, ...GLUTE_BASE, ...CORE_B, ...FULL_STRETCH
  ];
  const FRI_PUSH = [
    ...WU, ...FOAM, ...HIP, ...FLEX, ...ANKLE, ...ROTATOR, ...VMO_ADV, ...GLUTE_ADV, ...CORE_B, ...FULL_STRETCH
  ];
  const FRI_PEAK_HARD = [
    ...WU, ...FOAM, ...HIP, ...FLEX, ...ANKLE, ...ROTATOR, ...VMO_PEAK, ...GLUTE_ADV, ...CORE_B, ...FULL_STRETCH
  ];
  const FRI_DELOAD = [
    ...WU, ...FOAM, ...HIP, ...FLEX, ...ANKLE, ...ROTATOR, ...VMO_DELOAD, ...GLUTE_BASE, ...CORE_A, ...FULL_STRETCH
  ];

  // ── WEDNESDAY RECOVERY / STABILITY BY PHASE ──────────────────────
  // No running. Meditation, hip/hamstring mobility, knee stability, glutes, core, stretch.
  const makeWednesday = (vmo, glute, core) => [
    ...MEDITATION,
    ...WU,
    ...FOAM,
    ...HIP,
    ...FLEX,
    ...ANKLE,
    ...vmo,
    ...glute,
    ...core,
    ...FULL_STRETCH,
    ...COOL_MOB
  ];

  // ── UPPER BODY DAYS BY PHASE ──────────────────────────────────────
  // Monday 5:00–6:00 = Upper strength, chest emphasis, biceps, core (after track)
  const makeMonday = (chestWt, curlWt, notes) => [
    ...TRACK,
    ...WU,
    ex('Chest','Machine Chest Press','3','12',60,'Controlled', chestWt + ' lbs — ' + notes,'Machine'),
    ex('Chest','Pec Deck Fly','3','12',60,'Controlled','Chest emphasis — controlled squeeze','Machine'),
    ex('Biceps','Dumbbell Curls','3','12',45,'Controlled', curlWt + ' lbs each','Dumbbells'),
    ex('Biceps','Hammer Curl','3','12',45,'Controlled','Slightly lighter than curls if needed','Dumbbells'),
    ...CORE_A,
    ...CD
  ];

  // Tuesday = Primary heavy upper: chest, incline, rows/pull, biceps, accessories, short core
  const makeTuesday = (benchWt, inclineWt, pecWt, curlWt, hammerWt, rowWt, phase) => [
    ...WU,
    ex('Chest','Barbell Bench Press','3','10',90,'Controlled', benchWt + ' lbs — ' + phase,'Barbell'),
    ex('Chest','Incline Barbell Press','3','10',75,'Controlled', inclineWt + ' lbs — upper chest emphasis','Barbell'),
    ex('Chest','Pec Deck Fly','3','12',60,'Controlled', pecWt + ' lbs','Machine'),
    ex('Back','Seated Cable Row','3','10',75,'Controlled', rowWt + ' lbs — balanced pulling work','Cable'),
    ex('Back','Lat Pulldown (Wide Grip)','3','12',60,'Controlled','130 lbs — vertical pull balance','Machine'),
    ex('Biceps','Barbell Curl','3','10',60,'Controlled', curlWt + ' lbs','Barbell'),
    ex('Biceps','Hammer Curl','3','12',45,'Controlled', hammerWt + ' lbs each','Dumbbells'),
    ex('Accessories','Cable Face Pull','3','15',45,'Controlled','Light — rotator cuff and rear delts','Cable'),
    ...CORE_LIGHT,
    ...CD
  ];

  // Thursday 5:00–6:00 = Back, shoulders, triceps, rear delts, optional light core (after track)
  const makeThursday = (rowWt, pullWt, rowDbWt, pressWt, latWt, phase) => [
    ...TRACK,
    ...WU,
    ex('Back','Seated Cable Row (Close Grip)','3','10',75,'Controlled', rowWt + ' lbs — ' + phase,'Cable'),
    ex('Back','Lat Pulldown (Underhand Grip)','3','12',60,'Controlled', pullWt + ' lbs','Machine'),
    ex('Back','Single-Arm Dumbbell Row','3','10 each',60,'Controlled', rowDbWt + ' lbs each','Dumbbells'),
    ex('Shoulders','Dumbbell Shoulder Press (Seated)','3','10',75,'Controlled', pressWt + ' lbs each','Dumbbells'),
    ex('Shoulders','Dumbbell Lateral Raise','3','12',45,'Controlled', latWt + ' lbs each','Dumbbells'),
    ex('Rear Delts','Cable Face Pull','3','15',45,'Controlled','Light — rear delts and shoulder health','Cable'),
    ex('Triceps','Cable Rope Pushdown','3','12',45,'Controlled','75 lbs','Cable'),
    ...CORE_LIGHT,
    ...CD
  ];

  // Optional light upper accessories for Friday longevity days
  const FRI_LIGHT_UPPER = [
    ex('Accessories (Optional)','Band Pull-Aparts','2','15',30,'Controlled','Optional light upper — skip if sore','Resistance Band'),
    ex('Accessories (Optional)','Light Dumbbell Curl','2','12',30,'Controlled','Very light — blood flow only if appropriate','Dumbbells')
  ];

  const makeFriday = (block) => [...block, ...FRI_LIGHT_UPPER, ...REFLECT, ...COOL_MOB];

  // Weekend rest / active recovery (exercise schema for Saturday tabs)
  const SAT = [
    ex('Active Recovery','Easy Walk','1','20-40 min',0,'Easy','Family or recreational pace — cardio optional','Outdoor'),
    ex('Active Recovery','Light Full-Body Stretch','1','10-15 min',0,'Hold','No required extended fast today','Mat'),
    ex('Rest','Family / Recreational Activity','1','As desired',0,'Easy','Enjoy the day — no structured training required','Bodyweight')
  ];
  const SUN = [
    { phase: 'Rest Day', activity: 'Complete Rest', duration: 'N/A', notes: 'Primary rest day — no required workout. Optional short walk and light stretching only.' },
    { phase: 'Optional Activity', activity: 'Easy Walk', duration: '15-30 min', notes: 'Optional only — keep it easy and enjoyable.' },
    { phase: 'Optional Activity', activity: 'Light Stretching', duration: '10-15 min', notes: 'Gentle mobility if it feels good — no forcing range.' },
    { phase: 'Prep', activity: 'Meal Preparation', duration: 'As needed', notes: 'Prep protein-forward meals for the week. Target ~160–180g protein/day overall.' },
    { phase: 'Prep', activity: 'Prepare for Monday', duration: '10 min', notes: 'Lay out training clothes, plan track session, set early alarm.' },
    { phase: 'Fasting', activity: 'Begin Overnight Fast', duration: 'Evening', notes: 'Start normal overnight fast Sunday evening (~6:00 PM) to support Monday morning session.' },
    { phase: 'Recovery Protocol', activity: 'Sleep Goal', duration: '8-9 hours', notes: 'Prioritize sleep quality for Monday energy.' }
  ];

  // ── WEEK BUILDER ──────────────────────────────────────────────────
  const wk = (mon, tue, wed, thu, fri) => ({
    Monday: mon, Tuesday: tue, Wednesday: wed,
    Thursday: thu, Friday: fri, Saturday: SAT, Sunday: SUN
  });

  // ── 12 WEEKS OF PROGRAMMING ───────────────────────────────────────
  // Foundation Weeks 1-3
  const w1 = wk(
    makeMonday(130, 30, 'current working weight — chest emphasis'),
    makeTuesday(135, 115, 140, 70, 25, 110, 'baseline heavy upper'),
    makeWednesday(VMO_BASE, GLUTE_BASE, CORE_A),
    makeThursday(110, 130, 55, 35, 15, 'baseline'),
    makeFriday(FRI_BASE)
  );
  const w2 = wk(
    makeMonday(130, 30, 'same as W1 — focus on form'),
    makeTuesday(135, 115, 145, 70, 25, 110, 'same as W1 — perfect reps'),
    makeWednesday(VMO_BASE, GLUTE_BASE, CORE_A),
    makeThursday(110, 130, 55, 35, 15, 'maintain W1'),
    makeFriday(FRI_BASE)
  );
  const w3 = wk(
    makeMonday(135, 32, 'add 5 lbs from W1'),
    makeTuesday(140, 120, 150, 75, 27, 115, 'add 5 lbs from W1'),
    makeWednesday(VMO_BASE, GLUTE_BASE, CORE_A),
    makeThursday(115, 135, 57, 37, 17, 'add 5 lbs'),
    makeFriday(FRI_BASE)
  );
  // Build Weeks 4-6
  const w4 = wk(
    makeMonday(135, 32, 'W3 weight, deeper ROM'),
    makeTuesday(140, 120, 155, 75, 27, 115, 'maintain W3, quality incline work'),
    makeWednesday(VMO_ADV, GLUTE_BASE, CORE_B),
    makeThursday(115, 135, 57, 37, 17, 'maintain W3'),
    makeFriday(FRI_BUILD)
  );
  const w5 = wk(
    makeMonday(140, 35, 'add 5 — build phase'),
    makeTuesday(145, 125, 160, 80, 27, 120, 'build phase — push main lifts'),
    makeWednesday(VMO_ADV, GLUTE_BASE, CORE_B),
    makeThursday(120, 140, 60, 40, 17, 'build phase'),
    makeFriday(FRI_BUILD)
  );
  const w6 = wk(
    makeMonday(140, 35, 'maintain W5'),
    makeTuesday(145, 125, 165, 80, 27, 120, 'maintain W5'),
    makeWednesday(VMO_ADV, GLUTE_ADV, CORE_B),
    makeThursday(120, 140, 60, 40, 17, 'maintain W5'),
    makeFriday(FRI_PUSH)
  );
  // Push Weeks 7-9
  const w7 = wk(
    makeMonday(145, 35, 'push — near max'),
    makeTuesday(150, 130, 170, 82, 30, 125, 'push — near max heavy upper'),
    makeWednesday(VMO_ADV, GLUTE_ADV, CORE_B),
    makeThursday(125, 145, 62, 40, 20, 'push — near max'),
    makeFriday(FRI_PEAK_HARD)
  );
  const w8 = wk(
    makeMonday(145, 35, 'maintain W7 max'),
    makeTuesday(150, 130, 170, 82, 30, 125, 'maintain W7 max'),
    makeWednesday(VMO_ADV, GLUTE_ADV, CORE_B),
    makeThursday(125, 145, 62, 40, 20, 'maintain W7'),
    makeFriday(FRI_PEAK_HARD)
  );
  const w9 = wk(
    makeMonday(145, 37, 'push for new reps'),
    makeTuesday(150, 130, 170, 85, 30, 125, 'push for clean reps at peak'),
    makeWednesday(VMO_PEAK, GLUTE_ADV, CORE_B),
    makeThursday(125, 145, 62, 42, 20, 'push for new reps'),
    makeFriday(FRI_PEAK_HARD)
  );
  // Deload Week 10
  const w10 = wk(
    makeMonday(100, 22, 'DROP 30% — recovery week'),
    makeTuesday(105, 90, 115, 55, 20, 85, 'DROP 30% — deload'),
    makeWednesday(VMO_DELOAD, GLUTE_BASE, CORE_A),
    makeThursday(85, 105, 45, 27, 12, 'DROP 30% — deload'),
    makeFriday(FRI_DELOAD)
  );
  // Peak Weeks 11-12
  const w11 = wk(
    makeMonday(150, 37, 'new PR — past W7 max'),
    makeTuesday(155, 135, 175, 87, 32, 130, 'new PR — past W7 max'),
    makeWednesday(VMO_PEAK, GLUTE_ADV, CORE_B),
    makeThursday(130, 150, 65, 42, 20, 'new PR'),
    makeFriday(FRI_PEAK_HARD)
  );
  const w12 = wk(
    makeMonday(150, 37, 'peak — maintain W11'),
    makeTuesday(155, 135, 175, 87, 32, 130, 'peak — maintain W11'),
    makeWednesday(VMO_PEAK, GLUTE_ADV, CORE_B),
    makeThursday(130, 150, 65, 42, 20, 'peak — maintain W11'),
    makeFriday(FRI_PEAK_HARD)
  );

  // ── DAILY OVERVIEW (schedule + fasting) ───────────────────────────
  const DAY_OVERVIEWS = {
    Monday: {
      time: '4:30–6:00 AM',
      focus: 'Track intervals + upper strength (chest, biceps, core)',
      running: 'Yes — walk / timed run / walk / timed run (record both timed laps)',
      emphasis: 'Chest emphasis · Biceps · Core',
      fastingDuration: '~12–14 hours',
      fastingWindow: '6:00 PM Sunday → ~8:00 AM Monday',
      fastingType: 'Standard overnight',
      fastingNote: 'Normal overnight fast. Break the fast after training with a protein-forward meal.'
    },
    Tuesday: {
      time: '4:30–6:00 AM',
      focus: 'Primary heavy upper-body strength day',
      running: 'No structured running',
      emphasis: 'Chest · Incline press · Rows/pull · Biceps · Accessories · Short core',
      fastingDuration: '~12 hours',
      fastingWindow: '6:00 PM Monday → ~6:00 AM Tuesday',
      fastingType: 'Standard overnight',
      fastingNote: 'Prioritize post-workout protein and recovery after this hard strength day.'
    },
    Wednesday: {
      time: '4:30–6:00 AM',
      focus: 'Recovery, lower-body stability, mobility, and mental performance',
      running: 'No running',
      emphasis: '10 min meditation · Hip mobility · Hamstrings · Knee stability · Glutes · Core · Full-body stretch',
      fastingDuration: '~16 hours (optional)',
      fastingWindow: '6:00 PM Tuesday → ~10:00 AM Wednesday',
      fastingType: 'Primary extended (optional)',
      fastingNote: 'Optional based on energy, recovery, dizziness, or workout quality — not a rigid medical requirement. Fall back to a normal 12-hour fast anytime it helps performance.'
    },
    Thursday: {
      time: '4:30–6:00 AM',
      focus: 'Track intervals + back, shoulders, triceps, rear delts',
      running: 'Yes — walk / timed run / walk / timed run (record both timed laps)',
      emphasis: 'Back · Shoulders · Triceps · Rear delts · Optional light core',
      fastingDuration: '~12–14 hours',
      fastingWindow: '6:00 PM Wednesday → ~8:00 AM Thursday',
      fastingType: 'Standard overnight',
      fastingNote: 'Standard overnight fast. Refuel with protein after track + pulling work.'
    },
    Friday: {
      time: '4:30–6:00 AM',
      focus: 'Recovery and longevity day',
      running: 'No structured running',
      emphasis: 'Full-body mobility · Flexibility · Rotator cuff · Core · Knee stability · Optional light upper · Reflection',
      fastingDuration: '~16 hours (optional) or ~12 hours fallback',
      fastingWindow: '6:00 PM Thursday → ~10:00 AM Friday',
      fastingType: 'Optional extended',
      fastingNote: 'Second optional 16-hour fast. Use a normal 12-hour fast when soreness, hunger, fatigue, or recovery needs are elevated.'
    },
    Saturday: {
      time: 'Flexible',
      focus: 'Rest or active recovery',
      running: 'Optional easy walking only',
      emphasis: 'Walking · Family/recreation · Light stretching',
      fastingDuration: 'No required extended fast',
      fastingWindow: 'Unrestricted / normal meals',
      fastingType: 'Unrestricted',
      fastingNote: 'No required extended fast. Eat normally and recover.'
    },
    Sunday: {
      time: 'Flexible',
      focus: 'Rest, prep, and reset for Monday',
      running: 'Optional easy walk only',
      emphasis: 'Rest · Optional walk/stretch · Meal prep · Monday prep',
      fastingDuration: 'Begin normal overnight fast in the evening',
      fastingWindow: 'Start ~6:00 PM Sunday toward Monday morning',
      fastingType: 'Standard overnight (evening start)',
      fastingNote: 'Begin the normal overnight fast Sunday evening to set up Monday training.'
    }
  };

  // ── PROGRAMS ──────────────────────────────────────────────────────
  const PROGRAMS = [
    { id: 'joey-12wk-knee-safe', name: '12-Week Knee-Safe Upper Focus', weeks: 12 }
  ];

  const PROGRAM_GUIDES = {
    'joey-12wk-knee-safe': `
<h2>12-Week Knee-Safe Upper Body + Core Focus</h2>
<p><strong>Goal:</strong> Lean muscle (chest, biceps, shoulders, upper body), cardio fitness, core strength, mobility, knee stability, and gradual fat loss while protecting prior ACL/meniscus injuries.</p>
<p><strong>Training window:</strong> Monday–Friday 4:30–6:00 AM</p>
<h2>Weekly Structure</h2>
<ul>
<li><strong>Monday:</strong> 4:30–5:00 Track (walk/run intervals — record both timed laps) · 5:00–6:00 Upper (chest, biceps, core)</li>
<li><strong>Tuesday:</strong> Heavy upper — chest, incline press, rows/pull, biceps, accessories, short core</li>
<li><strong>Wednesday:</strong> Recovery day — 10 min meditation, hip/hamstring mobility, knee stability, glutes, core, full-body stretch · <em>no running</em></li>
<li><strong>Thursday:</strong> 4:30–5:00 Track · 5:00–6:00 Back, shoulders, triceps, rear delts, optional light core</li>
<li><strong>Friday:</strong> Longevity day — mobility, flexibility, rotator cuff, core, knee maintenance, optional light upper, 5–10 min reflection</li>
<li><strong>Saturday:</strong> Rest or active recovery (walk, family/recreation, light stretch)</li>
<li><strong>Sunday:</strong> Rest, optional walk/stretch, meal prep, prepare for Monday</li>
</ul>
<h2>Fasting Overview</h2>
<ul>
<li><strong>Default:</strong> ~12-hour overnight fast most days</li>
<li><strong>Monday / Thursday:</strong> Standard overnight ~12–14h (about 6:00 PM → ~8:00 AM)</li>
<li><strong>Tuesday:</strong> Standard overnight ~12h (about 6:00 PM → ~6:00 AM) — prioritize post-workout protein</li>
<li><strong>Wednesday:</strong> Primary optional ~16h fast (about 6:00 PM Tue → ~10:00 AM Wed). Optional based on energy, recovery, dizziness, or workout quality</li>
<li><strong>Friday:</strong> Optional second ~16h fast (about 6:00 PM Thu → ~10:00 AM Fri), with easy fallback to a normal 12h fast when recovery needs are high</li>
<li><strong>Weekend:</strong> No required extended fast; begin normal overnight fast Sunday evening</li>
</ul>
<h2>Nutrition Strategy</h2>
<ul>
<li>Default to a 12-hour overnight fast</li>
<li>Use Wednesday as the primary optional 16-hour fasting day</li>
<li>Use Friday as an optional second 16-hour day</li>
<li>Do not force a long fast when it harms workout quality, recovery, sleep, or energy</li>
<li>Prioritize protein after the hardest strength and running sessions</li>
<li>Target approximately 160–180 grams of protein per day</li>
<li>Spread protein across multiple meals when practical</li>
<li>Hydrate before and after early fasted workouts</li>
<li>Extended fasting is optional support for body-composition goals — not required for progress, and it should never override performance or recovery</li>
</ul>
<h2>Phases</h2>
<ul>
<li><strong>Weeks 1-3:</strong> Foundation — current working weights, master form</li>
<li><strong>Weeks 4-6:</strong> Build — progressive load on main upper lifts</li>
<li><strong>Weeks 7-9:</strong> Push — near-max effort on primary lifts</li>
<li><strong>Week 10:</strong> Deload — drop ~30% weight, recovery</li>
<li><strong>Weeks 11-12:</strong> Peak — attempt new personal records</li>
</ul>
<h2>Knee Safety Rules</h2>
<ul>
<li>Track: controlled pace only — stop for sharp pain, instability, or swelling</li>
<li>Stop if: sharp pain, instability, swelling</li>
<li>Avoid high-risk knee loading: leg extension machine, deep squats, lunges, jumping</li>
<li>Always protect prior ACL/meniscus history with controlled depth and quality movement</li>
<li>Wednesday and Friday emphasize knee stability, hips, and mobility over heavy lower-body loading</li>
</ul>
<h2>Starting Weights (Upper Focus)</h2>
<ul>
<li>Machine Chest Press: 130 lbs</li>
<li>Barbell Bench: 135 lbs</li>
<li>Incline Barbell Press: 115 lbs</li>
<li>Pec Deck: 140 lbs</li>
<li>Seated Row: 110 lbs</li>
<li>Lat Pulldown: 130 lbs</li>
<li>DB Curl: 30 lbs each</li>
<li>Hammer Curl: 25 lbs each</li>
<li>Shoulder Press: 35 lbs each</li>
<li>Lateral Raise: 15 lbs each</li>
</ul>`
  };

  const PROGRAM_TEMPLATES = {
    'joey-12wk-knee-safe': {
      weeks: {
        1: w1, 2: w2, 3: w3, 4: w4, 5: w5, 6: w6,
        7: w7, 8: w8, 9: w9, 10: w10, 11: w11, 12: w12
      }
    }
  };

  return { PROGRAMS, PROGRAM_GUIDES, PROGRAM_TEMPLATES, DAY_OVERVIEWS };
};
