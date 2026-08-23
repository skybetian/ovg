<template>
  <div>
    <!-- Hero -->
    <PageHero
      title="Products"
      paragraph="One Visaya Gaming Corporation develops and operates online entertainment products. Our platforms are built with compliance, security, and scalability at the core."
      cta-to="#interactive-platform"
      cta-label="Explore More"
      image="/images/products.webp"
      image-alt="Slot game characters with playing cards and a roulette wheel"
      bg-image="/images/products-section.webp"
    />

    <!-- Features -->
    <section ref="featuresEl" class="bg-navy py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <!-- Left: heading + paragraph -->
          <div ref="featuresTextEl">
            <SectionHeading
              title="Built for partners, made for players"
              align="left"
              size-class="text-3xl md:text-4xl lg:text-5xl leading-tight"
              class="mb-6"
            />
            <p class="text-white/60 text-base md:text-lg leading-relaxed max-w-lg">
              OVGC brings technology, content, and operational expertise together into a single gaming ecosystem. Our partners get platforms engineered for security, scalability, and reliability. Their players get diverse content and experiences worth coming back to.
            </p>
            <NuxtLink to="/contacts" class="btn-outline-light px-7 py-3 rounded mt-8">
              Partner With Us
            </NuxtLink>
          </div>

          <!-- Right: feature cards -->
          <div ref="featuresGridEl" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="feature-card flex flex-col items-start text-left rounded-xl p-6 md:p-8"
            >
              <svg
                class="feature-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path v-for="d in feature.icon" :key="d" :d="d" />
              </svg>
              <h3 class="text-base md:text-lg font-bold text-white font-outfit mb-2">
                {{ feature.title }}
              </h3>
              <p class="text-cool-gray text-sm leading-relaxed">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tilted Banner -->
    <div ref="bannerEl" class="relative bg-navy-dark py-16 md:py-20 overflow-hidden">
      <div
        ref="bannerStripEl"
        class="banner-strip absolute inset-x-0 top-1/2 -translate-y-1/2 py-10 md:py-12 -rotate-2 -mx-4"
      >
        <p class="max-w-5xl mx-auto px-10 text-white text-xl md:text-3xl lg:text-4xl font-bold font-outfit italic text-center">
          One platform. Endless play. Real growth.
        </p>
      </div>
    </div>

    <!-- Game Categories -->
    <section ref="categoriesEl" class="bg-navy-dark pt-20 pb-28 md:pt-28 md:pb-36">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="text-center mb-12 md:mb-16">
          <SectionHeading eyebrow="Diverse Gaming Content" title="Every Way to Play" />
        </div>

        <div
          ref="categoriesViewportEl"
          class="overflow-hidden"
          role="group"
          aria-roledescription="carousel"
          aria-label="Game categories"
          @pointerdown="onCategoriesDown"
          @pointermove="onCategoriesMove"
          @pointerup="onCategoriesUp"
          @pointercancel="onCategoriesUp"
        >
          <div
            class="flex"
            :class="categoriesDragging ? '' : 'carousel-track'"
            :style="categoriesTrackStyle"
          >
            <div
              v-for="(page, pageIndex) in categoriesPages"
              :key="pageIndex"
              class="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 py-4"
              :aria-hidden="pageIndex !== categoriesCurrent"
            >
              <div v-for="category in page" :key="category.title" class="category-card">
                <!-- Title + description are baked into the artwork; alt carries both for screen readers -->
                <img
                  :src="category.image"
                  :alt="`${category.title}. ${category.description}`"
                  class="category-phone block w-full h-auto aspect-[238/484] object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="categoriesPages.length > 1" class="flex justify-center gap-2.5 mt-9">
          <button
            v-for="(_, i) in categoriesPages"
            :key="i"
            type="button"
            class="dot"
            :class="{ 'dot-on': categoriesCurrent === i }"
            :aria-label="`Show game categories ${i + 1} of ${categoriesPages.length}`"
            :aria-current="categoriesCurrent === i ? 'true' : undefined"
            @click="categoriesCurrent = i"
          />
        </div>
      </div>
    </section>

    <!-- Our Interactive Platform -->
    <section id="interactive-platform" ref="platformEl" class="bg-black py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="text-center mb-14">
          <SectionHeading
            eyebrow="Projects"
            title="Go Play Them"
            size-class="text-3xl md:text-4xl lg:text-5xl"
          />
        </div>

        <div
          ref="platformPinEl"
          class="overflow-x-auto lg:overflow-visible scrollbar-hide snap-x snap-mandatory"
          @scroll="onPlatformScroll"
        >
        <div ref="platformGridEl" class="flex gap-3 lg:gap-6 lg:grid lg:grid-cols-3">
          <div
            v-for="platform in platforms"
            :key="platform.name"
            class="relative rounded-xl overflow-hidden aspect-[16/10] w-[85vw] sm:w-[350px] lg:w-auto flex-shrink-0 lg:flex-shrink group cursor-pointer snap-start"
          >
            <img
              :src="platform.image"
              :alt="platform.name"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center gap-3">
              <h3 class="text-white text-2xl font-bold font-outfit opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {{ platform.name }}
              </h3>
              <a
                :href="platform.url"
                target="_blank"
                rel="noopener"
                class="btn-primary px-6 py-2.5 rounded opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75"
              >
                Visit Site
              </a>
            </div>
          </div>
          <div
            v-for="n in 4"
            :key="n"
            class="group relative rounded-xl overflow-hidden aspect-[16/10] w-[85vw] sm:w-[350px] lg:w-auto flex-shrink-0 lg:flex-shrink bg-[#1A042C] flex items-center justify-center cursor-pointer snap-start"
          >
            <img
              src="/images/coming-soon.webp"
              alt="Coming Soon"
              class="w-28 h-auto object-cover coming-soon-img"
            />
          </div>
        </div>
        </div>

        <!-- dots only: lg shows the full 3-col grid already, nothing to page through -->
        <div class="flex justify-center gap-2.5 mt-9 lg:hidden">
          <button
            v-for="i in platformCount"
            :key="i"
            type="button"
            class="dot"
            :class="{ 'dot-on': platformCurrent === i - 1 }"
            :aria-label="`Go to slide ${i} of ${platformCount}`"
            :aria-current="platformCurrent === i - 1 ? 'true' : undefined"
            @click="scrollPlatformTo(i - 1)"
          />
        </div>

        <!-- parked: this button has no destination yet
        <div ref="platformCtaEl" class="flex justify-center mt-12">
          <NuxtLink
            to="#"
            class="btn-primary px-8 py-3 rounded"
          >
            View more
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div> -->
      </div>
    </section>

    <!-- Products and Services: parked — logos not supplied yet. Its script block is commented out below. -->
    <!--
    <section id="products-services" ref="servicesEl" class="bg-black py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="text-center mb-14">
          <SectionHeading eyebrow="What We Offer" title="Products and Services" />
        </div>

        <div class="space-y-14 md:space-y-16">
          <div v-for="group in services" :key="group.category">
            <h3 class="text-xl md:text-2xl font-bold text-white font-outfit mb-6">{{ group.category }}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <component
                :is="brand.url ? 'a' : 'div'"
                v-for="brand in group.brands"
                :key="brand.name"
                v-bind="brand.url ? { href: brand.url, target: '_blank', rel: 'noopener' } : {}"
                class="brand-card rounded-xl p-6 flex flex-col items-center text-center gap-4"
              >
                <div class="h-16 w-full bg-white rounded-lg flex items-center justify-center p-2">
                  <img
                    :src="brand.logo"
                    :alt="brand.name"
                    loading="lazy"
                    decoding="async"
                    class="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <p class="text-white font-semibold font-outfit">{{ brand.name }}</p>
                  <p v-if="brand.url" class="text-cool-gray text-sm mt-1 break-all">{{ brand.url }}</p>
                </div>
              </component>
            </div>
          </div>
        </div>
      </div>
    </section>
    -->

    <!-- How It Works -->
    <!-- <section ref="howItWorksEl" class="bg-navy py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div ref="howItWorksTextEl" class="flex flex-col justify-center p-2">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-outfit mb-6">
              <span class="reveal">
                <span ref="howTitleTextEl" class="reveal-text">How It Works</span>
                <span ref="howTitleBarEl" class="reveal-bar" />
              </span>
            </h2>
            <p class="text-white/70 text-base leading-relaxed max-w-sm">
              From ideation to launch and beyond, we guide every step to deliver innovative, secure, and seamless online entertainment experiences.
            </p>
          </div>

          <div
            v-for="(step, idx) in steps"
            :key="step.title"
            :class="[
              'step-card group overflow-hidden rounded-2xl p-8 shadow-md min-h-[260px] flex flex-col transition-transform duration-300 lg:hover:-translate-y-2',
              'sticky lg:relative lg:!top-auto',
              step.featured ? 'bg-primary text-white' : 'bg-navy-light text-white',
            ]"
            :style="{ top: `${30 + idx * 20}px`, zIndex: idx + 1 }"
          >
            <span
              class="absolute -right-20 text-[8rem] md:text-[10rem] font-bold font-outfit leading-none opacity-0 translate-y-full pointer-events-none select-none transition-all duration-500 ease-out group-hover:opacity-[0.08] group-hover:translate-y-0 group-hover:right-0 -bottom-6"
              :class="step.featured ? 'text-white' : 'text-sky-blue'"
            >{{ String(idx + 1).padStart(2, '0') }}</span>

            <p
              class="relative z-10 text-4xl md:text-5xl font-bold font-outfit mb-6 transition-all duration-300 group-hover:-rotate-6 origin-bottom-left group-hover:drop-shadow-[0_4px_12px_rgba(237,24,121,0.6)]"
              :class="step.featured ? 'text-white' : 'text-sky-blue'"
            >
              {{ String(idx + 1).padStart(2, '0') }}
            </p>
            <h3 class="relative z-10 text-xl font-bold font-outfit mb-3">{{ step.title }}</h3>
            <p :class="['relative z-10 text-sm leading-relaxed', step.featured ? 'text-white/90' : 'text-white/60']">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section> -->

    <GameProvidersSection />

  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// declared up top: categoriesPerPage/platformCount below read these at setup time, not lazily
const categories = [
  { title: 'Slot Games', description: 'Experience the thrill of every spin with action-packed slot games and exciting rewards.', image: '/images/slot-games.webp' },
  { title: 'Table Games', description: 'Discover immersive table games where strategy meets rewarding gameplay.', image: '/images/table-games.webp' },
  { title: 'Live Casino', description: 'Play your favorite casino games live and feel the excitement of every moment.', image: '/images/live-casino.webp' },
  { title: 'Arcade Games', description: 'Enjoy classic and modern arcade games designed for quick thrills and endless entertainment.', image: '/images/arcade-games.webp' },
  { title: 'Live Sports', description: 'Watch the action unfold in real time with live sports, bringing every match closer than ever.', image: '/images/live-sports.webp' },
  { title: 'Live E-Sports', description: 'Watch elite gamers battle in real time with nonstop action and competitive excitement.', image: '/images/live-e-sports.webp' },
]

const platforms = [
  { name: 'SayaKing', url: 'https://www.sayaking.com', image: '/images/sayaking-platform.webp' },
  { name: 'JPSaya', url: 'https://www.jpsaya.ph', image: '/images/jpsaya-platform.webp' },
]

const featuresEl = ref<HTMLElement>()
const featuresTextEl = ref<HTMLElement>()
const featuresGridEl = ref<HTMLElement>()

const bannerEl = ref<HTMLElement>()
const bannerStripEl = ref<HTMLElement>()

const categoriesEl = ref<HTMLElement>()

// 3 per page from lg, 2 from sm, 1 below — mirrors the old grid-cols-1/2/3 breakpoints
const categoriesPerPage = ref(1)
const {
  viewportEl: categoriesViewportEl,
  current: categoriesCurrent,
  dragging: categoriesDragging,
  pages: categoriesPages,
  trackStyle: categoriesTrackStyle,
  onDown: onCategoriesDown,
  onMove: onCategoriesMove,
  onUp: onCategoriesUp,
  clampCurrent: clampCategoriesCurrent,
} = useCarousel(computed(() => categories), categoriesPerPage)

let featuresTrigger: ScrollTrigger | undefined
let categoriesTrigger: ScrollTrigger | undefined
let platformTrigger: ScrollTrigger | undefined

const platformEl = ref<HTMLElement>()
const platformGridEl = ref<HTMLElement>()
const platformPinEl = ref<HTMLElement>()
const platformCtaEl = ref<HTMLElement>()
const platformCurrent = ref(0)
const platformCount = platforms.length + 4

let categoriesMql: { sm: MediaQueryList; lg: MediaQueryList } | undefined
let onCategoriesMql: (() => void) | undefined

// Native scroll-snap drives the dots here (see Job 1 reasoning in the report) — step is
// re-measured from the DOM each call so it stays correct across breakpoints, no cached width.
function platformStep() {
  const el = platformGridEl.value
  const card = el?.children[0] as HTMLElement | undefined
  if (!el || !card) return 0
  return card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0')
}

function onPlatformScroll() {
  const el = platformPinEl.value
  const step = platformStep()
  if (!el || step <= 0) return
  platformCurrent.value = Math.round(el.scrollLeft / step)
}

function scrollPlatformTo(i: number) {
  const el = platformPinEl.value
  const step = platformStep()
  if (!el || step <= 0) return
  const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollTo({ left: i * step, behavior: instant ? 'auto' : 'smooth' })
}

// parked with the Products and Services markup above
// const servicesEl = ref<HTMLElement>()

onMounted(() => {
  // Features section animation
  if (featuresEl.value && featuresGridEl.value) {
    const ftl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: featuresEl.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    if (featuresTextEl.value) {
      ftl.from(
        featuresTextEl.value,
        { opacity: 0, x: -40, duration: 0.7 },
        0.1,
      )
    }

    ftl.from(
      featuresGridEl.value.children,
      { opacity: 0, y: 40, duration: 0.7, stagger: 0.12 },
      0.2,
    )

    featuresTrigger = ftl.scrollTrigger
  }

  // Banner tilt animation (scrubbed on scroll)
  if (bannerStripEl.value && bannerEl.value) {
    gsap.fromTo(
      bannerStripEl.value,
      { rotation: -2 },
      {
        rotation: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: bannerEl.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  }

  // Categories: perPage mirrors the old grid-cols-1/2/3 breakpoints (sm 640, lg 1024)
  categoriesMql = {
    sm: window.matchMedia('(min-width: 640px)'),
    lg: window.matchMedia('(min-width: 1024px)'),
  }
  const setCategoriesPerPage = () => {
    categoriesPerPage.value = categoriesMql!.lg.matches ? 3 : categoriesMql!.sm.matches ? 2 : 1
  }
  setCategoriesPerPage()
  onCategoriesMql = () => {
    setCategoriesPerPage()
    clampCategoriesCurrent()
  }
  categoriesMql.sm.addEventListener('change', onCategoriesMql)
  categoriesMql.lg.addEventListener('change', onCategoriesMql)

  // Categories section entrance — carousel viewport fades up as one unit, same recipe as Testimonials
  if (categoriesEl.value && categoriesViewportEl.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: categoriesEl.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    ctl.from(categoriesViewportEl.value, { opacity: 0, y: 44, duration: 0.8 })

    categoriesTrigger = ctl.scrollTrigger
  }

  // Platform dots: native scroll-snap drives them, no drag-carousel duplicate — see report
  onPlatformScroll()
  window.addEventListener('resize', onPlatformScroll)

  // Platform section animation
  if (platformEl.value) {
    const tl2 = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: platformEl.value,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    if (platformGridEl.value) {
      tl2.from(
        platformGridEl.value.children,
        { opacity: 0, y: 60, duration: 0.8, stagger: 0.1 },
        0,
      )
    }

    if (platformCtaEl.value) {
      tl2.from(
        platformCtaEl.value,
        { opacity: 0, y: 30, duration: 0.6 },
        '-=0.3',
      )
    }

    platformTrigger = tl2.scrollTrigger
  }

  /* parked with the Products and Services markup above
  // Products and Services cards: stagger the brand cards in, same pattern as About's "Our Values"
  if (servicesEl.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const cards = servicesEl.value.querySelectorAll('.brand-card')
    const stl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: servicesEl.value,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
    stl.from(cards, { opacity: 0, y: 50, duration: 0.7, stagger: 0.1 })
    servicesTrigger = stl.scrollTrigger
  }
  */

})

onBeforeUnmount(() => {
  featuresTrigger?.kill()
  categoriesTrigger?.kill()
  platformTrigger?.kill()
  if (categoriesMql && onCategoriesMql) {
    categoriesMql.sm.removeEventListener('change', onCategoriesMql)
    categoriesMql.lg.removeEventListener('change', onCategoriesMql)
  }
  window.removeEventListener('resize', onPlatformScroll)
})

// icon: SVG path "d" strings (feather-style, 24x24), same technique as WhatWeDoSection's .service-icon
const features = [
  {
    title: 'Built to Scale',
    description: 'Infrastructure engineered for scalability and reliability as your player base grows.',
    icon: ['M23 6L13.5 15.5L8.5 10.5L1 18', 'M17 6H23V12'],
  },
  {
    title: 'Secure & Compliant',
    description: 'Security and operational excellence built into every layer, not bolted on after launch.',
    icon: ['M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z', 'M9 12L11 14L15 10'],
  },
  {
    title: 'Diverse Game Content',
    description: 'Slots, table games, live casino, and more — one diverse content library, ready to deploy.',
    icon: ['M12 2L2 7L12 12L22 7L12 2Z', 'M2 17L12 22L22 17', 'M2 12L12 17L22 12'],
  },
  {
    title: 'Lasting Partner Value',
    description: 'Trusted solutions and long-term partnerships, built for shared growth.',
    icon: ['M5 8A7 7 0 1 0 19 8A7 7 0 1 0 5 8Z', 'M8.21 13.89L7 23L12 20L17 23L15.79 13.88'],
  },
]

const services = [
  {
    category: 'Gaming System Administrator',
    brands: [
      { name: 'SayaKing', url: 'https://www.sayaking.com', logo: '/images/brands/sayaking.webp' },
      { name: 'JPSaya', url: 'https://www.jpsaya.ph', logo: '/images/brands/jpsaya.webp' },
    ],
  },
]
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-4px) rotate(-2deg); }
  30% { transform: translateX(4px) rotate(2deg); }
  45% { transform: translateX(-3px) rotate(-1deg); }
  60% { transform: translateX(3px) rotate(1deg); }
  75% { transform: translateX(-2px); }
  90% { transform: translateX(2px); }
}

.group:hover .coming-soon-img {
  animation: shake 0.5s ease-in-out;
}

/* grid lives on ::before so it can fade at the ends without taking the text with it */
.banner-strip {
  position: relative;
  isolation: isolate;
  background-color: var(--color-black);
  box-shadow: 0 0 80px 10px rgba(237, 24, 121, 0.18);
}
.banner-strip::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(237, 24, 121, 0.55) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(237, 24, 121, 0.55) 1px, transparent 1px);
  background-size: 52px 52px;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%);
}

.feature-card {
  background: var(--color-navy-light);
  border: 1px solid rgba(237, 24, 121, 0.12);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
  border-color: rgba(237, 24, 121, 0.3);
  box-shadow: 0 8px 24px -8px rgba(180, 12, 139, 0.5);
}
/* line icons take brand colour via currentColor, same pattern as WhatWeDoSection's .service-icon */
.feature-icon {
  width: 2.25rem;
  height: 2.25rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
  transition: color 0.3s ease;
}
.feature-card:hover .feature-icon {
  color: var(--color-coral);
}
/* frameless card: no bg, no border, no glow — the artwork just lifts on hover */
.category-card {
  transition: transform 0.3s ease;
}
.category-card:hover {
  transform: translateY(-4px);
}

/* idle bob signals the card responds, even before hover; paused on hover so it doesn't fight the lift */
.category-phone {
  animation: category-float 4s ease-in-out infinite;
}
.category-card:hover .category-phone {
  animation-play-state: paused;
}
@keyframes category-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@media (prefers-reduced-motion: reduce) {
  .category-phone {
    animation: none;
  }
}
.brand-card {
  background: var(--color-navy-light);
  border: 1px solid rgba(237, 24, 121, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
.brand-card:hover {
  border-color: rgba(237, 24, 121, 0.3);
  box-shadow: 0 8px 24px -8px rgba(180, 12, 139, 0.5);
  transform: translateY(-4px);
}
</style>
