<template>
  <section ref="sectionEl" class="bg-navy py-16 md:py-24 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      <div ref="headingEl" class="text-center mb-12 md:mb-16">
        <p class="text-cool-gray font-medium text-sm mb-2">The Leaders</p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-outfit">
          <span class="reveal">
            <span ref="titleTextEl" class="reveal-text">The Team Behind SkyTech</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h2>
        <p class="text-white/60 text-base">
          Meet the experienced leaders driving innovation, strategy, and growth.
        </p>
      </div>
    </div>

    <!-- Coverflow carousel -->
    <div
      ref="carouselEl"
      class="relative min-h-[520px] md:min-h-[560px] select-none"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerEnd"
      @pointercancel="onPointerEnd"
    >
      <div
        v-for="(leader, index) in leaders"
        :key="leader.name"
        :ref="(el) => setCardRef(el as HTMLElement | null, index)"
        class="absolute top-0 left-1/2 w-[85%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] cursor-pointer"
        @click="currentSlide = index"
      >
        <div
          class="leader-card relative overflow-hidden rounded-xl p-8 h-full transition-colors duration-500"
          :class="index === currentSlide ? 'leader-card-active' : ''"
        >
          <img
            :src="index === currentSlide ? '/images/pattern.webp' : '/images/pattern-dark.webp'"
            alt=""
            class="absolute inset-0 w-full h-full object-cover pointer-events-none"
            :class="index === currentSlide ? 'opacity-40' : 'opacity-60'"
          />
          <div class="relative z-10">
            <img
              :src="leader.image"
              :alt="leader.name"
              class="w-20 h-20 rounded-full object-cover mb-5"
            />
            <h3
              class="text-2xl font-bold mb-1 transition-colors duration-300"
              :class="index === currentSlide ? 'text-primary' : 'text-white'"
            >{{ leader.name }}</h3>
            <p
              class="text-sm mb-5 transition-colors duration-300"
              :class="index === currentSlide ? 'text-black/60' : 'text-cool-gray'"
            >{{ leader.role }}</p>
            <div
              class="w-12 h-0.5 mb-6 transition-colors duration-300"
              :class="index === currentSlide ? 'bg-black/30' : 'bg-white/30'"
            />
            <p
              class="text-sm leading-relaxed transition-colors duration-300"
              :class="index === currentSlide ? 'text-black/70' : 'text-cool-gray'"
            >{{ leader.bio }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Dots -->
    <div class="flex justify-center gap-2 mt-6">
      <button
        v-for="(_, index) in leaders"
        :key="index"
        class="w-3 h-3 rounded-full transition-colors"
        :class="currentSlide === index ? 'bg-primary' : 'bg-white/20'"
        @click="currentSlide = index"
      />
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

const currentSlide = ref(1)
let pointerId: number | null = null
let startX = 0
let trackWidth = 0

const leaders = [
  {
    name: 'Wendy Wongso',
    role: 'Chief Executive Officer',
    image: '/images/user-placeholder.webp',
    bio: 'As Managing Member and CEO, Wendy leads Skytech\'s strategic direction and oversees all business operations. He brings extensive experience in technology management and business development to drive the company\'s growth in the fintech and interactive entertainment sectors.',
  },
  {
    name: 'Rich Newman',
    role: 'Legal Advisor',
    image: '/images/rich-newman.webp',
    bio: 'Rich serves as Legal Advisor, providing expert guidance on regulatory compliance, corporate governance, and legal strategy. His experience in U.S. gaming and technology law helps guide SkyTech in understanding and meeting applicable legal requirements across jurisdictions.',
  },
  {
    name: 'Mark Munger',
    role: 'Compliance & Technology Advisor',
    image: '/images/mark-munger.webp',
    bio: 'Mark advises on compliance strategy and technology architecture. With deep expertise in software engineering and fintech regulatory requirements, he provides guidance to help Skytech build platforms with security, scalability, and compliance at their core.',
  },
]

// Slot configs: position each card relative to center
const slotConfigs: Record<number, { xPercent: number; scale: number; zIndex: number; opacity: number }> = {
  [-1]: { xPercent: -105, scale: 0.9, zIndex: 1, opacity: 0.6 },
  [0]:  { xPercent: -50,  scale: 1,   zIndex: 3, opacity: 1 },
  [1]:  { xPercent: 5,    scale: 0.9, zIndex: 1, opacity: 0.6 },
}
const offscreen = { xPercent: -50, scale: 0.7, zIndex: 0, opacity: 0 }

// Card refs
const cardEls: (HTMLElement | null)[] = []
function setCardRef(el: HTMLElement | null, index: number) {
  cardEls[index] = el
}

function getSlot(cardIndex: number, active: number): number {
  const n = leaders.length
  let diff = cardIndex - active
  if (diff > Math.floor(n / 2)) diff -= n
  if (diff < -Math.floor(n / 2)) diff += n
  return diff
}

function animateSlots(instant = false) {
  leaders.forEach((_, i) => {
    const card = cardEls[i]
    if (!card) return
    const slot = getSlot(i, currentSlide.value)
    const config = slotConfigs[slot] ?? offscreen
    gsap.to(card, {
      xPercent: config.xPercent,
      scale: config.scale,
      zIndex: config.zIndex,
      opacity: config.opacity,
      duration: instant ? 0 : 0.6,
      ease: 'power3.out',
    })
  })
}

watch(currentSlide, () => animateSlots())

let headingTrigger: ScrollTrigger | undefined

onMounted(() => {
  animateSlots(true)

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

  headingTrigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  headingTrigger?.kill()
})

// Swipe handlers
function onPointerDown(e: PointerEvent) {
  if (e.pointerType === 'mouse' && e.button !== 0) return
  pointerId = e.pointerId
  startX = e.clientX
  trackWidth = (e.currentTarget as HTMLElement).clientWidth
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(_e: PointerEvent) {
  // No real-time drag tracking needed for coverflow — just detect swipe on end
}

function onPointerEnd(e: PointerEvent) {
  if (e.pointerId !== pointerId) return
  const delta = e.clientX - startX
  const threshold = Math.max(40, trackWidth * 0.1)
  const lastIndex = leaders.length - 1

  if (delta <= -threshold) {
    currentSlide.value = (currentSlide.value + 1) % leaders.length
  } else if (delta >= threshold) {
    currentSlide.value = (currentSlide.value - 1 + leaders.length) % leaders.length
  }
  pointerId = null
}
</script>

<style scoped>
.leader-card {
  background:
    radial-gradient(120% 100% at 0% 0%, rgba(142, 179, 239, 0.15) 0%, rgba(142, 179, 239, 0) 55%),
    var(--color-navy-light);
  border: 1px solid rgba(142, 179, 239, 0.15);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset;
}
.leader-card-active {
  background: #f0f5ff;
  border-color: rgba(142, 179, 239, 0.25);
  box-shadow: 0 8px 30px -8px rgba(0, 0, 0, 0.15);
}
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
</style>
