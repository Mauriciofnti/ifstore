<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { useDarkMode } from '../stores/useDarkMode.js'

const { isDarkMode, toggleDarkMode } = useDarkMode()
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header>
    <nav>
      <h1>
        <RouterLink to="/">IFstore
          <span class="logo-title"> Apreço a computadores </span>
        </RouterLink>
      </h1>
      <!-- <div class="search-wrapper">
        <input type="text" class="search" placeholder="Buscar..." />
      </div> -->
      <ul :class="{ 'nav-links': true, 'active': isMenuOpen }">
        <li><RouterLink to="/pcbuild" @click="toggleMenu">Monte seu PC</RouterLink></li>
        <li><RouterLink to="/products/processadores" @click="toggleMenu">Processadores</RouterLink></li>
        <li><RouterLink to="/products/monitores" @click="toggleMenu">Monitores</RouterLink></li>
        <li><RouterLink to="/products/perifericos" @click="toggleMenu">Periféricos</RouterLink></li>
      </ul>
      <ul class="icons">
        <li>
          <RouterLink to="/cart"><span class="mdi mdi-cart"></span></RouterLink>
        </li>
        <li>
            <button
              id="darkModeButton"
              @click="toggleDarkMode"
              aria-label="Alternar modo escuro"
            >
            <i :class="isDarkMode ? 'fa-solid fa-moon' : 'fa-solid fa-sun'"></i>
            </button>
        </li>
        <li>
            <button class="hamburger" @click="toggleMenu">
              <span class="mdi mdi-menu"></span>
            </button>
        </li>
      </ul>
      
    </nav>
  </header>
</template>

<style scoped>
#darkModeButton {
  border: none;
  background-color: var(--page2);
  color: var(--text);

  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s ease, background-color 0.3s, color 0.3s;
}
header nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5vh 5vw;
  border-bottom: 2px solid #27ae6099;
  z-index: 999;
}

header nav h1 {
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  color: #000;
}

header nav h1 a {
  text-decoration: none;
  display: flex;
  align-items: center;
}

header nav h1 .logo-title {
  border-left: 1px solid #27ae6099;
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  margin-left: 10px;
  padding-left: 10px;
  color: #27ae6099;
  width: auto;
  line-height: 1rem;
}

header nav input {
  width: 100%;
  max-width: 400px;
  height: 40px;
  border-radius: 5px;
  font-size: clamp(0.9rem, 2.5vw, 1rem); 
  border: 0;
  background-color: #f1f1f1;
  padding: 5px 2rem 5px 1rem;
}

header nav ul.nav-links {
  display: flex;
  gap: 10px;
}

header nav ul li {
  list-style: none;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
}

header nav .icons {
  display: flex;
  gap: 10px;
}

header nav .icons li {
  color: #27ae60;
  font-size: clamp(1.1rem, 3vw, 1.3rem); 
  background-color: var(--page2);
  border-radius: 5px;
  padding: 6px;
}

header nav .search-wrapper {
  position: relative;
  flex: 1;
  max-width: 400px;
}

header nav .search-wrapper::before {
  content: '󰍉';
  font-family: 'Material Design Icons';
  font-size: 1.2rem;
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

header nav .hamburger {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #27ae60;
  cursor: pointer;
}

/* Media Queries para Design Responsivo */
@media (max-width: 768px) {
  header nav {
    flex-wrap: wrap;
    position: relative;
  }

  header nav .search-wrapper {
    order: 2;
    width: 100%;
    max-width: none;
    margin: 10px 0;
  }

  header nav ul.nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    position: absolute;
    top: 100%;
    left: 0;
    padding: 10px 5vw;
    border-top: 1px solid #27ae6099;
  }

  header nav ul.nav-links.active {
    display: flex;
  }

  header nav ul.nav-links li {
    margin: 10px 0;
  }

  header nav .hamburger {
    display: block;
  }

  header nav .icons {
    order: 1;
  }
}

@media (max-width: 480px) {
  header nav .search-wrapper {
    display: none; /* Esconde a barra de pesquisa em telas muito pequenas */
  }

  header nav h1 {
    flex: 1; /* Logo ocupa espaço disponível */
  }

  header nav .icons li {
    font-size: 1.1rem; /* Reduz tamanho dos ícones */
  }
}
</style>