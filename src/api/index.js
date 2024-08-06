// src/api.js
const BASE_URL = 'https://fakestoreapi.com';

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/products/categories`);
  return await response.json();
}

export async function fetchProducts(category = '') {
  let url = `${BASE_URL}/products`;
  if (category) {
    url += `/category/${category}`;
  }
  const response = await fetch(url);
  data = await response.json();
  return { response: data };

}

export async function fetchSingleProduct(productId) {
  const response = await fetch(`${BASE_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}