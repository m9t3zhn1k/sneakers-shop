<script setup lang="ts">
import { Product, ProductCard } from '@shared'
import { inject, ref, type Ref } from 'vue'

defineProps({
  products: Array<Product>,
})

const emits = defineEmits(['toggleFavorite', 'toggleProductInCart'])
const { cart } = inject<{ cart: Ref<Product[]> }>('cart', { cart: ref([]) })

function emitToggleFavorite(product: Product): void {
  emits('toggleFavorite', product)
}

function emitToggleProductInCart(product: Product): void {
  emits('toggleProductInCart', product)
}

function checkProductInCart(product: Product): boolean {
  return !!cart.value.find(item => item.id === product.id)
}
</script>

<template>
  <div class="grid grid-cols-4 gap-3">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      :is-in-cart="checkProductInCart(product)"
      @toggle-favorite="emitToggleFavorite(product)"
      @toggle-product-in-cart="emitToggleProductInCart(product)"
    />
  </div>
</template>
