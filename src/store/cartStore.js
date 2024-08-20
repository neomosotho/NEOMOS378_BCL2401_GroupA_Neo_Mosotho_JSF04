import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import * as jwtDecode from 'jwt-decode'

export const useCartStore = defineStore('cart', () => {
    const cart = ref([])
    const userId = ref(null)
  
    const cartItemCount = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0))
    const cartTotal = computed(() => cart.value.reduce((total, item) => total + item.price * item.quantity, 0))
  
    const addToCart = (product) => {
        const existingItem = cart.value.find(item => item.id === product.id)
        if (existingItem) {
            existingItem.quantity++
        } else {
            cart.value.push({ ...product, quantity: 1, userId: userId.value })
        }
    }

    const removeFromCart = (productId) => {
        const index = cart.value.findIndex(item => item.id === productId)
        if (index !== -1) {
          cart.value.splice(index, 1)
        }
      }

    const updateQuantity = (productId, quantity) => {
        const item = cart.value.find(item => item.id === productId)
        if (item) {
            item.quantity = Math.max(1, quantity) // Ensure quantity is at least 1
        }
    }

    const clearCart = () => {
      cart.value = []
    }

    const setUserId = async (token) => {
      if (token) {
        try {
          const { default: jwtDecode } = await import('jwt-decode')
          const decodedToken = jwtDecode(token)
          userId.value = decodedToken.sub // Assuming 'sub' is the user ID in the token
        } catch (error) {
          console.error('Error decoding token:', error)
          userId.value = null
        }
      } else {
        userId.value = null
      }
  }

    return { cart, cartItemCount, cartTotal, addToCart, removeFromCart, updateQuantity, clearCart, setUserId }
})