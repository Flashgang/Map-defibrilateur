<template>
  <div class="bar-chart">
    <h3>{{ title }}</h3> <!-- p’tit titre qui claque, dynamique -->
    <canvas ref="canvas"></canvas> <!-- le terrain de jeu pour Chart.js -->
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto' // le boss des graphiques

// Props qu’on récup direct
const props = defineProps({
  data: Array,    // les données : [{ label, value }, ... ]
  title: String   // le titre qu’on balance au-dessus
})

const canvas = ref(null)       // pour choper le canvas
let chartInstance = null       // on garde une ref sur le graphe actif

function renderChart() {
  // Si jamais y’a déjà un graphe, on le dégage avant d’en foutre un nouveau
  if (chartInstance) chartInstance.destroy()

  // Là on installe notre graphe barres
  chartInstance = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: props.data.map(d => d.label), // les noms en abscisse
      datasets: [{
        label: props.title,                 // le titre qu’on fout dans la légende (on l’affiche pas)
        data: props.data.map(d => d.value), // les valeurs qu’on balance
        backgroundColor: '#e74c3c'          // rouge qui tape, bg des barres
      }]
    },
    options: {
      responsive: true,                     // ça s’adapte à la taille de l’écran
      plugins: {
        legend: { display: false }          // on skip la légende, elle fait la timide
      }
    }
  })
}

// À chaque fois que `props.data` bouge, on refresh le graphe
watch(() => props.data, renderChart, { deep: true })

// Et quand le composant est monté, on balance direct le premier affichage
onMounted(renderChart)
</script>

