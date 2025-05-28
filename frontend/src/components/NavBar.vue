<template>
  <!-- Barre de nav principale -->
  <nav class="navbar">
    <!-- Tous les liens qui redirigent vers tes pages (avec Vue Router) -->

    <!-- Page d'accueil, le QG -->
    <router-link to="/" class="nav-item">Accueil</router-link>

    <!-- La carte avec les défibs -->
    <router-link to="/map" class="nav-item">Carte</router-link>

    <!-- Page pour se géolocaliser, pépouze -->
    <router-link to="/geoloc" class="nav-item">Géolocalisation</router-link>

    <!-- Une autre vue carte (ptêt plus custom celle-là) -->
    <router-link to="/carte" class="nav-item">Cartographie</router-link>

    <!-- Ici t'affiches les données brutes ou un tableau genre -->
    <router-link to="/donnees" class="nav-item">Données</router-link>

    <!-- Et là t'as tes stats, probablement des graphes stylés -->
    <router-link to="/stattests" class="nav-item">Statistiques</router-link>
  </nav>
</template>

<script setup>
// Rien à foutre ici pour l'instant, c’est que du lien statique
// Si tu veux ajouter un "router.currentRoute" plus tard pour surligner le lien actif, ça se mettra ici
</script>

