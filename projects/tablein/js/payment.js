// ============================================================
//   TABLE·IN — PAYMENT
// ============================================================

let payMethod = 'card';

function renderPayment() {
  const total = bk.total;
  const cover = `Dîner ${bk.date} à ${bk.time} · ${bk.guests} convive${bk.guests>1?'s':''}`;
  const taxes = Math.round(total * 0.1);
  const payTotal = total + taxes;
  bk.payTotal = payTotal;

  document.getElementById('payment-inner').innerHTML = `
  ${renderSteps(3)}
  <div class="pay-layout">
    <div>
      <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text2);margin-bottom:.75rem">${t('payTitle')}</div>
      <div class="pay-methods">
        <button class="pm-btn pmsel" onclick="selectPay('card',this)" id="pm-card">
          <div class="pm-icon">CB</div><span>${t('creditCard')}</span>
        </button>
        <button class="pm-btn" onclick="selectPay('paypal',this)" id="pm-paypal">
          <div class="pm-icon" style="color:#003087">P</div><span>PayPal</span>
        </button>
        <button class="pm-btn" onclick="selectPay('apple',this)" id="pm-apple">
          <div class="pm-icon">⬛</div><span>Apple Pay</span>
        </button>
      </div>

      <div id="pay-card-form">
        <div class="field-group cn-wrap">
          <label>${t('cardNum')}</label>
          <input type="text" id="cn-num" placeholder="1234 5678 9012 3456" maxlength="19" oninput="fmtCard(this)"/>
          <div class="card-brands">
            <span class="cb-tag" style="background:#1a1f71;color:#fff">VISA</span>
            <span class="cb-tag" style="background:#eb001b;color:#fff">MC</span>
          </div>
        </div>
        <div class="field-group">
          <label>${t('cardName')}</label>
          <input type="text" id="cn-name" placeholder="MARIE DUPONT" value="${(bk.firstName+' '+bk.lastName).toUpperCase().trim()}"/>
        </div>
        <div class="field-row2">
          <div class="field-group">
            <label>${t('expiry')}</label>
            <input type="text" id="cn-exp" placeholder="MM / AA" maxlength="7" oninput="fmtExp(this)"/>
          </div>
          <div class="field-group">
            <label>${t('cvv')}</label>
            <input type="text" id="cn-cvv" placeholder="•••" maxlength="3" oninput="this.value=this.value.replace(/\D/g,'')"/>
          </div>
        </div>
      </div>

      <div id="pay-paypal-form" class="hidden" style="text-align:center;padding:2rem;background:var(--bg3);border-radius:var(--r2)">
        <div style="font-size:1.8rem;color:#003087;font-weight:800;margin-bottom:.5rem">PayPal</div>
        <p style="font-size:.875rem;color:var(--text2)">Vous serez redirigé vers PayPal pour finaliser.</p>
      </div>

      <div id="pay-apple-form" class="hidden" style="text-align:center;padding:2rem;background:var(--bg3);border-radius:var(--r2)">
        <div style="font-size:2rem;margin-bottom:.5rem">⬛</div>
        <p style="font-size:.875rem;color:var(--text2)">Confirmez avec Touch ID ou Face ID.</p>
      </div>

      <div class="pay-secure">
        <div class="sec-ico">✓</div>
        <span>${t('secureMsg')}</span>
      </div>
    </div>

    <div>
      <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text2);margin-bottom:.75rem">${t('orderSum')}</div>
      <div class="pay-order-box">
        <div style="font-family:var(--ff-disp);font-size:1rem;color:var(--text);margin-bottom:1rem">Table·In · Paris</div>
        <div class="order-line"><span>${cover}</span></div>
        <div class="order-line"><span>${bk.tableType?.name}</span><span>${bk.tableType?.price > 0 ? bk.tableType.price+'€' : 'Inclus'}</span></div>
        ${total > 0 ? `<div class="order-line"><span>${t('subtotal')}</span><span>${total}€</span></div>` : ''}
        ${taxes > 0 ? `<div class="order-line"><span>${t('taxes')}</span><span>${taxes}€</span></div>` : ''}
        <div class="order-line order-total"><span>${t('total')}</span><span>${payTotal > 0 ? payTotal+'€' : 'Gratuit'}</span></div>
      </div>
      <div class="pay-btn-wrap">
        <button class="btn-fill full" style="padding:1rem;font-size:.95rem" id="pay-submit-btn" onclick="processPayment()">
          ${t('payNow')}${payTotal > 0 ? ' — '+payTotal+'€' : ''}
        </button>
        <p class="pay-fine">En cliquant, vous acceptez nos CGV et la politique d'annulation.</p>
      </div>
      <button class="btn-ghost full" style="margin-top:.5rem" onclick="closeModal('modal-payment');openModal('modal-booking');bkToStep2()">← ${t('backBtn')}</button>
    </div>
  </div>`;
}

function selectPay(method, btn) {
  payMethod = method;
  document.querySelectorAll('.pm-btn').forEach(b => b.classList.remove('pmsel'));
  btn.classList.add('pmsel');
  ['card','paypal','apple'].forEach(m => {
    const el = document.getElementById(`pay-${m}-form`);
    if (el) el.classList.toggle('hidden', m !== method);
  });
}

function fmtCard(input) {
  let v = input.value.replace(/\D/g,'').substring(0,16);
  input.value = v.replace(/(.{4})/g,'$1 ').trim();
}
function fmtExp(input) {
  let v = input.value.replace(/\D/g,'').substring(0,4);
  if (v.length >= 3) v = v.substring(0,2) + ' / ' + v.substring(2);
  input.value = v;
}

function processPayment() {
  const btn = document.getElementById('pay-submit-btn');
  if (!btn) return;
  btn.disabled = true;
  btn.innerHTML = `<span style="display:inline-block;animation:spin .8s linear infinite">⟳</span> Traitement...`;

  setTimeout(() => {
    const ref = genRef();
    const res = {
      id: 'R'+Date.now(),
      date: bk.date,
      time: bk.time,
      guests: bk.guests,
      table: bk.tableType?.name || '',
      status: 'confirmed',
      price: bk.payTotal,
      ref,
      special: bk.special,
    };
    reservations.unshift(res);
    addNotif(t('bookOkToast'), `${bk.date} à ${bk.time} · Réf. ${ref}`);
    saveData();
    showPaySuccess(ref);
  }, 2400);
}

function showPaySuccess(ref) {
  document.getElementById('payment-inner').innerHTML = `
  <div class="success-screen">
    <div class="success-ring">✓</div>
    <h2>${t('bookOk')}</h2>
    <p>${t('bookOkSub')}</p>
    <div class="bk-ref">
      <strong>${ref}</strong>
      ${t('bookRef')}
    </div>
    <div class="success-btns">
      <button class="btn-fill" onclick="closeModal('modal-payment');openAccount('reservations')">${t('viewMyRes')}</button>
      <button class="btn-outline" onclick="closeModal('modal-payment')">${t('backHome')}</button>
    </div>
  </div>`;
  toast('success', t('bookOkToast'), t('bookOkToastMsg'));
}

// CSS spin
const _s = document.createElement('style');
_s.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
document.head.appendChild(_s);
