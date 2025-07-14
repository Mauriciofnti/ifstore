import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref({
    items: [],
    total: 0,
  })

  function addproduct(product) {
    const existingproduct = cart.value.items.find((item) => item.id === product.id)
    if (existingproduct) {
      existingproduct.quantity++
    } else {
      cart.value.items.push({ ...product, quantity: 1 })
    }
    cart.value.total += product.price
    // alert(`Adicionado ${product.title} ao carrinho!`)
  }

  function incrementproductToCart(product) {
    const existingproduct = cart.value.items.find((item) => item.id === product.id)
    existingproduct.quantity++
    cart.value.total += product.price
  }

  function decrementproductToCart(product) {
    const existingproduct = cart.value.items.find((item) => item.id === product.id)
    if (existingproduct.quantity === 1) {
      cart.value.items = cart.value.items.filter((item) => item.id !== product.id)
    } else {
      existingproduct.quantity--
    }
    cart.value.total -= product.price
  }

  return { cart, addproduct, incrementproductToCart, decrementproductToCart }
})