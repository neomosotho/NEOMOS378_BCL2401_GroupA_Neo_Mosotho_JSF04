<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">My Wishlist</h1>
      <div v-if="loading" class="text-center text-gray-600 py-4">
        <p class="text-2xl">Loading...</p>
      </div>
      <div v-else-if="wishlistStore.wishlist.length === 0" class="text-center text-gray-600 py-4">
        <p class="text-2xl">Your wishlist is empty.</p>
      </div>
      <div v-else>
        <div v-for="item in wishlistStore.wishlist" :key="item.id" class="bg-white p-8 rounded-lg shadow-lg mb-4">
          <div class="flex flex-col md:flex-row">
            <img :src="item.image" alt="Product Image" class="w-full md:w-1/2 h-64 object-contain mb-4 md:mb-0 md:mr-4">
            <div class="md:w-1/2">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ item.title }}</h2>
              <p class="text-2xl font-semibold text-gray-800 mb-4">${{ item.price.toFixed(2) }}</p>
              <div class="flex items-center mb-4">
                <i v-for="i in 5" :key="i" :class="getStarClass(i, item.rating.rate)" class="fa-star"></i>
                <span class="ml-2 text-gray-600">({{ item.rating.count }} reviews)</span>
              </div>
              <p class="text-gray-700 mb-4">{{ item.description }}</p>
              <p class="text-gray-600 mb-4">Category: {{ item.category }}</p>
              <div class="flex space-x-4">
              <button @click="addToCart(item)" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
                Add to Cart
              </button>
              <button @click="wishlistStore.removeFromWishlist(item.id)" class="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300">
                Remove from Wishlist
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useWishlistStore } from '../store/wishListStore.js';
  import { cartStore } from '../store/cartStore.js'
  
  const wishlistStore = useWishlistStore();
  const cartStore = useCartStore();

  const loading = ref(false); // Set to false by default; change if needed
  
  const addToCart = (item) => {
  cartStore.addToCart(item);
};

  const getStarClass = (i, rate) =>
    i <= Math.round(rate || 0)
      ? 'fas fa-star text-yellow-400'
      : 'far fa-star text-gray-300';
  </script>
  