<template>
  <section class="relative lg:max-h-[60vh] xl:max-h-[70vh] flex items-center overflow-hidden bg-black py-28 lg:py-36">
    <img
      :src="bgImage"
      alt=""
      :class="['absolute inset-0 w-full h-full object-cover opacity-40', bgPosition ? `object-${bgPosition}` : '']"
    />
    <div
      class="absolute inset-0"
      style="background: linear-gradient(to bottom, #000816 0%, rgba(0, 45, 124, 0.7) 100%)"
    />

    <div :class="['relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full', image ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center' : 'flex justify-center']">
      <div ref="textContent" :class="['flex flex-col', image ? 'order-2 lg:order-1 text-center lg:text-left items-center lg:items-start' : 'text-center items-center']">
        <h1 class="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-6 font-outfit">
          <span :class="['reveal w-fit', image ? 'mx-auto lg:mx-0' : 'mx-auto']">
            <span ref="titleTextEl" class="reveal-text">{{ title }}</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h1>
        <p class="text-white/80 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          {{ paragraph }}
        </p>
        <NuxtLink :to="ctaTo" class="btn-primary px-7 py-3 rounded">
          {{ ctaLabel }}
        </NuxtLink>
      </div>

      <div v-if="image" ref="heroImage" class="order-1 lg:order-2 flex justify-center lg:justify-end">
        <img
          :src="image"
          :alt="imageAlt"
          class="w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl"
          style="filter: drop-shadow(0 20px 40px rgba(0, 100, 255, 0.4)) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5))"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

defineProps<{
  title: string
  paragraph: string
  ctaTo: string
  ctaLabel: string
  image?: string
  imageAlt?: string
  bgImage: string
  bgPosition?: string
}>()

const textContent = ref<HTMLElement>()
const heroImage = ref<HTMLElement>()
const titleTextEl = ref<HTMLElement>()
const titleBarEl = ref<HTMLElement>()

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (titleTextEl.value && titleBarEl.value) {
    tl.to(titleTextEl.value, { clipPath: 'inset(0 0 0 0%)', duration: 0.7 }, 0.1)
    tl.to(titleBarEl.value, { xPercent: -101, duration: 0.7 }, '<')
  }

  if (textContent.value) {
    tl.from(
      textContent.value.querySelectorAll('p, a'),
      { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 },
      '-=0.3',
    )
  }

  if (heroImage.value) {
    gsap.from(heroImage.value, {
      opacity: 0,
      x: 60,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    })
  }
})
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
