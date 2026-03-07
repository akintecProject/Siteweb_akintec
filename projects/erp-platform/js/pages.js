/* ============================================
   NEXUS ERP — PAGE RENDERERS
   ============================================ */

// ===== DASHBOARD =====
function renderDashboard() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h2>${t('dashboard')}</h2>
        <p>${new Date().toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : currentLang === 'de' ? 'de-DE' : currentLang === 'es' ? 'es-ES' : 'en-GB', {weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
      </div>
      <div class="page-actions">
        <button class="btn-secondary btn-sm" onclick="showToast('◎','${t('export')}...','info')">${t('export')}</button>
        <button class="btn-primary btn-sm" onclick="navigateTo('calendar',null)">${t('newBooking')}</button>
      </div>
    </div>

    <div class="dashboard-grid">
      <div class="kpi-card">
        <div class="kpi-label">${t('totalRevenue')}</div>
        <div class="kpi-value" id="kpiRev">128 400€</div>
        <div class="kpi-change up">▲ +12.4% ${t('vsLastMonth')}</div>
        <div class="kpi-icon">◈</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">${t('activeClients')}</div>
        <div class="kpi-value" id="kpiClients">247</div>
        <div class="kpi-change up">▲ +8 ${t('vsLastMonth')}</div>
        <div class="kpi-icon">◉</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">${t('bookings')}</div>
        <div class="kpi-value" id="kpiBook">58</div>
        <div class="kpi-change down">▼ -3% ${t('vsLastMonth')}</div>
        <div class="kpi-icon">▦</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">${t('teamMembers')}</div>
        <div class="kpi-value" id="kpiTeam">24</div>
        <div class="kpi-change up">▲ +2 ${t('vsLastMonth')}</div>
        <div class="kpi-icon">◫</div>
      </div>
    </div>

    <div class="dashboard-main-grid">
      <div class="card">
        <div class="card-header">
          <span class="card-title">${t('revenueOverview')}</span>
          <div style="display:flex;gap:0.5rem;">
            <span style="display:flex;align-items:center;gap:0.3rem;font-size:0.72rem;color:var(--text-muted)"><span style="width:10px;height:10px;border-radius:2px;background:var(--accent);display:inline-block"></span>2026</span>
            <span style="display:flex;align-items:center;gap:0.3rem;font-size:0.72rem;color:var(--text-muted)"><span style="width:10px;height:10px;border-radius:2px;background:var(--accent2);display:inline-block"></span>2025</span>
          </div>
        </div>
        <div class="card-body">
          <div class="bar-chart" id="revenueChart"></div>
          <div class="chart-labels-x" id="revLabels"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <span class="card-title">${t('quickStats')}</span>
        </div>
        <div class="card-body">
          <div class="quick-stats">
            <div class="qs-item">
              <span class="qs-label">${t('totalReceived')}</span>
              <span class="qs-badge green">+14%</span>
            </div>
            <div class="qs-item">
              <span class="qs-label">${t('totalPending')}</span>
              <span class="qs-val">9 400€</span>
            </div>
            <div class="qs-item">
              <span class="qs-label">${t('totalOverdue')}</span>
              <span class="qs-badge red">1 900€</span>
            </div>
            <div class="qs-item">
              <span class="qs-label">${t('bookings')}</span>
              <span class="qs-badge orange">3 ${t('pending')}</span>
            </div>
          </div>
          <div style="margin-top:1.5rem;">
            <div style="font-size:0.8rem;font-weight:600;margin-bottom:0.75rem;color:var(--text-secondary)">Répartition</div>
            <div class="donut-wrap">
              <svg class="donut-svg" viewBox="0 0 100 100" id="donutChart">
                <circle cx="50" cy="50" r="35" fill="none" stroke="var(--border)" stroke-width="12"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke="var(--accent)" stroke-width="12" stroke-dasharray="88 132" stroke-dashoffset="0" transform="rotate(-90 50 50)" style="transition:stroke-dasharray 1s ease"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke="var(--accent2)" stroke-width="12" stroke-dasharray="44 176" stroke-dashoffset="-88" transform="rotate(-90 50 50)"/>
                <circle cx="50" cy="50" r="35" fill="none" stroke="var(--success)" stroke-width="12" stroke-dasharray="22 198" stroke-dashoffset="-132" transform="rotate(-90 50 50)"/>
              </svg>
              <div class="donut-legend">
                <div class="legend-item"><div class="legend-dot" style="background:var(--accent)"></div><span class="legend-label">${t('activeClients')}</span><span class="legend-val">40%</span></div>
                <div class="legend-item"><div class="legend-dot" style="background:var(--accent2)"></div><span class="legend-label">${t('invoices')}</span><span class="legend-val">20%</span></div>
                <div class="legend-item"><div class="legend-dot" style="background:var(--success)"></div><span class="legend-label">${t('payments')}</span><span class="legend-val">10%</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-bottom-grid">
      <div class="card" style="grid-column: 1 / -1;">
        <div class="card-header">
          <span class="card-title">${t('recentActivity')}</span>
          <a href="#" class="card-action" onclick="navigateTo('analytics',null);return false">${t('viewAll')}</a>
        </div>
        <div class="card-body">
          <div class="activity-list">
            <div class="activity-item"><div class="activity-dot type-payment"></div><div class="activity-content"><div class="activity-text">Paiement de <strong>2 400€</strong> reçu de Acme Corp.</div><div class="activity-time">Il y a 5 min</div></div></div>
            <div class="activity-item"><div class="activity-dot type-booking"></div><div class="activity-content"><div class="activity-text">Nouvelle réservation pour le <strong>15 mars 2026</strong> — M. Thomas Bernard</div><div class="activity-time">Il y a 32 min</div></div></div>
            <div class="activity-item"><div class="activity-dot"></div><div class="activity-content"><div class="activity-text">Nouveau client <strong>Luxe Immobilier</strong> inscrit</div><div class="activity-time">Il y a 1h</div></div></div>
            <div class="activity-item"><div class="activity-dot type-alert"></div><div class="activity-content"><div class="activity-text">Facture <strong>#1042</strong> en retard — Studio Helix</div><div class="activity-time">Il y a 3h</div></div></div>
            <div class="activity-item"><div class="activity-dot type-payment"></div><div class="activity-content"><div class="activity-text">Virement de <strong>8 200€</strong> reçu — Groupe Meridian</div><div class="activity-time">Hier 16:45</div></div></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function initDashboardCharts() {
  const months = currentLang === 'fr'
    ? ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
    : currentLang === 'de'
    ? ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez']
    : currentLang === 'es'
    ? ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
    : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const data2026 = [62,78,55,90,84,71,95,88,102,76,108,128];
  const data2025 = [48,62,50,72,68,60,78,74,88,65,92,110];
  const maxVal = 130;
  const chart = document.getElementById('revenueChart');
  const labels = document.getElementById('revLabels');
  if (!chart) return;

  chart.innerHTML = data2026.map((v, i) => `
    <div class="bar-item">
      <div class="bar-fill secondary" style="height:0" data-target="${(data2025[i]/maxVal*180).toFixed(0)}px" data-val="${data2025[i]}k€"></div>
      <div class="bar-fill" style="height:0" data-target="${(v/maxVal*180).toFixed(0)}px" data-val="${v}k€"></div>
    </div>
  `).join('');

  labels.innerHTML = months.map(m => `<span>${m}</span>`).join('');

  setTimeout(() => {
    chart.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.height = bar.dataset.target;
    });
  }, 100);
}

// ===== ANALYTICS =====
function renderAnalytics() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h2>${t('analyticsTitle')}</h2>
        <p>${t('analyticsDesc')}</p>
      </div>
      <div class="page-actions">
        <select class="form-input" style="width:auto;padding:0.5rem 1rem">
          <option>Janvier — Mars 2026</option>
          <option>Octobre — Décembre 2025</option>
          <option>2025 complet</option>
        </select>
        <button class="btn-primary btn-sm" onclick="showToast('◎','Rapport généré','success')">${t('export')}</button>
      </div>
    </div>
    <div class="analytics-header-grid">
      <div class="kpi-card"><div class="kpi-label">Taux de conversion</div><div class="kpi-value">34.2%</div><div class="kpi-change up">▲ +2.1%</div></div>
      <div class="kpi-card"><div class="kpi-label">Panier moyen</div><div class="kpi-value">3 840€</div><div class="kpi-change up">▲ +310€</div></div>
      <div class="kpi-card"><div class="kpi-label">NPS Score</div><div class="kpi-value">72</div><div class="kpi-change up">▲ +4 pts</div></div>
      <div class="kpi-card"><div class="kpi-label">Taux d'annulation</div><div class="kpi-value">4.8%</div><div class="kpi-change down">▼ -1.2%</div></div>
    </div>
    <div class="analytics-main-grid">
      <div class="card">
        <div class="card-header"><span class="card-title">Évolution des revenus (12 mois)</span></div>
        <div class="card-body">
          <div class="line-chart-wrap">
            <svg id="lineChart" class="chart-line-svg" viewBox="0 0 600 200" preserveAspectRatio="none"></svg>
          </div>
          <div class="chart-labels-x" id="lineLabels"></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Sources de revenus</span></div>
        <div class="card-body">
          ${renderProgressBars()}
        </div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div class="card">
        <div class="card-header"><span class="card-title">Clients par secteur</span></div>
        <div class="card-body">
          <div class="donut-wrap" style="align-items:center">
            <svg viewBox="0 0 100 100" width="120" height="120">
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--border)" stroke-width="10"/>
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--accent)" stroke-width="10" stroke-dasharray="96 143" stroke-dashoffset="0" transform="rotate(-90 50 50)"/>
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--accent2)" stroke-width="10" stroke-dasharray="57 182" stroke-dashoffset="-96" transform="rotate(-90 50 50)"/>
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--success)" stroke-width="10" stroke-dasharray="33 206" stroke-dashoffset="-153" transform="rotate(-90 50 50)"/>
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--danger)" stroke-width="10" stroke-dasharray="54 185" stroke-dashoffset="-186" transform="rotate(-90 50 50)"/>
            </svg>
            <div class="donut-legend">
              <div class="legend-item"><div class="legend-dot" style="background:var(--accent)"></div><span class="legend-label">Technologie</span><span class="legend-val">40%</span></div>
              <div class="legend-item"><div class="legend-dot" style="background:var(--accent2)"></div><span class="legend-label">Immobilier</span><span class="legend-val">24%</span></div>
              <div class="legend-item"><div class="legend-dot" style="background:var(--success)"></div><span class="legend-label">Finance</span><span class="legend-val">14%</span></div>
              <div class="legend-item"><div class="legend-dot" style="background:var(--danger)"></div><span class="legend-label">Autre</span><span class="legend-val">22%</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Performances équipe</span></div>
        <div class="card-body">
          ${MOCK_DATA.team.slice(0,4).map(m => `
            <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.875rem;">
              <div class="table-avatar" style="background:${m.color}">${m.initials}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:0.82rem;font-weight:500;margin-bottom:0.25rem">${m.name}</div>
                <div style="height:6px;background:var(--border);border-radius:3px;overflow:hidden">
                  <div style="height:100%;background:var(--accent);border-radius:3px;width:${Math.floor(Math.random()*40+50)}%;transition:width 0.8s ease"></div>
                </div>
              </div>
              <div style="font-size:0.78rem;font-weight:600;color:var(--text-secondary)">${Math.floor(Math.random()*40+50)}%</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderProgressBars() {
  const items = [
    { label: 'Services récurrents', val: 72, color: 'var(--accent)' },
    { label: 'Nouveaux contrats', val: 45, color: 'var(--accent2)' },
    { label: 'Commissions', val: 28, color: 'var(--success)' },
    { label: 'Formations', val: 18, color: 'var(--danger)' },
  ];
  return items.map(item => `
    <div style="margin-bottom:1rem;">
      <div style="display:flex;justify-content:space-between;margin-bottom:0.3rem">
        <span style="font-size:0.8rem;color:var(--text-secondary)">${item.label}</span>
        <span style="font-size:0.8rem;font-weight:600">${item.val}%</span>
      </div>
      <div style="height:8px;background:var(--border);border-radius:4px;overflow:hidden">
        <div style="height:100%;background:${item.color};border-radius:4px;width:${item.val}%;transition:width 1s ease"></div>
      </div>
    </div>
  `).join('');
}

function initCharts() {
  const svg = document.getElementById('lineChart');
  if (!svg) return;
  const data = [62,78,55,90,84,71,95,88,102,76,108,128];
  const w = 600, h = 200, maxV = 140, pad = 20;
  const pts = data.map((v, i) => `${pad + (i / 11) * (w - pad*2)},${h - pad - (v / maxV) * (h - pad*2)}`);
  const fill = `M ${pts[0]} ${pts.slice(1).map(p => `L ${p}`).join(' ')} L ${pad + (w-pad*2)},${h} L ${pad},${h} Z`;
  const line = `M ${pts[0]} ${pts.slice(1).map(p => `L ${p}`).join(' ')}`;
  svg.innerHTML = `
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.15"/>
        <stop offset="100%" stop-color="var(--accent)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${fill}" fill="url(#lg)"/>
    <path d="${line}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${pts.map((p, i) => `<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="4" fill="var(--surface)" stroke="var(--accent)" stroke-width="2.5"/>`).join('')}
  `;
  const months = currentLang === 'fr'
    ? ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
    : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const labels = document.getElementById('lineLabels');
  if (labels) labels.innerHTML = months.map(m => `<span>${m}</span>`).join('');
}

// ===== CLIENTS =====
function renderClients() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h2>${t('clientsTitle')}</h2>
        <p>${t('clientsDesc')} — ${MOCK_DATA.clients.length} ${t('clients')}</p>
      </div>
      <div class="page-actions">
        <div class="search-bar">
          <span class="search-icon">◎</span>
          <input type="text" placeholder="${t('search')}" oninput="filterClients(this.value)">
        </div>
        <button class="btn-primary btn-sm" onclick="openAddClientModal()">${t('addClient')}</button>
      </div>
    </div>
    <div class="filter-bar">
      <button class="filter-chip active" onclick="filterClientStatus('all',this)">${t('all')}</button>
      <button class="filter-chip" onclick="filterClientStatus('active',this)">${t('active')}</button>
      <button class="filter-chip" onclick="filterClientStatus('pending',this)">${t('pending')}</button>
      <button class="filter-chip" onclick="filterClientStatus('inactive',this)">${t('inactive')}</button>
    </div>
    <div class="people-grid" id="clientsGrid">
      ${MOCK_DATA.clients.map(c => renderClientCard(c)).join('')}
    </div>
  `;
}

function renderClientCard(c) {
  const statusMap = { active: 'status-active', pending: 'status-pending', inactive: 'status-inactive' };
  const statusLabel = { active: t('active'), pending: t('pending'), inactive: t('inactive') };
  return `
    <div class="person-card" id="client-${c.id}">
      <div class="person-avatar-lg" style="background:${c.color}">${c.initials}</div>
      <div class="person-name">${c.name}</div>
      <div class="person-role">${c.email}</div>
      <span class="status ${statusMap[c.status]}" style="margin-bottom:0.5rem">${statusLabel[c.status]}</span>
      <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:1rem">${t('totalRevenue')}: <strong>${c.revenue}</strong></div>
      <div class="person-actions">
        <button class="btn-secondary" onclick="showToast('◎','${t('contactClient')} ${c.name}','info')">${t('contactClient')}</button>
        <button class="btn-outline" onclick="openEditClientModal(${c.id})">${t('editClient')}</button>
      </div>
    </div>
  `;
}

function filterClients(query) {
  const grid = document.getElementById('clientsGrid');
  if (!grid) return;
  const filtered = MOCK_DATA.clients.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.email.toLowerCase().includes(query.toLowerCase())
  );
  grid.innerHTML = filtered.map(c => renderClientCard(c)).join('');
}

function filterClientStatus(status, el) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const grid = document.getElementById('clientsGrid');
  if (!grid) return;
  const filtered = status === 'all' ? MOCK_DATA.clients : MOCK_DATA.clients.filter(c => c.status === status);
  grid.innerHTML = filtered.map(c => renderClientCard(c)).join('');
}

function openAddClientModal() {
  openModal(`
    <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:1.5rem">${t('addClient')}</h3>
    <div class="form-row">
      <div class="form-group"><label>${t('name')}</label><input class="form-input" placeholder="Nom du client"></div>
      <div class="form-group"><label>${t('email')}</label><input type="email" class="form-input" placeholder="contact@client.com"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Téléphone</label><input class="form-input" placeholder="+33 1 00 00 00 00"></div>
      <div class="form-group"><label>${t('status')}</label><select class="form-input form-select"><option>${t('active')}</option><option>${t('pending')}</option><option>${t('inactive')}</option></select></div>
    </div>
    <div class="form-group"><label>Notes</label><textarea class="form-input" rows="3" placeholder="Notes supplémentaires..."></textarea></div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button class="btn-primary" style="flex:1" onclick="showToast('◎','${t('savedSuccess')}','success');closeModal()">${t('saveChanges')}</button>
      <button class="btn-secondary" onclick="closeModal()">${t('cancel')}</button>
    </div>
  `);
}

function openEditClientModal(id) {
  const c = MOCK_DATA.clients.find(c => c.id === id);
  if (!c) return;
  openModal(`
    <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:1.5rem">${t('editClient')}: ${c.name}</h3>
    <div class="form-row">
      <div class="form-group"><label>${t('name')}</label><input class="form-input" value="${c.name}"></div>
      <div class="form-group"><label>${t('email')}</label><input type="email" class="form-input" value="${c.email}"></div>
    </div>
    <div class="form-group"><label>Téléphone</label><input class="form-input" value="${c.phone}"></div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button class="btn-primary" style="flex:1" onclick="showToast('◎','${t('savedSuccess')}','success');closeModal()">${t('saveChanges')}</button>
      <button class="btn-danger btn-sm" onclick="showToast('◎','Client supprimé','error');closeModal()">${t('delete')}</button>
    </div>
  `);
}

// ===== TEAM =====
function renderTeam() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h2>${t('teamTitle')}</h2>
        <p>${t('teamDesc')} — ${MOCK_DATA.team.length} membres</p>
      </div>
      <div class="page-actions">
        <div class="search-bar">
          <span class="search-icon">◎</span>
          <input type="text" placeholder="${t('search')}">
        </div>
        <button class="btn-primary btn-sm" onclick="openAddMemberModal()">${t('addMember')}</button>
      </div>
    </div>
    <div class="people-grid">
      ${MOCK_DATA.team.map(m => `
        <div class="person-card">
          <div class="person-avatar-lg" style="background:${m.color}">${m.initials}</div>
          <div class="person-name">${m.name}</div>
          <div class="person-role">${m.role}</div>
          <div class="person-email">${m.email}</div>
          <span style="font-size:0.72rem;font-weight:600;background:var(--accent-soft);color:var(--accent);padding:0.2rem 0.65rem;border-radius:20px;margin-bottom:1rem">${m.dept}</span>
          <div class="person-actions">
            <button class="btn-secondary" onclick="showToast('◎','Message envoyé à ${m.name}','success')">Message</button>
            <button class="btn-outline" onclick="showToast('◎','Profil ouvert','info')">${t('view')}</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function openAddMemberModal() {
  openModal(`
    <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:1.5rem">${t('addMember')}</h3>
    <div class="form-row">
      <div class="form-group"><label>${t('firstName')}</label><input class="form-input" placeholder="Prénom"></div>
      <div class="form-group"><label>${t('lastName')}</label><input class="form-input" placeholder="Nom"></div>
    </div>
    <div class="form-group"><label>Rôle</label><input class="form-input" placeholder="ex: Développeur senior"></div>
    <div class="form-row">
      <div class="form-group"><label>${t('email')}</label><input type="email" class="form-input" placeholder="email@nexus.io"></div>
      <div class="form-group"><label>Département</label><select class="form-input form-select"><option>Tech</option><option>Ventes</option><option>Finance</option><option>Design</option><option>Support</option></select></div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button class="btn-primary" style="flex:1" onclick="showToast('◎','Membre ajouté avec succès','success');closeModal()">${t('saveChanges')}</button>
      <button class="btn-secondary" onclick="closeModal()">${t('cancel')}</button>
    </div>
  `);
}

// ===== INVOICES =====
function renderInvoices() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h2>${t('invoices')}</h2>
        <p>Gérez vos factures et suivez les paiements</p>
      </div>
      <div class="page-actions">
        <div class="search-bar">
          <span class="search-icon">◎</span>
          <input type="text" placeholder="${t('search')}">
        </div>
        <button class="btn-secondary btn-sm" onclick="showToast('◎','Export en cours','info')">${t('export')}</button>
        <button class="btn-primary btn-sm" onclick="openNewInvoiceModal()">${t('newInvoice')}</button>
      </div>
    </div>
    <div class="filter-bar">
      <button class="filter-chip active">${t('all')}</button>
      <button class="filter-chip">${t('pending')}</button>
      <button class="filter-chip" onclick="this.classList.toggle('active')">Payée</button>
      <button class="filter-chip" onclick="this.classList.toggle('active')">En retard</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>${t('invoiceNo')}</th>
            <th>${t('client')}</th>
            <th>${t('date')}</th>
            <th>${t('dueDate')}</th>
            <th>${t('amount')}</th>
            <th>${t('status')}</th>
            <th>${t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          ${MOCK_DATA.invoices.map(inv => {
            const sMap = { paid:'status-paid', pending:'status-pending', overdue:'status-overdue' };
            const sLabel = { paid:'Payée', pending:t('pending'), overdue:'En retard' };
            return `<tr>
              <td><strong>${inv.id}</strong></td>
              <td>${inv.client}</td>
              <td>${inv.date}</td>
              <td>${inv.due}</td>
              <td><strong>${inv.amount}</strong></td>
              <td><span class="status ${sMap[inv.status]}">${sLabel[inv.status]}</span></td>
              <td>
                <div style="display:flex;gap:0.5rem">
                  <button class="btn-secondary btn-sm" onclick="showToast('◎','Facture téléchargée','success')">${t('view')}</button>
                  ${inv.status !== 'paid' ? `<button class="btn-primary btn-sm" onclick="showToast('◎','Rappel envoyé','info')">Rappel</button>` : ''}
                </div>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function openNewInvoiceModal() {
  openModal(`
    <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:1.5rem">${t('newInvoice')}</h3>
    <div class="form-row">
      <div class="form-group"><label>${t('client')}</label><select class="form-input form-select"><option>Acme Corporation</option><option>Vivaldi & Partners</option><option>Studio Helix</option></select></div>
      <div class="form-group"><label>${t('dueDate')}</label><input type="date" class="form-input"></div>
    </div>
    <div class="form-group"><label>Description</label><textarea class="form-input" rows="3" placeholder="Détail des prestations..."></textarea></div>
    <div class="form-row">
      <div class="form-group"><label>Montant HT</label><input type="number" class="form-input" placeholder="0.00"></div>
      <div class="form-group"><label>TVA (%)</label><input type="number" class="form-input" placeholder="20" value="20"></div>
    </div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button class="btn-primary" style="flex:1" onclick="showToast('◎','Facture créée et envoyée','success');closeModal()">Créer et envoyer</button>
      <button class="btn-secondary" onclick="showToast('◎','Brouillon sauvegardé','info');closeModal()">Brouillon</button>
    </div>
  `);
}

// ===== REPORTS =====
function renderReports() {
  const reports = [
    { icon: '◈', name: 'Rapport financier', desc: 'Revenus, dépenses, marges et projections', updated: 'Mis à jour aujourd\'hui', type: 'PDF' },
    { icon: '◎', name: 'Rapport clients', desc: 'Acquisition, rétention et valeur client', updated: 'Mis à jour hier', type: 'XLSX' },
    { icon: '▦', name: 'Rapport réservations', desc: 'Taux d\'occupation et tendances', updated: 'Il y a 3 jours', type: 'PDF' },
    { icon: '◷', name: 'Rapport équipe', desc: 'Performance et temps passé par membre', updated: 'Il y a 1 semaine', type: 'PDF' },
    { icon: '◑', name: 'Rapport paiements', desc: 'Transactions, délais et impayés', updated: 'Mis à jour aujourd\'hui', type: 'CSV' },
    { icon: '▣', name: 'Rapport taxes', desc: 'TVA collectée et déclarations', updated: 'Mensuel', type: 'PDF' },
  ];
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h2>${t('reportsTitle')}</h2>
        <p>${t('reportsDesc')}</p>
      </div>
      <div class="page-actions">
        <button class="btn-primary btn-sm" onclick="showToast('◎','Rapport personnalisé en cours...','info')">${t('generateReport')}</button>
      </div>
    </div>
    <div class="report-grid">
      ${reports.map(r => `
        <div class="report-card" onclick="showToast('◎','Génération de ${r.name}...','info')">
          <div class="report-icon">${r.icon}</div>
          <div class="report-name">${r.name}</div>
          <div class="report-desc">${r.desc}</div>
          <div class="report-meta">
            <span>${r.updated}</span>
            <span style="font-weight:600;color:var(--accent)">${r.type}</span>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="card" style="margin-top:1.5rem">
      <div class="card-header"><span class="card-title">Rapports récents téléchargés</span></div>
      <div class="card-body">
        <div class="table-wrapper">
          <table>
            <thead><tr><th>Rapport</th><th>Généré par</th><th>Date</th><th>Format</th><th>${t('actions')}</th></tr></thead>
            <tbody>
              <tr><td>Rapport financier — Fév 2026</td><td>Jean Dupont</td><td>01/03/2026</td><td>PDF</td><td><button class="btn-secondary btn-sm">${t('view')}</button></td></tr>
              <tr><td>Rapport clients — Q1 2026</td><td>Sophie Laurent</td><td>28/02/2026</td><td>XLSX</td><td><button class="btn-secondary btn-sm">${t('view')}</button></td></tr>
              <tr><td>Rapport taxes — Jan 2026</td><td>Amélie Morin</td><td>15/02/2026</td><td>PDF</td><td><button class="btn-secondary btn-sm">${t('view')}</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

// ===== SETTINGS =====
let activeSettingsSection = 'profile';

function renderSettings() {
  const sections = ['profile', 'security', 'notifications_s', 'billing', 'integrations', 'language_s'];
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h2>${t('settingsTitle')}</h2>
        <p>${t('settingsDesc')}</p>
      </div>
    </div>
    <div class="settings-layout">
      <nav class="settings-nav">
        ${sections.map(s => `<div class="settings-nav-item ${s === activeSettingsSection ? 'active' : ''}" onclick="switchSettingsSection('${s}',this)">${t(s)}</div>`).join('')}
      </nav>
      <div class="settings-section" id="settingsContent">
        ${renderSettingsSection(activeSettingsSection)}
      </div>
    </div>
  `;
}

function switchSettingsSection(section, el) {
  activeSettingsSection = section;
  document.querySelectorAll('.settings-nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('settingsContent').innerHTML = renderSettingsSection(section);
}

function renderSettingsSection(section) {
  if (section === 'profile') return `
    <div class="settings-card">
      <div class="settings-card-header"><div class="settings-card-title">Informations personnelles</div><div class="settings-card-desc">Vos informations de compte</div></div>
      <div class="settings-card-body">
        <div style="display:flex;align-items:center;gap:1.25rem;margin-bottom:1.5rem">
          <div style="width:72px;height:72px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:1.5rem;font-weight:700">JD</div>
          <div>
            <button class="btn-secondary btn-sm" onclick="showToast('◎','Photo mise à jour','success')">Changer la photo</button>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.4rem">JPG, PNG max 5MB</div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>${t('firstName')}</label><input class="form-input" value="Jean"></div>
          <div class="form-group"><label>${t('lastName')}</label><input class="form-input" value="Dupont"></div>
        </div>
        <div class="form-group"><label>${t('email')}</label><input type="email" class="form-input" value="jean.dupont@nexus.io"></div>
        <div class="form-group"><label>${t('company')}</label><input class="form-input" value="NEXUS Corp"></div>
        <div class="form-group"><label>Téléphone</label><input class="form-input" value="+33 6 12 34 56 78"></div>
        <button class="btn-primary" onclick="showToast('◎','${t('savedSuccess')}','success')">${t('saveChanges')}</button>
      </div>
    </div>
  `;
  if (section === 'security') return `
    <div class="settings-card">
      <div class="settings-card-header"><div class="settings-card-title">Sécurité du compte</div><div class="settings-card-desc">Gérez votre mot de passe et authentification</div></div>
      <div class="settings-card-body">
        <div class="form-group"><label>Mot de passe actuel</label><input type="password" class="form-input" placeholder="••••••••"></div>
        <div class="form-row">
          <div class="form-group"><label>Nouveau mot de passe</label><input type="password" class="form-input" placeholder="••••••••"></div>
          <div class="form-group"><label>Confirmer</label><input type="password" class="form-input" placeholder="••••••••"></div>
        </div>
        <button class="btn-primary" style="margin-bottom:2rem" onclick="showToast('◎','Mot de passe mis à jour','success')">Mettre à jour</button>
        <div class="settings-row">
          <div><div class="settings-row-label">Authentification 2 facteurs</div><div class="settings-row-sub">Sécurisez votre compte avec un code OTP</div></div>
          <button class="toggle on" onclick="this.classList.toggle('on')"></button>
        </div>
        <div class="settings-row">
          <div><div class="settings-row-label">Sessions actives</div><div class="settings-row-sub">Déconnectez toutes les autres sessions</div></div>
          <button class="btn-secondary btn-sm" onclick="showToast('◎','Sessions terminées','info')">Déconnecter tout</button>
        </div>
      </div>
    </div>
  `;
  if (section === 'notifications_s') return `
    <div class="settings-card">
      <div class="settings-card-header"><div class="settings-card-title">Préférences de notifications</div></div>
      <div class="settings-card-body">
        ${[
          ['Nouveaux paiements', 'Soyez alerté à chaque paiement reçu'],
          ['Nouvelles réservations', 'Notification pour chaque réservation'],
          ['Rappels de factures', 'Alerte avant échéance de facture'],
          ['Alertes équipe', 'Activité des membres de votre équipe'],
          ['Rapports hebdomadaires', 'Résumé de performance chaque lundi'],
          ['Mises à jour produit', 'Nouvelles fonctionnalités NEXUS'],
        ].map((item, i) => `
          <div class="settings-row">
            <div><div class="settings-row-label">${item[0]}</div><div class="settings-row-sub">${item[1]}</div></div>
            <button class="toggle ${i < 4 ? 'on' : ''}" onclick="this.classList.toggle('on')"></button>
          </div>
        `).join('')}
        <button class="btn-primary" style="margin-top:1rem" onclick="showToast('◎','${t('savedSuccess')}','success')">${t('saveChanges')}</button>
      </div>
    </div>
  `;
  if (section === 'billing') return `
    <div class="settings-card">
      <div class="settings-card-header"><div class="settings-card-title">Plan actuel</div></div>
      <div class="settings-card-body">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:1.25rem;background:var(--accent-soft);border-radius:var(--radius-md);margin-bottom:1.5rem">
          <div>
            <div style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;color:var(--accent)">Plan Pro</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:0.25rem">Renouvellement le 7 avril 2026</div>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:700">29€</div>
            <div style="font-size:0.75rem;color:var(--text-muted)">/mois</div>
          </div>
        </div>
        <div class="settings-row"><div class="settings-row-label">Méthode de paiement</div><div style="font-size:0.85rem;color:var(--text-secondary)">Visa •••• 4521</div></div>
        <div class="settings-row"><div class="settings-row-label">Prochain prélèvement</div><div style="font-size:0.85rem;color:var(--text-secondary)">7 avril 2026 — 29€</div></div>
        <div style="display:flex;gap:0.75rem;margin-top:1.25rem">
          <button class="btn-primary btn-sm" onclick="showToast('◎','Mise à niveau vers Enterprise','success')">Passer à Enterprise</button>
          <button class="btn-secondary btn-sm" onclick="showToast('◎','Factures téléchargées','info')">Historique</button>
        </div>
      </div>
    </div>
  `;
  if (section === 'integrations') return `
    <div class="settings-card">
      <div class="settings-card-header"><div class="settings-card-title">Intégrations disponibles</div><div class="settings-card-desc">Connectez vos outils favoris</div></div>
      <div class="settings-card-body">
        ${[
          { name: 'Stripe', desc: 'Paiements en ligne', connected: true },
          { name: 'Google Calendar', desc: 'Synchronisation agenda', connected: true },
          { name: 'Slack', desc: 'Notifications d\'équipe', connected: false },
          { name: 'HubSpot', desc: 'CRM clients', connected: false },
          { name: 'Zapier', desc: 'Automatisations', connected: false },
          { name: 'QuickBooks', desc: 'Comptabilité', connected: false },
        ].map(int => `
          <div class="settings-row">
            <div>
              <div class="settings-row-label">${int.name}</div>
              <div class="settings-row-sub">${int.desc}</div>
            </div>
            <button class="btn-${int.connected ? 'secondary' : 'primary'} btn-sm" onclick="showToast('◎','${int.name} ${int.connected ? 'déconnecté' : 'connecté'}','${int.connected ? 'info' : 'success'}')">${int.connected ? 'Déconnecter' : 'Connecter'}</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  if (section === 'language_s') return `
    <div class="settings-card">
      <div class="settings-card-header"><div class="settings-card-title">Langue et région</div></div>
      <div class="settings-card-body">
        <div class="form-group"><label>Langue d'interface</label>
          <select class="form-input form-select" onchange="setLang(this.value.toLowerCase().slice(0,2))">
            <option value="fr" ${currentLang==='fr'?'selected':''}>Français</option>
            <option value="en" ${currentLang==='en'?'selected':''}>English</option>
            <option value="de" ${currentLang==='de'?'selected':''}>Deutsch</option>
            <option value="es" ${currentLang==='es'?'selected':''}>Español</option>
          </select>
        </div>
        <div class="form-group"><label>Fuseau horaire</label><select class="form-input form-select"><option>Europe/Paris (UTC+1)</option><option>Europe/London (UTC+0)</option><option>America/New_York (UTC-5)</option></select></div>
        <div class="form-group"><label>Format de date</label><select class="form-input form-select"><option>JJ/MM/AAAA</option><option>MM/DD/YYYY</option><option>AAAA-MM-JJ</option></select></div>
        <div class="form-group"><label>Devise</label><select class="form-input form-select"><option>€ Euro</option><option>$ Dollar USD</option><option>£ Livre sterling</option></select></div>
        <button class="btn-primary" onclick="showToast('◎','${t('savedSuccess')}','success')">${t('saveChanges')}</button>
      </div>
    </div>
  `;
  return `<div class="card"><div class="card-body">Section en cours de développement.</div></div>`;
}
