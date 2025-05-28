<template>
  <div class="geo-box">
    <!-- Le bouton qui lance la géoloc -->
    <button @click="getLocation">Me localiser</button>

    <!-- Si on a récupéré des coordonnées, on les affiche peinard -->
    <div v-if="coords">
      <p><strong>Latitude :</strong> {{ coords.latitude }}</p>
      <p><strong>Longitude :</strong> {{ coords.longitude }}</p>
    </div>

    <!-- Et si ça foire, on affiche un petit message d’erreur -->
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Là on stocke soit les coords, soit l’erreur
const coords = ref(null)
const error = ref('')

// Fonction qui gère la géolocalisation
function getLocation() {
  // Si ton navigateur est éclaté et supporte pas la géoloc...
  if (!navigator.geolocation) {
    error.value = "La géolocalisation n'est pas supportée par ce navigateur."
    return
  }

  // Sinon, on tente le coup
  navigator.geolocation.getCurrentPosition(
    (position) => {
      coords.value = position.coords // on récup les coordonnées GPS
      error.value = ''               // pas d’erreur, donc on la vide
    },
    (err) => {
      // En cas de galère (refus, timeout, etc.)
      error.value = "Erreur de géolocalisation : " + err.message
    }
  )
}
</script>
