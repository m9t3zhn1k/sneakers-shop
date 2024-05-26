<script setup lang="ts">
import { onMounted, reactive, type Ref, ref, watch } from 'vue'
import axios from 'axios'
import { z } from 'zod'
import Shell from '@/modules/shell/Shell.vue'
import { Select, Input, ProductCardList, Product, productSchema } from '@shared'
/* import Drawer from './components/Drawer.vue' */

const products: Ref<Product[]> = ref([])
const filters = reactive({
  search: '',
  sortBy: '',
})

onMounted(() => {
  axios
    .get('https://134a975d718e62e6.mokky.dev/products')
    .then(response => (products.value = z.array(productSchema).parse(response.data)))
    .catch(console.log)
})

watch(filters, () => {
  axios
    .get(
      `https://134a975d718e62e6.mokky.dev/products?title=*${filters.search}*&sortBy=${filters.sortBy}`,
    )
    .then(response => (products.value = z.array(productSchema).parse(response.data)))
    .catch(console.log)
})

function onSearchChange(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  filters.search = value
}

function onSortByChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value
  filters.sortBy = value
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

  <!-- <Drawer>
    <div class="absolute flex flex-col gap-4 bg-white w-96 h-full right-0 p-6 opacity-100">
      <div class="flex justify-between gap-2">
        <h2 class="text-2xl font-semibold">Корзина</h2>
        <button class="h-8 w-8 opacity-45 duration-300 hover:opacity-100" type="button">
          <img class="h-full w-full" src="/close.svg" />
        </button>
      </div>
      <div class="flex-grow overflow-scroll">
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
      </div>
      <div class="flex flex-col gap-4">
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
      </div>
    </div>
  </Drawer> -->
</template>

<style scoped></style>
