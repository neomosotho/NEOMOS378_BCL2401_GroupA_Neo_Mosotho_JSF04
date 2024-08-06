import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import  router  from './router'
// import router from './router'
import { FontAwesomeIcon } from './fontawesome'
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia)
app.use(router)
app.mount('#app')


// app.component('font-awesome-icon', FontAwesomeIcon)