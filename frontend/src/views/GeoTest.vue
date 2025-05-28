<template>
  <div class="geo-test">
    <!-- La nav en haut comme d'hab, faut pouvoir naviguer -->
    <NavBar />

    <!-- Titre avec l’emoji GPS, parce que c’est carré -->
    <h2>📍 Test de Géolocalisation</h2>

    <!-- Ici tu balances le composant qui gère la géoloc du user -->
    <ComposantGeo />
  </div>
</template>

<script setup>
// Le composant qui récupère la position de l’utilisateur (via geolocation API)
import ComposantGeo from '../components/ComposantGeo.vue'

// Et la barre de navigation, fidèle au poste
import NavBar from '../components/NavBar.vue'
</script>
