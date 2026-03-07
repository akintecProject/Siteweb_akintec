// ============================================================
//   TABLE·IN — DATA
// ============================================================

const MENU_DATA = {
  entrees: [
    { letter:'F', name:'Foie gras mi-cuit', desc:'Brioche toastée, chutney de figues, fleur de sel de Guérande', price:'38€', tag:'Signature' },
    { letter:'H', name:'Huîtres Gillardeau n°2', desc:'Granité de citron vert, espuma au wasabi frais, algues marinées', price:'32€', tag:null },
    { letter:'T', name:'Tartare de Saint-Jacques', desc:'Pomme verte, caviar Osciètre, coriandre fraîche', price:'42€', tag:'Nouveau' },
    { letter:'V', name:'Velouté de cèpes', desc:'Truffe noire râpée, crème montée au beurre noisette', price:'28€', tag:null },
  ],
  plats: [
    { letter:'B', name:'Bœuf Wagyu A5', desc:'Jus corsé, moelle de bœuf rôtie, légumes du jardin glacés au miel', price:'98€', tag:'Signature' },
    { letter:'H', name:'Homard Bleu Breton', desc:'Beurre blanc à l\'estragon, pommes de terre Charlotte confites', price:'85€', tag:null },
    { letter:'C', name:'Canard à l\'orange', desc:'Revisité avec une sauce grand veneur, poire pochée au vin rouge', price:'56€', tag:'Coup ♥' },
    { letter:'T', name:'Turbot sauvage', desc:'Fumé à froid, beurre de noisette, câpres et citron confit', price:'72€', tag:null },
  ],
  desserts: [
    { letter:'S', name:'Soufflé au Champagne', desc:'Coulis de framboises fraîches, sorbet litchi', price:'24€', tag:'Signature' },
    { letter:'M', name:'Mille-feuille praliné', desc:'Feuilletage caramélisé, crème légère à la vanille Bourbon', price:'22€', tag:null },
    { letter:'C', name:'Crème brûlée à la lavande', desc:'Fraîcheur de citron confit, tuile dentelle', price:'18€', tag:null },
    { letter:'T', name:'Tarte Tatin revisitée', desc:'Pommes Golden confites, glace calvados, caramel beurre salé', price:'20€', tag:'Nouveau' },
  ],
  vins: [
    { letter:'C', name:'Château Pétrus 2018', desc:'Pomerol — Notes de cerise noire, truffes, graphite. Tanins soyeux.', price:'680€', tag:'Exception' },
    { letter:'P', name:'Puligny-Montrachet', desc:'Domaine Leflaive 2020 — Minéralité fine, fraîcheur citronnée, longueur.',  price:'145€', tag:null },
    { letter:'B', name:'Barolo DOCG 2016', desc:'Produttori del Barbaresco — Intense, épicé, avec une finale persistante', price:'95€', tag:null },
    { letter:'C', name:'Champagne Krug Clos', desc:'Blanc de blancs — Effervescence délicate, brioche, amande grillée', price:'420€', tag:'Prestige' },
  ],
};

const EVENTS_DATA = [
  { date:'15 Fév 2025', title:'Saint-Valentin Gastronomique', desc:'Dîner 5 services en tête-à-tête avec accord mets & vins, rose offerte.', price:'280€/couple', seats:'4 places restantes' },
  { date:'22 Mar 2025', title:'Soirée Truffe & Champagne', desc:'Dégustations de truffes fraîches du Périgord avec sélection de Champagnes millésimés.', price:'195€/pers.', seats:'12 places' },
  { date:'05 Avr 2025', title:'Masterclass Chef Antoine Morel', desc:'Apprenez les secrets de la haute cuisine française en petits groupes privilégiés.', price:'350€/pers.', seats:'6 places' },
  { date:'20 Avr 2025', title:'Dîner Primeurs Bordeaux 2024', desc:'Dégustation exceptionnelle des nouveaux millésimes en avant-première avec un négociant.', price:'240€/pers.', seats:'Complet' },
];

const REVIEWS_DATA = [
  { stars:5, text:'"Une soirée absolument mémorable. Le foie gras mi-cuit était d\'une finesse rare, et le service, d\'une discrétion parfaite. La réservation en ligne était intuitive."', name:'Sophie L.', meta:'Paris · Dîner anniversaire' },
  { stars:5, text:'"Le Wagyu A5 est simplement transcendant. Chaque bouchée raconte une histoire. Table·In mérite amplement ses deux étoiles. Nous reviendrons sans hésitation."', name:'Marc & Christine D.', meta:'Lyon · Saint-Valentin' },
  { stars:5, text:'"Réservation facilitée, accueil aux petits soins, cuisine d\'exception. Le soufflé au Champagne en fin de repas nous a laissés sans voix. Merci !"', name:'Isabelle M.', meta:'Bordeaux · Anniversaire' },
  { stars:5, text:'"L\'expérience digitale est à la hauteur de l\'expérience en salle : simple, élégante, efficace. Le paiement en ligne sécurisé est un vrai plus."', name:'Thomas K.', meta:'Berlin · Voyage d\'affaires' },
  { stars:5, text:'"La masterclass Chef Morel était inoubliable. Technique irréprochable, pédagogie exceptionnelle. Nous avons rempli nos carnets de notes !"', name:'Famille Bertrand', meta:'Nantes · Masterclass' },
  { stars:5, text:'"Dîner d\'exception dans une salle magnifique. Le système de réservation multilingue nous a permis de réserver facilement depuis Berlin."', name:'Klaus & Anna W.', meta:'Munich · Voyage d\'affaires' },
];

const TABLE_TYPES = [
  { id:'t2', name:'Table intime', feat:'2 personnes · Alcôve privée', price: 0, letter:'T' },
  { id:'t4', name:'Table classique', feat:'4 personnes · Salle principale', price: 0, letter:'T' },
  { id:'t6', name:'Grande table', feat:'5–6 personnes · Salle panoramique', price: 0, letter:'T' },
  { id:'tp', name:'Salon privé', feat:'8–12 personnes · Salle exclusive', price: 150, letter:'S' },
];

const TIME_SLOTS = {
  lunch: ['12:00','12:30','13:00','13:30','14:00'],
  dinner: ['19:00','19:30','20:00','20:30','21:00','21:30'],
};

// Booked slots simulation (in real world: server data)
const BOOKED_SLOTS = {
  // 'YYYY-MM-DD': ['HH:MM', ...]
};

// ============ USER SESSION ============
let currentUser = (() => { try { return JSON.parse(localStorage.getItem('tin_user')); } catch{return null;} })();
let reservations = (() => { try { return JSON.parse(localStorage.getItem('tin_res')) || DEMO_RES(); } catch{return DEMO_RES();} })();
let userNotifs  = (() => { try { return JSON.parse(localStorage.getItem('tin_notifs')) || DEMO_NOTIFS(); } catch{return DEMO_NOTIFS();} })();
let favs = (() => { try { return JSON.parse(localStorage.getItem('tin_favs')) || []; } catch{return [];} })();

function DEMO_RES() {
  return [
    { id:'R001', date:'2025-03-22', time:'20:00', guests:2, table:'Table intime', status:'confirmed', price:0, ref:'TIN-25-A4B2', special:'' },
    { id:'R002', date:'2025-01-10', time:'13:00', guests:4, table:'Table classique', status:'confirmed', price:0, ref:'TIN-25-C7D1', special:'Anniversaire' },
  ];
}
function DEMO_NOTIFS() {
  return [
    { id:1, title:'Rappel : Votre table ce soir', text:'Votre réservation pour 2 personnes à 20:00 est confirmée.', time:'Aujourd\'hui', unread:true },
    { id:2, title:'Nouveau menu printemps', text:'Découvrez notre nouvelle carte de saison, disponible dès maintenant.', time:'Il y a 3 jours', unread:true },
    { id:3, title:'Offre événement : Saint-Valentin', text:'Réservez dès maintenant votre soirée Saint-Valentin gastronomique.', time:'Il y a 1 sem.', unread:false },
  ];
}

function saveData() {
  localStorage.setItem('tin_user', JSON.stringify(currentUser));
  localStorage.setItem('tin_res', JSON.stringify(reservations));
  localStorage.setItem('tin_notifs', JSON.stringify(userNotifs));
  localStorage.setItem('tin_favs', JSON.stringify(favs));
}

function genRef() {
  return 'TIN-' + new Date().getFullYear().toString().slice(-2) + '-' + Math.random().toString(36).slice(2,6).toUpperCase();
}

function addNotif(title, text) {
  userNotifs.unshift({ id: Date.now(), title, text, time: 'À l\'instant', unread: true });
  saveData();
  updateNavBadge();
}
