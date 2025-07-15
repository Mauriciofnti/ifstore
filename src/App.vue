<script setup>
import { RouterView } from 'vue-router'
import { useDarkMode } from './stores/useDarkMode.js'
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

const { isDarkMode } = useDarkMode()
</script>

<template>
  <div :class="{ dark: isDarkMode }">
    <header-component></header-component>        
      <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    <footer-component></footer-component>
  </div>  
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
}
</style>
