<script setup lang="ts">
import { Product, ProductCard } from '@shared'

defineProps({
  products: Array<Product>,
})

const emits = defineEmits(['toggleFavorite'])

function emitToggleFavorite(product: Product): void {
  emits('toggleFavorite', product)
}
</script>

<template>
  <div class="grid grid-cols-4 gap-3">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @toggleFavorite="emitToggleFavorite(product)"
    />
  </div>
</template>
