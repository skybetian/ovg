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
            class="wwd-connectors pointer-events-none absolute z-0 inset-x-0 top-1/2 -translate-y-1/2 w-full h-6/12 hidden lg:block"
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
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 12C18.7956 12 19.5587 11.6839 20.1213 11.1213C20.6839 10.5587 21 9.79565 21 9V7C21 6.20435 20.6839 5.44129 20.1213 4.87868C19.5587 4.31607 18.7956 4 18 4H6C5.20435 4 4.44129 4.31607 3.87868 4.87868C3.31607 5.44129 3 6.20435 3 7V9C3 9.79565 3.31607 10.5587 3.87868 11.1213C4.44129 11.6839 5.20435 12 6 12M18 12H6M18 12C18.7956 12 19.5587 12.3161 20.1213 12.8787C20.6839 13.4413 21 14.2044 21 15V17C21 17.7956 20.6839 18.5587 20.1213 19.1213C19.5587 19.6839 18.7956 20 18 20H6C5.20435 20 4.44129 19.6839 3.87868 19.1213C3.31607 18.5587 3 17.7956 3 17V15C3 14.2044 3.31607 13.4413 3.87868 12.8787C4.44129 12.3161 5.20435 12 6 12M7 8V8.01M7 16V16.01"/></svg>
          <h3 class="text-xl font-bold text-white mb-3">Platform Development</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            The core platform, player wallet, back
            office, and APIs. Everything an operator
            needs to run the business.
          </p>
        </div>

        <div class="service-card js-left-card rounded-xl p-6 md:p-8 lg:col-start-1 lg:row-start-2">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 15.0003L18.07 19.2843C18.4128 19.645 18.8632 19.8847 19.3538 19.9677C19.8444 20.0506 20.3487 19.9722 20.7909 19.7443C21.2332 19.5163 21.5896 19.1511 21.8067 18.7034C22.0238 18.2557 22.0899 17.7497 21.995 17.2613L20.395 9.0293M8 9V11M7 10H9M14 10H16M15.5002 5C16.8263 5 18.0981 5.52678 19.0358 6.46447C19.9735 7.40215 20.5002 8.67392 20.5002 10C20.5002 11.3261 19.9735 12.5979 19.0358 13.5355C18.0981 14.4732 16.8263 15 15.5002 15H10.0002L5.98524 19.227C5.6418 19.5886 5.19014 19.8288 4.69832 19.9113C4.20651 19.9939 3.70118 19.9143 3.2585 19.6847C2.81582 19.4551 2.45977 19.0878 2.244 18.6382C2.02823 18.1886 1.96444 17.681 2.06224 17.192L3.69624 9.019C3.92305 7.88546 4.53563 6.86553 5.42974 6.13278C6.32384 5.40003 7.44423 4.99973 8.60024 5H15.5002Z"/></svg>
          <h3 class="text-xl font-bold text-white mb-3">Game Development</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            Slots, table games, and live-dealer
            front ends. We handle the RNG, the math,
            and the interface players sit with for
            hours.
          </p>
        </div>

        <div class="service-card js-right-card rounded-xl p-6 md:p-8 lg:col-start-3 lg:row-start-1">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 18C12.5304 18 13.0391 18.2107 13.4142 18.5858C13.7893 18.9609 14 19.4696 14 20C14 20.5304 13.7893 21.0391 13.4142 21.4142C13.0391 21.7893 12.5304 22 12 22C11.4696 22 10.9609 21.7893 10.5858 21.4142C10.2107 21.0391 10 20.5304 10 20C10 19.4696 10.2107 18.9609 10.5858 18.5858C10.9609 18.2107 11.4696 18 12 18ZM12 18V14M12 6C11.4696 6 10.9609 5.78929 10.5858 5.41421C10.2107 5.03914 10 4.53043 10 4C10 3.46957 10.2107 2.96086 10.5858 2.58579C10.9609 2.21071 11.4696 2 12 2C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4C14 4.53043 13.7893 5.03914 13.4142 5.41421C13.0391 5.78929 12.5304 6 12 6ZM12 6V10M6 12C6 11.4696 5.78929 10.9609 5.41421 10.5858C5.03914 10.2107 4.53043 10 4 10C3.46957 10 2.96086 10.2107 2.58579 10.5858C2.21071 10.9609 2 11.4696 2 12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14C4.53043 14 5.03914 13.7893 5.41421 13.4142C5.78929 13.0391 6 12.5304 6 12ZM6 12H10M18 12C18 11.4696 18.2107 10.9609 18.5858 10.5858C18.9609 10.2107 19.4696 10 20 10C20.5304 10 21.0391 10.2107 21.4142 10.5858C21.7893 10.9609 22 11.4696 22 12C22 12.5304 21.7893 13.0391 21.4142 13.4142C21.0391 13.7893 20.5304 14 20 14C19.4696 14 18.9609 13.7893 18.5858 13.4142C18.2107 13.0391 18 12.5304 18 12ZM18 12H14M14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10M14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14M12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12M10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14"/></svg>
          <h3 class="text-xl font-bold text-white mb-3">Game Aggregation</h3>
          <p class="text-cool-gray text-sm leading-relaxed">
            One integration, many studios. A single
            API, one wallet, and reporting you can
            read in one place.
          </p>
        </div>

        <div class="service-card js-right-card rounded-xl p-6 md:p-8 lg:col-start-3 lg:row-start-2">
          <svg class="service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.0008 21C10.444 20.5962 8.98429 19.8836 7.70836 18.9045C6.43242 17.9254 5.36632 16.6998 4.57341 15.3005C3.78049 13.9013 3.27694 12.3569 3.09269 10.7592C2.90843 9.16147 3.04722 7.54302 3.50081 6C6.61634 6.14257 9.66498 5.06658 12.0008 3C14.3366 5.06658 17.3853 6.14257 20.5008 6C20.9544 7.54302 21.0932 9.16147 20.9089 10.7592C20.7247 12.3569 20.2211 13.9013 19.4282 15.3005C18.6353 16.6998 17.5692 17.9254 16.2933 18.9045C15.0173 19.8836 13.5576 20.5962 12.0008 21ZM12.0008 3V21M3.5 12H20.5"/></svg>
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
