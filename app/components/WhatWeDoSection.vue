<template>
  <section ref="sectionEl" class="bg-navy py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      <div ref="headingEl" class="text-center mb-12 md:mb-16">
        <p class="text-cool-gray font-medium text-sm mb-2">Our Services</p>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-outfit">
          <span class="reveal">
            <span ref="titleTextEl" class="reveal-text">What We Do</span>
            <span ref="titleBarEl" class="reveal-bar" />
          </span>
        </h2>
      </div>

      <div ref="cardsGridEl" class="relative isolate grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-6 md:gap-8 items-center">
        <!-- Mobile-only vertical connector line from image down through all cards -->
        <svg
          class="pointer-events-none -z-10 absolute left-1/2 -translate-x-1/2 top-40 bottom-0 w-1 sm:hidden overflow-visible"
          viewBox="0 0 4 1000"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <filter
              id="mobile-progress-glow"
              filterUnits="userSpaceOnUse"
              x="-50"
              y="-20"
              width="104"
              height="1040"
            >
              <feGaussianBlur stdDeviation="2" result="blur1" />
              <feGaussianBlur stdDeviation="6" in="SourceGraphic" result="blur2" />
              <feGaussianBlur stdDeviation="14" in="SourceGraphic" result="blur3" />
              <feMerge>
                <feMergeNode in="blur3" />
                <feMergeNode in="blur3" />
                <feMergeNode in="blur2" />
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line
            class="mobile-progress"
            x1="2"
            y1="0"
            x2="2"
            y2="1000"
            stroke="#FFFFFF"
            stroke-width="2"
            stroke-linecap="round"
            filter="url(#mobile-progress-glow)"
          />
        </svg>

        <!-- Image: mobile = top; sm/md = full-width on top; lg = center column spanning both rows -->
        <div
          ref="centerImageEl"
          class="flex justify-center sm:col-span-2 sm:absolute sm:z-10 sm:w-full lg:static lg:z-auto lg:w-auto lg:col-span-1 lg:col-start-2 lg:row-span-2"
        >
          <picture class="z-10">
            <source
              media="(min-width: 640px)"
              srcset="/images/what-we-do-logo.png"
            />
            <img
              src="/images/what-we-do-logo-small.png"
              alt="logo"
              class="w-full max-w-[200px] sm:max-w-xs md:max-w-sm object-cover z-10"
            />
          </picture>
          <!-- Connector lines (desktop only) -->
          <svg
            class="pointer-events-none absolute z-0 inset-x-0 top-1/2 -translate-y-1/2 w-full scale-120 h-6/12 hidden lg:block"
            viewBox="0 0 424 367"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="pulse-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="2" result="blur1" />
                <feGaussianBlur stdDeviation="6" in="SourceGraphic" result="blur2" />
                <feGaussianBlur stdDeviation="14" in="SourceGraphic" result="blur3" />
                <feMerge>
                  <feMergeNode in="blur3" />
                  <feMergeNode in="blur3" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              class="connector-ray"
              d="M212.687 180.734L1.93848 2.28955"
              stroke="#142453"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              class="connector-ray"
              d="M212.687 180.734L421.938 6.47184"
              stroke="#142453"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              class="connector-ray"
              d="M212.687 180.734L421.938 364.29"
              stroke="#142453"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              class="connector-ray"
              d="M212.687 180.734L4.18447 364.29"
              stroke="#142453"
              stroke-width="2"
              stroke-linecap="round"
            />

            <path
              class="connector-pulse"
              d="M212.687 180.734L1.93848 2.28955"
              stroke="#7DD3FC"
              stroke-width="2.5"
              stroke-linecap="round"
              filter="url(#pulse-glow)"
            />
            <path
              class="connector-pulse"
              d="M212.687 180.734L421.938 6.47184"
              stroke="#7DD3FC"
              stroke-width="2.5"
              stroke-linecap="round"
              filter="url(#pulse-glow)"
            />
            <path
              class="connector-pulse"
              d="M212.687 180.734L421.938 364.29"
              stroke="#7DD3FC"
              stroke-width="2.5"
              stroke-linecap="round"
              filter="url(#pulse-glow)"
            />
            <path
              class="connector-pulse"
              d="M212.687 180.734L4.18447 364.29"
              stroke="#7DD3FC"
              stroke-width="2.5"
              stroke-linecap="round"
              filter="url(#pulse-glow)"
            />
          </svg>
        </div>

        <div class="service-card js-left-card rounded-xl p-6 md:p-8 lg:col-start-1 lg:row-start-1">
          <img src="/images/pc-icon.png" alt="" class="w-10 h-10 mb-5" />
          <h3 class="text-xl font-bold text-white mb-3">Software Development</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            Custom platform development, API
            design, and cloud-native
            architecture for fintech and
            entertainment verticals.
          </p>
        </div>

        <div class="service-card js-left-card rounded-xl p-6 md:p-8 lg:col-start-1 lg:row-start-2">
          <img src="/images/plant-icon.png" alt="" class="w-10 h-10 mb-5" />
          <h3 class="text-xl font-bold text-white mb-3">Game Development</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            Interactive entertainment
            software, sweepstakes game
            logic, RNG systems, and
            engaging UI/UX for social
            gaming platforms.
          </p>
        </div>

        <div class="service-card js-right-card rounded-xl p-6 md:p-8 lg:col-start-3 lg:row-start-1">
          <img src="/images/tags-icon.png" alt="" class="w-10 h-10 mb-5" />
          <h3 class="text-xl font-bold text-white mb-3">Fintech &amp; Payments</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            Payment processing integration,
            ACH and card infrastructure, ledger
            systems, and payout automation for
            compliant environments.
          </p>
        </div>

        <div class="service-card js-right-card rounded-xl p-6 md:p-8 lg:col-start-3 lg:row-start-2">
          <img src="/images/cs-icon.png" alt="" class="w-10 h-10 mb-5" />
          <h3 class="text-xl font-bold text-white mb-3">Compliance-First</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            Geolocation enforcement, KYC/AML
            integration, jurisdiction-aware access
            controls, and regulatory reporting built
            from the ground up.
          </p>
        </div>
      </div>
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
const cardsGridEl = ref<HTMLElement>()
const centerImageEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined
let mobileProgressTrigger: ScrollTrigger | undefined
const cardCleanups: Array<() => void> = []
const pulseTweens: gsap.core.Tween[] = []

onMounted(() => {
  if (!sectionEl.value) return

  sectionEl.value.querySelectorAll<HTMLElement>('.service-card').forEach((card) => {
    const xTo = gsap.quickTo(card, '--mx', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(card, '--my', { duration: 0.5, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      xTo(((e.clientX - rect.left) / rect.width) * 100)
      yTo(((e.clientY - rect.top) / rect.height) * 100)
    }
    const onLeave = () => {
      gsap.to(card, {
        '--mx': 50,
        '--my': 50,
        duration: 0.6,
        ease: 'power3.out',
      })
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    cardCleanups.push(() => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    })
  })

  // Connector line draw setup (desktop only — SVG is hidden on mobile)
  const isDesktop = window.innerWidth >= 1024
  const rays = isDesktop && cardsGridEl.value
    ? Array.from(cardsGridEl.value.querySelectorAll<SVGPathElement>('.connector-ray'))
    : []
  rays.forEach((ray) => {
    const len = ray.getTotalLength()
    gsap.set(ray, {
      strokeDasharray: len,
      strokeDashoffset: len,
    })
  })

  // Mobile vertical progress line — always set up (CSS hides it at sm+)
  const mobileProgress = cardsGridEl.value?.querySelector<SVGLineElement>('.mobile-progress') ?? null
  // Use the viewBox y range as the dash length so this works even when the
  // SVG is briefly hidden at mount (getTotalLength can return 0 then).
  const MOBILE_PROGRESS_LEN = 1000
  if (mobileProgress) {
    gsap.set(mobileProgress, {
      attr: {
        'stroke-dasharray': `${MOBILE_PROGRESS_LEN} ${MOBILE_PROGRESS_LEN}`,
        'stroke-dashoffset': MOBILE_PROGRESS_LEN,
      },
    })
  }

  // Hide pulses until rays finish drawing in. Pre-configure them as a hidden
  // traveling dash so they don't briefly render as full strokes.
  const pulses = isDesktop && cardsGridEl.value
    ? Array.from(cardsGridEl.value.querySelectorAll<SVGPathElement>('.connector-pulse'))
    : []
  const PULSE_DASH_LEN = 24
  const pulseLengths = pulses.map((pulse) => pulse.getTotalLength())
  pulses.forEach((pulse, i) => {
    const len = pulseLengths[i]!
    gsap.set(pulse, {
      opacity: 0,
      strokeDasharray: `${PULSE_DASH_LEN} ${len}`,
      strokeDashoffset: len + PULSE_DASH_LEN,
    })
  })

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: sectionEl.value,
      start: '15% 75%',
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

  if (cardsGridEl.value) {
    if (isDesktop) {
      // lg+ cross layout: cards slide in from their respective sides
      const leftCards = cardsGridEl.value.querySelectorAll('.js-left-card')
      const rightCards = cardsGridEl.value.querySelectorAll('.js-right-card')

      if (leftCards.length) {
        tl.from(
          leftCards,
          { opacity: 0, x: -120, duration: 0.8, stagger: 0.25 },
          '-=0.3',
        )
      }
      if (rightCards.length) {
        tl.from(
          rightCards,
          { opacity: 0, x: 120, duration: 0.8, stagger: 0.25 },
          '<',
        )
      }
    } else {
      // mobile / tablet: cards rise into place
      const allCards = cardsGridEl.value.querySelectorAll('.service-card')
      if (allCards.length) {
        tl.from(
          allCards,
          { opacity: 0, y: 60, duration: 0.7, stagger: 0.12 },
          '-=0.3',
        )
      }
    }
  }

  if (centerImageEl.value) {
    tl.from(
      centerImageEl.value,
      {
        opacity: 0,
        scale: 0.4,
        transformOrigin: 'center center',
        duration: 1,
        ease: 'back.out(1.6)',
      },
      '<',
    )
  }

  if (rays.length) {
    tl.to(
      rays,
      {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: 'power2.out',
        stagger: 0.08,
      },
      '-=0.6',
    )

    if (pulses.length) {
      // Fade pulses in once the rays have finished drawing
      tl.to(
        pulses,
        { opacity: 1, duration: 0.4, ease: 'power1.out' },
        '+=0.1',
      )

      // Continuous "signal" pulses traveling from each card corner toward the center
      tl.add(() => {
        pulses.forEach((pulse, i) => {
          const len = pulseLengths[i]!
          const tween = gsap.fromTo(
            pulse,
            { strokeDashoffset: len + PULSE_DASH_LEN },
            {
              strokeDashoffset: -PULSE_DASH_LEN,
              duration: 1.8,
              ease: 'power1.in',
              repeat: -1,
              repeatDelay: 1.2,
              delay: i * 0.25,
            },
          )
          pulseTweens.push(tween)
        })
      })
    }
  }

  trigger = tl.scrollTrigger

  // Mobile: scrub the vertical progress line based on scroll position.
  // CSS hides the SVG at sm+, so the animation is invisible there but still
  // valid — no extra gating required.
  if (mobileProgress && cardsGridEl.value) {
    // Start invisible so it doesn't compete with the card reveal animation
    gsap.set(mobileProgress, { opacity: 0 })

    // Fade the line in once the section is well into view (after card reveal)
    gsap.to(mobileProgress, {
      opacity: 1,
      duration: 0.4,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: cardsGridEl.value,
        start: 'top 40%',
        toggleActions: 'play none none reverse',
      },
    })

    // Scrub the dashoffset based on scroll, starting after the card reveal
    const progressTween = gsap.fromTo(
      mobileProgress,
      { attr: { 'stroke-dashoffset': MOBILE_PROGRESS_LEN } },
      {
        attr: { 'stroke-dashoffset': 0 },
        ease: 'none',
        scrollTrigger: {
          trigger: cardsGridEl.value,
          start: 'top 40%',
          end: 'bottom 30%',
          scrub: 3,
          invalidateOnRefresh: true,
        },
      },
    )
    mobileProgressTrigger = progressTween.scrollTrigger
  }

  // Force ScrollTrigger to recompute positions once Vue/images settle.
  // Without this, the line's start/end can be wrong on first paint and only
  // correct themselves when something triggers a resize event.
  
  nextTick(() => ScrollTrigger.refresh())
  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  }
})

onBeforeUnmount(() => {
  trigger?.kill()
  mobileProgressTrigger?.kill()
  cardCleanups.forEach((fn) => fn())
  pulseTweens.forEach((t) => t.kill())
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
.service-card {
  --mx: 50;
  --my: 50;
  position: relative;
  background:
    radial-gradient(120% 100% at calc(var(--mx) * 1%) calc(var(--my) * 1%), rgb(5 37 131) 0%, rgba(9, 20, 37, 0.77) 55%),
    var(--color-navy-light);
  border: 1px solid rgba(142, 179, 239, 0.15);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.service-card:hover {
  border-color: rgba(142, 179, 239, 0.35);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    0 10px 30px -10px rgba(14, 47, 146, 0.6);
}
</style>
