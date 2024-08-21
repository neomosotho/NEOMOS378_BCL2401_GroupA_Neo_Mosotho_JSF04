<template>
  <div class="container mx-auto p-4 bg-slate-200">
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
        <div>
          <button 
            @click="addToComparison(product)" 
            :disabled="comparisonStore.isComparisonFull"
            :class="{'opacity-50 cursor-not-allowed': comparisonStore.isComparisonFull}"
            class="bg-green-500 text-white p-2 rounded ml-2 hover:bg-green-600 transition duration-300"
          >
            Add to Comparison
          </button>
          <p v-if="comparisonStore.isComparisonFull" class="text-red-500 mt-2">
            Comparison list is full (max {{ comparisonStore.MAX_COMPARISON_ITEMS }} items)
          </p>

          <!-- Wishlist Button -->
          <button 
            @click="toggleWishlist(product)" 
            :class="{'bg-red-500': isInWishlist, 'bg-gray-500': !isInWishlist}" 
            class="text-white p-2 rounded ml-2 mt-4 hover:bg-red-600 transition duration-300"
          >
            {{ isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}
          </button>
          <p v-if="showWishlistMessage" class="text-green-500 mt-2">
            {{ isInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchSingleProduct } from '../api/index.js';
import { useComparisonStore } from '../store/comparisonStore.js';
import { useWishlistStore } from '../store/wishListStore.js';

const route = useRoute();
const router = useRouter();
const productId = route.params.id;
const product = ref(null);
const loading = ref(true);
const comparisonStore = useComparisonStore();
const wishlistStore = useWishlistStore();
const showMessage = ref(false);
const showWishlistMessage = ref(false);

const isInWishlist = computed(() =>
  wishlistStore.wishlist.some(item => item.id === productId)
);

const toggleWishlist = (product) => {
  if (isInWishlist.value) {
    wishlistStore.removeFromWishlist(product.id);
  } else {
    wishlistStore.addToWishlist(product);
  }
  showWishlistMessage.value = true;
  setTimeout(() => {
    showWishlistMessage.value = false;
  }, 3000);
};

const addToComparison = (product) => {
  if (comparisonStore.addToComparison(product)) {
    showMessage.value = true;
    setTimeout(() => {
      showMessage.value = false;
    }, 3000);
  }
};

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

const getStarClass = (i) =>
  i <= Math.round(product.value?.rating?.rate || 0)
    ? 'fas fa-star text-yellow-400'
    : 'far fa-star text-gray-300';
</script>
