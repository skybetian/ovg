<template>
  <div>
    <!-- Hero -->
    <PageHero
      title="About Us"
      paragraph="Learn more about our mission, vision, and the team driving innovation in fintech and interactive technology."
      cta-to="#company-overview"
      cta-label="Discover More"
      image="/images/globe.webp"
      image-alt="Globe representing global reach"
      bg-image="/images/about-bg.webp"
    />

    <!-- Company Overview -->
    <section id="company-overview" ref="overviewEl" class="bg-navy py-24">
      <div class="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref="overviewTextEl">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-8 font-outfit">
            <span class="reveal">
              <span ref="overviewTitleTextEl" class="reveal-text">Company Overview</span>
              <span ref="overviewTitleBarEl" class="reveal-bar" />
            </span>
          </h2>
          <p class="text-white/70 text-base leading-relaxed mb-6">
            SkyTech International is a Nevada-based technology
            company focused on developing software products in
            fintech, payment processing, and interactive
            entertainment. Founded in 2025, SkyTech was established
            to leverage software and assets developed for the U.S.
            market. Following a period of focused software
            development and successful deployment of previous
            platform versions internationally, the company launched
            operations in the United States and continues to grow its
            team and expand its product offerings for the U.S. market.
          </p>
          <p class="text-white/70 text-base leading-relaxed">
            Our team combines deep expertise in software
            engineering, financial technology, and regulatory
            compliance to deliver secure, scalable solutions.
          </p>
        </div>

        <div ref="overviewImageEl" class="flex justify-center lg:justify-end">
          <img
            src="/images/building.webp"
            alt="SkyTech International building"
            class="w-full max-w-lg rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>

    <WhyWeAreBestSection :show-read-more="false" />
    <LeadersSection />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const overviewEl = ref<HTMLElement>()
const overviewTitleTextEl = ref<HTMLElement>()
const overviewTitleBarEl = ref<HTMLElement>()
const overviewTextEl = ref<HTMLElement>()
const overviewImageEl = ref<HTMLElement>()

let overviewTrigger: ScrollTrigger | undefined

onMounted(() => {
  if (!overviewEl.value) return

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: overviewEl.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  })

  if (overviewTitleTextEl.value && overviewTitleBarEl.value) {
    tl.to(overviewTitleTextEl.value, { clipPath: 'inset(0 0 0 0%)', duration: 0.7 }, 0.1)
    tl.to(overviewTitleBarEl.value, { xPercent: -101, duration: 0.7 }, '<')
  }

  if (overviewTextEl.value) {
    tl.from(
      overviewTextEl.value.querySelectorAll('p'),
      { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 },
      '-=0.3',
    )
  }

  if (overviewImageEl.value) {
    tl.from(
      overviewImageEl.value,
      { opacity: 0, x: 60, duration: 1, ease: 'power3.out' },
      '<',
    )
  }

  overviewTrigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  overviewTrigger?.kill()
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
