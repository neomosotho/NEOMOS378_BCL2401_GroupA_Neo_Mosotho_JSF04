<template>
  <div>
    <nav class="border-slate-600 shadow-md p-4 flex justify-between">
      <router-link to="/" class="text-2xl font-extrabold text-slate-900">
        SwiftCraft
      </router-link>
      <div class="hidden lg:flex space-x-4">
        <template v-if="isLoggedIn">
          <router-link to="/wishlist" class="text-lg font-semibold">
            WishList
            <span v-if="wishlistCount > 0" class="ml-1">({{ wishlistCount }})</span>
          </router-link>
          <router-link to="/comparison" class="text-lg font-semibold">
            Comparison List
            <span v-if="comparisonCount > 0" class="ml-1">({{ comparisonCount }})</span>
          </router-link>
          <router-link to="/cart" class="text-lg font-semibold">
            <i class="fas fa-shopping-cart"></i>
            <span v-if="cartItemCount > 0" class="ml-1">{{ cartItemCount }}</span>
          </router-link>
          <button @click="logout" class="text-lg font-semibold">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="text-lg font-semibold">Login</router-link>
        </template>
      </div>
      <div>
        <button @click="toggleOpen" class="lg:hidden text-black focus:outline-none p-2 rounded" aria-label="Toggle menu">
          <i class="fas fa-bars text-2xl"></i>
        </button>
      </div>
    </nav>
    <div v-if="isOpen" class="lg:hidden fixed inset-0 z-50 bg-white">
      <div class="p-4">
        <button @click="toggleOpen" class="float-right text-2xl">&times;</button>
        <div class="clear-both"></div>
        <div class="flex flex-col space-y-4 mt-4">
          <template v-if="isLoggedIn">
            <router-link to="/wishlist" class="text-lg font-semibold">
              WishList ({{ wishlistCount }})
            </router-link>
            <router-link to="/comparison" class="text-lg font-semibold">
              Comparison List ({{ comparisonCount }})
            </router-link>
            <router-link to="/cart" class="text-lg font-semibold">
              <i class="fas fa-shopping-cart mr-2"></i>Cart ({{ cartItemCount }})
            </router-link>
            <button @click="logout" class="text-lg font-semibold">Logout</button>
          </template>
          <template v-else>
            <router-link to="/login" class="text-lg font-semibold">Login</router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cartStore'
import { useComparisonStore } from '../store/comparisonStore'
import { useWishlistStore } from '../store/wishListStore'

const router = useRouter()
const cartStore = useCartStore()
const comparisonStore = useComparisonStore()
const wishlistStore = useWishlistStore()

const isLoggedIn = ref(false)
const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

const cartItemCount = computed(() => cartStore.cartItemCount)
const comparisonCount = computed(() => comparisonStore.comparisonCount)
const wishlistCount = computed(() => wishlistStore.wishlistCount)

const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  isLoggedIn.value = !!token
  if (token) {
    cartStore.setUserId(token)
    wishlistStore.setUserId(token)
  } else {
    cartStore.clearUserId()
    wishlistStore.clearUserId()
  }
}

const logout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  cartStore.clearCart()
  comparisonStore.clearComparison()
  wishlistStore.clearWishlist()
  router.push({ name: 'Login' })
}

onMounted(() => {
  checkLoginStatus()
})

// Watch for route changes to update login status
watch(() => router.currentRoute.value, checkLoginStatus)
</script>
