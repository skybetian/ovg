<template>
  <div>
    <!-- Hero image -->
    <section class="bg-navy pt-28 pb-12 md:pt-32 md:pb-16">
      <div ref="heroEl" class="max-w-6xl mx-auto px-6 md:px-16">
        <div class="rounded-2xl overflow-hidden shadow-lg">
          <img :src="product.hero" :alt="product.name" class="w-full h-auto object-cover" />
        </div>
      </div>
    </section>

    <!-- Body -->
    <section class="bg-navy pb-20 md:pb-28">
      <div ref="bodyEl" class="max-w-6xl mx-auto px-6 md:px-16">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-outfit mb-6">
          {{ product.name }}
        </h1>

        <p class="text-white/80 text-base md:text-lg leading-relaxed mb-6">
          {{ product.intro }}
        </p>

        <p class="text-white/80 font-medium mb-3">Key Features:</p>
        <ul class="list-disc pl-6 space-y-2 text-white/80 mb-6">
          <li v-for="feature in product.keyFeatures" :key="feature">
            {{ feature }}
          </li>
        </ul>

        <p class="text-white/80 mb-6">
          Visit
          <a
            :href="product.websiteHref"
            target="_blank"
            rel="noopener"
            class="underline underline-offset-4 hover:text-primary"
          >
            {{ product.websiteLabel }}
          </a>
          to learn more.
        </p>

        <p class="text-white/80 mb-10">
          Follow {{ product.name }}:
          <template v-for="(social, idx) in product.socials" :key="social.label">
            <a
              :href="social.href"
              target="_blank"
              rel="noopener"
              class="underline underline-offset-4 hover:text-primary"
            >
              {{ social.label }}
            </a>
            <span v-if="idx < product.socials.length - 1"> | </span>
          </template>
        </p>

        <p class="text-sky-blue text-sm leading-relaxed">
          <span class="font-semibold">Legal Note:</span> {{ product.legalNote }}
        </p>
      </div>
    </section>

    <!-- Gallery -->
    <section ref="galleryEl" class="bg-navy py-20 md:py-28">
      <div class="max-w-6xl mx-auto px-6 md:px-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-outfit mb-12">
          Gallery
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(image, idx) in product.gallery"
            :key="idx"
            class="gallery-item rounded-xl overflow-hidden aspect-[16/10] shadow-md cursor-pointer"
            @click="openLightbox(idx)"
          >
            <img :src="image" :alt="`${product.name} screenshot ${idx + 1}`" class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          @click.self="closeLightbox"
        >
          <!-- Close -->
          <button
            class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            @click="closeLightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Prev -->
          <button
            class="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors"
            @click="prevImage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Image -->
          <img
            :src="product.gallery[lightboxIdx]"
            :alt="`${product.name} screenshot ${lightboxIdx + 1}`"
            class="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
          />

          <!-- Next -->
          <button
            class="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors"
            @click="nextImage"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Counter -->
          <span class="absolute bottom-6 text-white/60 text-sm">
            {{ lightboxIdx + 1 }} / {{ product.gallery.length }}
          </span>
        </div>
      </Transition>
    </Teleport>

    <GameProvidersSection />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { findProduct } from '~/data/products'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const slug = String(route.params.slug)

const product = findProduct(slug)
if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}

useHead({
  title: `${product.name} — SkyTech International`,
})

const heroEl = ref<HTMLElement>()
const bodyEl = ref<HTMLElement>()
const galleryEl = ref<HTMLElement>()

// Lightbox
const lightboxOpen = ref(false)
const lightboxIdx = ref(0)

function openLightbox(idx: number) {
  lightboxIdx.value = idx
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function nextImage() {
  lightboxIdx.value = (lightboxIdx.value + 1) % product.gallery.length
}

function prevImage() {
  lightboxIdx.value = (lightboxIdx.value - 1 + product.gallery.length) % product.gallery.length
}

function onKeydown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') nextImage()
  else if (e.key === 'ArrowLeft') prevImage()
}

let triggers: ScrollTrigger[] = []

onMounted(() => {
  window.addEventListener('keydown', onKeydown)

  // Hero — fade & scale up
  if (heroEl.value) {
    gsap.from(heroEl.value, {
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 1,
      ease: 'power3.out',
    })
  }

  // Body — stagger children
  if (bodyEl.value) {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: bodyEl.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
    tl.from(bodyEl.value.children, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      stagger: 0.12,
    })
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
  }

  // Gallery — stagger items
  if (galleryEl.value) {
    const items = galleryEl.value.querySelectorAll('.gallery-item')
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: galleryEl.value,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
    tl.from(items, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.1,
    })
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  triggers.forEach((t) => t.kill())
  triggers = []
})
</script>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
