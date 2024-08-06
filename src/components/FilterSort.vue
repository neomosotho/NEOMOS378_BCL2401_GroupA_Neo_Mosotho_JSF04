<!-- src/components/FilterSort.vue -->
<template>
  <div class="container mx-auto p-4 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <!-- Category Selector -->
      <div>
        <label for="category" class="mr-2">Category:</label>
        <select
          id="category"
          v-model="selectedCategory"
          @change="emitCategoryChange"
          class="border rounded px-2 py-1"
        >
          <option value="">All</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Sort Order Selector -->
      <div>
        <label for="sort" class="mr-2">Sort by:</label>
        <select
          id="sort"
          v-model="sortOrder"
          @change="emitSortChange"
          class="border rounded px-2 py-1"
        >
          <option value="Default">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      <!-- Search Input -->
      <div>
        <label for="search" class="mr-2">Search:</label>
        <input
          id="search"
          type="text"
          v-model="searchQuery"
          @input="emitSearchChange"
          placeholder="Search products..."
          class="border rounded px-2 py-1"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterSort',
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    selectedCategory: {
      type: String,
      default: ''
    },
    sortOrder: {
      type: String,
      default: 'asc'
    },
    searchQuery: {
      type: String,
      default: ''
    }
  },
  methods: {
    emitCategoryChange() {
      this.$emit('category-change', this.selectedCategory);
    },
    emitSortChange() {
      this.$emit('sort-change', this.sortOrder);
    },
    emitSearchChange() {
      this.$emit('search-change', this.searchQuery);
    }
  }
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
