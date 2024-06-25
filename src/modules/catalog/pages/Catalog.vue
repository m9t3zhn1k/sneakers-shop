<script setup lang="ts">
import { inject, onMounted, reactive, ref, watch, type Ref } from 'vue'
import {
  Select,
  Input,
  ProductCardList,
  Product,
  ProductsIndexRequest,
  ProductsService,
  ProductsToggleFavoriteRequest,
} from '@shared'

const { updateCart } = inject<{
  updateCart: (product: Product) => void
}>('cart', { updateCart: () => {} })

const products: Ref<Product[]> = ref([])
const productsService = new ProductsService()
const filters = reactive({
  search: '',
  sortBy: 'title',
})

onMounted(() => {
  productsService
    .index(convertToProductsIndexRequest())
    .then(response => (products.value = response))
    .catch(console.log)
})

watch(filters, () =>
  productsService
    .index(convertToProductsIndexRequest())
    .then(response => (products.value = response))
    .catch(console.log),
)

function onSearchChange(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  filters.search = value
}

function onSortByChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value
  filters.sortBy = value
}

function toggleProductFavorite(product: Product): void {
  productsService
    .toggleFavorite(convertToProductsToggleFavoriteRequest(product))
    .then(
      response =>
        (products.value = [
          ...products.value.map(item => (item.id !== product.id ? item : response)),
        ]),
    )
}

function convertToProductsIndexRequest(): ProductsIndexRequest {
  return new ProductsIndexRequest({ search: filters.search, sortBy: filters.sortBy })
}

function convertToProductsToggleFavoriteRequest(product: Product): ProductsToggleFavoriteRequest {
  return new ProductsToggleFavoriteRequest(product.id, !product.isFavorite)
}
</script>

<template>
  <div class="flex justify-between gap-4 items-center">
    <h2 class="text-3xl font-bold">Все кроссовки</h2>
    <div class="flex gap-3 items-center">
      <Select @change="onSortByChange" />
      <Input @input="onSearchChange" />
    </div>
  </div>
  <ProductCardList
    :products="products"
    :show-actions="true"
    @toggle-favorite="toggleProductFavorite"
    @toggle-product-in-cart="updateCart"
  />
</template>
