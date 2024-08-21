// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
import Comparison from '../views/Comparison.vue'
import WishList from '../views/WishList.vue'


const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true }
  },

  {
    path: '/comparison',
    name: 'Comparison',
    component: Comparison,
    meta: { requiresAuth: true }
  },

  {
    path: '/wishList',
    name: 'wishList',
    component: WishList,
    meta: { requiresAuth: true}
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router