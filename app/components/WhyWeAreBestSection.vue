<template>
  <section ref="sectionEl" class="bg-navy-dark py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      <div ref="headingEl" class="text-center mb-12 md:mb-16">
        <p class="text-cool-gray font-medium text-sm mb-2">About Us</p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-outfit">
          <span class="reveal">
            <span ref="titleTextEl" class="reveal-text">Why we are best</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <!-- Collage images -->
        <div ref="collageEl" class="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 aspect-[5/5]">
          <img
            ref="collageTopLeftEl"
            src="/images/best-1.webp"
            alt="Team meeting"
            class="w-full h-full object-cover rounded-xl"
          />
          <img
            ref="collageRightEl"
            src="/images/best-2.webp"
            alt="Office collaboration"
            class="row-span-2 w-full h-full object-cover rounded-xl"
          />
          <img
            ref="collageBottomLeftEl"
            src="/images/best-3.webp"
            alt="Data chart"
            class="w-full h-full object-cover rounded-xl"
          />
        </div>

        <!-- Vision & Mission -->
        <div ref="valuesColEl">
          <div class="mb-10">
            <div class="flex items-start gap-4 mb-3">
              <img src="/images/eye-icon.webp" alt="" class="w-10 h-10 md:w-12 md:h-12 mt-1 flex-shrink-0" />
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Our Vision</h3>
                <p class="text-white/80 text-base leading-relaxed">
                  To lead the future of fintech and interactive
                  entertainment by building secure, scalable, and globally
                  trusted technology platforms.
                </p>
              </div>
            </div>
          </div>

          <div class="mb-10">
            <div class="flex items-start gap-4 mb-3">
              <img src="/images/target-icon.webp" alt="" class="w-10 h-10 md:w-12 md:h-12 mt-1 flex-shrink-0" />
              <div>
                <h3 class="text-xl md:text-2xl font-bold text-white mb-3">Our Mission</h3>
                <p class="text-white/80 text-base leading-relaxed">
                  To build secure, compliant, and scalable technology
                  solutions for the interactive entertainment and fintech
                  sectors. We are committed to operating with integrity,
                  transparency, and a compliance-first approach in every
                  product we develop.
                </p>
              </div>
            </div>
          </div>

          <NuxtLink
            v-if="showReadMore"
            to="/about"
            class="btn-primary px-7 py-3 rounded"
          >
            Read More
            <span>&rarr;</span>
          </NuxtLink>
        </div>
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

const sectionEl = ref<HTMLElement>()
const headingEl = ref<HTMLElement>()
const titleTextEl = ref<HTMLElement>()
const titleBarEl = ref<HTMLElement>()
const collageEl = ref<HTMLElement>()
const collageTopLeftEl = ref<HTMLElement>()
const collageRightEl = ref<HTMLElement>()
const collageBottomLeftEl = ref<HTMLElement>()
const valuesColEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined

onMounted(() => {
  if (!sectionEl.value) return

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: sectionEl.value,
      start: '15% 75%',
      toggleActions: 'play none none none',
    },
  })

  if (titleTextEl.value && titleBarEl.value) {
    tl.to(titleTextEl.value, { clipPath: 'inset(0 0 0 0%)', duration: 0.7 }, 0.1)
    tl.to(titleBarEl.value, { xPercent: -100, duration: 0.7 }, '<')
  }

  if (headingEl.value) {
    tl.from(
      headingEl.value.querySelectorAll('p'),
      { opacity: 0, y: 20, duration: 0.6 },
      '-=0.4',
    )
  }

  if (collageTopLeftEl.value) {
    tl.from(
      collageTopLeftEl.value,
      { opacity: 0, x: -120, duration: 0.9 },
      '-=0.3',
    )
  }

  if (collageRightEl.value) {
    tl.from(
      collageRightEl.value,
      { opacity: 0, y: -120, duration: 0.9 },
      '<',
    )
  }

  if (collageBottomLeftEl.value) {
    tl.from(
      collageBottomLeftEl.value,
      { opacity: 0, y: 120, duration: 0.9 },
      '<',
    )
  }

  if (valuesColEl.value) {
    tl.from(
      valuesColEl.value.querySelectorAll('.mb-10'),
      { opacity: 0, x: 80, duration: 0.8, stagger: 0.15 },
      '<',
    )

    const cta = valuesColEl.value.querySelector('a')
    if (cta) {
      tl.from(
        cta,
        { opacity: 0, y: 30, duration: 0.6 },
        '-=0.3',
      )
    }
  }

  trigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  trigger?.kill()
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
