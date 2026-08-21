<template>
  <section ref="sectionEl" class="relative bg-gradient-to-b from-black via-navy-dark to-navy py-16 md:py-24 overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div ref="textContent">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 font-outfit">
          <span class="reveal">
            <span ref="titleTextEl" class="reveal-text">Who We Are</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h2>
        <p class="text-white/80 text-base md:text-lg leading-relaxed mb-6">
          One Visaya Gaming Corporation is an industry-leading company
          that has been in the business of online entertainment since
          2022. We build the platform, the games, and the player systems
          behind a modern gaming operation — where uptime, integrity,
          and scale aren't optional. They're everything.
        </p>
        <p class="text-white/80 text-base md:text-lg leading-relaxed mb-10">
          Founded by a group of professionals and veteran investors, and
          operated with strict adherence to the PAGCOR codes of conduct.
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

      <div ref="showcaseEl" class="relative flex items-center justify-center h-[360px] md:h-[440px]">
        <img
          v-for="game in games"
          :key="game.src"
          :ref="(el) => setPhoneRef(el as HTMLElement | null, game.slot)"
          :src="game.src"
          :alt="game.alt"
          width="238"
          height="322"
          loading="lazy"
          decoding="async"
          class="game-phone"
          :class="`phone-${game.slot}`"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const games = [
  { slot: 'left', src: '/images/table-games.webp', alt: 'Blackjack table game on mobile' },
  { slot: 'right', src: '/images/live-casino.webp', alt: 'Live roulette on mobile' },
  { slot: 'front', src: '/images/slot-games.webp', alt: 'Slot game on mobile' },
] as const

const sectionEl = ref<HTMLElement>()
const titleTextEl = ref<HTMLElement>()
const titleBarEl = ref<HTMLElement>()
const textContent = ref<HTMLElement>()
const showcaseEl = ref<HTMLElement>()
const phoneEls = new Map<string, HTMLElement>()

function setPhoneRef(el: HTMLElement | null, slot: string) {
  if (el) phoneEls.set(slot, el)
  else phoneEls.delete(slot)
}

let titleTrigger: ScrollTrigger | undefined
const floats: gsap.core.Tween[] = []

onMounted(() => {
  if (!sectionEl.value) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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

  if (textContent.value) {
    tl.from(
      textContent.value.querySelectorAll('p, .flex'),
      { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 },
      '-=0.3',
    )
  }

  // fan in: back phones spread outward, front one rises last
  const order = ['left', 'right', 'front'].map((s) => phoneEls.get(s)).filter(Boolean) as HTMLElement[]
  if (order.length) {
    tl.from(order, { opacity: 0, y: 40, scale: 0.92, duration: 0.8, stagger: 0.12 }, '-=0.5')
  }

  // each phone drifts at its own speed so the stack feels layered
  if (!reduced) {
    const drift: Record<string, number> = { left: 4.2, right: 5.1, front: 3.6 }
    for (const [slot, el] of phoneEls) {
      floats.push(
        gsap.to(el, {
          y: slot === 'front' ? -14 : -9,
          duration: drift[slot] ?? 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }),
      )
    }
  }

  titleTrigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  titleTrigger?.kill()
  floats.forEach((t) => t.kill())
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

/* Fanned product stack. GSAP owns y, so tilt/offset live in a separate property. */
.game-phone {
  position: absolute;
  width: 168px;
  height: auto;
  border-radius: 20px;
  will-change: transform;
}

@media (min-width: 768px) {
  .game-phone { width: 214px; }
}

.phone-left,
.phone-right {
  filter: brightness(0.72) saturate(0.9);
  z-index: 1;
}

.phone-left {
  translate: -56% 0;
  rotate: -9deg;
  scale: 0.9;
}

.phone-right {
  translate: 56% 0;
  rotate: 9deg;
  scale: 0.9;
}

.phone-front {
  z-index: 2;
  filter: drop-shadow(0 26px 50px rgba(237, 24, 121, 0.28))
    drop-shadow(0 14px 30px rgba(0, 0, 0, 0.75));
}
</style>
