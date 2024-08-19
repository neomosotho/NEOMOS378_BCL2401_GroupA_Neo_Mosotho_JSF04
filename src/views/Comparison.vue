<!-- src/views/Comparison.vue -->
<template>
    <div class="container mx-auto mt-10">
      <h1 class="text-2xl font-bold mb-4">Comparison List</h1>
      <div v-if="comparisonStore.comparisonCount === 0" class="text-gray-600">
        No items in comparison list.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="product in comparisonStore.comparisonList" :key="product.id" class="border p-4 rounded-lg shadow-md">
          <img :src="product.image" :alt="product.title" class="w-full h-48 object-contain mb-4">
          <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
          <p class="text-gray-600 mb-2">${{ product.price.toFixed(2) }}</p>
          <p class="text-sm text-gray-500 mb-2">{{ product.description }}</p>
          <button @click="removeFromComparison(product.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Remove
          </button>
        </div>
      </div>
      <button v-if="comparisonStore.comparisonCount > 0" @click="clearComparison" class="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Clear Comparison
      </button>
    </div>
  </template>
  
  <script setup>
  import { useComparisonStore } from '../stores/comparisonStore'
  
  const comparisonStore = useComparisonStore()
  
  const removeFromComparison = (productId) => {
    comparisonStore.removeFromComparison(productId)
  }
  
  const clearComparison = () => {
    if (confirm('Are you sure you want to clear the comparison list?')) {
      comparisonStore.clearComparison()
    }
  }
  </script>