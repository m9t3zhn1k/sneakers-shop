<template>
  <header class="flex justify-between border-b border-slate-300 p-8">
    <div class="flex items-center gap-4">
      <img class="w-10 h-10" src="/logo.png" alt="Logo" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кроссовок</p>
      </div>
    </div>
    <ul class="flex items-center gap-6">
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 font-normal hover:text-black">
        <img src="/cart.svg" alt="Logo" /> 1205 руб.
      </li>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 font-normal">
        <img src="/heart.svg" alt="Logo" /> Закладки.
      </li>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 font-normal">
        <img src="/profile.svg" alt="Logo" /> Профиль
      </li>
    </ul>
  </header>
</template>
