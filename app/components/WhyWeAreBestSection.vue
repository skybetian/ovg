<template>
  <section ref="sectionEl" class="relative bg-navy-dark py-16 md:py-24 overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
      <div ref="headingEl" class="text-center mb-12 md:mb-16">
        <p class="text-cool-gray font-medium text-sm mb-2">About Us</p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-outfit">
          <span class="reveal">
            <span ref="titleTextEl" class="reveal-text">Why We Are Best</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h2>
      </div>

      <!-- Pillars: only claims the company has actually made -->
      <div ref="pillarsEl" class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
        <div v-for="pillar in pillars" :key="pillar.label" class="pillar rounded-xl p-6 md:p-8">
          <p class="pillar-figure font-outfit">{{ pillar.figure }}</p>
          <p class="text-white font-semibold mb-1">{{ pillar.label }}</p>
          <p class="text-cool-gray text-sm leading-relaxed">{{ pillar.detail }}</p>
        </div>
      </div>

      <!-- Vision & Mission -->
      <div ref="valuesEl" class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <article class="value-card rounded-xl p-7 md:p-9">
          <svg class="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.8" />
          </svg>
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3 font-outfit">Our Vision</h3>
          <p class="text-white/80 text-base leading-relaxed">
            To be the platform operators build on — trusted for its
            uptime, its game library, and the pace it moves at.
          </p>
        </article>

        <article class="value-card rounded-xl p-7 md:p-9">
          <svg class="value-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1.4" />
          </svg>
          <h3 class="text-xl md:text-2xl font-bold text-white mb-3 font-outfit">Our Mission</h3>
          <p class="text-white/80 text-base leading-relaxed">
            To deliver secure, scalable online entertainment technology,
            backed by a team of seasoned professionals and veteran
            investors. We operate with integrity, transparency, and
            strict adherence to the PAGCOR codes of conduct in every
            product we ship.
          </p>
        </article>
      </div>

      <div v-if="showReadMore" class="flex justify-center mt-12">
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

const pillars = [
  {
    figure: '2022',
    label: 'In the business since',
    detail: 'Building online entertainment, year on year.',
  },
  {
    figure: 'PAGCOR',
    label: 'Codes of conduct',
    detail: 'Strictly observed across everything we operate.',
  },
  {
    figure: 'Veteran',
    label: 'Founders and investors',
    detail: 'A group of professionals and veteran investors.',
  },
]

const sectionEl = ref<HTMLElement>()
const headingEl = ref<HTMLElement>()
const titleTextEl = ref<HTMLElement>()
const titleBarEl = ref<HTMLElement>()
const pillarsEl = ref<HTMLElement>()
const valuesEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined

onMounted(() => {
  if (!sectionEl.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (titleTextEl.value) titleTextEl.value.style.clipPath = 'inset(0 0 0 0%)'
    if (titleBarEl.value) titleBarEl.value.style.display = 'none'
    return
  }

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
    tl.to(titleBarEl.value, { xPercent: -101, duration: 0.7 }, '<')
  }

  if (headingEl.value) {
    tl.from(headingEl.value.querySelectorAll('p'), { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
  }

  if (pillarsEl.value) {
    tl.from(
      pillarsEl.value.children,
      { opacity: 0, y: 36, duration: 0.7, stagger: 0.12 },
      '-=0.25',
    )
  }

  if (valuesEl.value) {
    tl.from(
      valuesEl.value.children,
      { opacity: 0, y: 36, duration: 0.7, stagger: 0.14 },
      '-=0.35',
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
  background: linear-gradient(90deg, var(--color-primary), var(--color-coral));
  pointer-events: none;
  will-change: transform;
}

.pillar {
  background: var(--color-navy);
  border: 1px solid rgba(237, 24, 121, 0.18);
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.pillar:hover {
  border-color: rgba(237, 24, 121, 0.45);
  transform: translateY(-3px);
}

.pillar-figure {
  font-size: clamp(1.75rem, 1.2rem + 2vw, 2.75rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, var(--color-primary), var(--color-coral));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.value-card {
  background:
    linear-gradient(135deg, rgba(180, 12, 139, 0.14), transparent 55%),
    var(--color-navy);
  border: 1px solid rgba(237, 24, 121, 0.18);
  transition: border-color 0.3s ease;
}
.value-card:hover {
  border-color: rgba(237, 24, 121, 0.4);
}

.value-icon {
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 1.25rem;
  color: var(--color-primary);
}
</style>
