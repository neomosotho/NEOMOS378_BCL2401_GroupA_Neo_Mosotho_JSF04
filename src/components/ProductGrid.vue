<template>
    <div class="container mx-auto p-4 bg-slate-200">
      <div v-if="loading" class="text-center text-gray-600 py-4">
        Loading products...
      </div>
      <div v-else-if="products.length === 0" class="text-center text-gray-600 py-4">
        No products found.
      </div>
      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
            @view-details="viewDetails" 
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import ProductCard from './ProductCard.vue';
  
  const props = defineProps({
    products: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  });
  
  const router = useRouter();
  
  function viewDetails(productId) {
    router.push(`/product/${productId}`);
  }
  </script>