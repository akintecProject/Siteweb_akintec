// ============================================================
//   TABLE·IN — BOOKING
// ============================================================

let bk = {}; // current booking state
let calY, calM;

function startBooking(prefill = {}) {
  if (!currentUser) { openModal('modal-auth'); return; }

  const now = new Date();
  calY = now.getFullYear();
  calM = now.getMonth();

  bk = {
    date: prefill.date || '',
    time: prefill.time || '',
    guests: prefill.guests || 2,
    tableType: TABLE_TYPES[0],
    firstName: currentUser.firstName || '',
    lastName:  currentUser.lastName  || '',
    email:     currentUser.email     || '',
    phone:     currentUser.phone     || '',
    special:   '',
    total: 0,
    step: 1,
  };

  renderBkStep1();
  openModal('modal-booking');
}

// ============ STEP 1 ============
function renderBkStep1() {
  bk.step = 1;
  document.getElementById('booking-inner').innerHTML = `
  ${renderSteps(1)}
  <div class="bk-layout">
    <div class="bk-main">
      <div class="bk-section-title">${t('selectDate')}</div>
      <div class="cal-wrap" id="bk-cal">${renderCal()}</div>

      <div class="bk-section-title" style="margin-top:1.25rem">${t('selectTime')}</div>
      <div id="bk-slots">${renderSlots()}</div>

      <div class="bk-section-title" style="margin-top:1.25rem">${t('tableType')}</div>
      <div class="table-types">${TABLE_TYPES.map(tt => `
        <div class="tt-card${bk.tableType?.id === tt.id ? ' ttsel':''}" onclick="selectTable('${tt.id}')">
          <div class="tt-radio"></div>
          <div style="width:36px;height:36px;border-radius:8px;background:var(--gold-dim);display:flex;align-items:center;justify-content:center;font-family:var(--ff-disp);font-style:italic;color:var(--gold);flex-shrink:0">${tt.letter}</div>
          <div class="tt-info"><div class="tt-name">${tt.name}</div><div class="tt-feat">${tt.feat}</div></div>
          <div class="tt-price">${tt.price > 0 ? '+'+tt.price+'€' : 'Inclus'}</div>
        </div>`).join('')}
      </div>

      <div class="bk-section-title" style="margin-top:1.25rem">${t('guests')}</div>
      <div class="gs-row">
        <span class="gs-label">${t('adults')}</span>
        <div class="gs-ctrl">
          <button onclick="bkGuests('adults',-1)">−</button>
          <span id="bk-adults">${Math.max(1, bk.guests - (bk.children||0))}</span>
          <button onclick="bkGuests('adults',1)">+</button>
        </div>
      </div>
      <div class="gs-row">
        <span class="gs-label">${t('children')}</span>
        <div class="gs-ctrl">
          <button onclick="bkGuests('children',-1)">−</button>
          <span id="bk-children">${bk.children || 0}</span>
          <button onclick="bkGuests('children',1)">+</button>
        </div>
      </div>
    </div>
    <div class="bk-summary-wrap">${renderBkSummary()}</div>
  </div>
  <div class="bk-nav">
    <button class="btn-ghost" onclick="closeModal('modal-booking')">✕ Fermer</button>
    <button class="btn-fill" onclick="bkToStep2()">${t('guestInfo')} →</button>
  </div>`;
}

function renderCal() {
  const months = lang === 'fr' ? ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
    : lang === 'de' ? ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
    : lang === 'es' ? ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    : ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const days = lang === 'fr' || lang === 'de' ? ['L','M','M','J','V','S','D']
    : lang === 'es' ? ['L','M','X','J','V','S','D']
    : ['M','T','W','T','F','S','S'];

  const today = new Date();
  const firstDay = new Date(calY, calM, 1).getDay();
  const adj = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(calY, calM + 1, 0).getDate();

  let cells = '';
  for (let i = 0; i < adj; i++) cells += '<div class="cal-day cempty"></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(calY, calM, d);
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isToday = date.toDateString() === today.toDateString();
    const dateStr = `${calY}-${String(calM+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isSel = bk.date === dateStr;
    // Monday = closed
    const isMonday = date.getDay() === 1;
    const cls = ['cal-day', isPast||isMonday?'cdis':'', isToday?'ctoday':'', isSel?'csel':''].filter(Boolean).join(' ');
    cells += `<div class="${cls}" onclick="${!isPast&&!isMonday?`calSelect('${dateStr}')`:''}">${d}</div>`;
  }

  return `
  <div class="cal-nav">
    <button class="cal-arrow" onclick="calNav(-1)">‹</button>
    <div class="cal-title">${months[calM]} ${calY}</div>
    <button class="cal-arrow" onclick="calNav(1)">›</button>
  </div>
  <div class="cal-grid">
    ${days.map(d => `<div class="cal-head">${d}</div>`).join('')}
    ${cells}
  </div>`;
}

function calNav(dir) {
  calM += dir;
  if (calM < 0) { calM = 11; calY--; }
  if (calM > 11) { calM = 0; calY++; }
  const cal = document.getElementById('bk-cal');
  if (cal) cal.innerHTML = renderCal();
}

function calSelect(dateStr) {
  bk.date = dateStr;
  const cal = document.getElementById('bk-cal');
  if (cal) cal.innerHTML = renderCal();
  const slots = document.getElementById('bk-slots');
  if (slots) slots.innerHTML = renderSlots();
  refreshBkSummary();
}

function renderSlots() {
  const booked = (BOOKED_SLOTS[bk.date] || []);
  const allSlots = [...TIME_SLOTS.lunch, ...TIME_SLOTS.dinner];

  // Simulate some booked slots
  const simBooked = ['12:30','20:00'];

  return `
  <div class="slots-grid">
    ${allSlots.map(s => {
      const isBooked = simBooked.includes(s);
      const isSel = bk.time === s;
      return `<div class="time-slot${isBooked?' tbooked':isSel?' tsel':''}" onclick="${isBooked?'':'slotSelect(\''+s+'\')'}">${s}</div>`;
    }).join('')}
  </div>`;
}

function slotSelect(time) {
  bk.time = time;
  const slots = document.getElementById('bk-slots');
  if (slots) slots.innerHTML = renderSlots();
  refreshBkSummary();
}

function selectTable(id) {
  bk.tableType = TABLE_TYPES.find(tt => tt.id === id) || TABLE_TYPES[0];
  document.querySelectorAll('.tt-card').forEach(c => c.classList.toggle('ttsel', c.getAttribute('onclick')?.includes(`'${id}'`)));
  document.querySelectorAll('.tt-card').forEach(c => {
    const isSelected = c.getAttribute('onclick') === `selectTable('${id}')`;
    c.classList.toggle('ttsel', isSelected);
  });
  refreshBkSummary();
}

function bkGuests(type, d) {
  if (type === 'adults') {
    const adults = Math.max(1, parseInt(document.getElementById('bk-adults').textContent) + d);
    document.getElementById('bk-adults').textContent = adults;
    bk.guests = adults + (bk.children || 0);
  } else {
    const ch = Math.max(0, parseInt(document.getElementById('bk-children').textContent) + d);
    document.getElementById('bk-children').textContent = ch;
    bk.children = ch;
    bk.guests = parseInt(document.getElementById('bk-adults').textContent) + ch;
  }
  refreshBkSummary();
}

function renderBkSummary() {
  const extra = bk.tableType?.price || 0;
  bk.total = extra;
  return `
  <div class="bk-summary">
    <div class="bks-rest">Table·In · Paris</div>
    <div style="font-size:.75rem;color:var(--text2);margin-bottom:.9rem">★ 4.9 · 2 840 avis</div>
    ${bk.date ? `<div class="bks-line"><span>${t('date')}</span><span>${bk.date}</span></div>` : ''}
    ${bk.time ? `<div class="bks-line"><span>${t('time')}</span><span>${bk.time}</span></div>` : ''}
    ${bk.guests ? `<div class="bks-line"><span>${t('guests')}</span><span>${bk.guests}</span></div>` : ''}
    ${bk.tableType ? `<div class="bks-line"><span>${bk.tableType.name}</span><span>${extra > 0 ? extra+'€' : 'Inclus'}</span></div>` : ''}
    <div class="bks-total"><span>${t('total')}</span><span>${bk.total > 0 ? bk.total+'€' : 'Gratuit'}</span></div>
  </div>`;
}

function refreshBkSummary() {
  const wrap = document.querySelector('.bk-summary-wrap');
  if (wrap) wrap.innerHTML = renderBkSummary();
}

// ============ STEP 2 ============
function bkToStep2() {
  if (!bk.date) { toast('error','', 'Veuillez choisir une date.'); return; }
  if (!bk.time) { toast('error','', 'Veuillez choisir un créneau.'); return; }
  bk.step = 2;

  document.getElementById('booking-inner').innerHTML = `
  ${renderSteps(2)}
  <div class="bk-layout">
    <div class="bk-main">
      <div class="bk-section-title">${t('guestInfo')}</div>
      <div class="field-row2">
        <div class="field-group">
          <label>${t('firstName')}</label>
          <input type="text" id="bi-fname" value="${bk.firstName}" placeholder="Marie"/>
        </div>
        <div class="field-group">
          <label>${t('lastName')}</label>
          <input type="text" id="bi-lname" value="${bk.lastName}" placeholder="Dupont"/>
        </div>
      </div>
      <div class="field-group">
        <label>${t('email')}</label>
        <input type="email" id="bi-email" value="${bk.email}" placeholder="marie@email.com"/>
      </div>
      <div class="field-group">
        <label>${t('phone')}</label>
        <input type="tel" id="bi-phone" value="${bk.phone}" placeholder="+33 6 00 00 00 00"/>
      </div>
      <div class="field-group">
        <label>${t('specialReq')}</label>
        <textarea id="bi-special" placeholder="${t('specialReqPh')}" style="min-height:80px">${bk.special}</textarea>
      </div>
    </div>
    <div class="bk-summary-wrap">${renderBkSummary()}</div>
  </div>
  <div class="bk-nav">
    <button class="btn-ghost" onclick="renderBkStep1(); bk.step=1;">← ${t('backBtn')}</button>
    <button class="btn-fill" onclick="bkToPayment()">${t('payTitle')} →</button>
  </div>`;
}

// ============ TO PAYMENT ============
function bkToPayment() {
  bk.firstName = document.getElementById('bi-fname')?.value || bk.firstName;
  bk.lastName  = document.getElementById('bi-lname')?.value || bk.lastName;
  bk.email     = document.getElementById('bi-email')?.value || bk.email;
  bk.phone     = document.getElementById('bi-phone')?.value || bk.phone;
  bk.special   = document.getElementById('bi-special')?.value || '';

  closeModal('modal-booking');
  openModal('modal-payment');
  renderPayment();
}

// ============ STEP INDICATOR ============
function renderSteps(active) {
  const steps = [t('step1'), t('step2'), t('step3')];
  return `
  <div class="bk-steps" style="margin-bottom:1.75rem">
    ${steps.map((s, i) => {
      const n = i + 1;
      const cls = n < active ? 'done' : n === active ? 'active' : '';
      return `
      <div class="bk-step ${cls}">
        <div class="bk-step-circle">${n < active ? '✓' : n}</div>
        ${i < steps.length - 1 ? '<div class="bk-step-line"></div>' : ''}
      </div>`;
    }).join('')}
  </div>`;
}
