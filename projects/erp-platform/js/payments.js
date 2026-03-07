/* ============================================
   NEXUS ERP — PAYMENTS MODULE
   ============================================ */

let payState = {
  method: 'card',
  cardNum: '•••• •••• •••• ••••',
  cardHolder: 'JEAN DUPONT',
  expiry: '12/28',
};

function renderPayments() {
  return `
    <div class="page-header">
      <div class="page-header-left">
        <h2>${t('paymentsTitle')}</h2>
        <p>${t('paymentsDesc')}</p>
      </div>
      <div class="page-actions">
        <button class="btn-secondary btn-sm" onclick="showToast('◎','Export','info')">${t('export')}</button>
        <button class="btn-primary btn-sm" onclick="openPaymentModal()">${t('makePayment')}</button>
      </div>
    </div>

    <div class="payment-summary">
      <div class="pay-card">
        <div class="pay-card-title">${t('totalReceived')}</div>
        <div class="pay-card-amount">128 400€</div>
        <div class="pay-card-sub">Exercice 2026</div>
      </div>
      <div class="pay-card">
        <div class="pay-card-title">${t('totalPending')}</div>
        <div class="pay-card-amount" style="color:var(--warning)">9 400€</div>
        <div class="pay-card-sub">4 ${t('invoices')} en attente</div>
      </div>
      <div class="pay-card">
        <div class="pay-card-title">${t('totalOverdue')}</div>
        <div class="pay-card-amount" style="color:var(--danger)">1 900€</div>
        <div class="pay-card-sub">1 facture en retard</div>
      </div>
    </div>

    <div class="payments-layout">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Transactions récentes</span>
          <div style="display:flex;gap:0.5rem">
            <div class="search-bar" style="max-width:200px;flex:unset">
              <span class="search-icon">◎</span>
              <input type="text" placeholder="${t('search')}">
            </div>
          </div>
        </div>
        <div class="card-body" style="padding:0">
          <div class="table-wrapper" style="border:none;border-radius:0">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>${t('client')}</th>
                  <th>Montant</th>
                  <th>${t('date')}</th>
                  <th>Méthode</th>
                  <th>${t('status')}</th>
                </tr>
              </thead>
              <tbody>
                ${MOCK_DATA.transactions.map(tx => {
                  const sMap = { confirmed: 'status-confirmed', pending: 'status-pending', cancelled: 'status-cancelled' };
                  const sLabel = { confirmed: t('confirmed'), pending: t('pending'), cancelled: t('cancelled') };
                  const isNeg = tx.amount.startsWith('-');
                  return `<tr>
                    <td><span style="font-family:monospace;font-size:0.78rem">${tx.id}</span></td>
                    <td>${tx.from}</td>
                    <td><strong style="color:${isNeg ? 'var(--danger)' : 'var(--success)'}">${tx.amount}</strong></td>
                    <td>${tx.date}</td>
                    <td>${tx.method}</td>
                    <td><span class="status ${sMap[tx.status]}">${sLabel[tx.status]}</span></td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="payment-form-card">
        <div class="payment-form-title">${t('makePayment')}</div>

        <div class="card-preview" id="cardPreview">
          <div class="card-chip"></div>
          <div class="card-number" id="prevCardNum">•••• •••• •••• ••••</div>
          <div class="card-details">
            <div>
              <div style="font-size:0.6rem;opacity:0.6;margin-bottom:0.2rem">TITULAIRE</div>
              <div id="prevHolder">JEAN DUPONT</div>
            </div>
            <div>
              <div style="font-size:0.6rem;opacity:0.6;margin-bottom:0.2rem">EXPIRE</div>
              <div id="prevExpiry">12/28</div>
            </div>
          </div>
        </div>

        <div class="payment-methods">
          <button class="pay-method active" onclick="selectPayMethod('card',this)">${t('payCard')}</button>
          <button class="pay-method" onclick="selectPayMethod('bank',this)">${t('payBank')}</button>
          <button class="pay-method" onclick="selectPayMethod('crypto',this)">${t('payCrypto')}</button>
          <button class="pay-method" onclick="selectPayMethod('paypal',this)">${t('payPaypal')}</button>
        </div>

        <div id="payFormContent">
          ${renderCardForm()}
        </div>
      </div>
    </div>
  `;
}

function renderCardForm() {
  return `
    <div class="form-group">
      <label>${t('cardNumber')}</label>
      <input class="form-input" placeholder="1234 5678 9012 3456" maxlength="19"
        oninput="formatCardNum(this)" id="cardNumInput">
    </div>
    <div class="form-group">
      <label>${t('cardHolder')}</label>
      <input class="form-input" placeholder="NOM PRÉNOM" id="cardHolderInput"
        oninput="document.getElementById('prevHolder').textContent=this.value.toUpperCase()||'JEAN DUPONT'">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>${t('expiry')}</label>
        <input class="form-input" placeholder="MM/AA" maxlength="5" id="cardExpInput"
          oninput="formatExpiry(this)">
      </div>
      <div class="form-group">
        <label>${t('cvv')}</label>
        <input class="form-input" placeholder="•••" maxlength="3" type="password">
      </div>
    </div>
    <div class="form-group">
      <label>Montant</label>
      <input class="form-input" placeholder="0.00" type="number" min="0" step="0.01" id="payAmount">
    </div>
    <button class="btn-primary btn-full" onclick="processPayment()" style="margin-top:0.5rem">${t('payNow')}</button>
  `;
}

function renderBankForm() {
  return `
    <div class="form-group"><label>IBAN</label><input class="form-input" placeholder="FR76 3000 6000 0123 4567 890 14"></div>
    <div class="form-group"><label>BIC / SWIFT</label><input class="form-input" placeholder="BNPAFRPP"></div>
    <div class="form-group"><label>Montant</label><input class="form-input" placeholder="0.00" type="number" id="payAmount"></div>
    <div class="form-group"><label>Motif</label><input class="form-input" placeholder="Référence paiement"></div>
    <button class="btn-primary btn-full" onclick="processPayment()">${t('payNow')}</button>
  `;
}

function renderCryptoForm() {
  return `
    <div style="text-align:center;padding:1.5rem 0">
      <div style="width:100px;height:100px;border:2px solid var(--border);border-radius:var(--radius-md);margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;background:var(--bg-alt)">
        <div style="font-size:2rem">◈</div>
      </div>
      <div style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:0.5rem">Adresse Bitcoin</div>
      <div style="font-size:0.7rem;font-family:monospace;background:var(--bg-alt);padding:0.5rem;border-radius:4px;word-break:break-all">1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf9</div>
    </div>
    <div class="form-group"><label>Montant (USD)</label><input class="form-input" placeholder="0.00" type="number" id="payAmount"></div>
    <button class="btn-primary btn-full" onclick="processPayment()">${t('payNow')}</button>
  `;
}

function renderPaypalForm() {
  return `
    <div style="text-align:center;padding:1rem 0 1.5rem">
      <div style="font-size:2rem;font-family:var(--font-display);font-weight:800;color:#0070ba;margin-bottom:1rem">PayPal</div>
      <p style="font-size:0.82rem;color:var(--text-secondary)">Vous serez redirigé vers PayPal pour compléter le paiement.</p>
    </div>
    <div class="form-group"><label>Email PayPal</label><input type="email" class="form-input" placeholder="compte@paypal.com"></div>
    <div class="form-group"><label>Montant</label><input class="form-input" placeholder="0.00" type="number" id="payAmount"></div>
    <button class="btn-primary btn-full" onclick="processPayment()">Continuer vers PayPal</button>
  `;
}

function selectPayMethod(method, btn) {
  payState.method = method;
  document.querySelectorAll('.pay-method').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const forms = { card: renderCardForm, bank: renderBankForm, crypto: renderCryptoForm, paypal: renderPaypalForm };
  document.getElementById('payFormContent').innerHTML = (forms[method] || renderCardForm)();
  const preview = document.getElementById('cardPreview');
  if (preview) {
    preview.style.display = method === 'card' ? 'block' : 'none';
  }
}

function formatCardNum(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 16);
  val = val.match(/.{1,4}/g)?.join(' ') || val;
  input.value = val;
  const display = val.padEnd(19, '•').slice(0, 19);
  const prev = document.getElementById('prevCardNum');
  if (prev) prev.textContent = display;
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 4);
  if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2);
  input.value = val;
  const prev = document.getElementById('prevExpiry');
  if (prev) prev.textContent = val || '••/••';
}

function processPayment() {
  const amtEl = document.getElementById('payAmount');
  const amt = amtEl ? parseFloat(amtEl.value) : 0;
  if (!amt || amt <= 0) {
    showToast('◎', 'Veuillez saisir un montant valide.', 'error');
    return;
  }
  // Simulate processing
  const btn = document.querySelector('.pay-method.active + .pay-method ~ .pay-method, .payment-form-card .btn-primary');
  showToast('◎', 'Traitement en cours...', 'info');
  setTimeout(() => {
    showToast('◎', t('paymentSuccess'), 'success');
    MOCK_DATA.transactions.unshift({
      id: 'TXN-' + Math.floor(Math.random() * 9000 + 1000),
      from: 'Paiement manuel',
      amount: `+${amt.toFixed(2)}€`,
      date: new Date().toLocaleDateString('fr-FR'),
      method: payState.method === 'card' ? 'Carte' : payState.method === 'bank' ? 'Virement' : 'PayPal',
      status: 'confirmed'
    });
  }, 1200);
}

function openPaymentModal() {
  openModal(`
    <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:1.5rem">${t('newPayment')}</h3>
    <div class="form-group">
      <label>${t('client')}</label>
      <select class="form-input form-select">
        ${MOCK_DATA.clients.map(c => `<option>${c.name}</option>`).join('')}
      </select>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Montant</label><input type="number" class="form-input" placeholder="0.00"></div>
      <div class="form-group"><label>Devise</label><select class="form-input form-select"><option>EUR €</option><option>USD $</option><option>GBP £</option></select></div>
    </div>
    <div class="form-group"><label>Description</label><input class="form-input" placeholder="Référence ou description"></div>
    <div style="display:flex;gap:0.75rem;margin-top:1rem">
      <button class="btn-primary" style="flex:1" onclick="showToast('◎','${t('paymentSuccess')}','success');closeModal()">Enregistrer</button>
      <button class="btn-secondary" onclick="closeModal()">${t('cancel')}</button>
    </div>
  `);
}
