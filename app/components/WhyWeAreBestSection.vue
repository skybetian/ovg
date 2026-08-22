<template>
  <section ref="sectionEl" class="relative bg-navy-dark py-16 md:py-24 overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
      <div class="text-center mb-12 md:mb-16">
        <SectionHeading eyebrow="About Us" title="Why We Are Best" />
      </div>

      <div ref="blocksEl" class="space-y-14 md:space-y-20">
        <!-- image and copy trade sides row by row -->
        <div
          v-for="(block, i) in blocks"
          :key="block.title"
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          <div :class="i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'">
            <svg
              class="value-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              v-html="block.icon"
            />
            <h3 class="text-2xl md:text-3xl font-bold text-white mb-4 font-outfit">
              {{ block.title }}
            </h3>
            <p class="text-white/80 text-base leading-relaxed">
              {{ block.body }}
            </p>
          </div>

          <div :class="i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'">
            <img
              :src="block.image"
              :alt="block.alt"
              :width="block.w"
              :height="block.h"
              loading="lazy"
              decoding="async"
              class="value-image w-full aspect-[4/3] object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div v-if="showReadMore" class="flex justify-center mt-14">
        <NuxtLink to="/about" class="btn-light px-7 py-3 rounded">
          Read More
          <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

withDefaults(defineProps<{ showReadMore?: boolean }>(), {
  showReadMore: true,
})

const blocks = [
  {
    title: 'Our Vision',
    body: 'To be the platform operators keep choosing, because it stays up and keeps getting better.',
    icon: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="2.8" />',
    image: '/images/who-we-are-showcase.webp',
    alt: 'The platform running on desktop and mobile with live casino, slot and table games',
    w: 1200,
    h: 800,
  },
  {
    title: 'Our Mission',
    body: 'To build online entertainment technology that is safe to run and easy to grow. Our team has been in this industry for years, and we hold every product we ship to the PAGCOR codes of conduct.',
    icon: '<circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" />',
    image: '/images/who-we-are-parallax.webp',
    alt: 'Casino chips, playing cards and dice on a table',
    w: 1519,
    h: 3295,
  },
]

const sectionEl = ref<HTMLElement>()
const blocksEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined

onMounted(() => {
  if (!sectionEl.value || !blocksEl.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: sectionEl.value,
      start: '15% 75%',
      toggleActions: 'play none none none',
    },
  })

  // each row converges from the side its image sits on
  Array.from(blocksEl.value.children).forEach((row, i) => {
    const [copy, art] = Array.from(row.children)
    const dir = i % 2 === 0 ? 1 : -1

    tl.from(copy, { opacity: 0, x: -50 * dir, duration: 0.7 }, i * 0.18)
    tl.from(art, { opacity: 0, x: 50 * dir, scale: 0.96, duration: 0.7 }, i * 0.18)
  })

  trigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  trigger?.kill()
})
</script>

<style scoped>
.value-icon {
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 1.25rem;
  color: var(--color-primary);
}

.value-image {
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow: 0 24px 50px -24px rgba(0, 0, 0, 0.9);
}
</style>
