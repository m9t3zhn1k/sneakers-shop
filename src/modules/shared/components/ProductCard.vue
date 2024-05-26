<script setup lang="ts">
import { Product } from '@shared/models'

defineProps({
  product: Product,
})
</script>

<template>
  <article
    class="relative flex flex-col gap-3 border border-slate-100 bg-white rounded-2xl max-w-60 p-3 cursor-pointer duration-300 hover:shadow-lg"
  >
    <img
      class="absolute t-0 l-0"
      :src="product.isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="Like icon"
    />
    <img :src="product.preview" alt="Sneaker" />
    <p>{{ product.title }}</p>
    <div class="flex justify-between items-center gap-6">
      <div class="flex flex-col">
        <span class="text-slate-500">Цена:</span>
        <span class="font-semibold">{{ product.price }} руб.</span>
      </div>
      <button>
        <img :src="product.isInCart ? '/checked.svg' : '/plus.svg'" alt="Plus" />
      </button>
    </div>
  </article>
</template>
