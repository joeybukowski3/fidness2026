window.buildProgramData = function buildProgramData(legacyWorkouts) {
  const PROGRAMS = [
    { id: 'golf-6week', name: 'Golf Training 6-Week Cycle', weeks: 6 },
    { id: 'strength-4week', name: 'Strength & Mobility 4-Week', weeks: 4 },
    { id: 'joey-4wk-baseline', name: "Joey's 4-Week Baseline", weeks: 4 }
  ];

  const GUIDE_HTML = `
<h2>Program Overview</h2>
<p><strong>Duration:</strong> 6-week rotating blocks | <strong>Target:</strong> 35-year-old male golfer, 195 lbs</p>
<p><strong>Goals:</strong> Maintain weight, build lean muscle, rotational power, core strength, flexibility, visible abs</p>
<p><strong>Location:</strong> Planet Fitness | <strong>Training Days:</strong> Mon-Fri (main), Sat (optional), Sun (rest)</p>

<h2>Weekly Schedule</h2>
<ul>
<li><strong>Monday:</strong> Upper Body Push + Rotational Core (60 min + 15-30 min bonus)</li>
<li><strong>Tuesday:</strong> Lower Body + Hip Mobility (60 min + 15-30 min bonus)</li>
<li><strong>Wednesday:</strong> Upper Body Pull + Anti-Rotation Core (60 min + 15-30 min bonus)</li>
<li><strong>Thursday:</strong> Full Body Power + Flexibility Focus (60 min + 15-30 min bonus)</li>
<li><strong>Friday:</strong> Core/Rotational Power + Active Recovery (60 min + 15-30 min bonus)</li>
<li><strong>Saturday:</strong> Optional Mobility &amp; Light Accessory (30-60 min)</li>
<li><strong>Sunday:</strong> Complete Rest + Recovery Protocol</li>
</ul>

<h2>Pre-Workout Routine (Every Day)</h2>
<p>15 min Incline Walk (3.0-3.5 mph, 5-8% incline) + general stretching, then complete day-specific 5-10 min stretch routine. Total warm-up: ~20-25 minutes.</p>

<h2>Tempo Notation</h2>
<p>Format: <strong>[Eccentric]-[Bottom Pause]-[Concentric]-[Top Pause]</strong></p>
<p>Example: <strong>3010</strong> = 3 sec lowering, 0 sec pause, 1 sec lifting, 0 sec pause at top. "Explosive" = move fast with control.</p>

<h2>6-Week Progression Protocol</h2>
<h3>Weeks 1-2: Foundation</h3>
<p>Moderate weight (2-3 more reps possible per set). Focus on form and tempo. Establish baseline.</p>
<h3>Weeks 3-4: Build</h3>
<p>Increase weight 5-10% OR add 1-2 reps. Push closer to failure (1-2 reps in reserve). Maintain strict form.</p>
<h3>Week 5: Peak</h3>
<p>Maximum weight maintaining form. Push to technical failure. May reduce reps to 6-8 on main lifts.</p>
<h3>Week 6: Deload</h3>
<p>Reduce weight 20-30%. Same reps/sets but lighter and faster. Focus on movement quality and mobility.</p>

<h2>Exercise Rotation (After 6 Weeks)</h2>
<ul>
<li>Incline Press &rarr; Flat Press &rarr; Decline Press</li>
<li>Lat Pulldown Wide &rarr; Neutral Grip &rarr; Underhand</li>
<li>Leg Press &rarr; Smith Squat &rarr; Bulgarian Split Squat emphasis</li>
<li>Keep core rotation exercises consistent (golf-specific)</li>
</ul>

<h2>Nutrition Guidelines</h2>
<p><strong>Maintain 195 lbs + Build Muscle</strong></p>
<ul>
<li><strong>Calories:</strong> 2,800-3,000/day</li>
<li><strong>Protein:</strong> 180-200g (0.9-1.0g/lb)</li>
<li><strong>Carbs:</strong> 300-350g</li>
<li><strong>Fats:</strong> 80-90g</li>
<li><strong>Pre-workout:</strong> Carbs + protein 60-90 min before</li>
<li><strong>Post-workout:</strong> 40g protein + 60g carbs within 60 min</li>
<li><strong>Hydration:</strong> 100+ oz water daily, +16-20 oz per hour training</li>
</ul>

<h2>Knee Safety Modifications</h2>
<p>ACL/meniscus history requires these protocols:</p>
<ul>
<li>Always warm up hips, ankles, and knees thoroughly</li>
<li>Keep knees tracking over toes (avoid valgus collapse)</li>
<li>Avoid deep knee flexion under heavy load (stay above 90&deg;)</li>
<li>No jumping, box jumps, or high-impact plyometrics</li>
<li>Stop immediately if knee pain occurs</li>
<li>Prioritize single-leg work for stability</li>
</ul>

<h2>Visible Abs Strategy</h2>
<ol>
<li><strong>Direct Ab Work:</strong> Decline sit-ups, weighted crunches, hanging leg raises (4x/week)</li>
<li><strong>Anti-Rotation Core:</strong> Pallof presses, bird dogs, plank variations</li>
<li><strong>Rotational Power:</strong> Cable woodchops, medicine ball slams, Russian twists</li>
<li><strong>Total Core Integration:</strong> Compound lifts, carries, loaded movements</li>
</ol>
<p><strong>Timeline:</strong> Weeks 1-2 strength gains &rarr; Weeks 3-4 upper ab definition &rarr; Weeks 5-8 visible upper abs &rarr; Weeks 9-12 full six-pack (with diet)</p>

<h2>Flexibility Maintenance</h2>
<p><strong>Daily Priority Stretches:</strong></p>
<ol>
<li>Hip Flexor Stretch (daily) - counteracts sitting, improves swing</li>
<li>Thoracic Rotation (4x/week) - essential for golf rotation</li>
<li>Hamstring Stretch (3x/week) - protects lower back</li>
<li>Lat and Shoulder Stretch (3x/week) - maintains ROM</li>
<li>Pigeon Pose (2x/week) - deep hip opener</li>
</ol>

<h2>Rotational Power Development</h2>
<ul>
<li>Cable Woodchop High-to-Low (downswing pattern)</li>
<li>Cable Woodchop Low-to-High (backswing pattern)</li>
<li>Pallof Press (resist rotation = stability)</li>
<li>Medicine Ball Rotational Slams (explosive power)</li>
<li>Landmine Rotations (loaded rotation)</li>
</ul>
<p><strong>Golf Transfer:</strong> +3-8 mph clubhead speed over 12 weeks, better weight transfer, reduced injury risk.</p>

<h2>Recovery Protocols</h2>
<ul>
<li><strong>Daily:</strong> 8+ hours sleep, 100+ oz water, post-workout nutrition, evening stretching</li>
<li><strong>Weekly:</strong> Sunday rest, Saturday optional, foam rolling 2-3x/week</li>
<li><strong>Warning Signs:</strong> Sharp joint pain, decreased ROM, persistent soreness (>3 days), fatigue, strength regression</li>
</ul>

<h2>FAQ</h2>
<ul>
<li><strong>Cardio?</strong> Low-impact only: incline walking, elliptical, bike, swimming. No running/HIIT.</li>
<li><strong>Missed workout?</strong> Continue next scheduled day. Don't "make up" workouts. After 2+ days off, reduce weight 10%.</li>
<li><strong>Exercise hurts?</strong> Stop immediately. Use listed substitute. If that hurts too, skip and consult a professional.</li>
<li><strong>Bonus work?</strong> Optional. Prioritize the main 60 min workout.</li>
<li><strong>Results timeline?</strong> Strength: 2-3 weeks. Ab definition: 4-6 weeks. Golf performance: 3-4 weeks. Body composition: 6-8 weeks.</li>
</ul>
`;

  const PROGRAM_GUIDES = {
    'golf-6week': GUIDE_HTML,
    'strength-4week': `
  <h2>Program Overview</h2>
  <p><strong>Duration:</strong> 4-week block | <strong>Target:</strong> general strength and mobility</p>
  <h2>Weekly Focus</h2>
  <ul>
    <li>2-3 strength sessions</li>
    <li>2 mobility-focused sessions</li>
    <li>1 optional conditioning day</li>
  </ul>
  <h2>Notes</h2>
  <p>Build consistent movement patterns, prioritize recovery, and track your loads weekly.</p>
  `,
    'joey-4wk-baseline': `
    <h2>Program Overview</h2>
    <p><strong>Duration:</strong> 4 weeks | <strong>Target:</strong> baseline control, mobility, and knee health</p>
    <h2>Weekly Focus</h2>
    <ul>
      <li>Week 1: Baseline — establish form and control</li>
      <li>Week 2: Add range of motion + stability</li>
      <li>Week 3: Control + mobility (tempo + key Tuesday)</li>
      <li>Week 4: Deload — lighter volume for recovery</li>
    </ul>
  `
  };

  const cloneList = list => list.map(item => ({ ...item }));
  const ex = (phase, exercise, sets, reps, notes, rest, tempo, equipment) => ({
    phase,
    exercise,
    sets,
    reps,
    rest,
    tempo,
    notes,
    equipment
  });
  const recovery = (phase, activity, duration, notes) => ({ phase, activity, duration, notes });
  const withPre = items => [...cloneList(JOEY_DAILY_PRE), ...cloneList(items)];

  const JOEY_DAILY_PRE = [
    ex('Pre-Workout Stretch', 'Quad Stretch', '2', '45 sec/leg', 'Pull heel to glute', 0, 'Hold', 'Bodyweight'),
    ex('Pre-Workout Stretch', 'Hamstring Stretch', '2', '45 sec/leg', 'Keep leg straight', 0, 'Hold', 'Bodyweight'),
    ex('Pre-Workout Stretch', 'Hip Flexor Stretch', '2', '45 sec/leg', 'Stay upright', 0, 'Hold', 'Bodyweight'),
    ex('Pre-Workout Stretch', 'Glute Bridges', '2', '15', 'Squeeze at top', 30, 'Controlled', 'Bodyweight'),
    ex('Pre-Workout Stretch', 'Elliptical', '1', '5 min', 'Low resistance', 0, 'Steady', 'Elliptical')
  ];

  const JOEY_NIGHT_STRETCH = [
    ex('Night Stretch', 'Quad Stretch', '2', '45 sec/leg', 'Evening recovery stretch', 0, 'Hold', 'Bodyweight'),
    ex('Night Stretch', 'Hamstring Stretch', '2', '45 sec/leg', 'Keep leg straight and breathe', 0, 'Hold', 'Bodyweight'),
    ex('Night Stretch', 'Hip Flexor Stretch', '2', '45 sec/leg', 'Stay upright and relaxed', 0, 'Hold', 'Bodyweight'),
    ex('Night Stretch', 'Calf Stretch', '2', '30 sec/leg', 'Press heel into floor', 0, 'Hold', 'Bodyweight'),
    ex('Night Stretch', 'Optional Glute Bridges', '1', '15', 'Optional extra glute activation', 30, 'Controlled', 'Bodyweight')
  ];

  const JOEY_REST_DAY = [
    recovery('Rest Day', 'Complete Rest or Light Walk', '20-30 min optional', 'Keep the day easy and focus on recovery.'),
    recovery('Recovery Protocol', 'Night Stretch', '10-15 min', 'Use the evening stretch block if the knees feel stiff.'),
    recovery('Recovery Protocol', 'Hydration Focus', 'All day', 'Stay hydrated and keep steps light.'),
    recovery('Recovery Protocol', 'Sleep Goal', '8+ hours', 'Use the deload emphasis to recover well for next week.')
  ];

  const joeyWeek1Monday = withPre([
    ex('Chest', 'Machine Chest Press', '3', '10-12', 'Baseline control and smooth reps', 60, 'Controlled', 'Machine'),
    ex('Chest', 'Incline Chest Press', '3', '10-12', 'Light to moderate load', 60, 'Controlled', 'Machine'),
    ex('Chest', 'Pec Deck', '2', '12-15', 'Stretch focus', 60, 'Controlled', 'Machine'),
    ex('Back', 'Seated Row', '3', '10-12', 'Controlled row with full squeeze', 60, 'Controlled', 'Machine'),
    ex('Core', 'Plank', '3', '45 sec', 'Brace and keep ribs down', 45, 'Hold', 'Bodyweight'),
    ex('Core', 'Dead Bugs', '3', '10/side', 'Move slowly and stay flat to the floor', 45, 'Controlled', 'Bodyweight')
  ]);

  const joeyWeek1Tuesday = withPre([
    ex('Activation', 'Glute Bridges', '3', '15', 'Squeeze at top before leg work', 30, 'Controlled', 'Bodyweight'),
    ex('Activation', 'Banded Lateral Walks', '2', '15 steps each way', 'Stay low and control the steps', 30, 'Controlled', 'Resistance Band'),
    ex('Legs', 'Leg Press (Feet High)', '3', '12', 'Slow reps and knee-friendly range', 60, 'Controlled', 'Machine'),
    ex('Legs', 'Hamstring Curl', '3', '12', 'Controlled curl without jerking', 60, 'Controlled', 'Machine'),
    ex('Knees', 'Terminal Knee Extensions', '3', '15', 'Light tension and lock in control', 45, 'Controlled', 'Band/Cable'),
    ex('Mobility', 'Deep Squat Hold (Assisted)', '2', '30 sec', 'Use support and sit into comfortable depth', 30, 'Hold', 'Bodyweight')
  ]);

  const joeyWeek1Wednesday = withPre([
    ex('Back', 'Lat Pulldown', '3', '10-12', 'Control the full pull and return', 60, 'Controlled', 'Machine'),
    ex('Back', 'Seated Row', '3', '10-12', 'Strong squeeze at the torso', 60, 'Controlled', 'Machine'),
    ex('Back', 'Rear Delt Machine', '2', '12-15', 'Light weight and clean motion', 45, 'Controlled', 'Machine'),
    ex('Biceps', 'DB Curls', '3', '10', 'Controlled reps with no sway', 60, 'Controlled', 'Dumbbells'),
    ex('Biceps', 'Hammer Curls', '3', '10', 'Neutral grip throughout', 60, 'Controlled', 'Dumbbells'),
    ex('Core', 'Side Plank', '3', '30 sec/side', 'Keep hips stacked', 45, 'Hold', 'Bodyweight')
  ]);

  const joeyWeek1Thursday = withPre([
    ex('Mobility', "World's Greatest Stretch", '1', '5/side', 'Open hips and thoracic spine', 0, 'Controlled', 'Bodyweight'),
    ex('Mobility', 'Thoracic Rotations', '2', '10/side', 'Rotate from upper back', 30, 'Controlled', 'Bodyweight'),
    ex('Core', 'Cable Woodchops', '3', '12/side', 'Light load and smooth rotation', 60, 'Controlled', 'Cable'),
    ex('Core', 'Torso Rotation Machine', '2', '15', 'Slow and controlled range', 60, 'Controlled', 'Machine'),
    ex('Core', 'Pallof Hold', '3', '30 sec', 'Brace hard and resist twist', 45, 'Hold', 'Cable')
  ]);

  const joeyWeek1Friday = withPre([
    ex('Upper', 'Machine Chest Press', '3', '12', 'Light load and crisp reps', 60, 'Controlled', 'Machine'),
    ex('Upper', 'Seated Row', '3', '12', 'Controlled pull and full squeeze', 60, 'Controlled', 'Machine'),
    ex('Upper', 'DB Curls', '2', '12', 'Pump work with smooth tempo', 45, 'Controlled', 'Dumbbells'),
    ex('Cardio', 'Elliptical or Walk', '1', '20 min', 'Steady pace', 0, 'Steady', 'Elliptical/Treadmill'),
    ex('Mobility', 'Full Stretch', '1', '10-15 min', 'Lower body focus after cardio', 0, 'Hold', 'Bodyweight')
  ]);

  const joeyWeek2Monday = withPre([
    ex('Chest', 'Machine Chest Press', '3', '10-12', 'Slight increase if form stays clean; use deeper range', 60, 'Controlled', 'Machine'),
    ex('Chest', 'Incline Chest Press', '3', '10-12', 'Light to moderate load with more range', 60, 'Controlled', 'Machine'),
    ex('Chest', 'Pec Deck', '2', '12-15', 'Stretch focus with full control', 60, 'Controlled', 'Machine'),
    ex('Back', 'Seated Row', '3', '10-12', 'Pause briefly at full squeeze', 60, 'Controlled', 'Machine'),
    ex('Core', 'Plank', '3', '45-60 sec', 'Extend holds if brace stays strong', 45, 'Hold', 'Bodyweight'),
    ex('Core', 'Dead Bugs', '3', '10/side', 'Stay slow and deliberate', 45, 'Controlled', 'Bodyweight')
  ]);

  const joeyWeek2Tuesday = withPre([
    ex('Legs', 'Leg Press', '3', '12', 'Deeper ROM with smooth knee tracking', 60, 'Controlled', 'Machine'),
    ex('Legs', 'Hamstring Curl', '3', '12', 'Controlled and even tempo', 60, 'Controlled', 'Machine'),
    ex('Legs', 'Hip Abduction', '3', '15', 'Glute focus with no swinging', 45, 'Controlled', 'Machine'),
    ex('Knees', 'Terminal Knee Extensions', '3', '15', 'Light and clean lockout', 45, 'Controlled', 'Band/Cable'),
    ex('Legs', 'Single Leg Press', '2', '10/leg', 'Light stability work', 60, 'Controlled', 'Machine')
  ]);

  const joeyWeek2Wednesday = withPre([
    ex('Back', 'Lat Pulldown', '3', '10-12', 'Slight progression in range and control', 60, 'Controlled', 'Machine'),
    ex('Back', 'Seated Row', '3', '10-12', 'Own the full squeeze each rep', 60, 'Controlled', 'Machine'),
    ex('Back', 'Rear Delt Machine', '2', '12-15', 'Light and smooth motion', 45, 'Controlled', 'Machine'),
    ex('Biceps', 'DB Curls', '3', '10', 'Slight progression if elbows stay pinned', 60, 'Controlled', 'Dumbbells'),
    ex('Biceps', 'Hammer Curls', '3', '10', 'Neutral grip and no body English', 60, 'Controlled', 'Dumbbells'),
    ex('Core', 'Side Plank', '3', '30-40 sec/side', 'Add time only if position stays stable', 45, 'Hold', 'Bodyweight')
  ]);

  const joeyWeek2Thursday = withPre([
    ex('Mobility', "World's Greatest Stretch", '1', '6/side', 'Move through a slightly deeper range', 0, 'Controlled', 'Bodyweight'),
    ex('Mobility', 'Thoracic Rotations', '2', '10', 'Stay smooth through upper back rotation', 30, 'Controlled', 'Bodyweight'),
    ex('Core', 'Cable Woodchops', '3', '12', 'Light load and controlled rotation', 60, 'Controlled', 'Cable'),
    ex('Core', 'Pallof Press', '3', '12', 'Controlled anti-rotation press', 45, 'Controlled', 'Cable'),
    ex('Core', 'Split Stance Rotation', '2', '10/side', 'New movement; stay balanced throughout', 45, 'Controlled', 'Cable/Band')
  ]);

  const joeyWeek2Friday = withPre([
    ex('Upper', 'Upper Chest Press', '3', '12', 'Light load and smooth reps', 60, 'Controlled', 'Machine'),
    ex('Upper', 'Upper Seated Row', '3', '12', 'Controlled pull with full squeeze', 60, 'Controlled', 'Machine'),
    ex('Upper', 'Farmer Carry', '3', '30 sec', 'Stay tall and brace hard', 60, 'Walk', 'Dumbbells'),
    ex('Cardio', 'Elliptical or Walk', '1', '20 min', 'Steady pace', 0, 'Steady', 'Elliptical/Treadmill')
  ]);

  const joeyWeek3Tuesday = withPre([
    ex('Legs', 'Leg Press', '3', '10', 'Use a 3 second lowering phase', 60, '3010', 'Machine'),
    ex('Legs', 'Hamstring Curl', '3', '12', 'Pause at the top of each rep', 60, 'Controlled', 'Machine'),
    ex('Legs', 'Hip Abduction', '3', '15', 'Strict control and no swinging', 45, 'Controlled', 'Machine'),
    ex('Activation', 'Glute Bridge Hold', '3', '20 sec', 'Squeeze and keep hips level', 30, 'Hold', 'Bodyweight'),
    ex('Knees', 'Terminal Knee Extensions', '3', '15', 'Light and smooth lockout', 45, 'Controlled', 'Band/Cable'),
    ex('Mobility', 'Deep Squat Hold', '3', '30 sec', 'Assisted hold with comfortable depth', 30, 'Hold', 'Bodyweight')
  ]);

  const joeyWeek3Thursday = withPre([
    ex('Mobility', "World's Greatest Stretch", '2', '5/side', 'Repeat each side with calm breathing', 0, 'Controlled', 'Bodyweight'),
    ex('Mobility', 'Thoracic Rotations', '2', '12', 'Increase total reps while staying smooth', 30, 'Controlled', 'Bodyweight'),
    ex('Core', 'Cable Woodchops', '3', '12', 'Slow down the full pattern', 60, 'Controlled', 'Cable'),
    ex('Core', 'Pallof Hold', '3', '30 sec', 'Brace and own the hold', 45, 'Hold', 'Cable'),
    ex('Mobility', 'Hip CARs', '2', '6/side', 'Controlled articular rotations through the hip', 30, 'Slow', 'Bodyweight')
  ]);

  const joeyWeek3Friday = withPre([
    ex('Cardio', 'Incline Walk/Elliptical', '1', '25 min', 'Easy steady effort', 0, 'Steady', 'Treadmill/Elliptical'),
    ex('Mobility', 'Full Stretch', '1', '15 min', 'Lower body and hip focus', 0, 'Hold', 'Bodyweight')
  ]);

  const joeyWeek4Monday = withPre([
    ex('Chest', 'Chest Press', '3', '12-15', 'Light deload effort', 60, 'Controlled', 'Machine'),
    ex('Chest', 'Pec Deck', '3', '15', 'Stretch and move smoothly', 60, 'Controlled', 'Machine'),
    ex('Back', 'Seated Row', '3', '12', 'Controlled row with no strain', 60, 'Controlled', 'Machine'),
    ex('Core', 'Plank', '3', '60 sec', 'Steady brace and breathing', 45, 'Hold', 'Bodyweight')
  ]);

  const joeyWeek4Tuesday = withPre([
    ex('Legs', 'Leg Press (Light)', '2', '15', 'Lighter effort and smooth reps', 60, 'Controlled', 'Machine'),
    ex('Legs', 'Hamstring Curl', '2', '15', 'Light and controlled', 60, 'Controlled', 'Machine'),
    ex('Legs', 'Hip Abduction', '2', '15', 'Controlled range', 45, 'Controlled', 'Machine'),
    ex('Activation', 'Glute Bridges', '3', '15', 'Squeeze at top and stay relaxed', 30, 'Controlled', 'Bodyweight'),
    ex('Mobility', 'Full Stretch', '1', '15-20 min', 'Recovery focus', 0, 'Hold', 'Bodyweight')
  ]);

  const joeyWeek4Thursday = withPre([
    ex('Core', 'Cable Woodchops', '3', '10', 'Light and crisp rotation', 60, 'Controlled', 'Cable'),
    ex('Core', 'Pallof Hold', '3', '30 sec', 'Brace and keep it simple', 45, 'Hold', 'Cable'),
    ex('Core', 'Torso Rotation Machine', '2', '15', 'Controlled movement with no forcing', 60, 'Controlled', 'Machine'),
    ex('Mobility', 'Flow Stretch', '1', '10-15 min', 'Easy movement flow for recovery', 0, 'Flowing', 'Bodyweight')
  ]);

  const joeyWeek4Friday = withPre([
    ex('Cardio', 'Elliptical/Walk', '1', '20-30 min', 'Easy effort only', 0, 'Steady', 'Elliptical/Treadmill'),
    ex('Mobility', 'Full Body Stretch', '1', '15 min', 'Move through the full body calmly', 0, 'Hold', 'Bodyweight'),
    ex('Mobility', 'Foam Rolling', '1', '5-10 min', 'Optional easy tissue work', 0, 'Slow', 'Foam Roller')
  ]);

  const PROGRAM_TEMPLATES = {
    'golf-6week': {
      weeks: {
        1: legacyWorkouts,
        2: legacyWorkouts,
        3: legacyWorkouts,
        4: legacyWorkouts,
        5: legacyWorkouts,
        6: legacyWorkouts
      }
    },
    'strength-4week': {
      weeks: {}
    },
    'joey-4wk-baseline': {
      weeks: {
        1: {
          Monday: joeyWeek1Monday,
          Tuesday: joeyWeek1Tuesday,
          Wednesday: joeyWeek1Wednesday,
          Thursday: joeyWeek1Thursday,
          Friday: joeyWeek1Friday,
          Saturday: cloneList(JOEY_NIGHT_STRETCH),
          Sunday: cloneList(JOEY_REST_DAY)
        },
        2: {
          Monday: joeyWeek2Monday,
          Tuesday: joeyWeek2Tuesday,
          Wednesday: joeyWeek2Wednesday,
          Thursday: joeyWeek2Thursday,
          Friday: joeyWeek2Friday,
          Saturday: cloneList(JOEY_NIGHT_STRETCH),
          Sunday: cloneList(JOEY_REST_DAY)
        },
        3: {
          Monday: joeyWeek2Monday,
          Tuesday: joeyWeek3Tuesday,
          Wednesday: joeyWeek2Wednesday,
          Thursday: joeyWeek3Thursday,
          Friday: joeyWeek3Friday,
          Saturday: cloneList(JOEY_NIGHT_STRETCH),
          Sunday: cloneList(JOEY_REST_DAY)
        },
        4: {
          Monday: joeyWeek4Monday,
          Tuesday: joeyWeek4Tuesday,
          Wednesday: cloneList(JOEY_NIGHT_STRETCH),
          Thursday: joeyWeek4Thursday,
          Friday: joeyWeek4Friday,
          Saturday: cloneList(JOEY_NIGHT_STRETCH),
          Sunday: cloneList(JOEY_REST_DAY)
        }
      }
    }
  };

  return { PROGRAMS, PROGRAM_GUIDES, PROGRAM_TEMPLATES };
};
