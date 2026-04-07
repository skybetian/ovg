<template>
  <section ref="sectionEl" class="bg-white py-24">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      <div ref="headingEl" class="text-center mb-16">
        <p class="text-primary font-medium text-sm mb-2">Our Services</p>
        <h2 class="text-4xl md:text-5xl font-bold text-black font-outfit">
          <span class="reveal">
            <span ref="titleTextEl" class="reveal-text">What We Do</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h2>
      </div>

      <div ref="cardsGridEl" class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <!-- Left cards -->
        <div ref="leftColumnEl" class="flex flex-col gap-8">
          <div class="bg-secondary rounded-xl p-8">
            <img src="/images/pc-icon.png" alt="" class="w-10 h-10 mb-5" />
            <h3 class="text-xl font-bold text-black mb-3">Software Development</h3>
            <p class="text-black/60 text-sm leading-relaxed">
              Custom platform development, API
              design, and cloud-native
              architecture for fintech and
              entertainment verticals.
            </p>
          </div>
          <div class="bg-secondary rounded-xl p-8">
            <img src="/images/plant-icon.png" alt="" class="w-10 h-10 mb-5" />
            <h3 class="text-xl font-bold text-black mb-3">Game Development</h3>
            <p class="text-black/60 text-sm leading-relaxed">
              Interactive entertainment
              software, sweepstakes game
              logic, RNG systems, and
              engaging UI/UX for social
              gaming platforms.
            </p>
          </div>
        </div>

        <!-- Center image -->
        <div ref="centerImageEl" class="flex justify-center">
          <img
            src="/images/thinking.png"
            alt="Team working"
            class="w-full max-w-sm rounded-xl shadow-lg object-cover"
          />
        </div>

        <!-- Right cards -->
        <div ref="rightColumnEl" class="flex flex-col gap-8">
          <div class="bg-secondary rounded-xl p-8">
            <img src="/images/tags-icon.png" alt="" class="w-10 h-10 mb-5" />
            <h3 class="text-xl font-bold text-black mb-3">Fintech &amp; Payments</h3>
            <p class="text-black/60 text-sm leading-relaxed">
              Payment processing integration,
              ACH and card infrastructure, ledger
              systems, and payout automation for
              compliant environments.
            </p>
          </div>
          <div class="bg-secondary rounded-xl p-8">
            <img src="/images/cs-icon.png" alt="" class="w-10 h-10 mb-5" />
            <h3 class="text-xl font-bold text-black mb-3">Compliance-First</h3>
            <p class="text-black/60 text-sm leading-relaxed">
              Geolocation enforcement, KYC/AML
              integration, jurisdiction-aware access
              controls, and regulatory reporting built
              from the ground up.
            </p>
          </div>
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
const cardsGridEl = ref<HTMLElement>()
const leftColumnEl = ref<HTMLElement>()
const rightColumnEl = ref<HTMLElement>()
const centerImageEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined

onMounted(() => {
  if (!sectionEl.value) return

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: sectionEl.value,
      start: '15% 75%',
      toggleActions: 'play none none reverse',
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

  if (leftColumnEl.value) {
    tl.from(
      leftColumnEl.value.querySelectorAll('.bg-secondary'),
      { opacity: 0, x: -120, duration: 0.8, stagger: 0.25 },
      '-=0.3',
    )
  }

  if (rightColumnEl.value) {
    tl.from(
      rightColumnEl.value.querySelectorAll('.bg-secondary'),
      { opacity: 0, x: 120, duration: 0.8, stagger: 0.25 },
      '<',
    )
  }

  if (centerImageEl.value) {
    tl.from(
      centerImageEl.value,
      { opacity: 0, y: 120, duration: 0.9, ease: 'power3.out' },
      '<',
    )
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
  background: var(--color-primary);
  pointer-events: none;
  will-change: transform;
}
</style>
