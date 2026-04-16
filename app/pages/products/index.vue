<template>
  <div>
    <!-- Hero -->
    <PageHero
      title="Products"
      paragraph="Skytech develops and operates technology products across fintech and interactive entertainment. Our platforms are built with compliance, security, and scalability at the core."
      cta-to="#company-overview"
      cta-label="Explore Games"
      image="/images/computer.webp"
      image-alt="Skytech multi-device platform"
      bg-image="/images/product-bg.webp"
    />

    <!-- Our Expertise and Experience -->
    <section ref="expertiseEl" class="bg-navy py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div ref="expertiseHeadingEl">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-outfit mb-6">
            <span class="reveal">
              <span ref="expertiseTitleTextEl" class="reveal-text">Our Expertise and Experience</span>
              <span ref="expertiseTitleBarEl" class="reveal-bar" />
            </span>
          </h2>
          <p class="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed mb-14">
            Innovating at the intersection of finance and digital experiences, we deliver seamless fintech solutions and engaging interactive entertainment that empower users worldwide.
          </p>
        </div>

        <div ref="expertisePinEl" class="overflow-hidden lg:overflow-visible">
          <div ref="expertiseGridEl" class="flex gap-6 lg:grid lg:grid-cols-4">
            <div
              v-for="item in expertise"
              :key="item.title"
              class="relative rounded-2xl overflow-hidden min-h-[420px] min-w-[280px] max-w-[85vw] sm:min-w-[350px] sm:max-w-[70vw] lg:min-w-0 lg:max-w-none flex flex-col justify-end shadow-lg group flex-shrink-0 lg:flex-shrink"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="absolute inset-0 w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div class="relative z-10 p-6">
                <h3 class="text-white text-xl font-bold mb-3 font-outfit">
                  {{ item.title }}
                </h3>
                <p class="text-white/80 text-sm leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Our Interactive Platform -->
    <section ref="platformEl" class="bg-black py-20 md:py-28">
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
    <section ref="howItWorksEl" class="bg-navy py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Title -->
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

          <!-- Cards -->
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
    </section>

    <GameProvidersSection />

  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const expertiseEl = ref<HTMLElement>()
const expertiseHeadingEl = ref<HTMLElement>()
const expertiseTitleTextEl = ref<HTMLElement>()
const expertiseTitleBarEl = ref<HTMLElement>()
const expertiseGridEl = ref<HTMLElement>()
const expertisePinEl = ref<HTMLElement>()

let expertiseTrigger: ScrollTrigger | undefined
let platformTrigger: ScrollTrigger | undefined
let howItWorksTrigger: ScrollTrigger | undefined

const howItWorksEl = ref<HTMLElement>()
const howItWorksTextEl = ref<HTMLElement>()
const howTitleTextEl = ref<HTMLElement>()
const howTitleBarEl = ref<HTMLElement>()
const stackContainerEl = ref<HTMLElement>()

const platformEl = ref<HTMLElement>()
const platformHeadingEl = ref<HTMLElement>()
const platformTitleTextEl = ref<HTMLElement>()
const platformTitleBarEl = ref<HTMLElement>()
const platformGridEl = ref<HTMLElement>()
const platformPinEl = ref<HTMLElement>()
const platformCtaEl = ref<HTMLElement>()

onMounted(() => {
  if (!expertiseEl.value) return

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: expertiseHeadingEl.value,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  })

  if (expertiseTitleTextEl.value && expertiseTitleBarEl.value) {
    tl.to(expertiseTitleTextEl.value, { clipPath: 'inset(0 0 0 0%)', duration: 0.7 }, 0.1)
    tl.to(expertiseTitleBarEl.value, { xPercent: -101, duration: 0.7 }, '<')
  }

  if (expertiseHeadingEl.value) {
    tl.from(
      expertiseHeadingEl.value.querySelectorAll('p'),
      { opacity: 0, y: 20, duration: 0.6 },
      '-=0.4',
    )
  }

  if (expertiseGridEl.value) {
    tl.from(
      expertiseGridEl.value.children,
      { opacity: 0, y: 60, duration: 0.8, stagger: 0.15 },
      '-=0.3',
    )
  }

  expertiseTrigger = tl.scrollTrigger

  // Pinned horizontal scroll for expertise cards on mobile
  if (expertisePinEl.value && expertiseGridEl.value && window.innerWidth < 1024) {
    const grid = expertiseGridEl.value
    const container = expertisePinEl.value
    const getDistance = () => grid.scrollWidth - container.offsetWidth

    gsap.to(grid, {
      x: () => -getDistance(),
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: expertiseEl.value,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
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

  // How It Works section animation
  if (howItWorksEl.value) {
    const tl3 = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: howItWorksEl.value,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    })

    // Title reveal
    if (howTitleTextEl.value && howTitleBarEl.value) {
      gsap.set(howTitleBarEl.value, { opacity: 0 })
      tl3.to(howTitleTextEl.value, { clipPath: 'inset(0 0 0 0%)', duration: 0.7 }, 0.1)
      tl3.set(howTitleBarEl.value, { opacity: 1 }, 0.1)
      tl3.to(howTitleBarEl.value, { xPercent: -101, duration: 0.7 }, '<')
    }

    // Subtitle fade up
    if (howItWorksTextEl.value) {
      tl3.from(
        howItWorksTextEl.value.querySelectorAll('p'),
        { opacity: 0, y: 20, duration: 0.6 },
        '-=0.4',
      )
    }

    // Step cards — stacking is handled by CSS sticky positioning

    howItWorksTrigger = tl3.scrollTrigger
  }
})

onBeforeUnmount(() => {
  expertiseTrigger?.kill()
  platformTrigger?.kill()
  howItWorksTrigger?.kill()
})

const expertise = [
  {
    title: 'Software Development',
    description: 'Custom platform development, API design, and cloud-native architecture for fintech and entertainment verticals.',
    image: '/images/software-development.webp',
  },
  {
    title: 'Fintech & Payments',
    description: 'Payment processing integration, ACH and card infrastructure, ledger systems, and payout automation for regulated environments.',
    image: '/images/fintech-payments.webp',
  },
  {
    title: 'Game Development',
    description: 'Interactive entertainment software, sweepstakes game logic, RNG systems, and engaging UI/UX for social gaming platforms.',
    image: '/images/game-development.webp',
  },
  {
    title: 'Compliance-First',
    description: 'Geolocation enforcement, KYC/AML integration, jurisdiction-aware access controls, and regulatory reporting built from day one.',
    image: '/images/compliance-first.webp',
  },
]

const steps = [
  { title: 'Discover',         description: 'Analyze user needs, market trends, and business goals to identify opportunities.', featured: false },
  { title: 'Ideate',           description: 'Brainstorm innovative solutions that merge fintech and interactive experiences.', featured: true  },
  { title: 'Design',           description: 'We believe that every customer is unique, and their needs should be addressed accordingly.', featured: false },
  { title: 'Develop & Deploy', description: 'Implement secure, scalable, and high-performing systems. Launch solutions with seamless integration.', featured: false },
  { title: 'Optimize',         description: 'Continuously monitor performance and enhance with data-driven insights.', featured: false },
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
</style>
