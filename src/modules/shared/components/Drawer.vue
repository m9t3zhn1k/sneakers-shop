<script setup lang="ts">
import { inject } from 'vue'

const { toggleCartOpen } = inject<{ toggleCartOpen: () => void }>('cart', {
  toggleCartOpen: () => {},
})
</script>

<template>
  <div class="fixed h-full w-full top-0 left-0">
    <div
      class="absolute top-0 left-0 h-full w-full bg-black opacity-30"
      @click="toggleCartOpen()"
    ></div>
    <div class="absolute flex flex-col gap-4 bg-white w-96 h-full right-0 p-6 opacity-100">
      <div class="flex justify-between gap-2">
        <slot name="header"></slot>
        <button
          class="h-8 w-8 opacity-45 duration-300 hover:opacity-100"
          type="button"
          @click="toggleCartOpen()"
        >
          <img class="h-full w-full" src="/close.svg" />
        </button>
      </div>
      <div class="flex flex-col gap-3 flex-grow overflow-scroll">
        <slot name="content"></slot>
      </div>
      <div class="flex flex-col gap-4">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>
