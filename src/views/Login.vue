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
          <div class="relative">
            <label for="password" class="sr-only">Password</label>
            <input :type="passwordVisible ? 'text' : 'password'" id="password" name="password" required v-model="password"
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Password">
            <button type="button" @click="passwordVisible = !passwordVisible" class="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5">
              <svg v-if="passwordVisible" class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8a7.965 7.965 0 011.457-4.324m3.824-2.6C8.565 5.292 9.269 5 10 5a3 3 0 013 3 3 3 0 003 3c.731 0 1.435-.292 1.974-.763m2.553-2.686A7.967 7.967 0 0112 19c-4.418 0-8-3.582-8-8 0-2.071.784-3.96 2.077-5.422m3.51-1.605A3.973 3.973 0 0112 5m0 0v.01M12 12a1.5 1.5 0 11-2.122 2.121M12 15v1.38M16 16a1.5 1.5 0 00.429-2.977m-6.355.677A2.001 2.001 0 0011 16h2" />
              </svg>
              <svg v-else class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.5 12C2.5 12 7 5 12 5s9.5 7 9.5 7-4.5 7-9.5 7-9.5-7-9.5-7z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
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
const passwordVisible = ref(false)
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
