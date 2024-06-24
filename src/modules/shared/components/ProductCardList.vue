<script setup lang="ts">
import { Product, ProductCard } from '@shared'
import { inject, ref, type Ref } from 'vue'

defineProps({
  products: Array<Product>,
})

const emits = defineEmits(['toggleFavorite', 'toggleProductInBasket'])
const { basket } = inject<{ basket: Ref<Product[]> }>('basket', { basket: ref([]) })

function emitToggleFavorite(product: Product): void {
  emits('toggleFavorite', product)
}

function emitToggleProductInBasket(product: Product): void {
  emits('toggleProductInBasket', product)
}

function checkProductInBasket(product: Product): boolean {
  return !!basket.value.find(item => item.id === product.id)
}
</script>

<template>
  <div class="grid grid-cols-4 gap-3">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :is-in-basket="checkProductInBasket(product)"
      @toggle-favorite="emitToggleFavorite(product)"
      @toggle-product-in-basket="emitToggleProductInBasket(product)"
    />
  </div>
</template>
