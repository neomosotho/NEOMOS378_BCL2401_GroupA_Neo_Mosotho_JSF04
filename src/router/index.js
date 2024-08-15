// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Login from '../views/Login.vue'

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


  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
  } else {
    next()
  } 
})

export default router