'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const weightLoss = require('../js/weight-loss-program');
const performance = require('../js/performance-program');
const schema = require('../js/state-schema');
const dashboard = require('../js/mission-dashboard');
function registry() {
  global.window = global;
  global.FidnessPerformanceProgram = performance;
  global.FidnessWeightLossProgram = weightLoss;
  require('../js/program-data');
  return global.buildProgramData({});
}
test('new ongoing program is registered with six-week templates and explicit default', () => {
  const r = registry();
  assert.equal(r.DEFAULT_PROGRAM_ID, weightLoss.PROGRAM_ID);
  assert.equal(schema.migrateState({}).state.programId, weightLoss.PROGRAM_ID);
  assert.equal(r.resolveProgramById(weightLoss.PROGRAM_ID).program.reviewIntervalWeeks, 6);
  assert.equal(Object.keys(r.PROGRAM_TEMPLATES[weightLoss.PROGRAM_ID].weeks).length, 6);
  for (const id of ['joey-12wk-knee-safe', performance.PROGRAM_ID]) assert.equal(r.resolveProgramById(id).status, 'available');
});
test('all prescribed weekdays have stable activities, targets and knee-tolerant cardio', () => {
  const seen = new Set();
  for (const day of weightLoss.PROGRAM.requiredWeekdays) {
    const m = weightLoss.getMission(day);
    assert.equal(m.startTime, day === 'Monday' ? '05:00' : '04:30');
    assert.equal(m.endTime, '06:00');
    assert.equal(m.fasting, undefined);
    const rows = weightLoss.toLegacyWorkout(day);
    assert.ok(rows.length > 0);
    for (const a of m.phases.flatMap(p => p.activities)) {
      assert.ok(a.id && a.exerciseId && a.durationMinutes > 0);
      assert.ok(!seen.has(a.id)); seen.add(a.id);
      assert.notEqual(a.type, 'run-lap');
      if (a.type === 'strength') assert.ok(a.sets && a.reps && a.restSeconds && a.targetRir && a.tempo && a.equipment);
      if (a.category === 'Cardio') assert.match(a.notes, /Bike|bike/);
    }
    const model = dashboard.buildMissionModel({program:weightLoss.PROGRAM,mission:m,programWeek:1});
    const html = dashboard.renderToday(model);
    assert.match(html, new RegExp(m.name.replace(/\+/g,'\\+')));
    assert.match(html, /No fasting requirement/);
  }
  assert.equal(weightLoss.toLegacyWorkout('Monday').filter(a=>a.activityType==='strength').length,6);
  assert.equal(weightLoss.toLegacyWorkout('Tuesday').filter(a=>a.activityType==='strength').length,9);
  assert.equal(weightLoss.toLegacyWorkout('Wednesday').filter(a=>a.activityType==='strength').length,9);
  assert.equal(weightLoss.toLegacyWorkout('Friday').filter(a=>a.activityType==='strength').length,10);
});
test('review/deload repeats indefinitely without changing IDs or base definitions', () => {
  for (const day of weightLoss.PROGRAM.requiredWeekdays) {
    const normal = weightLoss.toLegacyWorkout(day,1);
    const deload = weightLoss.toLegacyWorkout(day,6);
    assert.deepEqual(normal.map(a=>a.id),deload.map(a=>a.id));
    normal.forEach((a,i)=> {
      if(a.activityType==='strength') assert.equal(Number(deload[i].sets),Math.max(1,Math.round(Number(a.sets)*2/3)));
      if(a.activityType==='mobility') assert.equal(deload[i].sets,a.sets);
    });
    assert.deepEqual(weightLoss.toLegacyWorkout(day,7),normal);
    assert.deepEqual(weightLoss.toLegacyWorkout(day,12),deload);
  }
  assert.equal(weightLoss.getMission('Monday',5).phases[1].activities[0].targetRir.default,'2-3');
  assert.equal(weightLoss.getMission('Wednesday',4).phases[1].activities[0].targetRir.final,'1-2');
  assert.match(weightLoss.toLegacyWorkout('Tuesday').find(a=>a.exerciseId==='leg-press').notes,/skip/);
});
test('selection round trips preserve old logs, scoped state, dates and mission records', () => {
  const history=[{programId:performance.PROGRAM_ID,exercise:'Lat Pulldown',weight:'100',reps:'10',ts:'2026-09-01T12:00:00Z'}, {exercise:'Cable Curl',weight:'20',reps:'12',ts:'2026-08-01T12:00:00Z'}];
  const old={programId:performance.PROGRAM_ID,history,data:{w1_performance_old:{done:true}},programStarts:{[performance.PROGRAM_ID]:'2026-08-01'},missionRecords:{old:{programId:performance.PROGRAM_ID,status:'completed'}}};
  const selected=schema.markProgramSelected(old,weightLoss.PROGRAM_ID,{setDefault:true});
  const restored=schema.markProgramSelected(selected,performance.PROGRAM_ID);
  for(const key of ['history','data','programStarts','missionRecords']) assert.deepEqual(restored[key],old[key]);
  const r=registry();
  assert.deepEqual(r.PROGRAM_TEMPLATES[performance.PROGRAM_ID].weeks[1].Monday,performance.toLegacyWorkout('Monday',1));
});
test('cardio logger persists compatible fields with identity and leaves strength history intact', () => {
  const html=fs.readFileSync('index.html','utf8');
  const source=html.slice(html.indexOf('function logCardioActivity('),html.indexOf('let currentSetLogger = null;'));
  const history=[{exercise:'Cable Curl',weight:'20',reps:'12'}];
  const state={time:'18',speed:'3',incline:'4',distance:'0.9'};
  const context={Number,state:{week:2},Date,alert:()=>assert.fail('Unexpected alert'),getExerciseForDayIndex:()=>({exercise:'Incline Treadmill or Bike',activityId:'wls-wed-conditioning',exerciseId:'conditioning'}),getExState:()=>state,isCardioExercise:()=>true,getWorkoutHistory:()=>history,getActiveProgramId:()=>weightLoss.PROGRAM_ID,saveWorkoutHistory:()=>{},setExState:()=>{},renderDay:()=>{}};
  vm.createContext(context);vm.runInContext(source,context);context.logCardioActivity('Wednesday',0);
  assert.equal(history.length,2);assert.equal(history[0].weight,'20');
  assert.equal(history[1].time,'18');assert.equal(history[1].incline,'4');assert.equal(history[1].programId,weightLoss.PROGRAM_ID);assert.equal(state.done,true);
});

test('normal and deload sessions fit realistic timing without reducing rest or cardio', () => {
  const audit = require('../docs/audit-weight-loss-timing.cjs');
  const before = JSON.parse(fs.readFileSync('docs/weight-loss-timing-before.json','utf8'));
  for (const day of weightLoss.PROGRAM.requiredWeekdays) {
    for (const week of [1, 5, 6, 7]) {
      const mission = weightLoss.getMission(day, week);
      assert.ok(audit.estimate(mission,'high').minutes <= (day === 'Monday' ? 60 : 90), `${day} week ${week} overruns`);
      const oldActivities = new Map(before[day].phases.flatMap(p => p.activities).map(a => [a.id,a]));
      for (const a of mission.phases.flatMap(p => p.activities)) {
        const old = oldActivities.get(a.id);
        assert.ok(old, `Unexpected identity change: ${a.id}`);
        assert.equal(a.restSeconds,old.restSeconds);
        if (a.category === 'Cardio') assert.equal(a.durationMinutes,old.durationMinutes);
      }
    }
  }
  assert.ok(!weightLoss.toLegacyWorkout('Friday').some(a => a.exerciseId === 'pec-deck'));
});
