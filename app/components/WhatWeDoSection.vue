<template>
  <section ref="sectionEl" class="bg-navy py-24 md:py-36">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      <div class="text-center mb-12 md:mb-16">
        <SectionHeading eyebrow="Our Services" title="What We Do" />
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
          <img
            src="/images/ovg-monogram.webp"
            alt="One Visaya Gaming monogram"
            width="460"
            height="460"
            loading="lazy"
            decoding="async"
            class="wwd-badge relative z-10 w-full max-w-[190px] sm:max-w-[260px] md:max-w-[300px] h-auto"
          />
          <!-- Connector lines (desktop only) -->
          <svg
            class="pointer-events-none absolute z-0 inset-x-0 top-1/2 -translate-y-1/2 w-full h-6/12 hidden lg:block"
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
              stroke="#3A0B52"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              class="connector-ray"
              d="M212.687 180.734L421.938 6.47184"
              stroke="#3A0B52"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              class="connector-ray"
              d="M212.687 180.734L421.938 364.29"
              stroke="#3A0B52"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              class="connector-ray"
              d="M212.687 180.734L4.18447 364.29"
              stroke="#3A0B52"
              stroke-width="2"
              stroke-linecap="round"
            />

            <path
              class="connector-pulse"
              d="M212.687 180.734L1.93848 2.28955"
              stroke="#FF4D97"
              stroke-width="2.5"
              stroke-linecap="round"
              filter="url(#pulse-glow)"
            />
            <path
              class="connector-pulse"
              d="M212.687 180.734L421.938 6.47184"
              stroke="#FF4D97"
              stroke-width="2.5"
              stroke-linecap="round"
              filter="url(#pulse-glow)"
            />
            <path
              class="connector-pulse"
              d="M212.687 180.734L421.938 364.29"
              stroke="#FF4D97"
              stroke-width="2.5"
              stroke-linecap="round"
              filter="url(#pulse-glow)"
            />
            <path
              class="connector-pulse"
              d="M212.687 180.734L4.18447 364.29"
              stroke="#FF4D97"
              stroke-width="2.5"
              stroke-linecap="round"
              filter="url(#pulse-glow)"
            />
          </svg>
        </div>

        <div class="service-card js-left-card rounded-xl p-6 md:p-8 lg:col-start-1 lg:row-start-1">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01"/></svg>
          <h3 class="text-xl font-bold text-white mb-3">Platform Development</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            The core platform, player wallet, back
            office, and APIs. Everything an operator
            needs to run the business.
          </p>
        </div>

        <div class="service-card js-left-card rounded-xl p-6 md:p-8 lg:col-start-1 lg:row-start-2">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 12h4M9 10v4"/><circle cx="15.5" cy="11" r="1"/><circle cx="17.5" cy="13.5" r="1"/><path d="M17.9 6H6.1a4 4 0 0 0-3.9 3.2l-1 5A3.4 3.4 0 0 0 4.5 18c1 0 1.9-.5 2.5-1.3L8.5 15h7l1.5 1.7c.6.8 1.5 1.3 2.5 1.3a3.4 3.4 0 0 0 3.3-3.8l-1-5A4 4 0 0 0 17.9 6Z"/></svg>
          <h3 class="text-xl font-bold text-white mb-3">Game Development</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            Slots, table games, and live-dealer
            front ends. We handle the RNG, the math,
            and the interface players sit with for
            hours.
          </p>
        </div>

        <div class="service-card js-right-card rounded-xl p-6 md:p-8 lg:col-start-3 lg:row-start-1">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="2.6"/><path d="M12 3v6.4M12 14.6V21M3 12h6.4M14.6 12H21"/><circle cx="12" cy="3" r="1.4"/><circle cx="12" cy="21" r="1.4"/><circle cx="3" cy="12" r="1.4"/><circle cx="21" cy="12" r="1.4"/></svg>
          <h3 class="text-xl font-bold text-white mb-3">Game Aggregation</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            One integration, many studios. A single
            API, one wallet, and reporting you can
            read in one place.
          </p>
        </div>

        <div class="service-card js-right-card rounded-xl p-6 md:p-8 lg:col-start-3 lg:row-start-2">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5 6v5.5c0 4.3 2.9 8.3 7 9.5 4.1-1.2 7-5.2 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>
          <h3 class="text-xl font-bold text-white mb-3">Compliance-First</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            Player verification, responsible gaming
            tools, and reporting an auditor can
            follow. Built to the PAGCOR codes of
            conduct, not bolted on later.
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
const cardsGridEl = ref<HTMLElement>()
const centerImageEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined
let mobileProgressTrigger: ScrollTrigger | undefined
const cardCleanups: Array<() => void> = []
const pulseTweens: gsap.core.Tween[] = []

onMounted(() => {
  if (!sectionEl.value) return

  // Reduced motion: no reveal, no ray pulses — land on the finished state
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    sectionEl.value.querySelectorAll<HTMLElement>('.connector-pulse')
      .forEach((el) => { el.style.display = 'none' })
    return
  }

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
      toggleActions: 'play none none none',
    },
  })



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
        toggleActions: 'play none none none',
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
/* Line icons take their colour from the brand token — no more blue rasters. */
.service-icon {
  width: 2.5rem;
  height: 2.5rem;
  margin-bottom: 1.25rem;
  color: var(--color-primary);
  transition: color 0.3s ease, transform 0.3s ease;
}
.service-card:hover .service-icon {
  color: var(--color-coral);
  transform: translateY(-2px);
}

.service-card {
  --mx: 50;
  --my: 50;
  position: relative;
  isolation: isolate;
  /* card must read against bg-navy without leaning on the pink — lift it and edge it */
  background: #1F0632;
  border: 1px solid rgba(255, 255, 255, 0.09);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    0 12px 28px -18px rgba(0, 0, 0, 0.9);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

/* magenta spotlight is held at zero until hover — it tracks the cursor via --mx/--my */
.service-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  pointer-events: none;
  /* tight pool that follows the cursor; fades to transparent so the card
     colour underneath shows rather than being painted over */
  background: radial-gradient(
    38% 60% at calc(var(--mx) * 1%) calc(var(--my) * 1%),
    rgba(237, 24, 121, 0.5) 0%,
    rgba(180, 12, 139, 0.2) 45%,
    transparent 78%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}
.service-card:hover::before {
  opacity: 1;
}
.service-card:hover {
  border-color: rgba(237, 24, 121, 0.35);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.06) inset,
    0 10px 30px -10px rgba(180, 12, 139, 0.6);
}
</style>
