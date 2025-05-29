# 🫀 Carte des Défibrillateurs – Vue.js + Strapi

Ce projet permet d'afficher dynamiquement les défibrillateurs sur une carte interactive avec statistiques, géolocalisation, et API via Strapi.

🔗 **Repo GitHub** : [https://github.com/Flashgang/Map-defibrilateur](https://github.com/Flashgang/Map-defibrilateur)

📁 **Fichier de données à télécharger (fichier CSV)** :
➡️ [Télécharger `geodae.csv`](https://drive.google.com/file/d/1zEXEM2hUZXYZ-téléchargement-exemple) *(à placer dans `/backend`)*

---

## 📁 Structure du dépôt

```
/            (racine du repo)
├── backend/         # Projet Strapi (API)
├── frontend/        # Projet Vue 3 (interface)
├── README.md        # Instructions de lancement
├── .gitignore       # Fichiers à ne pas tracker
└── .env.example     # Exemple d'environnement Strapi
```

---

## ⚙️ Prérequis

- Node.js >= 18 recommandé : https://nodejs.org
- npm (inclus avec Node.js)

---

## 🚀 Lancer le projet (Windows/macOS/Linux)

### 1. Cloner le dépôt

```bash
git clone git@github.com:Flashgang/Map-defibrilateur.git
cd Map-defibrilateur
```

### 2. Télécharger et placer le fichier CSV

📥 Télécharge `geodae.csv` depuis le lien ci-dessus, puis place-le dans le dossier `/backend` :

```
backend/geodae.csv
```

### 3. Installer les dépendances

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 4. Lancer Strapi (API)

```bash
cd backend
npm run develop
```

👉 Une page de création d’utilisateur admin s’ouvrira sur http://localhost:1337/admin la première fois.

📌 **Si vous n'avez pas cette page** :
- Supprimez le dossier `.tmp` dans `/backend`
- Relancez `npm run develop`

📌 **Si l'interface d'admin est vide (pas de données)** :
- Assurez-vous d'avoir placé `geodae.csv` dans `/backend`
- Puis exécutez ce script pour importer les données :

```bash
cd backend
node import.js
```

### 5. Lancer le front Vue

```bash
cd frontend
npm run dev
```

👉 Accéder à l'app : http://localhost:5173

---

## 🔐 Gérer les permissions & token dans Strapi

1. Connecte-toi sur http://localhost:1337/admin
2. Va dans **Settings > Roles > Public**
3. Clique sur **Edit** et active les permissions suivantes :
   - `find` sur `defibrillateur`
   - `findOne` si besoin
4. Enregistre

### 🔑 Créer un token d'API (si nécessaire)

1. Va dans **Settings > API Tokens**
2. Clique sur **Create new API Token**
3. Choisis un nom (ex. "frontend-token")
4. Sélectionne le type : `Full access` ou `Custom`
5. Clique sur **Save** et copie le token généré

> Ce token peut être utilisé côté frontend dans les appels à l'API (Authorization: Bearer ...), selon le niveau de sécurité désiré.

---

## 🌐 API Strapi – Exemple d’URL

- `http://localhost:1337/api/defibrillateurs` → récupère tous les points

---

## 📄 `.env.example`
Dans `/backend/` :
```
# Exemple d'environnement Strapi
HOST=127.0.0.1
PORT=1337
APP_KEYS=yourAppKeys
API_TOKEN_SALT=yourApiTokenSalt
ADMIN_JWT_SECRET=yourAdminJwtSecret
JWT_SECRET=yourJwtSecret
```

Crée un fichier `.env` en copiant `.env.example` et remplis-le (ou laisse les valeurs par défaut si tu n’as rien changé).

---

## 📦 .gitignore (inclus automatiquement)
```
# backend
/backend/.cache
/backend/build
/backend/node_modules
/backend/.tmp
/backend/.env
/backend/types/generated/
/backend/dist/
/backend/.strapi-updater.json
/backend/favicon.png

# frontend
/frontend/node_modules
/frontend/dist

# macOS
.DS_Store
```

---
