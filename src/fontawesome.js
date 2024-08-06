// src/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faShoppingCart)

export { FontAwesomeIcon }