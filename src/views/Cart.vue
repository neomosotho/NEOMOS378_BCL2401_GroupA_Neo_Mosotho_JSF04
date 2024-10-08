<!-- src/views/Cart.vue -->
<template>
  <div class="container mx-auto mt-10">
    <div class="flex shadow-md my-10">
      <div class="w-3/4 bg-white px-10 py-10">
        <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">{{ cartStore.cartItemCount }} Items</h2>
        </div>
        <div v-if="cartStore.cart.length === 0" class="mt-4 text-gray-700">
          Your cart is empty.
        </div>
        <div v-else>
          <div class="flex mt-10 mb-5" v-for="item in cartStore.cart" :key="item.id">
            <div class="flex w-2/5">
              <div class="w-20">
                <img class="h-24" :src="item.image" alt="">
              </div>
              <div class="flex flex-col justify-between ml-4 flex-grow">
                <span class="font-bold text-sm">{{ item.title }}</span>
                <span class="text-red-500 text-xs">{{ item.category }}</span>
                <button @click="removeItem(item.id)" class="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer">Remove</button>
              </div>
            </div>
            <div class="flex justify-center w-1/5">
              <input class="mx-2 border text-center w-12" type="number" :value="item.quantity" @input="updateQuantity(item.id, $event.target.value)">
            </div>
            <span class="text-center w-1/5 font-semibold text-sm">${{ item.price.toFixed(2) }}</span>
            <span class="text-center w-1/5 font-semibold text-sm">${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          
          <!-- Clear Cart button -->
          <div class="mt-8">
            <button @click="clearCart" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      <div v-if="isLoggedIn" id="summary" class="w-1/4 px-8 py-10">
        <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
        <div class="flex justify-between mt-10 mb-5">
          <span class="font-semibold text-sm uppercase">Items {{ cartStore.cartItemCount }}</span>
          <span class="font-semibold text-sm">${{ cartStore.cartTotal.toFixed(2) }}</span>
        </div>
        <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
      </div>
    
    <div v-else class="text-center mt-10 text-xl">
      Redirecting to login...
    </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCartStore } from '../store/cartStore'
  
  const router = useRouter()
  const cartStore = useCartStore()

  // Check if the user is logged in
  const isLoggedIn = computed(() => !!localStorage.getItem('token'))

  onMounted(() => {
  if (!isLoggedIn.value) {
    // Redirect to the login page if not logged in
    router.push({ name: 'Login' })
  }
})
  
  const cart = computed(() => cartStore.cart)
  const cartTotal = computed(() => cart.value.reduce((total, item) => total + item.price, 0))
  
  const removeItem = (productId) => {
  cartStore.removeFromCart(productId)
}

  const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, parseInt(quantity))
}

  const clearCart = () => {
  if (confirm('Are you sure you want to clear your entire cart?')) {
    cartStore.clearCart()
  }
}
  </script>