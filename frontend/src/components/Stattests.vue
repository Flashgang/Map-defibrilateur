<template>
  <div class="stats">
    <!-- Le titre en mode stylé -->
    <h2>📊 Statistiques des Défibrillateurs</h2>

    <!-- Bloc qui va contenir les graphes -->
    <div class="charts">
      <!-- Si on a des données, on affiche le BarChart -->
      <BarChart v-if="byCity.length" :data="byCity" title="Répartition par ville" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Le composant BarChart (t'as dû le faire toi-même 👌)
import BarChart from './charts/BarChart.vue'

// Là on stocke les stats groupées par ville
const byCity = ref([])

// Quand le composant est monté, on va taper dans Strapi
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:1337/api/defibrillateurs?pagination[pageSize]=1000')
    const data = res.data.data // les données sont déjà clean

    console.log('Données reçues :', data) // debug rapide

    // On crée un objet pour compter les défibs par ville
    const cityStats = {}
    for (const d of data) {
      if (typeof d.com_nom === 'string') {
        // Si la ville existe déjà, on incrémente, sinon on démarre à 1
        cityStats[d.com_nom] = (cityStats[d.com_nom] || 0) + 1
      }
    }

    // On transforme notre objet en tableau exploitable par le graphe
    byCity.value = Object.entries(cityStats).map(([label, value]) => ({ label, value }))

    console.log('Stats par ville:', byCity.value) // autre debug
  } catch (e) {
    console.error("Erreur lors de la récupération des données statistiques :", e)
  }
})
</script>

