// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
// import Comparison from '../views/Comparison.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },

  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    meta: { requiresAuth: true }
  },

  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { requiresAuth: true }
  }

  // {
  //   path: '/comparison',
  //   name: 'Comparison',
  //   component: Comparison,
  //   meta: { requiresAuth: true }
  // }


  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router