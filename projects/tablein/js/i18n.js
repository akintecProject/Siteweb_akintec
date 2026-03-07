// ============================================================
//   TABLE·IN — i18n
// ============================================================
const LANGS = {
  fr: {
    // nav
    navRestaurant:'Le Restaurant', navMenu:'Menu', navGallery:'Galerie', navEvents:'Événements',
    signinBtn:'Se connecter', reserveBtn:'Réserver',
    // auth
    signin:'Connexion', signup:'Inscription',
    email:'Email', password:'Mot de passe', rememberMe:'Se souvenir',
    forgotPw:'Mot de passe oublié ?', or:'ou', googleContinue:'Continuer avec Google',
    firstName:'Prénom', lastName:'Nom', phone:'Téléphone',
    confirmPw:'Confirmer', acceptTerms:"J'accepte les conditions", createAcct:'Créer mon compte',
    // hero
    heroEye:'Gastronomie · Paris', heroT1:"L'art de la", heroT2:'table',
    heroSub:"Une expérience culinaire d'exception vous attend.\nRéservez votre table en quelques secondes.",
    reserveTable:'Réserver une table', seeMenu:'Découvrir le menu',
    openHours:'12h – 14h30 · 19h – 23h', table2Label:'2 – 12', table2sub:'personnes par table',
    scrollDown:'Défiler',
    // quick bar
    date:'Date', time:'Heure', guests:'Convives', checkAvail:'Vérifier disponibilité',
    // about
    aboutLabel:'Notre histoire', aboutTitle:"Une cuisine d'auteur au cœur de Paris",
    aboutP1:"Fondé en 2008 par le Chef Antoine Morel, Table·In propose une cuisine française contemporaine qui sublime les produits de saison. Chaque assiette est une invitation au voyage.",
    aboutP2:"Notre salle de 40 couverts, nichée dans un hôtel particulier du 8e arrondissement, offre un cadre intime et chaleureux pour toutes vos occasions.",
    // menu
    menuLabel:'Carte du moment', menuTitle:'Nos suggestions',
    starters:'Entrées', mains:'Plats', desserts:'Desserts', wines:'Vins',
    // gallery
    galleryLabel:'Ambiance', galleryTitle:'Dans nos salles',
    // events
    eventsLabel:'Agenda', eventsTitle:'Événements à venir',
    // reviews
    reviewsLabel:'Avis clients', reviewsTitle:'Ils nous ont fait confiance',
    // cta
    ctaLabel:'Réservation', ctaTitle:'Prêt pour une expérience inoubliable ?',
    ctaSub:'Tables disponibles dès ce soir. Réservez en 2 minutes.',
    // user menu
    myRes:'Mes réservations', notifMenu:'Notifications', myProfile:'Mon profil', myFavs:'Mes favoris',
    adminPanel:'Gestion admin', signout:'Déconnexion',
    // footer
    footerSlogan:"L'excellence dans chaque assiette.",
    fColInfo:'Informations', fColContact:'Contact', fColHours:'Horaires',
    giftCard:'Cartes cadeaux', closed:'Lundi : Fermé', lunch:'Mar–Dim : 12h–14h30', dinner:'Mar–Dim : 19h–23h',
    allRights:'Tous droits réservés.', privacy:'Confidentialité', terms:'CGU', legal:'Mentions légales',
    // booking
    step1:'Dates & Table', step2:'Informations', step3:'Paiement',
    selectDate:'Choisir une date', selectTime:'Choisir un créneau',
    tableType:'Type de table', adults:'Adultes', children:'Enfants',
    guestInfo:'Informations convives',
    specialReq:'Demandes spéciales', specialReqPh:'Allergies, régimes, occasion spéciale...',
    confirmBook:'Confirmer', backBtn:'Retour',
    // payment
    payTitle:'Paiement', creditCard:'Carte bancaire', paypal:'PayPal', applePay:'Apple Pay',
    cardNum:'Numéro de carte', cardName:'Nom sur la carte', expiry:'MM / AA', cvv:'CVV',
    payNow:'Payer maintenant', secureMsg:'Paiement 100% sécurisé — SSL 256 bits',
    orderSum:'Résumé', subtotal:'Sous-total', taxes:'Taxes', total:'Total',
    // success
    bookOk:'Réservation confirmée !', bookOkSub:'Un email de confirmation vous a été envoyé.',
    bookRef:'Référence de réservation', viewMyRes:'Voir mes réservations', backHome:'Retour à l'accueil',
    // account
    upcoming:'Réservations à venir', past:'Réservations passées',
    noRes:'Aucune réservation', noResSub:"Vous n'avez pas encore de réservation.",
    startRes:'Réserver maintenant', allNotifs:'Toutes les notifications', markRead:'Tout marquer comme lu',
    profileTitle:'Mon profil', savePrf:'Enregistrer', prefLang:'Langue préférée',
    notifPrefs:'Préférences de notification',
    // admin
    adminTitle:'Gestion du restaurant', todayRes:"Réservations aujourd'hui",
    totalGuests:'Couverts', availTables:'Tables disponibles', revenue:'Revenus (mois)',
    allRes:'Toutes les réservations', tablesMgmt:'Gestion des tables', availability:'Disponibilités',
    // toasts
    loginOk:'Connexion réussie', loginOkMsg:'Bon retour parmi nous !',
    regOk:'Compte créé !', regOkMsg:'Bienvenue sur Table·In.',
    bookOkToast:'Réservation confirmée', bookOkToastMsg:'Votre table est réservée.',
    passErr:'Les mots de passe ne correspondent pas.',
    confirmed:'Confirmée', pending:'En attente', cancelled:'Annulée',
    cancel:'Annuler',
  },
  en: {
    navRestaurant:'The Restaurant', navMenu:'Menu', navGallery:'Gallery', navEvents:'Events',
    signinBtn:'Sign in', reserveBtn:'Reserve',
    signin:'Sign in', signup:'Sign up',
    email:'Email', password:'Password', rememberMe:'Remember me',
    forgotPw:'Forgot password?', or:'or', googleContinue:'Continue with Google',
    firstName:'First name', lastName:'Last name', phone:'Phone',
    confirmPw:'Confirm', acceptTerms:'I accept the terms', createAcct:'Create account',
    heroEye:'Gastronomy · Paris', heroT1:'The art of', heroT2:'dining',
    heroSub:"An exceptional culinary experience awaits.\nBook your table in seconds.",
    reserveTable:'Reserve a table', seeMenu:'Discover the menu',
    openHours:'12pm – 2:30pm · 7pm – 11pm', table2Label:'2 – 12', table2sub:'guests per table',
    scrollDown:'Scroll',
    date:'Date', time:'Time', guests:'Guests', checkAvail:'Check availability',
    aboutLabel:'Our story', aboutTitle:'An authored cuisine at the heart of Paris',
    aboutP1:'Founded in 2008 by Chef Antoine Morel, Table·In offers contemporary French cuisine that elevates seasonal produce. Every plate is an invitation to travel.',
    aboutP2:'Our 40-seat dining room, nestled in a private mansion in the 8th arrondissement, provides an intimate and warm setting for all your occasions.',
    menuLabel:'Current menu', menuTitle:'Our suggestions',
    starters:'Starters', mains:'Mains', desserts:'Desserts', wines:'Wines',
    galleryLabel:'Atmosphere', galleryTitle:'Inside our rooms',
    eventsLabel:'Agenda', eventsTitle:'Upcoming events',
    reviewsLabel:'Customer reviews', reviewsTitle:'They trusted us',
    ctaLabel:'Reservation', ctaTitle:'Ready for an unforgettable experience?',
    ctaSub:'Tables available tonight. Book in 2 minutes.',
    myRes:'My reservations', notifMenu:'Notifications', myProfile:'My profile', myFavs:'My favourites',
    adminPanel:'Admin panel', signout:'Sign out',
    footerSlogan:'Excellence in every plate.',
    fColInfo:'Information', fColContact:'Contact', fColHours:'Opening hours',
    giftCard:'Gift cards', closed:'Monday: Closed', lunch:'Tue–Sun: 12pm–2:30pm', dinner:'Tue–Sun: 7pm–11pm',
    allRights:'All rights reserved.', privacy:'Privacy', terms:'Terms', legal:'Legal notice',
    step1:'Dates & Table', step2:'Information', step3:'Payment',
    selectDate:'Select a date', selectTime:'Select a time slot',
    tableType:'Table type', adults:'Adults', children:'Children',
    guestInfo:'Guest information',
    specialReq:'Special requests', specialReqPh:'Allergies, diet, special occasion...',
    confirmBook:'Confirm', backBtn:'Back',
    payTitle:'Payment', creditCard:'Credit card', paypal:'PayPal', applePay:'Apple Pay',
    cardNum:'Card number', cardName:'Name on card', expiry:'MM / YY', cvv:'CVV',
    payNow:'Pay now', secureMsg:'100% secure payment — 256-bit SSL',
    orderSum:'Order summary', subtotal:'Subtotal', taxes:'Taxes', total:'Total',
    bookOk:'Booking confirmed!', bookOkSub:'A confirmation email has been sent to you.',
    bookRef:'Booking reference', viewMyRes:'View my reservations', backHome:'Back to home',
    upcoming:'Upcoming reservations', past:'Past reservations',
    noRes:'No reservations', noResSub:"You don't have any reservations yet.",
    startRes:'Book now', allNotifs:'All notifications', markRead:'Mark all as read',
    profileTitle:'My profile', savePrf:'Save', prefLang:'Preferred language',
    notifPrefs:'Notification preferences',
    adminTitle:'Restaurant management', todayRes:'Reservations today',
    totalGuests:'Covers', availTables:'Available tables', revenue:'Revenue (month)',
    allRes:'All reservations', tablesMgmt:'Table management', availability:'Availability',
    loginOk:'Signed in', loginOkMsg:'Welcome back!',
    regOk:'Account created!', regOkMsg:'Welcome to Table·In.',
    bookOkToast:'Booking confirmed', bookOkToastMsg:'Your table is reserved.',
    passErr:"Passwords don't match.",
    confirmed:'Confirmed', pending:'Pending', cancelled:'Cancelled', cancel:'Cancel',
  },
  de: {
    navRestaurant:'Das Restaurant', navMenu:'Speisekarte', navGallery:'Galerie', navEvents:'Veranstaltungen',
    signinBtn:'Anmelden', reserveBtn:'Reservieren',
    signin:'Anmelden', signup:'Registrieren',
    email:'E-Mail', password:'Passwort', rememberMe:'Angemeldet bleiben',
    forgotPw:'Passwort vergessen?', or:'oder', googleContinue:'Mit Google fortfahren',
    firstName:'Vorname', lastName:'Nachname', phone:'Telefon',
    confirmPw:'Bestätigen', acceptTerms:'Ich akzeptiere die Bedingungen', createAcct:'Konto erstellen',
    heroEye:'Gastronomie · Paris', heroT1:'Die Kunst des', heroT2:'Tisches',
    heroSub:"Ein außergewöhnliches kulinarisches Erlebnis erwartet Sie.\nReservieren Sie Ihren Tisch in Sekunden.",
    reserveTable:'Tisch reservieren', seeMenu:'Speisekarte entdecken',
    openHours:'12–14:30 · 19–23 Uhr', table2Label:'2 – 12', table2sub:'Personen pro Tisch',
    scrollDown:'Scrollen',
    date:'Datum', time:'Uhrzeit', guests:'Gäste', checkAvail:'Verfügbarkeit prüfen',
    aboutLabel:'Unsere Geschichte', aboutTitle:'Eine Autorenküche im Herzen von Paris',
    aboutP1:'Gegründet 2008 von Chefkoch Antoine Morel bietet Table·In zeitgenössische französische Küche, die saisonale Produkte veredelt. Jedes Gericht ist eine Einladung zum Reisen.',
    aboutP2:'Unser 40-Plätze-Restaurant in einem Stadtpalais im 8. Arrondissement bietet einen intimen und herzlichen Rahmen für alle Ihre Anlässe.',
    menuLabel:'Aktuelle Karte', menuTitle:'Unsere Empfehlungen',
    starters:'Vorspeisen', mains:'Hauptspeisen', desserts:'Desserts', wines:'Weine',
    galleryLabel:'Atmosphäre', galleryTitle:'In unseren Sälen',
    eventsLabel:'Agenda', eventsTitle:'Bevorstehende Veranstaltungen',
    reviewsLabel:'Kundenbewertungen', reviewsTitle:'Sie haben uns vertraut',
    ctaLabel:'Reservierung', ctaTitle:'Bereit für ein unvergessliches Erlebnis?',
    ctaSub:'Tische noch heute Abend verfügbar. In 2 Minuten buchen.',
    myRes:'Meine Reservierungen', notifMenu:'Benachrichtigungen', myProfile:'Mein Profil', myFavs:'Meine Favoriten',
    adminPanel:'Admin-Bereich', signout:'Abmelden',
    footerSlogan:'Exzellenz in jedem Gericht.',
    fColInfo:'Informationen', fColContact:'Kontakt', fColHours:'Öffnungszeiten',
    giftCard:'Geschenkkarten', closed:'Montag: Geschlossen', lunch:'Di–So: 12–14:30 Uhr', dinner:'Di–So: 19–23 Uhr',
    allRights:'Alle Rechte vorbehalten.', privacy:'Datenschutz', terms:'AGB', legal:'Impressum',
    step1:'Datum & Tisch', step2:'Informationen', step3:'Zahlung',
    selectDate:'Datum auswählen', selectTime:'Zeitfenster auswählen',
    tableType:'Tischtyp', adults:'Erwachsene', children:'Kinder',
    guestInfo:'Gästeinformationen',
    specialReq:'Sonderwünsche', specialReqPh:'Allergien, Diät, besonderer Anlass...',
    confirmBook:'Bestätigen', backBtn:'Zurück',
    payTitle:'Zahlung', creditCard:'Kreditkarte', paypal:'PayPal', applePay:'Apple Pay',
    cardNum:'Kartennummer', cardName:'Name auf der Karte', expiry:'MM / JJ', cvv:'CVV',
    payNow:'Jetzt bezahlen', secureMsg:'100% sichere Zahlung — 256-Bit-SSL',
    orderSum:'Bestellübersicht', subtotal:'Zwischensumme', taxes:'Steuern', total:'Gesamt',
    bookOk:'Reservierung bestätigt!', bookOkSub:'Eine Bestätigungs-E-Mail wurde Ihnen gesendet.',
    bookRef:'Buchungsreferenz', viewMyRes:'Meine Reservierungen', backHome:'Zurück zur Startseite',
    upcoming:'Bevorstehende Reservierungen', past:'Vergangene Reservierungen',
    noRes:'Keine Reservierungen', noResSub:'Sie haben noch keine Reservierungen.',
    startRes:'Jetzt buchen', allNotifs:'Alle Benachrichtigungen', markRead:'Alle als gelesen markieren',
    profileTitle:'Mein Profil', savePrf:'Speichern', prefLang:'Bevorzugte Sprache',
    notifPrefs:'Benachrichtigungseinstellungen',
    adminTitle:'Restaurantverwaltung', todayRes:'Reservierungen heute',
    totalGuests:'Gedecke', availTables:'Verfügbare Tische', revenue:'Einnahmen (Monat)',
    allRes:'Alle Reservierungen', tablesMgmt:'Tischverwaltung', availability:'Verfügbarkeit',
    loginOk:'Anmeldung erfolgreich', loginOkMsg:'Willkommen zurück!',
    regOk:'Konto erstellt!', regOkMsg:'Willkommen bei Table·In.',
    bookOkToast:'Reservierung bestätigt', bookOkToastMsg:'Ihr Tisch ist reserviert.',
    passErr:'Passwörter stimmen nicht überein.',
    confirmed:'Bestätigt', pending:'Ausstehend', cancelled:'Storniert', cancel:'Stornieren',
  },
  es: {
    navRestaurant:'El Restaurante', navMenu:'Menú', navGallery:'Galería', navEvents:'Eventos',
    signinBtn:'Iniciar sesión', reserveBtn:'Reservar',
    signin:'Iniciar sesión', signup:'Registrarse',
    email:'Correo electrónico', password:'Contraseña', rememberMe:'Recordarme',
    forgotPw:'¿Olvidaste tu contraseña?', or:'o', googleContinue:'Continuar con Google',
    firstName:'Nombre', lastName:'Apellido', phone:'Teléfono',
    confirmPw:'Confirmar', acceptTerms:'Acepto los términos', createAcct:'Crear cuenta',
    heroEye:'Gastronomía · París', heroT1:'El arte de la', heroT2:'mesa',
    heroSub:"Una experiencia culinaria excepcional te espera.\nReserva tu mesa en segundos.",
    reserveTable:'Reservar una mesa', seeMenu:'Descubrir el menú',
    openHours:'12h – 14:30 · 19h – 23h', table2Label:'2 – 12', table2sub:'personas por mesa',
    scrollDown:'Deslizar',
    date:'Fecha', time:'Hora', guests:'Comensales', checkAvail:'Verificar disponibilidad',
    aboutLabel:'Nuestra historia', aboutTitle:'Una cocina de autor en el corazón de París',
    aboutP1:'Fundado en 2008 por el Chef Antoine Morel, Table·In ofrece cocina francesa contemporánea que realza los productos de temporada. Cada plato es una invitación al viaje.',
    aboutP2:'Nuestro comedor de 40 cubiertos, ubicado en un hotel particular del 8º arrondissement, ofrece un marco íntimo y acogedor para todas sus ocasiones.',
    menuLabel:'Carta del momento', menuTitle:'Nuestras sugerencias',
    starters:'Entrantes', mains:'Principales', desserts:'Postres', wines:'Vinos',
    galleryLabel:'Ambiente', galleryTitle:'En nuestras salas',
    eventsLabel:'Agenda', eventsTitle:'Próximos eventos',
    reviewsLabel:'Opiniones clientes', reviewsTitle:'Ellos confiaron en nosotros',
    ctaLabel:'Reserva', ctaTitle:'¿Listo para una experiencia inolvidable?',
    ctaSub:'Mesas disponibles esta noche. Reserva en 2 minutos.',
    myRes:'Mis reservas', notifMenu:'Notificaciones', myProfile:'Mi perfil', myFavs:'Mis favoritos',
    adminPanel:'Panel de administración', signout:'Cerrar sesión',
    footerSlogan:'La excelencia en cada plato.',
    fColInfo:'Información', fColContact:'Contacto', fColHours:'Horarios',
    giftCard:'Tarjetas regalo', closed:'Lunes: Cerrado', lunch:'Mar–Dom: 12h–14:30', dinner:'Mar–Dom: 19h–23h',
    allRights:'Todos los derechos reservados.', privacy:'Privacidad', terms:'Términos', legal:'Aviso legal',
    step1:'Fecha & Mesa', step2:'Información', step3:'Pago',
    selectDate:'Elegir fecha', selectTime:'Elegir horario',
    tableType:'Tipo de mesa', adults:'Adultos', children:'Niños',
    guestInfo:'Información del comensal',
    specialReq:'Solicitudes especiales', specialReqPh:'Alergias, dieta, ocasión especial...',
    confirmBook:'Confirmar', backBtn:'Atrás',
    payTitle:'Pago', creditCard:'Tarjeta bancaria', paypal:'PayPal', applePay:'Apple Pay',
    cardNum:'Número de tarjeta', cardName:'Nombre en la tarjeta', expiry:'MM / AA', cvv:'CVV',
    payNow:'Pagar ahora', secureMsg:'Pago 100% seguro — SSL 256 bits',
    orderSum:'Resumen', subtotal:'Subtotal', taxes:'Impuestos', total:'Total',
    bookOk:'¡Reserva confirmada!', bookOkSub:'Se ha enviado un correo de confirmación.',
    bookRef:'Referencia de reserva', viewMyRes:'Ver mis reservas', backHome:'Volver al inicio',
    upcoming:'Próximas reservas', past:'Reservas pasadas',
    noRes:'Sin reservas', noResSub:'Todavía no tienes ninguna reserva.',
    startRes:'Reservar ahora', allNotifs:'Todas las notificaciones', markRead:'Marcar todo como leído',
    profileTitle:'Mi perfil', savePrf:'Guardar', prefLang:'Idioma preferido',
    notifPrefs:'Preferencias de notificación',
    adminTitle:'Gestión del restaurante', todayRes:'Reservas de hoy',
    totalGuests:'Cubiertos', availTables:'Mesas disponibles', revenue:'Ingresos (mes)',
    allRes:'Todas las reservas', tablesMgmt:'Gestión de mesas', availability:'Disponibilidad',
    loginOk:'Sesión iniciada', loginOkMsg:'¡Bienvenido de nuevo!',
    regOk:'¡Cuenta creada!', regOkMsg:'Bienvenido a Table·In.',
    bookOkToast:'Reserva confirmada', bookOkToastMsg:'Tu mesa está reservada.',
    passErr:'Las contraseñas no coinciden.',
    confirmed:'Confirmada', pending:'Pendiente', cancelled:'Cancelada', cancel:'Cancelar',
  }
};

let lang = localStorage.getItem('tin_lang') || 'fr';
const t = k => (LANGS[lang]?.[k] ?? LANGS.fr?.[k] ?? k);

function setLang(l) {
  lang = l;
  localStorage.setItem('tin_lang', l);
  document.documentElement.setAttribute('lang', l);
  applyI18n();
  document.getElementById('lang-label').textContent = l.toUpperCase();
  closeLangMenu();
  // refresh dynamic
  if (typeof renderMenu === 'function') renderMenu(currentMenuTab);
  if (typeof renderEvents === 'function') renderEvents();
  if (typeof renderReviews === 'function') renderReviews();
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' && el.type !== 'submit') { el.placeholder = t(k); }
    else { el.textContent = t(k); }
  });
}

function toggleLangMenu(e) {
  e.stopPropagation();
  const m = document.getElementById('lang-menu');
  m.classList.toggle('open');
  m.classList.toggle('hidden');
}
function closeLangMenu() {
  const m = document.getElementById('lang-menu');
  m?.classList.remove('open');
  m?.classList.add('hidden');
}

document.addEventListener('click', () => closeLangMenu());

document.addEventListener('DOMContentLoaded', () => {
  applyI18n();
  document.getElementById('lang-label').textContent = lang.toUpperCase();
});
