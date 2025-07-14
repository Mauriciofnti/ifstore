import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Products from '../views/Products.vue'
import ProductDetails from '../views/ProductDetails.vue'
import pc_build from '../views/pc_build.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cart',
      name: 'cart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/termos',
      name: 'termos',
      component: () => import('../views/TermosView.vue'),
    },
    {
      path: '/equipe',
      name: 'equipe',
      component: () => import('../views/EquipeView.vue'),
    },
    {
      path: '/envio',
      name: 'envio',
      component: () => import('../views/EnvioView.vue'),
    },
    {
      path: '/devolucoes',
      name: 'devolucoes',
      component: () => import('../views/DevolucoesView.vue'),
    },
    {
      path: '/pcbuild',
      name: 'pcbuild',
      component: pc_build
    },
    {
      path: '/product/:id',
      name: 'ProductDetails',
      component: ProductDetails,
      props: true
    },
    {
      path: '/products/:category',
      name: 'Products',
      component: Products,
      props: true // Passa o parâmetro :category como prop
    },
  ],
})

export default router
