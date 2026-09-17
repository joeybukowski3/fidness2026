const {chromium}=require(process.env.FIDNESS_PLAYWRIGHT_PATH || 'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 // External sync is not involved in this localStorage/static-program check.
 await context.route('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',r=>r.fulfill({contentType:'application/javascript',body:'window.supabase={createClient:()=>({})};'}));
 await context.route('https://fonts.googleapis.com/**',r=>r.fulfill({contentType:'text/css',body:''}));
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto('http://127.0.0.1:8765');await page.waitForSelector('#programSelect',{state:'attached'});
 assert.equal(await page.evaluate(()=>getActiveProgramId()),'weight-loss-strength-v1');
 for(const day of ['Monday','Tuesday','Wednesday','Thursday','Friday']) {
   await page.evaluate(day=>{switchDay(day);setActiveTab('workout');setWorkoutTab('main');},day);
   assert.ok(await page.locator('#content .ex-card').count()>0);
   const targets=page.locator('#mainWorkoutSection .ex-target-inline');
   assert.ok(await targets.first().isVisible());
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,day+' horizontal overflow');
 }
 await page.evaluate(()=>{switchDay('Wednesday');setWorkoutTab('main');const exs=getWorkoutsForDay('Wednesday');const i=exs.findIndex(e=>e.exerciseId==='conditioning');setCardioField('Wednesday',i,'time','18');setCardioField('Wednesday',i,'speed','3');setCardioField('Wednesday',i,'incline','4');logCardioActivity('Wednesday',i);});
 assert.equal(await page.evaluate(()=>state.history.at(-1).time),'18');
 const before=await page.evaluate(()=>JSON.stringify(state.history));
 await page.evaluate(()=>{changeProgram('performance-5day-v1');changeProgram('joey-12wk-knee-safe');changeProgram('weight-loss-strength-v1');});
 assert.equal(await page.evaluate(()=>JSON.stringify(state.history)),before);
 await page.evaluate(()=>setDefaultProgram('weight-loss-strength-v1'));
 await page.reload();await page.waitForSelector('#programSelect',{state:'attached'});
 assert.equal(await page.evaluate(()=>getActiveProgramId()),'weight-loss-strength-v1');
 await page.evaluate(()=>{state.history.push({exercise:'Cable Curl',weight:'20',reps:'12',ts:'2026-08-01T12:00:00Z',programId:'joey-12wk-knee-safe'});renderHistory();setActiveTab('history');});
 assert.match(await page.locator('#historyArea').innerText(),/Cable Curl/);
 assert.match(await page.locator('#historyArea').innerText(),/18 min/);
 await page.evaluate(()=>{setActiveTab('program');previewScheduleMission('Monday');});
 assert.match(await page.locator('#programArea').innerText(),/5:00 AM/);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'schedule overflow');
 await page.screenshot({path:'docs/weight-loss-mobile-check.png',fullPage:true});
 await page.setViewportSize({width:1280,height:900});
 await page.evaluate(()=>{switchDay('Friday');setActiveTab('workout');setWorkoutTab('main');});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'desktop overflow');
 assert.deepEqual(errors,[]);
 console.log('PASS: app loads, five weekdays render, cardio persists, selector/default/reload work, old history readable, mobile/desktop no overflow, no page errors. External sync mocked; web fonts omitted.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
