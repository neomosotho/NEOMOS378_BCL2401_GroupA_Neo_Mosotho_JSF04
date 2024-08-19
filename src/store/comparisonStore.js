import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useComparisonStore = defineStore('comparison', () => {
    const comparisonList = ref([])

    const comparisonCount = computed(() => comparisonList.value.length)

    const addToComparison = (product) => {
        if (!comparisonList.value.some(item => item.id === product.id)) {
            comparisonList.value.push(product)
        }
    }
})
