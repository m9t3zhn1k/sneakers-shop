<script setup lang="ts">
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'
</script>

<template>
  <div class="bg-white m-auto w-4/5 rounded-xl shadow-xl mt-8">
    <Header />
    <div class="p-10">
      <div class="flex flex-col gap-6">
        <div class="flex justify-between gap-4">
          <h2 class="text-3xl font-bold">Все кроссовки</h2>
          <span>input</span>
        </div>
        <CardList />
      </div>
    </div>
  </div>
  <Drawer>
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
  </Drawer>
</template>

<style scoped></style>
