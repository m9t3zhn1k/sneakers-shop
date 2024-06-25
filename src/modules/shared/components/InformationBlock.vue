<script setup lang="ts">
defineProps({
  title: String,
  description: String,
  imageUrl: String,
})
</script>

<template>
  <div class="flex flex-col gap-5 items-center">
    <div class="flex flex-col gap-3 items-center text-center w-64">
      <img height="64" width="64" :src="imageUrl" :alt="title" />
      <h3 class="text-2xl font-medium">{{ title }}</h3>
      <p class="text-gray-400">{{ description }}</p>
    </div>
    <div class="flex gap-2 justify-between items-center w-full">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
