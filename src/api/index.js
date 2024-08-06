// src/api.js
const BASE_URL = 'https://fakestoreapi.com';

export async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function fetchProducts(category = '') {
  try {
    let url = `${BASE_URL}/products`;
    if (category) {
      url += `/category/${encodeURIComponent(category)}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchSingleProduct(productId) {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching single product:', error);
    throw error;
  }
}