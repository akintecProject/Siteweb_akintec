// ===================== APP STATE =====================
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
let currentUser = JSON.parse(localStorage.getItem('user') || 'null');
let currentPage = 'home';
let currentProduct = null;
let checkoutStep = 1;
let filterCategory = 'all';
let filterSort = 'newest';
let filterMinPrice = 0;
let filterMaxPrice = 1000;
let searchQuery = '';
let adminSection = 'overview';

// ===================== UTILITY FUNCTIONS =====================
function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); updateCartUI(); }
function saveWishlist() { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }

function getProductName(p) { return p.name[currentLang] || p.name.fr; }
function getProductDesc(p) { return p.description[currentLang] || p.description.fr; }
function getProductSpecs(p) { return p.specs[currentLang] || p.specs.fr; }

function formatPrice(price) { return price.toFixed(2) + t('currency'); }

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = products.find(p => p.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function getCartItemCount() { return cart.reduce((sum, item) => sum + item.qty, 0); }

function showNotification(msg, type = 'success') {
  const notif = document.getElementById('notification');
  const notifMsg = document.getElementById('notif-msg');
  notifMsg.textContent = msg;
  notif.className = 'notification show ' + type;
  setTimeout(() => notif.classList.remove('show'), 3000);
}

// ===================== CART =====================
function addToCart(productId, qty = 1, size = null, color = null) {
  const existing = cart.find(i => i.id === productId && i.size === size && i.color === color);
  if (existing) { existing.qty += qty; }
  else { cart.push({ id: productId, qty, size, color }); }
  saveCart();
  showNotification(t('notification_added'), 'success');
  animateCartIcon();
}

function removeFromCart(productId, size = null, color = null) {
  cart = cart.filter(i => !(i.id === productId && i.size === size && i.color === color));
  saveCart();
  showNotification(t('notification_removed'), 'warning');
  if (currentPage === 'cart') renderCartPage();
}

function updateCartQty(productId, qty, size = null, color = null) {
  const item = cart.find(i => i.id === productId && i.size === size && i.color === color);
  if (item) { item.qty = Math.max(1, qty); saveCart(); }
  if (currentPage === 'cart') renderCartPage();
}

function animateCartIcon() {
  const icon = document.getElementById('cart-icon-btn');
  if (icon) { icon.classList.add('bounce'); setTimeout(() => icon.classList.remove('bounce'), 500); }
}

function updateCartUI() {
  const count = getCartItemCount();
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function toggleWishlist(productId) {
  const idx = wishlist.indexOf(productId);
  if (idx === -1) { wishlist.push(productId); showNotification(t('notification_wishlist')); }
  else { wishlist.splice(idx, 1); }
  saveWishlist();
  document.querySelectorAll(`.wish-btn[data-id="${productId}"]`).forEach(btn => {
    btn.classList.toggle('active', wishlist.includes(productId));
  });
}

// ===================== NAVIGATION =====================
function navigate(page, data = null) {
  currentPage = page;
  if (data) currentProduct = data;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const pageEl = document.getElementById('page-' + page);
  if (pageEl) { pageEl.classList.add('active'); pageEl.scrollTop = 0; }
  window.scrollTo(0, 0);
  document.querySelectorAll('.nav-link').forEach(l => l.classList.toggle('active', l.dataset.page === page));
  closeMobileMenu();

  switch(page) {
    case 'home': renderHomePage(); break;
    case 'shop': renderShopPage(); break;
    case 'product': renderProductPage(currentProduct); break;
    case 'cart': renderCartPage(); break;
    case 'checkout': renderCheckoutPage(); break;
    case 'orders': renderOrdersPage(); break;
    case 'admin': renderAdminPage(); break;
    case 'wishlist': renderWishlistPage(); break;
    case 'account': renderAccountPage(); break;
  }
}

function closeMobileMenu() {
  document.getElementById('mobile-menu')?.classList.remove('open');
  document.getElementById('menu-overlay')?.classList.remove('show');
}

// ===================== HOME PAGE =====================
function renderHomePage() {
  renderFeaturedProducts();
  renderNewProducts();
  renderSaleProducts();
}

function renderFeaturedProducts() {
  const container = document.getElementById('featured-products');
  if (!container) return;
  const featured = products.filter(p => p.featured).slice(0, 4);
  container.innerHTML = featured.map(p => productCard(p)).join('');
  bindProductEvents(container);
}

function renderNewProducts() {
  const container = document.getElementById('new-products');
  if (!container) return;
  const newP = products.filter(p => p.isNew).slice(0, 4);
  container.innerHTML = newP.map(p => productCard(p)).join('');
  bindProductEvents(container);
}

function renderSaleProducts() {
  const container = document.getElementById('sale-products');
  if (!container) return;
  const sale = products.filter(p => p.onSale).slice(0, 4);
  container.innerHTML = sale.map(p => productCard(p)).join('');
  bindProductEvents(container);
}

// ===================== SHOP PAGE =====================
function renderShopPage() {
  let filtered = products.filter(p => {
    if (filterCategory !== 'all' && p.category !== filterCategory) return false;
    if (p.price < filterMinPrice || p.price > filterMaxPrice) return false;
    if (searchQuery) {
      const name = getProductName(p).toLowerCase();
      if (!name.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  switch(filterSort) {
    case 'price_asc': filtered.sort((a,b) => a.price - b.price); break;
    case 'price_desc': filtered.sort((a,b) => b.price - a.price); break;
    case 'name': filtered.sort((a,b) => getProductName(a).localeCompare(getProductName(b))); break;
    case 'popular': filtered.sort((a,b) => b.reviews - a.reviews); break;
    default: filtered.sort((a,b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  const container = document.getElementById('shop-products');
  if (!container) return;
  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><p>${t('search_no_results')}</p></div>`;
    return;
  }
  container.innerHTML = filtered.map(p => productCard(p)).join('');
  bindProductEvents(container);

  document.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === filterCategory);
  });
}

function productCard(p) {
  const inWish = wishlist.includes(p.id);
  const discount = p.oldPrice ? Math.round((1 - p.price/p.oldPrice)*100) : 0;
  const stars = renderStars(p.rating);
  return `
  <div class="product-card" data-id="${p.id}">
    <div class="product-img-wrap">
      <img src="${p.image}" alt="${getProductName(p)}" loading="lazy">
      <div class="product-badges">
        ${p.isNew ? `<span class="badge badge-new">New</span>` : ''}
        ${p.onSale && discount > 0 ? `<span class="badge badge-sale">-${discount}%</span>` : ''}
        ${p.stock < 6 ? `<span class="badge badge-low">⚡ ${p.stock}</span>` : ''}
      </div>
      <div class="product-actions">
        <button class="wish-btn ${inWish ? 'active' : ''}" data-id="${p.id}" title="${t('product_add_wishlist')}">
          <svg viewBox="0 0 24 24" fill="${inWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button class="quick-view-btn" data-id="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
      </div>
      ${p.stock === 0 ? `<div class="out-overlay">${t('product_out_stock')}</div>` : ''}
    </div>
    <div class="product-info">
      <span class="product-cat">${t('cat_' + p.category)}</span>
      <h3 class="product-name">${getProductName(p)}</h3>
      <div class="product-rating">${stars} <span>(${p.reviews})</span></div>
      <div class="product-price">
        <span class="price-current">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
      </div>
      <button class="btn-add-cart" data-id="${p.id}" ${p.stock === 0 ? 'disabled' : ''}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        ${t('product_add_cart')}
      </button>
    </div>
  </div>`;
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) stars += '<span class="star full">★</span>';
    else if (i - 0.5 <= rating) stars += '<span class="star half">★</span>';
    else stars += '<span class="star empty">☆</span>';
  }
  return `<div class="stars">${stars}</div>`;
}

function bindProductEvents(container) {
  container.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); addToCart(parseInt(btn.dataset.id)); });
  });
  container.querySelectorAll('.wish-btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); toggleWishlist(parseInt(btn.dataset.id)); });
  });
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => navigate('product', parseInt(card.dataset.id)));
  });
  container.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); navigate('product', parseInt(btn.dataset.id)); });
  });
}

// ===================== PRODUCT PAGE =====================
function renderProductPage(productId) {
  const p = products.find(pr => pr.id === productId);
  if (!p) { navigate('shop'); return; }
  const container = document.getElementById('page-product');
  if (!container) return;

  const inWish = wishlist.includes(p.id);
  const discount = p.oldPrice ? Math.round((1 - p.price/p.oldPrice)*100) : 0;

  container.innerHTML = `
  <div class="product-detail-wrap">
    <div class="breadcrumb">
      <span class="bc-link" onclick="navigate('home')">Home</span>
      <span>›</span>
      <span class="bc-link" onclick="navigate('shop')">${t('nav_shop')}</span>
      <span>›</span>
      <span>${getProductName(p)}</span>
    </div>
    <div class="product-detail">
      <div class="product-gallery">
        <div class="gallery-main">
          <img id="main-img" src="${p.images[0]}" alt="${getProductName(p)}">
          ${p.onSale && discount > 0 ? `<div class="gallery-badge">-${discount}%</div>` : ''}
        </div>
        <div class="gallery-thumbs">
          ${p.images.map((img, i) => `<img src="${img}" onclick="document.getElementById('main-img').src='${img}'" class="${i===0?'active':''}" alt="">`).join('')}
        </div>
      </div>
      <div class="product-detail-info">
        <span class="product-cat">${t('cat_' + p.category)}</span>
        <h1>${getProductName(p)}</h1>
        <div class="product-rating-detail">${renderStars(p.rating)} <span class="reviews-count">${p.reviews} ${t('product_reviews')}</span></div>
        <div class="product-price-detail">
          <span class="price-current-large">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old-large">${formatPrice(p.oldPrice)}</span>` : ''}
        </div>
        <p class="product-desc-text">${getProductDesc(p)}</p>
        ${p.colors.length > 0 ? `
          <div class="option-group">
            <label>${t('product_color')}</label>
            <div class="color-opts">${p.colors.map((c,i) => `<button class="color-opt ${i===0?'active':''}" style="background:${c}" data-color="${c}" title="${c}"></button>`).join('')}</div>
          </div>` : ''}
        ${p.sizes.length > 0 ? `
          <div class="option-group">
            <label>${t('product_size')}</label>
            <div class="size-opts">${p.sizes.map((s,i) => `<button class="size-opt ${i===0?'active':''}" data-size="${s}">${s}</button>`).join('')}</div>
          </div>` : ''}
        <div class="option-group">
          <label>${t('product_qty')}</label>
          <div class="qty-ctrl">
            <button onclick="changeQty(-1)">−</button>
            <input type="number" id="prod-qty" value="1" min="1" max="${p.stock}">
            <button onclick="changeQty(1)">+</button>
          </div>
        </div>
        <div class="product-actions-detail">
          <button class="btn-primary btn-add-cart-detail" onclick="addToCartFromDetail(${p.id})" ${p.stock === 0 ? 'disabled' : ''}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            ${t('product_add_cart')}
          </button>
          <button class="btn-wish-detail wish-btn ${inWish ? 'active' : ''}" data-id="${p.id}" onclick="toggleWishlist(${p.id}); this.classList.toggle('active')">
            <svg viewBox="0 0 24 24" fill="${inWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="product-meta">
          <span>${t('product_sku')}: ${p.sku}</span>
          <span class="stock-status ${p.stock > 0 ? 'in' : 'out'}">${p.stock > 0 ? '✓ ' + t('product_in_stock') : '✗ ' + t('product_out_stock')}</span>
        </div>
        <div class="product-specs-box">
          <strong>${t('product_specifications')}</strong>
          <p>${getProductSpecs(p)}</p>
        </div>
      </div>
    </div>
    <div class="related-products">
      <h2>${t('product_related')}</h2>
      <div class="products-grid" id="related-grid"></div>
    </div>
  </div>`;

  // Render related
  const related = products.filter(pr => pr.category === p.category && pr.id !== p.id).slice(0, 4);
  const relGrid = document.getElementById('related-grid');
  if (relGrid) { relGrid.innerHTML = related.map(rp => productCard(rp)).join(''); bindProductEvents(relGrid); }

  // Color/size selection
  container.querySelectorAll('.color-opt').forEach(btn => {
    btn.addEventListener('click', () => { container.querySelectorAll('.color-opt').forEach(b => b.classList.remove('active')); btn.classList.add('active'); });
  });
  container.querySelectorAll('.size-opt').forEach(btn => {
    btn.addEventListener('click', () => { container.querySelectorAll('.size-opt').forEach(b => b.classList.remove('active')); btn.classList.add('active'); });
  });
}

function changeQty(delta) {
  const input = document.getElementById('prod-qty');
  if (input) input.value = Math.max(1, parseInt(input.value || 1) + delta);
}

function addToCartFromDetail(productId) {
  const qty = parseInt(document.getElementById('prod-qty')?.value || 1);
  const sizeEl = document.querySelector('.size-opt.active');
  const colorEl = document.querySelector('.color-opt.active');
  addToCart(productId, qty, sizeEl?.dataset.size || null, colorEl?.dataset.color || null);
}

// ===================== CART PAGE =====================
function renderCartPage() {
  const container = document.getElementById('page-cart');
  if (!container) return;
  const total = getCartTotal();
  const shipping = total >= 50 ? 0 : 5.99;
  const tax = total * 0.2;
  const grand = total + shipping + tax;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <h2>${t('cart_empty')}</h2>
        <p>${t('cart_empty_sub')}</p>
        <button class="btn-primary" onclick="navigate('shop')">${t('nav_shop')}</button>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="cart-wrap">
      <h1 class="page-title">${t('cart_title')} <span>(${getCartItemCount()} ${getCartItemCount() > 1 ? t('cart_items') : t('cart_item')})</span></h1>
      <div class="cart-layout">
        <div class="cart-items-list">
          ${cart.map(item => {
            const p = products.find(pr => pr.id === item.id);
            if (!p) return '';
            return `
            <div class="cart-item">
              <img src="${p.image}" alt="${getProductName(p)}" onclick="navigate('product',${p.id})">
              <div class="cart-item-info">
                <h3 onclick="navigate('product',${p.id})">${getProductName(p)}</h3>
                ${item.size ? `<span class="item-meta">${t('product_size')}: ${item.size}</span>` : ''}
                ${item.color ? `<span class="item-meta color-dot" style="background:${item.color}"></span>` : ''}
                <div class="cart-item-bottom">
                  <div class="qty-ctrl small">
                    <button onclick="updateCartQty(${p.id}, ${item.qty - 1}, ${item.size ? `'${item.size}'` : null}, ${item.color ? `'${item.color}'` : null})">−</button>
                    <span>${item.qty}</span>
                    <button onclick="updateCartQty(${p.id}, ${item.qty + 1}, ${item.size ? `'${item.size}'` : null}, ${item.color ? `'${item.color}'` : null})">+</button>
                  </div>
                  <span class="cart-item-price">${formatPrice(p.price * item.qty)}</span>
                  <button class="btn-remove" onclick="removeFromCart(${p.id}, ${item.size ? `'${item.size}'` : null}, ${item.color ? `'${item.color}'` : null})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6"/><path d="M10,11v6M14,11v6"/><path d="M9,6V4h6v2"/></svg>
                  </button>
                </div>
              </div>
            </div>`;
          }).join('')}
          <button class="btn-link" onclick="navigate('shop')">← ${t('cart_continue')}</button>
        </div>
        <div class="cart-summary">
          <h3>Résumé</h3>
          <div class="summary-row"><span>${t('cart_subtotal')}</span><span>${formatPrice(total)}</span></div>
          <div class="summary-row"><span>${t('cart_shipping')}</span><span>${shipping === 0 ? `<span class="free-ship">${t('cart_free_shipping')}</span>` : formatPrice(shipping)}</span></div>
          <div class="summary-row"><span>${t('cart_tax')} (20%)</span><span>${formatPrice(tax)}</span></div>
          <div class="summary-row total"><span>${t('cart_total')}</span><span>${formatPrice(grand)}</span></div>
          ${total < 50 ? `<p class="shipping-note">🚚 ${t('cart_shipping_info')}</p>` : '<p class="shipping-note free">✓ ' + t('cart_free_shipping') + '</p>'}
          <button class="btn-primary btn-full" onclick="navigate('checkout'); checkoutStep=1; renderCheckoutPage();">${t('cart_checkout')}</button>
          <div class="payment-icons">💳 🔒 Visa · Mastercard · PayPal</div>
        </div>
      </div>
    </div>`;
}

// ===================== CHECKOUT PAGE =====================
function renderCheckoutPage() {
  const container = document.getElementById('page-checkout');
  if (!container) return;
  const total = getCartTotal();
  const shipping = total >= 50 ? 0 : 5.99;
  const tax = total * 0.2;
  const grand = total + shipping + tax;

  container.innerHTML = `
  <div class="checkout-wrap">
    <h1 class="page-title">${t('checkout_title')}</h1>
    <div class="checkout-steps">
      <div class="step ${checkoutStep >= 1 ? 'active' : ''} ${checkoutStep > 1 ? 'done' : ''}">
        <span class="step-num">1</span><span>${t('checkout_shipping')}</span>
      </div>
      <div class="step-line ${checkoutStep > 1 ? 'done' : ''}"></div>
      <div class="step ${checkoutStep >= 2 ? 'active' : ''} ${checkoutStep > 2 ? 'done' : ''}">
        <span class="step-num">2</span><span>${t('checkout_payment')}</span>
      </div>
      <div class="step-line ${checkoutStep > 2 ? 'done' : ''}"></div>
      <div class="step ${checkoutStep >= 3 ? 'active' : ''}">
        <span class="step-num">3</span><span>${t('checkout_review')}</span>
      </div>
    </div>
    <div class="checkout-layout">
      <div class="checkout-form-area">
        ${checkoutStep === 1 ? `
          <div class="form-section">
            <h3>${t('checkout_shipping')}</h3>
            <div class="form-row">
              <div class="form-group"><label>${t('checkout_firstname')}</label><input type="text" id="c-fname" placeholder="${t('checkout_firstname')}"></div>
              <div class="form-group"><label>${t('checkout_lastname')}</label><input type="text" id="c-lname" placeholder="${t('checkout_lastname')}"></div>
            </div>
            <div class="form-row">
              <div class="form-group"><label>${t('checkout_email')}</label><input type="email" id="c-email" placeholder="${t('checkout_email')}"></div>
              <div class="form-group"><label>${t('checkout_phone')}</label><input type="tel" id="c-phone" placeholder="${t('checkout_phone')}"></div>
            </div>
            <div class="form-group"><label>${t('checkout_address')}</label><input type="text" id="c-address" placeholder="${t('checkout_address')}"></div>
            <div class="form-row">
              <div class="form-group"><label>${t('checkout_city')}</label><input type="text" id="c-city" placeholder="${t('checkout_city')}"></div>
              <div class="form-group"><label>${t('checkout_zip')}</label><input type="text" id="c-zip" placeholder="${t('checkout_zip')}"></div>
            </div>
            <div class="form-group">
              <label>${t('checkout_country')}</label>
              <select id="c-country">
                <option>France</option><option>Belgique</option><option>Suisse</option>
                <option>Canada</option><option>Germany</option><option>Spain</option><option>Italy</option>
              </select>
            </div>
            <button class="btn-primary btn-full" onclick="checkoutStep=2; renderCheckoutPage()">${t('checkout_next')} →</button>
          </div>
        ` : checkoutStep === 2 ? `
          <div class="form-section">
            <h3>${t('checkout_payment')}</h3>
            <div class="payment-methods">
              <label class="pay-method active"><input type="radio" name="pay" value="card" checked> 💳 Carte bancaire</label>
              <label class="pay-method"><input type="radio" name="pay" value="paypal"> 🅿 PayPal</label>
            </div>
            <div class="form-group card-input-wrap">
              <label>${t('checkout_card_number')}</label>
              <input type="text" placeholder="1234 5678 9012 3456" maxlength="19" id="c-card" oninput="formatCard(this)">
            </div>
            <div class="form-group"><label>${t('checkout_card_name')}</label><input type="text" id="c-cardname" placeholder="${t('checkout_card_name')}"></div>
            <div class="form-row">
              <div class="form-group"><label>${t('checkout_expiry')}</label><input type="text" placeholder="MM/AA" maxlength="5" id="c-expiry" oninput="formatExpiry(this)"></div>
              <div class="form-group"><label>${t('checkout_cvv')}</label><input type="text" placeholder="CVV" maxlength="3" id="c-cvv"></div>
            </div>
            <div class="secure-badge">🔒 Paiement 100% sécurisé · SSL · PCI DSS</div>
            <div class="form-row btn-row">
              <button class="btn-outline" onclick="checkoutStep=1; renderCheckoutPage()">← ${t('checkout_back')}</button>
              <button class="btn-primary" onclick="checkoutStep=3; renderCheckoutPage()">${t('checkout_next')} →</button>
            </div>
          </div>
        ` : checkoutStep === 3 ? `
          <div class="form-section">
            <h3>${t('checkout_review')}</h3>
            <div class="order-review">
              ${cart.map(item => {
                const p = products.find(pr => pr.id === item.id);
                if (!p) return '';
                return `<div class="review-item">
                  <img src="${p.image}" alt="">
                  <div><strong>${getProductName(p)}</strong> × ${item.qty}</div>
                  <strong>${formatPrice(p.price * item.qty)}</strong>
                </div>`;
              }).join('')}
            </div>
            <div class="form-row btn-row">
              <button class="btn-outline" onclick="checkoutStep=2; renderCheckoutPage()">← ${t('checkout_back')}</button>
              <button class="btn-primary btn-success" onclick="placeOrder()">${t('checkout_place_order')} ✓</button>
            </div>
          </div>
        ` : `
          <div class="order-success">
            <div class="success-icon">✓</div>
            <h2>${t('checkout_success')}</h2>
            <p>${t('checkout_success_msg')}</p>
            <button class="btn-primary" onclick="navigate('orders')">${t('nav_orders')}</button>
            <button class="btn-outline" onclick="navigate('shop')">${t('nav_shop')}</button>
          </div>
        `}
      </div>
      <div class="order-summary-side">
        <h3>${t('checkout_review')}</h3>
        <div class="order-items-side">
          ${cart.map(item => {
            const p = products.find(pr => pr.id === item.id);
            if (!p) return '';
            return `<div class="side-item"><img src="${p.image}" alt=""><div><span>${getProductName(p)}</span><br><small>× ${item.qty}</small></div><strong>${formatPrice(p.price*item.qty)}</strong></div>`;
          }).join('')}
        </div>
        <div class="summary-row"><span>${t('cart_subtotal')}</span><span>${formatPrice(total)}</span></div>
        <div class="summary-row"><span>${t('cart_shipping')}</span><span>${shipping === 0 ? t('cart_free_shipping') : formatPrice(shipping)}</span></div>
        <div class="summary-row total"><span>${t('cart_total')}</span><span>${formatPrice(grand)}</span></div>
      </div>
    </div>
  </div>`;
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function formatExpiry(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2);
  input.value = v;
}

function placeOrder() {
  const newOrder = {
    id: 'ORD-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
    total: getCartTotal() + (getCartTotal() >= 50 ? 0 : 5.99) + getCartTotal() * 0.2,
    items: [...cart],
    customer: 'Client',
    email: 'client@example.com'
  };
  orders.unshift(newOrder);
  cart = [];
  saveCart();
  checkoutStep = 4;
  renderCheckoutPage();
  showNotification(t('notification_order'), 'success');
}

// ===================== ORDERS PAGE =====================
function renderOrdersPage() {
  const container = document.getElementById('page-orders');
  if (!container) return;
  const statusColor = { pending: '#f39c12', processing: '#3498db', shipped: '#9b59b6', delivered: '#2ecc71', cancelled: '#e74c3c' };

  if (orders.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📦</div><h2>${t('orders_empty')}</h2><button class="btn-primary" onclick="navigate('shop')">${t('nav_shop')}</button></div>`;
    return;
  }

  container.innerHTML = `
  <div class="orders-wrap">
    <h1 class="page-title">${t('orders_title')}</h1>
    <div class="orders-list">
      ${orders.map(o => `
        <div class="order-card">
          <div class="order-header">
            <div>
              <strong>${t('order_id')}${o.id}</strong>
              <span class="order-date">${o.date}</span>
            </div>
            <span class="order-status-badge" style="background:${statusColor[o.status]}20; color:${statusColor[o.status]}; border-color:${statusColor[o.status]}40">
              ${t('order_' + o.status)}
            </span>
          </div>
          <div class="order-items-preview">
            ${o.items.slice(0, 3).map(item => {
              const p = products.find(pr => pr.id === item.productId || pr.id === item.id);
              return p ? `<img src="${p.image}" alt="${getProductName(p)}" title="${getProductName(p)}">` : '';
            }).join('')}
            ${o.items.length > 3 ? `<span class="more-items">+${o.items.length - 3}</span>` : ''}
          </div>
          <div class="order-footer">
            <span class="order-total">${t('order_total')}: <strong>${formatPrice(o.total)}</strong></span>
            <div class="order-progress">
              ${['pending','processing','shipped','delivered'].map(s => `<div class="prog-dot ${['pending','processing','shipped','delivered'].indexOf(o.status) >= ['pending','processing','shipped','delivered'].indexOf(s) ? 'done' : ''}" title="${t('order_' + s)}"></div>`).join('<div class="prog-line"></div>')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

// ===================== WISHLIST PAGE =====================
function renderWishlistPage() {
  const container = document.getElementById('page-wishlist');
  if (!container) return;
  const items = products.filter(p => wishlist.includes(p.id));
  if (items.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">❤️</div><h2>${t('nav_wishlist')}</h2><p>${t('cart_empty_sub')}</p><button class="btn-primary" onclick="navigate('shop')">${t('nav_shop')}</button></div>`;
    return;
  }
  container.innerHTML = `<div class="shop-wrap"><h1 class="page-title">${t('nav_wishlist')}</h1><div class="products-grid">${items.map(p => productCard(p)).join('')}</div></div>`;
  bindProductEvents(container);
}

// ===================== ACCOUNT PAGE =====================
function renderAccountPage() {
  const container = document.getElementById('page-account');
  if (!container) return;

  if (!currentUser) {
    container.innerHTML = `
    <div class="auth-wrap">
      <div class="auth-card">
        <h2 id="auth-title">${t('login_title')}</h2>
        <div id="auth-form">
          <div class="form-group"><label>${t('login_email')}</label><input type="email" id="auth-email" placeholder="${t('login_email')}"></div>
          <div class="form-group"><label>${t('login_password')}</label><input type="password" id="auth-pw" placeholder="${t('login_password')}"></div>
          <button class="btn-primary btn-full" onclick="loginUser()">${t('login_submit')}</button>
          <div class="auth-links">
            <a href="#" onclick="toggleAuthMode()">${t('login_register')}</a>
            <a href="#">${t('login_forgot')}</a>
          </div>
        </div>
      </div>
    </div>`;
  } else {
    container.innerHTML = `
    <div class="account-wrap">
      <h1>${t('nav_account')}</h1>
      <div class="account-grid">
        <div class="account-card" onclick="navigate('orders')">
          <div class="acc-icon">📦</div>
          <h3>${t('nav_orders')}</h3>
          <p>${orders.length} ${t('nav_orders').toLowerCase()}</p>
        </div>
        <div class="account-card" onclick="navigate('wishlist')">
          <div class="acc-icon">❤️</div>
          <h3>${t('nav_wishlist')}</h3>
          <p>${wishlist.length} articles</p>
        </div>
        <div class="account-card">
          <div class="acc-icon">⚙️</div>
          <h3>${t('admin_settings')}</h3>
          <p>Paramètres</p>
        </div>
        <div class="account-card" onclick="logoutUser()">
          <div class="acc-icon">🚪</div>
          <h3>Déconnexion</h3>
          <p>${currentUser.email}</p>
        </div>
      </div>
    </div>`;
  }
}

function loginUser() {
  const email = document.getElementById('auth-email')?.value;
  const pw = document.getElementById('auth-pw')?.value;
  if (!email || !pw) return;
  currentUser = { email, name: email.split('@')[0] };
  localStorage.setItem('user', JSON.stringify(currentUser));
  renderAccountPage();
  showNotification('Bienvenue ' + currentUser.name + ' !');
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem('user');
  renderAccountPage();
}

function toggleAuthMode() {
  const title = document.getElementById('auth-title');
  if (title) title.textContent = title.textContent === t('login_title') ? t('register_title') : t('login_title');
}

// ===================== ADMIN PAGE =====================
function renderAdminPage() {
  const container = document.getElementById('page-admin');
  if (!container) return;
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const todayOrders = orders.filter(o => o.date === new Date().toISOString().split('T')[0]).length;

  container.innerHTML = `
  <div class="admin-wrap">
    <div class="admin-sidebar">
      <div class="admin-logo">⚡ Admin</div>
      <nav class="admin-nav">
        ${['overview','products','orders','customers','analytics','settings'].map(s => `
          <button class="admin-nav-btn ${adminSection===s?'active':''}" onclick="setAdminSection('${s}')">
            ${ {overview:'📊',products:'📦',orders:'🛒',customers:'👥',analytics:'📈',settings:'⚙️'}[s] }
            ${t('admin_' + s)}
          </button>`).join('')}
        <button class="admin-nav-btn" onclick="navigate('home')" style="margin-top:auto">← ${t('nav_home')}</button>
      </nav>
    </div>
    <div class="admin-main">
      <div class="admin-header">
        <h2>${t('admin_' + adminSection)}</h2>
        ${adminSection === 'products' ? `<button class="btn-primary" onclick="showAddProduct()">+ ${t('admin_add_product')}</button>` : ''}
      </div>
      <div id="admin-content">${renderAdminSection()}</div>
    </div>
  </div>`;
}

function setAdminSection(s) { adminSection = s; renderAdminPage(); }

function renderAdminSection() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const todayOrders = orders.filter(o => o.date === new Date().toISOString().split('T')[0]).length;

  switch(adminSection) {
    case 'overview': return `
      <div class="stats-grid">
        <div class="stat-card" style="--color:#6c63ff">
          <div class="stat-icon">💰</div>
          <div class="stat-value">${formatPrice(totalRevenue)}</div>
          <div class="stat-label">${t('admin_revenue')}</div>
          <div class="stat-trend up">↑ +12.5%</div>
        </div>
        <div class="stat-card" style="--color:#f093fb">
          <div class="stat-icon">🛒</div>
          <div class="stat-value">${orders.length}</div>
          <div class="stat-label">${t('admin_orders')}</div>
          <div class="stat-trend up">↑ +8.2%</div>
        </div>
        <div class="stat-card" style="--color:#4facfe">
          <div class="stat-icon">👥</div>
          <div class="stat-value">1,284</div>
          <div class="stat-label">${t('admin_customers_total')}</div>
          <div class="stat-trend up">↑ +15.1%</div>
        </div>
        <div class="stat-card" style="--color:#43e97b">
          <div class="stat-icon">📦</div>
          <div class="stat-value">${products.length}</div>
          <div class="stat-label">${t('admin_products_total')}</div>
          <div class="stat-trend">→ stable</div>
        </div>
      </div>
      <div class="admin-charts">
        <div class="chart-placeholder">
          <h4>📈 Ventes 30 jours</h4>
          <div class="mini-chart">${[40,65,45,80,55,90,70,85,60,95,75,88,50,72,68,85,92,78,65,88,94,72,80,68,85,92,75,88,95,82].map((v,i) => `<div class="chart-bar" style="height:${v}%;animation-delay:${i*30}ms"></div>`).join('')}</div>
        </div>
        <div class="recent-orders-admin">
          <h4>Commandes récentes</h4>
          ${orders.slice(0, 5).map(o => `
            <div class="admin-order-row">
              <span class="order-id">${o.id}</span>
              <span>${o.customer}</span>
              <span class="status-dot status-${o.status}">●</span>
              <strong>${formatPrice(o.total)}</strong>
            </div>`).join('')}
        </div>
      </div>`;

    case 'products': return `
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>Image</th><th>Nom</th><th>Catégorie</th><th>Prix</th><th>Stock</th><th>Actions</th></tr></thead>
          <tbody>
            ${products.map(p => `
              <tr>
                <td><img src="${p.image}" alt="" class="table-thumb"></td>
                <td><strong>${getProductName(p)}</strong><br><small>${p.sku}</small></td>
                <td><span class="cat-tag">${t('cat_' + p.category)}</span></td>
                <td>${formatPrice(p.price)}</td>
                <td><span class="stock-badge ${p.stock < 10 ? 'low' : ''}">${p.stock}</span></td>
                <td class="actions-cell">
                  <button class="btn-icon">${t('admin_edit')} ✏️</button>
                  <button class="btn-icon danger">${t('admin_delete')} 🗑</button>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;

    case 'orders': return `
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>${t('order_id')}</th><th>Client</th><th>${t('order_date')}</th><th>${t('order_status')}</th><th>${t('order_total')}</th><th>Actions</th></tr></thead>
          <tbody>
            ${orders.map(o => `
              <tr>
                <td><strong>${o.id}</strong></td>
                <td>${o.customer}<br><small>${o.email}</small></td>
                <td>${o.date}</td>
                <td><span class="status-badge status-${o.status}">${t('order_' + o.status)}</span></td>
                <td><strong>${formatPrice(o.total)}</strong></td>
                <td><button class="btn-icon">${t('order_details')}</button></td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;

    case 'customers': return `
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead><tr><th>Client</th><th>Email</th><th>Commandes</th><th>Total dépensé</th><th>Statut</th></tr></thead>
          <tbody>
            ${[...new Set(orders.map(o => o.customer))].map(name => {
              const cOrders = orders.filter(o => o.customer === name);
              const total = cOrders.reduce((s,o) => s+o.total, 0);
              return `<tr>
                <td><div class="customer-avatar">${name[0]}</div> ${name}</td>
                <td>${cOrders[0].email}</td>
                <td>${cOrders.length}</td>
                <td>${formatPrice(total)}</td>
                <td><span class="status-badge status-delivered">Actif</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;

    case 'analytics': return `
      <div class="analytics-grid">
        <div class="analytics-card">
          <h4>Catégories populaires</h4>
          ${['electronics','fashion','home','beauty','sports','books'].map(cat => {
            const count = products.filter(p => p.category === cat).length;
            const pct = Math.round(count/products.length*100);
            return `<div class="cat-bar"><span>${t('cat_' + cat)}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><span>${pct}%</span></div>`;
          }).join('')}
        </div>
        <div class="analytics-card">
          <h4>Statuts des commandes</h4>
          ${['pending','processing','shipped','delivered','cancelled'].map(s => {
            const count = orders.filter(o => o.status === s).length;
            const pct = orders.length > 0 ? Math.round(count/orders.length*100) : 0;
            return `<div class="cat-bar"><span>${t('order_' + s)}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:var(--status-${s})"></div></div><span>${count}</span></div>`;
          }).join('')}
        </div>
      </div>`;

    case 'settings': return `
      <div class="settings-wrap">
        <div class="settings-group">
          <h4>Langue de l'interface</h4>
          <div class="settings-langs">
            ${['fr','en','de','es'].map(l => `<button class="btn-lang-set ${currentLang===l?'active':''}" onclick="setLang('${l}'); renderAdminPage();">${l.toUpperCase()}</button>`).join('')}
          </div>
        </div>
        <div class="settings-group">
          <h4>Thème</h4>
          <div class="theme-btns">
            <button class="btn-theme" onclick="document.body.classList.remove('dark')">☀️ Clair</button>
            <button class="btn-theme" onclick="document.body.classList.add('dark')">🌙 Sombre</button>
          </div>
        </div>
        <div class="settings-group">
          <h4>Boutique</h4>
          <div class="form-group"><label>Nom de la boutique</label><input type="text" value="LUXO Store"></div>
          <div class="form-group"><label>Email contact</label><input type="email" value="contact@luxo.com"></div>
          <button class="btn-primary">${t('save')} ✓</button>
        </div>
      </div>`;

    default: return '<p>Section en cours de développement</p>';
  }
}

// ===================== SEARCH =====================
function handleSearch(query) {
  searchQuery = query;
  if (query.length > 0) {
    filterCategory = 'all';
    navigate('shop');
  }
}

// ===================== INIT =====================
function initApp() {
  updateCartUI();
  setLang(currentLang);
  navigate('home');

  // Search input
  document.querySelectorAll('.search-input').forEach(inp => {
    inp.addEventListener('input', debounce(e => handleSearch(e.target.value), 300));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') handleSearch(e.target.value); });
  });

  // Mobile menu
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('open');
    document.getElementById('menu-overlay')?.classList.toggle('show');
  });
  document.getElementById('menu-overlay')?.addEventListener('click', closeMobileMenu);

  // Category filters
  document.querySelectorAll('.cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterCategory = btn.dataset.cat;
      navigate('shop');
    });
  });

  // Sort
  document.getElementById('sort-select')?.addEventListener('change', e => {
    filterSort = e.target.value;
    renderShopPage();
  });

  // Lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.lang);
      if (['home','shop'].includes(currentPage)) navigate(currentPage);
      else if (currentPage === 'product') renderProductPage(currentProduct);
      else if (currentPage === 'cart') renderCartPage();
      else if (currentPage === 'orders') renderOrdersPage();
      else if (currentPage === 'admin') renderAdminPage();
    });
  });

  // Nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const page = link.dataset.page;
      if (page) navigate(page);
    });
  });

  // Hero buttons
  document.getElementById('hero-cta')?.addEventListener('click', () => navigate('shop'));
  document.getElementById('hero-cta2')?.addEventListener('click', () => { filterCategory = 'all'; filterSort = 'newest'; navigate('shop'); });

  // Theme toggle
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
}

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function onLangChange(lang) {
  if (currentPage === 'home') renderHomePage();
  else if (currentPage === 'shop') renderShopPage();
}

document.addEventListener('DOMContentLoaded', initApp);
