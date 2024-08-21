<!-- src/components/ThemeToggle.vue -->
<template>
    <button @click="toggleTheme">
      <span v-if="isDarkMode">
        🌙 <!-- Dark mode icon -->
      </span>
      <span v-else>
        ☀️ <!-- Light mode icon -->
      </span>
    </button>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const isDarkMode = ref(false)
  
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark', isDarkMode.value)
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  }
  
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      isDarkMode.value = true
      document.documentElement.classList.add('dark')
    }
  })
  </script>
  