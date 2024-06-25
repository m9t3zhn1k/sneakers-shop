<script setup lang="ts">
import { Header } from './components'
import { inject } from 'vue'

const { cartTotalPrice, toggleCartOpen } = inject<{
  cartTotalPrice: number
  toggleCartOpen: () => void
}>('cart', { cartTotalPrice: 0, toggleCartOpen: () => {} })
</script>

<template>
  <div class="bg-white m-auto w-4/5 rounded-xl shadow-xl mt-8">
    <Header :cartTotalPrice="cartTotalPrice" @cart-open="toggleCartOpen()" />
    <div class="p-10">
      <div class="flex flex-col gap-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
