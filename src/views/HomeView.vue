<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCarousel } from '../stores/useCarousel'
import { useProductStore } from '../stores/produtos'

const productStore = useProductStore()

// Carrossel de banners
const bannerImages = ref([
  { src: '/images/banner1.jpg', alt: 'Banner 1', link: '/products/GPUs' },
  { src: '/images/banner2.jpg', alt: 'Banner 2', link: '/products/Notebooks' },
  { src: '/images/banner3.jpg', alt: 'Banner 3', link: '/products/Processadores' },
])

const { currentIndex: bannerIndex, track: bannerTrack, prevBtn: bannerPrevBtn, nextBtn: bannerNextBtn, productImages: bannerProductImages, goToSlide: bannerGoToSlide } = useCarousel(bannerImages)

// Carrossel de promoções
const promoImages = computed(() => {
  // Embaralhar produtos e selecionar até 5 itens aleatórios
  const shuffledProducts = [...productStore.products].sort(() => Math.random() - 0.5)
  return shuffledProducts.slice(0, 5).map(product => ({
    src: product.image[0],
    alt: product.name,
    link: `/product/${product.id}`,
    price: product.price,    
  }))
})

const { currentIndex: promoIndex, track: promoTrack, prevBtn: promoPrevBtn, nextBtn: promoNextBtn, productImages: promoProductImages, goToSlide: promoGoToSlide } = useCarousel(promoImages)
</script>

<template>
  <main>
    <section id="banner" class="banner-container">
      <div class="carousel-container">
        <div class="carousel-track" ref="bannerTrack">
          <div class="carousel-item" v-for="(image, index) in bannerProductImages" :key="index">
            <RouterLink :to="image.link || '#'">
              <img class="carousel-image" :src="image.src" :alt="image.alt" />
            </RouterLink>
          </div>
        </div>
        <button class="carousel-btn prev" ref="bannerPrevBtn" aria-label="Slide anterior do banner">❮</button>
        <button class="carousel-btn next" ref="bannerNextBtn" aria-label="Próximo slide do banner">❯</button>
        <div class="carousel-dots">
          <span
            class="dot"
            v-for="(image, index) in bannerProductImages"
            :key="index"
            :class="{ active: bannerIndex === index }"
            @click="bannerGoToSlide(index)"
            :aria-label="`Ir para slide ${index + 1} do banner`"
          ></span>
        </div>
      </div>
    </section>
    <section id="home-page-produtos">
      <div>
        <RouterLink to="/products/Processadores">
          <img src="/images/processadores.webp" alt="Processadores" width="250">
          <p>Processadores</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/GPUs">
          <img src="/images/gpu.webp" alt="GPUs" width="250">
          <p>GPUs</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Memorias-RAM">
          <img src="/images/memorias.webp" alt="Memórias RAM" width="250">
          <p>Memórias</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/SSDs">
          <img src="/images/ssds.webp" alt="Armazenamento" width="250">
          <p>Armazenamento</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Perifericos">
          <img src="/images/CategoriassitePerifericos.png" alt="Periféricos">
          <p>Periféricos</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Monitores">
          <img src="/images/CategoriassiteMonitores.png" alt="Monitores">
          <p>Monitores</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Gabinetes">
          <img src="/images/CategoriassiteComputadores.png" alt="Gabinetes">
          <p>Gabinetes</p>
        </RouterLink>
      </div>
      <div>
        <RouterLink to="/products/Notebooks">
          <img src="/images/laptops.png" alt="Notebooks">
          <p>Notebooks</p>
        </RouterLink>
      </div>
    </section>
    <section id="promocoes" class="promocoes-container">
      <h2>Promoções</h2>
      <div class="carousel-container">
        <div class="carousel-track" ref="promoTrack">
          <div class="carousel-item" v-for="(image, index) in promoProductImages" :key="index">
            <RouterLink :to="image.link || '#'">
              <img class="carousel-image" :src="image.src" :alt="image.alt" />
              <p class="promo-title">{{ image.alt }}</p>
              <h3 class="promo-price">R${{ image.price }}</h3>
            </RouterLink>
          </div>
        </div>
        <button class="carousel-btn prev" ref="promoPrevBtn" aria-label="Slide anterior das promoções">❮</button>
        <button class="carousel-btn next" ref="promoNextBtn" aria-label="Próximo slide das promoções">❯</button>
        <div class="carousel-dots">
          <span
            class="dot"
            v-for="(image, index) in promoProductImages"
            :key="index"
            :class="{ active: promoIndex === index }"
            @click="promoGoToSlide(index)"
            :aria-label="`Ir para slide ${index + 1} das promoções`"
          ></span>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
#banner.banner-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

#promocoes.promocoes-container {
  padding: 20px 70px;
  max-width: 70%;
  margin: 2rem auto;
  position: relative;
  overflow: hidden;
  background-color: var(--page2);
  border-radius: 10px;
  box-shadow: 0 0 10px 1px var(--border-src) inset;
}

#promocoes h2 {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text);
}
.promo-price {
  margin-top: 0.25rem;
  font-size: 1.9rem;
  color: var(--text1);
  font-weight: 600;
}
.carousel-container {
  position: relative;
  overflow: hidden;
  
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  
}

.carousel-item {
  min-width: 100%;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.carousel-item a {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-image {
  max-width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  transform: scale(100%);
  transition: transform 1s ease;
  margin-bottom: 25px;
  border-radius: 5px;
  box-shadow: 0px 0px 15px var(--border-src);
}

.promo-title {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: var(--text);
  font-weight: 500;
}

@media (hover: hover) {
  .carousel-image:hover {
    transform: scale(110%);
  }
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  z-index: 10;
}

.carousel-btn.prev {
  left: 10px;
}

.carousel-btn.next {
  right: 10px;
}

.carousel-dots {
  text-align: center;
  padding: 10px 0;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: var(--text);
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active {
  background: var(--text-hover);
}

#home-page-produtos, #center-produtos {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin: 2rem 0;
}

#home-page-produtos div, #center-produtos div {
  text-align: center;
  width: 250px;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2%;
  margin: 5px;
  box-shadow: 0 0 10px 1px var(--border-src) inset;
  border-radius: 10px;
  background: radial-gradient(circle, var(--page2) 10px, var(--text));
  transition: all 1.5s ease;
  color: var(--text);

}

#home-page-produtos div a, #center-produtos div a {
  text-decoration: none;
  & img {
    transition: transform .5s ease;
  }
}

#home-page-produtos div:hover, #center-produtos div:hover {
  background: radial-gradient(circle, var(--text-hover) 10px, var(--page2-hover));
  & p {
    color: #fff;
  }
}

#home-page-produtos div a img:hover, #center-produtos div a img:hover {
  transform: scale(105%);  
}


#promocoes .carousel-image {
  max-width: 50%;
}

@media (max-width: 768px) {
  #banner {
    height: 30vh;
  }

  .carousel-image {
    height: 200px;
    object-position: left;
  }

  #promocoes .carousel-image {
    height: 150px;
  }

  #promocoes .promo-title {
    font-size: 0.9rem;
  }

  #promocoes .carousel-image {
    max-width: 100%;
  }
  .carousel-btn {
    font-size: 14px;
    padding: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 480px) {
  #banner {
    height: 25vh;
  }

  .carousel-image {
    height: 150px;
  }

  #promocoes .carousel-image {
    height: 120px;
  }

  #promocoes .promo-title {
    font-size: 0.8rem;
  }

  .carousel-btn {
    font-size: 12px;
    padding: 6px;
  }

  #home-page-produtos div, #center-produtos div {
    margin: 10px;
    padding: 1.5%;
  }

  #home-page-produtos img, #center-produtos img {
    width: 150px;
  }
}
</style>