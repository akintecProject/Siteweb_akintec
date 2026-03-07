/* ============================================
   NEXUS ERP — CALENDAR MODULE
   ============================================ */

let calState = {
  year: 2026, month: 2, // 0-indexed, 2 = March
  view: 'month',
  events: [
    { id: 1, date: '2026-03-05', title: 'RDV Acme Corp', type: 'green', time: '10:00' },
    { id: 2, date: '2026-03-07', title: 'Présentation équipe', type: 'blue', time: '14:30' },
    { id: 3, date: '2026-03-07', title: 'Réunion Vivaldi', type: 'orange', time: '16:00' },
    { id: 4, date: '2026-03-12', title: 'Audit financier', type: 'red', time: '09:00' },
    { id: 5, date: '2026-03-14', title: 'Formation interne', type: 'blue', time: '13:00' },
    { id: 6, date: '2026-03-15', title: 'Salon Tech Paris', type: 'green', time: '09:30' },
    { id: 7, date: '2026-03-18', title: 'RDV FinTech Nova', type: 'orange', time: '11:00' },
    { id: 8, date: '2026-03-20', title: 'Revue mensuelle', type: 'blue', time: '15:00' },
    { id: 9, date: '2026-03-22', title: 'Onboarding client', type: 'green', time: '10:00' },
    { id: 10, date: '2026-03-25', title: 'Conseil stratégique', type: 'red', time: '14:00' },
    { id: 11, date: '2026-03-28', title: 'Bilan Q1', type: 'blue', time: '09:00' },
  ]
};

function renderCalendar() {
  const monthNames = {
    fr: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    en: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    de: ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
    es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  };
  const lang = currentLang || 'fr';
  const monthName = (monthNames[lang] || monthNames.fr)[calState.month];
  const dayHeaders = {
    fr: ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
    en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    de: ['Mo','Di','Mi','Do','Fr','Sa','So'],
    es: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
  };
  const days = (dayHeaders[lang] || dayHeaders.fr);

  const upcomingEvents = calState.events
    .filter(e => e.date >= `${calState.year}-${String(calState.month+1).padStart(2,'0')}-01`)
    .sort((a,b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return `
    <div class="page-header">
      <div class="page-header-left">
        <h2>${t('calendarTitle')}</h2>
        <p>${t('calendarDesc')}</p>
      </div>
      <div class="page-actions">
        <button class="btn-secondary btn-sm" onclick="showToast('◎','Export calendrier','info')">${t('export')}</button>
        <button class="btn-primary btn-sm" onclick="openAddEventModal()">${t('addBooking')}</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,280px);gap:1.5rem;align-items:start">
      <div class="calendar-wrap">
        <div class="cal-header">
          <div style="display:flex;align-items:center;gap:0.75rem">
            <div class="cal-nav">
              <button class="cal-nav-btn" onclick="calNav(-1)">‹</button>
              <button class="cal-nav-btn" onclick="calNav(1)">›</button>
            </div>
            <span class="cal-title">${monthName} ${calState.year}</span>
            <button class="cal-nav-btn" onclick="calGoToday()" style="padding:0 0.75rem;width:auto;font-size:0.72rem">Aujourd'hui</button>
          </div>
          <div class="cal-view-tabs">
            <button class="cal-view-tab ${calState.view==='month'?'active':''}" onclick="calSetView('month')">${t('monthView')}</button>
            <button class="cal-view-tab ${calState.view==='week'?'active':''}" onclick="calSetView('week')">${t('weekView')}</button>
            <button class="cal-view-tab ${calState.view==='day'?'active':''}" onclick="calSetView('day')">${t('dayView')}</button>
          </div>
        </div>
        <div id="calBody">${renderCalBody(days)}</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div class="card">
          <div class="card-header"><span class="card-title">À venir</span></div>
          <div class="card-body" style="padding:1rem">
            ${upcomingEvents.length ? upcomingEvents.map(e => `
              <div style="display:flex;gap:0.75rem;padding:0.65rem 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="openEventDetail(${e.id})">
                <div style="width:3px;border-radius:2px;background:var(--${e.type === 'green' ? 'success' : e.type === 'orange' ? 'accent2' : e.type === 'red' ? 'danger' : 'accent'});flex-shrink:0"></div>
                <div>
                  <div style="font-size:0.82rem;font-weight:500;margin-bottom:0.15rem">${e.title}</div>
                  <div style="font-size:0.72rem;color:var(--text-muted)">${formatCalDate(e.date)} — ${e.time}</div>
                </div>
              </div>
            `).join('') : '<div style="font-size:0.82rem;color:var(--text-muted)">Aucun événement à venir</div>'}
          </div>
        </div>

        <div class="card">
          <div class="card-header"><span class="card-title">Ce mois</span></div>
          <div class="card-body">
            <div class="quick-stats">
              <div class="qs-item"><span class="qs-label">${t('bookings')}</span><span class="qs-val">${calState.events.length}</span></div>
              <div class="qs-item"><span class="qs-label">Confirmées</span><span class="qs-badge green">9</span></div>
              <div class="qs-item"><span class="qs-label">En attente</span><span class="qs-badge orange">2</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCalBody(days) {
  if (calState.view === 'week') return renderWeekView(days);
  if (calState.view === 'day') return renderDayView();

  const firstDay = new Date(calState.year, calState.month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(calState.year, calState.month + 1, 0).getDate();
  const daysInPrev = new Date(calState.year, calState.month, 0).getDate();
  const today = new Date();

  let html = `<div class="cal-grid">`;
  days.forEach(d => html += `<div class="cal-day-header">${d}</div>`);

  let cells = [];
  for (let i = offset - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, current: false });
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, current: true });
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, current: false });

  cells.forEach(cell => {
    const dateStr = cell.current
      ? `${calState.year}-${String(calState.month+1).padStart(2,'0')}-${String(cell.day).padStart(2,'0')}`
      : '';
    const isToday = cell.current &&
      cell.day === today.getDate() &&
      calState.month === today.getMonth() &&
      calState.year === today.getFullYear();
    const dayEvents = calState.events.filter(e => e.date === dateStr);

    html += `<div class="cal-cell ${!cell.current ? 'other-month' : ''} ${isToday ? 'today' : ''} ${dayEvents.length ? 'has-events' : ''}" onclick="handleCalCellClick('${dateStr}',${cell.day})">
      <div class="cal-date">${cell.day}</div>
      ${dayEvents.slice(0,2).map(e => `<div class="cal-event ${e.type}" onclick="event.stopPropagation();openEventDetail(${e.id})">${e.time} ${e.title}</div>`).join('')}
      ${dayEvents.length > 2 ? `<div style="font-size:0.62rem;color:var(--text-muted);padding:0.1rem 0.35rem">+${dayEvents.length - 2}</div>` : ''}
    </div>`;
  });

  html += `</div>`;
  return html;
}

function renderWeekView(days) {
  const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
  return `<div style="overflow-x:auto"><div style="min-width:600px">
    <div style="display:grid;grid-template-columns:60px repeat(7,1fr);border-bottom:1px solid var(--border)">
      <div style="padding:0.75rem"></div>
      ${days.map((d,i) => `<div style="text-align:center;padding:0.75rem 0.25rem;font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);border-left:1px solid var(--border)">${d} ${calState.month+1}/${i+calState.day||i+1}</div>`).join('')}
    </div>
    ${hours.map(h => `
      <div style="display:grid;grid-template-columns:60px repeat(7,1fr);border-bottom:1px solid var(--border)">
        <div style="padding:0.6rem 0.75rem;font-size:0.7rem;color:var(--text-muted);text-align:right">${h}</div>
        ${Array(7).fill('').map((_,i) => {
          const ev = calState.events.find(e => e.time === h);
          return `<div style="min-height:48px;border-left:1px solid var(--border);padding:3px;cursor:pointer;transition:background 0.2s" onmouseover="this.style.background='var(--bg-alt)'" onmouseout="this.style.background=''" onclick="openAddEventModal()">
            ${ev && i === 2 ? `<div class="cal-event ${ev.type}" style="font-size:0.62rem">${ev.title}</div>` : ''}
          </div>`;
        }).join('')}
      </div>
    `).join('')}
  </div></div>`;
}

function renderDayView() {
  const today = new Date(calState.year, calState.month, 7);
  const dayEvents = calState.events.filter(e => e.date === `${calState.year}-${String(calState.month+1).padStart(2,'0')}-07`);
  const hours = Array.from({length:14}, (_,i) => `${String(i+7).padStart(2,'0')}:00`);
  return `<div style="padding:1rem">
    <div style="font-family:var(--font-display);font-size:1rem;font-weight:600;margin-bottom:1rem">
      7 ${['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'][calState.month]} ${calState.year}
    </div>
    ${hours.map(h => {
      const ev = dayEvents.find(e => e.time === h);
      return `<div style="display:flex;gap:1rem;min-height:60px;border-bottom:1px solid var(--border);padding:0.5rem 0">
        <div style="width:50px;font-size:0.72rem;color:var(--text-muted);flex-shrink:0">${h}</div>
        <div style="flex:1">
          ${ev ? `<div class="cal-event ${ev.type}" style="display:inline-block;cursor:pointer" onclick="openEventDetail(${ev.id})">${ev.title}</div>` : ''}
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

function formatCalDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const opts = { weekday: 'short', day: 'numeric', month: 'short' };
  return d.toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : currentLang === 'de' ? 'de-DE' : currentLang === 'es' ? 'es-ES' : 'en-GB', opts);
}

function initCalendar() { /* calendar is rendered inline */ }

function calNav(dir) {
  calState.month += dir;
  if (calState.month > 11) { calState.month = 0; calState.year++; }
  if (calState.month < 0) { calState.month = 11; calState.year--; }
  navigateTo('calendar', document.querySelector('.nav-item.active'));
}

function calGoToday() {
  const now = new Date();
  calState.year = now.getFullYear();
  calState.month = now.getMonth();
  navigateTo('calendar', document.querySelector('.nav-item.active'));
}

function calSetView(view) {
  calState.view = view;
  navigateTo('calendar', document.querySelector('.nav-item.active'));
}

function handleCalCellClick(dateStr, day) {
  if (!dateStr) return;
  openAddEventModal(dateStr);
}

function openEventDetail(id) {
  const ev = calState.events.find(e => e.id === id);
  if (!ev) return;
  const typeLabel = { green: 'Rendez-vous', blue: 'Interne', orange: 'Client', red: 'Urgent' };
  openModal(`
    <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.5rem">
      <div style="width:12px;height:12px;border-radius:3px;background:var(--${ev.type === 'green' ? 'success' : ev.type === 'orange' ? 'accent2' : ev.type === 'red' ? 'danger' : 'accent'})"></div>
      <span style="font-size:0.75rem;font-weight:600;color:var(--text-muted);text-transform:uppercase">${typeLabel[ev.type] || ev.type}</span>
    </div>
    <h3 style="font-family:var(--font-display);font-size:1.25rem;font-weight:700;margin-bottom:0.75rem">${ev.title}</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.5rem">
      <div><div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.2rem">Date</div><div style="font-size:0.9rem;font-weight:500">${formatCalDate(ev.date)}</div></div>
      <div><div style="font-size:0.72rem;color:var(--text-muted);margin-bottom:0.2rem">Heure</div><div style="font-size:0.9rem;font-weight:500">${ev.time}</div></div>
    </div>
    <div style="display:flex;gap:0.75rem">
      <button class="btn-primary btn-sm" onclick="showToast('◎','Événement modifié','success');closeModal()">Modifier</button>
      <button class="btn-danger btn-sm" onclick="deleteEvent(${ev.id})">Supprimer</button>
      <button class="btn-secondary btn-sm" onclick="closeModal()">Fermer</button>
    </div>
  `);
}

function openAddEventModal(dateStr = '') {
  openModal(`
    <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:1.5rem">${t('addBooking')}</h3>
    <div class="form-group"><label>Titre</label><input class="form-input" id="newEvTitle" placeholder="ex: RDV client, Réunion..."></div>
    <div class="form-row">
      <div class="form-group"><label>${t('date')}</label><input type="date" class="form-input" id="newEvDate" value="${dateStr}"></div>
      <div class="form-group"><label>Heure</label><input type="time" class="form-input" id="newEvTime" value="10:00"></div>
    </div>
    <div class="form-group"><label>Type</label>
      <select class="form-input form-select" id="newEvType">
        <option value="green">Rendez-vous</option>
        <option value="blue">Interne</option>
        <option value="orange">Client</option>
        <option value="red">Urgent</option>
      </select>
    </div>
    <div class="form-group"><label>${t('clients')}</label>
      <select class="form-input form-select">
        <option value="">— Aucun client —</option>
        ${MOCK_DATA.clients.map(c => `<option>${c.name}</option>`).join('')}
      </select>
    </div>
    <div class="form-group"><label>Notes</label><textarea class="form-input" rows="3" placeholder="Informations supplémentaires..."></textarea></div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button class="btn-primary" style="flex:1" onclick="addCalEvent()">Ajouter</button>
      <button class="btn-secondary" onclick="closeModal()">${t('cancel')}</button>
    </div>
  `);
}

function addCalEvent() {
  const title = document.getElementById('newEvTitle')?.value;
  const date = document.getElementById('newEvDate')?.value;
  const time = document.getElementById('newEvTime')?.value;
  const type = document.getElementById('newEvType')?.value;
  if (!title || !date) { showToast('◎', 'Remplissez au moins le titre et la date.', 'error'); return; }
  calState.events.push({ id: Date.now(), date, title, type, time });
  closeModal();
  showToast('◎', t('bookingAdded'), 'success');
  navigateTo('calendar', document.querySelector('.nav-item.active'));
}

function deleteEvent(id) {
  calState.events = calState.events.filter(e => e.id !== id);
  closeModal();
  showToast('◎', 'Événement supprimé.', 'info');
  navigateTo('calendar', document.querySelector('.nav-item.active'));
}

// ===== AVAILABILITY =====
function renderAvailability() {
  const days = {
    fr: ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
    en: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    de: ['Mo','Di','Mi','Do','Fr','Sa','So'],
    es: ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],
  }[currentLang] || ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];

  const hours = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];

  const booked = ['2-3','3-2','1-5','4-4','0-7','2-8','5-3','1-2','3-6'];
  const blocked = ['0-8','6-3','6-4','0-9','0-10','6-5'];

  return `
    <div class="page-header">
      <div class="page-header-left">
        <h2>${t('availTitle')}</h2>
        <p>${t('availDesc')}</p>
      </div>
      <div class="page-actions">
        <button class="btn-secondary btn-sm" onclick="openHoursModal()">${t('setHours')}</button>
        <button class="btn-primary btn-sm" onclick="showToast('◎','${t('savedSuccess')}','success')">${t('saveAvail')}</button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,260px);gap:1.5rem;align-items:start">
      <div>
        <div class="card" style="overflow:visible">
          <div class="card-header">
            <span class="card-title">Semaine du 2 — 8 Mars 2026</span>
            <div style="display:flex;gap:0.5rem">
              <button class="cal-nav-btn">‹</button>
              <button class="cal-nav-btn">›</button>
            </div>
          </div>
          <div class="card-body" style="padding:0;overflow-x:auto">
            <div class="avail-grid">
              <div class="avail-header"></div>
              ${days.map(d => `<div class="avail-header">${d}</div>`).join('')}
              ${hours.map((h, hi) => `
                <div class="avail-time">${h}</div>
                ${days.map((_, di) => {
                  const key = `${di}-${hi}`;
                  const isBooked = booked.includes(key);
                  const isBlocked = blocked.includes(key);
                  const cls = isBooked ? 'booked' : isBlocked ? 'blocked' : '';
                  const label = isBooked ? 'Réservé' : isBlocked ? 'Bloqué' : '';
                  return `<div class="avail-slot ${cls}" onclick="toggleSlot(this,'${key}')" data-key="${key}">
                    ${label ? `<div class="avail-slot-label">${label}</div>` : ''}
                  </div>`;
                }).join('')}
              `).join('')}
            </div>
          </div>
        </div>
        <div class="avail-legend">
          <div class="legend-avail"><div class="legend-avail-dot dot-available"></div><span>Disponible</span></div>
          <div class="legend-avail"><div class="legend-avail-dot dot-booked"></div><span>Réservé</span></div>
          <div class="legend-avail"><div class="legend-avail-dot dot-blocked"></div><span>Bloqué</span></div>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:1rem">
        <div class="card">
          <div class="card-header"><span class="card-title">Heures de travail</span></div>
          <div class="card-body" style="padding:1rem">
            ${days.slice(0,5).map((d,i) => `
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem">
                <span style="font-size:0.82rem;font-weight:500;width:40px">${d}</span>
                <button class="toggle ${i < 5 ? 'on' : ''}" onclick="this.classList.toggle('on')"></button>
                <span style="font-size:0.75rem;color:var(--text-muted)">09h–18h</span>
              </div>
            `).join('')}
            ${days.slice(5).map((d,i) => `
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem">
                <span style="font-size:0.82rem;font-weight:500;width:40px">${d}</span>
                <button class="toggle" onclick="this.classList.toggle('on')"></button>
                <span style="font-size:0.75rem;color:var(--text-muted)">Fermé</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card">
          <div class="card-header"><span class="card-title">Durée par défaut</span></div>
          <div class="card-body" style="padding:1rem">
            <div class="form-group" style="margin-bottom:0.75rem">
              <label>Durée d'un RDV</label>
              <select class="form-input form-select">
                <option>30 minutes</option>
                <option selected>1 heure</option>
                <option>1h30</option>
                <option>2 heures</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0">
              <label>Délai tampon</label>
              <select class="form-input form-select">
                <option>Aucun</option>
                <option selected>15 minutes</option>
                <option>30 minutes</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function toggleSlot(el, key) {
  if (el.classList.contains('blocked')) return;
  el.classList.toggle('available');
  const label = el.querySelector('.avail-slot-label');
  if (el.classList.contains('available')) {
    if (!label) {
      const div = document.createElement('div');
      div.className = 'avail-slot-label';
      div.textContent = '✓';
      el.appendChild(div);
    }
  } else {
    if (label) label.remove();
  }
}

function initAvailability() { /* already rendered inline */ }

function openHoursModal() {
  openModal(`
    <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:1.5rem">Définir les horaires</h3>
    <div class="form-row">
      <div class="form-group"><label>Heure de début</label><input type="time" class="form-input" value="09:00"></div>
      <div class="form-group"><label>Heure de fin</label><input type="time" class="form-input" value="18:00"></div>
    </div>
    <div class="form-group">
      <label>Jours ouvrés</label>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.4rem">
        ${['L','M','M','J','V','S','D'].map((d,i) => `<button style="width:36px;height:36px;border-radius:50%;border:1px solid var(--border);background:${i<5?'var(--accent)':'transparent'};color:${i<5?'#fff':'var(--text-secondary)'};cursor:pointer;font-size:0.8rem;font-weight:600" onclick="this.style.background=this.style.background.includes('accent')?'transparent':'var(--accent)';this.style.color=this.style.color.includes('fff')?'var(--text-secondary)':'#fff'">${d}</button>`).join('')}
      </div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1.5rem">
      <button class="btn-primary" style="flex:1" onclick="showToast('◎','Horaires mis à jour','success');closeModal()">Appliquer</button>
      <button class="btn-secondary" onclick="closeModal()">${t('cancel')}</button>
    </div>
  `);
}
