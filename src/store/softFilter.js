import { defineStore } from 'pinia';

export const useSoftFilterStore = defineStore('softFilter', {
  state: () => ({
    selectedCategory: '',
    sortOrder: 'asc',
    searchQuery: '',
  }),
  actions: {
    setCategory(category) {
      this.selectedCategory = category;
    },
    setSortOrder(order) {
      this.sortOrder = order;
    },
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    resetFilters() {
      this.selectedCategory = '';
      this.sortOrder = 'asc';
      this.searchQuery = '';
    },
  },
});