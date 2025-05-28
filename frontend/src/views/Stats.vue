<template>
  <div class="stats-view">
    <!-- NavBar classique, faut pouvoir bouger dans l’app -->
    <NavBar />

    <!-- Composant des stats : il va afficher les graphes, les datas... -->
    <Stats />
  </div>
</template>

<script setup>
// On importe le composant Stats (bon il s’appelle Stattests dans les fichiers mais tranquille)
import Stats from '../components/Stattests.vue'

// Et la NavBar qu’on met partout dans l’app
import NavBar from '../components/NavBar.vue'
</script>
