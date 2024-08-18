<!-- src/views/Cart.vue -->
<template>
    <div class="container mx-auto mt-8">
      <h1 class="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div v-if="cart.length === 0" class="text-lg">Your cart is empty.</div>
      <div v-else>
        <div v-for="item in cart" :key="item.id" class="flex items-center mb-4 border-b pb-4">
          <img :src="item.image" alt="item.title" class="w-16 h-16 object-cover mr-4">
          <div class="flex-grow">
            <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            <p class="text-gray-600">${{ item.price }}</p>
          </div>
          <button @click="removeFromCart(item.id)" class="text-red-500">Remove</button>
        </div>
        <div class="text-xl font-bold mt-4">
          Total: ${{ cartTotal.toFixed(2) }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useCartStore } from '../store/cartStore'
  
  const cartStore = useCartStore()
  
  const cart = computed(() => cartStore.cart)
  const cartTotal = computed(() => cart.value.reduce((total, item) => total + item.price, 0))
  
  const removeFromCart = (productId) => {
    cartStore.removeFromCart(productId)
  }
  </script>