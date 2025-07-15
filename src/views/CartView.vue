<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <main>
    <section class="cart" v-if="cartStore.cart.items.length==0">
      <h1>Não há produtos no carrinho</h1>
    </section>    
    <section class="cart" v-else>
      <h2>Carrinho</h2>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Quantidade</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartStore.cart.items" :key="product.id">
            <td class="cart-item">
              <RouterLink :to="`/product/${product.id}`">
                <img :src="product.image[0]" alt="{{product.title}}" />
                <div class="cart-item-info">
                  <p class="cart-item-title">{{ product.name }}</p>
                  <p class="cart-item-author">{{ product.specifications }}</p>
                  <p class="cart-item-price">R$ {{ product.price.toFixed(2) }}</p>
                </div>                
              </RouterLink>
            </td>
            <td>
              <div class="cart-item-quantity">
                <button @click='cartStore.decrementproductToCart(product)' class="plain"><span class="mdi mdi-minus"></span></button> {{ product.quantity }}
                <button @click="cartStore.incrementproductToCart(product)" class="plain"><span class="mdi mdi-plus"></span></button>
              </div>
            </td>
            <td class="cart-item-subtotal">{{ (product.price*product.quantity).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <router-link to='/'> <button class="outlined">Voltar para loja</button></router-link>
      <div class="cart-summary">
        <div class="cupom">
          <input type="text" placeholder="Código do cupom" /><button>Inserir cupom</button>
        </div>
        <div class="summary">
          <h2>Total da Compra</h2>
          <div class="summary-items">
            <span>Produtos</span> <span>R$ {{ cartStore.cart.total.toFixed(2) }}</span
            ><span>Frete</span> <span> Grátis</span> <span>Total</span
            ><span>R$ {{ cartStore.cart.total.toFixed(2) }}</span>
          </div>
          <RouterLink to="/pay"> <button>Ir para pagamento</button></RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 5vh 8vw;
  border-bottom: 2px solid #27ae6099;
  background-color: var(--page2);
  border-radius: 5px;

  & h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #27ae60;
  }

  & table {
    width: 100%;
    border-collapse: collapse;
    margin: 40px 0;

    & th,
    td {
      padding: 10px;
      text-align: left;
    }

    & th {
      border-bottom: 2px solid #27ae6099;
      font-size: 1.2rem;
      font-weight: 700;
    }

    & td {
      border-bottom: 1px solid rgb(128, 128, 128);
      font-size: 1rem;
    }

    & .cart-item-quantity {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }

    & .cart-item-subtotal {
      font-size: 1.1rem;
      font-weight: 700;
    }

    & .cart-item a {
      display: flex;
      align-items: center;
      gap: 20px;

      & img {
        width: 80px;
        height: auto;
      }

      & .cart-item-info {
        display: flex;
        flex-direction: column;
        gap: 5px;

        & .cart-item-title {
          font-size: 1.2rem;
          font-weight: 700;
        }
        & .cart-item-author {
          font-size: 1rem;
        }
        & .cart-item-price {
          font-size: 1.1rem;
          font-weight: 600;
        }
      }
    }
  }

  & .cart-summary {
    display: flex;
    justify-content: space-between;
    width: 100%;

    & .cupom {
      display: flex;
      align-items: center;
      margin-top: 80px;
      gap: 10px;

      & input {
        width: 350px;
        height: 50px;
        border-radius: 5px;
        font-size: 1rem;
        border: 2px solid rgb(128, 128, 128);
        padding: 5px;
      }
    }

    & .summary {
      border: 1px solid rgb(128, 128, 128);
      border-radius: 10px;
      padding: 1vw;
      margin: 10px;


      & h2 {
        font-size: 1.2rem;
        font-weight: 700;
        color: black;
      }

      & .summary-items {
        display: grid;
        grid-template-columns: 3fr 1fr;

        & span {
          padding: 10px 0;
          border-bottom: 1px solid rgb(128, 128, 128);
        }
      }

      & button {
        margin-top: 20px;
      }
    }
  }
}

@media (max-width: 700px) {
  .cart table tbody a, .cart-summary{
    flex-direction: column;
  }
}
</style>