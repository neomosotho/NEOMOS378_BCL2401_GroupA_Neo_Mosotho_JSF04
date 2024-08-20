import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Define the maximum number of items allowed for comparison
const MAX_COMPARISON_ITEMS = 3

export const useComparisonStore = defineStore('comparison', () => {
    const comparisonList = ref([])

    const comparisonCount = computed(() => comparisonList.value.length)
    const isComparisonFull = computed(() => comparisonList.value.length >= MAX_COMPARISON_ITEMS)

    const addToComparison = (product) => {
        if (comparisonList.value.length < MAX_COMPARISON_ITEMS && 
            !comparisonList.value.some(item => item.id === product.id)) {
            comparisonList.value.push(product)
            return true
        }
        return false
    }

    const removeFromComparison = () => {
        const index = comparisonList.value.findIndex(item => item.id === productId)
        if (index !== -1) {
            comparisonList.value.splice(index, 1)
        }
    }

    const clearComparison = () => {
        comparisonList.value = []
    }

    return {
        comparisonList,
        comparisonCount,
        isComparisonFull,
        addToComparison,
        removeFromComparison,
        clearComparison,
        MAX_COMPARISON_ITEMS
    }
})
