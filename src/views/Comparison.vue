<!-- src/views/Comparison.vue -->
<template>
    <div class="container mx-auto mt-10 px-4">
      <h1 class="text-2xl font-bold mb-4">Product Comparison</h1>
      <div v-if="comparisonStore.comparisonList.length === 0" class="text-gray-600">
        No items in comparison list.
      </div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th class="px-4 py-2 bg-gray-100 border-b">Specification</th>
              <th v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 bg-gray-100 border-b">
                {{ product.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-4 py-2 font-semibold border-b">Image</td>
              <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border-b">
                <img :src="product.image" :alt="product.title" class="w-20 h-20 object-contain mx-auto">
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-semibold border-b">Price</td>
              <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border-b">
                ${{ product.price.toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-semibold border-b">Category</td>
              <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border-b">
                {{ product.category }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-semibold border-b">Description</td>
              <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border-b">
                {{ product.description }}
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-semibold border-b">Rating</td>
              <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2 border-b">
                {{ product.rating.rate }} ({{ product.rating.count }} reviews)
              </td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-semibold">Actions</td>
              <td v-for="product in comparisonStore.comparisonList" :key="product.id" class="px-4 py-2">
                <button @click="removeFromComparison(product.id)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2">
                  Remove
                </button>
                <button @click="addToCart(product)" class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                  Add to Cart
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="comparisonStore.comparisonList.length > 0" class="mt-4">
        <button @click="clearComparison" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Clear Comparison
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useComparisonStore } from '../stores/comparisonStore'
  import { useCartStore } from '../stores/cartStore'
  
  const comparisonStore = useComparisonStore()
  const cartStore = useCartStore()
  
  const removeFromComparison = (productId) => {
    comparisonStore.removeFromComparison(productId)
  }
  
  const clearComparison = () => {
    if (confirm('Are you sure you want to clear the comparison list?')) {
      comparisonStore.clearComparison()
    }
  }
  
  const addToCart = (product) => {
    cartStore.addToCart(product)
  }
  </script>