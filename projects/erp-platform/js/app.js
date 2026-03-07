/* ============================================
   NEXUS ERP — MAIN APP LOGIC
   ============================================ */

// ===== STATE =====
const APP = {
  user: null,
  currentPage: 'dashboard',
  sidebarOpen: false,
  theme: 'light',
  notifOpen: false,
  notifications: [],
  clients: [],
  team: [],
  invoices: [],
};

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('fade-out');
    setTimeout(() => {
      document.getElementById('loader').remove();
      checkAuth();
    }, 500);
  }, 2000);
  initNotifications();
  loadTheme();
});

function checkAuth() {
  const savedUser = sessionStorage.getItem('nexus_user');
  if (savedUser) {
    APP.user = JSON.parse(savedUser);
    showApp();
  } else {
    document.getElementById('authOverlay').classList.remove('hidden');
  }
}

// ===== AUTH =====
function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  if (!email || !password) { showToast(t('loginBtn'), 'Veuillez remplir tous les champs.', 'error'); return; }
  APP.user = { name: 'Jean Dupont', email, initials: 'JD', company: 'NEXUS Corp' };
  sessionStorage.setItem('nexus_user', JSON.stringify(APP.user));
  document.getElementById('authOverlay').classList.add('hidden');
  showToast('◎', t('loginSuccess'), 'success');
  showApp();
}

function handleDemoLogin() {
  APP.user = { name: 'Demo User', email: 'demo@nexus.io', initials: 'DU', company: 'Demo Corp' };
  sessionStorage.setItem('nexus_user', JSON.stringify(APP.user));
  document.getElementById('authOverlay').classList.add('hidden');
  showToast('◎', t('demoMode'), 'info');
  showApp();
}

function handleRegister() {
  APP.user = { name: 'Nouveau Compte', email: 'nouveau@nexus.io', initials: 'NC', company: 'Ma Société' };
  sessionStorage.setItem('nexus_user', JSON.stringify(APP.user));
  document.getElementById('authOverlay').classList.add('hidden');
  showToast('◎', t('loginSuccess'), 'success');
  showApp();
}

function handleLogout() {
  sessionStorage.removeItem('nexus_user');
  APP.user = null;
  document.getElementById('app').classList.add('hidden');
  document.getElementById('authOverlay').classList.remove('hidden');
  showToast('◎', t('logoutSuccess'), 'info');
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t, i) => {
    t.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register'));
  });
  document.getElementById('loginForm').classList.toggle('hidden', tab !== 'login');
  document.getElementById('registerForm').classList.toggle('hidden', tab !== 'register');
}

function showForgotPassword() {
  openModal(`
    <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:0.5rem;">Réinitialiser le mot de passe</h3>
    <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:1.5rem;">Entrez votre email pour recevoir un lien de réinitialisation.</p>
    <div class="form-group">
      <label>${t('email')}</label>
      <input type="email" class="form-input" placeholder="vous@entreprise.com">
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1.5rem;">
      <button class="btn-primary btn-full" onclick="showToast('◎','Email envoyé !','success');closeModal()">Envoyer</button>
    </div>
  `);
}

function showApp() {
  document.getElementById('app').classList.remove('hidden');
  if (APP.user) {
    document.getElementById('sidebarAvatar').textContent = APP.user.initials;
    document.getElementById('sidebarName').textContent = APP.user.name;
    document.getElementById('topbarAvatar').textContent = APP.user.initials;
  }
  navigateTo('dashboard', document.querySelector('.nav-item.active'));
  applyTranslations();
}

window.refreshCurrentPage = function() {
  navigateTo(APP.currentPage, null, true);
};

// ===== NAVIGATION =====
function navigateTo(page, el, silent = false) {
  APP.currentPage = page;
  if (el) {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
  }
  const pageContent = document.getElementById('pageContent');
  pageContent.style.animation = 'none';
  pageContent.offsetHeight;
  pageContent.style.animation = '';

  const titles = {
    dashboard: t('dashboard'), analytics: t('analytics'),
    calendar: t('calendar'), availability: t('availability'),
    clients: t('clients'), team: t('team'),
    payments: t('payments'), invoices: t('invoices'),
    reports: t('reports'), settings: t('settingsNav')
  };
  document.getElementById('pageTitle').textContent = titles[page] || page;

  const renderers = {
    dashboard: renderDashboard, analytics: renderAnalytics,
    calendar: renderCalendar, availability: renderAvailability,
    clients: renderClients, team: renderTeam,
    payments: renderPayments, invoices: renderInvoices,
    reports: renderReports, settings: renderSettings
  };

  if (renderers[page]) {
    pageContent.innerHTML = renderers[page]();
    if (page === 'calendar') initCalendar();
    if (page === 'availability') initAvailability();
    if (page === 'analytics') initCharts();
    if (page === 'dashboard') initDashboardCharts();
  }

  // Close sidebar on mobile
  if (window.innerWidth <= 768) closeSidebar();
}

// ===== SIDEBAR =====
function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  const isOpen   = sidebar.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('visible', isOpen);
}
function closeSidebar() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarBackdrop')?.classList.remove('visible');
}

// ===== THEME =====
function loadTheme() {
  const saved = localStorage.getItem('nexus_theme') || 'light';
  APP.theme = saved;
  document.documentElement.setAttribute('data-theme', saved);
}
function toggleTheme() {
  APP.theme = APP.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', APP.theme);
  localStorage.setItem('nexus_theme', APP.theme);
}

// ===== NOTIFICATIONS =====
function initNotifications() {
  APP.notifications = [
    { id: 1, title: 'notif1Title', msg: 'notif1Msg', time: 'Il y a 5 min', type: 'payment', read: false },
    { id: 2, title: 'notif2Title', msg: 'notif2Msg', time: 'Il y a 1h', type: 'booking', read: false },
    { id: 3, title: 'notif3Title', msg: 'notif3Msg', time: 'Il y a 3h', type: 'alert', read: false },
    { id: 4, title: 'notif4Title', msg: 'notif4Msg', time: 'Hier', type: 'client', read: false },
  ];
  renderNotifications();
}

function renderNotifications() {
  const list = document.getElementById('notifList');
  const count = APP.notifications.filter(n => !n.read).length;
  document.getElementById('notifCount').textContent = count;
  if (!list) return;
  list.innerHTML = APP.notifications.map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}" onclick="readNotif(${n.id})">
      <div class="notif-dot ${n.read ? 'read' : ''}"></div>
      <div>
        <div class="notif-title">${t(n.title)}</div>
        <div class="notif-msg">${t(n.msg)}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

function readNotif(id) {
  const n = APP.notifications.find(n => n.id === id);
  if (n) n.read = true;
  renderNotifications();
}

function markAllRead() {
  APP.notifications.forEach(n => n.read = true);
  renderNotifications();
}

function toggleNotifPanel() {
  APP.notifOpen = !APP.notifOpen;
  document.getElementById('notifPanel').classList.toggle('hidden', !APP.notifOpen);
  renderNotifications();
}

// Close notif panel when clicking outside
document.addEventListener('click', (e) => {
  const panel = document.getElementById('notifPanel');
  const btn = document.querySelector('.notif-btn');
  if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
    APP.notifOpen = false;
    panel.classList.add('hidden');
  }
});

// ===== MODAL =====
function openModal(content) {
  document.getElementById('modalContent').innerHTML = content;
  document.getElementById('modal').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ===== TOASTS =====
function showToast(icon, message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-fade');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ===== MOCK DATA =====
const MOCK_DATA = {
  clients: [
    { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', phone: '+33 1 42 00 11 22', status: 'active', revenue: '24 500€', initials: 'AC', color: '#2D4A3E' },
    { id: 2, name: 'Vivaldi & Partners', email: 'info@vivaldi.fr', phone: '+33 6 77 88 99 00', status: 'active', revenue: '18 200€', initials: 'VP', color: '#C8873A' },
    { id: 3, name: 'Studio Helix', email: 'hello@helix.io', phone: '+33 1 55 66 77 88', status: 'pending', revenue: '7 800€', initials: 'SH', color: '#6B7280' },
    { id: 4, name: 'FinTech Nova', email: 'bd@fintechnova.com', phone: '+33 4 91 00 22 33', status: 'inactive', revenue: '2 100€', initials: 'FN', color: '#E05C4B' },
    { id: 5, name: 'Groupe Meridian', email: 'contact@meridian.fr', phone: '+33 3 88 44 55 66', status: 'active', revenue: '41 000€', initials: 'GM', color: '#3D6355' },
    { id: 6, name: 'Luxe Immobilier', email: 'contact@luxeimmo.fr', phone: '+33 1 40 22 33 44', status: 'active', revenue: '35 600€', initials: 'LI', color: '#8B5CF6' },
  ],
  team: [
    { id: 1, name: 'Sophie Laurent', role: 'Chef de projet', email: 's.laurent@nexus.io', dept: 'Gestion', initials: 'SL', color: '#2D4A3E' },
    { id: 2, name: 'Marc Dubois', role: 'Développeur senior', email: 'm.dubois@nexus.io', dept: 'Tech', initials: 'MD', color: '#C8873A' },
    { id: 3, name: 'Clara Fontaine', role: 'Designer UX', email: 'c.fontaine@nexus.io', dept: 'Design', initials: 'CF', color: '#8B5CF6' },
    { id: 4, name: 'Thomas Lebrun', role: 'Directeur commercial', email: 't.lebrun@nexus.io', dept: 'Ventes', initials: 'TL', color: '#E05C4B' },
    { id: 5, name: 'Amélie Morin', role: 'Comptable', email: 'a.morin@nexus.io', dept: 'Finance', initials: 'AM', color: '#27AE60' },
    { id: 6, name: 'Hugo Renard', role: 'Support client', email: 'h.renard@nexus.io', dept: 'Support', initials: 'HR', color: '#3D6355' },
  ],
  invoices: [
    { id: '#1045', client: 'Acme Corporation', date: '01/03/2026', due: '31/03/2026', amount: '4 800€', status: 'pending' },
    { id: '#1044', client: 'Groupe Meridian', date: '28/02/2026', due: '28/03/2026', amount: '8 200€', status: 'paid' },
    { id: '#1043', client: 'Vivaldi & Partners', date: '22/02/2026', due: '22/03/2026', amount: '3 150€', status: 'paid' },
    { id: '#1042', client: 'Studio Helix', date: '15/02/2026', due: '15/03/2026', amount: '1 900€', status: 'overdue' },
    { id: '#1041', client: 'FinTech Nova', date: '10/02/2026', due: '10/03/2026', amount: '2 600€', status: 'paid' },
    { id: '#1040', client: 'Luxe Immobilier', date: '05/02/2026', due: '05/03/2026', amount: '6 400€', status: 'paid' },
  ],
  transactions: [
    { id: 'TXN-8821', from: 'Acme Corp', amount: '+2 400€', date: '07/03/2026', method: 'Carte', status: 'confirmed' },
    { id: 'TXN-8820', from: 'Vivaldi & Partners', amount: '+1 800€', date: '06/03/2026', method: 'Virement', status: 'confirmed' },
    { id: 'TXN-8819', from: 'Studio Helix', amount: '+950€', date: '05/03/2026', method: 'PayPal', status: 'pending' },
    { id: 'TXN-8818', from: 'Groupe Meridian', amount: '+5 200€', date: '04/03/2026', method: 'Virement', status: 'confirmed' },
    { id: 'TXN-8817', from: 'FinTech Nova', amount: '-320€', date: '03/03/2026', method: 'Carte', status: 'cancelled' },
  ]
};
