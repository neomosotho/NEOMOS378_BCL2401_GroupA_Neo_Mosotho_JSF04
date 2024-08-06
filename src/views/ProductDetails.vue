<!-- src/views/ProductDetails.vue -->
<template>
  <div>
    <Navbar />
    <div v-if="loading" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <p class="text-white text-2xl">Loading...</p>
    </div>
    <div v-else-if="product" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">{{ product.title }}</h2>
        <div class="flex flex-col md:flex-row">
          <img :src="product.image" alt="Product Image" class="w-full md:w-1/2 h-64 object-contain mb-4 md:mb-0 md:mr-4">
          <div class="md:w-1/2">
            <p class="text-2xl font-semibold text-gray-800 mb-4">${{ product.price.toFixed(2) }}</p>
            <div class="flex items-center mb-4">
              <i v-for="i in 5" :key="i" :class="i <= Math.round(product.rating.rate) ? 'fas fa-star text-yellow-400' : 'far fa-star'"></i>
              <span class="ml-2 text-gray-600">({{ product.rating.count }} reviews)</span>
            </div>
            <p class="text-gray-700 mb-4">{{ product.description }}</p>
            <p class="text-gray-600 mb-4">Category: {{ product.category }}</p>
            <button @click="goBack" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Back to Products</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchSingleProduct } from '../api';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'ProductDetails',
  components: {
    Navbar
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref(null);
    const loading = ref(true);

    const fetchProduct = async () => {
      try {
        product.value = await fetchSingleProduct(route.params.id);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to load product details. Returning to home page.');
        router.push('/');
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchProduct);

    const goBack = () => {
      router.push('/');
    };

    return {
      product,
      loading,
      goBack
    };
  }
};
</script>


