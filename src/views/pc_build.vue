<template>
  <div class="wrapper">
    <transition name="fade" mode="out-in">
      <div v-if="!isFinalizing" class="container" :key="etapaAtual">
        <h1>Monte Seu PC</h1>

        <!-- Indicador de Progresso -->
        <div class="progress-container">
          <h2>{{ etapaAtual + 1 }}° Escolha seu: {{ categoriaAtual }}</h2>
          <div class="progress-bar">
            <div
              v-for="(categoria, indice) in categorias"
              :key="categoria"
              class="progress-item"
              :class="{ active: indice <= etapaAtual }"
            >
              {{ categoria }}
            </div>
          </div>
        </div>

        <!-- Tela de Seleção de Produtos -->
        <div v-if="etapaAtual < categorias.length" class="products-container">
          <div v-if="produtosFiltrados.length > 0" class="products-grid">
            <div
              v-for="produto in produtosFiltrados"
              :key="produto.id"
              class="product-card"
            >
              <img :src="produto.image[0]" :alt="produto.name" class="product-image" />
              <h3>{{ produto.name }}</h3>
              <p class="specifications">{{ produto.specifications }}</p>
              <p class="price">R$ {{ produto.price.toFixed(2) }}</p>
              <button @click="escolherProduto(produto)" class="select-button">
                Selecionar
              </button>
            </div>
          </div>
          <div v-else class="no-products">
            Nenhum produto disponível para esta categoria.
          </div>
        </div>

        <!-- Tela de Revisão -->
        <div v-else class="review-container">
          <h2>Revisão da Sua Montagem</h2>
          <div v-if="temProdutosEscolhidos" class="review-card">
            <div v-for="(produto, categoria) in componentesEscolhidos" :key="categoria" class="review-item">
              <p class="category">{{ categoria }}:</p>
              <p>{{ produto.name }} - R$ {{ produto.price.toFixed(2) }}</p>
            </div>
            <p class="total">Total: R$ {{ precoTotal.toFixed(2) }}</p>
            <button @click="finalizarMontagem" class="finalize-button">
              Finalizar Montagem
            </button>
          </div>
          <div v-else class="no-products">
            Nenhum componente selecionado.
          </div>
        </div>

        <!-- Botões de Navegação -->
        <div class="navigation">
          <button
            v-if="etapaAtual > 0"
            @click="voltarEtapa"
            class="nav-button back-button"
          >
            Voltar
          </button>
          <button
            v-if="etapaAtual < categorias.length && temProdutoNaCategoriaAtual"
            @click="proximaEtapa"
            class="nav-button next-button"
          >
            Próxima Etapa
          </button>
        </div>
      </div>
      <div v-else class="finalization-container" :key="'finalization'">
        <h2>Finalizar Montagem</h2>
        <div class="finalization-card">
          <h3 class="tittle_cart">Montagem</h3>
          <ul id="cart_itens">
            <li v-for="(produto, categoria) in componentesEscolhidos" :key="categoria">
              {{ produto.name }} - R$ {{ produto.price.toFixed(2) }}
            </li>
            <li v-if="!temProdutosEscolhidos">Nenhum item na montagem.</li>
          </ul>
          <div class="total">
            <div class="pix">
              <span class="pix_label">à vista</span>
              <span class="pix_value" id="pix_value">R$ {{ precoPix.toFixed(2) }}</span>
              <span class="pix_note">no PIX com 15% de desconto</span>
            </div>
          </div>
          <hr>
          <div class="parc">
            <span class="total_parc" id="cart_total">R$ {{ precoTotal.toFixed(2) }}</span>
            <span class="parc_note">
              em até 12x de <span id="installment">R$ {{ precoParcelado.toFixed(2) }}</span><br>
              sem juros no cartão
            </span>
          </div>
          <div class="finalization-buttons">
            <button @click="voltarParaMontagem" class="nav-button back-button">
              Voltar
            </button>
            <button class="cart_button" @click="confirmarCompra" aria-label="Confirmar compra do carrinho">
              Confirmar Montagem
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Carrinho de Compras -->
    <aside v-if="!isFinalizing" class="shopCart">
      <h2 class="tittle_cart">Carrinho</h2>
      <ul id="cart_itens">
        <li v-for="(produto, categoria) in componentesEscolhidos" :key="categoria">
          {{ produto.name }} - R$ {{ produto.price.toFixed(2) }}
        </li>
        <li v-if="!temProdutosEscolhidos">Nenhum item no carrinho.</li>
      </ul>
      <div class="total">
        <div class="pix">
          <span class="pix_label">à vista</span>
          <span class="pix_value" id="pix_value">R$ {{ precoPix.toFixed(2) }}</span>
          <span class="pix_note">no PIX com 15% de desconto</span>
        </div>
      </div>
      <hr>
      <div class="parc">
        <span class="total_parc" id="cart_total">R$ {{ precoTotal.toFixed(2) }}</span>
        <span class="parc_note">
          em até 12x de <span id="installment">R$ {{ precoParcelado.toFixed(2) }}</span><br>
          sem juros no cartão
        </span>
      </div>
      <button class="cart_button" @click="finalizarCompra" aria-label="Finalizar compra do carrinho">
        FINALIZAR MONTAGEM
      </button>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/produtos.js'
import { useCartStore } from '@/stores/cart.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const productStore = useProductStore()
const cartStore = useCartStore()
const listaProdutos = ref(productStore.products || []) // Fallback para array vazio
const etapaAtual = ref(0)
const componentesEscolhidos = ref({})
const isFinalizing = ref(false)

const categorias = computed(() => {
  const cats = []
  for (const produto of listaProdutos.value) {
    if (!cats.includes(produto.category)) {
      cats.push(produto.category)
    }
  }
  return cats
})

const categoriaAtual = computed(() => {
  if (etapaAtual.value < categorias.value.length) {
    return categorias.value[etapaAtual.value]
  }
  return 'Revisão'
})

const produtosFiltrados = computed(() => {
  return listaProdutos.value.filter(produto => produto.category === categoriaAtual.value)
})

const precoTotal = computed(() => {
  let total = 0
  for (const categoria in componentesEscolhidos.value) {
    total += componentesEscolhidos.value[categoria].price
  }
  return total
})

const precoPix = computed(() => {
  return precoTotal.value * 0.85 // 15% de desconto
})

const precoParcelado = computed(() => {
  return precoTotal.value / 12 // Parcelado em 12x sem juros
})

const temProdutosEscolhidos = computed(() => {
  return Object.keys(componentesEscolhidos.value).length > 0
})

const temProdutoNaCategoriaAtual = computed(() => {
  return componentesEscolhidos.value[categoriaAtual.value] !== undefined
})

const escolherProduto = (produto) => {
  componentesEscolhidos.value = {
    ...componentesEscolhidos.value,
    [produto.category]: produto,
  }
  // Scroll para o botão "Próxima Etapa"
  const nextButton = document.querySelector('.next-button')
  if (nextButton) {
    nextButton.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  cartStore.addproduct(produto)
}

const proximaEtapa = () => {
  if (etapaAtual.value < categorias.value.length) {
    etapaAtual.value += 1
  }
}

const voltarEtapa = () => {
  if (etapaAtual.value > 0) {
    etapaAtual.value -= 1
  }
}

const finalizarMontagem = () => {
  isFinalizing.value = true
}

const finalizarCompra = () => {
  isFinalizing.value = true
}

const voltarParaMontagem = () => {
  isFinalizing.value = false
}

const confirmarCompra = () => {
  if (temProdutosEscolhidos.value) {
    alert(`Montagem confirmada! Total: R$ ${precoTotal.value.toFixed(2)} (PIX: R$ ${precoPix.value.toFixed(2)}, 12x R$ ${precoParcelado.value.toFixed(2)})`)

    componentesEscolhidos.value = {} // Limpar carrinho após confirmação

    isFinalizing.value = false
    etapaAtual.value = 0 // Voltar para a primeira etapa
    router.push('/cart')
  } else {
    alert('A montagem está vazia! Selecione produtos para continuar.')
    isFinalizing.value = false    
    router.push('/pcbuild')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  background-color: var(--page1);
  color: var(--text);
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s, color 0.3s;
  box-sizing: border-box;
}

.container {
  flex: 3;
  min-width: 0;
  padding-right: 1rem;
  box-sizing: border-box;
}

.shopCart, .finalization-container {
  flex: 1;
  min-width: 0;
  max-width: 100%;
  background-color: var(--page2);
  border: 1px solid var(--border-src);
  border-radius: 8px;
  padding: 1rem;
  transition: background-color 0.3s, border-color 0.3s;
  box-sizing: border-box;
}

.finalization-container {
  flex: 0 0 100%;
  max-width: 600px;
  margin: 0 auto;
}

.tittle_cart {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text);
}

#cart_itens {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  color: var(--text);
  min-height: 60px;
  font-size: 0.9rem;
}

#cart_itens li {
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.total {
  color: var(--text);
  font-size: 0.85rem;
  font-weight: bold;
  text-align: center;
  padding-top: 1rem;
}

.pix .pix_label {
  color: var(--success-color);
  font-size: 0.8rem;
  display: block;
}

.pix_value {
  color: var(--success-color);
  font-size: 1.1rem;
  display: block;
}

.pix_note {
  color: var(--text);
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.parc {
  text-align: center;
  font-weight: bold;
  padding-top: 1rem;
}

.total_parc {
  color: var(--error-color);
  font-size: 1.1rem;
  display: block;
}

#installment {
  color: var(--error-color);
}

.parc_note {
  color: var(--text);
  font-size: 0.8rem;
  display: block;
}

.cart_button, .finalize-button {
  width: 100%;
  padding: 8px;
  background-color: var(--text-hover);
  color: var(--page1);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.cart_button:hover, .finalize-button:hover {
  background-color: var(--page2-hover);
}

.finalization-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.finalization-card {
  background-color: var(--page1);
  border: 1px solid var(--border-src);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, border-color 0.3s;
}

h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text);
}

h2 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
  color: var(--text);
}

.progress-container {
  margin-bottom: 1rem;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  flex-wrap: wrap;
}

.progress-item {
  flex: 1;
  text-align: center;
  padding: 8px;
  background-color: var(--page2);
  border-radius: 4px;
  font-size: 0.8rem;
  color: var(--text);
  transition: background-color 0.3s, color 0.3s;
  min-width: 60px;
}

.progress-item.active {
  background-color: var(--page2-hover);
  color: var(--page1);
}

.products-container {
  margin-bottom: 1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.product-card {
  background-color: var(--page1);
  border: 1px solid var(--border-src);
  border-radius: 8px;
  padding: 0.75rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, background-color 0.3s, border-color 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.product-card h3 {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: var(--text);
}

.specifications {
  font-size: 0.8rem;
  color: var(--text);
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1rem;
  font-weight: bold;
  color: var(--text-hover);
  margin-bottom: 0.5rem;
}

.select-button {
  width: 100%;
  padding: 8px;
  background-color: var(--text-hover);
  color: var(--page1);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.select-button:hover {
  background-color: var(--page2-hover);
}

.no-products {
  text-align: center;
  color: var(--text);
  font-size: 0.9rem;
}

.review-container {
  margin-bottom: 1rem;
}

.review-card {
  background-color: var(--page1);
  border: 1px solid var(--border-src);
  border-radius: 8px;
  padding: 0.75rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, border-color 0.3s;
}

.review-item {
  margin-bottom: 0.5rem;
}

.category {
  font-weight: bold;
  color: var(--text);
}

.total {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--text);
  margin-top: 0.8rem;
}

.nav-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--page1);
  transition: background-color 0.3s ease;
}

.back-button {
  background-color: var(--text-hover);
}

.back-button:hover {
  background-color: var(--page2-hover);
}

.next-button {
  background-color: var(--page2-hover);
}

.next-button:hover {
  background-color: var(--text-hover);
}

.navigation {
  display: flex;
  justify-content: space-between;
}

/* Responsividade */
@media (max-width: 1200px) {
  .wrapper {
    flex-direction: column;
  }

  .container {
    padding-right: 0;
  }

  .shopCart {
    max-width: 100%;
    margin-top: 1rem;
  }
}

@media (max-width: 768px) {
  .wrapper {
    padding: 0.5rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .progress-item {
    font-size: 0.7rem;
    padding: 6px;
    min-width: 50px;
  }

  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.1rem;
  }

  .shopCart, .finalization-container {
    min-width: 0;
    max-width: 100%;
  }

  #cart_itens {
    font-size: 0.85rem;
  }

  .total {
    font-size: 0.8rem;
  }

  .pix_label,
  .pix_note,
  .parc_note {
    font-size: 0.75rem;
  }

  .pix_value,
  .total_parc {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .wrapper {
    padding: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1rem;
  }

  .progress-item {
    font-size: 0.65rem;
    padding: 5px;
    min-width: 40px;
  }

  .product-card {
    padding: 0.5rem;
  }

  .product-image {
    height: 100px;
  }

  .product-card h3 {
    font-size: 1rem;
  }

  .specifications {
    font-size: 0.75rem;
  }

  .price {
    font-size: 0.9rem;
  }

  .select-button, .cart_button, .finalize-button {
    font-size: 0.85rem;
    padding: 6px;
  }

  .finalization-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@media (max-width: 360px) {
  .wrapper {
    padding: 0.25rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .progress-bar {
    gap: 3px;
  }

  .progress-item {
    min-width: 30px;
    font-size: 0.6rem;
    padding: 4px;
  }

  .shopCart, .finalization-container {
    padding: 0.5rem;
  }

  #cart_itens {
    font-size: 0.8rem;
  }

  .total {
    font-size: 0.75rem;
  }

  .pix_label,
  .pix_note,
  .parc_note {
    font-size: 0.7rem;
  }

  .pix_value,
  .total_parc {
    font-size: 0.95rem;
  }
}
</style>