<script setup lang="ts">
import Card from './Card.vue'
import { Product } from '@/models'

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
    <Card :product="product" />
  </div>
</template>
