<template>
  <section ref="sectionEl" class="bg-navy-dark py-20 md:py-28">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      <div ref="headingEl" class="text-center mb-12">
        <p class="text-cool-gray text-sm md:text-base font-medium mb-3">Game Providers</p>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-outfit">
          <span class="reveal">
            <span ref="titleTextEl" class="reveal-text">Our Gaming Partners</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h2>
      </div>

      <div ref="gridEl" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6 max-w-5xl mx-auto">
        <div
          v-for="provider in providers"
          :key="provider.name"
          class="flex items-center justify-center h-24 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(142,179,239,0.4)]"
        >
          <img
            :src="provider.logo"
            :alt="provider.name"
            class="w-full h-auto object-contain transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionEl = ref<HTMLElement>()
const headingEl = ref<HTMLElement>()
const titleTextEl = ref<HTMLElement>()
const titleBarEl = ref<HTMLElement>()
const gridEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined

onMounted(() => {
  if (!sectionEl.value) return

  // Set initial hidden state immediately
  if (headingEl.value) {
    gsap.set(headingEl.value.querySelectorAll('p'), { autoAlpha: 0, y: 20 })
  }
  if (gridEl.value) {
    gsap.set(gridEl.value.children, { autoAlpha: 0, y: 60 })
  }

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: sectionEl.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  if (titleTextEl.value && titleBarEl.value) {
    tl.to(titleTextEl.value, { clipPath: 'inset(0 0 0 0%)', duration: 0.7 }, 0.1)
    tl.to(titleBarEl.value, { xPercent: -100, duration: 0.7 }, '<')
  }

  if (headingEl.value) {
    tl.to(
      headingEl.value.querySelectorAll('p'),
      { autoAlpha: 1, y: 0, duration: 0.6 },
      '-=0.4',
    )
  }

  if (gridEl.value) {
    tl.to(
      gridEl.value.children,
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 },
      '-=0.3',
    )
  }

  trigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  trigger?.kill()
})

const providers = [
  { name: 'Cewin',           logo: '/images/cewin.webp' },
  { name: 'Evolution',       logo: '/images/evolution.webp' },
  { name: 'No Limit City',   logo: '/images/no-limit-city.webp' },
  { name: 'NetEnt',          logo: '/images/netent.webp' },
  { name: 'Red Tiger',       logo: '/images/red-tiger.webp' },
  { name: 'First Person',    logo: '/images/first-person.webp' },
  { name: 'Big Time Gaming', logo: '/images/big-time-gaming.webp' },
  { name: 'Altenar',         logo: '/images/altenar.webp' },
]
</script>

<style scoped>
.reveal {
  position: relative;
  display: inline-block;
  overflow: hidden;
}
.reveal-text {
  display: inline-block;
  clip-path: inset(0 0 0 100%);
}
.reveal-bar {
  position: absolute;
  inset: 0;
  background: #ffffff;
  pointer-events: none;
  will-change: transform;
}
</style>
