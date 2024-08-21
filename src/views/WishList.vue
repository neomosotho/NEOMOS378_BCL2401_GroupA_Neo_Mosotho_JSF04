<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">My Wishlist</h1>
  
      <!-- Sorting and Filtering Controls -->
      <div class="mb-4">
        <select v-model="selectedSort" @change="sortItems" class="mr-4 p-2 border rounded">
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
  
        <input v-model="searchTerm" @input="filterItems" placeholder="Search..." class="p-2 border rounded"/>
      </div>
  
      <!-- Wishlist Items -->
      <div v-if="loading" class="text-center text-gray-600 py-4">
        <p class="text-2xl">Loading...</p>
      </div>
      <div v-else-if="filteredWishlist.length === 0" class="text-center text-gray-600 py-4">
        <p class="text-2xl">Your wishlist is empty.</p>
      </div>
      <div v-else>
        <div v-for="item in filteredWishlist" :key="item.id" class="bg-white p-8 rounded-lg shadow-lg mb-4">
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
                <button @click="viewDetails(item.id)" class="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Clear All Button -->
      <div class="text-center mt-4">
        <button @click="clearAll" class="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300">
          Clear All Wishlist Items
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useWishlistStore } from '../store/wishListStore.js';
  import { useCartStore } from '../store/cartStore.js';
  import { useRouter } from 'vue-router';
  
  const wishlistStore = useWishlistStore();
  const cartStore = useCartStore();
  const router = useRouter();
  
  const loading = ref(false);
  const selectedSort = ref('price-asc');
  const searchTerm = ref('');
  
  const sortItems = () => {
    const sorted = [...wishlistStore.wishlist];
    switch (selectedSort.value) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'title':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    wishlistStore.wishlist = sorted;
  };
  
  const filterItems = () => {
    filteredWishlist.value = wishlistStore.wishlist.filter(item =>
      item.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  };
  
  const clearAll = () => {
    wishlistStore.clearWishlist();
  };
  
  const viewDetails = (id) => {
    router.push({ name: 'ProductDetails', params: { id } });
  };
  
  const addToCart = (item) => {
    cartStore.addToCart(item);
  };
  
  const getStarClass = (i, rate) =>
    i <= Math.round(rate || 0)
      ? 'fas fa-star text-yellow-400'
      : 'far fa-star text-gray-300';
  
  const filteredWishlist = computed(() => {
    let items = [...wishlistStore.wishlist];
    if (searchTerm.value) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    }
    switch (selectedSort.value) {
      case 'price-asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        items.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'title':
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    return items;
  });
  </script>
  
  
  