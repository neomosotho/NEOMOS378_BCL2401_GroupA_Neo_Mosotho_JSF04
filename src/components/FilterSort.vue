<template>
  <div class="container mx-auto p-4 flex justify-between items-center">
    <div class="flex items-center space-x-4">
      <div>
        <label for="category" class="mr-2">Category:</label>
        <select id="category" v-model="localSelectedCategory" @change="emitCategoryChange">
          <option value="">All</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div>
        <label for="sort" class="mr-2">Sort by:</label>
        <select id="sort" v-model="localSortOrder" @change="emitSortChange">
          <option value="Default">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div>
        <label for="search" class="mr-2">Search:</label>
        <input id="search" type="text" v-model="localSearchQuery" @input="emitSearchChange" placeholder="Search products..." class="border rounded px-2 py-1">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  categories: Array,
  selectedCategory: String,
  sortOrder: String,
  searchQuery: String
});

const emit = defineEmits(['categoryChange', 'sortChange', 'searchChange']);

// Create local state for the v-model bindings
const localSelectedCategory = ref(props.selectedCategory);
const localSortOrder = ref(props.sortOrder);
const localSearchQuery = ref(props.searchQuery);

// Watch for changes in the local state and emit updates
watch(localSelectedCategory, (newValue) => {
  emit('categoryChange', newValue);
});
watch(localSortOrder, (newValue) => {
  emit('sortChange', newValue);
});
watch(localSearchQuery, (newValue) => {
  emit('searchChange', newValue);
});
</script>
