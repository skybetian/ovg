<template>
  <section ref="sectionEl" class="relative bg-navy py-16 md:py-24 overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
      <div ref="headingEl" class="text-center mb-12 md:mb-16">
        <p class="text-cool-gray font-medium text-sm mb-2">Testimonial</p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-outfit">
          <span class="reveal">
            <span ref="titleTextEl" class="reveal-text">What Our Clients Say</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h2>
      </div>

      <div ref="gridEl" class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
        <figure
          v-for="testimonial in testimonials"
          :key="testimonial.role"
          class="quote-card rounded-xl p-7 md:p-9 flex flex-col"
        >
          <svg class="quote-mark" viewBox="0 0 32 24" fill="currentColor" aria-hidden="true">
            <path d="M0 24V13.6C0 6.6 3.9 1.6 11.4 0l1.6 3.9C8.6 5.4 6.4 8 6.3 11.4H12V24H0Zm19 0V13.6C19 6.6 22.9 1.6 30.4 0L32 3.9c-4.4 1.5-6.6 4.1-6.7 7.5H31V24H19Z" />
          </svg>

          <blockquote class="text-white/85 text-base leading-relaxed mb-7 flex-1">
            {{ testimonial.text }}
          </blockquote>

          <figcaption class="pt-5 border-t border-white/10">
            <div class="flex gap-1 mb-2" role="img" aria-label="Rated 5 out of 5">
              <svg
                v-for="star in 5"
                :key="star"
                class="star"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
              </svg>
            </div>
            <p class="font-semibold text-white text-sm">{{ testimonial.role }}</p>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ponytail: placeholder copy — no real names or companies until the client supplies quotes
const testimonials = [
  {
    text: 'The platform handled our launch traffic without a hiccup. Onboarding was quick, and the back office gave our team everything it needed on day one.',
    role: 'Head of Operations, Online Gaming Operator',
  },
  {
    text: 'Their team understands both technology and user experience. The interactive solutions they built significantly improved user engagement and retention.',
    role: 'Product Director, Casino Platform',
  },
  {
    text: 'Working with the team was seamless from start to finish. Their aggregation layer and reporting gave us the confidence to scale.',
    role: 'CTO, Gaming Technology Provider',
  },
  {
    text: 'The level of security and attention to detail in their gaming software is unmatched. They take compliance as seriously as we do.',
    role: 'CEO, Online Entertainment Company',
  },
]

const sectionEl = ref<HTMLElement>()
const headingEl = ref<HTMLElement>()
const titleTextEl = ref<HTMLElement>()
const titleBarEl = ref<HTMLElement>()
const gridEl = ref<HTMLElement>()

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
      start: 'top 75%',
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

  if (gridEl.value) {
    tl.from(
      gridEl.value.children,
      { opacity: 0, y: 44, duration: 0.75, stagger: 0.12 },
      '-=0.25',
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

.quote-card {
  background:
    linear-gradient(135deg, rgba(180, 12, 139, 0.12), transparent 60%),
    var(--color-navy-light);
  border: 1px solid rgba(237, 24, 121, 0.16);
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.quote-card:hover {
  border-color: rgba(237, 24, 121, 0.42);
  transform: translateY(-4px);
}

.quote-mark {
  width: 2rem;
  height: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  opacity: 0.85;
}

.star {
  width: 1rem;
  height: 1rem;
  color: var(--color-coral);
}
</style>
