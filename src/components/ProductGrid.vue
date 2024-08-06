<!-- src/components/ProductGrid.vue -->
<template>
  <div class="container mx-auto p-4">
    <!-- Loading State -->
    <div v-if="loading" class="text-center text-gray-600 py-4">
      Loading products...
    </div>
    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @view-details="viewDetails"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard.vue';

export default {
  name: 'ProductGrid',
  components: {
    ProductCard
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    products: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    viewDetails(productId) {
      this.$emit('view-details', productId);
    }
  }
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
