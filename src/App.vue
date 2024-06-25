<script setup lang="ts">
import { onMounted, reactive, type Ref, ref, watch, toRaw, provide, computed } from 'vue'
import Shell from '@/modules/shell/Shell.vue'
import {
  Select,
  Input,
  ProductCardList,
  Product,
  ProductsService,
  ProductsIndexRequest,
  Drawer,
  ProductsToggleFavoriteRequest,
  CartService,
  CartUpdateRequest,
  OrdersService,
  OrdersCreateRequest,
} from '@shared'

const productsService = new ProductsService()
const cartService = new CartService()
const ordersService = new OrdersService()
const products: Ref<Product[]> = ref([])
const cart: Ref<Product[]> = ref([])
const cartTotalPrice: Ref<number> = ref(0)
const filters = reactive({
  search: '',
  sortBy: 'title',
})
const isCartOpen = ref(false)
const isOrdersCreateLoading = ref(false)

const cartSubmitButtonDisabled = computed<boolean>(
  () => !cartTotalPrice.value || isOrdersCreateLoading.value,
)

onMounted(() => {
  productsService
    .index(convertToProductsIndexRequest())
    .then(response => (products.value = response))
    .catch(console.log)

  cartService
    .show()
    .then(response => (cart.value = response))
    .catch(response => console.log(response.message))
})

watch(filters, () =>
  productsService
    .index(convertToProductsIndexRequest())
    .then(response => (products.value = response))
    .catch(console.log),
)

watch(
  cart,
  () => (cartTotalPrice.value = cart.value.reduce((acc, value) => (acc += value.price), 0)),
)

function onSearchChange(event: Event): void {
  const value = (event.target as HTMLInputElement).value
  filters.search = value
}

function onSortByChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value
  filters.sortBy = value
}

function toggleProductFavorite(product: Product): void {
  productsService
    .toggleFavorite(convertToProductsToggleFavoriteRequest(product))
    .then(
      response =>
        (products.value = [
          ...products.value.map(item => (item.id !== product.id ? item : response)),
        ]),
    )
}

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

function convertToProductsIndexRequest(): ProductsIndexRequest {
  return new ProductsIndexRequest({ search: filters.search, sortBy: filters.sortBy })
}

function convertToProductsToggleFavoriteRequest(product: Product): ProductsToggleFavoriteRequest {
  return new ProductsToggleFavoriteRequest(product.id, !product.isFavorite)
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
  <Shell>
    <div class="flex justify-between gap-4 items-center">
      <h2 class="text-3xl font-bold">Все кроссовки</h2>
      <div class="flex gap-3 items-center">
        <Select @change="onSortByChange" />
        <Input @input="onSearchChange" />
      </div>
    </div>
    <ProductCardList
      :products="products"
      @toggle-favorite="toggleProductFavorite"
      @toggle-product-in-cart="updateCart"
    />
  </Shell>

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
    </template>
    <template v-slot:actions>
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
