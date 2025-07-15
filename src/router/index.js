import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Products from '../views/ProductsCategory.vue'
import ProductDetails from '../views/ProductDetails.vue'
import pc_build from '../views/pc_build.vue'
import PagamentoView from '@/views/PagamentoView.vue'

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
      path: '/pcbuild',
      name: 'pcbuild',
      component: pc_build
    },
    {
      path: '/pay',
      name: 'pay',
      component: PagamentoView
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
