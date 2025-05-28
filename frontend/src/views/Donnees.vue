<template>
  <div class="donnees">
    <!-- On balance la navbar pour pouvoir se balader dans l’app -->
    <NavBar />

    <!-- Petit titre avec un emoji parce qu’on est pas des robots -->
    <h2>📡 Données API (filtrées)</h2>

    <!-- Là on envoie le composant qui fait tout le taf de récup + affichage -->
    <ComposantData />
  </div>
</template>

<script setup>
// Le composant qui va aller taper l’API et te sortir les données propres
import ComposantData from '../components/ComposantData.vue'

// Et notre barre de nav, on la veut partout celle-là
import NavBar from '../components/NavBar.vue'
</script>
