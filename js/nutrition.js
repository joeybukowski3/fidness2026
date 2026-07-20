(() => {
'use strict';

const ENDPOINT = 'https://mjxytssjgavwfcypoyti.supabase.co/functions/v1/nutrition-coach';
const ANON = 'sb_publishable_O4XRvCgQXMyn1ulMslutdQ_Fdz38KPO';
const MEALS = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
let busy = false;
let baseTab = null;

const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const num = value => Math.max(0, Number(value) || 0);
const round = value => Math.round(num(value) * 10) / 10;
const today = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
};
const dateShift = (iso, days) => {
  const [year, month, date] = iso.split('-').map(Number);
  const shifted = new Date(year, month - 1, date + days);
  const offset = shifted.getTimezoneOffset();
  return new Date(shifted.getTime() - offset * 60000).toISOString().slice(0, 10);
};
const fmtDate = iso => new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {
  weekday: 'short', month: 'short', day: 'numeric'
});
const id = () => `food_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

function initState() {
  if (typeof state === 'undefined') return false;
  state.nutrition ??= {};
  state.nutrition.settings ??= { calories: 2200, protein: 180, carbs: 220, fat: 70 };
  state.nutrition.days ??= {};
  state.nutrition.messages ??= [];
  state.nutrition.proposal ??= null;
  state.nutrition.selectedDate ??= today();
  state.nutrition.editingId ??= null;
  state.nutrition.settingsOpen ??= false;
  return true;
}

function dayLog(iso = state.nutrition.selectedDate) {
  state.nutrition.days[iso] ??= [];
  return state.nutrition.days[iso];
}

function totals(entries = dayLog()) {
  return entries.reduce((total, entry) => ({
    calories: total.calories + num(entry.calories),
    protein: total.protein + num(entry.protein),
    carbs: total.carbs + num(entry.carbs),
    fat: total.fat + num(entry.fat)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
}

function install() {
  if (!initState()) {
    setTimeout(install, 100);
    return;
  }
  if (document.getElementById('nutritionTabBtn')) return;

  const style = document.createElement('style');
  style.textContent = `
  .nutrition-only{display:none}.tab-nutrition .home-only,.tab-nutrition .program-only,.tab-nutrition .history-only,.tab-nutrition .coach-only{display:none!important}.tab-nutrition .nutrition-only{display:block!important}
  .nutrition{max-width:920px;margin:auto;padding-bottom:7rem}.nutrition-card,.nutrition-msg,.nutrition-compose,.nutrition-proposal{background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:.8rem;margin-bottom:.7rem}.nutrition-head,.nutrition-date,.nutrition-row,.nutrition-actions,.nutrition-entry,.nutrition-meal-head{display:flex;align-items:center;gap:.5rem}.nutrition-head,.nutrition-entry,.nutrition-meal-head{justify-content:space-between}.nutrition-head h2{font-family:var(--font-display);letter-spacing:.05em}.nutrition-note,.nutrition-meta{font-size:.68rem;color:var(--text3);line-height:1.45}.nutrition-date{justify-content:center}.nutrition-date button{width:34px;height:34px}.nutrition-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:.45rem}.nutrition-stat{background:var(--bg3);border:1px solid var(--border);border-radius:11px;padding:.65rem;text-align:center}.nutrition-stat b{display:block;font-size:1.05rem}.nutrition-stat span{font-size:.62rem;color:var(--text3)}.nutrition-progress{height:9px;background:var(--bg3);border-radius:99px;overflow:hidden;margin:.65rem 0 .35rem}.nutrition-progress>div{height:100%;background:var(--accent);border-radius:99px;transition:width .2s}.nutrition-progress.over>div{background:var(--red)}
  .nutrition-meal{margin-top:.7rem}.nutrition-meal-head{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--text2);padding:.3rem 0}.nutrition-entry{border-top:1px solid var(--border);padding:.55rem 0;align-items:flex-start}.nutrition-entry-name{font-size:.78rem;font-weight:800}.nutrition-entry small{display:block;color:var(--text3);font-size:.64rem;margin-top:.12rem}.nutrition-entry-macros{text-align:right;font-size:.72rem;white-space:nowrap}.nutrition-entry-buttons{display:flex;gap:.2rem;justify-content:flex-end;margin-top:.2rem}.nutrition-btn,.nutrition-chip{border:1px solid var(--border);background:var(--bg3);color:var(--text);border-radius:9px;padding:.4rem .58rem;font:700 .66rem var(--font-body);cursor:pointer}.nutrition-btn.primary{background:var(--accent);color:#10140d}.nutrition-btn.danger{color:var(--red)}.nutrition-actions{flex-wrap:wrap}.nutrition-form{display:grid;grid-template-columns:2fr repeat(4,1fr);gap:.4rem}.nutrition-form select,.nutrition-form input,.nutrition-input{background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:9px;padding:.55rem;font:inherit;min-width:0}.nutrition-form .wide{grid-column:span 2}.nutrition-form-actions{grid-column:1/-1;display:flex;justify-content:flex-end;gap:.4rem}
  .nutrition-msg{max-width:90%;font-size:.78rem;line-height:1.5}.nutrition-msg.user{margin-left:auto;background:var(--accent);color:#10140d}.nutrition-msg.error{color:var(--red)}.nutrition-empty{text-align:center;color:var(--text3);padding:1.25rem;font-size:.76rem}.nutrition-chips{display:flex;gap:.4rem;overflow-x:auto;padding-bottom:.45rem}.nutrition-chip{white-space:nowrap}.nutrition-compose{position:sticky;bottom:.5rem}.nutrition-chat-row{display:flex;gap:.45rem}.nutrition-input{flex:1;min-height:44px;max-height:120px;resize:none}.nutrition-send{width:44px;border:0;border-radius:10px;background:var(--accent);font-size:1rem}.nutrition-input:disabled,.nutrition-send:disabled{opacity:.5}.nutrition-privacy{background:rgba(245,204,90,.1)}
  .nutrition-proposal{border-color:var(--accent)}.nutrition-proposal-help{margin:.45rem 0 .25rem;font-size:.66rem;color:var(--text3)}.nutrition-proposal-scroll{overflow-x:auto;padding-bottom:.2rem}.nutrition-proposal-table{min-width:850px;border-top:1px solid var(--border)}.nutrition-proposal-header,.nutrition-proposed-item,.nutrition-proposal-total{display:grid;grid-template-columns:2fr 1fr 1fr .8fr .8fr .8fr .8fr .9fr;gap:.4rem;align-items:center}.nutrition-proposal-header{padding:.55rem 0;font-size:.6rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:var(--text3)}.nutrition-proposed-item{padding:.65rem 0;border-top:1px solid var(--border)}.nutrition-proposed-item input,.nutrition-proposed-item select{width:100%;min-width:0;background:var(--bg3);color:var(--text);border:1px solid var(--border);border-radius:7px;padding:.45rem;font-size:.7rem}.nutrition-cell{min-width:0}.nutrition-cell-label{display:none;font-size:.58rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;color:var(--text3);margin-bottom:.2rem}.nutrition-food-note{display:block;color:var(--text3);font-size:.58rem;margin-top:.25rem;line-height:1.3}.nutrition-confidence{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:.28rem .5rem;font-size:.6rem;font-weight:800;text-transform:capitalize;border:1px solid var(--border);white-space:nowrap}.nutrition-confidence.high{background:rgba(34,197,94,.12);color:#4ade80;border-color:rgba(34,197,94,.35)}.nutrition-confidence.medium{background:rgba(245,158,11,.12);color:#fbbf24;border-color:rgba(245,158,11,.35)}.nutrition-confidence.low{background:rgba(239,68,68,.12);color:#f87171;border-color:rgba(239,68,68,.35)}.nutrition-proposal-total{border-top:2px solid var(--accent);padding:.7rem 0;font-size:.7rem}.nutrition-proposal-total-label{grid-column:1/4;font-weight:800;text-transform:uppercase;letter-spacing:.06em}.nutrition-proposal-total-value{font-weight:800}.nutrition-proposal-actions{margin-top:.7rem}
  @media(max-width:680px){.nutrition-grid{grid-template-columns:repeat(2,1fr)}.nutrition-form{grid-template-columns:1fr 1fr}.nutrition-form .wide{grid-column:1/-1}.nutrition-msg{max-width:96%}.nutrition-proposal-scroll{overflow:visible}.nutrition-proposal-table{min-width:0;border-top:0}.nutrition-proposal-header{display:none}.nutrition-proposed-item{display:grid;grid-template-columns:1fr 1fr;gap:.55rem;background:var(--bg3);border:1px solid var(--border);border-radius:12px;padding:.7rem;margin-top:.6rem}.nutrition-cell-label{display:block}.nutrition-proposed-item .proposal-name{grid-column:1/-1}.nutrition-proposal-total{grid-template-columns:repeat(4,1fr);gap:.35rem;background:var(--bg3);border-radius:10px;padding:.65rem;margin-top:.65rem}.nutrition-proposal-total-label{grid-column:1/-1}.nutrition-proposal-total-value{font-size:.66rem}.nutrition-proposal-actions{justify-content:stretch}.nutrition-proposal-actions .nutrition-btn{flex:1}}
  `;
  document.head.appendChild(style);

  const tab = document.createElement('button');
  tab.id = 'nutritionTabBtn';
  tab.className = 'top-tab';
  tab.innerHTML = '&#127860; Nutrition';
  tab.onclick = () => setActiveTab('nutrition');
  document.querySelector('.top-tabs-inner')?.appendChild(tab);

  const area = document.createElement('div');
  area.id = 'nutritionArea';
  area.className = 'content nutrition-only';
  document.getElementById('appShell')?.appendChild(area);

  baseTab = window.setActiveTab;
  window.setActiveTab = tabName => {
    if (tabName !== 'nutrition') {
      document.body.classList.remove('tab-nutrition');
      tab.classList.remove('active');
      return baseTab(tabName);
    }
    document.querySelectorAll('.top-tab').forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    document.body.classList.remove('tab-program', 'tab-history', 'tab-coach');
    document.body.classList.add('tab-nutrition');
    render();
  };
}

function entryHtml(entry) {
  return `<div class="nutrition-entry" data-entry="${esc(entry.id)}"><div><div class="nutrition-entry-name">${esc(entry.name)}</div><small>${esc(entry.quantity || '1 serving')} · ${esc(entry.meal || 'Snack')}${entry.notes ? ' · ' + esc(entry.notes) : ''}</small></div><div class="nutrition-entry-macros"><b>${Math.round(num(entry.calories))} cal</b><small>${round(entry.protein)}P · ${round(entry.carbs)}C · ${round(entry.fat)}F</small><div class="nutrition-entry-buttons"><button class="nutrition-btn edit-food">Edit</button><button class="nutrition-btn danger delete-food">Delete</button></div></div></div>`;
}

function formHtml(entry = null) {
  const item = entry || { name: '', quantity: '1 serving', meal: 'Snack', calories: '', protein: '', carbs: '', fat: '', notes: '' };
  return `<div class="nutrition-card"><div class="nutrition-head"><div><b>${entry ? 'Edit food' : 'Manual food entry'}</b><div class="nutrition-note">Use the nutrition chatbot for estimates or enter known label values here.</div></div></div><div class="nutrition-form"><input id="foodName" class="wide" placeholder="Food" value="${esc(item.name)}"><input id="foodQuantity" class="wide" placeholder="Quantity" value="${esc(item.quantity)}"><select id="foodMeal">${MEALS.map(meal => `<option ${meal === item.meal ? 'selected' : ''}>${meal}</option>`).join('')}</select><input id="foodCalories" inputmode="decimal" placeholder="Calories" value="${esc(item.calories)}"><input id="foodProtein" inputmode="decimal" placeholder="Protein g" value="${esc(item.protein)}"><input id="foodCarbs" inputmode="decimal" placeholder="Carbs g" value="${esc(item.carbs)}"><input id="foodFat" inputmode="decimal" placeholder="Fat g" value="${esc(item.fat)}"><input id="foodNotes" class="wide" placeholder="Notes" value="${esc(item.notes || '')}"><div class="nutrition-form-actions"><button class="nutrition-btn" id="cancelFood">Cancel</button><button class="nutrition-btn primary" id="saveFood">${entry ? 'Save changes' : 'Add food'}</button></div></div></div>`;
}

function confidenceBadge(confidence) {
  const level = ['high', 'medium', 'low'].includes(confidence) ? confidence : 'low';
  return `<span class="nutrition-confidence ${level}">${level}</span>`;
}

function proposalHtml(proposal) {
  const estimatedTotals = totals(proposal.items);
  return `<div class="nutrition-proposal"><div class="nutrition-head"><div><b>Review estimated food entries</b><div class="nutrition-note">${esc(proposal.summary || 'Gemini estimated these foods. Review portions and values before saving.')}</div></div><span class="nutrition-meta">Nothing is logged until you confirm</span></div><div class="nutrition-proposal-help">Each row shows the food, serving size, meal category, calories, macronutrients, and estimate confidence. All values can be edited.</div><div class="nutrition-proposal-scroll"><div class="nutrition-proposal-table"><div class="nutrition-proposal-header"><div>Food</div><div>Quantity</div><div>Meal</div><div>Calories</div><div>Protein (g)</div><div>Carbs (g)</div><div>Fat (g)</div><div>Confidence</div></div><div id="nutritionProposalItems">${proposal.items.map((item, index) => {
    const confidence = ['high', 'medium', 'low'].includes(item.confidence) ? item.confidence : 'low';
    return `<div class="nutrition-proposed-item" data-i="${index}" data-note="${esc(item.notes || '')}" data-confidence="${confidence}"><div class="nutrition-cell proposal-name"><label class="nutrition-cell-label">Food</label><input data-k="name" aria-label="Food name" value="${esc(item.name)}">${item.notes ? `<small class="nutrition-food-note">${esc(item.notes)}</small>` : ''}</div><div class="nutrition-cell"><label class="nutrition-cell-label">Quantity</label><input data-k="quantity" aria-label="Quantity" value="${esc(item.quantity)}"></div><div class="nutrition-cell"><label class="nutrition-cell-label">Meal</label><select data-k="meal" aria-label="Meal category">${MEALS.map(meal => `<option ${meal === item.meal ? 'selected' : ''}>${meal}</option>`).join('')}</select></div><div class="nutrition-cell"><label class="nutrition-cell-label">Calories</label><input data-k="calories" aria-label="Calories" inputmode="decimal" value="${esc(item.calories)}"></div><div class="nutrition-cell"><label class="nutrition-cell-label">Protein (g)</label><input data-k="protein" aria-label="Protein grams" inputmode="decimal" value="${esc(item.protein)}"></div><div class="nutrition-cell"><label class="nutrition-cell-label">Carbs (g)</label><input data-k="carbs" aria-label="Carbohydrate grams" inputmode="decimal" value="${esc(item.carbs)}"></div><div class="nutrition-cell"><label class="nutrition-cell-label">Fat (g)</label><input data-k="fat" aria-label="Fat grams" inputmode="decimal" value="${esc(item.fat)}"></div><div class="nutrition-cell"><label class="nutrition-cell-label">Confidence</label>${confidenceBadge(confidence)}</div></div>`;
  }).join('')}</div><div class="nutrition-proposal-total" id="nutritionProposalTotals"><div class="nutrition-proposal-total-label">Estimated totals</div><div class="nutrition-proposal-total-value" data-total="calories">${Math.round(estimatedTotals.calories)} cal</div><div class="nutrition-proposal-total-value" data-total="protein">${round(estimatedTotals.protein)}g P</div><div class="nutrition-proposal-total-value" data-total="carbs">${round(estimatedTotals.carbs)}g C</div><div class="nutrition-proposal-total-value" data-total="fat">${round(estimatedTotals.fat)}g F</div><div></div></div></div></div><div class="nutrition-actions nutrition-proposal-actions"><button class="nutrition-btn" id="dismissNutritionProposal">Dismiss</button><button class="nutrition-btn primary" id="addNutritionProposal">Add all to ${fmtDate(state.nutrition.selectedDate)}</button></div></div>`;
}

function messageHtml(message) {
  return `<div class="nutrition-msg ${esc(message.role)}">${esc(message.text).replace(/\n/g, '<br>')}<div class="nutrition-meta">${new Date(message.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div></div>`;
}

function settingsHtml() {
  const settings = state.nutrition.settings;
  return `<div class="nutrition-card"><div class="nutrition-head"><div><b>Daily targets</b><div class="nutrition-note">These are editable starting targets, not medical recommendations.</div></div><button class="nutrition-btn" id="closeNutritionSettings">Close</button></div><div class="nutrition-form"><input id="targetCalories" inputmode="decimal" value="${esc(settings.calories)}" placeholder="Calories"><input id="targetProtein" inputmode="decimal" value="${esc(settings.protein)}" placeholder="Protein"><input id="targetCarbs" inputmode="decimal" value="${esc(settings.carbs)}" placeholder="Carbs"><input id="targetFat" inputmode="decimal" value="${esc(settings.fat)}" placeholder="Fat"><div class="nutrition-form-actions"><button class="nutrition-btn primary" id="saveNutritionSettings">Save targets</button></div></div></div>`;
}

function render() {
  initState();
  const area = document.getElementById('nutritionArea');
  if (!area) return;

  const iso = state.nutrition.selectedDate;
  const entries = dayLog(iso);
  const currentTotals = totals(entries);
  const settings = state.nutrition.settings;
  const remaining = Math.round(num(settings.calories) - currentTotals.calories);
  const percent = num(settings.calories) ? Math.min(100, Math.round(currentTotals.calories / num(settings.calories) * 100)) : 0;
  const editing = entries.find(entry => entry.id === state.nutrition.editingId);
  const average = sevenDayAverage(iso);
  const consented = state.nutrition.privacyAccepted === true;

  area.innerHTML = `<div class="nutrition"><div class="nutrition-card"><div class="nutrition-head"><div><h2>NUTRITION TRACKER</h2><div class="nutrition-note">Log food manually or describe what you ate to the nutrition chatbot.</div></div><button class="nutrition-btn" id="openNutritionSettings">Targets</button></div><div class="nutrition-date"><button class="nutrition-btn" id="nutritionPrev">&#8592;</button><button class="nutrition-btn" id="nutritionToday">${fmtDate(iso)}</button><button class="nutrition-btn" id="nutritionNext">&#8594;</button></div><div class="nutrition-grid"><div class="nutrition-stat"><b>${Math.round(currentTotals.calories)}</b><span>Calories</span></div><div class="nutrition-stat"><b>${round(currentTotals.protein)}g</b><span>Protein / ${round(settings.protein)}g</span></div><div class="nutrition-stat"><b>${round(currentTotals.carbs)}g</b><span>Carbs / ${round(settings.carbs)}g</span></div><div class="nutrition-stat"><b>${round(currentTotals.fat)}g</b><span>Fat / ${round(settings.fat)}g</span></div></div><div class="nutrition-progress ${remaining < 0 ? 'over' : ''}"><div style="width:${percent}%"></div></div><div class="nutrition-head"><span class="nutrition-meta">${remaining >= 0 ? `${remaining} calories remaining` : `${Math.abs(remaining)} calories over target`}</span><span class="nutrition-meta">7-day avg: ${average} cal</span></div></div>${state.nutrition.settingsOpen ? settingsHtml() : ''}${state.nutrition.editingId !== null ? formHtml(editing || null) : '<div class="nutrition-actions"><button class="nutrition-btn primary" id="manualFood">+ Manual food</button></div>'}<div class="nutrition-card"><div class="nutrition-head"><div><b>Food log</b><div class="nutrition-note">${entries.length} item${entries.length === 1 ? '' : 's'} logged for ${fmtDate(iso)}</div></div>${entries.length ? '<button class="nutrition-btn danger" id="clearNutritionDay">Clear day</button>' : ''}</div>${entries.length ? MEALS.map(meal => {
    const list = entries.filter(entry => (entry.meal || 'Snack') === meal);
    return list.length ? `<div class="nutrition-meal"><div class="nutrition-meal-head"><b>${meal}</b><span>${Math.round(totals(list).calories)} cal</span></div>${list.map(entryHtml).join('')}</div>` : '';
  }).join('') : '<div class="nutrition-empty">No foods logged yet.</div>'}</div><div class="nutrition-card nutrition-privacy"><div class="nutrition-note">Gemini's free tier may use prompts and responses to improve Google products. Your name, PIN and sync key are not included in the model prompt.</div><label class="nutrition-note"><input id="nutritionConsent" type="checkbox" ${consented ? 'checked' : ''}> I understand and want to use Gemini for food estimates and nutrition chat.</label></div><div class="nutrition-chips"><button class="nutrition-chip" data-q="Log 2 scrambled eggs, 2 slices of toast, and a banana for breakfast.">Log breakfast</button><button class="nutrition-chip" data-q="I ate a chicken quesadilla with cheese and salsa. Estimate and log it.">Log a meal</button><button class="nutrition-chip" data-q="How am I doing against today's calorie and protein targets?">Check my day</button></div><div id="nutritionMessages">${state.nutrition.messages.length ? state.nutrition.messages.slice(-30).map(messageHtml).join('') : '<div class="nutrition-empty">Describe what you ate, ask for an estimate, or discuss how today fits your goals.</div>'}${busy ? '<div class="nutrition-msg assistant">Estimating…</div>' : ''}</div>${state.nutrition.proposal ? proposalHtml(state.nutrition.proposal) : ''}<div class="nutrition-compose"><div class="nutrition-chat-row"><textarea id="nutritionInput" class="nutrition-input" maxlength="2000" placeholder="Example: I had a turkey sandwich, chips, and a protein shake" ${!consented || busy ? 'disabled' : ''}></textarea><button id="nutritionSend" class="nutrition-send" ${!consented || busy ? 'disabled' : ''}>&#10148;</button></div><div class="nutrition-meta">AI estimates can be wrong. Review portions and label values before saving. <button class="nutrition-btn" id="clearNutritionChat">Clear chat</button></div></div></div>`;

  bind();
}

function bind() {
  document.getElementById('nutritionPrev')?.addEventListener('click', () => changeDate(-1));
  document.getElementById('nutritionNext')?.addEventListener('click', () => changeDate(1));
  document.getElementById('nutritionToday')?.addEventListener('click', () => {
    state.nutrition.selectedDate = today();
    state.nutrition.editingId = null;
    save();
    render();
  });
  document.getElementById('manualFood')?.addEventListener('click', () => {
    state.nutrition.editingId = 'new';
    render();
  });
  document.getElementById('cancelFood')?.addEventListener('click', () => {
    state.nutrition.editingId = null;
    render();
  });
  document.getElementById('saveFood')?.addEventListener('click', saveFoodForm);
  document.querySelectorAll('.edit-food').forEach(button => button.addEventListener('click', () => {
    state.nutrition.editingId = button.closest('[data-entry]').dataset.entry;
    render();
  }));
  document.querySelectorAll('.delete-food').forEach(button => button.addEventListener('click', () => deleteEntry(button.closest('[data-entry]').dataset.entry)));
  document.getElementById('clearNutritionDay')?.addEventListener('click', () => {
    if (confirm(`Clear all food entries for ${fmtDate(state.nutrition.selectedDate)}?`)) {
      state.nutrition.days[state.nutrition.selectedDate] = [];
      save();
      render();
    }
  });
  document.getElementById('openNutritionSettings')?.addEventListener('click', () => {
    state.nutrition.settingsOpen = true;
    render();
  });
  document.getElementById('closeNutritionSettings')?.addEventListener('click', () => {
    state.nutrition.settingsOpen = false;
    render();
  });
  document.getElementById('saveNutritionSettings')?.addEventListener('click', saveSettings);
  document.getElementById('nutritionConsent')?.addEventListener('change', event => {
    state.nutrition.privacyAccepted = event.target.checked;
    save();
    render();
  });
  document.querySelectorAll('.nutrition-chip').forEach(button => button.addEventListener('click', () => {
    const input = document.getElementById('nutritionInput');
    input.value = button.dataset.q;
    input.focus();
  }));
  document.getElementById('nutritionSend')?.addEventListener('click', send);
  document.getElementById('nutritionInput')?.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  });
  document.getElementById('clearNutritionChat')?.addEventListener('click', () => {
    if (!state.nutrition.messages.length || confirm('Clear nutrition chat?')) {
      state.nutrition.messages = [];
      state.nutrition.proposal = null;
      save();
      render();
    }
  });
  document.getElementById('dismissNutritionProposal')?.addEventListener('click', () => {
    state.nutrition.proposal = null;
    save();
    render();
  });
  document.getElementById('addNutritionProposal')?.addEventListener('click', applyProposal);
  document.querySelectorAll('.nutrition-proposed-item input, .nutrition-proposed-item select').forEach(field => {
    field.addEventListener('input', updateProposalTotals);
    field.addEventListener('change', updateProposalTotals);
  });
}

function updateProposalTotals() {
  const rows = [...document.querySelectorAll('.nutrition-proposed-item')];
  const values = rows.map(row => {
    const get = key => row.querySelector(`[data-k="${key}"]`)?.value;
    return {
      calories: num(get('calories')),
      protein: num(get('protein')),
      carbs: num(get('carbs')),
      fat: num(get('fat'))
    };
  });
  const proposalTotals = totals(values);
  const container = document.getElementById('nutritionProposalTotals');
  if (!container) return;
  container.querySelector('[data-total="calories"]').textContent = `${Math.round(proposalTotals.calories)} cal`;
  container.querySelector('[data-total="protein"]').textContent = `${round(proposalTotals.protein)}g P`;
  container.querySelector('[data-total="carbs"]').textContent = `${round(proposalTotals.carbs)}g C`;
  container.querySelector('[data-total="fat"]').textContent = `${round(proposalTotals.fat)}g F`;
}

function changeDate(delta) {
  state.nutrition.selectedDate = dateShift(state.nutrition.selectedDate, delta);
  state.nutrition.editingId = null;
  state.nutrition.proposal = null;
  save();
  render();
}

function saveFoodForm() {
  const name = document.getElementById('foodName')?.value.trim();
  if (!name) return alert('Enter a food name.');
  const entry = {
    id: state.nutrition.editingId === 'new' ? id() : state.nutrition.editingId,
    name,
    quantity: document.getElementById('foodQuantity')?.value.trim() || '1 serving',
    meal: document.getElementById('foodMeal')?.value || 'Snack',
    calories: Math.round(num(document.getElementById('foodCalories')?.value)),
    protein: round(document.getElementById('foodProtein')?.value),
    carbs: round(document.getElementById('foodCarbs')?.value),
    fat: round(document.getElementById('foodFat')?.value),
    notes: document.getElementById('foodNotes')?.value.trim() || '',
    source: 'manual',
    createdAt: new Date().toISOString()
  };
  const list = dayLog();
  const index = list.findIndex(item => item.id === entry.id);
  if (index >= 0) list[index] = { ...list[index], ...entry };
  else list.push(entry);
  state.nutrition.editingId = null;
  save();
  render();
}

function deleteEntry(entryId) {
  const list = dayLog();
  const entry = list.find(item => item.id === entryId);
  if (entry && confirm(`Delete ${entry.name}?`)) {
    state.nutrition.days[state.nutrition.selectedDate] = list.filter(item => item.id !== entryId);
    save();
    render();
  }
}

function saveSettings() {
  state.nutrition.settings = {
    calories: Math.max(0, Math.round(num(document.getElementById('targetCalories')?.value))),
    protein: round(document.getElementById('targetProtein')?.value),
    carbs: round(document.getElementById('targetCarbs')?.value),
    fat: round(document.getElementById('targetFat')?.value)
  };
  state.nutrition.settingsOpen = false;
  save();
  render();
}

function addMessage(role, text) {
  state.nutrition.messages.push({ role, text: String(text), ts: new Date().toISOString() });
  state.nutrition.messages = state.nutrition.messages.slice(-30);
  save();
}

function sevenDayAverage(iso) {
  let total = 0;
  for (let index = 0; index < 7; index++) {
    total += totals(state.nutrition.days[dateShift(iso, -index)] || []).calories;
  }
  return Math.round(total / 7);
}

function context() {
  const iso = state.nutrition.selectedDate;
  return {
    selectedDate: iso,
    targets: state.nutrition.settings,
    todayEntries: dayLog(iso).map(({ name, quantity, meal, calories, protein, carbs, fat, notes }) => ({
      name, quantity, meal, calories, protein, carbs, fat, notes
    })),
    todayTotals: totals(dayLog(iso)),
    recentDays: Array.from({ length: 7 }, (_, index) => {
      const date = dateShift(iso, -index);
      const values = totals(state.nutrition.days[date] || []);
      return { date, ...values };
    }),
    goals: ['Gradual fat loss', 'Maintain or build muscle', 'Prioritize protein without extreme restriction']
  };
}

async function send() {
  if (busy) return;
  const input = document.getElementById('nutritionInput');
  const text = input?.value.trim();
  if (!text) return;
  if (!state.nutrition.privacyAccepted) return alert('Accept the Gemini testing notice first.');
  if (!currentSyncKey) return alert('Sign in to sync before using Nutrition Chat.');

  addMessage('user', text);
  state.nutrition.proposal = null;
  busy = true;
  render();

  try {
    const conversation = state.nutrition.messages.slice(-12, -1)
      .filter(item => ['user', 'assistant'].includes(item.role))
      .map(({ role, text: messageText }) => ({ role, text: messageText }));
    const request = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ANON}`,
        apikey: ANON,
        'x-coach-user': currentSyncKey
      },
      body: JSON.stringify({ message: text, conversation, context: context() })
    });
    const payload = await request.json().catch(() => ({}));
    if (!request.ok) throw Error(payload.error || `Request failed (${request.status})`);
    addMessage('assistant', payload.reply || 'I reviewed that meal.');
    if (validProposal(payload.proposedItems)) {
      state.nutrition.proposal = { summary: payload.summary || '', items: payload.proposedItems };
      save();
    }
  } catch (error) {
    console.error(error);
    let message = String(error.message || error);
    if (/GEMINI_API_KEY|not configured/i.test(message)) message = 'The nutrition chatbot is installed, but its Gemini API key is not configured.';
    else if (/429|quota|rate/i.test(message)) message = 'The Gemini testing limit was reached. Try again after it resets.';
    else if (/fetch|network/i.test(message)) message = 'The nutrition chatbot backend could not be reached.';
    addMessage('error', message);
  } finally {
    busy = false;
    render();
  }
}

function validProposal(items) {
  return Array.isArray(items) && items.length > 0 && items.length <= 20 && items.every(item => item?.name);
}

function applyProposal() {
  const rows = [...document.querySelectorAll('.nutrition-proposed-item')];
  const items = rows.map(row => {
    const get = key => row.querySelector(`[data-k="${key}"]`)?.value;
    const confidence = row.dataset.confidence || 'low';
    const estimateNote = row.dataset.note || '';
    return {
      id: id(),
      name: get('name')?.trim() || 'Food',
      quantity: get('quantity')?.trim() || '1 serving',
      meal: MEALS.includes(get('meal')) ? get('meal') : 'Snack',
      calories: Math.round(num(get('calories'))),
      protein: round(get('protein')),
      carbs: round(get('carbs')),
      fat: round(get('fat')),
      notes: `AI estimate (${confidence} confidence)${estimateNote ? ` — ${estimateNote}` : ''}`,
      source: 'gemini',
      createdAt: new Date().toISOString()
    };
  });
  if (!items.length) return;
  if (!confirm(`Add ${items.length} estimated food item${items.length === 1 ? '' : 's'} to ${fmtDate(state.nutrition.selectedDate)}?`)) return;
  dayLog().push(...items);
  state.nutrition.proposal = null;
  save();
  render();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
else install();
})();
