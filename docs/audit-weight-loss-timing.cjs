'use strict';
const fs = require('node:fs');
const path = require('node:path');
const program = require('../js/weight-loss-program');
// Conservative timing, no supersets and no overlap between rest and logging.
const assumptions = {
  low: { secondsPerRep: 3, transitionSeconds: 15, sideChangeSeconds: 10 },
  high: { secondsPerRep: 4, transitionSeconds: 30, sideChangeSeconds: 15 },
  reserveMinutes: 5
};
function repRange(value) {
  const numbers = String(value).match(/\d+/g);
  if (!numbers) return null;
  return [Number(numbers[0]), Number(numbers[1] || numbers[0])];
}
function estimate(mission, bound) {
  const model = assumptions[bound];
  const totals = { warmup: 0, lifting: 0, core: 0, mobility: 0, conditioning: 0, finish: 0, rest: 0, transitions: 0, reserve: 300 };
  const activities = mission.phases.flatMap(p => p.activities.map(a => ({...a, phaseId: p.id})));
  activities.forEach((a, index) => {
    const warmup = a.phaseId.endsWith('-warmup');
    const reps = repRange(a.reps);
    const sets = Number(a.sets) || 1;
    const perSide = String(a.reps).includes('/side');
    const key = warmup ? 'warmup' : a.category === 'Cardio' ? 'conditioning' : a.type === 'cooldown' ? 'finish' : a.type === 'mobility' ? 'mobility' : a.category === 'Core' ? 'core' : 'lifting';
    if (a.category === 'Cardio' || !reps) totals[key] += a.durationMinutes * 60;
    else {
      const count = reps[bound === 'high' ? 1 : 0];
      const seconds = String(a.reps).includes('sec') ? count : count * model.secondsPerRep;
      totals[key] += sets * (seconds * (perSide ? 2 : 1));
      if (perSide) totals.transitions += sets * model.sideChangeSeconds;
      totals.rest += Math.max(0, sets - 1) * (a.restSeconds || 0);
      totals.transitions += Math.max(0, sets - 1) * model.transitionSeconds;
    }
    // Thursday's three conditioning entries are one continuous machine block.
    const next = activities[index + 1];
    const continuousCardio = next && a.phaseId === next.phaseId && a.category === 'Cardio' && next.category === 'Cardio';
    if (next && !continuousCardio) totals.transitions += model.transitionSeconds;
  });
  return { minutes: Object.values(totals).reduce((a,b) => a+b, 0)/60, components: Object.fromEntries(Object.entries(totals).map(([key, seconds]) => [key, seconds/60])) };
}
function audit(missions) {
  return Object.fromEntries(program.PROGRAM.requiredWeekdays.map(day => [day, {low:estimate(missions[day],'low'),high:estimate(missions[day],'high'),limit:day==='Monday'?60:90}]));
}
if (require.main === module) {
  const missions=Object.fromEntries(program.PROGRAM.requiredWeekdays.map(day=>[day,program.getMission(day)]));
  if (process.argv.includes('--snapshot')) fs.writeFileSync(path.join(__dirname,'weight-loss-timing-before.json'), JSON.stringify(missions,null,2)+'\n');
  const before=JSON.parse(fs.readFileSync(path.join(__dirname,'weight-loss-timing-before.json'),'utf8'));
  console.log(JSON.stringify({assumptions,before:audit(before),after:audit(missions)},null,2));
}
module.exports={estimate,audit,assumptions};
