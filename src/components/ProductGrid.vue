<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center text-gray-600 py-4">
      Loading products...
    </div>
    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" @view-details="viewDetails" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useProductStore } from '../store/products';
import ProductCard from './ProductCard.vue';

const productStore = useProductStore();
const { filteredProducts, loading } = productStore;

function viewDetails(productId) {
  // Use Vue Router to navigate
  router.push(`/product/${productId}`);
}
</script>
