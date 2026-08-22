<template>
  <section
    ref="sectionEl"
    class="relative flex items-center overflow-hidden py-20 md:py-28 lg:py-0 lg:min-h-[100dvh]"
  >
    <!-- section backdrop: shown as-is, no overlay -->
    <img
      ref="bgEl"
      src="/images/who-we-are-parallax.webp"
      alt=""
      aria-hidden="true"
      width="1519"
      height="3295"
      loading="lazy"
      decoding="async"
      class="section-bg"
    />
    <!-- bridges the two seams: starts on the hero's grid-floor black, ends on
         What We Do's plum, so neither boundary shows a step -->
    <div ref="tintEl" class="absolute inset-0 section-tint" />
    <!-- solid + mask rather than a gradient, so its colour can ride the same tween -->
    <div ref="fadeEl" class="section-fade" />

    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16">
      <!-- lg+: the copy lives inside the phone -->
      <div class="hidden lg:block phone">
        <div class="phone-screen">
          <img
            ref="screenBgEl"
            src="/images/who-we-are-parallax.webp"
            alt=""
            aria-hidden="true"
            class="screen-bg"
          />
          <div class="screen-content">
            <SectionHeading
              title="Who We Are"
              size-class="text-4xl xl:text-5xl"
              class="mb-5"
            />
            <p
              v-for="(para, i) in paragraphs"
              :key="i"
              class="text-white/80 text-xs xl:text-sm leading-relaxed mb-3 max-w-xl"
            >
              {{ para }}
            </p>

            <div class="flex flex-wrap justify-center gap-3 mt-6">
              <NuxtLink to="/about" class="btn-light px-6 py-2.5 rounded text-sm">
                Read More
              </NuxtLink>
              <NuxtLink to="/contacts" class="btn-outline-light px-6 py-2.5 rounded text-sm">
                Contact Us
              </NuxtLink>
            </div>
          </div>
        </div>

        <img
          src="/images/phone-frame.png"
          alt=""
          aria-hidden="true"
          width="974"
          height="479"
          loading="lazy"
          decoding="async"
          class="phone-frame"
        />
      </div>

      <!-- below lg the phone screen is too small to hold this, so the copy stands alone -->
      <div class="lg:hidden rounded-xl bg-black/70 backdrop-blur-sm p-7">
        <SectionHeading title="Who We Are" align="left" class="mb-6" />
        <p
          v-for="(para, i) in paragraphs"
          :key="i"
          class="text-white/80 text-base leading-relaxed mb-4"
        >
          {{ para }}
        </p>
        <div class="flex flex-wrap gap-4 mt-6">
          <NuxtLink to="/about" class="btn-light px-7 py-3 rounded">Read More</NuxtLink>
          <NuxtLink to="/contacts" class="btn-outline-light px-7 py-3 rounded">Contact Us</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const paragraphs = [
  'One Visaya Gaming Corporation has been in online entertainment since 2022. We build the platform, the games, and the player systems a gaming operation runs on, and we keep them up and honest under real traffic.',
  'We were founded by a group of professionals and veteran investors, and we operate under the PAGCOR codes of conduct.',
]

const sectionEl = ref<HTMLElement>()
const bgEl = ref<HTMLElement>()
const screenBgEl = ref<HTMLElement>()
const tintEl = ref<HTMLElement>()
const fadeEl = ref<HTMLElement>()

// hero grid-floor black -> What We Do plum
const TINT_START = 'rgba(11, 1, 24, 0.86)'
const TINT_END = 'rgba(26, 4, 44, 0.86)'
const FADE_START = 'rgb(11, 1, 24)'
const FADE_END = 'rgb(26, 4, 44)'

const mm = gsap.matchMedia()

// how far a backdrop can travel before its bottom edge would show
function travelOf(img: HTMLElement | undefined, frame: HTMLElement | undefined) {
  return () => -Math.max(0, (img?.offsetHeight ?? 0) - (frame?.offsetHeight ?? 0))
}

onMounted(() => {
  if (!sectionEl.value) return

  // Desktop: pin, run both parallaxes, then hand over to the CTA.
  // Not on touch — pinning fights momentum scrolling and the address-bar resize.
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top top',
        end: '+=220%',
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.fromTo(bgEl.value!, { y: 0 }, { y: travelOf(bgEl.value, sectionEl.value), ease: 'none', duration: 1 }, 0)
    tl.fromTo(
      screenBgEl.value!,
      { y: 0 },
      { y: travelOf(screenBgEl.value, screenBgEl.value?.parentElement), ease: 'none', duration: 1 },
      0,
    )
    tl.fromTo(tintEl.value!, { backgroundColor: TINT_START }, { backgroundColor: TINT_END, ease: 'none', duration: 1 }, 0)
    tl.fromTo(fadeEl.value!, { backgroundColor: FADE_START }, { backgroundColor: FADE_END, ease: 'none', duration: 1 }, 0)


    return () => tl.scrollTrigger?.kill()
  })

  // Below lg: drift the backdrop only, no pin
  mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
    const tween = gsap.fromTo(
      bgEl.value!,
      { y: 0 },
      {
        y: travelOf(bgEl.value, sectionEl.value),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionEl.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
    )
    gsap.fromTo(tintEl.value!, { backgroundColor: TINT_START }, {
      backgroundColor: TINT_END,
      ease: 'none',
      scrollTrigger: { trigger: sectionEl.value, start: 'top bottom', end: 'bottom top', scrub: true },
    })
    gsap.fromTo(fadeEl.value!, { backgroundColor: FADE_START }, {
      backgroundColor: FADE_END,
      ease: 'none',
      scrollTrigger: { trigger: sectionEl.value, start: 'top bottom', end: 'bottom top', scrub: true },
    })

    return () => tween.scrollTrigger?.kill()
  })
})

onBeforeUnmount(() => {
  mm.revert()
})
</script>

<style scoped>
/* natural aspect, not cover — the artwork is far taller than the section,
   and the parallax walks it from its top edge to its bottom edge */
.section-tint {
  background-color: rgba(11, 1, 24, 0.86);
  pointer-events: none;
}

/* one element, faded at both ends: solid at the top and bottom edges where the
   neighbouring sections meet, clear through the middle so the photo reads */
.section-fade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-color: rgb(11, 1, 24);
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 24%, transparent 76%, #000 100%);
  mask-image: linear-gradient(to bottom, #000 0%, transparent 24%, transparent 76%, #000 100%);
}

.section-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  pointer-events: none;
  will-change: transform;
}

.phone {
  position: relative;
  width: 100%;
  max-width: 56rem;
  margin-inline: auto;
  filter: drop-shadow(0 40px 70px rgba(0, 0, 0, 0.75));
}

.phone-frame {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
}

/* Measured as the union of every screen-coloured pixel, not a scan from the
   centre: the notch sits inside the screen and stops a centre scan short. */
.phone-screen {
  position: absolute;
  left: 2.26%;
  top: 5.22%;
  width: 95.48%;
  height: 89.56%;
  z-index: 1;
  overflow: hidden;
  border-radius: 1.6rem;
}

.screen-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  will-change: transform;
}

.screen-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem 3rem;
}
</style>
