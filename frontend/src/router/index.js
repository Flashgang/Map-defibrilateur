// On importe le router de Vue
import { createRouter, createWebHistory } from 'vue-router'

// On chope toutes les vues/compos qu’on veut brancher dans notre app
import Home from '../views/Home.vue'
import Map from '../components/Map.vue'
import GeoTest from '../views/GeoTest.vue'
import CarteTest from '../views/CarteTest.vue'
import Donnees from '../views/Donnees.vue'
import Stats from '../views/Stats.vue'

// On balance les routes ici, chaque objet = une page
const routes = [
  // Page d’accueil, le QG
  { path: '/', name: 'Home', component: Home },

  // Page avec la map (peut-être avec les défibs)
  { path: '/map', name: 'Map', component: Map },

  // Test géolocalisation, sûrement pour checker le GPS
  { path: '/geoloc', name: 'GeoTest', component: GeoTest },

  // Une autre map ? Peut-être une version différente (mode test ?)
  { path: '/carte', name: 'CarteTest', component: CarteTest },

  // Page où tu balances toutes les données (genre liste brute)
  { path: '/donnees', name: 'Donnees', component: Donnees },

  // Page des stats, là où tu balances les graphs
  { path: '/stattests', name: 'Stats', component: Stats }
]

// Là on crée le router avec l’historique classique (pas de hash dans l’URL)
const router = createRouter({
  history: createWebHistory(),
  routes // on plug nos routes ici
})

// Et on exporte pour l’utiliser dans main.js
export default router
