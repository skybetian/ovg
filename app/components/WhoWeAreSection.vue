<template>
  <section ref="sectionEl" class="relative py-16 md:py-24 overflow-hidden">
    <img
      src="/images/who-we-are-bg.webp"
      alt=""
      class="absolute inset-0 w-full h-full object-cover"
    />

    <svg
      v-for="layer in vectorLayers"
      :key="layer.id"
      viewBox="0 0 1753 478"
      preserveAspectRatio="none"
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 w-full h-auto z-10"
      :style="layer.style"
    >
      <defs>
        <clipPath :id="layer.clipId">
          <rect
            :ref="(el) => setClipRectRef(el as SVGRectElement | null, layer.id)"
            x="0"
            y="0"
            width="0"
            height="478"
          />
        </clipPath>
      </defs>
      <path
        d="M0 219.095C0 219.095 106.861 435.997 269.969 472.315C308.892 477.183 351.626 471.331 397.905 449.669C510.026 397.189 661.946 283.615 815.931 184.864C1004.66 57.1758 1198.46 -47.8134 1326.41 22.669C1466.95 100.093 1640.75 155.086 1752.1 185.605C1631.29 154.561 1458.62 102.343 1326.41 30.6692C1201.06 -37.2825 1006.91 62.3905 815.931 184.864C671.293 282.724 529.639 393.916 422.905 449.669C368.1 478.297 316.723 482.725 269.969 472.315C97.6406 450.764 0 219.095 0 219.095Z"
        :fill="layer.fill"
        :fill-opacity="layer.fillOpacity"
        :clip-path="`url(#${layer.clipId})`"
      />
    </svg>

    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div ref="textContent">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 font-outfit">
          <span class="reveal">
            <span ref="titleTextEl" class="reveal-text">Who We Are</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h2>
        <p class="text-white/80 text-base md:text-lg leading-relaxed mb-6">
          SkyTech International develops the platforms, payment
          systems, and gaming software that power today's most
          competitive digital markets. We specialize in legal
          sweepstakes and social gaming, industries where security,
          compliance, and scalability aren't optional. They're everything.
        </p>
        <p class="text-white/80 text-base md:text-lg leading-relaxed mb-10">
          Nevada-born. Globally minded. Built for the future of fintech
          and gaming.
        </p>
        <div class="flex flex-wrap gap-4">
          <NuxtLink to="/about" class="btn-light px-7 py-3 rounded">
            Read More
          </NuxtLink>
          <NuxtLink to="/contacts" class="btn-outline-light px-7 py-3 rounded">
            Contact Us
          </NuxtLink>
        </div>
      </div>

      <div ref="buildingImageEl" class="flex justify-center lg:justify-end">
        <img
          src="/images/building.webp"
          alt="SkyTech International building"
          class="w-full max-w-md lg:max-w-lg rounded-lg shadow-2xl"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface VectorLayer {
  id: string
  clipId: string
  fill: string
  fillOpacity: number
  style: Record<string, string>
}

const vectorLayers: VectorLayer[] = [
  {
    id: 'back',
    clipId: 'who-we-are-vector-clip-back',
    fill: '#ffffff',
    fillOpacity: 0.18,
    style: {
      bottom: '12%',
      transform: 'scaleY(1.4) scaleX(1.05)',
      mixBlendMode: 'screen',
    },
  },
  {
    id: 'mid',
    clipId: 'who-we-are-vector-clip-mid',
    fill: '#7fb3ff',
    fillOpacity: 0.35,
    style: {
      bottom: '6%',
      transform: 'scaleY(1.1)',
      mixBlendMode: 'overlay',
    },
  },
  {
    id: 'front',
    clipId: 'who-we-are-vector-clip-front',
    fill: '#ffffff',
    fillOpacity: 0.55,
    style: {
      bottom: '0',
      mixBlendMode: 'screen',
    },
  },
]

const sectionEl = ref<HTMLElement>()
const titleTextEl = ref<HTMLElement>()
const titleBarEl = ref<HTMLElement>()
const textContent = ref<HTMLElement>()
const buildingImageEl = ref<HTMLElement>()
const clipRectEls = new Map<string, SVGRectElement>()

function setClipRectRef(el: SVGRectElement | null, id: string) {
  if (el) clipRectEls.set(id, el)
  else clipRectEls.delete(id)
}

const SVG_WIDTH = 1753

let svgTrigger: ScrollTrigger | undefined
let titleTrigger: ScrollTrigger | undefined

onMounted(() => {
  if (!sectionEl.value) return

  const targets = Array.from(clipRectEls.values())
  if (targets.length > 0) {
    const tween = gsap.fromTo(
      targets,
      { attr: { width: 0 } },
      {
        attr: { width: SVG_WIDTH },
        ease: 'none',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionEl.value,
          start: 'center center',
          end: 'bottom center',
          scrub: true,
        },
      },
    )
    svgTrigger = tween.scrollTrigger
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
    tl.to(titleBarEl.value, { xPercent: -100, duration: 0.7 }, '<')
  }

  if (textContent.value) {
    tl.from(
      textContent.value.querySelectorAll('p, .flex'),
      { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 },
      '-=0.3',
    )
  }

  if (buildingImageEl.value) {
    tl.from(
      buildingImageEl.value,
      { opacity: 0, x: 60, duration: 1, ease: 'power3.out' },
      '<',
    )
  }

  titleTrigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  svgTrigger?.kill()
  titleTrigger?.kill()
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
