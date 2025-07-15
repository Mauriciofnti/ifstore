<script setup>
import { RouterLink, useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useProductStore } from '../stores/produtos'
import { useCartStore } from '@/stores/cart'
import { ref } from 'vue'

// Declara a prop category
defineProps(['category'])

const route = useRoute()
const router = useRouter()
const Produtos = useProductStore()
const cart = useCartStore()

// Lista de categorias válidas
const validCategories = [
  'Monitores',
  'Periféricos',
  'Processadores',
  'Memorias-RAM',
  'Placas-mãe',
  'GPUs',
  'SSDs'
]

// Normaliza a categoria para corresponder ao formato em products.js
const normalizeCategory = (category) => {
  const categoryMap = {
    'monitores': 'Monitores',
    'perifericos': 'Periféricos',
    'processadores': 'Processadores',
    'memorias-ram': 'Memorias-RAM',
    'placas-mae': 'Placas-mãe',
    'placas-video': 'GPUs',
    'ssds': 'SSDs',
    'gpus': 'GPUs' // Mapeia "GPU" para "Placas de Vídeo"
  }
  const normalized = categoryMap[category.toLowerCase()] || 'Monitores'
  return normalized
}

// Inicializa a categoria normalizada
const normalizedCategory = ref(normalizeCategory(route.params.category || 'Monitores'))

// Verifica se a categoria é válida, caso contrário redireciona
if (!validCategories.includes(normalizedCategory.value)) {
  router.replace('/products/Monitores')
}

// Filtra produtos pela categoria normalizada
const filteredProducts = ref(Produtos.products.filter(p => p.category === normalizedCategory.value))

// Atualiza produtos quando a rota muda
onBeforeRouteUpdate((to) => {
  const newCategory = normalizeCategory(to.params.category || 'Monitores')
  if (!validCategories.includes(newCategory)) {
    router.replace('/products/Monitores')
    return false
  }
  normalizedCategory.value = newCategory
  filteredProducts.value = Produtos.products.filter(p => p.category === normalizedCategory.value)
})
</script>

<template>
    <main>
        <h1>{{ normalizedCategory.toUpperCase() }}</h1>
        <section>
            <div class="item" v-for="product in filteredProducts" :key="product.id">
            <RouterLink :to="`/product/${product.id}`">
                <img :src="product.image[0]" :alt="product.name" class="imagem" />
                <p>{{ product.name }}</p>
                <h2 class="price">R${{ product.price.toFixed(2) }}</h2>
            </RouterLink>
            <button class="add-to-cart" @click="cart.addproduct(product)">Adicionar ao Carrinho</button>
            </div>
            <p v-if="!filteredProducts.length">Nenhum produto encontrado para esta categoria.</p>
        </section>        
    </main>
</template>

<style scoped>
main {
  min-height: 100vh;
}
h1 {
  font-size: 24px;
  background-color: var(--page2-hover);
  color: var(--textwhite);
  box-shadow: 1px 2px 2px 1px var(--border-src);
  text-align: center;
  padding: 10px;
  border-radius: 5px;
}

h2 {
    background-color: var(--page1);
    text-align: center;
    font-size: 26px;
    box-shadow: 1px 2px 2px  var(--border-src);
}


section {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    gap: 10px;
    padding: 20px;
}

.item {
    max-width: 300px;
    width: 400px;
    border:  solid var(--border-src);
    border-radius: 5px;
    padding: 10px;
    background-color: var(--page2);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

img {
  max-width: 100%;
  height: auto;
}

.add-to-cart {
  background: var(--page2-hover);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  border-radius: 5px;
}

.add-to-cart:hover {
  background: var(--text-hover);
}
</style>