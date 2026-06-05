window.buildProgramData = function buildProgramData(legacyWorkouts) {
  const ex = (phase, exercise, sets, reps, rest, tempo, notes, equipment) => ({
    phase, exercise, sets, reps, rest, tempo, notes, equipment
  });
  const cloneList = list => list.map(item => ({ ...item }));

  // ── REUSABLE BLOCKS ──────────────────────────────────────────────
  const WU = [
    ex('Warm-Up','Incline Treadmill Walk','1','10 min',0,'Easy','3 mph, 10° incline','Treadmill'),
    ex('Warm-Up','Arm Circles + Band Pull-Aparts','1','1 min',0,'Controlled','Open chest before pressing','Bodyweight')
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

  // ── FRIDAY MOBILITY SESSIONS BY PHASE ────────────────────────────
  const FRI_BASE  = [...WU,...FOAM,...HIP,...FLEX,...ANKLE,...VMO_BASE,...GLUTE_BASE,...CORE_A,...COOL_MOB];
  const FRI_BUILD = [...WU,...FOAM,...HIP,...FLEX,...ANKLE,...VMO_ADV,...GLUTE_BASE,...CORE_B,...COOL_MOB];
  const FRI_PUSH  = [...WU,...FOAM,...HIP,...FLEX,...ANKLE,...VMO_ADV,...GLUTE_ADV,...CORE_B,...COOL_MOB];
  const FRI_PEAK_HARD = [...WU,...FOAM,...HIP,...FLEX,...ANKLE,...VMO_PEAK,...GLUTE_ADV,...CORE_B,...COOL_MOB];
  const FRI_DELOAD = [...WU,...FOAM,...HIP,...FLEX,...ANKLE,...VMO_DELOAD,...GLUTE_BASE,...CORE_A,...COOL_MOB];

  // ── UPPER BODY DAYS BY PHASE ──────────────────────────────────────
  // Monday = Light Upper + Core (60 min)
  const makeMonday = (chestWt, rowWt, curlWt, notes) => [
    ...WU,
    ex('Chest','Machine Chest Press','3','12',60,'Controlled', chestWt + ' lbs — ' + notes,'Machine'),
    ex('Back','Seated Cable Row','3','12',60,'Controlled', rowWt + ' lbs — balance the chest work','Cable'),
    ex('Biceps','Dumbbell Curls','3','12',45,'Controlled', curlWt + ' lbs each','Dumbbells'),
    ex('Triceps','Overhead Dumbbell Extension','3','12',45,'Controlled','Light, full range','Dumbbells'),
    ...CORE_A,...CD
  ];

  // Tuesday = Full Upper Chest + Biceps (90 min)
  const makeTuesday = (benchWt, inclineWt, pecWt, curlWt, hammerWt, pullWt, phase) => [
    ...WU,
    ex('Chest','Barbell Bench Press','3','10',90,'Controlled', benchWt + ' lbs — ' + phase,'Barbell'),
    ex('Chest','Incline Barbell Press','3','10',75,'Controlled', inclineWt + ' lbs each','Barbell'),
    ex('Chest','Pec Deck Fly','3','12',60,'Controlled', pecWt + ' lbs','Machine'),
    ex('Biceps','Barbell Curl','3','10',60,'Controlled', curlWt + ' lbs','Barbell'),
    ex('Biceps','Hammer Curl','3','12',45,'Controlled', hammerWt + ' lbs each','Dumbbells'),
    ex('Back','Lat Pulldown (Wide Grip)','3','12',60,'Controlled','130 lbs','Machine'),
    ex('Back','Cable Face Pull','3','15',45,'Controlled','Light — rotator cuff health','Cable'),
    ...CORE_B,...CD
  ];

  // Wednesday = Lower Body Knee-Safe (90 min)
  const makeWednesday = (lpWt, lcWt, abWt, phase) => [
    ...WU,
    ex('Lower','Leg Press (Feet High, Shallow Depth)','3','12',75,'Controlled', lpWt + ' lbs — feet high, 60-70° bend max, ' + phase,'Machine'),
    ex('Lower','Lying Leg Curl','3','12',60,'Controlled', lcWt + ' lbs — hamstring focus','Machine'),
    ex('Lower','Hip Abduction Machine','3','15',45,'Controlled', abWt + ' lbs — knee stabilizer priority','Machine'),
    ex('Lower','Standing Hip Extension (Cable)','3','12 each',45,'Controlled','Glute + hip stability','Cable'),
    ex('Lower','Glute Bridge (Weighted)','3','15',45,'Controlled','Add dumbbell when ready','Dumbbells'),
    ex('Lower','Standing Calf Raise (Machine)','3','20',30,'Controlled','225 lbs baseline','Machine'),
    ...CORE_A,...COOL_MOB
  ];

  // Thursday = Full Upper Back + Shoulders + Triceps (90 min)
  const makeThursday = (rowWt, pullWt, rowDbWt, pressWt, latWt, phase) => [
    ...WU,
    ex('Back','Seated Cable Row (Close Grip)','3','10',75,'Controlled', rowWt + ' lbs — ' + phase,'Cable'),
    ex('Back','Lat Pulldown (Underhand Grip)','3','12',60,'Controlled', pullWt + ' lbs','Machine'),
    ex('Back','Single-Arm Dumbbell Row','3','10 each',60,'Controlled', rowDbWt + ' lbs each','Dumbbells'),
    ex('Shoulders','Dumbbell Shoulder Press (Seated)','3','10',75,'Controlled', pressWt + ' lbs each','Dumbbells'),
    ex('Shoulders','Dumbbell Lateral Raise','3','12',45,'Controlled', latWt + ' lbs each','Dumbbells'),
    ex('Triceps','Cable Rope Pushdown','3','12',45,'Controlled','75 lbs','Cable'),
    ex('Back','Cable Face Pull','3','15',45,'Controlled','Light — rotator cuff','Cable'),
    ...CORE_B,...CD
  ];

  // ── WEEK BUILDER ──────────────────────────────────────────────────
  const wk = (mon, tue, wed, thu, fri) => ({
    Monday: mon, Tuesday: tue, Wednesday: wed,
    Thursday: thu, Friday: fri, Saturday: [], Sunday: []
  });

  // ── 12 WEEKS OF PROGRAMMING ───────────────────────────────────────
  // Foundation Weeks 1-3 (current working weights)
  const w1 = wk(
    makeMonday(130, 110, 30, 'current working weight'),
    makeTuesday(135, 115, 140, 70, 25, 130, 'baseline'),
    makeWednesday(307, 80, 120, 'current working weight'),
    makeThursday(110, 130, 55, 35, 15, 'baseline'),
    FRI_BASE
  );
  const w2 = wk(
    makeMonday(130, 110, 30, 'same as W1 — focus on form'),
    makeTuesday(135, 115, 145, 70, 25, 130, 'same as W1 — perfect reps'),
    makeWednesday(307, 80, 120, 'maintain — no pain'),
    makeThursday(110, 130, 55, 35, 15, 'maintain W1'),
    FRI_BASE
  );
  const w3 = wk(
    makeMonday(135, 115, 32, 'add 5 lbs from W1'),
    makeTuesday(140, 120, 150, 75, 27, 135, 'add 5 lbs from W1'),
    makeWednesday(317, 85, 125, 'add 10 lbs if pain-free'),
    makeThursday(115, 135, 57, 37, 17, 'add 5 lbs'),
    FRI_BASE
  );
  // Build Weeks 4-6
  const w4 = wk(
    makeMonday(135, 115, 32, 'W3 weight, deeper ROM'),
    makeTuesday(140, 120, 155, 75, 27, 135, 'maintain W3, different variations'),
    makeWednesday(317, 85, 125, 'maintain W3'),
    makeThursday(115, 135, 57, 37, 17, 'maintain W3'),
    FRI_BUILD
  );
  const w5 = wk(
    makeMonday(140, 120, 35, 'add 5 — build phase'),
    makeTuesday(145, 125, 160, 80, 27, 140, '4 sets this week — build phase'),
    makeWednesday(327, 90, 130, 'add 10 lbs — build phase'),
    makeThursday(120, 140, 60, 40, 17, 'build phase'),
    FRI_BUILD
  );
  const w6 = wk(
    makeMonday(140, 120, 35, 'maintain W5'),
    makeTuesday(145, 125, 165, 80, 27, 140, 'maintain W5'),
    makeWednesday(327, 90, 130, 'maintain W5'),
    makeThursday(120, 140, 60, 40, 17, 'maintain W5'),
    FRI_PUSH
  );
  // Push Weeks 7-9
  const w7 = wk(
    makeMonday(145, 125, 35, 'push — near max'),
    makeTuesday(150, 130, 170, 82, 30, 145, 'push — 4 sets near max'),
    makeWednesday(337, 90, 135, 'push — near max weight'),
    makeThursday(125, 145, 62, 40, 20, 'push — near max'),
    FRI_PEAK_HARD
  );
  const w8 = wk(
    makeMonday(145, 125, 35, 'maintain W7 max'),
    makeTuesday(150, 130, 170, 82, 30, 145, 'maintain W7 max'),
    makeWednesday(337, 90, 135, 'maintain W7'),
    makeThursday(125, 145, 62, 40, 20, 'maintain W7'),
    FRI_PEAK_HARD
  );
  const w9 = wk(
    makeMonday(145, 125, 37, 'push for new reps'),
    makeTuesday(150, 130, 170, 85, 30, 145, 'push for clean reps at peak'),
    makeWednesday(337, 95, 135, 'push for new reps'),
    makeThursday(125, 145, 62, 42, 20, 'push for new reps'),
    FRI_PEAK_HARD
  );
  // Deload Week 10
  const w10 = wk(
    makeMonday(100, 80, 22, 'DROP 30% — recovery week'),
    makeTuesday(105, 90, 115, 55, 20, 105, 'DROP 30% — deload'),
    makeWednesday(215, 60, 95, 'DROP 30% — deload'),
    makeThursday(85, 105, 45, 27, 12, 'DROP 30% — deload'),
    FRI_DELOAD
  );
  // Peak Weeks 11-12
  const w11 = wk(
    makeMonday(150, 130, 37, 'new PR — past W7 max'),
    makeTuesday(155, 135, 175, 87, 32, 150, 'new PR — past W7 max'),
    makeWednesday(347, 97, 140, 'new PR — past W7 max'),
    makeThursday(130, 150, 65, 42, 20, 'new PR'),
    FRI_PEAK_HARD
  );
  const w12 = wk(
    makeMonday(150, 130, 37, 'peak — maintain W11'),
    makeTuesday(155, 135, 175, 87, 32, 150, 'peak — maintain W11'),
    makeWednesday(347, 97, 140, 'peak — maintain W11'),
    makeThursday(130, 150, 65, 42, 20, 'peak — maintain W11'),
    FRI_PEAK_HARD
  );

  // ── PROGRAMS ──────────────────────────────────────────────────────
  const PROGRAMS = [
    { id: 'joey-12wk-knee-safe', name: '12-Week Knee-Safe Upper Focus', weeks: 12 }
  ];

  const PROGRAM_GUIDES = {
    'joey-12wk-knee-safe': `
<h2>12-Week Knee-Safe Upper Body + Core Focus</h2>
<p><strong>Goal:</strong> Burn belly fat, tone chest/biceps/core, protect knees.</p>
<p><strong>Schedule:</strong> Mon 60 min | Tue/Wed/Thu/Fri 90 min each</p>
<h2>Weekly Structure</h2>
<ul>
<li><strong>Monday:</strong> Light Upper + Core</li>
<li><strong>Tuesday:</strong> Full Upper — Chest + Biceps emphasis</li>
<li><strong>Wednesday:</strong> Lower Body — Knee-Safe (leg press, curls, hip abduction)</li>
<li><strong>Thursday:</strong> Full Upper — Back + Shoulders + Triceps</li>
<li><strong>Friday:</strong> Knee Health — Foam rolling, hip flexors, hamstrings, VMO activation, mobility</li>
</ul>
<h2>Phases</h2>
<ul>
<li><strong>Weeks 1-3:</strong> Foundation — current working weights, master form</li>
<li><strong>Weeks 4-6:</strong> Build — +5 lbs upper / +10 lbs lower every 2 sessions</li>
<li><strong>Weeks 7-9:</strong> Push — near-max effort, 4 sets on main lifts</li>
<li><strong>Week 10:</strong> Deload — drop 30% weight, recovery</li>
<li><strong>Weeks 11-12:</strong> Peak — attempt new personal records</li>
</ul>
<h2>Knee Safety Rules</h2>
<ul>
<li>Leg press: feet HIGH on platform, 60-70° bend only — never go deeper</li>
<li>Stop if: sharp pain, instability, swelling</li>
<li>Never use: leg extension machine, squats, lunges, jumping</li>
<li>Always do: hip abduction, hamstring curls, glute bridges on lower days</li>
</ul>
<h2>Starting Weights</h2>
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
<li>Leg Press: 307 lbs (shallow depth)</li>
<li>Hamstring Curl: 80 lbs</li>
<li>Hip Abduction: 120 lbs</li>
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

  return { PROGRAMS, PROGRAM_GUIDES, PROGRAM_TEMPLATES };
};
