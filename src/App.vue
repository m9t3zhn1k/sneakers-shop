<script setup lang="ts">
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
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
</template>

<style scoped></style>
