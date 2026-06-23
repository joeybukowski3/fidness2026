const ORIGINS=new Set(['https://joeybukowski3.github.io','http://localhost:3000','http://localhost:5173','capacitor://localhost']);
const MEALS=['Breakfast','Lunch','Dinner','Snack'];
const schema={type:'object',additionalProperties:false,properties:{reply:{type:'string'},summary:{type:'string'},proposedItems:{type:'array',maxItems:20,items:{type:'object',additionalProperties:false,properties:{name:{type:'string'},quantity:{type:'string'},meal:{type:'string',enum:MEALS},calories:{type:'integer',minimum:0,maximum:5000},protein:{type:'number',minimum:0,maximum:500},carbs:{type:'number',minimum:0,maximum:1000},fat:{type:'number',minimum:0,maximum:500},notes:{type:'string'},confidence:{type:'string',enum:['high','medium','low']}},required:['name','quantity','meal','calories','protein','carbs','fat','notes','confidence']}}},required:['reply']};
function cors(origin:string|null){return{'Access-Control-Allow-Origin':origin&&ORIGINS.has(origin)?origin:'https://joeybukowski3.github.io','Access-Control-Allow-Headers':'authorization, apikey, content-type, x-coach-user','Access-Control-Allow-Methods':'POST, OPTIONS','Vary':'Origin'}}
function response(body:unknown,status:number,origin:string|null){return new Response(JSON.stringify(body),{status,headers:{...cors(origin),'Content-Type':'application/json','Cache-Control':'no-store'}})}
const clean=(v:unknown,n=5000)=>String(v??'').replace(/\u0000/g,'').slice(0,n);
async function profileExists(syncKey:string){
 const url=Deno.env.get('SUPABASE_URL'),key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');if(!url||!key)throw Error('Supabase service credentials unavailable.');
 const r=await fetch(`${url}/rest/v1/sync_data?sync_key=eq.${encodeURIComponent(syncKey)}&select=sync_key&limit=1`,{headers:{apikey:key,Authorization:`Bearer ${key}`}});if(!r.ok)throw Error(`Profile verification failed (${r.status}).`);const rows=await r.json();return Array.isArray(rows)&&rows.length>0;
}
async function rateLimit(syncKey:string){
 const url=Deno.env.get('SUPABASE_URL'),key=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');if(!url||!key)return;const usageKey=`nutrition_${syncKey}`,date=new Date().toISOString().slice(0,10),headers={apikey:key,Authorization:`Bearer ${key}`,'Content-Type':'application/json'};
 const q=await fetch(`${url}/rest/v1/coach_usage?sync_key=eq.${encodeURIComponent(usageKey)}&usage_date=eq.${date}&select=request_count&limit=1`,{headers});if(!q.ok){console.warn('coach_usage unavailable');return}const rows=await q.json(),count=Number(rows?.[0]?.request_count||0);if(count>=100)throw Object.assign(Error('Daily nutrition-chat request limit reached.'),{name:'RateLimitError'});
 await fetch(`${url}/rest/v1/coach_usage?on_conflict=sync_key,usage_date`,{method:'POST',headers:{...headers,Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({sync_key:usageKey,usage_date:date,request_count:count+1,updated_at:new Date().toISOString()})});
}
function prompt(message:string,conversation:any[],context:any){return`You are the nutrition logging assistant inside a personal fitness tracker.
Your primary job is to help the user log foods from ordinary language and understand their daily calorie and macro totals.
The user's goals are gradual fat loss while maintaining or building muscle. Favor sustainable habits, adequate protein, and honest portion estimates. Do not promote starvation, purging, extreme restriction, or compensatory over-exercise.
When the user describes food they ate or explicitly asks to log food, include proposedItems. Each distinct food should usually be a separate item. Use the selected date supplied in context; do not claim anything has been logged yet because the user must review and confirm it in the app.
Estimate calories, protein, carbohydrates, and fat from standard serving sizes. If quantity, cooking method, brand, sauce, oil, cheese, or portion size is uncertain, make a reasonable estimate, clearly mention the uncertainty in reply or summary, and lower confidence. Do not pretend an estimate is an exact label value. Round calories to practical whole numbers and macros to practical numbers.
Infer Breakfast, Lunch, Dinner, or Snack from the user's words and context. If no meal is clear, use Snack.
If the user is only asking a nutrition question or requesting a progress review, answer without proposedItems.
Use the supplied log and targets to answer questions about the day. Do not diagnose disease or provide medical nutrition therapy. For allergies, eating disorders, pregnancy, diabetes medication, kidney disease, or other clinical concerns, recommend appropriate professional guidance.
The user's name, PIN, and sync key are intentionally absent; never request them.
CONTEXT:${JSON.stringify(context)}
RECENT CONVERSATION:${conversation.map(x=>`${x.role.toUpperCase()}: ${x.text}`).join('\n')||'none'}
USER:${message}
Return only JSON matching the response schema.`}
function textOf(x:any):string{if(!x)return'';if(typeof x.output_text==='string')return x.output_text;if(typeof x.outputText==='string')return x.outputText;if(typeof x.text==='string')return x.text;const c=x.candidates?.[0]?.content?.parts?.map((p:any)=>p.text||'').join('');if(c)return c;for(const k of['outputs','output','content','parts','messages','steps']){const v=x[k];if(Array.isArray(v)){for(const i of v){const t=textOf(i);if(t)return t}}else if(v&&typeof v==='object'){const t=textOf(v);if(t)return t}}return''}
function parseJson(text:string){const s=text.trim().replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/i,'');try{return JSON.parse(s)}catch{const a=s.indexOf('{'),b=s.lastIndexOf('}');if(a>=0&&b>a)return JSON.parse(s.slice(a,b+1));throw Error('Gemini returned unreadable JSON.')}}
function normalized(value:any){
 if(!value||typeof value.reply!=='string')throw Error('Gemini returned an invalid response.');const out:any={reply:clean(value.reply,8000)};if(typeof value.summary==='string')out.summary=clean(value.summary,1200);
 if(Array.isArray(value.proposedItems)&&value.proposedItems.length){out.proposedItems=value.proposedItems.slice(0,20).map((e:any)=>({name:clean(e.name,180)||'Food',quantity:clean(e.quantity,100)||'1 serving',meal:MEALS.includes(e.meal)?e.meal:'Snack',calories:Math.max(0,Math.min(5000,Math.round(Number(e.calories)||0))),protein:Math.max(0,Math.min(500,Math.round((Number(e.protein)||0)*10)/10)),carbs:Math.max(0,Math.min(1000,Math.round((Number(e.carbs)||0)*10)/10)),fat:Math.max(0,Math.min(500,Math.round((Number(e.fat)||0)*10)/10)),notes:clean(e.notes,500),confidence:['high','medium','low'].includes(e.confidence)?e.confidence:'low'}))}
 return out;
}
Deno.serve(async req=>{
 const origin=req.headers.get('origin');if(req.method==='OPTIONS')return new Response(null,{status:204,headers:cors(origin)});if(req.method!=='POST')return response({error:'Method not allowed.'},405,origin);if(origin&&!ORIGINS.has(origin))return response({error:'Origin not allowed.'},403,origin);
 try{
  if(Number(req.headers.get('content-length')||0)>100000)return response({error:'Request too large.'},413,origin);
  const syncKey=clean(req.headers.get('x-coach-user'),120).trim();if(!syncKey||!/^[a-zA-Z0-9._-]+$/.test(syncKey))return response({error:'Sign in to sync before using Nutrition Chat.'},401,origin);if(!await profileExists(syncKey))return response({error:'Synced profile not found.'},401,origin);await rateLimit(syncKey);
  const apiKey=Deno.env.get('GEMINI_API_KEY');if(!apiKey)return response({error:'GEMINI_API_KEY is not configured.'},503,origin);
  const body=await req.json(),message=clean(body?.message,2000).trim();if(!message)return response({error:'Message required.'},400,origin);const conversation=Array.isArray(body?.conversation)?body.conversation.slice(-12).filter((x:any)=>['user','assistant'].includes(x?.role)).map((x:any)=>({role:x.role,text:clean(x.text,2000)})):[];const context=body?.context&&typeof body.context==='object'?body.context:{};if(JSON.stringify(context).length>80000)return response({error:'Nutrition context too large.'},413,origin);
  const r=await fetch('https://generativelanguage.googleapis.com/v1beta/interactions',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':apiKey},body:JSON.stringify({model:Deno.env.get('GEMINI_MODEL')||'gemini-3.1-flash-lite',input:prompt(message,conversation,context),response_format:{type:'text',mime_type:'application/json',schema}})});const data=await r.json().catch(()=>({}));if(!r.ok){console.error(data);return response({error:data?.error?.message||`Gemini request failed (${r.status}).`},r.status===429?429:502,origin)}const text=textOf(data);if(!text)return response({error:'Gemini returned an empty response.'},502,origin);return response(normalized(parseJson(text)),200,origin);
 }catch(e){console.error(e);if(e instanceof Error&&e.name==='RateLimitError')return response({error:e.message},429,origin);return response({error:e instanceof Error?e.message:'Unexpected nutrition-chat error.'},500,origin)}
});
