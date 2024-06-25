<script setup lang="ts">
import { onMounted, type Ref, ref, watch, provide, computed } from 'vue'
import { Shell } from '@/modules/shell'
import {
  InformationBlock,
  Product,
  Drawer,
  CartService,
  CartUpdateRequest,
  OrdersService,
  OrdersCreateRequest,
} from '@shared'

const cartService = new CartService()
const ordersService = new OrdersService()
const cart: Ref<Product[]> = ref([])
const cartTotalPrice: Ref<number> = ref(0)

const isCartOpen = ref(false)
const isOrdersCreateLoading = ref(false)

const cartSubmitButtonDisabled = computed<boolean>(
  () => !cartTotalPrice.value || isOrdersCreateLoading.value,
)

onMounted(() =>
  cartService
    .show()
    .then(response => (cart.value = response))
    .catch(response => console.log(response.message)),
)

watch(
  cart,
  () => (cartTotalPrice.value = cart.value.reduce((acc, value) => (acc += value.price), 0)),
)

function toggleCartOpen(): void {
  isCartOpen.value = !isCartOpen.value
}

function updateCart(product: Product): void {
  const isProductInCart = cart.value.find(item => item.id === product.id)
  let products: Product[]

  if (isProductInCart) {
    products = cart.value.filter(item => item.id !== product.id)
  } else {
    products = [...cart.value, product]
  }

  cartService
    .update(convertToCartUpdateRequest(products))
    .then(response => (cart.value = response))
    .catch(console.log)
}

function createOrder(): void {
  isOrdersCreateLoading.value = true

  ordersService
    .create(convertToOrdersCreateRequest(cart.value))
    .then(() => {
      cart.value = []
      isCartOpen.value = false
    })
    .catch(error => console.log(error.message))
    .finally(() => (isOrdersCreateLoading.value = false))
}

function convertToCartUpdateRequest(products: Product[]): CartUpdateRequest {
  return new CartUpdateRequest(products)
}

function convertToOrdersCreateRequest(products: Product[]): OrdersCreateRequest {
  return new OrdersCreateRequest(products)
}

provide('cart', { cartTotalPrice, cart, updateCart, toggleCartOpen })
</script>

<template>
  <Shell />

  <Drawer v-if="isCartOpen">
    <template v-slot:header>
      <h2 class="text-2xl font-semibold">Корзина</h2>
    </template>
    <template v-slot:content>
      <article
        class="flex items-center gap-3 border border-slate-100 bg-white rounded-2xl p-3 duration-300 hover:border-slate-200"
        v-for="product in cart"
        :key="product.id"
      >
        <img
          class="w-16 h-16 rounded-xl overflow-hidden shrink-0"
          :src="product.preview"
          alt="Sneaker"
        />
        <div class="flex grow-1 flex-col gap-2">
          <p>{{ product.title }}</p>
          <span class="font-semibold">{{ product.price }} руб.</span>
        </div>
        <button
          class="h-8 w-8 shrink-0 opacity-45 duration-300 hover:opacity-100"
          type="button"
          @click.stop="updateCart(product)"
        >
          <img class="h-full w-full" src="/trash.svg" />
        </button>
      </article>
      <!-- <InformationBlock
        class="self-center  my-auto"
        title="Заказ оформлен!"
        description="Ваш заказ находится в обработке и скоро будет передан в службу доставки"
        imageUrl="/order-success-icon.png"
      ></InformationBlock> -->
      <InformationBlock
        v-if="!cartTotalPrice"
        class="self-center my-auto"
        title="Корзина пуста"
        description="Для оформления заказа необходимо добавить хотя бы одну пару кроссовок"
        imageUrl="/package-icon.png"
      >
        <template v-slot:actions>
          <button
            class="grow p-4 rounded-2xl text-sm text-white bg-lime-500 duration-300 hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300"
            type="button"
          >
            В каталог
          </button>
        </template>
      </InformationBlock>
    </template>
    <template v-if="cartTotalPrice" v-slot:actions>
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="grow"></div>
        <span class="font-semibold">{{ cartTotalPrice }} руб.</span>
      </div>
      <button
        class="p-4 rounded-2xl text-sm text-white bg-lime-500 duration-300 hover:bg-lime-600 active:bg-lime-700 disabled:bg-slate-300"
        type="button"
        :disabled="cartSubmitButtonDisabled"
        @click="createOrder()"
      >
        Оформить заказ
      </button>
    </template>
  </Drawer>
</template>

<style scoped></style>
