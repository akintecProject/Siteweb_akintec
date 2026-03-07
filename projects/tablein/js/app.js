// ============================================================
//   TABLE·IN — MAIN APP
// ============================================================

let qbGuests = 2;
let currentMenuTab = 'entrees';

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  setDefaultDates();
  renderMenu('entrees');
  renderEvents();
  renderReviews();
  updateAuthUI();

  // Scroll highlight navbar
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 80);
  });

  // Escape key closes modals
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllModals(); });
});

// ============ NAVBAR ============
function initNav() {
  // Close user dropdown on outside click
  document.addEventListener('click', (e) => {
    const drop = document.getElementById('user-drop');
    const btn = document.getElementById('avatar-btn');
    if (drop && btn && !drop.contains(e.target) && !btn.contains(e.target)) {
      drop.classList.remove('open');
      drop.classList.add('hidden');
    }
  });
}

function toggleNav() {
  const links = document.getElementById('nav-links');
  const burger = document.getElementById('hamburger');
  links.classList.toggle('open');
  burger.classList.toggle('open');
}

function toggleUserDrop() {
  const drop = document.getElementById('user-drop');
  drop.classList.toggle('open');
  drop.classList.toggle('hidden');
}

// ============ AUTH UI ============
function updateAuthUI() {
  const guestZone = document.getElementById('user-zone-guest');
  const loggedZone = document.getElementById('user-zone-logged');
  const initEl = document.getElementById('avatar-initials');
  const nameEl = document.getElementById('ud-name');
  const emailEl = document.getElementById('ud-email');
  const adminBtn = document.getElementById('admin-btn');

  if (currentUser) {
    guestZone.classList.add('hidden');
    loggedZone.classList.remove('hidden');
    if (initEl) initEl.textContent = currentUser.initials || 'U';
    if (nameEl) nameEl.textContent = currentUser.name || '';
    if (emailEl) emailEl.textContent = currentUser.email || '';
    if (adminBtn && currentUser.isAdmin) adminBtn.classList.remove('hidden');
    updateNavBadge();
  } else {
    guestZone.classList.remove('hidden');
    loggedZone.classList.add('hidden');
  }
}

function updateNavBadge() {
  const pip = document.getElementById('notif-pip');
  const badge = document.getElementById('ud-notif-badge');
  const unread = userNotifs.filter(n => n.unread).length;
  if (pip) pip.classList.toggle('hidden', unread === 0);
  if (badge) {
    badge.textContent = unread;
    badge.classList.toggle('hidden', unread === 0);
  }
}

// ============ MODALS ============
function openModal(id) {
  document.getElementById('overlay').classList.remove('hidden');
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  const open = document.querySelectorAll('.modal:not(.hidden)').length;
  if (!open) {
    document.getElementById('overlay').classList.add('hidden');
    document.body.style.overflow = '';
  }
}
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  document.getElementById('overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

// ============ AUTH ============
function switchTab(btn, tab) {
  document.querySelectorAll('.mtab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.getElementById(`form-${tab}`).classList.add('active');
}

function doLogin(e) {
  e.preventDefault();
  const email = document.getElementById('l-email').value;
  const password = document.getElementById('l-password').value;
  if (!email || !password) return;

  // Simulate login — admin if email contains 'admin'
  currentUser = {
    email,
    name: email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g, c => c.toUpperCase()),
    firstName: email.split('@')[0].split(/[._]/)[0].replace(/\b\w/g, c => c.toUpperCase()),
    lastName: '',
    initials: email.slice(0,2).toUpperCase(),
    isAdmin: email.toLowerCase().includes('admin'),
  };
  currentUser.initials = currentUser.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();

  saveData();
  updateAuthUI();
  closeModal('modal-auth');
  toast('success', t('loginOk'), t('loginOkMsg'));
}

function doRegister(e) {
  e.preventDefault();
  const fn = document.getElementById('r-fname').value;
  const ln = document.getElementById('r-lname').value;
  const email = document.getElementById('r-email').value;
  const pw = document.getElementById('r-password').value;
  const cpw = document.getElementById('r-confirm').value;
  const phone = document.getElementById('r-phone').value;

  if (pw !== cpw) { toast('error', 'Erreur', t('passErr')); return; }

  currentUser = {
    email, firstName: fn, lastName: ln, phone,
    name: `${fn} ${ln}`.trim(),
    initials: `${fn[0]}${ln[0]||''}`.toUpperCase(),
    isAdmin: false,
  };
  saveData();
  updateAuthUI();
  closeModal('modal-auth');
  toast('success', t('regOk'), t('regOkMsg'));
}

function doLogout() {
  currentUser = null;
  localStorage.removeItem('tin_user');
  updateAuthUI();
  const drop = document.getElementById('user-drop');
  drop.classList.add('hidden'); drop.classList.remove('open');
  toast('info', 'Au revoir', 'Vous avez été déconnecté.');
}

function socialLogin() {
  currentUser = { email:'demo@gmail.com', name:'Demo User', firstName:'Demo', lastName:'User', initials:'DU', isAdmin: false };
  saveData(); updateAuthUI(); closeModal('modal-auth');
  toast('success', t('loginOk'), t('loginOkMsg'));
}

function togglePw(id, btn) {
  const input = document.getElementById(id);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'text' ? '●' : '◉';
}

function checkStrength(input) {
  const pw = input.value;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const c = score <= 1 ? 'w' : score <= 2 ? 'm' : 's';
  const container = document.getElementById('strength-bars');
  if (container) container.innerHTML = Array(4).fill(0).map((_, i) =>
    `<div class="sb${i < score ? ' '+c : ''}"></div>`).join('');
}

// ============ QUICk BOOK BAR ============
function qbGuests(d) {
  qbGuests = Math.max(1, Math.min(12, (typeof qbGuests === 'number' ? qbGuests : 2) + d));
  const el = document.getElementById('qb-guests-n');
  if (el) el.textContent = qbGuests;
}
// Fix: qbGuests used as both var and function name — rename
let qbGuestCount = 2;
function qbGuests(d) { // eslint-disable-line no-func-assign
  qbGuestCount = Math.max(1, Math.min(12, qbGuestCount + d));
  document.getElementById('qb-guests-n').textContent = qbGuestCount;
}

function qbSync() {
  // Just keep values synced
}

function startBookingFromBar() {
  const date = document.getElementById('qb-date').value;
  const time = document.getElementById('qb-time').value;
  startBooking({ date, time, guests: qbGuestCount });
}

function setDefaultDates() {
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const fmt = d => d.toISOString().split('T')[0];
  const qbd = document.getElementById('qb-date');
  if (qbd) { qbd.value = fmt(tomorrow); qbd.min = fmt(new Date()); }
}

// ============ MENU ============
function renderMenu(tab) {
  currentMenuTab = tab;
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  const items = MENU_DATA[tab] || [];
  grid.innerHTML = items.map(item => `
    <div class="menu-item">
      <div class="mi-letter">${item.letter}</div>
      <div class="mi-body">
        <div class="mi-name">${item.name}</div>
        <div class="mi-desc">${item.desc}</div>
        <div class="mi-footer">
          <div class="mi-price">${item.price}</div>
          ${item.tag ? `<span class="mi-tag">${item.tag}</span>` : ''}
        </div>
      </div>
    </div>`).join('');
}

function switchMenuTab(btn, tab) {
  document.querySelectorAll('.mt-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenu(tab);
}

// ============ EVENTS ============
function renderEvents() {
  const grid = document.getElementById('events-grid');
  if (!grid) return;
  grid.innerHTML = EVENTS_DATA.map(ev => `
    <div class="event-card">
      <div class="ev-date">${ev.date}</div>
      <div class="ev-title">${ev.title}</div>
      <div class="ev-desc">${ev.desc}</div>
      <div class="ev-footer">
        <div class="ev-price">${ev.price}</div>
        <div class="ev-seats">${ev.seats}</div>
      </div>
    </div>`).join('');
}

// ============ REVIEWS ============
let reviewPage = 0;
function renderReviews() {
  const track = document.getElementById('reviews-track');
  const dots  = document.getElementById('reviews-dots');
  if (!track) return;

  track.innerHTML = REVIEWS_DATA.map(rv => `
    <div class="review-card">
      <div class="rv-stars">${'★'.repeat(rv.stars)}</div>
      <div class="rv-text">${rv.text}</div>
      <div class="rv-author">
        <div class="rv-av">${rv.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
        <div>
          <div class="rv-name">${rv.name}</div>
          <div class="rv-meta">${rv.meta}</div>
        </div>
      </div>
    </div>`).join('');

  if (dots) {
    dots.innerHTML = REVIEWS_DATA.map((_,i) =>
      `<div class="rdot${i===0?' active':''}" onclick="scrollReview(${i})"></div>`).join('');
    track.addEventListener('scroll', updateReviewDots);
  }
}

function scrollReview(i) {
  const track = document.getElementById('reviews-track');
  const cards = track.querySelectorAll('.review-card');
  if (cards[i]) cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
}

function updateReviewDots() {
  const track = document.getElementById('reviews-track');
  const dots = document.querySelectorAll('.rdot');
  const cardWidth = track.querySelector('.review-card')?.offsetWidth + 20 || 340;
  const idx = Math.round(track.scrollLeft / cardWidth);
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
}

// ============ TOAST ============
function toast(type, title, msg, duration = 4200) {
  const stack = document.getElementById('toast-stack');
  const icons = { success: '✓', error: '✕', warning: '!', info: 'i' };
  const el = document.createElement('div');
  el.className = `toast t-${type}`;
  el.innerHTML = `
    <div class="toast-ico">${icons[type]||'i'}</div>
    <div class="toast-body"><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div></div>
    <button class="toast-close" onclick="dismissToast(this)">✕</button>`;
  stack.appendChild(el);
  setTimeout(() => dismissToast(el.querySelector('.toast-close')), duration);
}

function dismissToast(btn) {
  const el = btn.closest ? btn.closest('.toast') : btn;
  if (!el) return;
  el.classList.add('toast-out');
  setTimeout(() => el.remove(), 300);
}
