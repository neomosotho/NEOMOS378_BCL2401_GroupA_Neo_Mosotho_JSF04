<template>
    <div>
      <h1>My Wishlist</h1>
      <div v-if="wishlistStore.wishlist.length === 0">Your wishlist is empty.</div>
      <div v-else>
        <div v-for="item in wishlistStore.wishlist" :key="item.id">
          <p>{{ item.title }}</p>
          <button @click="wishlistStore.removeFromWishlist(item.id)">Remove</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useWishlistStore } from '../store/wishListStore'
  
  const wishlistStore = useWishlistStore()
  </script>
  