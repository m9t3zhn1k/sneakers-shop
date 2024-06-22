<script setup lang="ts">
import { onMounted, reactive, type Ref, ref, watch } from 'vue'
import Shell from '@/modules/shell/Shell.vue'
import {
  Select,
  Input,
  ProductCardList,
  Product,
  ProductsService,
  ProductsIndexRequest,
  Drawer,
} from '@shared'

const productsService = new ProductsService()
const products: Ref<Product[]> = ref([])
const filters = reactive({
  search: '',
  sortBy: '',
})

onMounted(() =>
  productsService
    .index(convertToProductsIndexRequest())
    .then(response => (products.value = response))
    .catch(console.log),
)

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

function convertToProductsIndexRequest(): ProductsIndexRequest {
  return new ProductsIndexRequest({ search: filters.search, sortBy: filters.sortBy })
}
</script>

<template>
  <Shell>
    <div class="flex justify-between gap-4 items-center">
      <h2 class="text-3xl font-bold">Все кроссовки</h2>
      <div class="flex gap-3 items-center">
        <Select @change="onSortByChange" />
        <Input @input="onSearchChange" />
      </div>
    </div>
    <ProductCardList :products="products" />
  </Shell>

  <Drawer>
    <template v-slot:header>
      <h2 class="text-2xl font-semibold">Корзина</h2>
    </template>
    <template v-slot:content>
      <article
        class="flex items-center gap-3 border border-slate-100 bg-white rounded-2xl p-3 duration-300 hover:border-slate-200"
      >
        <img
          class="w-16 h-16 rounded-xl overflow-hidden shrink-0"
          src="/sneakers/sneakers-1.jpg"
          alt="Sneaker"
        />
        <div class="flex grow-1 flex-col gap-2">
          <p>Мужские Кроссовки Nike Air Max 270</p>
          <span class="font-semibold">12 999 руб.</span>
        </div>
        <button class="h-8 w-8 shrink-0 opacity-45 duration-300 hover:opacity-100" type="button">
          <img class="h-full w-full" src="/trash.svg" />
        </button>
      </article>
      <article
        class="flex items-center gap-3 border border-slate-100 bg-white rounded-2xl p-3 duration-300 hover:border-slate-200"
      >
        <img
          class="w-16 h-16 rounded-xl overflow-hidden shrink-0"
          src="/sneakers/sneakers-1.jpg"
          alt="Sneaker"
        />
        <div class="flex grow-1 flex-col gap-2">
          <p>Мужские Кроссовки Nike Air Max 270</p>
          <span class="font-semibold">12 999 руб.</span>
        </div>
        <button class="h-8 w-8 shrink-0 opacity-45 duration-300 hover:opacity-100" type="button">
          <img class="h-full w-full" src="/trash.svg" />
        </button>
      </article>
    </template>
    <template v-slot:actions>
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="grow"></div>
        <span class="font-semibold">12 999 руб.</span>
      </div>
      <button
        class="p-4 rounded-2xl text-sm text-white bg-lime-500 duration-300 hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300"
        type="button"
      >
        Оформить заказ
      </button>
    </template>
  </Drawer>
</template>

<style scoped></style>
