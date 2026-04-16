<template>
  <section class="relative flex items-center overflow-hidden bg-black pt-16 pb-28 lg:py-0 lg:h-[calc(100dvh-80px)]">
    <video
      autoplay
      loop
      muted
      playsinline
      class="absolute inset-0 w-full h-full object-cover opacity-40"
    >
      <source src="/videos/hero-bg.mp4" type="video/mp4" />
    </video>

    <!-- <div class="absolute inset-0" style="background: radial-gradient(circle, rgba(0, 45, 124, 0.7) 0%, rgba(0, 8, 22, 1) 42%)" /> -->

    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div ref="textContent" class="order-2 lg:order-1 text-center lg:text-left">
        <h1 class="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-6 font-outfit">
          <span
            v-for="(line, i) in headlineLines"
            :key="i"
            class="reveal w-fit mx-auto lg:mx-0"
          >
            <span
              :ref="(el) => setLineRef(el as HTMLElement | null, i, 'text')"
              class="reveal-text"
            >{{ line }}</span>
            <span
              :ref="(el) => setLineRef(el as HTMLElement | null, i, 'bar')"
              class="reveal-bar"
            />
          </span>
        </h1>
        <p class="text-white/60 text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
          Innovating at the intersection of finance and digital
          experiences, we deliver seamless fintech solutions and
          engaging interactive entertainment that empower users
          worldwide.
        </p>
        <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
          <NuxtLink to="/contacts" class="btn-primary px-7 py-3 rounded">
            Get Started
          </NuxtLink>
          <NuxtLink to="/products" class="btn-outline-light px-7 py-3 rounded">
            See Our Products
          </NuxtLink>
        </div>
      </div>

      <div ref="phoneImage" class="order-1 lg:order-2 flex justify-center lg:justify-end">
        <img
          src="/images/phone.webp"
          alt="Fintech mobile app"
          class="w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl drop-shadow-2xl"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const headlineLines = [
  'Building the Future of',
  'Fintech & Interactive',
  'Entertainment',
]

interface LineRefs {
  text?: HTMLElement
  bar?: HTMLElement
}

const textContent = ref<HTMLElement>()
const phoneImage = ref<HTMLElement>()
const lineRefs = new Map<number, LineRefs>()

function setLineRef(el: HTMLElement | null, idx: number, role: 'text' | 'bar') {
  if (!el) {
    const existing = lineRefs.get(idx)
    if (existing) {
      delete existing[role]
      if (!existing.text && !existing.bar) lineRefs.delete(idx)
    }
    return
  }
  const existing = lineRefs.get(idx) ?? {}
  existing[role] = el
  lineRefs.set(idx, existing)
}

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  for (const idx of headlineLines.keys()) {
    const item = lineRefs.get(idx)
    if (!item?.text || !item?.bar) continue

    tl.to(
      item.text,
      { clipPath: 'inset(0 0 0 0%)', duration: 0.7 },
      idx === 0 ? 0.1 : '-=0.55',
    )
    tl.to(
      item.bar,
      { xPercent: -101, duration: 0.7 },
      '<',
    )
  }

  if (textContent.value) {
    tl.from(
      textContent.value.querySelectorAll('p, .flex'),
      { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 },
      '-=0.3',
    )
  }

  if (phoneImage.value) {
    gsap.from(phoneImage.value, {
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
  display: block;
  overflow: hidden;
}
.reveal-text {
  display: block;
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
