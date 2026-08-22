<template>
  <div>
    <!-- Travels from off-screen top-left, across the pinned Who We Are section,
         and lands on the What We Do badge, which stays hidden until it arrives. -->
    <img
      ref="flyerEl"
      src="/images/ovg-monogram.webp"
      alt=""
      aria-hidden="true"
      width="460"
      height="460"
      class="logo-flyer"
    />

    <HeroSection />
    <WhoWeAreSection />
    <WhatWeDoSection />
    <WhyWeAreBestSection />
    <TestimonialSection />
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const flyerEl = ref<HTMLElement>()
const mm = gsap.matchMedia()

onMounted(() => {
  // the flight only makes sense while Who We Are is pinned, which is lg+ only
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const flyer = flyerEl.value
    const badge = document.querySelector<HTMLElement>('.wwd-badge')
    const whoWeAre = document.querySelectorAll('section')[1] as HTMLElement | undefined
    if (!flyer || !badge || !whoWeAre) return

    // the rays point at the badge, so they stay hidden until it has landed
    const connectors = document.querySelector<HTMLElement>('.wwd-connectors')
    gsap.set([badge, connectors].filter(Boolean), { opacity: 0 })

    // The badge's resting spot on screen: its own x (unaffected by scroll) and
    // vertically centred, which is where trigger B fires.
    const restX = () => badge.getBoundingClientRect().left
    const restY = () => (window.innerHeight - badge.offsetHeight) / 2
    const restScale = () => badge.offsetWidth / flyer.offsetWidth

    // A — the flight, tied to the Who We Are pin. Its own range, so no
    // dependency on where the badge sits in the document.
    // it departs from the navbar mark: same spot, same size, so at rest it
    // simply sits on top of the one already there
    const navLogo = document.querySelector<HTMLElement>('.nav-logo')
    const startX = () => navLogo?.getBoundingClientRect().left ?? 0
    const startY = () => navLogo?.getBoundingClientRect().top ?? 0
    // the wordmark's monogram is square at its left, so its height is its width
    const startScale = () => (navLogo?.offsetHeight ?? 40) / flyer.offsetWidth

    // Driven through a proxy rather than tweening x/y directly: the path
    // serpentines across the viewport while descending, and every point is
    // recomputed per frame so it holds at any viewport size.
    // No rotation: with transform-origin at top-left it shifts the element's
    // box, and the landing has to line up with the badge exactly.
    const SWEEPS = 1.5
    const proxy = { t: 0 }
    // the scrub keeps running for a moment after the handoff fires, so drawPath
    // would otherwise re-show the flyer it had just hidden
    let landed = false

    const drawPath = () => {
      const t = proxy.t
      const sx = startX(), sy = startY()
      const ex = restX(), ey = restY()

      const base = sx + (ex - sx) * t

      // taper to zero at both ends, so it still departs from the nav mark
      // and lands on the badge despite the detour
      // flat-topped: full width for nearly the whole flight, collapsing only
      // at the very ends where it has to meet the two fixed points
      const taper = Math.min(1, Math.sin(Math.PI * t) * 3.2)
      const wave = Math.sin(Math.PI * 2 * SWEEPS * t)

      // depth: swings toward the viewer through the middle and settles back to
      // the badge's size. The multiplier is 1 at both ends, so it lands exact.
      const depth = 1 + 0.28 * Math.sin(Math.PI * t)
      const scale = (startScale() + (restScale() - startScale()) * t) * depth

      // aim at the actual screen edge rather than offsetting by a fixed amount:
      // the straight line is off-centre, so one amplitude cannot reach both sides
      const rendered = flyer.offsetWidth * scale
      const edge = wave >= 0 ? window.innerWidth - rendered : 0

      gsap.set(flyer, {
        x: base + (edge - base) * Math.abs(wave) * taper,
        y: sy + (ey - sy) * t,
        scale,
        // hidden at rest, on the instant the flight starts — no fade in
        // banks into each turn. Multiplied by taper so it is exactly 0 at both
        // ends — a rotated logo would not line up with the badge underneath.
        rotate: -wave * 20 * taper,
        opacity: landed || t === 0 ? 0 : 1,
      })
    }

    // B — the handoff, tied to the badge itself. Measuring "has the badge
    // reached the middle of the screen" needs no pin arithmetic, so this one
    // resolves to the right scroll position where endTrigger did not.
    // Created first so the flight can borrow its start as an end point.
    const handoff = ScrollTrigger.create({
      trigger: badge,
      start: 'center center',
      // negative: refresh AFTER the Who We Are pin (priority 0) has added its
      // spacer, otherwise the badge is measured at its unpinned position
      refreshPriority: -1,
      onEnter: () => {
        landed = true
        gsap.set(flyer, { opacity: 0 })
        gsap.set([badge, connectors].filter(Boolean), { opacity: 1 })
      },
      onLeaveBack: () => {
        landed = false
        gsap.set(flyer, { opacity: 1 })
        gsap.set([badge, connectors].filter(Boolean), { opacity: 0 })
      },
    })

    const flight = gsap.to(proxy, {
      t: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: whoWeAre,
        start: 'top top',
        // run right up to the handoff instead of stopping at the end of the
        // pin, which left the logo parked for the scroll in between
        end: () => handoff.start,
        scrub: 1.2,
        invalidateOnRefresh: true,
        // lower still: needs handoff.start already resolved
        refreshPriority: -2,
      },
      onUpdate: drawPath,
    })

    drawPath()

    // lazy images below settle after mount and shift every measurement
    nextTick(() => requestAnimationFrame(() => ScrollTrigger.refresh()))

    return () => {
      flight.scrollTrigger?.kill()
      handoff.kill()
      gsap.set([badge, connectors].filter(Boolean), { clearProps: 'opacity' })
    }
  })
})

onBeforeUnmount(() => {
  mm.revert()
})
</script>

<style scoped>
/* fixed: the flight is read against the viewport, not the document, so it can
   cross a pinned section and still line up with an element further down */
.logo-flyer {
  position: fixed;
  top: 0;
  left: 0;
  /* above the navbar (z-50): it starts on the navbar mark, and the navbar's
     translucent background would otherwise dim it there */
  z-index: 60;
  width: 300px;
  height: auto;
  pointer-events: none;
  opacity: 0;
  transform-origin: top left;
  will-change: transform, opacity;
}
</style>
