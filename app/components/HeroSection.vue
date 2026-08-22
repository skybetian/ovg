<template>
  <section class="relative flex items-center justify-center overflow-hidden bg-black pt-24 pb-32 lg:py-0 lg:min-h-dvh">
    <video
      ref="videoEl"
      autoplay
      loop
      muted
      playsinline
      aria-hidden="true"
      class="absolute inset-0 w-full h-full object-cover opacity-50 brand-tint"
    >
      <source src="/videos/hero-bg2.mp4" type="video/mp4" />
    </video>

    <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-navy/25 to-black/80" />

    <!-- Chevron flanks — one path set, mirrored with <use> -->
    <svg
      class="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ovg-chev" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#7B018D" />
          <stop offset="100%" stop-color="#ED1879" />
        </linearGradient>
        <g id="ovg-chev-set">
          <path d="M40 200 L150 300 L40 400" opacity="0.3" />
          <path d="M150 200 L260 300 L150 400" opacity="0.5" />
          <path d="M260 200 L370 300 L260 400" opacity="0.75" />
        </g>
      </defs>
      <g ref="chevronsEl" fill="none" stroke="url(#ovg-chev)" stroke-width="26" stroke-linecap="square">
        <use href="#ovg-chev-set" />
        <use href="#ovg-chev-set" transform="translate(1440,0) scale(-1,1)" />
      </g>
    </svg>

    <!-- Perspective grid floor -->
    <div ref="gridFloorEl" class="grid-floor" aria-hidden="true" />

    <div ref="textContent" class="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full text-center">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-8 font-outfit">
        <span
          v-for="(line, i) in headlineLines"
          :key="i"
          class="reveal w-fit mx-auto"
        >
          <span
            :ref="(el) => setLineRef(el as HTMLElement | null, i, 'text')"
            class="reveal-text"
            :class="{ 'grad-line': i === headlineLines.length - 1 }"
          >{{ line }}</span>
          <span
            :ref="(el) => setLineRef(el as HTMLElement | null, i, 'bar')"
            class="reveal-bar"
          />
        </span>
      </h1>

      <p class="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
        One Visaya Gaming Corporation has built online entertainment
        since 2022. Our founders and investors have spent years in this
        industry, and we run every product by the PAGCOR codes of
        conduct.
      </p>

      <div class="flex flex-wrap gap-4 justify-center">
        <NuxtLink to="/contacts" class="btn-primary px-7 py-3 rounded">
          Get Started
        </NuxtLink>
        <NuxtLink to="/products" class="btn-outline-light px-7 py-3 rounded">
          See Our Products
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

const headlineLines = [
  'The Platform Behind',
  'Your Online',
  'Gaming Business',
]

interface LineRefs {
  text?: HTMLElement
  bar?: HTMLElement
}

const textContent = ref<HTMLElement>()
const videoEl = ref<HTMLVideoElement>()
const chevronsEl = ref<SVGGElement>()
const gridFloorEl = ref<HTMLElement>()
const lineRefs = new Map<number, LineRefs>()

function setLineRef(el: HTMLElement | null, idx: number, role: 'text' | 'bar') {
  if (!el) {
    const existing = lineRefs.get(idx)
    if (existing) {
      delete existing[role]
      if (!existing.text && !existing.bar) lineRefs.delete(idx)
    }
    return
  }
  const existing = lineRefs.get(idx) ?? {}
  existing[role] = el
  lineRefs.set(idx, existing)
}

onMounted(() => {
  // Reduced motion: land on the finished state, skip the reveal entirely
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    videoEl.value?.pause()
    for (const { text, bar } of lineRefs.values()) {
      if (text) text.style.clipPath = 'inset(0 0 0 0%)'
      if (bar) bar.style.display = 'none'
    }
    return
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  for (const idx of headlineLines.keys()) {
    const item = lineRefs.get(idx)
    if (!item?.text || !item?.bar) continue

    tl.to(
      item.text,
      { clipPath: 'inset(0 0 0 0%)', duration: 0.7 },
      idx === 0 ? 0.1 : '-=0.55',
    )
    tl.to(
      item.bar,
      { xPercent: -101, duration: 0.7 },
      '<',
    )
  }

  if (textContent.value) {
    tl.from(
      textContent.value.querySelectorAll('p, .flex'),
      { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 },
      '-=0.3',
    )
  }

  if (chevronsEl.value) {
    tl.from(chevronsEl.value, { opacity: 0, scale: 1.15, duration: 1.2, transformOrigin: 'center' }, 0)
  }

  if (gridFloorEl.value) {
    tl.from(gridFloorEl.value, { opacity: 0, y: 40, duration: 1.2 }, 0.2)
  }
})
</script>

<style scoped>
.reveal {
  position: relative;
  display: block;
  overflow: hidden;
}
.reveal-text {
  display: block;
  clip-path: inset(0 0 0 100%);
}
.reveal-bar {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--color-primary), var(--color-coral));
  pointer-events: none;
  will-change: transform;
}

/* Footage is cyan; sepia flattens the hue so hue-rotate lands it on brand magenta */
/* ponytail: brightness is the dial — 0.35 for near-black, 0.85 for the original */
.brand-tint {
  filter: sepia(1) hue-rotate(255deg) saturate(4) brightness(0.25);
}

.grad-line {
  background: linear-gradient(
    90deg,
    var(--color-magenta-deep) 0%,
    var(--color-primary) 15%,
    var(--color-coral) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Synthwave floor: flat grid tipped away from the camera */
.grid-floor {
  position: absolute;
  left: -50%;
  right: -50%;
  bottom: 0;
  height: 78%;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(237, 24, 121, 0.55) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(237, 24, 121, 0.55) 1px, transparent 1px);
  background-size: 104px 104px;
  transform: perspective(900px) rotateX(62deg);
  transform-origin: bottom center;
  -webkit-mask-image: linear-gradient(to top, #000 5%, transparent 92%);
  mask-image: linear-gradient(to top, #000 5%, transparent 92%);
}
</style>
