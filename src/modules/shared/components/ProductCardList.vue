<script setup lang="ts">
import { Product, ProductCard } from '@shared'

const product: Product = new Product(
  '123',
  'Мужские Кроссовки Nike Blazer Mid Suede',
  12999,
  '/sneakers/sneakers-1.jpg',
  true,
  true,
)
</script>

<template>
  <div class="grid grid-cols-4 gap-3">
    <ProductCard :product="product" />
  </div>
</template>
