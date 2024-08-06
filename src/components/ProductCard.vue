<!-- src/components/ProductCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <img :src="product.image" alt="Product Image" class="w-400 h-40 object-cover">
    <div class="mt-4">
      <h2 class="text-lg font-bold text-gray-800">{{ product.title }}</h2>
      <p class="text-gray-600">${{ product.price.toFixed(2) }}</p>
      <p class="text-gray-600">Category: {{ product.category }}</p>
      <div class="flex items-center">
        <i v-for="i in 5" :key="i" :class="getStarClass(i)" class="fa-star"></i>
        <span class="ml-2 text-gray-600">({{ product.rating.count }} reviews)</span>
      </div>
      <div class="flex items-center justify-between mt-2">
        <button @click="viewDetails" class="mt-2 text-blue-500">View Details</button>
        <button @click="toggleFavorite" class="text-gray-500">
          <i :class="favoriteClass"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isFavorite: false
    };
  },
  computed: {
    favoriteClass() {
      return this.isFavorite ? 'fas fa-heart text-red-500' : 'far fa-heart';
    }
  },
  methods: {
    viewDetails() {
      this.$emit('view-details', this.product.id);
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    getStarClass(i) {
      return i <= Math.round(this.product.rating.rate)
        ? 'fas fa-star text-yellow-400'
        : 'far fa-star';
    }
  }
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
