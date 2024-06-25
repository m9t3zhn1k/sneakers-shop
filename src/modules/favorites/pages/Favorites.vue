<script setup lang="ts">
import { Product, ProductsIndexRequest, ProductsService, ProductCardList } from '@shared'
import { onMounted, ref } from 'vue'

const productsService = new ProductsService()
const products = ref<Product[]>([])

onMounted(() => {
  productsService
    .index(convertToProductsIndexRequest())
    .then(response => (products.value = response))
    .catch(console.log)
})

function convertToProductsIndexRequest(): ProductsIndexRequest {
  return new ProductsIndexRequest({ isFavorite: true })
}
</script>

<template>
  <div class="flex justify-between gap-4 items-center">
    <h2 class="text-3xl font-bold">Закладки</h2>
  </div>
  <ProductCardList :products="products" :show-actions="false" />
</template>
