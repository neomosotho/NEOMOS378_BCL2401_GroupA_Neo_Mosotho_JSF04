<!-- src/views/Home.vue -->
<template>
  <div>
    <Navbar />
    <div class="container mx-auto p-4">
      <FilterSort
        :categories="categories"
        :selectedCategory="selectedCategory"
        :sortOrder="sortOrder"
        :searchQuery="searchQuery"
        @category-change="handleCategoryChange"
        @sort-change="handleSortChange"
        @search-change="handleSearchChange"
      />
      <ProductGrid :products="filteredProducts" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Navbar from '../components/Navbar.vue';
import FilterSort from '../components/FilterSort.vue';
import ProductGrid from '../components/ProductGrid.vue';
import { fetchCategories, fetchProducts } from '../api';

export default {
  name: 'Home',
  components: {
    Navbar,
    FilterSort,
    ProductGrid
  },
  setup() {
    const products = ref([]);
    const filteredProducts = computed(() => {
      return products.value.filter(product => {
        return (
          (!selectedCategory.value || product.category === selectedCategory.value) &&
          (!searchQuery.value || product.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
        );
      }).sort((a, b) => {
        if (sortOrder.value === 'asc') {
          return a.price - b.price;
        } else if (sortOrder.value === 'desc') {
          return b.price - a.price;
        } else {
          return 0;
        }
      });
    });

    const categories = ref([]);
    const selectedCategory = ref('');
    const sortOrder = ref('asc');
    const searchQuery = ref('');

    const fetchData = async () => {
      categories.value = await fetchCategories();
      products.value = await fetchProducts();
    };

    onMounted(fetchData);

    const handleCategoryChange = (category) => {
      selectedCategory.value = category;
    };

    const handleSortChange = (order) => {
      sortOrder.value = order;
    };

    const handleSearchChange = (query) => {
      searchQuery.value = query;
    };

    return {
      categories,
      selectedCategory,
      sortOrder,
      searchQuery,
      filteredProducts,
      handleCategoryChange,
      handleSortChange,
      handleSearchChange
    };
  }
};
</script>

<style>
/* Add any necessary styling here */
</style>
