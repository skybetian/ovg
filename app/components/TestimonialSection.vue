<template>
  <section ref="sectionEl" class="bg-navy py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      <div ref="headingEl" class="text-center mb-12 md:mb-16">
        <p class="text-cool-gray font-medium text-sm mb-2">Testimonial</p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-outfit">
          <span class="reveal">
            <span ref="titleTextEl" class="reveal-text">What our clients say</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h2>
      </div>

      <div
        ref="carouselEl"
        class="relative overflow-hidden"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerEnd"
        @pointercancel="onPointerEnd"
      >
        <div
          :class="['flex', isDragging ? '' : 'transition-transform duration-500 ease-in-out']"
          :style="trackStyle"
          class="md:gap-8"
        >
          <div
            v-for="(page, pageIndex) in pagedTestimonials"
            :key="pageIndex"
            class="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 md:gap-8"
          >
            <div
              v-for="(testimonial, index) in page"
              :key="index"
              class="testimonial-card bg-navy-light rounded-xl p-6 md:p-8"
            >
              <img src="/images/quotes.png" alt="" class="quotes-icon w-12 h-12 md:w-14 md:h-14 mb-5 md:mb-6 mx-auto" />
              <p class="text-white text-base leading-relaxed mb-8">
                {{ testimonial.text }}
              </p>
              <div class="flex items-center justify-center gap-4">
                <img
                  src="/images/user-placeholder.png"
                  alt=""
                  class="w-16 h-16 md:w-22 md:h-22 rounded-full flex-shrink-0"
                />
                <div>
                  <p class="font-semibold text-white text-base">{{ testimonial.role }}</p>
                  <div class="flex gap-1 mt-1">
                    <img
                      v-for="star in 5"
                      :key="star"
                      src="/images/star.svg"
                      alt=""
                      class="w-4 h-4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dots -->
      <div ref="dotsEl" class="flex justify-center gap-2 mt-10">
        <button
          v-for="(_, index) in pagedTestimonials"
          :key="index"
          class="w-3 h-3 rounded-full transition-colors"
          :class="currentSlide === index ? 'bg-primary' : 'bg-black/20'"
          @click="currentSlide = index"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const currentSlide = ref(0)
const pageSize = ref(2)
const dragOffset = ref(0)
const isDragging = ref(false)
let pointerId: number | null = null
let startX = 0
let trackWidth = 0

const trackStyle = computed(() => ({
  transform: `translate3d(calc(${-currentSlide.value * 100}% + ${dragOffset.value}px), 0, 0)`,
  touchAction: 'pan-y',
  cursor: isDragging.value ? 'grabbing' : 'grab',
  userSelect: 'none' as const,
}))

function onPointerDown(e: PointerEvent) {
  if (!carouselEl.value) return
  if (e.pointerType === 'mouse' && e.button !== 0) return
  pointerId = e.pointerId
  startX = e.clientX
  trackWidth = carouselEl.value.clientWidth
  isDragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value || e.pointerId !== pointerId) return
  let delta = e.clientX - startX
  const lastIndex = pagedTestimonials.value.length - 1
  if (
    (currentSlide.value === 0 && delta > 0) ||
    (currentSlide.value === lastIndex && delta < 0)
  ) {
    delta *= 0.35
  }
  dragOffset.value = delta
}

function onPointerEnd(e: PointerEvent) {
  if (!isDragging.value || e.pointerId !== pointerId) return
  const threshold = Math.max(50, trackWidth * 0.15)
  const delta = dragOffset.value
  const lastIndex = pagedTestimonials.value.length - 1

  if (delta <= -threshold && currentSlide.value < lastIndex) {
    currentSlide.value++
  } else if (delta >= threshold && currentSlide.value > 0) {
    currentSlide.value--
  }
  dragOffset.value = 0
  isDragging.value = false
  pointerId = null
}

const sectionEl = ref<HTMLElement>()
const headingEl = ref<HTMLElement>()
const titleTextEl = ref<HTMLElement>()
const titleBarEl = ref<HTMLElement>()
const carouselEl = ref<HTMLElement>()
const dotsEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined
const cardCleanups: Array<() => void> = []
let mql: MediaQueryList | undefined
let onMqlChange: ((e: MediaQueryListEvent) => void) | undefined

onMounted(() => {
  if (!sectionEl.value) return

  // Responsive page size: 1 card on mobile, 2 on md+
  mql = window.matchMedia('(min-width: 768px)')
  pageSize.value = mql.matches ? 2 : 1
  onMqlChange = (e) => {
    pageSize.value = e.matches ? 2 : 1
    const lastIndex = pagedTestimonials.value.length - 1
    if (currentSlide.value > lastIndex) currentSlide.value = lastIndex
  }
  mql.addEventListener('change', onMqlChange)

  sectionEl.value.querySelectorAll<HTMLElement>('.testimonial-card').forEach((card) => {
    const icon = card.querySelector<HTMLImageElement>('.quotes-icon')
    if (!icon) return

    const onEnter = () => {
      gsap.to(icon, {
        scale: 1.2,
        rotation: -8,
        y: -4,
        duration: 0.5,
        ease: 'back.out(2)',
        overwrite: true,
      })
    }
    const onLeave = () => {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        y: 0,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: true,
      })
    }

    card.addEventListener('mouseenter', onEnter)
    card.addEventListener('mouseleave', onLeave)
    cardCleanups.push(() => {
      card.removeEventListener('mouseenter', onEnter)
      card.removeEventListener('mouseleave', onLeave)
    })
  })

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: sectionEl.value,
      start: 'top 75%',
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

  if (carouselEl.value) {
    const cards = Array.from(
      carouselEl.value.querySelectorAll<HTMLElement>('.bg-secondary'),
    )
    if (cards.length > 0) {
      tl.from(
        cards,
        { opacity: 0, y: 60, duration: 0.8, stagger: 0.15 },
        '-=0.3',
      )

      cards.forEach((card, cardIdx) => {
        const quotes = card.querySelector<HTMLImageElement>('img.w-14')
        const text = card.querySelector<HTMLParagraphElement>('p.text-black\\/70')
        const userRow = card.querySelector<HTMLElement>('.flex.items-center.justify-center')
        const stars = card.querySelectorAll<HTMLImageElement>('.flex.gap-1 img')

        const anchor = cardIdx === 0 ? '-=0.5' : '<'

        if (quotes) {
          tl.from(
            quotes,
            { opacity: 0, scale: 0.6, y: 20, duration: 0.5, ease: 'back.out(1.6)' },
            anchor,
          )
        }
        if (text) {
          tl.from(
            text,
            { opacity: 0, y: 20, duration: 0.6 },
            '-=0.35',
          )
        }
        if (userRow) {
          tl.from(
            userRow,
            { opacity: 0, y: 20, duration: 0.5 },
            '-=0.4',
          )
        }
        if (stars.length > 0) {
          tl.from(
            stars,
            { opacity: 0, scale: 0.5, duration: 0.35, stagger: 0.06, ease: 'back.out(2)' },
            '-=0.3',
          )
        }
      })
    }
  }

  if (dotsEl.value) {
    tl.from(
      dotsEl.value,
      { opacity: 0, y: 20, duration: 0.5 },
      '-=0.2',
    )
  }

  trigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  trigger?.kill()
  cardCleanups.forEach((fn) => fn())
  if (mql && onMqlChange) mql.removeEventListener('change', onMqlChange)
})

const testimonials = [
  {
    text: 'SkyTech International delivered a secure and scalable platform that exceeded our expectations. Their commitment to compliance and innovation makes them a trusted technology partner.',
    role: 'Head of Operations, Fintech Company',
  },
  {
    text: 'Their team understands both technology and user experience. The interactive solutions they built significantly improved user engagement and retention.',
    role: 'Product Director, Gaming Platform',
  },
  {
    text: 'Working with SkyTech was seamless from start to finish. Their expertise in payment systems and regulatory compliance gave us confidence to scale globally.',
    role: 'CTO, Digital Payments Startup',
  },
  {
    text: 'The level of security and attention to detail in their gaming software is unmatched. SkyTech truly understands the sweepstakes industry.',
    role: 'CEO, Social Gaming Company',
  },
]

const pagedTestimonials = computed(() => {
  const pages = []
  const size = pageSize.value
  for (let i = 0; i < testimonials.length; i += size) {
    pages.push(testimonials.slice(i, i + size))
  }
  return pages
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
  background: var(--color-white);
  pointer-events: none;
  will-change: transform;
}

@property --sheen-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.testimonial-card {
  position: relative;
  isolation: isolate;
}
.testimonial-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: conic-gradient(
    from var(--sheen-angle),
    transparent 0%,
    rgba(142, 179, 239, 0.9) 15%,
    rgba(142, 179, 239, 0) 35%,
    transparent 100%
  );
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}
.testimonial-card:hover::before {
  opacity: 1;
  animation: sheen-spin 3s linear infinite;
}
@keyframes sheen-spin {
  to {
    --sheen-angle: 360deg;
  }
}
</style>
