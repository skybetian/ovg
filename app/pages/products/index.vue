<template>
  <div>
    <!-- Hero -->
    <PageHero
      title="Products"
      paragraph="Skytech develops and operates technology products across fintech and interactive entertainment. Our platforms are built with compliance, security, and scalability at the core."
      cta-to="#interactive-platform"
      cta-label="Explore More"
      image="/images/girl.webp"
      image-alt="Skytech multi-device platform"
      bg-image="/images/product-bg.webp"
      full-height
    />

    <!-- Features -->
    <section ref="featuresEl" class="bg-navy py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left: heading + paragraph -->
          <div ref="featuresTextEl">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-outfit mb-6 leading-tight">
              Bringing excitement to every game
            </h2>
            <p class="text-white/60 text-base md:text-lg leading-relaxed max-w-lg">
              Experience nonstop entertainment with thrilling games, exciting rewards, and action-packed moments in every play. Whether you're chasing big wins or simply enjoying the excitement, every round brings a new adventure waiting to unfold.
            </p>
          </div>

          <!-- Right: 2x2 feature cards -->
          <div ref="featuresGridEl" class="grid grid-cols-2 gap-4">
            <div
              v-for="feature in features"
              :key="feature.title"
              :class="[
                'flex flex-col items-center justify-center text-center rounded-xl p-6 md:p-8',
                feature.highlighted ? 'feature-card-highlighted' : 'feature-card',
              ]"
            >
              <img
                :src="feature.highlighted ? feature.iconWhite : feature.icon"
                :alt="feature.title"
                :class="[
                  'mb-4',
                  feature.highlighted ? 'w-16 h-16 md:w-20 md:h-20' : 'w-14 h-14 md:w-16 md:h-16',
                ]"
              />
              <h3
                :class="[
                  'text-sm md:text-base font-bold font-outfit',
                  feature.highlighted ? 'text-white' : 'text-sky-blue',
                ]"
              >
                {{ feature.title }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tilted Banner -->
    <div ref="bannerEl" class="relative bg-navy-dark py-16 md:py-20 overflow-hidden">
      <div
        ref="bannerStripEl"
        class="absolute inset-x-0 top-1/2 -translate-y-1/2 py-10 md:py-12 -rotate-2 -mx-4 shadow-[0_0_40px_rgba(0,59,164,0.5)] bg-cover bg-center"
        style="background-image: url('/images/banner-bg.webp')"
      >
        <p class="max-w-5xl mx-auto px-10 text-white text-xl md:text-3xl lg:text-4xl font-bold font-outfit italic text-center">
          Enjoy unique gameplay experiences all in one place.
        </p>
      </div>
    </div>

    <!-- Game Categories -->
    <section ref="categoriesEl" class="bg-navy-dark pt-20 pb-28 md:pt-28 md:pb-36">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div ref="categoriesGridEl" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="category in categories"
            :key="category.title"
            class="category-card group rounded-xl flex flex-col items-center text-center relative z-0 hover:z-10 overflow-hidden hover:overflow-visible"
          >
            <!-- Phone image -->
            <div class="relative flex items-start justify-center pt-6 z-10 h-[200px] transition-transform duration-500 ease-out group-hover:-translate-y-20">
              <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/60 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <img
                :src="category.image"
                :alt="category.title"
                class="relative w-[90%] object-contain"
              />
            </div>

            <!-- Text content (overlaps phone bottom) -->
            <div class="relative z-20 bg-navy-light -mt-10 p-6 md:p-8 rounded-b-xl">
              <h3 class="text-white text-lg md:text-xl font-bold font-outfit mb-2">
                {{ category.title }}
              </h3>
              <p class="text-white/60 text-sm leading-relaxed max-w-xs">
                {{ category.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Interactive Platform -->
    <section id="interactive-platform" ref="platformEl" class="bg-black py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div ref="platformHeadingEl" class="text-center mb-14">
          <p class="text-white/70 text-sm md:text-base mb-3">Projects</p>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-outfit">
            <span class="reveal">
              <span ref="platformTitleTextEl" class="reveal-text">Our Interactive Platform</span>
              <span ref="platformTitleBarEl" class="reveal-bar" />
            </span>
          </h2>
        </div>

        <div ref="platformPinEl" class="overflow-x-auto lg:overflow-visible scrollbar-hide snap-x snap-mandatory">
        <div ref="platformGridEl" class="flex gap-3 lg:gap-6 lg:grid lg:grid-cols-3">
          <div class="relative rounded-xl overflow-hidden aspect-[16/10] w-[85vw] sm:w-[350px] lg:w-auto flex-shrink-0 lg:flex-shrink group cursor-pointer snap-start">
            <img
              src="/images/bsweeps.webp"
              alt="BSweeps"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex flex-col items-center justify-center gap-3">
              <h3 class="text-white text-2xl font-bold font-outfit opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                BSweeps
              </h3>
              <NuxtLink
                to="/products/bsweeps"
                class="btn-primary px-6 py-2.5 rounded opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75"
              >
                View Details
              </NuxtLink>
            </div>
          </div>
          <div
            v-for="n in 5"
            :key="n"
            class="group relative rounded-xl overflow-hidden aspect-[16/10] w-[85vw] sm:w-[350px] lg:w-auto flex-shrink-0 lg:flex-shrink bg-[#0a1428] flex items-center justify-center cursor-pointer snap-start"
          >
            <img
              src="/images/coming-soon.webp"
              alt="Coming Soon"
              class="w-28 h-auto object-cover coming-soon-img"
            />
          </div>
        </div>
        </div>

        <!-- <div ref="platformCtaEl" class="flex justify-center mt-12">
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
              From ideation to launch and beyond, we guide every step to deliver innovative, secure, and seamless fintech and interactive experiences.
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
              class="relative z-10 text-4xl md:text-5xl font-bold font-outfit mb-6 transition-all duration-300 group-hover:-rotate-6 origin-bottom-left group-hover:drop-shadow-[0_4px_12px_rgba(142,179,239,0.6)]"
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

const featuresEl = ref<HTMLElement>()
const featuresTextEl = ref<HTMLElement>()
const featuresGridEl = ref<HTMLElement>()

const bannerEl = ref<HTMLElement>()
const bannerStripEl = ref<HTMLElement>()

const categoriesEl = ref<HTMLElement>()
const categoriesGridEl = ref<HTMLElement>()

let featuresTrigger: ScrollTrigger | undefined
let categoriesTrigger: ScrollTrigger | undefined
let platformTrigger: ScrollTrigger | undefined

const platformEl = ref<HTMLElement>()
const platformHeadingEl = ref<HTMLElement>()
const platformTitleTextEl = ref<HTMLElement>()
const platformTitleBarEl = ref<HTMLElement>()
const platformGridEl = ref<HTMLElement>()
const platformPinEl = ref<HTMLElement>()
const platformCtaEl = ref<HTMLElement>()

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

  // Categories section animation
  if (categoriesEl.value && categoriesGridEl.value) {
    const ctl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: categoriesEl.value,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    ctl.from(
      categoriesGridEl.value.children,
      { opacity: 0, y: 50, duration: 0.7, stagger: 0.1 },
      0.1,
    )

    categoriesTrigger = ctl.scrollTrigger
  }

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

    if (platformTitleTextEl.value && platformTitleBarEl.value) {
      gsap.set(platformTitleBarEl.value, { opacity: 0 })
      tl2.to(platformTitleTextEl.value, { clipPath: 'inset(0 0 0 0%)', duration: 0.7 }, 0.1)
      tl2.set(platformTitleBarEl.value, { opacity: 1 }, 0.1)
      tl2.to(platformTitleBarEl.value, { xPercent: -101, duration: 0.7 }, '<')
    }

    if (platformHeadingEl.value) {
      tl2.from(
        platformHeadingEl.value.querySelectorAll('p'),
        { opacity: 0, y: 20, duration: 0.6 },
        '-=0.4',
      )
    }

    if (platformGridEl.value) {
      tl2.from(
        platformGridEl.value.children,
        { opacity: 0, y: 60, duration: 0.8, stagger: 0.1 },
        '-=0.3',
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

})

onBeforeUnmount(() => {
  featuresTrigger?.kill()
  categoriesTrigger?.kill()
  platformTrigger?.kill()
})

const categories = [
  { title: 'Slot Games', description: 'Experience the thrill of every spin with action-packed slot games and exciting rewards.', image: '/images/slot-games.webp' },
  { title: 'Table Games', description: 'Discover immersive table games where strategy meets rewarding gameplay.', image: '/images/table-games.webp' },
  { title: 'Live Casino', description: 'Play your favorite casino games live and feel the excitement of every moment.', image: '/images/live-casino.webp' },
  { title: 'Arcade Games', description: 'Enjoy classic and modern arcade games designed for quick thrills and endless entertainment.', image: '/images/arcade-games.webp' },
  { title: 'Live Sports', description: 'Watch the action unfold in real time with live sports, bringing every match closer than ever.', image: '/images/live-sports.webp' },
  { title: 'Live E-Sports', description: 'Watch elite gamers battle in real time with nonstop action and competitive excitement.', image: '/images/live-e-sports.webp' },
]

const features = [
  { title: 'Unique Experiences', icon: '/images/rocket.webp', iconWhite: '/images/rocket-white.webp', highlighted: true },
  { title: 'Massive Rewards', icon: '/images/diamond.webp', iconWhite: '', highlighted: false },
  { title: 'Endless Game Selection', icon: '/images/game.webp', iconWhite: '', highlighted: false },
  { title: 'Exclusive Bonuses', icon: '/images/gift.webp', iconWhite: '', highlighted: false },
]
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

.feature-card {
  background: var(--color-navy-light);
  border: 1px solid rgba(142, 179, 239, 0.12);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.feature-card:hover {
  border-color: rgba(142, 179, 239, 0.3);
  box-shadow: 0 8px 24px -8px rgba(14, 47, 146, 0.5);
}
.category-card {
  background: var(--color-navy-light);
  border: 1px solid rgba(142, 179, 239, 0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}
.category-card:hover {
  border-color: rgba(142, 179, 239, 0.25);
  box-shadow: 0 8px 24px -8px rgba(14, 47, 146, 0.5);
  transform: translateY(-4px);
}
.feature-card-highlighted {
  background: linear-gradient(135deg, #0FA3FF 0%, #0030CF 53%);
  border: 1px solid rgba(15, 163, 255, 0.3);
  box-shadow: 0 8px 32px -8px rgba(0, 48, 207, 0.4);
}
</style>
