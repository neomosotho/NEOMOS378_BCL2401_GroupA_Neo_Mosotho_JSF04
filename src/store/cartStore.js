import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
// import * as jwtDecode from 'jwt-decode'

export const useCartStore = defineStore('cart', () => {
    const cart = ref([])
    const userId = ref(null)
  
    const cartItemCount = computed(() => cart.value.length)
  
    const addToCart = (product) => {
      cart.value.push({ ...product, userId: userId.value })
    }

    const removeFromCart = (productId) => {
        const index = cart.value.findIndex(item => item.id === productId)
        if (index !== -1) {
          cart.value.splice(index, 1)
        }
      }

    const clearCart = () => {
      cart.value = []
    }

    const setUserId = async (token) => {
        if (token) {
          try {
            const jwtDecode = (await import('jwt-decode')).default
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

    return { cart, cartItemCount, addToCart, removeFromCart, clearCart, setUserId }
})