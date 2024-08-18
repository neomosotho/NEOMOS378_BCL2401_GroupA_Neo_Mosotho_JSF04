<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="username" class="sr-only">Username</label>
              <input id="username" name="username" type="text" required v-model="username"
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     placeholder="Username">
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" name="password" type="password" required v-model="password"
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                     placeholder="Password">
            </div>
          </div>
  
          <div>
            <button type="submit" :disabled="isLoading"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ isLoading ? 'Logging in...' : 'Log in' }}
            </button>
          </div>
        </form>
        <p v-if="error" class="mt-2 text-center text-sm text-red-600">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useCartStore } from '../store/cartStore'
  
  const router = useRouter()
  const cartStore = useCartStore()
  
  const username = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const error = ref('')
  
  const handleLogin = async () => {
    if (!username.value || !password.value) {
      error.value = 'Please enter both username and password.'
      return
    }
  
    isLoading.value = true
    error.value = ''
  
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      })
  
      if (!response.ok) {
        throw new Error('Login failed')
      }
  
      const data = await response.json()
      localStorage.setItem('token', data.token)
      cartStore.setUserId(data.token)
      router.push(router.currentRoute.value.query.redirect || '/')
    } catch (err) {
      console.error('Login error:', err)
      error.value = 'Login failed. Please check your credentials and try again.'
    } finally {
      isLoading.value = false
    }
  }
  </script>