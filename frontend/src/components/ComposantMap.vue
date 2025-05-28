<template>
  <!-- Conteneur de la carte -->
  <div id="leaflet-map"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import L from 'leaflet' // On importe le boss de la map
import 'leaflet/dist/leaflet.css' // Et son style sinon rien s’affiche

onMounted(() => {
  // On balance la carte centrée sur Amiens, zoom 15 pour bien voir
  const map = L.map('leaflet-map').setView([49.871144, 2.2641492], 15)

  // Tu fous le fond de carte OpenStreetMap, clean et open-source
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  // Premier marqueur, genre le spot principal
  const marker = L.marker([49.871144, 2.2641492]).addTo(map)
  marker.bindPopup('Défibrillateur principal').openPopup()

  // Tu peux en balancer plusieurs d’un coup avec un LayerGroup
  const markers = L.layerGroup([
    L.marker([49.871175, 2.265]).bindPopup('Défibrillateur secondaire'),
  ])
  markers.addTo(map) // On ajoute le groupe à la carte
})
</script>
