<template>
  <div class="carte-test">
    <!-- On claque la navbar en haut, classique -->
    <NavBar />

    <!-- Petit titre chill pour dire ce qu’on teste -->
    <h2>🗺️ Test de Cartographie</h2>

    <!-- Là on balance le composant de la map -->
    <ComposantMap />
  </div>
</template>

<script setup>
// On importe le composant qui affiche la map (Leaflet ou autre)
import ComposantMap from '../components/ComposantMap.vue'

// Et la navbar pour naviguer dans l’app comme un boss
import NavBar from '../components/NavBar.vue'
</script>
