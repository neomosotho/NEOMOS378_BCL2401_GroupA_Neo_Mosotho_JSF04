import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useWishlistStore = defineStore('wishlist', () => {
  const wishlist = ref([])
  const userId = ref(null)

  const wishlistCount = computed(() => wishlist.value.length)

  const addToWishlist = (product) => {
    const existingItem = wishlist.value.find(item => item.id === product.id)
    if (!existingItem) {
      wishlist.value.push({ ...product, userId: userId.value })
    }
  }

  const removeFromWishlist = (productId) => {
    wishlist.value = wishlist.value.filter(item => item.id !== productId)
  }

  const clearWishlist = () => {
    wishlist.value = []
  }

  const setUserId = (token) => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token)
        userId.value = decodedToken.sub // Adjust as per your JWT payload structure
      } else {
        userId.value = null
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      userId.value = null
    }
  }

  const clearUserId = () => {
    userId.value = null
  }

  return {
    wishlist,
    wishlistCount,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    setUserId,
    clearUserId,
  }
})
