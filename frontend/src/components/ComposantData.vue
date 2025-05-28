<template>
  <div class="data-box">
    <!-- Input pour caler ta recherche, latitude/longitude -->
    <div class="search-controls">
      <input v-model.number="lat" placeholder="Latitude" type="number" step="0.0001" />
      <input v-model.number="lon" placeholder="Longitude" type="number" step="0.0001" />
      <button @click="fetchData">Rechercher</button> <!-- On déclenche la recherche -->
    </div>

    <!-- Liste des résultats si on en a -->
    <ul v-if="results.length">
      <li v-for="item in results" :key="item.id">
        {{ formatItem(item) }}
      </li>
    </ul>

    <!-- Si y’en a encore à tirer, on propose de charger plus -->
    <button v-if="hasMore" @click="loadMore">Charger plus</button>

    <!-- S’il y a un souci, on balance un message d’erreur -->
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// Valeurs de base centrées sur un coin d’Amiens (au pif)
const lat = ref(49.87)
const lon = ref(2.26)

// Résultats récupérés + message d’erreur s’il y a
const results = ref([])
const error = ref('')

// Pagination : page en cours, taille de chaque page
let page = 1
const pageSize = 100
const hasMore = ref(false) // s’il reste encore des trucs à récupérer

// Format d’un item affiché dans la liste
function formatItem(item) {
  const d = item.attributes || item // si c’est du Strapi, les datas sont dans `attributes`
  return `${d.nom || 'Défibrillateur'} – ${d.com_nom || 'Inconnu'}`
}

// Fonction pour chercher à partir de la position entrée
async function fetchData() {
  page = 1            // on repart de la première page
  results.value = []  // on vide l’ancienne liste
  await loadPage()    // et on charge la nouvelle
}

// Fonction qui charge une page de résultats
async function loadPage() {
  error.value = ''
  try {
    const res = await axios.get(`http://localhost:1337/api/defibrillateurs`, {
      params: {
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'filters[lat][$gte]': lat.value - 0.100, // on cherche dans un carré de ±0.100
        'filters[lat][$lte]': lat.value + 0.100,
        'filters[lon][$gte]': lon.value - 0.100,
        'filters[lon][$lte]': lon.value + 0.100
      }
    })

    const data = res.data.data // on chope la vraie data (Strapi style)
    results.value.push(...data) // on ajoute ça à notre tableau
    hasMore.value = data.length === pageSize // si on a reçu un "plein" de résultats, y’en a peut-être encore
    page++ // prochaine page si besoin
  } catch (err) {
    error.value = 'Erreur lors de l’appel API.' // en cas de galère
  }
}
</script>
