<script setup lang="ts">
import { Product, ProductCard } from '@shared'

defineProps({
  products: Array<Product>,
})
</script>

<template>
  <div class="grid grid-cols-4 gap-3">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @toggle-favorite="$emit('toggleFavorite', product)"
    />
  </div>
</template>
