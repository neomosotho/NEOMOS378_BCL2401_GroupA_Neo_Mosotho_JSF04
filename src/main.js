import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import router from './router'
import { FontAwesomeIcon } from './fontawesome'
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

createApp(App).mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
