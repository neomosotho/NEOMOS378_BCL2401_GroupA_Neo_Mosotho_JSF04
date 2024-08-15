import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetails from '../views/ProductDetails.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/product/:id', component: ProductDetails, props: true },
    {   path: '/login',
        name: 'Login',
        component: Login }
];
  
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token')
    
    if (to.meta.requiresAuth && !isLoggedIn) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  });
  
export default router;
