// src/api/auth.js
const BASE_URL = 'https://fakestoreapi.com'

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    
    if (!response.ok) {
      throw new Error('Login failed')
    }
    
    return await response.json()
  } catch (error) {
    throw error
  }
}