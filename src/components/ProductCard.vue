<template>
    <div class="bg-white rounded-lg shadow-md p-4">
      <img :src="product.image" :alt="product.title" class="w-full h-40 object-contain mb-4" />
      <div>
        <h2 class="text-lg font-bold text-gray-800 truncate">{{ product.title }}</h2>
        <p class="text-gray-600">${{ product.price.toFixed(2) }}</p>
        <p class="text-gray-600">Category: {{ product.category }}</p>
        <div class="flex items-center">
          <i v-for="i in 5" :key="i" :class="getStarClass(i)" class="fas fa-star text-yellow-400"></i>
          <span class="ml-2 text-gray-600">({{ product.rating.count }} reviews)</span>
        </div>
        <div class="flex items-center justify-between mt-2">
          <button @click="viewDetails" class="mt-2 text-blue-500 hover:underline">View Details</button>
          <button @click="toggleFavorite" class="text-gray-500">
            <i :class="favoriteClass"></i>
          </button>
        </div>
        <button @click="addToCart" class="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
         Add to Cart
        </button>
        <button @click="addToComparison" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Compare
      </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useCartStore } from '../store/cartStore';
  import { useComparisonStore } from '../store/comparisonStore'
  import { useWishlistStore } from '../store/wishListStore';

  const props = defineProps({
    product: {
      type: Object,
      required: true
    }
  });
  
const router = useRouter();
const cartStore = useCartStore();
const comparisonStore = useComparisonStore();
const isFavorite = ref(false);
const wishListStore = useWishlistStore();

// const isFavorite = ref(wishListStore.wishlist.some(item => item.id === props.product.id));

const viewDetails = () => {
  router.push(`/product/${props.product.id}`);
};
  
const toggleFavorite = () => {
  if (isFavorite.value) {
    wishListStore.removeFromWishlist(props.product.id);
  } else {
    wishListStore.addToWishlist(props.product);
  }
  isFavorite.value = !isFavorite.value;
};

  const addToCart = () => {
  cartStore.addToCart(props.product);
};

  const addToComparison = () => {
    comparisonStore.addToComparison(props.product);
  }

  const favoriteClass = computed(() => isFavorite.value ? 'fas fa-heart text-red-500' : 'far fa-heart');
  
  const getStarClass = (i) => i <= Math.round(props.product.rating.rate) ? 'fas fa-star text-yellow-400' : 'far fa-star text-gray-300';

  // Watch for changes in the wishlist store and update `isFavorite`
  watch(() => wishListStore.wishlist, () => {
  isFavorite.value = wishListStore.wishlist.some(item => item.id === props.product.id);
}, { deep: true });
  </script>