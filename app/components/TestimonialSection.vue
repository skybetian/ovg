<template>
  <section ref="sectionEl" class="relative bg-navy pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
      <div class="text-center mb-12 md:mb-16">
        <SectionHeading eyebrow="Testimonial" title="What Our Clients Say" />
      </div>

      <div
        ref="viewportEl"
        class="overflow-hidden"
        role="group"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
        @pointerdown="onDown"
        @pointermove="onMove"
        @pointerup="onUp"
        @pointercancel="onUp"
      >
        <div
          class="flex"
          :class="dragging ? '' : 'transition-transform duration-500 ease-out'"
          :style="trackStyle"
        >
          <!-- padded inside the page, not on the viewport: the viewport clip
               would cut the hover lift, border and shadow, and padding the
               viewport instead would let the next page peek into it -->
          <div
            v-for="(page, pageIndex) in pages"
            :key="pageIndex"
            class="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 px-2 py-4"
            :aria-hidden="pageIndex !== current"
          >
            <figure
              v-for="testimonial in page"
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
      </div>

      <div v-if="pages.length > 1" class="flex justify-center gap-2.5 mt-9">
        <button
          v-for="(_, i) in pages"
          :key="i"
          type="button"
          class="dot"
          :class="{ 'dot-on': current === i }"
          :aria-label="`Show testimonials ${i + 1} of ${pages.length}`"
          :aria-current="current === i ? 'true' : undefined"
          @click="current = i"
        />
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
    text: 'Launch day traffic hit harder than we planned for and the platform held. Our team was already working the back office by that afternoon.',
    role: 'Head of Operations, Online Gaming Operator',
  },
  {
    text: 'They asked about our players before they asked about our stack. That showed up in the numbers about a month later.',
    role: 'Product Director, Casino Platform',
  },
  {
    text: 'One integration replaced four of ours. The reporting is the part my finance team actually thanks me for.',
    role: 'CTO, Gaming Technology Provider',
  },
  {
    text: 'They pushed back on two things we asked for, on compliance grounds. That is a large part of why we stayed.',
    role: 'CEO, Online Entertainment Company',
  },
]

const sectionEl = ref<HTMLElement>()
const viewportEl = ref<HTMLElement>()

// 2 per page from lg up, 1 below — tablets get the single-column reading width
const perPage = ref(1)
const current = ref(0)
const dragOffset = ref(0)
const dragging = ref(false)

const pages = computed(() => {
  const out = []
  for (let i = 0; i < testimonials.length; i += perPage.value) {
    out.push(testimonials.slice(i, i + perPage.value))
  }
  return out
})

const trackStyle = computed(() => ({
  transform: `translate3d(calc(${-current.value * 100}% + ${dragOffset.value}px), 0, 0)`,
  touchAction: 'pan-y',
  cursor: dragging.value ? 'grabbing' : 'grab',
  userSelect: 'none' as const,
}))

let pointerId: number | null = null
let startX = 0
let trackWidth = 0

function onDown(e: PointerEvent) {
  if (!viewportEl.value || (e.pointerType === 'mouse' && e.button !== 0)) return
  pointerId = e.pointerId
  startX = e.clientX
  trackWidth = viewportEl.value.clientWidth
  dragging.value = true
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onMove(e: PointerEvent) {
  if (!dragging.value || e.pointerId !== pointerId) return
  let delta = e.clientX - startX
  const last = pages.value.length - 1
  // rubber-band at the ends so it cannot be dragged into empty space
  if ((current.value === 0 && delta > 0) || (current.value === last && delta < 0)) delta *= 0.35
  dragOffset.value = delta
}

function onUp(e: PointerEvent) {
  if (!dragging.value || e.pointerId !== pointerId) return
  const threshold = Math.max(50, trackWidth * 0.15)
  const last = pages.value.length - 1
  if (dragOffset.value <= -threshold && current.value < last) current.value++
  else if (dragOffset.value >= threshold && current.value > 0) current.value--
  dragOffset.value = 0
  dragging.value = false
  pointerId = null
}

let trigger: ScrollTrigger | undefined
let mql: MediaQueryList | undefined
let onMql: ((e: MediaQueryListEvent) => void) | undefined

onMounted(() => {
  if (!sectionEl.value) return

  mql = window.matchMedia('(min-width: 1024px)')
  perPage.value = mql.matches ? 2 : 1
  onMql = (e) => {
    perPage.value = e.matches ? 2 : 1
    // fewer pages after a resize can leave current past the end
    current.value = Math.min(current.value, pages.value.length - 1)
  }
  mql.addEventListener('change', onMql)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: sectionEl.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  })

  if (viewportEl.value) {
    tl.from(viewportEl.value, { opacity: 0, y: 44, duration: 0.8 })
  }

  trigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  trigger?.kill()
  if (mql && onMql) mql.removeEventListener('change', onMql)
})
</script>

<style scoped>
/* same surface as the service and pillar cards — one treatment across the page */
.quote-card {
  background: linear-gradient(160deg, #38104F 0%, #240A38 100%);
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    0 12px 28px -18px rgba(0, 0, 0, 0.9);
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.quote-card:hover {
  border-color: rgba(237, 24, 121, 0.4);
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

.dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.22);
  transition: background-color 0.3s ease, width 0.3s ease;
}
.dot:hover {
  background: rgba(255, 255, 255, 0.4);
}
.dot-on {
  width: 1.6rem;
  background: var(--color-primary);
}
.dot:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
</style>
