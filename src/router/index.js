import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetails from '../views/ProductDetails.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/product/:id', component: ProductDetails, props: true }
];
  
const router = createRouter({
    history: createWebHistory(),
    routes
});
  
export default router;
