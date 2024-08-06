<!-- Navbar.vue -->
<template>
  <div>
    <nav class=" border-slate-600 shadow-md p-4 flex justify-between">
      <div class="text-2xl font-extrabold text-slate-900">
        SwiftCraft
      </div>
      <div class="hidden lg:flex space-x-4">
        <a href="#" class="text-lg font-semibold">WishList</a>
        <i class="fas fa-shopping-cart"></i>
        <a href="#" class="text-lg font-semibold">LogIn</a>
      </div>
      <div>
        <button @click="toggleOpen" class="lg:hidden text-black focus:outline-none p-2 rounded" aria-label="Toggle menu">
          <i class="fas fa-bars text-2xl"></i>
        </button>
      </div>
    </nav>

    <div v-if="open" class="lg:hidden fixed inset-0 px-4 py-12 bg-white shadow-md" @click="toggleOpen">
      <div class="flex flex-col border border-slate-600 shadow-md p-4">
        <a href="#" class="text-lg font-semibold">WishList</a>
        <i class="fas fa-shopping-cart"></i>
        <a href="#" class="text-lg font-semibold">LogIn</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)

const toggleOpen = () => {
  open.value = !open.value
}
</script>