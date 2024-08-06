<!-- src/components/ProductModal.vue -->
<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4">{{ singleProduct.title }}</h2>
      <img :src="singleProduct.image" alt="Product Image" class="w-full h-48 object-cover mb-4">
      <p class="text-gray-600 mb-4">${{ singleProduct.price.toFixed(2) }}</p>
      <div class="flex items-center mb-4">
        <i v-for="i in 5" :key="i" :class="getStarClass(i)" class="fa-star"></i>
        <span class="ml-2 text-gray-600">({{ singleProduct.rating.count }} reviews)</span>
      </div>
      <p class="text-gray-600 mb-4">{{ singleProduct.description }}</p>
      <p class="text-gray-600 mb-4">Category: {{ singleProduct.category }}</p>
      <button @click="close" class="bg-red-500 text-white p-2 rounded">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductModal',
  props: {
    singleProduct: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    getStarClass(i) {
      return i <= Math.round(this.singleProduct.rating.rate)
        ? 'fas fa-star text-yellow-400'
        : 'far fa-star';
    }
  }
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
