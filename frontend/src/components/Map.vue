<template>
  <div class="map-container">
    <!-- Header chill avec titre et boutons -->
    <header class="header">
      <h1><span>🫀</span> Carte des Défibrillateurs</h1>
      <div class="header-actions">
        <!-- Bouton pour choper la position du user -->
        <button class="locate-btn" @click="locateUser">📍 Localiser</button>
        <!-- Retour à l'accueil pépère -->
        <router-link to="/" class="locate-btn">🏠 Accueil</router-link>
      </div>
    </header>

    <!-- Zone où la map va s’afficher (Leaflet s’en occupe) -->
    <div id="map"></div>

    <!-- Les stats des défibs affichés (tu gères ça ailleurs) -->
    <Stats :visibleData="filteredData" />

    <!-- Petit loader quand ça mouline -->
    <div v-if="loading" class="loader">Chargement...</div>

    <!-- Message en pop-up pour prévenir l’utilisateur (genre toast) -->
    <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import axios from 'axios'

// On stocke la map ici (avec ref)
const mapRef = ref(null)

// Tous les marqueurs affichés pour pouvoir les virer proprement après
let displayedMarkers = []

// Loading pour bloquer quand ça charge
const loading = ref(false)

// Le petit message en bas qui dit ce qu’il se passe
const toastMessage = ref('')

// Pour virer les anciens toasts automatiquement
let toastTimeout = null

// Marqueur vert pour le user (sauvegardé ici pour pouvoir le remove)
let userMarker = null

// Marqueur rouge (défibrillateurs)
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Quand le composant est monté, on balance la map
onMounted(() => {
  const map = L.map('map').setView([49.871144, 2.2641492], 15) // On centre sur Amiens tranquille
  mapRef.value = map

  // Fond de carte basique OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  fetchVisibleDefibs() // On affiche les défibs direct

  // Si tu bouges la carte (pan, zoom), on recharge ce qu’on voit
  map.on('moveend', fetchVisibleDefibs)
})

// Fonction qui va chercher les défibs dans la zone visible
async function fetchVisibleDefibs() {
  loading.value = true // on active le loading

  const map = mapRef.value
  const bounds = map.getBounds() // zone visible
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()

  // On construit la requête à la mano
  const url = `http://localhost:1337/api/defibrillateurs?pagination[pageSize]=1000` +
    `&filters[lat][$gte]=${sw.lat}&filters[lat][$lte]=${ne.lat}` +
    `&filters[lon][$gte]=${sw.lng}&filters[lon][$lte]=${ne.lng}`

  try {
    const res = await axios.get(url)
    const defibs = res.data.data

    // On enlève tous les marqueurs affichés avant
    displayedMarkers.forEach(marker => map.removeLayer(marker))
    displayedMarkers = []

    // Pour chaque défib récupéré, on fout un marqueur sur la map
    defibs.forEach(item => {
      const d = item.attributes || item // Strapi = faut chercher dans attributes
      if (!d.lat || !d.lon) return // si y'a pas de coordonnées = on skip

      const marker = L.marker([d.lat, d.lon], {
        icon: redIcon,
        opacity: 0 // on met invisible d'abord
      }).addTo(map)

      // Contenu de la petite popup
      marker.bindPopup(`
        <b>${d.nom || 'Défibrillateur'}</b><br/>
        ${d.adr_num || ''} ${d.adr_voie || ''}<br/>
        ${d.com_cp || ''} ${d.com_nom || ''}
      `)

      // Petit effet de fade in, pour le style
      setTimeout(() => marker.setOpacity(1), 100)

      displayedMarkers.push(marker) // on garde une ref
    })

    showToast(`✅ ${defibs.length} défibrillateurs affichés`)
  } catch (err) {
    console.error('❌ Erreur chargement API :', err)
    showToast('Erreur lors du chargement des données')
  } finally {
    loading.value = false
  }
}

// Petite fonction pour afficher un message pendant quelques secondes
function showToast(message) {
  toastMessage.value = message
  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

// Quand le user clique sur "📍 Localiser"
async function locateUser() {
  if (!navigator.geolocation) {
    showToast("Géolocalisation non supportée")
    return
  }

  loading.value = true // on met le loading

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords
    const map = mapRef.value

    // Si on a déjà un marqueur user, on le supprime
    if (userMarker) {
      map.removeLayer(userMarker)
    }

    // Nouveau marqueur pour le user (en vert)
    userMarker = L.marker([latitude, longitude], {
      icon: L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }).addTo(map)

    userMarker.bindPopup("Vous êtes ici").openPopup()
    map.setView([latitude, longitude], 15) // on recentre
    loading.value = false
    showToast("📍 Position localisée")
  }, err => {
    showToast("Erreur de localisation")
    loading.value = false
  })
}
</script>

<style scoped>
#map {
  height: 100vh; /* full screen */
  width: 100%;
}
</style>
