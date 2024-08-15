// src/stores/cartStore.js
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'

export const useCartStore = defineStore('cart', () => {
    const cart = ref([])
    const userId = ref(null)
  
    const cartItemCount = computed(() => cart.value.length)
  
    const addToCart = (product) => {
      cart.value.push({ ...product, userId: userId.value })
    }

    return { cart, cartItemCount, addToCart}
})