// Health Reminder — medicines, meals and alerts. Everything is stored on the
// device in localStorage; nothing is sent anywhere.

const STORE_KEY = 'health-reminder:v1';
const GRACE_MIN = 20; // fire an alert up to this many minutes late (e.g. phone was asleep)
const SNOOZE_MIN = 10;
const MISSED_AFTER_MIN = 60;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ICS_DAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
const DEFAULT_TIMES = {
  1: ['09:00'],
  2: ['09:00', '21:00'],
  3: ['08:00', '14:00', '20:00'],
  4: ['08:00', '12:00', '16:00', '20:00'],
  5: ['07:00', '10:00', '13:00', '16:00', '19:00'],
  6: ['06:00', '10:00', '14:00', '18:00', '22:00', '02:00'],
};

// High protein, high fibre, low carb, low fat — Indian-kitchen friendly.
const MEAL_IDEAS = {
  breakfast: [
    'Moong dal chilla (2) stuffed with low-fat paneer + mint chutney',
    'Egg-white bhurji (4 whites) with spinach, onion & tomato + 1 multigrain toast',
    'Sprouts chaat with cucumber, onion, tomato & lemon + 1 cup low-fat curd',
    'Besan chilla loaded with grated vegetables + bowl of hung curd',
    'Vegetable oats upma with peas & carrots + 2 boiled egg whites',
  ],
  midmorning: [
    '1 guava or apple + 5 almonds',
    'Roasted chana (30 g) + green tea',
    'Glass of chaas (buttermilk) + cucumber & carrot sticks',
    'Papaya bowl with a spoon of chia seeds',
  ],
  lunch: [
    'Grilled chicken or paneer tikka (100 g) + big salad + 1 small multigrain roti + dal',
    'Rajma or chole (1 bowl, little oil) + cucumber-onion salad + 2 tbsp brown rice',
    'Palak tofu + mixed veg sabzi + 1 jowar roti',
    'Light fish curry + sautéed beans + kachumber salad',
    'Dal tadka (1 tsp oil) + bhindi sabzi + salad + 1 bajra roti',
  ],
  evening: [
    'Roasted makhana (1 cup) + green tea',
    'Moong sprouts salad with lemon & chaat masala',
    'Hung curd with chia seeds & cinnamon',
    '2 boiled egg whites with pepper',
  ],
  dinner: [
    'Moong dal soup + stir-fried vegetables with tofu',
    'Grilled fish or chicken + sautéed broccoli & beans',
    'Low-fat paneer bhurji + lauki sabzi + salad (skip the roti)',
    'Masoor dal + methi sabzi + cucumber raita',
    'Vegetable & chicken clear soup + paneer salad',
  ],
};

const MEAL_DEFAULTS = [
  { id: 'breakfast', label: 'Breakfast', time: '08:30', enabled: true },
  { id: 'midmorning', label: 'Mid-morning snack', time: '11:00', enabled: true },
  { id: 'lunch', label: 'Lunch', time: '13:30', enabled: true },
  { id: 'evening', label: 'Evening snack', time: '17:00', enabled: true },
  { id: 'dinner', label: 'Dinner', time: '20:00', enabled: true },
];

const ICONS = {
  today: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/>',
  pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
  meal: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  edit: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
  trash: '<path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-3"/>',
};

function icon(name, size = 20) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

// ---------- Dates & times ----------

const pad = (n) => String(n).padStart(2, '0');
const dateKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseDate = (k) => {
  const [y, m, d] = k.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const addDays = (d, n) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};
const toMin = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
const fromMin = (m) => {
  const v = ((m % 1440) + 1440) % 1440;
  return `${pad(Math.floor(v / 60))}:${pad(v % 60)}`;
};
const nowMinutes = (d = new Date()) => d.getHours() * 60 + d.getMinutes();
const daysBetween = (a, b) => Math.round((parseDate(dateKey(b)) - parseDate(dateKey(a))) / 86400000);

function fmtTime(t) {
  const [h, m] = t.split(':').map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`;
}
function fmtDate(d, opts = {}) {
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', ...opts });
}
function relativeDay(d) {
  const diff = daysBetween(new Date(), d);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff > 1 && diff < 7) return d.toLocaleDateString(undefined, { weekday: 'long' });
  return fmtDate(d, { weekday: 'short' });
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// ---------- State ----------

function defaultState() {
  return {
    medicines: [],
    meals: MEAL_DEFAULTS.map((m) => ({ ...m, plan: MEAL_IDEAS[m.id][0] })),
    log: {}, // { 'YYYY-MM-DD': { slotKey: 'taken' | 'skipped' } }
    fired: {}, // { 'YYYY-MM-DD|slotKey': true }
    snoozes: {}, // { 'YYYY-MM-DD|slotKey': epoch ms }
    settings: { sound: true, mealAlerts: true, eveTime: '20:00' },
  };
}

function loadState() {
  const base = defaultState();
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY));
  } catch {
    saved = null;
  }
  if (!saved || typeof saved !== 'object') return base;
  return {
    ...base,
    ...saved,
    settings: { ...base.settings, ...saved.settings },
    meals: base.meals.map((m) => ({ ...m, ...(saved.meals || []).find((x) => x.id === m.id) })),
  };
}

let state = loadState();

function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    toast('Could not save — storage is full or blocked');
  }
}

// ---------- Schedule logic ----------

function courseEnd(med) {
  if (med.durationUnit === 'ongoing') return null;
  const start = parseDate(med.startDate);
  const n = Math.max(1, Number(med.durationValue) || 1);
  if (med.durationUnit === 'weeks') return addDays(start, n * 7 - 1);
  if (med.durationUnit === 'months') {
    const end = new Date(start);
    end.setMonth(end.getMonth() + n);
    return addDays(end, -1);
  }
  return addDays(start, n - 1);
}

function isActiveOn(med, d) {
  const k = dateKey(d);
  if (k < med.startDate) return false;
  const end = courseEnd(med);
  if (end && k > dateKey(end)) return false;
  return med.frequency === 'daily' || med.weekdays.includes(d.getDay());
}

function mealById(id) {
  return state.meals.find((m) => m.id === id);
}

function usesMeals(med) {
  return med.schedule === 'meals' && med.relation !== 'any';
}

const RELATION_TEXT = {
  before: 'Before food',
  with: 'With food',
  after: 'After food',
  empty: 'On an empty stomach',
  any: 'With or without food',
};

function offsetText(min) {
  return min >= 60 ? `${min / 60} hr` : `${min} min`;
}

// Each dose of a medicine on an active day: [{ time: 'HH:MM', label }]
function medDoses(med) {
  if (usesMeals(med)) {
    const off = Number(med.offset) || 0;
    return med.meals
      .map(mealById)
      .filter(Boolean)
      .map((meal) => {
        const name = meal.label.toLowerCase();
        if (med.relation === 'with') return { time: meal.time, label: `With ${name}` };
        if (med.relation === 'after') return { time: fromMin(toMin(meal.time) + off), label: `${offsetText(off)} after ${name}` };
        const label = med.relation === 'empty' ? `Empty stomach · ${offsetText(off)} before ${name}` : `${offsetText(off)} before ${name}`;
        return { time: fromMin(toMin(meal.time) - off), label };
      })
      .sort((a, b) => toMin(a.time) - toMin(b.time));
  }
  return [...med.times].sort((a, b) => toMin(a) - toMin(b)).map((time) => ({ time, label: RELATION_TEXT[med.relation] }));
}

// Everything due on a given day — meals, medicine doses and evening-before heads-ups.
function slotsFor(d) {
  const k = dateKey(d);
  const slots = [];
  for (const meal of state.meals) {
    if (!meal.enabled) continue;
    slots.push({ key: `meal:${meal.id}`, kind: 'meal', time: meal.time, title: meal.label, detail: meal.plan });
  }
  for (const med of state.medicines) {
    if (isActiveOn(med, d)) {
      const end = courseEnd(med);
      const lastDay = Boolean(end) && dateKey(end) === k;
      for (const dose of medDoses(med)) {
        slots.push({
          key: `med:${med.id}@${dose.time}`,
          kind: 'med',
          medId: med.id,
          time: dose.time,
          title: med.name,
          dose: med.dose,
          detail: dose.label,
          notes: med.notes,
          lastDay,
          weekly: med.frequency === 'weekly',
        });
      }
    }
    if (med.frequency === 'weekly' && med.eveBefore && isActiveOn(med, addDays(d, 1))) {
      const first = medDoses(med)[0];
      slots.push({
        key: `eve:${med.id}`,
        kind: 'heads',
        time: state.settings.eveTime,
        title: `Tomorrow: ${med.name}`,
        detail: `Your weekly dose${first ? ` is at ${fmtTime(first.time)}` : ''} — keep it ready.`,
      });
    }
  }
  const order = { med: 0, meal: 1, heads: 2 };
  return slots.sort((a, b) => toMin(a.time) - toMin(b.time) || order[a.kind] - order[b.kind]);
}

function slotStatus(slot, k, nowMin) {
  const logged = state.log[k]?.[slot.key];
  if (logged) return logged;
  const due = toMin(slot.time);
  if (nowMin < due) return 'upcoming';
  if (slot.kind === 'heads') return 'done';
  return nowMin - due <= MISSED_AFTER_MIN ? 'due' : 'missed';
}

function nextActiveDay(med, from = new Date()) {
  for (let i = 0; i < 400; i++) {
    const d = addDays(from, i);
    if (isActiveOn(med, d)) return d;
  }
  return null;
}

function setLog(k, key, status) {
  state.log[k] = state.log[k] || {};
  if (status) state.log[k][key] = status;
  else delete state.log[k][key];
  delete state.snoozes[`${k}|${key}`];
  save();
}

// ---------- Alerts ----------

let swReg = null;
let audioCtx = null;

function notifySupported() {
  return 'Notification' in window;
}

async function enableAlerts() {
  if (!notifySupported()) {
    toast('This browser does not support notifications — use the calendar file in Settings');
    return;
  }
  const result = await Notification.requestPermission();
  unlockAudio();
  if (result === 'granted') {
    toast('Alerts are on');
    fireTest();
  } else if (result === 'denied') {
    toast('Notifications are blocked — allow them in your browser settings');
  }
  render();
}

function unlockAudio() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  } catch {
    audioCtx = null;
  }
}

function chime() {
  if (!state.settings.sound || !audioCtx) return;
  const t0 = audioCtx.currentTime;
  [880, 1175, 880, 1175].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, t0 + i * 0.22);
    gain.gain.exponentialRampToValueAtTime(0.25, t0 + i * 0.22 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.22 + 0.2);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t0 + i * 0.22);
    osc.stop(t0 + i * 0.22 + 0.21);
  });
}

function alertContent(slot) {
  if (slot.kind === 'med') {
    const bits = [slot.dose, slot.detail, slot.notes].filter(Boolean);
    if (slot.lastDay) bits.push('Last day of this course');
    return { title: `💊 Time for ${slot.title}`, body: bits.join(' · ') };
  }
  if (slot.kind === 'meal') {
    return { title: `🍽️ ${slot.title} time`, body: `${slot.detail}\nProtein first, then veggies.` };
  }
  return { title: `📅 ${slot.title}`, body: slot.detail };
}

async function fire(slot, k) {
  const fkey = `${k}|${slot.key}`;
  const { title, body } = alertContent(slot);
  if (notifySupported() && Notification.permission === 'granted') {
    const options = {
      body,
      tag: fkey,
      renotify: true,
      requireInteraction: slot.kind === 'med',
      icon: 'icon.svg',
      badge: 'icon.svg',
      vibrate: [300, 120, 300, 120, 300],
      data: { fkey },
      actions:
        slot.kind === 'heads'
          ? []
          : [
              { action: 'taken', title: slot.kind === 'med' ? 'Mark taken' : 'Done' },
              { action: 'snooze', title: `Snooze ${SNOOZE_MIN} min` },
            ],
    };
    try {
      const reg = swReg || (await navigator.serviceWorker?.getRegistration());
      if (reg) await reg.showNotification(title, options);
      else new Notification(title, { body, tag: fkey, icon: 'icon.svg' });
    } catch {
      try {
        new Notification(title, { body, tag: fkey });
      } catch {
        /* in-app alert below still shows */
      }
    }
  }
  showAlarm(slot, k, title, body);
  chime();
  navigator.vibrate?.([300, 120, 300]);
}

function fireTest() {
  fire({ key: 'test', kind: 'heads', time: fromMin(nowMinutes()), title: 'Test alert', detail: 'Alerts are working. You will be reminded like this.' }, 'test');
}

const openAlarms = new Map();

function showAlarm(slot, k, title, body) {
  const fkey = `${k}|${slot.key}`;
  openAlarms.set(fkey, { slot, k, title, body });
  renderAlarms();
}

function renderAlarms() {
  const box = document.getElementById('alarms');
  box.innerHTML = [...openAlarms.entries()]
    .map(([fkey, a]) => {
      const f = escapeHtml(fkey);
      const actions =
        a.slot.kind === 'heads'
          ? `<button class="btn primary" data-action="alarm-dismiss" data-fkey="${f}">OK</button>`
          : `<button class="btn primary" data-action="alarm-take" data-fkey="${f}">${icon('check', 16)} ${a.slot.kind === 'med' ? 'Taken' : 'Done'}</button>
             <button class="btn ghost" data-action="alarm-snooze" data-fkey="${f}">Snooze ${SNOOZE_MIN} min</button>`;
      return `<div class="alarm" role="alertdialog" aria-label="${escapeHtml(a.title)}">
        <div class="alarm-head">
          <strong>${escapeHtml(a.title)}</strong>
          <button class="alarm-close" data-action="alarm-dismiss" data-fkey="${f}" aria-label="Dismiss">${icon('x', 18)}</button>
        </div>
        <p>${escapeHtml(a.body).replace(/\n/g, '<br>')}</p>
        <div class="btn-row">${actions}</div>
      </div>`;
    })
    .join('');
}

function closeNotification(fkey) {
  swReg?.getNotifications?.({ tag: fkey }).then((list) => list.forEach((n) => n.close())).catch(() => {});
}

function handleAlarmAction(action, fkey) {
  const [k, ...rest] = fkey.split('|');
  const key = rest.join('|');
  openAlarms.delete(fkey);
  closeNotification(fkey);
  if (k !== 'test') {
    if (action === 'taken') {
      setLog(k, key, 'taken');
      toast(key.startsWith('meal:') ? 'Meal logged' : 'Marked as taken');
    } else if (action === 'snooze') {
      state.snoozes[fkey] = Date.now() + SNOOZE_MIN * 60000;
      save();
      toast(`Snoozed for ${SNOOZE_MIN} minutes`);
    }
  }
  renderAlarms();
  render();
}

function tick() {
  const now = new Date();
  const k = dateKey(now);
  const nowMin = nowMinutes(now);
  let changed = false;

  for (const slot of slotsFor(now)) {
    if (slot.kind === 'meal' && !state.settings.mealAlerts) continue;
    const fkey = `${k}|${slot.key}`;
    if (state.fired[fkey] || state.log[k]?.[slot.key]) continue;
    const late = nowMin - toMin(slot.time);
    if (late >= 0 && late <= GRACE_MIN) {
      state.fired[fkey] = true;
      changed = true;
      fire(slot, k);
    }
  }

  for (const [fkey, at] of Object.entries(state.snoozes)) {
    if (Date.now() < at) continue;
    delete state.snoozes[fkey];
    changed = true;
    const [sk, ...rest] = fkey.split('|');
    const key = rest.join('|');
    if (state.log[sk]?.[key]) continue;
    const slot = slotsFor(parseDate(sk)).find((s) => s.key === key);
    if (slot) fire(slot, sk);
  }

  // Keep only the last few days of bookkeeping.
  const cutoff = dateKey(addDays(now, -2));
  for (const fkey of Object.keys(state.fired)) {
    if (fkey.split('|')[0] < cutoff) {
      delete state.fired[fkey];
      changed = true;
    }
  }
  const logCutoff = dateKey(addDays(now, -120));
  for (const day of Object.keys(state.log)) {
    if (day < logCutoff) {
      delete state.log[day];
      changed = true;
    }
  }

  if (changed) save();
  document.getElementById('today-label').textContent = now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
  if (currentTab === 'today' && !document.getElementById('med-dialog').open) render();
}

// ---------- Calendar export (.ics) — native phone alarms even when the app is closed ----------

function icsEscape(s) {
  return String(s ?? '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}
function icsDate(d) {
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
}
function icsStamp(d) {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}
function icsFold(line) {
  const out = [];
  let rest = line;
  while (rest.length > 73) {
    out.push(rest.slice(0, 73));
    rest = ` ${rest.slice(73)}`;
  }
  out.push(rest);
  return out.join('\r\n');
}

function buildICS() {
  const stamp = icsStamp(new Date());
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Health Reminder//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Health Reminder'];

  const event = ({ uid, date, time, summary, description, rrule, alarms }) => {
    const start = `${icsDate(date)}T${time.replace(':', '')}00`;
    const endMin = toMin(time) + 15;
    const endDate = endMin >= 1440 ? addDays(date, 1) : date;
    lines.push('BEGIN:VEVENT', `UID:${uid}@health-reminder`, `DTSTAMP:${stamp}`, `DTSTART:${start}`, `DTEND:${icsDate(endDate)}T${fromMin(endMin).replace(':', '')}00`);
    lines.push(`SUMMARY:${icsEscape(summary)}`, `DESCRIPTION:${icsEscape(description)}`, `RRULE:${rrule}`);
    for (const trigger of alarms) {
      lines.push('BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${icsEscape(summary)}`, `TRIGGER:${trigger}`, 'END:VALARM');
    }
    lines.push('END:VEVENT');
  };

  for (const med of state.medicines) {
    const end = courseEnd(med);
    if (end && end < parseDate(dateKey(new Date()))) continue;
    const first = nextActiveDay(med, parseDate(med.startDate));
    if (!first) continue;
    const until = end ? `;UNTIL=${icsDate(end)}T235959` : '';
    const rrule = med.frequency === 'weekly' ? `FREQ=WEEKLY;BYDAY=${med.weekdays.map((d) => ICS_DAYS[d]).join(',')}${until}` : `FREQ=DAILY${until}`;
    for (const dose of medDoses(med)) {
      const alarms = ['PT0M'];
      if (med.frequency === 'weekly' && med.eveBefore) {
        const before = toMin(dose.time) + (1440 - toMin(state.settings.eveTime));
        alarms.push(`-PT${Math.floor(before / 60)}H${before % 60}M`);
      }
      event({
        uid: `${med.id}-${dose.time.replace(':', '')}`,
        date: first,
        time: dose.time,
        summary: `💊 ${med.name}${med.dose ? ` (${med.dose})` : ''}`,
        description: [dose.label, med.notes].filter(Boolean).join('\n'),
        rrule,
        alarms,
      });
    }
  }

  for (const meal of state.meals) {
    if (!meal.enabled || !state.settings.mealAlerts) continue;
    event({
      uid: `meal-${meal.id}`,
      date: new Date(),
      time: meal.time,
      summary: `🍽️ ${meal.label}`,
      description: `${meal.plan}\nHigh protein · high fibre · low carb · low fat`,
      rrule: 'FREQ=DAILY',
      alarms: ['PT0M'],
    });
  }

  lines.push('END:VCALENDAR');
  return lines.map(icsFold).join('\r\n');
}

function download(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------- Views ----------

let currentTab = 'today';

function alertsBanner() {
  if (!notifySupported()) {
    return `<div class="banner warn"><span>This browser can't show notifications. Add your schedule to your phone calendar for alarms.</span><button class="btn small" data-action="export-ics">Calendar</button></div>`;
  }
  if (Notification.permission === 'granted') return '';
  if (Notification.permission === 'denied') {
    return `<div class="banner warn"><span>Notifications are blocked. Allow them for this site in your browser settings, or use the calendar file.</span></div>`;
  }
  return `<div class="banner"><span>${icon('bell', 18)}</span><span style="flex:1">Turn on alerts so you never miss a dose or a meal.</span><button class="btn small primary" data-action="enable-alerts">Turn on</button></div>`;
}

function renderToday() {
  const now = new Date();
  const k = dateKey(now);
  const nowMin = nowMinutes(now);
  const slots = slotsFor(now);
  const doses = slots.filter((s) => s.kind === 'med');
  const taken = doses.filter((s) => state.log[k]?.[s.key] === 'taken').length;
  const meals = slots.filter((s) => s.kind === 'meal');
  const mealsDone = meals.filter((s) => state.log[k]?.[s.key] === 'taken').length;
  const pct = doses.length ? taken / doses.length : 0;
  const circ = 2 * Math.PI * 32;

  const headline = !doses.length
    ? 'No medicines today'
    : taken === doses.length
      ? 'All doses taken 🎉'
      : `${doses.length - taken} dose${doses.length - taken === 1 ? '' : 's'} left today`;

  const next = slots.find((s) => s.kind !== 'heads' && ['upcoming', 'due'].includes(slotStatus(s, k, nowMin)));
  let nextHtml = '';
  if (next) {
    const mins = toMin(next.time) - nowMin;
    const when = mins <= 0 ? 'Now' : mins < 60 ? `In ${mins} min` : `At ${fmtTime(next.time)}`;
    nextHtml = `<div class="next">${icon(next.kind === 'med' ? 'pill' : 'meal', 26)}<div><div class="when">Next · ${when}</div><div class="what">${escapeHtml(next.title)}${next.dose ? ` · ${escapeHtml(next.dose)}` : ''}</div></div></div>`;
  }

  const items = slots
    .map((s) => {
      const status = slotStatus(s, k, nowMin);
      const iconName = s.kind === 'med' ? 'pill' : s.kind === 'meal' ? 'meal' : 'bell';
      const badges = [];
      if (status === 'due') badges.push('<span class="badge due">Due now</span>');
      if (status === 'missed') badges.push('<span class="badge missed">Missed</span>');
      if (status === 'taken') badges.push(`<span class="badge taken">${s.kind === 'med' ? 'Taken' : 'Done'}</span>`);
      if (status === 'skipped') badges.push('<span class="badge">Skipped</span>');
      if (s.weekly) badges.push('<span class="badge weekly">Weekly</span>');
      if (s.lastDay) badges.push('<span class="badge last">Last day</span>');

      let actions = '';
      if (s.kind !== 'heads') {
        const ek = escapeHtml(s.key);
        actions =
          status === 'taken' || status === 'skipped'
            ? `<button class="btn small ghost" data-action="mark" data-key="${ek}" data-status="">${icon('undo', 16)} Undo</button>`
            : s.kind === 'med'
              ? `<button class="btn small primary" data-action="mark" data-key="${ek}" data-status="taken">${icon('check', 16)} Taken</button>
                 <button class="btn small ghost" data-action="mark" data-key="${ek}" data-status="skipped">Skip</button>`
              : `<button class="btn small" data-action="mark" data-key="${ek}" data-status="taken">${icon('check', 16)} Ate this</button>`;
      }

      const detail = [s.dose, s.detail].filter(Boolean).map(escapeHtml).join(' · ');
      return `<li class="slot" data-kind="${s.kind}" data-status="${status}">
        <div class="time">${fmtTime(s.time).replace(' ', '<small>')}</small></div>
        <div>
          <div class="slot-head">
            <span class="slot-icon">${icon(iconName, 16)}</span>
            <div style="flex:1;min-width:0">
              <div class="slot-title">${escapeHtml(s.title)}</div>
              <div class="slot-detail">${detail}</div>
              ${badges.length ? `<div class="tags">${badges.join('')}</div>` : ''}
            </div>
          </div>
          ${actions ? `<div class="slot-actions">${actions}</div>` : ''}
        </div>
      </li>`;
    })
    .join('');

  const weekly = state.medicines
    .filter((m) => m.frequency === 'weekly')
    .map((m) => ({ med: m, day: nextActiveDay(m) }))
    .filter((w) => w.day);
  const weeklyHtml = weekly.length
    ? `<h2 class="section-title">Weekly medicines</h2>
       <div class="card">${weekly
         .map(({ med, day }) => {
           const t = medDoses(med)[0];
           return `<div class="setting-row"><div><strong>${escapeHtml(med.name)}</strong><p>${med.weekdays.map((d) => WEEKDAYS[d]).join(', ')}</p></div><span class="badge weekly">${relativeDay(day)}${t ? ` · ${fmtTime(t.time)}` : ''}</span></div>`;
         })
         .join('')}</div>`
    : '';

  return `
    ${alertsBanner()}
    <div class="card">
      <div class="summary">
        <div class="ring">
          <svg width="76" height="76" viewBox="0 0 76 76"><circle class="track" cx="38" cy="38" r="32"/><circle class="bar" cx="38" cy="38" r="32" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - pct)}"/></svg>
          <b>${taken}/${doses.length}</b>
        </div>
        <div>
          <h2>${headline}</h2>
          <p>${meals.length ? `${mealsDone} of ${meals.length} meals logged` : 'No meals planned'}</p>
        </div>
      </div>
      ${nextHtml}
    </div>
    ${
      state.medicines.length
        ? ''
        : `<div class="card empty" style="margin-top:12px">${icon('pill', 32)}<p>Add your medicines to get reminders at the right time — before or after meals, daily or weekly.</p><button class="btn primary" data-action="add-med">${icon('plus', 18)} Add medicine</button></div>`
    }
    <h2 class="section-title">Today's schedule <span class="muted">${slots.length} reminders</span></h2>
    ${slots.length ? `<ul class="timeline">${items}</ul>` : '<div class="card empty"><p>Nothing scheduled today.</p></div>'}
    ${weeklyHtml}
  `;
}

function medStatus(med) {
  const today = parseDate(dateKey(new Date()));
  const start = parseDate(med.startDate);
  const end = courseEnd(med);
  if (start > today) return { state: 'upcoming', text: `Starts ${relativeDay(start).toLowerCase() === 'tomorrow' ? 'tomorrow' : fmtDate(start)}`, pct: 0 };
  if (end && end < today) return { state: 'finished', text: `Course finished on ${fmtDate(end)}`, pct: 1 };
  if (!end) return { state: 'active', text: `Ongoing · since ${fmtDate(start)}`, pct: null };
  const total = daysBetween(start, end) + 1;
  const day = daysBetween(start, today) + 1;
  const left = total - day;
  return {
    state: 'active',
    text: `Day ${day} of ${total} · ${left === 0 ? 'last day today' : `${left} day${left === 1 ? '' : 's'} left, ends ${fmtDate(end)}`}`,
    pct: day / total,
  };
}

function scheduleSummary(med) {
  const doses = medDoses(med);
  const freq = med.frequency === 'weekly' ? `Weekly on ${med.weekdays.map((d) => WEEKDAYS[d]).join(', ')}` : `${doses.length}× a day`;
  const times = doses.map((d) => fmtTime(d.time)).join(', ');
  const how = usesMeals(med) ? doses.map((d) => d.label).join(' · ') : RELATION_TEXT[med.relation];
  return { freq, times, how };
}

function renderMeds() {
  const order = { active: 0, upcoming: 1, finished: 2 };
  const meds = [...state.medicines].map((m) => ({ med: m, st: medStatus(m) })).sort((a, b) => order[a.st.state] - order[b.st.state]);
  const cards = meds
    .map(({ med, st }) => {
      const s = scheduleSummary(med);
      return `<div class="card med ${st.state}">
        <div class="med-head">
          <div>
            <div class="med-name">${escapeHtml(med.name)}</div>
            ${med.dose ? `<div class="med-meta">${escapeHtml(med.dose)}</div>` : ''}
          </div>
          <div class="med-actions">
            <button class="icon-btn" data-action="edit-med" data-id="${med.id}" aria-label="Edit ${escapeHtml(med.name)}">${icon('edit', 18)}</button>
            <button class="icon-btn" data-action="delete-med" data-id="${med.id}" aria-label="Delete ${escapeHtml(med.name)}">${icon('trash', 18)}</button>
          </div>
        </div>
        <div class="tags">
          <span class="badge ${med.frequency === 'weekly' ? 'weekly' : ''}">${escapeHtml(s.freq)}</span>
          ${st.state === 'upcoming' ? '<span class="badge">Not started</span>' : ''}
        </div>
        <div class="med-meta">${icon('bell', 14).replace('<svg', '<svg style="display:inline;vertical-align:-2px"')} ${escapeHtml(s.times)}</div>
        <div class="med-meta">${escapeHtml(s.how)}</div>
        ${med.notes ? `<div class="med-meta">📝 ${escapeHtml(med.notes)}</div>` : ''}
        <div class="small muted">${escapeHtml(st.text)}</div>
        ${st.pct !== null && st.state === 'active' ? `<div class="progress"><span style="width:${Math.round(st.pct * 100)}%"></span></div>` : ''}
      </div>`;
    })
    .join('');

  return `
    <h2 class="section-title">My medicines <button class="btn small primary" data-action="add-med">${icon('plus', 16)} Add</button></h2>
    ${cards || `<div class="card empty">${icon('pill', 32)}<p>No medicines yet. Add one with its dose, how many times a day, before or after meals, and for how long.</p><button class="btn primary" data-action="add-med">${icon('plus', 18)} Add medicine</button></div>`}
  `;
}

function renderMeals() {
  const cards = state.meals
    .map(
      (m) => `<div class="card meal-card ${m.enabled ? '' : 'off'}">
        <div class="meal-top">
          <span class="slot-icon" style="background:var(--meal-soft);color:var(--meal)">${icon('meal', 16)}</span>
          <h3>${escapeHtml(m.label)}</h3>
          <label class="switch" title="Remind me"><input type="checkbox" data-meal="${m.id}" data-field="enabled" ${m.enabled ? 'checked' : ''} aria-label="Remind me about ${escapeHtml(m.label)}"><span></span></label>
        </div>
        <label class="inline-field"><span class="muted">Remind me at</span><input type="time" value="${m.time}" data-meal="${m.id}" data-field="time" aria-label="${escapeHtml(m.label)} time" ${m.enabled ? '' : 'disabled'}></label>
        <textarea rows="3" data-meal="${m.id}" data-field="plan" aria-label="${escapeHtml(m.label)} plan" ${m.enabled ? '' : 'disabled'}>${escapeHtml(m.plan)}</textarea>
        <div class="btn-row" style="margin-top:8px"><button class="btn small ghost" data-action="suggest-meal" data-id="${m.id}" ${m.enabled ? '' : 'disabled'}>${icon('refresh', 16)} Suggest another</button></div>
      </div>`,
    )
    .join('');

  return `
    <div class="card" style="margin-top:4px">
      <h2 style="font-size:18px">My diet plan</h2>
      <div class="tags">
        <span class="tag">High protein</span><span class="tag">High fibre</span><span class="tag">Low carb</span><span class="tag">Low fat</span>
      </div>
      <ul class="rules">
        <li><strong>Protein at every meal</strong> — dal, low-fat paneer, egg whites, chicken, fish, tofu, sprouts, curd.</li>
        <li><strong>Half the plate vegetables</strong> or salad for fibre.</li>
        <li><strong>Swap white rice and maida</strong> for a small portion of millets, oats or one multigrain roti.</li>
        <li><strong>About 1 tsp oil per meal</strong> — grill, steam, roast or air-fry instead of deep-frying.</li>
        <li><strong>Whole fruit, not juice</strong>; skip sugary drinks and sweets.</li>
        <li><strong>2.5–3 L water a day</strong>, unless your doctor says otherwise.</li>
      </ul>
    </div>
    <h2 class="section-title">Meal times &amp; menu</h2>
    <p class="small muted" style="margin:-4px 2px 12px">Medicines set "before / after a meal" move automatically when you change that meal's time.</p>
    ${cards}
    <p class="small muted" style="margin-top:14px">General guidance, not medical advice. If you have diabetes, kidney disease or another condition, check portions with your doctor or dietitian.</p>
  `;
}

function renderSettings() {
  let status = 'Not supported in this browser';
  if (notifySupported()) status = { granted: 'On', denied: 'Blocked in browser settings', default: 'Off' }[Notification.permission];
  return `
    <h2 class="section-title">Alerts</h2>
    <div class="card">
      <div class="setting-row">
        <div><strong>Notifications</strong><p>${status}</p></div>
        ${notifySupported() && Notification.permission !== 'granted' ? '<button class="btn small primary" data-action="enable-alerts">Turn on</button>' : '<button class="btn small" data-action="test-alert">Test</button>'}
      </div>
      <div class="setting-row">
        <div><strong>Sound</strong><p>Play a chime when a reminder fires</p></div>
        <label class="switch"><input type="checkbox" data-setting="sound" ${state.settings.sound ? 'checked' : ''} aria-label="Sound"><span></span></label>
      </div>
      <div class="setting-row">
        <div><strong>Meal reminders</strong><p>Alert me at each meal time with the menu</p></div>
        <label class="switch"><input type="checkbox" data-setting="mealAlerts" ${state.settings.mealAlerts ? 'checked' : ''} aria-label="Meal reminders"><span></span></label>
      </div>
      <div class="setting-row">
        <div><strong>Weekly heads-up time</strong><p>Evening-before reminder for weekly medicines</p></div>
        <input type="time" style="width:auto" data-setting="eveTime" value="${state.settings.eveTime}" aria-label="Weekly heads-up time">
      </div>
    </div>

    <h2 class="section-title">Alarms when the app is closed</h2>
    <div class="card">
      <p class="small">Phones pause web apps in the background, so in-app alerts only fire while the app is open or recently used. For alarms that <strong>always</strong> ring, add your schedule to your phone's calendar — daily and weekly repeats, course end dates and the evening-before alert are included.</p>
      <div class="btn-row"><button class="btn primary" data-action="export-ics">${icon('calendar', 18)} Add to phone calendar</button></div>
      <p class="hint">Re-download after you add or change a medicine or a meal time. Delete the old "Health Reminder" events first to avoid duplicates.</p>
    </div>

    <h2 class="section-title">Install on your phone</h2>
    <div class="card small">
      <p><strong>Android (Chrome):</strong> menu ⋮ → <em>Add to Home screen</em> / <em>Install app</em>.</p>
      <p style="margin-top:6px"><strong>iPhone (Safari):</strong> Share → <em>Add to Home Screen</em>, then open it from the home screen and turn on alerts (iOS 16.4+).</p>
    </div>

    <h2 class="section-title">Your data</h2>
    <div class="card">
      <p class="small muted">Everything stays on this device. Back up to move it to another phone.</p>
      <div class="btn-row">
        <button class="btn" data-action="export-json">${icon('download', 18)} Back up</button>
        <button class="btn" data-action="import-json">Restore</button>
        <button class="btn danger" data-action="reset">Erase all</button>
      </div>
    </div>
  `;
}

function render() {
  const view = document.getElementById('view');
  const views = { today: renderToday, meds: renderMeds, meals: renderMeals, settings: renderSettings };
  view.innerHTML = views[currentTab]();
  document.querySelectorAll('.tabbar button').forEach((b) => {
    if (b.dataset.tab === currentTab) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
}

function setTab(tab) {
  currentTab = tab;
  render();
  window.scrollTo({ top: 0 });
  try {
    localStorage.setItem(`${STORE_KEY}:tab`, tab);
  } catch {
    /* ignore */
  }
}

let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

// ---------- Medicine form ----------

const dialog = document.getElementById('med-dialog');
const form = document.getElementById('med-form');
const field = (n) => form.elements.namedItem(n);
let editingId = null;
let clockTimes = ['09:00'];

function buildChips() {
  document.getElementById('weekday-chips').innerHTML = WEEKDAYS.map(
    (d, i) => `<label class="chip"><input type="checkbox" name="weekdays" value="${i}"><span>${d}</span></label>`,
  ).join('');
  document.getElementById('meal-chips').innerHTML = state.meals
    .map((m) => `<label class="chip"><input type="checkbox" name="meals" value="${m.id}"><span>${escapeHtml(m.label)} · ${fmtTime(m.time)}</span></label>`)
    .join('');
}

function renderTimeInputs() {
  document.getElementById('times-count').textContent = clockTimes.length;
  document.getElementById('times-word').textContent = clockTimes.length === 1 ? 'time a day' : 'times a day';
  document.getElementById('time-inputs').innerHTML = clockTimes
    .map((t, i) => `<label class="field compact"><span class="small muted">Dose ${i + 1}</span><input type="time" data-time-index="${i}" value="${t}" required></label>`)
    .join('');
}

function setTimesCount(n) {
  n = Math.min(6, Math.max(1, n));
  const defaults = DEFAULT_TIMES[n];
  clockTimes = Array.from({ length: n }, (_, i) => clockTimes[i] && clockTimes.length >= n ? clockTimes[i] : defaults[i]);
  renderTimeInputs();
  updateFormUI();
}

function readForm() {
  const fd = new FormData(form);
  const relation = fd.get('relation');
  return {
    id: editingId || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    name: String(fd.get('name') || '').trim(),
    dose: String(fd.get('dose') || '').trim(),
    frequency: fd.get('frequency'),
    weekdays: fd.getAll('weekdays').map(Number).sort(),
    relation,
    schedule: relation === 'any' ? 'clock' : fd.get('schedule'),
    meals: fd.getAll('meals'),
    offset: Number(fd.get('offset')),
    times: [...clockTimes],
    startDate: fd.get('startDate') || dateKey(new Date()),
    durationValue: Number(fd.get('durationValue')) || 1,
    durationUnit: fd.get('durationUnit'),
    eveBefore: fd.get('eveBefore') === 'on',
    notes: String(fd.get('notes') || '').trim(),
  };
}

function validate(med) {
  if (!med.name) return 'Enter the medicine name.';
  if (med.frequency === 'weekly' && !med.weekdays.length) return 'Pick at least one day of the week.';
  if (usesMeals(med) && !med.meals.length) return 'Pick at least one meal.';
  if (!usesMeals(med) && med.times.some((t) => !t)) return 'Fill in every dose time.';
  return '';
}

function updateFormUI() {
  const med = readForm();
  const show = (sel, on) => form.querySelectorAll(sel).forEach((el) => (el.hidden = !on));
  show('[data-show="weekly"]', med.frequency === 'weekly');
  show('[data-show="meal-linked"]', med.relation !== 'any');
  show('[data-show="by-meals"]', usesMeals(med));
  show('[data-show="by-clock"]', !usesMeals(med));
  show('[data-show="offset"]', med.relation !== 'with');
  show('[data-hide="ongoing"]', med.durationUnit !== 'ongoing');
  document.getElementById('offset-label').textContent = med.relation === 'after' ? 'after the meal' : 'before the meal';

  const end = courseEnd(med);
  document.getElementById('end-hint').textContent = end ? `Last dose on ${fmtDate(end, { weekday: 'short', year: 'numeric' })}` : 'Keeps reminding you until you delete it.';

  const doses = med.name || usesMeals(med) ? medDoses(med) : [];
  const preview = document.getElementById('schedule-preview');
  if (doses.length) {
    const when = med.frequency === 'weekly' ? (med.weekdays.length ? `every ${med.weekdays.map((d) => WEEKDAYS[d]).join(', ')}` : 'on the days you pick') : 'every day';
    preview.textContent = `🔔 Reminders ${when} at ${doses.map((d) => fmtTime(d.time)).join(', ')}.`;
  } else {
    preview.textContent = '';
  }
}

function openForm(med) {
  editingId = med?.id || null;
  form.reset();
  buildChips();
  document.getElementById('med-dialog-title').textContent = med ? 'Edit medicine' : 'Add medicine';
  document.getElementById('form-error').textContent = '';

  const m = med || {
    name: '',
    dose: '',
    frequency: 'daily',
    weekdays: [new Date().getDay()],
    relation: 'after',
    schedule: 'meals',
    meals: ['breakfast', 'dinner'],
    offset: 30,
    times: ['09:00'],
    startDate: dateKey(new Date()),
    durationValue: 7,
    durationUnit: 'days',
    eveBefore: true,
    notes: '',
  };
  field('name').value = m.name;
  field('dose').value = m.dose;
  form.querySelector(`[name="frequency"][value="${m.frequency}"]`).checked = true;
  form.querySelectorAll('[name="weekdays"]').forEach((el) => (el.checked = m.weekdays.includes(Number(el.value))));
  form.querySelector(`[name="relation"][value="${m.relation}"]`).checked = true;
  form.querySelector(`[name="schedule"][value="${m.schedule}"]`).checked = true;
  form.querySelectorAll('[name="meals"]').forEach((el) => (el.checked = m.meals.includes(el.value)));
  field('offset').value = String(m.offset);
  field('startDate').value = m.startDate;
  field('durationValue').value = m.durationValue;
  field('durationUnit').value = m.durationUnit;
  field('eveBefore').checked = m.eveBefore;
  field('notes').value = m.notes;
  clockTimes = [...m.times];
  renderTimeInputs();
  updateFormUI();
  dialog.showModal();
  if (!med) field('name').focus();
}

form.addEventListener('input', (e) => {
  if (e.target.dataset.timeIndex !== undefined) clockTimes[Number(e.target.dataset.timeIndex)] = e.target.value;
  updateFormUI();
});
form.addEventListener('change', (e) => {
  // Empty stomach usually means an hour before food.
  if (e.target.name === 'relation' && e.target.value === 'empty') field('offset').value = '60';
  updateFormUI();
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const med = readForm();
  const error = validate(med);
  document.getElementById('form-error').textContent = error;
  if (error) return;
  const i = state.medicines.findIndex((m) => m.id === med.id);
  if (i >= 0) state.medicines[i] = med;
  else state.medicines.push(med);
  save();
  dialog.close();
  toast(i >= 0 ? `${med.name} updated` : `${med.name} added — reminders are set`);
  unlockAudio();
  render();
  tick();
});

// ---------- Events ----------

document.addEventListener('click', (e) => {
  const tabBtn = e.target.closest('[data-tab]');
  if (tabBtn) {
    setTab(tabBtn.dataset.tab);
    return;
  }
  const el = e.target.closest('[data-action]');
  if (!el) return;
  unlockAudio();
  const { action, id, key, fkey } = el.dataset;
  const k = dateKey(new Date());

  switch (action) {
    case 'enable-alerts':
      enableAlerts();
      break;
    case 'test-alert':
      fireTest();
      break;
    case 'add-med':
      openForm(null);
      break;
    case 'edit-med':
      openForm(state.medicines.find((m) => m.id === id));
      break;
    case 'delete-med': {
      const med = state.medicines.find((m) => m.id === id);
      if (med && confirm(`Delete ${med.name} and its reminders?`)) {
        state.medicines = state.medicines.filter((m) => m.id !== id);
        save();
        render();
        toast(`${med.name} deleted`);
      }
      break;
    }
    case 'close-dialog':
      dialog.close();
      break;
    case 'times-minus':
      setTimesCount(clockTimes.length - 1);
      break;
    case 'times-plus':
      setTimesCount(clockTimes.length + 1);
      break;
    case 'mark':
      setLog(k, key, el.dataset.status || null);
      openAlarms.delete(`${k}|${key}`);
      closeNotification(`${k}|${key}`);
      renderAlarms();
      render();
      break;
    case 'suggest-meal': {
      const meal = mealById(id);
      const ideas = MEAL_IDEAS[id];
      const at = ideas.indexOf(meal.plan);
      meal.plan = ideas[(at + 1) % ideas.length];
      save();
      render();
      break;
    }
    case 'alarm-take':
      handleAlarmAction('taken', fkey);
      break;
    case 'alarm-snooze':
      handleAlarmAction('snooze', fkey);
      break;
    case 'alarm-dismiss':
      handleAlarmAction('dismiss', fkey);
      break;
    case 'export-ics':
      if (!state.medicines.length && !state.meals.some((m) => m.enabled)) {
        toast('Nothing to add yet');
        break;
      }
      download('health-reminder.ics', buildICS(), 'text/calendar;charset=utf-8');
      toast('Open the file to add it to your calendar');
      break;
    case 'export-json':
      download(`health-reminder-backup-${k}.json`, JSON.stringify({ medicines: state.medicines, meals: state.meals, settings: state.settings }, null, 2), 'application/json');
      break;
    case 'import-json':
      document.getElementById('import-file').click();
      break;
    case 'reset':
      if (confirm('Erase all medicines, meals and history from this device?')) {
        state = defaultState();
        save();
        render();
        toast('Everything erased');
      }
      break;
  }
});

document.getElementById('view').addEventListener('input', (e) => {
  const { meal, field, setting } = e.target.dataset;
  if (meal && (field === 'time' || field === 'plan')) {
    if (field === 'time' && !e.target.value) return;
    mealById(meal)[field] = e.target.value;
    save();
  }
  if (setting === 'eveTime' && e.target.value) {
    state.settings.eveTime = e.target.value;
    save();
  }
});

document.getElementById('view').addEventListener('change', (e) => {
  const { meal, field, setting } = e.target.dataset;
  if (meal && field === 'enabled') {
    mealById(meal).enabled = e.target.checked;
    save();
    render();
  }
  if (setting === 'sound' || setting === 'mealAlerts') {
    state.settings[setting] = e.target.checked;
    save();
  }
});

document.getElementById('import-file').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!Array.isArray(data.medicines)) throw new Error('bad file');
    const base = defaultState();
    state = {
      ...base,
      medicines: data.medicines,
      meals: base.meals.map((m) => ({ ...m, ...(data.meals || []).find((x) => x.id === m.id) })),
      settings: { ...base.settings, ...data.settings },
    };
    save();
    render();
    toast('Backup restored');
  } catch {
    toast("That file isn't a Health Reminder backup");
  }
});

// Notification button presses come back from the service worker.
navigator.serviceWorker?.addEventListener('message', (e) => {
  if (e.data?.type === 'notification-action') handleAlarmAction(e.data.action, e.data.fkey);
});

// Other tabs/windows editing the same data.
window.addEventListener('storage', (e) => {
  if (e.key === STORE_KEY) {
    state = loadState();
    render();
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') tick();
});

// ---------- Start ----------

document.querySelectorAll('[data-icon]').forEach((el) => (el.outerHTML = icon(el.dataset.icon, el.closest('.tabbar') ? 22 : 20)));

try {
  const savedTab = localStorage.getItem(`${STORE_KEY}:tab`);
  if (['today', 'meds', 'meals', 'settings'].includes(savedTab)) currentTab = savedTab;
} catch {
  /* ignore */
}

// Opened from a notification button while the app was closed.
const params = new URLSearchParams(location.search);
if (params.get('action') && params.get('fkey')) {
  handleAlarmAction(params.get('action'), params.get('fkey'));
  history.replaceState(null, '', location.pathname);
}

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
  navigator.serviceWorker
    .register('sw.js')
    .then((reg) => {
      swReg = reg;
    })
    .catch(() => {});
}

render();
tick();
setInterval(tick, 20000);
