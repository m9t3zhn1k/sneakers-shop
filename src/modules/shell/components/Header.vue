<script setup lang="ts">
defineProps({
  cartTotalPrice: Number,
})
const emits = defineEmits(['cartOpen'])

function emitCartOpen(): void {
  emits('cartOpen')
}
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 p-8">
    <router-link :to="{ name: 'catalog' }">
      <div class="flex items-center gap-4">
        <img class="w-10 h-10" src="/logo.png" alt="Logo" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-6">
      <li
        class="flex flex-shrink-0 items-center cursor-pointer gap-3 text-gray-500 font-normal duration-300 hover:text-black"
        @click="emitCartOpen()"
      >
        <img src="/cart.svg" alt="Logo" /> {{ cartTotalPrice }} руб.
      </li>
      <router-link :to="{ name: 'favorites' }">
        <li
          class="flex items-center cursor-pointer gap-3 text-gray-500 font-normal duration-300 hover:text-black"
        >
          <img src="/heart.svg" alt="Logo" /> Закладки.
        </li>
      </router-link>

      <li
        class="flex items-center cursor-pointer gap-3 text-gray-500 font-normal duration-300 hover:text-black"
      >
        <img src="/profile.svg" alt="Logo" /> Профиль
      </li>
    </ul>
  </header>
</template>
