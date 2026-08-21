<template>
  <div>
    <!-- Hero -->
    <PageHero
      title="About Us"
      paragraph="Learn more about our mission, vision, and the people building One Visaya Gaming."
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
            One Visaya Gaming Corporation is an industry-leading
            company that has been in the business of online
            entertainment since 2022. The corporation was founded by
            a group of professionals and veteran investors, and
            operates with strict adherence to the PAGCOR codes of
            conduct.
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
            alt="One Visaya Gaming Corporation office"
            class="w-full max-w-lg rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>

    <WhyWeAreBestSection :show-read-more="false" />
    <!-- LeadersSection removed: bios/photos belong to the previous brand's leadership. Restore once OVG supplies its own team. -->
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
    const isMobile = window.innerWidth < 1024
    tl.from(
      overviewImageEl.value,
      { opacity: 0, ...(isMobile ? { y: 40 } : { x: 60 }), duration: 1, ease: 'power3.out' },
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
