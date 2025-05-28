<template>
  <div class="home">
    <div class="home-card">
      <!-- Gros titre qui annonce la couleur : ici c’est la map des défibs -->
      <h1>🫀 Carte des Défibrillateurs</h1>

      <!-- Petit pitch histoire de poser le contexte -->
      <p>Localisez rapidement les défibrillateurs publics autour de vous.</p>

      <!-- Bouton principal : la carte qui fait tout -->
      <router-link to="/map" class="start-btn">Voir la carte</router-link>

      <!-- Ensuite t’envoies les liens vers tes autres pages de test/fonctionnalité -->
      <router-link to="/geoloc" class="start-btn alt">Tester la géolocalisation</router-link>

      <router-link to="/carte" class="start-btn alt">Tester la cartographie</router-link>

      <router-link to="/donnees" class="start-btn alt">Tester l'accès API</router-link>

      <router-link to="/Stattests" class="start-btn alt">Statistiques</router-link>
    </div>
  </div>
</template>

<script setup>
  // Pas besoin de script ici, tout est géré dans le template
  // Juste une page d’accueil vitrine
</script>
