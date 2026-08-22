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
            <h3 class="text-2xl md:text-3xl font-bold text-white mb-4 font-outfit">
              {{ block.title }}
            </h3>
            <p class="text-white/80 text-base leading-relaxed">
              {{ block.body }}
            </p>
          </div>

          <div :class="i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'">
            <div class="media">
              <HalftoneImage
                :src="block.image"
                :alt="block.alt"
                :dot-spacing="5"
                :max-dot-size="4.1"
                :threshold="0.08"
                :contrast="1.2"
                dot-color="#ffffff"
                background-color="#2f0d44"
                :square="true"
              />
            </div>
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
    image: '/images/vision-eye.webp',
    alt: 'Close-up of a human eye, rendered as a halftone print',
  },
  {
    title: 'Our Mission',
    body: 'To build online entertainment technology that is safe to run and easy to grow. Our team has been in this industry for years, and we hold every product we ship to the PAGCOR codes of conduct.',
    image: '/images/mission-rocket.webp',
    alt: 'A rocket on its launch pad, rendered as a halftone print',
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
.media {
  position: relative;
  overflow: hidden;
  border-radius: 1.35rem;
  box-shadow: 0 24px 50px -26px rgba(0, 0, 0, 0.9);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.media:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 60px -26px rgba(0, 0, 0, 0.95);
}
</style>
