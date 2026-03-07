// ============================================================
//   TABLE·IN — ADMIN PANEL
// ============================================================

let adminTab = 'reservations';

const TABLE_AVAIL = [
  { id:'T1', name:'Table 1', capacity:2, zone:'Alcôve', avail:true },
  { id:'T2', name:'Table 2', capacity:2, zone:'Alcôve', avail:true },
  { id:'T3', name:'Table 3', capacity:4, zone:'Salle principale', avail:true },
  { id:'T4', name:'Table 4', capacity:4, zone:'Salle principale', avail:false },
  { id:'T5', name:'Table 5', capacity:4, zone:'Salle principale', avail:true },
  { id:'T6', name:'Table 6', capacity:6, zone:'Salle panoramique', avail:true },
  { id:'T7', name:'Table 7', capacity:6, zone:'Salle panoramique', avail:false },
  { id:'T8', name:'Salon VIP', capacity:12, zone:'Salon privé', avail:true },
];

let tableAvail = JSON.parse(localStorage.getItem('tin_tables')) || TABLE_AVAIL;
function saveTableAvail() { localStorage.setItem('tin_tables', JSON.stringify(tableAvail)); }

function openAdminPanel() {
  if (!currentUser?.isAdmin) { toast('error','Accès refusé','Réservé aux administrateurs.'); return; }
  renderAdmin(adminTab);
  openModal('modal-admin');
  const drop = document.getElementById('user-drop');
  drop?.classList.add('hidden'); drop?.classList.remove('open');
}

function renderAdmin(tab) {
  adminTab = tab;
  const today = new Date().toISOString().split('T')[0];
  const todayRes = reservations.filter(r => r.date === today);
  const totalGuests = todayRes.reduce((s, r) => s + (r.guests || 0), 0);
  const availTables = tableAvail.filter(t => t.avail).length;
  const revenue = reservations.reduce((s, r) => s + (r.price || 0), 0);

  document.getElementById('admin-inner').innerHTML = `
  <div class="admin-header">
    <h2 style="font-family:var(--ff-disp);font-size:1.5rem;color:var(--gold)">${t('adminTitle')}</h2>
    <div style="font-size:.8rem;color:var(--text2)">${new Date().toLocaleDateString(lang)}</div>
  </div>

  <div class="admin-stats">
    <div class="as-card"><div class="as-val">${todayRes.length}</div><div class="as-label">${t('todayRes')}</div></div>
    <div class="as-card"><div class="as-val">${totalGuests}</div><div class="as-label">${t('totalGuests')}</div></div>
    <div class="as-card"><div class="as-val">${availTables}/8</div><div class="as-label">${t('availTables')}</div></div>
    <div class="as-card"><div class="as-val">${revenue > 0 ? revenue+'€' : '—'}</div><div class="as-label">${t('revenue')}</div></div>
  </div>

  <div class="admin-tabs">
    <button class="at-btn${tab==='reservations'?' atact':''}" onclick="renderAdmin('reservations')">${t('allRes')}</button>
    <button class="at-btn${tab==='tables'?' atact':''}" onclick="renderAdmin('tables')">${t('tablesMgmt')}</button>
    <button class="at-btn${tab==='availability'?' atact':''}" onclick="renderAdmin('availability')">${t('availability')}</button>
  </div>

  <div style="margin-top:1.25rem;overflow-x:auto">
    ${tab === 'reservations' ? renderAdminReservations() : ''}
    ${tab === 'tables' ? renderAdminTables() : ''}
    ${tab === 'availability' ? renderAdminAvailability() : ''}
  </div>`;
}

function renderAdminReservations() {
  const today = new Date().toISOString().split('T')[0];
  const all = [...reservations].sort((a,b) => new Date(b.date) - new Date(a.date));
  return `
  <table class="admin-table">
    <thead>
      <tr>
        <th>Réf.</th>
        <th>${t('date')}</th>
        <th>${t('time')}</th>
        <th>${t('guests')}</th>
        <th>Table</th>
        <th>Statut</th>
        <th>Demandes</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${all.map(r => {
        const pillClass = {confirmed:'pill-ok',pending:'pill-pend',cancelled:'pill-can'}[r.status]||'pill-pend';
        return `<tr>
          <td style="font-size:.72rem;color:var(--text3)">${r.ref}</td>
          <td>${r.date} ${r.date === today ? '<span class="pill pill-ok" style="font-size:.65rem">Aujourd\'hui</span>' : ''}</td>
          <td>${r.time||'—'}</td>
          <td>${r.guests||'—'}</td>
          <td>${r.table||'—'}</td>
          <td><span class="pill ${pillClass}">${t(r.status)}</span></td>
          <td style="max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.75rem;color:var(--gold)">${r.special||'—'}</td>
          <td>
            ${r.status !== 'cancelled' ? `<button onclick="adminCancel('${r.id}')" style="font-size:.72rem;color:var(--red);background:none;border:none;cursor:pointer;text-decoration:underline">${t('cancel')}</button>` : ''}
            ${r.status === 'pending' ? `<button onclick="adminConfirm('${r.id}')" style="font-size:.72rem;color:var(--green);background:none;border:none;cursor:pointer;text-decoration:underline;margin-left:5px">Confirmer</button>` : ''}
          </td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>`;
}

function renderAdminTables() {
  return `
  <table class="admin-table">
    <thead>
      <tr><th>Table</th><th>Capacité</th><th>Zone</th><th>Disponible</th><th>Action</th></tr>
    </thead>
    <tbody>
      ${tableAvail.map(tb => `
        <tr>
          <td style="font-weight:600">${tb.name}</td>
          <td>${tb.capacity} pers.</td>
          <td>${tb.zone}</td>
          <td>
            <label class="avail-toggle">
              <input type="checkbox" ${tb.avail?'checked':''} onchange="toggleTable('${tb.id}',this.checked)"/>
              <div class="avail-track"></div>
            </label>
          </td>
          <td style="font-size:.78rem;color:${tb.avail?'var(--green)':'var(--red)'}">${tb.avail?'Disponible':'Indisponible'}</td>
        </tr>`).join('')}
    </tbody>
  </table>`;
}

function renderAdminAvailability() {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    days.push(d.toISOString().split('T')[0]);
  }
  const allSlots = [...TIME_SLOTS.lunch, ...TIME_SLOTS.dinner];
  const blockedKey = 'tin_blocked';
  const blocked = JSON.parse(localStorage.getItem(blockedKey) || '{}');

  return `
  <p style="font-size:.8rem;color:var(--text2);margin-bottom:1rem">Cliquez sur un créneau pour le bloquer / débloquer.</p>
  <div style="overflow-x:auto">
    <table class="admin-table" style="min-width:700px">
      <thead>
        <tr>
          <th>${t('time')}</th>
          ${days.map(d => `<th style="font-size:.68rem">${d.slice(5)}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${allSlots.map(s => `
          <tr>
            <td style="font-weight:600;color:var(--gold)">${s}</td>
            ${days.map(d => {
              const key = d+'_'+s;
              const isBlocked = blocked[key];
              const resCount = reservations.filter(r => r.date === d && r.time === s && r.status !== 'cancelled').length;
              return `<td>
                <button onclick="toggleSlotBlock('${d}','${s}')"
                  style="padding:4px 8px;font-size:.68rem;border-radius:6px;cursor:pointer;
                    background:${isBlocked?'rgba(192,57,43,.15)':resCount>0?'rgba(39,174,96,.15)':'var(--surface2)'};
                    border:1px solid ${isBlocked?'rgba(192,57,43,.3)':resCount>0?'rgba(39,174,96,.3)':'var(--border)'};
                    color:${isBlocked?'var(--red)':resCount>0?'var(--green)':'var(--text3)'}">
                  ${isBlocked ? 'Bloqué' : resCount > 0 ? `${resCount} rés.` : 'Libre'}
                </button>
              </td>`;
            }).join('')}
          </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function adminCancel(id) {
  const r = reservations.find(x => x.id === id);
  if (r) { r.status = 'cancelled'; saveData(); renderAdmin(adminTab); toast('warning','Annulée',`${r.ref} annulée.`); }
}

function adminConfirm(id) {
  const r = reservations.find(x => x.id === id);
  if (r) { r.status = 'confirmed'; saveData(); renderAdmin(adminTab); toast('success','Confirmée',`${r.ref} confirmée.`); }
}

function toggleTable(id, avail) {
  const tb = tableAvail.find(t => t.id === id);
  if (tb) { tb.avail = avail; saveTableAvail(); }
}

function toggleSlotBlock(date, time) {
  const blockedKey = 'tin_blocked';
  const blocked = JSON.parse(localStorage.getItem(blockedKey) || '{}');
  const key = date+'_'+time;
  if (blocked[key]) delete blocked[key];
  else blocked[key] = true;
  localStorage.setItem(blockedKey, JSON.stringify(blocked));
  renderAdmin('availability');
}
