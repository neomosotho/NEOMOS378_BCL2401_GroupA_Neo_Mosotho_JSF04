<template>
  <div>
    <div class="container mx-auto p-4">
      <FilterSort
        :categories="categories"
        :selectedCategory="selectedCategory"
        :sortOrder="sortOrder"
        :searchQuery="searchQuery"
        @categoryChange="handleCategoryChange"
        @sortChange="handleSortChange"
        @searchChange="handleSearchChange"
      />
      <ProductGrid :products="filteredProducts" :loading="loading" />
      <div v-if="error" class="text-red-500 text-center mt-4">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { fetchProducts, fetchCategories } from '../api/index.js';
import FilterSort from '../components/FilterSort.vue';
import ProductGrid from '../components/ProductGrid.vue';

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref('');
const sortOrder = ref('asc');
const searchQuery = ref('');
const loading = ref(true);
const error = ref(null);

const loadProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    products.value = await fetchProducts(selectedCategory.value);
  } catch (err) {
    console.error('Error loading products:', err);
    error.value = 'Failed to load products. Please try again later.';
    products.value = [];
  } finally {
    loading.value = false;
  }
};

const filteredProducts = computed(() => {
  let filtered = products.value.filter(product =>
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  filtered.sort((a, b) =>
    sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price
  );

  return filtered;
});

const handleCategoryChange = (category) => {
  selectedCategory.value = category;
  loadProducts();
};

const handleSortChange = (order) => {
  sortOrder.value = order;
};

const handleSearchChange = (query) => {
  searchQuery.value = query;
};

onMounted(async () => {
  try {
    categories.value = await fetchCategories();
  } catch (err) {
    console.error('Error loading categories:', err);
    categories.value = [];
  }
  await loadProducts();
});
</script>