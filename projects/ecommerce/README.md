# LUXO — Plateforme E-Commerce Premium

## 🚀 Description

Plateforme e-commerce complète, multilingue (FR/EN/DE/ES) et ultra-responsive, développée en HTML, CSS et JavaScript vanilla.

## ✨ Fonctionnalités

### 🛍️ Catalogue & Navigation
- Catalogue de 12 produits avec images haute qualité
- Filtres par catégorie (Électronique, Mode, Maison, Beauté, Sport, Livres)
- Tri par prix, popularité, nouveauté, nom
- Recherche en temps réel
- Vue détaillée produit avec galerie d'images
- Badges (Nouveau, Promo, Stock faible)

### 🛒 Panier & Paiement
- Ajout/suppression d'articles
- Gestion des quantités
- Sélection de couleur et taille
- Calcul automatique (sous-total, TVA 20%, livraison)
- Livraison gratuite à partir de 50€
- Tunnel de commande en 3 étapes (Livraison → Paiement → Récapitulatif)
- Confirmation de commande animée

### 📦 Gestion de Commandes
- Historique des commandes avec statuts
- Progression visuelle (En attente → Traitement → Expédiée → Livrée)
- Aperçu des articles commandés

### 🎛️ Tableau de Bord Admin
- Vue d'ensemble avec statistiques (chiffre d'affaires, commandes, clients, produits)
- Graphique des ventes animé
- Gestion des produits (tableau avec actions)
- Gestion des commandes avec filtres de statut
- Liste des clients
- Analytique (catégories populaires, statuts commandes)
- Paramètres (langue, thème, infos boutique)

### 🔔 Notifications
- Notifications toast pour toutes les actions (ajout panier, favoris, commande)
- Indicateur badge panier animé

### 🌐 Multilingue
- Français, Anglais, Allemand, Espagnol
- Changement instantané sans rechargement
- Mémorisation de la langue (localStorage)

### 🎨 UI/UX
- Design luxury/editorial avec typographie Cormorant Garamond
- Mode sombre/clair (mémorisé)
- Animations fluides et micro-interactions
- Palette de couleurs cohérente (or, beige, noir)

## 📱 Responsive Design

| Écran | Largeur |
|-------|---------|
| Desktop large | > 1280px |
| Laptop | 900px – 1280px |
| Tablette | 768px – 900px |
| Téléphone | 480px – 768px |
| Petit téléphone | < 480px |

## 📁 Structure des fichiers

```
ecommerce/
├── index.html          # Application principale (SPA)
├── css/
│   └── style.css       # Styles complets (~800 lignes)
├── js/
│   ├── i18n.js         # Système de traduction (FR/EN/DE/ES)
│   ├── data.js         # Données produits et commandes
│   └── app.js          # Logique applicative complète
└── README.md
```

## 🚦 Utilisation

1. Ouvrir `index.html` dans un navigateur
2. Naviguer entre les pages via la barre de navigation
3. Tester le changement de langue (FR/EN/DE/ES)
4. Ajouter des produits au panier
5. Passer une commande via le tunnel checkout
6. Consulter l'admin dashboard via "Admin"

## 🛠️ Technologies

- **HTML5** — Structure sémantique, accessible
- **CSS3** — Variables CSS, Grid, Flexbox, animations
- **JavaScript ES6+** — Vanilla JS, localStorage
- **Google Fonts** — Cormorant Garamond + DM Sans

## 💡 Notes

- Toutes les données sont simulées (localStorage)
- Les images sont chargées depuis Unsplash
- Aucune dépendance externe requise
- Fonctionne hors ligne une fois chargé (sauf images)
