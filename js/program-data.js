window.buildProgramData = function buildProgramData(legacyWorkouts) {
  const PROGRAMS = [
    { id: 'golf-6week', name: 'Golf Training 6-Week Cycle', weeks: 6 },
    { id: 'strength-4week', name: 'Strength & Mobility 4-Week', weeks: 4 },
    { id: 'joey-4wk-baseline', name: "Joey's 4-Week Baseline", weeks: 4 },
    { id: 'joey-upper-lower-split', name: "Joey X", weeks: 4 }
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
  `,
    'joey-upper-lower-split': `
  <h2>Program Overview</h2>
  <p><strong>Duration:</strong> 4 weeks | <strong>Target:</strong> Upper body toning (chest, arms, core) + Lower body flexibility and strength</p>
  <h2>Weekly Schedule</h2>
  <ul>
    <li><strong>Monday:</strong> Chest Focus — Upper Body</li>
    <li><strong>Tuesday:</strong> Lower Body Strength + Flexibility</li>
    <li><strong>Wednesday:</strong> Arms & Shoulders Focus — Upper Body</li>
    <li><strong>Thursday:</strong> Lower Body Flexibility + Mobility</li>
    <li><strong>Friday:</strong> Core + Full Upper Body</li>
    <li><strong>Saturday:</strong> Night Stretch (recovery)</li>
    <li><strong>Sunday:</strong> Rest</li>
  </ul>
  <h2>Knee Safety Notes</h2>
  <ul>
    <li>No free squats or quick lateral movements</li>
    <li>Keep knee tracking over toes at all times</li>
    <li>Stop immediately if knee pain occurs</li>
    <li>Prioritize hip mobility — hips are a known tight area</li>
  </ul>
  <h2>Progression</h2>
  <ul>
    <li>Week 1: Baseline — establish form and weights</li>
    <li>Week 2: Build — increase weight or reps slightly</li>
    <li>Week 3: Push — work closer to max with clean form</li>
    <li>Week 4: Deload — reduce weight 20-30%, focus on recovery</li>
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

  // Joey Upper/Lower Split — Monday (Chest Focus)
  const ulsWeek1Monday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 10% incline', 0, 'Steady', 'Treadmill'),
    ex('Chest', 'Dumbbell Chest Press', '3', '8', 'Baseline weight — 60 lbs. Controlled reps.', 60, 'Controlled', 'Dumbbells'),
    ex('Chest', 'Chest Fly + Close Grip Bench Superset', '3', '12 each', '15 lb dumbbells. No rest between superset exercises.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Shoulders', 'Lateral Raises', '3', '15', '15 lbs. Controlled raise and slow lower.', 45, 'Controlled', 'Dumbbells'),
    ex('Back/Chest', 'Lat Pullover', '3', '10', 'Moderate weight. Full stretch at bottom.', 60, 'Controlled', 'Dumbbells'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '4', '15 each', 'No rest between superset. Control the twist.', 60, 'Controlled', 'Decline Bench')
  ]);

  const ulsWeek2Monday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 10% incline', 0, 'Steady', 'Treadmill'),
    ex('Chest', 'Dumbbell Chest Press', '3', '8', 'Add 5 lbs if form was clean in Week 1.', 60, 'Controlled', 'Dumbbells'),
    ex('Chest', 'Chest Fly + Close Grip Bench Superset', '3', '12 each', 'Try 17.5 or 20 lbs if 15 felt easy.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Shoulders', 'Lateral Raises', '3', '15', 'Add 2.5-5 lbs if form stays clean.', 45, 'Controlled', 'Dumbbells'),
    ex('Back/Chest', 'Lat Pullover', '3', '10', 'Slight weight increase from Week 1.', 60, 'Controlled', 'Dumbbells'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '4', '15 each', 'Add light plate if bodyweight feels easy.', 60, 'Controlled', 'Decline Bench')
  ]);

  const ulsWeek3Monday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 10% incline', 0, 'Steady', 'Treadmill'),
    ex('Chest', 'Dumbbell Chest Press', '3', '8', 'Push to near max weight with clean form.', 60, 'Controlled', 'Dumbbells'),
    ex('Chest', 'Chest Fly + Close Grip Bench Superset', '3', '12 each', 'Peak effort. Maintain form throughout.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Shoulders', 'Lateral Raises', '3', '15', 'Peak weight. Slow and controlled on the lower.', 45, 'Controlled', 'Dumbbells'),
    ex('Back/Chest', 'Lat Pullover', '3', '10', 'Peak effort with full range of motion.', 60, 'Controlled', 'Dumbbells'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '4', '15 each', 'Add plate to both exercises if able.', 60, 'Controlled', 'Decline Bench')
  ]);

  const ulsWeek4Monday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 8% incline — slightly easier this week.', 0, 'Steady', 'Treadmill'),
    ex('Chest', 'Dumbbell Chest Press', '3', '10', 'Drop weight 20-30%. Focus on squeeze and form.', 60, 'Controlled', 'Dumbbells'),
    ex('Chest', 'Chest Fly + Close Grip Bench Superset', '3', '12 each', 'Lighter weight. Stretch and feel the muscle.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Shoulders', 'Lateral Raises', '3', '15', 'Light and smooth. Recovery week.', 45, 'Controlled', 'Dumbbells'),
    ex('Back/Chest', 'Lat Pullover', '3', '10', 'Light weight and full range.', 60, 'Controlled', 'Dumbbells'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '3', '12 each', 'Reduce sets and keep it light.', 60, 'Controlled', 'Decline Bench')
  ]);

  // Joey Upper/Lower Split — Tuesday (Lower Body Strength + Flexibility)
  const ulsWeek1Tuesday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 5% incline — easier incline for leg days', 0, 'Steady', 'Treadmill'),
    ex('Legs', 'Leg Press', '3', '12', 'Moderate weight. Controlled and knee-safe range.', 60, 'Controlled', 'Machine'),
    ex('Legs', 'Seated Leg Curl', '3', '12', 'Controlled curl. No jerking.', 60, 'Controlled', 'Machine'),
    ex('Hips', 'Hip Abductor Machine', '3', '15', 'Glute focus. No swinging.', 45, 'Controlled', 'Machine'),
    ex('Legs', 'Standing Cable Kickbacks', '3', '12', '12 reps each leg. Controlled extension.', 60, 'Controlled', 'Cable'),
    ex('Legs', 'Seated Calf Raises', '3', '15', 'Full range. Slow lower.', 45, 'Controlled', 'Machine'),
    ex('Flexibility', 'Pigeon Pose', '1', '60 sec/side', 'Deep hip opener. Breathe through it.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Seated Hamstring Stretch', '1', '60 sec/side', 'Keep leg straight. No bouncing.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Lying Figure-4 Stretch', '1', '60 sec/side', 'Glutes and hips. Pull gently.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Kneeling Hip Flexor Stretch', '1', '60 sec/side', 'Stay upright and squeeze glute.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Supine Knee-to-Chest Pull', '1', '60 sec/side', 'Gentle pull. Relax the hip.', 0, 'Hold', 'Bodyweight'),
    ex('Recovery', 'Foam Roller — IT Band, Quads, Hamstrings', '1', '2 min each', 'Slow rolls. Pause on tight spots.', 0, 'Slow', 'Foam Roller'),
    ex('Flexibility', 'Seated Butterfly Stretch', '1', '90 sec', 'Inner thigh and hip opener. Breathe deep.', 0, 'Hold', 'Bodyweight')
  ]);

  const ulsWeek2Tuesday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 5% incline', 0, 'Steady', 'Treadmill'),
    ex('Legs', 'Leg Press', '3', '12', 'Add weight if Week 1 felt comfortable.', 60, 'Controlled', 'Machine'),
    ex('Legs', 'Seated Leg Curl', '3', '12', 'Slight progression from Week 1.', 60, 'Controlled', 'Machine'),
    ex('Hips', 'Hip Abductor Machine', '3', '15', 'Add weight if no compensation.', 45, 'Controlled', 'Machine'),
    ex('Legs', 'Standing Cable Kickbacks', '3', '12', 'Add light resistance if Week 1 felt easy.', 60, 'Controlled', 'Cable'),
    ex('Legs', 'Seated Calf Raises', '3', '15', 'Add weight. Control the lower.', 45, 'Controlled', 'Machine'),
    ex('Flexibility', 'Pigeon Pose', '1', '60 sec/side', 'Try to sink a little deeper than Week 1.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Seated Hamstring Stretch', '1', '60 sec/side', 'Hold steady. Notice any improvement.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Lying Figure-4 Stretch', '1', '60 sec/side', 'Relax further into the stretch.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Kneeling Hip Flexor Stretch', '1', '60 sec/side', 'Push hips forward slightly more.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Supine Knee-to-Chest Pull', '1', '60 sec/side', 'Gentle pull and breathe.', 0, 'Hold', 'Bodyweight'),
    ex('Recovery', 'Foam Roller — IT Band, Quads, Hamstrings', '1', '2 min each', 'Slow and deliberate.', 0, 'Slow', 'Foam Roller'),
    ex('Flexibility', 'Seated Butterfly Stretch', '1', '90 sec', 'Lean forward slightly if comfortable.', 0, 'Hold', 'Bodyweight')
  ]);

  const ulsWeek3Tuesday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 5% incline', 0, 'Steady', 'Treadmill'),
    ex('Legs', 'Leg Press', '3', '10', 'Peak effort. Heavier weight, fewer reps.', 60, '3010', 'Machine'),
    ex('Legs', 'Seated Leg Curl', '3', '10', 'Peak weight. Pause at top of each rep.', 60, 'Controlled', 'Machine'),
    ex('Hips', 'Hip Abductor Machine', '3', '15', 'Peak weight with strict control.', 45, 'Controlled', 'Machine'),
    ex('Legs', 'Standing Cable Kickbacks', '3', '12', 'Peak resistance. Full extension each rep.', 60, 'Controlled', 'Cable'),
    ex('Legs', 'Seated Calf Raises', '3', '15', 'Peak weight. Full range.', 45, 'Controlled', 'Machine'),
    ex('Flexibility', 'Pigeon Pose', '1', '75 sec/side', 'Extend hold time this week.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Seated Hamstring Stretch', '1', '75 sec/side', 'Extend hold.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Lying Figure-4 Stretch', '1', '75 sec/side', 'Deeper pull if comfortable.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Kneeling Hip Flexor Stretch', '1', '75 sec/side', 'Max depth with upright torso.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Supine Knee-to-Chest Pull', '1', '75 sec/side', 'Full relaxation into the stretch.', 0, 'Hold', 'Bodyweight'),
    ex('Recovery', 'Foam Roller — IT Band, Quads, Hamstrings', '1', '2 min each', 'Thorough tissue work.', 0, 'Slow', 'Foam Roller'),
    ex('Flexibility', 'Seated Butterfly Stretch', '1', '90 sec', 'Lean forward and breathe deep.', 0, 'Hold', 'Bodyweight')
  ]);

  const ulsWeek4Tuesday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 3% incline — easy deload walk', 0, 'Steady', 'Treadmill'),
    ex('Legs', 'Leg Press', '2', '15', 'Drop weight 20-30%. Light and smooth.', 60, 'Controlled', 'Machine'),
    ex('Legs', 'Seated Leg Curl', '2', '15', 'Light and controlled. Recovery week.', 60, 'Controlled', 'Machine'),
    ex('Hips', 'Hip Abductor Machine', '2', '15', 'Light effort. Focus on range.', 45, 'Controlled', 'Machine'),
    ex('Legs', 'Standing Cable Kickbacks', '2', '12', 'Light resistance. Easy movement.', 60, 'Controlled', 'Cable'),
    ex('Legs', 'Seated Calf Raises', '2', '15', 'Light weight. Focus on full range.', 45, 'Controlled', 'Machine'),
    ex('Flexibility', 'Pigeon Pose', '1', '90 sec/side', 'Deload week — prioritize flexibility today.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Seated Hamstring Stretch', '1', '90 sec/side', 'Long hold. Full recovery focus.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Lying Figure-4 Stretch', '1', '90 sec/side', 'Deepest hold of the 4 weeks.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Kneeling Hip Flexor Stretch', '1', '90 sec/side', 'Relax completely into it.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Supine Knee-to-Chest Pull', '1', '90 sec/side', 'Full release and breathe.', 0, 'Hold', 'Bodyweight'),
    ex('Recovery', 'Foam Roller — IT Band, Quads, Hamstrings', '1', '3 min each', 'Extra thorough this week.', 0, 'Slow', 'Foam Roller'),
    ex('Flexibility', 'Seated Butterfly Stretch', '1', '2 min', 'Longest hold of the cycle.', 0, 'Hold', 'Bodyweight')
  ]);

  // Joey Upper/Lower Split — Wednesday (Arms & Shoulders Focus)
  const ulsWeek1Wednesday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 10% incline', 0, 'Steady', 'Treadmill'),
    ex('Triceps', 'Skull Crusher + Hammer Curl Superset', '3', '10 each', 'Baseline weight. Control the skull crusher descent.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Shoulders', 'Lateral Raises', '3', '15', '15 lbs. Baseline.', 45, 'Controlled', 'Dumbbells'),
    ex('Shoulders', 'Overhead Dumbbell Press', '3', '10', 'Moderate weight. Seated or standing.', 60, 'Controlled', 'Dumbbells'),
    ex('Biceps', 'DB Curls', '3', '12', 'Control both the lift and lower.', 60, 'Controlled', 'Dumbbells'),
    ex('Triceps', 'Cable Tricep Pushdown', '3', '12', 'Keep elbows pinned at sides.', 45, 'Controlled', 'Cable'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '3', '15 each', 'Same as Monday but one fewer set.', 60, 'Controlled', 'Decline Bench')
  ]);

  const ulsWeek2Wednesday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 10% incline', 0, 'Steady', 'Treadmill'),
    ex('Triceps', 'Skull Crusher + Hammer Curl Superset', '3', '10 each', 'Add small amount of weight if Week 1 felt manageable.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Shoulders', 'Lateral Raises', '3', '15', 'Add 2.5-5 lbs if form stays clean.', 45, 'Controlled', 'Dumbbells'),
    ex('Shoulders', 'Overhead Dumbbell Press', '3', '10', 'Build slightly from Week 1.', 60, 'Controlled', 'Dumbbells'),
    ex('Biceps', 'DB Curls', '3', '12', 'Increase weight slightly if last set felt easy.', 60, 'Controlled', 'Dumbbells'),
    ex('Triceps', 'Cable Tricep Pushdown', '3', '12', 'Add weight while keeping strict elbow position.', 45, 'Controlled', 'Cable'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '3', '15 each', 'Add light weight if bodyweight felt easy.', 60, 'Controlled', 'Decline Bench')
  ]);

  const ulsWeek3Wednesday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 10% incline', 0, 'Steady', 'Treadmill'),
    ex('Triceps', 'Skull Crusher + Hammer Curl Superset', '3', '10 each', 'Peak effort. Push weight while keeping form.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Shoulders', 'Lateral Raises', '3', '15', 'Peak weight with full control.', 45, 'Controlled', 'Dumbbells'),
    ex('Shoulders', 'Overhead Dumbbell Press', '3', '10', 'Push to near max with strict form.', 60, 'Controlled', 'Dumbbells'),
    ex('Biceps', 'DB Curls', '3', '12', 'Peak effort. No swinging.', 60, 'Controlled', 'Dumbbells'),
    ex('Triceps', 'Cable Tricep Pushdown', '3', '12', 'Max weight with elbows locked in.', 45, 'Controlled', 'Cable'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '3', '15 each', 'Add plate if able.', 60, 'Controlled', 'Decline Bench')
  ]);

  const ulsWeek4Wednesday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 8% incline', 0, 'Steady', 'Treadmill'),
    ex('Triceps', 'Skull Crusher + Hammer Curl Superset', '3', '12 each', 'Drop weight 20-30%. Smooth and controlled.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Shoulders', 'Lateral Raises', '3', '15', 'Light weight. Focus on form.', 45, 'Controlled', 'Dumbbells'),
    ex('Shoulders', 'Overhead Dumbbell Press', '3', '12', 'Lighter weight. Full range of motion.', 60, 'Controlled', 'Dumbbells'),
    ex('Biceps', 'DB Curls', '2', '12', 'Easy effort. Recovery week.', 60, 'Controlled', 'Dumbbells'),
    ex('Triceps', 'Cable Tricep Pushdown', '2', '15', 'Light and smooth.', 45, 'Controlled', 'Cable'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '2', '12 each', 'Reduce sets. Light and easy.', 60, 'Controlled', 'Decline Bench')
  ]);

  // Joey Upper/Lower Split — Thursday (Lower Body Flexibility + Mobility)
  const ulsWeek1Thursday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 5% incline', 0, 'Steady', 'Treadmill'),
    ex('Activation', 'Glute Bridges', '3', '15', 'Squeeze at top. Activate before stretching.', 30, 'Controlled', 'Bodyweight'),
    ex('Hips', 'Hip Abductor Machine', '2', '15', 'Lighter than Tuesday. Movement focus.', 45, 'Controlled', 'Machine'),
    ex('Legs', 'Standing Cable Kickbacks', '2', '12', 'Light and controlled. Each leg.', 45, 'Controlled', 'Cable'),
    ex('Mobility', 'Hip CARs (Controlled Articular Rotations)', '2', '6/side', 'Slow full circle rotation of the hip joint.', 30, 'Slow', 'Bodyweight'),
    ex('Flexibility', 'Pigeon Pose', '1', '60 sec/side', 'Hip opener. Breathe and relax.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Lying Figure-4 Stretch', '1', '60 sec/side', 'Glute and hip release.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Kneeling Hip Flexor Stretch', '1', '60 sec/side', 'Stay upright and squeeze glute.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Standing Quad Stretch', '1', '45 sec/side', 'Pull heel to glute. Balance on one leg.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Seated Hamstring Stretch', '1', '60 sec/side', 'Leg straight. Hinge at the hip.', 0, 'Hold', 'Bodyweight'),
    ex('Recovery', 'Foam Roller — Full Legs', '1', '2 min each area', 'Quads, hamstrings, IT band, calves.', 0, 'Slow', 'Foam Roller'),
    ex('Flexibility', 'Seated Butterfly Stretch', '1', '90 sec', 'Inner thigh and hip. Lean forward gently.', 0, 'Hold', 'Bodyweight')
  ]);

  const ulsWeek2Thursday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 5% incline', 0, 'Steady', 'Treadmill'),
    ex('Activation', 'Glute Bridges', '3', '15', 'Add slight weight or band if bodyweight is easy.', 30, 'Controlled', 'Bodyweight'),
    ex('Hips', 'Hip Abductor Machine', '2', '15', 'Slight weight increase from Week 1.', 45, 'Controlled', 'Machine'),
    ex('Legs', 'Standing Cable Kickbacks', '2', '12', 'Small resistance increase.', 45, 'Controlled', 'Cable'),
    ex('Mobility', 'Hip CARs', '2', '6/side', 'Focus on full range — feel every degree.', 30, 'Slow', 'Bodyweight'),
    ex('Flexibility', 'Pigeon Pose', '1', '60 sec/side', 'Sink a little deeper than Week 1.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Lying Figure-4 Stretch', '1', '60 sec/side', 'Pull slightly more.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Kneeling Hip Flexor Stretch', '1', '60 sec/side', 'Push hips forward slightly more.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Standing Quad Stretch', '1', '45 sec/side', 'Balance improving — hold steady.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Seated Hamstring Stretch', '1', '60 sec/side', 'Reach forward a little further.', 0, 'Hold', 'Bodyweight'),
    ex('Recovery', 'Foam Roller — Full Legs', '1', '2 min each area', 'Slow and deliberate.', 0, 'Slow', 'Foam Roller'),
    ex('Flexibility', 'Seated Butterfly Stretch', '1', '90 sec', 'Lean forward slightly if comfortable.', 0, 'Hold', 'Bodyweight')
  ]);

  const ulsWeek3Thursday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 5% incline', 0, 'Steady', 'Treadmill'),
    ex('Activation', 'Glute Bridges', '3', '20', 'More reps this week. Squeeze hard.', 30, 'Controlled', 'Bodyweight'),
    ex('Hips', 'Hip Abductor Machine', '3', '15', 'Add a set this week. Peak effort.', 45, 'Controlled', 'Machine'),
    ex('Legs', 'Standing Cable Kickbacks', '3', '12', 'Add a set. Full extension each rep.', 45, 'Controlled', 'Cable'),
    ex('Mobility', 'Hip CARs', '3', '6/side', 'Three sets — really own the full range.', 30, 'Slow', 'Bodyweight'),
    ex('Flexibility', 'Pigeon Pose', '1', '75 sec/side', 'Extended hold this week.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Lying Figure-4 Stretch', '1', '75 sec/side', 'Extended hold.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Kneeling Hip Flexor Stretch', '1', '75 sec/side', 'Max depth.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Standing Quad Stretch', '1', '60 sec/side', 'Longer hold this week.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Seated Hamstring Stretch', '1', '75 sec/side', 'Extended hold. Reach further.', 0, 'Hold', 'Bodyweight'),
    ex('Recovery', 'Foam Roller — Full Legs', '1', '2 min each area', 'Thorough tissue work.', 0, 'Slow', 'Foam Roller'),
    ex('Flexibility', 'Seated Butterfly Stretch', '1', '90 sec', 'Lean forward and hold.', 0, 'Hold', 'Bodyweight')
  ]);

  const ulsWeek4Thursday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 3% incline — easy deload', 0, 'Steady', 'Treadmill'),
    ex('Activation', 'Glute Bridges', '2', '15', 'Easy effort. Recovery week.', 30, 'Controlled', 'Bodyweight'),
    ex('Hips', 'Hip Abductor Machine', '2', '15', 'Light weight. Movement focus.', 45, 'Controlled', 'Machine'),
    ex('Legs', 'Standing Cable Kickbacks', '2', '12', 'Light resistance. Easy movement.', 45, 'Controlled', 'Cable'),
    ex('Mobility', 'Hip CARs', '2', '8/side', 'Deload week — more reps but very slow and easy.', 30, 'Slow', 'Bodyweight'),
    ex('Flexibility', 'Pigeon Pose', '1', '90 sec/side', 'Longest hold of the cycle. Full recovery.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Lying Figure-4 Stretch', '1', '90 sec/side', 'Full release.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Kneeling Hip Flexor Stretch', '1', '90 sec/side', 'Deepest hold of the cycle.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Standing Quad Stretch', '1', '60 sec/side', 'Easy and relaxed.', 0, 'Hold', 'Bodyweight'),
    ex('Flexibility', 'Seated Hamstring Stretch', '1', '90 sec/side', 'Full relaxation.', 0, 'Hold', 'Bodyweight'),
    ex('Recovery', 'Foam Roller — Full Legs', '1', '3 min each area', 'Extra thorough deload week.', 0, 'Slow', 'Foam Roller'),
    ex('Flexibility', 'Seated Butterfly Stretch', '1', '2 min', 'Longest hold of the full cycle.', 0, 'Hold', 'Bodyweight')
  ]);

  // Joey Upper/Lower Split — Friday (Core + Full Upper Body)
  const ulsWeek1Friday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 10% incline', 0, 'Steady', 'Treadmill'),
    ex('Chest', 'Dumbbell Chest Press', '2', '10', 'Lighter than Monday. Controlled reps.', 60, 'Controlled', 'Dumbbells'),
    ex('Back/Chest', 'Lat Pullover', '3', '10', 'Full stretch at bottom. Moderate weight.', 60, 'Controlled', 'Dumbbells'),
    ex('Triceps', 'Skull Crusher + Hammer Curl Superset', '2', '10 each', 'Lighter than Wednesday. Smooth reps.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '4', '15 each', 'Core is the main focus today. Full effort.', 60, 'Controlled', 'Decline Bench'),
    ex('Core', 'Plank', '3', '45 sec', 'Brace hard. Keep ribs down.', 45, 'Hold', 'Bodyweight')
  ]);

  const ulsWeek2Friday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 10% incline', 0, 'Steady', 'Treadmill'),
    ex('Chest', 'Dumbbell Chest Press', '2', '10', 'Slightly more weight than Week 1 Friday.', 60, 'Controlled', 'Dumbbells'),
    ex('Back/Chest', 'Lat Pullover', '3', '10', 'Build slightly from Week 1.', 60, 'Controlled', 'Dumbbells'),
    ex('Triceps', 'Skull Crusher + Hammer Curl Superset', '2', '10 each', 'Build from Week 1 Friday.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '4', '15 each', 'Add light weight if bodyweight felt easy.', 60, 'Controlled', 'Decline Bench'),
    ex('Core', 'Plank', '3', '60 sec', 'Extend hold from Week 1.', 45, 'Hold', 'Bodyweight')
  ]);

  const ulsWeek3Friday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 10% incline', 0, 'Steady', 'Treadmill'),
    ex('Chest', 'Dumbbell Chest Press', '3', '8', 'Push closer to max today. Add a set.', 60, 'Controlled', 'Dumbbells'),
    ex('Back/Chest', 'Lat Pullover', '3', '10', 'Peak weight with full range.', 60, 'Controlled', 'Dumbbells'),
    ex('Triceps', 'Skull Crusher + Hammer Curl Superset', '3', '10 each', 'Add a set from previous Fridays.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '4', '15 each', 'Peak effort. Add plate if able.', 60, 'Controlled', 'Decline Bench'),
    ex('Core', 'Plank', '3', '60 sec', 'Steady and strong.', 45, 'Hold', 'Bodyweight')
  ]);

  const ulsWeek4Friday = withPre([
    ex('Warm-Up', 'Incline Treadmill Walk', '1', '15 min', '3 mph, 8% incline', 0, 'Steady', 'Treadmill'),
    ex('Chest', 'Dumbbell Chest Press', '2', '12', 'Light weight. Recovery focus.', 60, 'Controlled', 'Dumbbells'),
    ex('Back/Chest', 'Lat Pullover', '2', '12', 'Light and full range.', 60, 'Controlled', 'Dumbbells'),
    ex('Triceps', 'Skull Crusher + Hammer Curl Superset', '2', '12 each', 'Easy weight and smooth movement.', 60, 'Controlled', 'Dumbbells/Barbell'),
    ex('Core', 'Decline Russian Twist + Weighted Decline Crunch Superset', '3', '12 each', 'Reduce sets. Light and easy.', 60, 'Controlled', 'Decline Bench'),
    ex('Core', 'Plank', '2', '45 sec', 'Easy hold. Recovery week.', 45, 'Hold', 'Bodyweight')
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
    },
    'joey-upper-lower-split': {
      weeks: {
        1: {
          Monday: ulsWeek1Monday,
          Tuesday: ulsWeek1Tuesday,
          Wednesday: ulsWeek1Wednesday,
          Thursday: ulsWeek1Thursday,
          Friday: ulsWeek1Friday,
          Saturday: cloneList(JOEY_NIGHT_STRETCH),
          Sunday: cloneList(JOEY_REST_DAY)
        },
        2: {
          Monday: ulsWeek2Monday,
          Tuesday: ulsWeek2Tuesday,
          Wednesday: ulsWeek2Wednesday,
          Thursday: ulsWeek2Thursday,
          Friday: ulsWeek2Friday,
          Saturday: cloneList(JOEY_NIGHT_STRETCH),
          Sunday: cloneList(JOEY_REST_DAY)
        },
        3: {
          Monday: ulsWeek3Monday,
          Tuesday: ulsWeek3Tuesday,
          Wednesday: ulsWeek3Wednesday,
          Thursday: ulsWeek3Thursday,
          Friday: ulsWeek3Friday,
          Saturday: cloneList(JOEY_NIGHT_STRETCH),
          Sunday: cloneList(JOEY_REST_DAY)
        },
        4: {
          Monday: ulsWeek4Monday,
          Tuesday: ulsWeek4Tuesday,
          Wednesday: ulsWeek4Wednesday,
          Thursday: ulsWeek4Thursday,
          Friday: ulsWeek4Friday,
          Saturday: cloneList(JOEY_NIGHT_STRETCH),
          Sunday: cloneList(JOEY_REST_DAY)
        }
      }
    }
  };

  function buildKneeSafeUpperFocusProgram() {  
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
      ex('Lower', 'Leg Press (Shallow Depth)', '3', '12', 75, 'Controlled', 'Start 307 lbs. Your confirmed knee-safe working weight — feet high, 60-70° bend max.', 'Machine'),
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
      ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', '307 lbs leg press. Maintain W1 — prioritize form and knee tracking.', 'Machine'),
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
      ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', '307 lbs leg press — maintain W1 form.', 'Machine'),
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
      ex('Lower', 'Leg Press (Shallow)', '3', '12', 75, 'Controlled', '317 lbs leg press — +10 only if zero knee discomfort.', 'Machine'),
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
  
      return {
      program: PROGRAMS[0],
      guide: PROGRAM_GUIDES['joey-12wk-knee-safe'],
      template: PROGRAM_TEMPLATES['joey-12wk-knee-safe']
    };
  }

  const mergeDefaultPrograms = defaults => {
    defaults.forEach(({ program, guide, template }) => {
      if (!program || !program.id) return;
      const existingIndex = PROGRAMS.findIndex(item => item.id === program.id);
      if (existingIndex >= 0) {
        PROGRAMS[existingIndex] = { ...PROGRAMS[existingIndex], ...program };
      } else {
        PROGRAMS.push(program);
      }
      if (guide) PROGRAM_GUIDES[program.id] = guide;
      if (template) PROGRAM_TEMPLATES[program.id] = template;
    });
  };

  const kneeSafeUpperFocus = buildKneeSafeUpperFocusProgram();
  mergeDefaultPrograms([kneeSafeUpperFocus]);

  return { PROGRAMS, PROGRAM_GUIDES, PROGRAM_TEMPLATES };
};
