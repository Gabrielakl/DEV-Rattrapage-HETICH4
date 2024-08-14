# Mon Projet Pokémon en ExpressJS

Ce projet est une application web basée sur ExpressJS.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé Node.js et npm sur votre machine. Vous pouvez les télécharger et les installer à partir de [https://nodejs.org/](https://nodejs.org/).

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante dans le répertoire racine du projet :

```bash
npm install
```

Cette commande installera toutes les dépendances nécessaires à l'exécution du projet, comme défini dans le fichier `package.json`.

Assurez-vous d'avoir PostgreSQL sur votre ordinateur ainsi qu'un serveur qui est dédié au projet.
Vous pouvez trouver un fichier ".env.example" dans le projet. Modifiez le fichier avec votre string de connexion et les autres variables :

```
  DATABASE_URL="postgresql://username:password@localhost:5432/database?schema=public"
  JWT_SECRET="your_secret"
  PORT="your_port"
```

- DATABASE_URL : La string de connxion à la database.
- JWT_SECRET : La clé qui permet d'encoder les tokens JWT.
- PORT : Le port sur lequel le backend tourne

Une fois ceci fait, lancez des migrations via prisma au travers de votre terminal :

```bash
  npx prisma migrate dev
```

## Autres scripts

Le fichier `package.json` contient d'autres scripts que vous pouvez utiliser :

- `npm run start` : Lancer le serveur backend. 

## Liste des routes

### Authentification

#### POST /auth
- **Description** : Authentifie un utilisateur
- **Corps de la requête** :
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Réponse** : Token JWT

### Pokémon
*Toutes les routes Pokémon nécessitent un token JWT valide.*

#### GET /pokemon/:id
- **Description** : Récupère les détails d'un Pokémon spécifique
- **Paramètres** :
  - `id` : ID du Pokémon

#### GET /pokemon
- **Description** : Récupère tous les Pokémon de l'utilisateur connecté

#### POST /pokemon
- **Description** : Crée un nouveau Pokémon
- **Corps de la requête** :
  ```json
  {
    "name": "string",
    "type": "string",
    "health": "number"
  }
  ```

#### PUT /pokemon/:id
- **Description** : Met à jour un Pokémon existant en lui ajoutant des techniques.
- **Paramètres** :
  - `id` : ID du Pokémon
- **Corps de la requête** :
  ```json
  {
    "name": "string",
    "type": "string",
    "health": "number"
  }
  ```

#### DELETE /pokemon/:id
- **Description** : Supprime un Pokémon
- **Paramètres** :
  - `id` : ID du Pokémon

### Utilisateur
*La plupart des routes utilisateur nécessitent un token JWT valide, sauf la création d'utilisateur.*

#### GET /user
- **Description** : Récupère les détails de l'utilisateur connecté

#### POST /user
- **Description** : Crée un nouvel utilisateur
- **Corps de la requête** :
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### PUT /user
- **Description** : Met à jour les informations de l'utilisateur connecté
- **Corps de la requête** :
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### DELETE /user
- **Description** : Supprime l'utilisateur connecté

**Note** : Toutes les routes protégées nécessitent un en-tête `Authorization` avec un token JWT valide sous la forme `Bearer <token>`.

## Architecture du projet

Le projet suit une architecture modulaire pour une meilleure organisation et maintenabilité du code. Voici la structure des répertoires :

```
.
├── constants
│   └── http.js                 # Constantes HTTP
├── controllers
│   ├── authentication.js        # Contrôleur pour l'authentification
│   ├── pokemon.js               # Contrôleur pour les opérations Pokémon
│   └── user.js                  # Contrôleur pour les opérations utilisateur
├── helpers
│   └── authentication.js        # Fonctions d'aide pour l'authentification
├── index.js                     # Point d'entrée de l'application
├── middlewares
│   └── jwt.js                   # Middleware pour la vérification JWT
├── repositories
│   ├── pokemon.js               # Couche d'accès aux données pour Pokémon
│   └── user.js                  # Couche d'accès aux données pour utilisateur
└── routes
    ├── authentication.js        # Définition des routes d'authentification
    ├── pokemon.js               # Définition des routes Pokémon
    └── user.js                  # Définition des routes utilisateur
```

### Description des composants :

- **constants** : Contient les constantes utilisées dans l'application, comme les codes HTTP.
- **controllers** : Gère la logique métier de l'application, traitant les requêtes et préparant les réponses.
- **helpers** : Contient des fonctions utilitaires, notamment pour l'authentification.
- **index.js** : Point d'entrée principal de l'application, configure et démarre le serveur Express.
- **middlewares** : Contient les middlewares, comme la vérification des tokens JWT.
- **repositories** : Gère l'accès aux données et les opérations sur la base de données.
- **routes** : Définit les routes de l'API et les associe aux contrôleurs appropriés.

Cette architecture suit le principe de séparation des responsabilités, facilitant la maintenance et l'évolution du projet.

## Licence

Ce projet est sous licence ISC.
