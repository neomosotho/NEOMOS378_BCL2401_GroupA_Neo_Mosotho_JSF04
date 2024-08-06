<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center text-gray-600 py-4">
      <p class="text-2xl">Loading...</p>
    </div>
    <div v-else-if="product" class="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold mb-4">{{ product.title }}</h2>
      <div class="flex flex-col md:flex-row">
        <img :src="product.image" alt="Product Image" class="w-full md:w-1/2 h-64 object-contain mb-4 md:mb-0 md:mr-4">
        <div class="md:w-1/2">
          <p class="text-2xl font-semibold text-gray-800 mb-4">${{ product.price.toFixed(2) }}</p>
          <div class="flex items-center mb-4">
            <i v-for="i in 5" :key="i" :class="getStarClass(i)" class="fa-star"></i>
            <span class="ml-2 text-gray-600">({{ product.rating.count }} reviews)</span>
          </div>
          <p class="text-gray-700 mb-4">{{ product.description }}</p>
          <p class="text-gray-600 mb-4">Category: {{ product.category }}</p>
          <button @click="goBack" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Back to Products</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchSingleProduct } from '../api/index.js';

const route = useRoute();
const router = useRouter();
const productId = route.params.id;
const product = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    product.value = await fetchSingleProduct(productId);
  } catch (error) {
    console.error('Error fetching product:', error);
    alert('Failed to load product details. Returning to home page.');
    router.push('/');
  } finally {
    loading.value = false;
  }
});

function goBack() {
  router.push('/');
}

const getStarClass = (i) => i <= Math.round(product.value?.rating?.rate || 0) ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300';
</script>