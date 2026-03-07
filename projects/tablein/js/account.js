// ============================================================
//   TABLE·IN — ACCOUNT
// ============================================================

function openAccount(panel = 'reservations') {
  if (!currentUser) { openModal('modal-auth'); return; }
  renderAccount(panel);
  openModal('modal-account');
  // close user dropdown
  const drop = document.getElementById('user-drop');
  drop?.classList.add('hidden'); drop?.classList.remove('open');
}

function renderAccount(panel) {
  const upcoming = reservations.filter(r => new Date(r.date) >= new Date());
  const past = reservations.filter(r => new Date(r.date) < new Date());
  const unread = userNotifs.filter(n => n.unread).length;

  document.getElementById('account-inner').innerHTML = `
  <h2 style="font-family:var(--ff-disp);font-size:1.5rem;margin-bottom:1.5rem;color:var(--gold)">${t('myRes')}</h2>
  <div class="acct-layout">
    <nav class="acct-side">
      ${[
        ['reservations', t('myRes')],
        ['notifications', t('notifMenu') + (unread > 0 ? ` <span class="npill">${unread}</span>` : '')],
        ['profile', t('myProfile')],
        ['favourites', t('myFavs')],
      ].map(([k, label]) => `
        <button class="acct-nav-btn${panel === k ? ' anact' : ''}" onclick="switchAcctPanel('${k}')">
          <div class="acct-nav-dot"></div> ${label}
        </button>`).join('')}
    </nav>
    <div class="acct-panels">

      <!-- RESERVATIONS -->
      <div id="ap-reservations" class="acct-panel${panel==='reservations'?' apact':''}">
        <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text2);margin-bottom:1rem">${t('upcoming')}</div>
        ${upcoming.length > 0 ? upcoming.map(r => renderResCard(r)).join('') : `
          <div class="empty-state">
            <div class="es-ico">T</div>
            <div class="es-title">${t('noRes')}</div>
            <div class="es-sub">${t('noResSub')}</div>
            <button class="btn-fill" style="margin-top:1rem" onclick="closeModal('modal-account');startBooking()">${t('startRes')}</button>
          </div>`}

        ${past.length > 0 ? `
          <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);margin:1.5rem 0 1rem">${t('past')}</div>
          ${past.map(r => renderResCard(r, true)).join('')}` : ''}
      </div>

      <!-- NOTIFICATIONS -->
      <div id="ap-notifications" class="acct-panel${panel==='notifications'?' apact':''}">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
          <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text2)">${t('allNotifs')}</div>
          <button onclick="markAllRead()" style="font-size:.78rem;color:var(--gold);font-weight:600;background:none;border:none;cursor:pointer">${t('markRead')}</button>
        </div>
        ${userNotifs.length > 0 ? userNotifs.map(n => `
          <div class="notif-item${n.unread?' unr':''}" onclick="readNotif(${n.id},this)">
            <div class="ni-pip"></div>
            <div class="ni-body">
              <div class="ni-title">${n.title}</div>
              <div class="ni-text">${n.text}</div>
              <div class="ni-time">${n.time}</div>
            </div>
          </div>`).join('') : `<div class="empty-state"><div class="es-ico">N</div><div class="es-title">Aucune notification</div></div>`}
      </div>

      <!-- PROFILE -->
      <div id="ap-profile" class="acct-panel${panel==='profile'?' apact':''}">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;padding:1rem;background:var(--bg3);border-radius:var(--r2)">
          <div style="width:52px;height:52px;border-radius:50%;background:var(--gold-dim);border:2px solid var(--gold);display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;color:var(--gold);flex-shrink:0">${currentUser?.initials||'U'}</div>
          <div>
            <div style="font-weight:600;font-size:.95rem">${currentUser?.name||''}</div>
            <div style="font-size:.8rem;color:var(--text2)">${currentUser?.email||''}</div>
          </div>
        </div>
        <div class="field-row2">
          <div class="field-group"><label>${t('firstName')}</label><input type="text" id="prf-fn" value="${currentUser?.firstName||''}"/></div>
          <div class="field-group"><label>${t('lastName')}</label><input type="text" id="prf-ln" value="${currentUser?.lastName||''}"/></div>
        </div>
        <div class="field-group"><label>${t('email')}</label><input type="email" id="prf-em" value="${currentUser?.email||''}"/></div>
        <div class="field-group"><label>${t('phone')}</label><input type="tel" id="prf-ph" value="${currentUser?.phone||''}"/></div>
        <div class="field-group">
          <label>${t('prefLang')}</label>
          <select id="prf-lang">
            <option value="fr"${lang==='fr'?' selected':''}>🇫🇷 Français</option>
            <option value="en"${lang==='en'?' selected':''}>🇬🇧 English</option>
            <option value="de"${lang==='de'?' selected':''}>🇩🇪 Deutsch</option>
            <option value="es"${lang==='es'?' selected':''}>🇪🇸 Español</option>
          </select>
        </div>
        <div style="margin:1rem 0 .5rem;font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text2)">${t('notifPrefs')}</div>
        <label class="cb-label mb"><input type="checkbox" checked/> <span>Confirmations de réservation</span></label>
        <label class="cb-label mb"><input type="checkbox" checked/> <span>Rappel 24h avant</span></label>
        <label class="cb-label mb"><input type="checkbox"/> <span>Offres & événements</span></label>
        <div style="display:flex;gap:.75rem;margin-top:1.25rem">
          <button class="btn-fill" onclick="saveProfile()">${t('savePrf')}</button>
          <button class="btn-outline red-btn" onclick="doLogout();closeModal('modal-account')">${t('signout')}</button>
        </div>
      </div>

      <!-- FAVOURITES -->
      <div id="ap-favourites" class="acct-panel${panel==='favourites'?' apact':''}">
        ${favs.length > 0 ? favs.map(f => `
          <div class="fav-item">
            <div class="fav-ico">T</div>
            <div><div class="fav-name">${f.name}</div><div class="fav-type">${f.type}</div></div>
          </div>`).join('') : `
          <div class="empty-state">
            <div class="es-ico" style="font-style:italic">T</div>
            <div class="es-title">Aucun favori</div>
            <div class="es-sub">Retrouvez ici vos restaurants préférés.</div>
          </div>`}
      </div>

    </div>
  </div>`;

  // Mark notifications as read when panel opened
  if (panel === 'notifications') markAllRead(false);
}

function renderResCard(r, isPast = false) {
  const pillClass = {confirmed:'pill-ok', pending:'pill-pend', cancelled:'pill-can'}[r.status] || 'pill-pend';
  const pillText = t(r.status);
  return `
  <div class="res-card" style="${isPast?'opacity:.55':''}">
    <div class="res-ico">T</div>
    <div>
      <div class="res-name">Table·In · ${r.time}</div>
      <div class="res-detail">${r.date} · ${r.guests} conv. · ${r.table}</div>
      ${r.special ? `<div class="res-detail" style="color:var(--gold);font-size:.72rem;margin-top:2px">${r.special}</div>` : ''}
      <div class="res-ref">${r.ref}</div>
    </div>
    <div class="res-actions">
      <span class="pill ${pillClass}">${pillText}</span>
      ${!isPast && r.status !== 'cancelled' ? `<button class="cancel-link" onclick="cancelRes('${r.id}')">${t('cancel')}</button>` : ''}
    </div>
  </div>`;
}

function switchAcctPanel(panel) {
  document.querySelectorAll('.acct-panel').forEach(p => p.classList.remove('apact'));
  document.querySelectorAll('.acct-nav-btn').forEach(b => b.classList.remove('anact'));
  document.getElementById('ap-'+panel)?.classList.add('apact');
  document.querySelectorAll('.acct-nav-btn').forEach(b => {
    if (b.getAttribute('onclick')?.includes(`'${panel}'`)) b.classList.add('anact');
  });
  if (panel === 'notifications') markAllRead(false);
}

function cancelRes(id) {
  const r = reservations.find(x => x.id === id);
  if (r) { r.status = 'cancelled'; saveData(); renderAccount('reservations'); toast('warning','Annulée',`Réservation ${r.ref} annulée.`); }
}

function markAllRead(andSave = true) {
  userNotifs.forEach(n => n.unread = false);
  if (andSave) saveData();
  document.querySelectorAll('.notif-item').forEach(el => { el.classList.remove('unr'); });
  document.querySelectorAll('.ni-pip').forEach(p => p.style.background = 'var(--text3)');
  updateNavBadge();
}

function readNotif(id, el) {
  const n = userNotifs.find(x => x.id === id);
  if (n) { n.unread = false; saveData(); }
  el?.classList.remove('unr');
  updateNavBadge();
}

function saveProfile() {
  if (!currentUser) return;
  currentUser.firstName = document.getElementById('prf-fn')?.value || currentUser.firstName;
  currentUser.lastName  = document.getElementById('prf-ln')?.value || currentUser.lastName;
  currentUser.email     = document.getElementById('prf-em')?.value || currentUser.email;
  currentUser.phone     = document.getElementById('prf-ph')?.value || currentUser.phone;
  currentUser.name      = `${currentUser.firstName} ${currentUser.lastName}`.trim();
  currentUser.initials  = `${currentUser.firstName[0]||''}${currentUser.lastName[0]||''}`.toUpperCase();
  const newLang = document.getElementById('prf-lang')?.value;
  saveData();
  updateAuthUI();
  if (newLang && newLang !== lang) setLang(newLang);
  toast('success', t('savePrf'), 'Profil mis à jour.');
  renderAccount('profile');
}
