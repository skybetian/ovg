<template>
  <section ref="sectionEl" class="bg-navy-dark py-20 md:py-28">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      <div class="text-center mb-12">
        <SectionHeading
          eyebrow="Game Providers"
          title="The Studios Behind the Games"
          size-class="text-3xl md:text-4xl lg:text-5xl"
        />
      </div>

      <div ref="gridEl" class="flex flex-wrap items-center justify-center gap-3 md:gap-6 max-w-5xl mx-auto">
        <div
          v-for="provider in providers"
          :key="provider.name"
          class="flex items-center justify-center h-fit w-40 md:w-56 transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(237,24,121,0.45)]"
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
const gridEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined

onMounted(() => {
  if (!sectionEl.value) return

  // Set initial hidden state immediately
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

  if (gridEl.value) {
    tl.to(
      gridEl.value.children,
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15 },
      0,
    )
  }

  trigger = tl.scrollTrigger

  // the logos load lazily and shift this section after mount, which otherwise
  // leaves the trigger measuring a stale start it never reaches
  nextTick(() => ScrollTrigger.refresh())
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  }
})

onBeforeUnmount(() => {
  trigger?.kill()
})

const providers = [
  { name: 'Evolution', logo: '/images/evolution.webp' },
  { name: 'Sexy', logo: '/images/sexy.webp' },
]
</script>

