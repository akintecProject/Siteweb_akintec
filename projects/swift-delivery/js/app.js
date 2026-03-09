/* ============================================================
   SWIFTLY — SHARED UTILITIES
   Icons · i18n · Toast · Map · Chart · Cart · Data
   ============================================================ */

/* ── SVG ICONS ── */
const ICON = {
  home:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  search:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  orders:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>`,
  profile:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  track:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  map:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  earn:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></svg>`,
  dash:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  users:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  drivers:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 012-2h6a2 2 0 012 2v1.662"/></svg>`,
  reports:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M20 12h2M2 12h2M12 20v2M12 2v2"/></svg>`,
  bell:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
  heart:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  star:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  phone:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.59 10.87 19.79 19.79 0 01.5 2.22 2 2 0 012.49 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  msg:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  navigate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
  check:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>`,
  arrow_r:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="9 18 15 12 9 6"/></svg>`,
  arrow_l:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="15 18 9 12 15 6"/></svg>`,
  plus:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  minus:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  clock:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  card:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  gift:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>`,
  bike:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2"/></svg>`,
  truck:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  logout:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  help:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  promo:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  store:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  info:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  close:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  menu_h:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
};
function icon(k, cls='') {
  return `<span class="icon ${cls}" style="display:inline-flex;align-items:center;justify-content:center">${ICON[k]||''}</span>`;
}

/* ── i18n ── */
const _LANG_KEY = 'sw_lang';
const TR = {
  fr:{
    app:'Swiftly', tagline:'Livraison rapide et fraîche',
    loading:'Chargement...', save:'Enregistrer', cancel:'Annuler',
    confirm:'Confirmer', back:'Retour', close:'Fermer', search:'Rechercher restaurants, plats...',
    view_all:'Voir tout', see_more:'Voir plus',
    good_morning:'Bonjour', good_evening:'Bonsoir',
    delivered_to:'Livrer à', change:'Modifier',
    cat_all:'Tout', cat_food:'Restaurants', cat_grocery:'Épicerie', cat_pharma:'Pharmacie', cat_dessert:'Desserts', cat_drinks:'Boissons', cat_healthy:'Healthy',
    featured:'Sélection du moment', popular:'Les plus populaires', nearby:'Près de vous', new:'Nouveaux',
    offers:'Offres spéciales', promo_text:'50% sur votre 1re commande', promo_sub:'Utilisez le code WELCOME50',
    order_min:'Commande min.', delivery_fee:'Livraison', delivery_time:'min',
    open_now:'Ouvert', closed:'Fermé', popular_items:'Populaires', all_items:'Tout le menu',
    add_to_cart:'Ajouter', item_added:'Ajouté au panier',
    cart:'Panier', cart_empty:'Votre panier est vide', cart_empty_sub:'Commandez dès maintenant',
    checkout:'Commander', cart_items:'articles', subtotal:'Sous-total', total:'Total', tip:'Pourboire',
    address_lbl:'Adresse de livraison', sched_lbl:'Quand livrer ?', asap:'Dès que possible', schedule:'Planifier',
    payment:'Paiement', pay_card:'Carte bancaire', pay_mobile:'Mobile Money', pay_cash:'Espèces', place_order:'Confirmer la commande',
    promo_code:'Code promo', apply:'Appliquer',
    order_placed:'Commande passée !', order_confirmed:'Votre commande est confirmée',
    tracking:'Suivi en temps réel', eta:'Arrivée estimée', driver:'Votre livreur', contact:'Contacter', chat:'Chat',
    step_confirmed:'Confirmée', step_preparing:'En préparation', step_ready:'Prête', step_onway:'En route', step_delivered:'Livrée',
    orders:'Commandes', active_orders:'En cours', past_orders:'Historique', reorder:'Commander à nouveau', rate:'Évaluer',
    profile:'Profil', edit_profile:'Modifier le profil', my_addresses:'Mes adresses', payment_methods:'Paiements',
    notifs:'Notifications', lang_label:'Langue', help:'Aide & Support', logout:'Déconnexion',
    loyalty:'Fidélité', points:'points', next_reward:'prochain avantage',
    status_pending:'En attente', status_confirmed:'Confirmée', status_preparing:'En préparation', status_onway:'En route', status_delivered:'Livrée', status_cancelled:'Annulée',
    driver_online:'En ligne', driver_offline:'Hors ligne', driver_available:'Disponible', driver_busy:'En course',
    new_order:'Nouvelle course', accept:'Accepter', decline:'Refuser', pickup:'Récupérer', deliver:'Livré',
    earnings:'Revenus', today:'Aujourd\'hui', week:'Semaine', month:'Mois', deliveries:'Livraisons', distance:'Distance',
    admin_dashboard:'Tableau de bord', admin_orders:'Commandes', admin_drivers:'Livreurs', admin_users:'Clients',
    admin_analytics:'Analytiques', admin_promos:'Promotions', admin_settings:'Paramètres', admin_map:'Carte live',
    total_orders:'Commandes totales', active_drivers:'Livreurs actifs', revenue:'Chiffre d\'affaires', avg_time:'Délai moyen',
    online:'En ligne', offline:'Hors ligne', yesterday:'Hier', min_ago:'min',
  },
  en:{
    app:'Swiftly', tagline:'Fast & fresh delivery',
    loading:'Loading...', save:'Save', cancel:'Cancel',
    confirm:'Confirm', back:'Back', close:'Close', search:'Search restaurants, dishes...',
    view_all:'View all', see_more:'See more',
    good_morning:'Good morning', good_evening:'Good evening',
    delivered_to:'Deliver to', change:'Change',
    cat_all:'All', cat_food:'Restaurants', cat_grocery:'Grocery', cat_pharma:'Pharmacy', cat_dessert:'Desserts', cat_drinks:'Drinks', cat_healthy:'Healthy',
    featured:'Trending now', popular:'Most popular', nearby:'Near you', new:'New',
    offers:'Special offers', promo_text:'50% off your 1st order', promo_sub:'Use code WELCOME50',
    order_min:'Min. order', delivery_fee:'Delivery', delivery_time:'min',
    open_now:'Open', closed:'Closed', popular_items:'Popular', all_items:'Full menu',
    add_to_cart:'Add', item_added:'Added to cart',
    cart:'Cart', cart_empty:'Your cart is empty', cart_empty_sub:'Order something delicious',
    checkout:'Checkout', cart_items:'items', subtotal:'Subtotal', total:'Total', tip:'Tip',
    address_lbl:'Delivery address', sched_lbl:'When to deliver?', asap:'As soon as possible', schedule:'Schedule',
    payment:'Payment', pay_card:'Credit card', pay_mobile:'Mobile Money', pay_cash:'Cash', place_order:'Place order',
    promo_code:'Promo code', apply:'Apply',
    order_placed:'Order placed!', order_confirmed:'Your order is confirmed',
    tracking:'Real-time tracking', eta:'Estimated arrival', driver:'Your driver', contact:'Contact', chat:'Chat',
    step_confirmed:'Confirmed', step_preparing:'Preparing', step_ready:'Ready', step_onway:'On the way', step_delivered:'Delivered',
    orders:'Orders', active_orders:'Active', past_orders:'History', reorder:'Reorder', rate:'Rate',
    profile:'Profile', edit_profile:'Edit profile', my_addresses:'My addresses', payment_methods:'Payments',
    notifs:'Notifications', lang_label:'Language', help:'Help & Support', logout:'Log out',
    loyalty:'Loyalty', points:'points', next_reward:'next reward',
    status_pending:'Pending', status_confirmed:'Confirmed', status_preparing:'Preparing', status_onway:'On the way', status_delivered:'Delivered', status_cancelled:'Cancelled',
    driver_online:'Online', driver_offline:'Offline', driver_available:'Available', driver_busy:'On delivery',
    new_order:'New order', accept:'Accept', decline:'Decline', pickup:'Pick up', deliver:'Delivered',
    earnings:'Earnings', today:'Today', week:'Week', month:'Month', deliveries:'Deliveries', distance:'Distance',
    admin_dashboard:'Dashboard', admin_orders:'Orders', admin_drivers:'Drivers', admin_users:'Customers',
    admin_analytics:'Analytics', admin_promos:'Promotions', admin_settings:'Settings', admin_map:'Live Map',
    total_orders:'Total orders', active_drivers:'Active drivers', revenue:'Revenue', avg_time:'Avg. delivery',
    online:'Online', offline:'Offline', yesterday:'Yesterday', min_ago:'min ago',
  },
  de:{
    app:'Swiftly', tagline:'Schnelle und frische Lieferung',
    loading:'Wird geladen...', save:'Speichern', cancel:'Abbrechen',
    confirm:'Bestätigen', back:'Zurück', close:'Schließen', search:'Restaurants, Gerichte suchen...',
    view_all:'Alle anzeigen', see_more:'Mehr sehen',
    good_morning:'Guten Morgen', good_evening:'Guten Abend',
    delivered_to:'Liefern an', change:'Ändern',
    cat_all:'Alle', cat_food:'Restaurants', cat_grocery:'Lebensmittel', cat_pharma:'Apotheke', cat_dessert:'Desserts', cat_drinks:'Getränke', cat_healthy:'Gesund',
    featured:'Aktuelle Auswahl', popular:'Am beliebtesten', nearby:'In der Nähe', new:'Neu',
    offers:'Sonderangebote', promo_text:'50% auf Ihre 1. Bestellung', promo_sub:'Code WELCOME50 verwenden',
    order_min:'Mindestbestellung', delivery_fee:'Lieferung', delivery_time:'Min',
    open_now:'Geöffnet', closed:'Geschlossen', popular_items:'Beliebt', all_items:'Vollständige Speisekarte',
    add_to_cart:'Hinzufügen', item_added:'In den Warenkorb',
    cart:'Warenkorb', cart_empty:'Ihr Warenkorb ist leer', cart_empty_sub:'Jetzt bestellen',
    checkout:'Bestellen', cart_items:'Artikel', subtotal:'Zwischensumme', total:'Gesamt', tip:'Trinkgeld',
    address_lbl:'Lieferadresse', sched_lbl:'Wann liefern?', asap:'So schnell wie möglich', schedule:'Planen',
    payment:'Zahlung', pay_card:'Bankkarte', pay_mobile:'Mobile Zahlung', pay_cash:'Bargeld', place_order:'Bestellung aufgeben',
    promo_code:'Promocode', apply:'Anwenden',
    order_placed:'Bestellung aufgegeben!', order_confirmed:'Ihre Bestellung ist bestätigt',
    tracking:'Echtzeit-Verfolgung', eta:'Geschätzte Ankunft', driver:'Ihr Fahrer', contact:'Kontaktieren', chat:'Chat',
    step_confirmed:'Bestätigt', step_preparing:'Wird zubereitet', step_ready:'Bereit', step_onway:'Unterwegs', step_delivered:'Geliefert',
    orders:'Bestellungen', active_orders:'Aktiv', past_orders:'Verlauf', reorder:'Erneut bestellen', rate:'Bewerten',
    profile:'Profil', edit_profile:'Profil bearbeiten', my_addresses:'Meine Adressen', payment_methods:'Zahlungen',
    notifs:'Benachrichtigungen', lang_label:'Sprache', help:'Hilfe & Support', logout:'Abmelden',
    loyalty:'Treueprogramm', points:'Punkte', next_reward:'nächste Prämie',
    status_pending:'Ausstehend', status_confirmed:'Bestätigt', status_preparing:'In Vorbereitung', status_onway:'Unterwegs', status_delivered:'Geliefert', status_cancelled:'Storniert',
    driver_online:'Online', driver_offline:'Offline', driver_available:'Verfügbar', driver_busy:'Im Einsatz',
    new_order:'Neuer Auftrag', accept:'Annehmen', decline:'Ablehnen', pickup:'Abholen', deliver:'Geliefert',
    earnings:'Einnahmen', today:'Heute', week:'Woche', month:'Monat', deliveries:'Lieferungen', distance:'Entfernung',
    admin_dashboard:'Dashboard', admin_orders:'Bestellungen', admin_drivers:'Fahrer', admin_users:'Kunden',
    admin_analytics:'Analytik', admin_promos:'Aktionen', admin_settings:'Einstellungen', admin_map:'Live-Karte',
    total_orders:'Gesamtbestellungen', active_drivers:'Aktive Fahrer', revenue:'Umsatz', avg_time:'Ø Lieferzeit',
    online:'Online', offline:'Offline', yesterday:'Gestern', min_ago:'Min',
  },
  es:{
    app:'Swiftly', tagline:'Entrega rápida y fresca',
    loading:'Cargando...', save:'Guardar', cancel:'Cancelar',
    confirm:'Confirmar', back:'Volver', close:'Cerrar', search:'Buscar restaurantes, platos...',
    view_all:'Ver todo', see_more:'Ver más',
    good_morning:'Buenos días', good_evening:'Buenas noches',
    delivered_to:'Entregar en', change:'Cambiar',
    cat_all:'Todo', cat_food:'Restaurantes', cat_grocery:'Supermercado', cat_pharma:'Farmacia', cat_dessert:'Postres', cat_drinks:'Bebidas', cat_healthy:'Saludable',
    featured:'Tendencias', popular:'Más populares', nearby:'Cerca de ti', new:'Nuevo',
    offers:'Ofertas especiales', promo_text:'50% en tu 1º pedido', promo_sub:'Usa el código WELCOME50',
    order_min:'Pedido mín.', delivery_fee:'Envío', delivery_time:'min',
    open_now:'Abierto', closed:'Cerrado', popular_items:'Populares', all_items:'Menú completo',
    add_to_cart:'Añadir', item_added:'Añadido al carrito',
    cart:'Carrito', cart_empty:'Tu carrito está vacío', cart_empty_sub:'Pide algo delicioso',
    checkout:'Pedir', cart_items:'artículos', subtotal:'Subtotal', total:'Total', tip:'Propina',
    address_lbl:'Dirección de entrega', sched_lbl:'¿Cuándo entregar?', asap:'Lo antes posible', schedule:'Programar',
    payment:'Pago', pay_card:'Tarjeta bancaria', pay_mobile:'Pago móvil', pay_cash:'Efectivo', place_order:'Realizar pedido',
    promo_code:'Código promo', apply:'Aplicar',
    order_placed:'¡Pedido realizado!', order_confirmed:'Tu pedido está confirmado',
    tracking:'Seguimiento en tiempo real', eta:'Llegada estimada', driver:'Tu repartidor', contact:'Contactar', chat:'Chat',
    step_confirmed:'Confirmado', step_preparing:'Preparando', step_ready:'Listo', step_onway:'En camino', step_delivered:'Entregado',
    orders:'Pedidos', active_orders:'Activos', past_orders:'Historial', reorder:'Repetir pedido', rate:'Valorar',
    profile:'Perfil', edit_profile:'Editar perfil', my_addresses:'Mis direcciones', payment_methods:'Pagos',
    notifs:'Notificaciones', lang_label:'Idioma', help:'Ayuda', logout:'Cerrar sesión',
    loyalty:'Fidelidad', points:'puntos', next_reward:'próxima recompensa',
    status_pending:'Pendiente', status_confirmed:'Confirmado', status_preparing:'Preparando', status_onway:'En camino', status_delivered:'Entregado', status_cancelled:'Cancelado',
    driver_online:'En línea', driver_offline:'Desconectado', driver_available:'Disponible', driver_busy:'En entrega',
    new_order:'Nuevo pedido', accept:'Aceptar', decline:'Rechazar', pickup:'Recoger', deliver:'Entregado',
    earnings:'Ganancias', today:'Hoy', week:'Semana', month:'Mes', deliveries:'Entregas', distance:'Distancia',
    admin_dashboard:'Panel', admin_orders:'Pedidos', admin_drivers:'Repartidores', admin_users:'Clientes',
    admin_analytics:'Analíticas', admin_promos:'Promociones', admin_settings:'Ajustes', admin_map:'Mapa en vivo',
    total_orders:'Pedidos totales', active_drivers:'Repartidores activos', revenue:'Ingresos', avg_time:'Tiempo medio',
    online:'En línea', offline:'Desconectado', yesterday:'Ayer', min_ago:'min',
  }
};
let _lang = (() => { try { return localStorage.getItem(_LANG_KEY)||'fr'; } catch{return 'fr';} })();
function t(k, p) {
  let s = TR[_lang]?.[k] ?? TR.fr?.[k] ?? k;
  if (p) Object.entries(p).forEach(([a,b])=>{ s=s.replace(`{${a}}`,b); });
  return s;
}
function setLang(l) {
  if (!TR[l]) return; _lang=l;
  try{localStorage.setItem(_LANG_KEY,l);}catch(e){}
  document.querySelectorAll('[data-t]').forEach(el=>{ el.textContent=t(el.dataset.t); });
  document.querySelectorAll('[data-t-ph]').forEach(el=>{ el.placeholder=t(el.dataset.tPh); });
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
  document.dispatchEvent(new CustomEvent('langchange',{detail:{lang:l}}));
}
function initLang() { setLang(_lang); }

/* ── TOAST ── */
function toast(title, body='', type='red', dur=4000) {
  let stack = document.getElementById('__toasts');
  if (!stack) { stack=document.createElement('div'); stack.id='__toasts'; stack.className='toast-stack'; document.body.appendChild(stack); }
  const el = document.createElement('div');
  el.className='toast';
  el.innerHTML=`<div class="toast-line toast-line-${type}"></div><div><div class="toast-title">${title}</div>${body?`<div class="toast-body">${body}</div>`:''}</div>`;
  el.onclick=()=>rmToast(el);
  stack.appendChild(el);
  setTimeout(()=>rmToast(el), dur);
}
function rmToast(el) { el.style.animation='toastOut .28s ease forwards'; setTimeout(()=>el.remove(),280); }

/* ── MODAL ── */
function openModal(id) { const m=document.getElementById(id); if(m){m.classList.add('open');document.body.style.overflow='hidden';} }
function closeModal(id){ const m=document.getElementById(id); if(m){m.classList.remove('open');document.body.style.overflow='';} }

/* ── MONEY ── */
function fmtMoney(n,c='EUR') {
  try{return new Intl.NumberFormat(_lang,{style:'currency',currency:c}).format(n);}
  catch{return n.toFixed(2)+' €';}
}
function fmtDate(d) {
  try{return new Intl.DateTimeFormat(_lang,{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(d));}
  catch{return new Date(d).toLocaleDateString();}
}

/* ── CLOCK ── */
function liveClock(id) {
  const tick=()=>{const e=document.getElementById(id);if(e)e.textContent=new Date().toLocaleTimeString(_lang,{hour:'2-digit',minute:'2-digit'});};
  tick(); return setInterval(tick,10000);
}

/* ── COUNTDOWN ── */
function countdown(id, mins) {
  let s=mins*60;
  const tick=()=>{
    const e=document.getElementById(id); if(!e){clearInterval(iv);return;}
    const m=Math.floor(s/60),sc=s%60;
    e.textContent=`${m}:${sc.toString().padStart(2,'0')}`;
    if(s>0)s--;
  };
  tick(); const iv=setInterval(tick,1000); return iv;
}

/* ── MAP ── */
function buildMap(cid, opts={}) {
  const el=document.getElementById(cid); if(!el)return;
  const {h=240,ox=15,oy=72,dx=82,dy=20,drx=30,dry=60,showRoute=true}=opts;
  el.style.height=h+'px';
  el.innerHTML=`
    <div class="map-base"></div>
    ${[[38,'h'],[58,'h'],[22,'v'],[55,'v']].map(([p,o])=>`<div class="map-road-h" style="${o==='h'?'top':'left'}:${p}%"></div>`).join('')}
    ${[[22,'v'],[55,'v']].map(([p])=>`<div class="map-road-v" style="left:${p}%"></div>`).join('')}
    <div class="map-road-main-h" style="top:58%;"></div>
    <div class="map-road-main-v" style="left:40%;"></div>
    ${[['15%','25%','25%','30%'],['60%','70%','18%','22%'],['48%','55%','62%','70%']].map(([l,r,t,b])=>`<div class="map-block" style="left:${l};right:${r};top:${t};bottom:${b}"></div>`).join('')}
    ${showRoute?`<svg class="map-route"><defs><marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><circle cx="4" cy="4" r="2.5" fill="rgba(232,52,10,.55)"/></marker></defs>
      <path id="mp-routebg" fill="none" stroke="rgba(232,52,10,.2)" stroke-width="4" stroke-dasharray="10 6" d="M${ox/100*300},${oy/100*h} Q${(ox+dx)/200*300},${(oy+dy)/200*h} ${dx/100*300},${dy/100*h}"/>
      <path id="mp-route"   fill="none" stroke="rgba(232,52,10,.7)" stroke-width="3" stroke-linecap="round" d="M${ox/100*300},${oy/100*h} Q${(ox+dx)/200*300},${(oy+dy)/200*h} ${drx/100*300},${dry/100*h}"/>
    </svg>`:''}
    <div class="map-pin pin-origin" style="left:${ox}%;top:${oy}%"></div>
    <div class="map-pin pin-dest"   style="left:${dx}%;top:${dy}%"></div>
    <div class="map-pin" id="${cid}-driver" style="left:${drx}%;top:${dry}%"><div class="pin-driver">${ICON.bike}</div></div>
    <div class="map-live-chip"><div class="live-blink"></div> LIVE</div>
  `;
  _animDriver(cid, drx, dry, dx, dy, h);
}
function _animDriver(cid,sx,sy,ex,ey,h) {
  let p=0;
  const iv=setInterval(()=>{
    const pin=document.getElementById(cid+'-driver'); if(!pin){clearInterval(iv);return;}
    p=Math.min(p+0.12,100);
    const t2=p/100, t1=1-t2;
    const mx=(sx+ex)/2, my=Math.min(sy,ey)-20;
    const x=t1*t1*sx+2*t1*t2*mx+t2*t2*ex;
    const y=t1*t1*sy+2*t1*t2*my+t2*t2*ey;
    pin.style.left=x+'%'; pin.style.top=y+'%';
    const rt=document.getElementById(cid+'-route');
    if(rt) rt.setAttribute('d',`M${sx/100*300},${sy/100*h} Q${mx/100*300},${my/100*h} ${x/100*300},${y/100*h}`);
    if(p>=100){clearInterval(iv); setTimeout(()=>toast(t('step_delivered'),'✓',  'green'),400);}
  },350);
}
function buildAdminMap(cid) {
  const el=document.getElementById(cid); if(!el)return;
  el.style.height='420px';
  const colors=[['var(--red)','#E8340A'],['#0057D9','#3B82F6'],['#00923F','#22C55E'],['#D97706','#F59E0B']];
  const pins=[{x:28,y:62,n:'Karim'},{x:56,y:38,n:'Sofia'},{x:72,y:66,n:'Lucas'},{x:18,y:32,n:'Yuki'}];
  el.innerHTML=`
    <div class="map-base"></div>
    <div class="map-road-main-h" style="top:55%"></div><div class="map-road-main-v" style="left:42%"></div>
    ${[[35,'h'],[70,'h']].map(([p,o])=>`<div class="map-road-h" style="top:${p}%"></div>`).join('')}
    ${[[20,'v'],[65,'v']].map(([p])=>`<div class="map-road-v" style="left:${p}%"></div>`).join('')}
    ${[['12%','22%','25%','50%'],['50%','62%','10%','32%'],['67%','80%','60%','80%']].map(([l,r,t,b])=>`<div class="map-block" style="left:${l};right:${r};top:${t};bottom:${b}"></div>`).join('')}
    ${pins.map((p,i)=>`<div class="map-pin" id="admp${i}" style="left:${p.x}%;top:${p.y}%"><div style="width:38px;height:38px;border-radius:50%;background:${colors[i][0]};display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 4px 14px ${colors[i][0]}66;font-family:var(--ff-display);color:white;font-size:.9rem;font-weight:700">${p.n[0]}</div></div>`).join('')}
    <div class="map-pin pin-origin" style="left:18%;top:74%"></div>
    <div class="map-pin pin-origin" style="left:54%;top:28%"></div>
    <div class="map-pin pin-dest"   style="left:80%;top:22%"></div>
    <div class="map-pin pin-dest"   style="left:88%;top:60%"></div>
    <div class="map-live-chip"><div class="live-blink"></div> 4 livreurs actifs</div>
    <div style="position:absolute;bottom:12px;left:12px;display:flex;gap:8px;flex-wrap:wrap">
      ${pins.map((p,i)=>`<div style="display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.92);border:1px solid var(--border);border-radius:99px;padding:4px 10px;font-size:.69rem;font-weight:600"><span style="width:8px;height:8px;border-radius:50%;background:${colors[i][0]};flex-shrink:0"></span>${p.n}</div>`).join('')}
    </div>
  `;
  pins.forEach((_,i)=>{
    let dx=(Math.random()-.5)*0.8, dy=(Math.random()-.5)*0.8;
    setInterval(()=>{
      const pin=document.getElementById('admp'+i); if(!pin)return;
      let x=parseFloat(pin.style.left)+dx*.06, y=parseFloat(pin.style.top)+dy*.06;
      if(x<4||x>90)dx=-dx; if(y<4||y>90)dy=-dy;
      pin.style.left=Math.max(4,Math.min(90,x))+'%'; pin.style.top=Math.max(4,Math.min(90,y))+'%';
    },700+i*150);
  });
}

/* ── CHART ── */
function renderChart(cid, data, labels, opts={}) {
  const el=document.getElementById(cid); if(!el)return;
  const max=Math.max(...data,1), {color='var(--red)'}=opts;
  el.innerHTML=`
    <div class="chart-bars">${data.map((v,i)=>`<div class="chart-bar ${opts.today===i?'':'opacity-80'}" style="height:${Math.round(v/max*100)}%;background:linear-gradient(180deg,${opts.today===i?color:'var(--border-dark)'} 0%,${opts.today===i?color+'CC':'var(--border)'} 100%)" title="${labels?labels[i]:i}: ${v}"></div>`).join('')}</div>
    ${labels?`<div class="chart-labels">${labels.map(l=>`<div class="chart-label">${l}</div>`).join('')}</div>`:''}
  `;
}

/* ── CARD FORMAT ── */
function fmtCardNum(v){ return v.replace(/\D/g,'').substr(0,16).replace(/(.{4})/g,'$1 ').trim(); }
function fmtExpiry(v) { const s=v.replace(/\D/g,''); return s.length>=2?s.substr(0,2)+'/'+s.substr(2,2):s; }

/* ── STATUS ── */
function statusBadge(s) {
  const m={
    pending:['amber','status_pending'], confirmed:['blue','status_confirmed'],
    preparing:['blue','status_preparing'], onway:['red','status_onway'],
    delivered:['green','status_delivered'], cancelled:['','status_cancelled'],
    online:['green','driver_online'], offline:['','driver_offline'], busy:['amber','driver_busy'],
  };
  const [c,k]=m[s]||['',''];
  const dot = s==='online'?`<span class="status-dot" style="background:var(--green)"></span>`:
               s==='busy'?`<span class="status-dot" style="background:var(--amber)"></span>`:'';
  return `<span class="badge badge-${c||'muted'}">${dot}${t(k||s)}</span>`;
}

/* ── PAYMENT PROCESSING ── */
function processPay(btnId, cb) {
  const b=document.getElementById(btnId); if(!b){cb&&cb();return;}
  const orig=b.innerHTML; b.disabled=true;
  b.innerHTML=`<span class="spinner"></span>&nbsp;${t('loading')}`;
  setTimeout(()=>{b.innerHTML=orig;b.disabled=false;cb&&cb();},2200);
}

/* ── MOCK DATA ── */
const IMG = {
  r1:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=380&fit=crop&auto=format',
  r2:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=380&fit=crop&auto=format',
  r3:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=380&fit=crop&auto=format',
  r4:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=380&fit=crop&auto=format',
  r5:'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=380&fit=crop&auto=format',
  r6:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=380&fit=crop&auto=format',
  f1:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&h=150&fit=crop&auto=format',
  f2:'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=150&h=150&fit=crop&auto=format',
  f3:'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150&h=150&fit=crop&auto=format',
  f4:'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=150&h=150&fit=crop&auto=format',
  f5:'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150&h=150&fit=crop&auto=format',
  f6:'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=150&h=150&fit=crop&auto=format',
  f7:'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=150&h=150&fit=crop&auto=format',
  f8:'https://images.unsplash.com/photo-1569950044272-e796d9e841f7?w=150&h=150&fit=crop&auto=format',
  promo:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&h=400&fit=crop&auto=format',
  drv:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&auto=format',
};
const RESTAURANTS = [
  {id:1,name:'Bistro Voltaire',   cat:'food',    rating:4.8,rcount:847,time:22,fee:1.9,  min:12,img:IMG.r1,tags:['Burgers','Américain'],open:true,promo:'20% OFF'},
  {id:2,name:'La Bella Napoli',   cat:'food',    rating:4.7,rcount:623,time:28,fee:2.5,  min:15,img:IMG.r2,tags:['Pizza','Italien'],    open:true,promo:null},
  {id:3,name:'Tokyo Kitchen',     cat:'food',    rating:4.9,rcount:1203,time:35,fee:1.5, min:20,img:IMG.r3,tags:['Sushis','Japonais'],  open:true,promo:'Nouveau'},
  {id:4,name:'Ramen Shinjuku',    cat:'food',    rating:4.6,rcount:412,time:30,fee:0.99, min:15,img:IMG.r4,tags:['Ramen','Japonais'],   open:true,promo:null},
  {id:5,name:'Trattoria Romana',  cat:'food',    rating:4.5,rcount:289,time:40,fee:2.0,  min:18,img:IMG.r5,tags:['Pasta','Italien'],    open:false,promo:null},
  {id:6,name:'Green Bowl',        cat:'healthy', rating:4.8,rcount:534,time:18,fee:1.5,  min:10,img:IMG.r6,tags:['Healthy','Salades'],  open:true,promo:null},
];
const MENU = {
  1:[
    {id:101,name:'Smash Burger Classic',   desc:'Double patty, cheddar fondu, cornichons, sauce secrète',price:14.9,  img:IMG.f1,popular:true},
    {id:102,name:'Burger BBQ Bacon',       desc:'Bacon croustillant, oignons caramélisés, BBQ maison',  price:16.5,  img:IMG.f2,popular:false},
    {id:103,name:'Cheesecake Maison',      desc:'Base biscuitée, crème onctueuse, coulis de fruits rouges',price:7.5,img:IMG.f3,popular:true},
    {id:104,name:'Frites Maison',          desc:'Pommes de terre fraîches, sel de Guérande',            price:4.9,   img:IMG.f4,popular:false},
  ],
  3:[
    {id:301,name:'Sushi Box 12 pièces',    desc:'Assortiment saumon, thon, crevettes, avocat',           price:18.9,  img:IMG.f4,popular:true},
    {id:302,name:'Chirashi Saumon',        desc:'Riz vinaigré, saumon frais, avocat, sésame',            price:16.5,  img:IMG.f5,popular:false},
    {id:303,name:'California Rolls x8',   desc:'Crabe, avocat, concombre, sauce ponzu',                 price:13.5,  img:IMG.f6,popular:true},
    {id:304,name:'Edamame Grillé',         desc:'Soja de saison, fleur de sel, sésame doré',             price:5.5,   img:IMG.f7,popular:false},
  ],
};
const ORDERS_DATA = [
  {id:'#8821',store:'Bistro Voltaire', storeImg:IMG.r1,items:['Smash Burger ×1','Frites ×1'],total:19.8, status:'delivered',date:Date.now()-3600000,rating:null},
  {id:'#8820',store:'Tokyo Kitchen',  storeImg:IMG.r3,items:['Sushi Box ×1','Edamame ×1'],  total:24.4, status:'delivered',date:Date.now()-86400000,rating:5},
  {id:'#8819',store:'Green Bowl',     storeImg:IMG.r6,items:['Buddha Bowl ×2'],               total:22.0, status:'delivered',date:Date.now()-172800000,rating:4},
  {id:'#8818',store:'Ramen Shinjuku', storeImg:IMG.r4,items:['Ramen Tonkotsu ×1'],            total:15.5, status:'cancelled',date:Date.now()-259200000,rating:null},
];
const DRIVER_DATA = {
  name:'Karim Bensalem', avatar:IMG.drv, rating:4.9, reviews:247,
  vehicle:'BMW R1250 GS', plate:'75-AB-123',
  orders_today:8, km_today:42, earnings_today:68.4,
};
const ADMIN_TABLE_ORDERS = [
  {id:'#8822',client:'Marie D.',  driver:'Karim B.', store:'Bistro Voltaire',  amount:19.8, status:'onway',     time:'14:32'},
  {id:'#8821',client:'Thomas L.', driver:'Sofia M.', store:'Tokyo Kitchen',    amount:35.5, status:'preparing', time:'14:28'},
  {id:'#8820',client:'Amina K.',  driver:'Lucas P.', store:'Green Bowl',       amount:22.0, status:'delivered', time:'13:55'},
  {id:'#8819',client:'Pierre G.', driver:'Nassim R.',store:'La Bella Napoli',  amount:28.5, status:'delivered', time:'13:40'},
  {id:'#8818',client:'Léa M.',    driver:'—',        store:'Ramen Shinjuku',   amount:15.5, status:'pending',   time:'14:52'},
  {id:'#8817',client:'Hugo B.',   driver:'Yuki T.',  store:'Trattoria Romana', amount:31.0, status:'confirmed', time:'14:55'},
];
const ADMIN_TABLE_DRIVERS = [
  {name:'Karim Bensalem', phone:'+33 6 12 34 56',status:'online', orders:8, km:42.3,rating:4.9,zone:'Paris 8-9e'},
  {name:'Sofia Martinov', phone:'+33 6 23 45 67',status:'busy',   orders:12,km:58.1,rating:4.7,zone:'Paris 1-2e'},
  {name:'Lucas Petit',    phone:'+33 6 34 56 78',status:'online', orders:5, km:28.7,rating:4.8,zone:'Paris 3-4e'},
  {name:'Nassim Rachid',  phone:'+33 6 45 67 89',status:'offline',orders:0, km:0,   rating:4.6,zone:'Paris 9e'},
  {name:'Yuki Tanaka',    phone:'+33 6 56 78 90',status:'online', orders:3, km:18.4,rating:5.0,zone:'Paris 2-3e'},
];

/* ── CART ── */
const Cart = {
  items:[],
  add(item){ const e=this.items.find(i=>i.id===item.id); if(e)e.qty++; else this.items.push({...item,qty:1}); this._upd(); toast(t('item_added'),item.name,'green',2000); },
  remove(id){ const i=this.items.findIndex(x=>x.id===id); if(i>-1){if(this.items[i].qty>1)this.items[i].qty--;else this.items.splice(i,1);} this._upd(); },
  qty(id){ return this.items.find(i=>i.id===id)?.qty||0; },
  subtotal(){ return this.items.reduce((s,i)=>s+i.price*i.qty,0); },
  count(){    return this.items.reduce((s,i)=>s+i.qty,0); },
  clear(){ this.items=[]; this._upd(); },
  _upd(){
    const fab=document.getElementById('cart-fab'); if(!fab)return;
    const c=this.count();
    fab.style.display=c>0?'flex':'none';
    const cnt=fab.querySelector('.cart-fab-count'); if(cnt)cnt.textContent=`${c} ${t('cart_items')}`;
    const ttl=fab.querySelector('.cart-fab-total'); if(ttl)ttl.textContent=fmtMoney(this.subtotal()+1.99);
  }
};
