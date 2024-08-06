import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import ProductDetails from '../components/ProductDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetails, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
