<script setup lang="ts">
import { Header } from './components'
import { inject } from 'vue'

const { cartTotalPrice, toggleCartOpen } = inject<{
  cartTotalPrice: number
  toggleCartOpen: () => void
}>('cart', { cartTotalPrice: 0, toggleCartOpen: () => {} })
</script>

<template>
  <div class="bg-white m-auto w-4/5 rounded-xl shadow-xl my-8">
    <Header :cartTotalPrice="cartTotalPrice" @cart-open="toggleCartOpen()" />
    <div class="container p-10 flex grow flex-col gap-6">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  &:empty {
    display: none;
  }
}
</style>
