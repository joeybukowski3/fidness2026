(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FidnessWeightLossProgram = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const PROGRAM_ID = 'weight-loss-strength-v1';
  const REVIEW_INTERVAL_WEEKS = 6;
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const knee = 'Use only a pain-free/tolerated range; avoid forcing deep knee flexion. Stop or substitute for sharp pain.';
  const progression = 'Double progression: reach the top of the rep range on every prescribed set with clean technique and appropriate RIR before increasing load next session; then return toward the lower rep limit. No fixed weights or required failure.';
  // Conservative activity budget: top reps at 4 sec/rep, both sides,
  // full rest, 30 sec logging/setup per set, and 15 sec to switch sides.
  function activityBudgetMinutes(a) {
    const range = String(a.reps || '').match(/\d+/g);
    if (!range || a.category === 'Cardio' || a.type === 'cooldown') return a.durationMinutes;
    const reps = Number(range[1] || range[0]);
    const perSide = String(a.reps).includes('/side');
    const workSeconds = String(a.reps).includes('sec') ? reps : reps * 4;
    return (a.sets * (workSeconds * (perSide ? 2 : 1) + 30 + (perSide ? 15 : 0)) + Math.max(0, a.sets - 1) * (a.restSeconds || 0)) / 60;
  }
  function entry(day, exerciseId, title, sets, reps, restSeconds = 60, equipment = 'Bodyweight', category = 'Strength', notes = '', substitutions = [], type = 'strength') {
    return { id: `wls-${day}-${exerciseId}`, exerciseId, title, type, durationMinutes: type === 'strength' ? (sets * (reps.includes('/side') ? 1 : 0.65) + Math.max(0, sets - 1) * restSeconds / 60) : 2,
      sets, reps, restSeconds, targetRir: type === 'strength' ? { default: '2-3' } : null, tempo: 'Controlled', equipment, category, notes, substitutions, required: true };
  }
  function cardio(day, suffix, title, minutes, notes = '', substitutions = ['Recumbent Bike']) {
    return { id: `wls-${day}-${suffix}`, exerciseId: suffix, title, type: 'walk', category: 'Cardio', durationMinutes: minutes, equipment: 'Stationary Bike / Recumbent Bike / Treadmill', notes: `${notes} No running or HIIT. Bike is the default low-impact fallback; incline walking is optional only when knee-tolerated. ${knee}`, substitutions, metrics: ['time', 'speed', 'incline', 'distance'], required: true };
  }
  const s = entry;
  const core = (d, id, title, reps, equipment = 'Bodyweight') => s(d,id,title,3,reps,45,equipment,'Core','Stop the set when trunk position or control deteriorates.');
  const upperWarmup = d => [cardio(d,'easy-cardio','Easy Bike or Treadmill Walk',5,'Easy effort.'), {...s(d,'shoulder-mobility','Shoulder Mobility / Warm-Up Sets',1,'Controlled warm-up',0,'Bodyweight / Light Weights','Warm-up','Use light rehearsal sets before working loads.',[],'warmup'), durationMinutes: 3}];
  const mon = [
    s('mon','machine-shoulder-press','Machine Shoulder Press',2,'10-12',75,'Machine'),
    s('mon','reverse-pec-deck','Reverse Pec Deck',2,'12-15',60,'Machine'),
    s('mon','cable-lateral-raise','Cable Lateral Raise',2,'12-15/side',45,'Cable'),
    s('mon','cable-curl','Cable Curl',3,'10-15',60,'Cable','Biceps'),
    s('mon','rope-hammer-curl','Rope Hammer Curl',2,'10-15',60,'Cable','Biceps'),
    s('mon','rope-triceps-pushdown','Rope Triceps Pressdown',2,'10-15',60,'Cable','Triceps')
  ];
  const tue = [
    s('tue','seated-hamstring-curl','Seated or Lying Hamstring Curl',3,'10-15',75,'Machine','Strength',knee,['Lying Leg Curl']),
    s('tue','hip-thrust','Smith Hip Thrust or Glute Bridge',3,'8-12',90,'Smith Machine / Floor','Strength',knee,['Glute Bridge']),
    s('tue','leg-press','Leg Press',2,'10-15',90,'Machine','Strength',`${knee} Substitute a tolerated glute bridge, or skip if neither is comfortable; do not make up painful sets.`,['Glute Bridge']),
    s('tue','dumbbell-romanian-deadlift','Dumbbell Romanian Deadlift',3,'8-12',90,'Dumbbells'),
    s('tue','hip-abduction-machine','Hip Abduction Machine',2,'15-20',60,'Machine'),
    s('tue','machine-calf-raise','Calf Raise',2,'12-20',60,'Machine'),
    core('tue','cable-crunch','Cable Crunch','10-15','Cable'),{...core('tue','pallof-press','Pallof Press','10/side','Cable'), sets: 2},{...core('tue','dead-bug','Dead Bug','8/side'), sets: 2}
  ];
  const wed = [
    s('wed','machine-chest-press','Machine Chest Press',3,'8-12',90,'Machine'),s('wed','chest-supported-row','Chest-Supported Row',3,'8-12',90,'Machine / Dumbbells'),
    s('wed','lat-pulldown','Lat Pulldown',3,'8-12',90,'Machine'),s('wed','incline-dumbbell-press','Incline Dumbbell or Machine Press',3,'10-12',75,'Dumbbells / Machine','Strength','',['Incline Chest Press Machine']),
    s('wed','cable-lateral-raise','Cable Lateral Raise',3,'12-20',60,'Cable'),s('wed','reverse-pec-deck','Reverse Pec Deck or Face Pull',2,'12-20',60,'Machine / Cable','Strength','',['Face Pull']),
    s('wed','cable-curl','Cable Curl',3,'10-15',60,'Cable','Biceps'),s('wed','preacher-curl','Preacher Curl',2,'10-12',60,'Machine / EZ Bar','Biceps'),core('wed','reverse-crunch','Reverse Crunch','10-15')
  ];
  const mobility = [
    s('thu','hip-flexor-stretch','Hip Flexor Stretch',2,'30-45 sec/side',15),s('thu','hamstring-stretch','Hamstring Stretch',2,'30-45 sec/side',15),
    s('thu','figure-four-glute-stretch','Figure-4 Glute Stretch',2,'30-45 sec/side',15),s('thu','90-90-hip-rotations','90/90 Hip Rotations',2,'8/side',15),
    s('thu','adductor-rock-back','Adductor Rock-Back',2,'8-10/side',15),s('thu','knee-to-wall-ankle-rocks','Knee-to-Wall Ankle Rocks',2,'10/side',15)
  ].map(a => ({...a,sets:1,type:'mobility',category:'Stretches',targetRir:null,notes:knee,durationMinutes:2.5}));
  const fri = [
    s('fri','lat-pulldown','Lat Pulldown or Assisted Pull-Up',3,'8-12',90,'Machine','Strength','',['Assisted Pull-Up']),s('fri','incline-chest-press-machine','Incline Chest Press',3,'8-12',90,'Machine'),
    s('fri','seated-cable-row','Seated Cable Row',3,'10-12',90,'Cable'),s('fri','machine-shoulder-press','Machine Shoulder Press',2,'8-12',75,'Machine'),
    s('fri','lateral-raise','Lateral Raise',2,'12-20',60,'Dumbbells / Cable'),
    s('fri','preacher-curl','Preacher Curl',3,'8-12',60,'Machine / EZ Bar','Biceps'),s('fri','hammer-curl','Hammer Curl',2,'10-15',60,'Dumbbells','Biceps'),s('fri','rope-triceps-pushdown','Rope Pressdown',2,'10-15',60,'Cable','Triceps'),
    s('fri','seated-hamstring-curl','Hamstring Curl',2,'12-15',60,'Machine','Light lower',`Light frequency work, keep 2-3 RIR. ${knee}`),s('fri','hip-abduction-machine','Hip Abduction',2,'15-20',60,'Machine','Light lower','Light frequency work, keep 2-3 RIR.')
  ];
  function phase(day,id,title,startTime,endTime,activities) { return {id:`wls-${day}-${id}`,title,startTime,endTime,activities}; }
  function mission(day,name,startTime,phases) {
    return {id:`wls-mission-${day.toLowerCase()}`,weekday:day,name,startTime,endTime:'06:00',required:true,location:'Gym',locationType:'gym',focus:[name],pillars:['strength','core','mobility','cardio'],goalIds:['goal-weight-loss','goal-biceps','goal-core','goal-mobility'],description:'From near 210 lb toward staying below 200 lb while preserving/building muscle.',progressTarget:progression,safetyNote:knee,phases};
  }
  const missions = {
    Monday: mission('Monday','Light Upper + Arms + Conditioning','05:00',[
      phase('mon','warmup','Warm-Up','05:00','05:05',[cardio('mon','easy-cardio','Easy Bike or Treadmill Walk',5,'Easy effort.')]),phase('mon','strength','Light Upper + Arms','05:05','05:42',mon),phase('mon','conditioning','Conditioning','05:42','06:00',[cardio('mon','conditioning','Stationary Bike or Incline Treadmill',18,'15-18 min, RPE 5-6.')])]),
    Tuesday: mission('Tuesday','Knee-Friendly Lower Body + Core + Bike','04:30',[
      phase('tue','warmup','Warm-Up','04:30','04:42',[cardio('tue','easy-bike','Easy Stationary Bike',5,'Easy effort.'),...[[ 'glute-bridge','Glute Bridge','12'],['bodyweight-hip-hinge','Bodyweight Hip Hinge','10'],['leg-swings','Leg Swings','10/side'],['ankle-rocks','Ankle Rocks','10/side']].map(([id,title,reps]) => s('tue',id,title,1,reps,0,'Bodyweight','Warm-up',knee,[],'warmup'))]),phase('tue','strength','Lower Body + Core','04:42','05:40',tue),phase('tue','conditioning','Steady Bike','05:40','06:00',[cardio('tue','conditioning','Stationary Bike',20,'3 min easy + 15 min moderate + 2 min easy. No HIIT.')])]),
    Wednesday: mission('Wednesday','Upper Body A + Biceps + Conditioning','04:30',[
      phase('wed','warmup','Warm-Up','04:30','04:40',upperWarmup('wed')),phase('wed','strength','Upper Body + Biceps + Core','04:40','05:42',wed),phase('wed','conditioning','Knee-Tolerated Conditioning','05:42','06:00',[cardio('wed','conditioning','Incline Treadmill or Bike',18,'Walking option: approximately 2.5-3.2 mph, 3-6% incline, RPE 5-6. Choose bike when walking is not tolerated.',['Stationary Bike','Recumbent Bike'])])]),
    Thursday: mission('Thursday','Conditioning + Mobility + Core','04:30',[
      phase('thu','conditioning','Steady Conditioning','04:30','05:15',[cardio('thu','warmup-bike','Easy Bike Warm-Up',5,'Easy effort.'),cardio('thu','steady-bike','Steady Bike or Incline Walk',35,'RPE 5-6.'),cardio('thu','cooldown-bike','Easy Bike Cooldown',5,'Easy effort.')]),phase('thu','mobility','Hip and Lower-Body Mobility','05:15','05:29',mobility),phase('thu','core','Core Control','05:29','05:55',[core('thu','side-plank','Side Plank','25-40 sec/side'),core('thu','bird-dog','Bird Dog','8/side'),core('thu','pallof-press','Pallof Press','10/side','Cable'),core('thu','dead-bug','Dead Bug','8/side')].map(a => ({...a, sets: 2}))),phase('thu','finish','Easy Finish','05:55','06:00',[{...s('thu','easy-stretching','Easy Walking / Stretching Until 6:00',1,'Easy movement',0,'Bodyweight','Stretches',knee,[],'cooldown'),durationMinutes:5}])]),
    Friday: mission('Friday','Upper Body B + Arms + Light Lower + Conditioning','04:30',[
      phase('fri','warmup','Warm-Up','04:30','04:40',upperWarmup('fri')),phase('fri','strength','Upper Body + Arms + Light Lower','04:40','05:45',fri),phase('fri','conditioning','Conditioning','05:45','06:00',[cardio('fri','conditioning','Bike or Knee-Tolerated Incline Walk',15,'Approximately 15 min, RPE 5-6.')])])
  };
  ['Saturday','Sunday'].forEach(day => { missions[day] = {id:`wls-mission-${day.toLowerCase()}`,weekday:day,name:'Optional Recovery or Rest',required:false,focus:['Recovery'],phases:[]}; });
  const PROGRAM = {id:PROGRAM_ID,name:'Weight Loss + Strength',type:'ongoing',ongoing:true,reviewIntervalWeeks:6,requiredWeekdays:weekdays,missions,goals:[{id:'goal-weight-loss',name:'Stay below 200 lb while preserving/building muscle'},{id:'goal-biceps',name:'Biceps hypertrophy'},{id:'goal-core',name:'Core strength'},{id:'goal-mobility',name:'Hip and lower-body mobility'}]};
  function getMission(day,week=1) {
    if (!missions[day]) return null;
    const value = JSON.parse(JSON.stringify(missions[day]));
    value.programId=PROGRAM_ID; value.programWeek=Math.max(1,parseInt(week,10)||1); value.cycleWeek=(value.programWeek-1)%6+1; value.variation='Standard';
    value.phases.forEach(p => p.activities.forEach(a => {
      if (a.type !== 'strength') return;
      if (value.cycleWeek===6) { a.sets=Math.max(1,Math.round(a.sets*2/3)); a.targetRir={default:'3-4'}; a.notes+=' Deload/review: reduce load approximately 10-15% where appropriate; review knee tolerance, recovery and progress before repeating.'; }
      else if (day!=='Monday' && day!=='Thursday' && a.category!=='Light lower' && a.category!=='Core') a.targetRir=value.cycleWeek<=2?{default:'2-3'}:value.cycleWeek<=4?{default:2,final:'1-2'}:{default:'1-2'};
      a.notes+=` ${progression}`;
    }));
    if (value.cycleWeek===6) value.phases.forEach(p => p.activities.filter(a => a.category==='Cardio').forEach(a => { a.notes+=' Deload: keep effort easy/moderate.'; }));
    value.phases.forEach(p => p.activities.forEach(a => { a.durationMinutes = activityBudgetMinutes(a); }));
    return value;
  }
  function toLegacyWorkout(day,week=1) {
    const m=getMission(day,week); if(!m)return [];
    return m.phases.flatMap(p=>p.activities.map(a=>({id:a.id,activityId:a.id,exerciseId:a.exerciseId,activityType:a.type,phaseId:p.id,phase:p.id.endsWith('-warmup')?'Pre-Workout Stretch':'Main Workout',exercise:a.title,sets:String(a.sets||1),reps:a.reps||`${a.durationMinutes} min`,rest:a.restSeconds||0,tempo:a.tempo||'Steady',notes:a.notes+((a.substitutions||[]).length?' SUB: '+a.substitutions.join(' or '):''),equipment:a.equipment,category:a.category,targetRir:a.targetRir||null,required:a.required!==false,budgetMinutes:a.durationMinutes})));
  }
  return {PROGRAM_ID,REVIEW_INTERVAL_WEEKS,PROGRAM,getMission,toLegacyWorkout};
});
