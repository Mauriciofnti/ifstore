<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
</script>

<template>
  <header-component></header-component>        
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  <footer-component></footer-component>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilos para o tema escuro */
:where(.dark) {
  color: #f8c6c6;
}
</style>
