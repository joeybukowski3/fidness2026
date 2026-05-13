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

  return { PROGRAMS, PROGRAM_GUIDES, PROGRAM_TEMPLATES };
};
