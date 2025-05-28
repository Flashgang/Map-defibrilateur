// On importe Vue — la base de chez base
import { createApp } from 'vue'

// On chope notre composant principal (celui qui contient <router-view>)
import App from './App.vue'

// On importe notre CSS global (styles custom, classes perso, etc.)
import './assets/style.css'

// On importe le router qu’on a bien défini avec toutes nos pages
import router from './router'

// Et là on lance l’app : on lui dit "tiens voilà l’App, avec le router, vas-y affiche tout"
createApp(App).use(router).mount('#app')
