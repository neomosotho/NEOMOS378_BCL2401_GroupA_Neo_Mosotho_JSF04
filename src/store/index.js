import { defineStore } from 'pinia';
import { fetchCategories, fetchProducts } from '../api.js';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    filteredProducts: [],
    categories: [],
    selectedCategory: '',
    sortOrder: 'asc',
    searchQuery: '',
    loading: true
  }),
  actions: {
    async loadCategories() {
      this.categories = await fetchCategories();
    },
    async loadProducts() {
      this.loading = true;
      this.products = await fetchProducts(this.selectedCategory);
      this.filterAndSortProducts();
      this.loading = false;
    },
    filterAndSortProducts() {
      this.filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      this.filteredProducts.sort((a, b) =>
        this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
    },
    setCategory(category) {
      this.selectedCategory = category;
      this.loadProducts();
    },
    setSortOrder(order) {
      this.sortOrder = order;
      this.filterAndSortProducts();
    },
    setSearchQuery(query) {
      this.searchQuery = query;
      this.filterAndSortProducts();
    }
  }
});
