<template>
  <section class="relative bg-navy py-20 md:py-28 overflow-hidden">
    <!-- brand wash, so the band reads apart from the studio row above without
         another solid colour -->
    <div aria-hidden="true" class="aggregator-wash" />

    <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
      <div class="text-center mb-12">
        <SectionHeading
          eyebrow="Strategic Partners"
          :title="title"
          size-class="text-3xl md:text-4xl lg:text-5xl"
        />
      </div>

      <!-- spotlit rather than set in the row of equal tiles the studios share.
           One partner centres on its own; more of them wrap into a row without
           any other change. -->
      <div ref="rootEl" :class="['spotlight', { 'is-in': shown }]">
        <div aria-hidden="true" class="divider">
          <span class="divider-line" />
          <span class="divider-mark" />
          <span class="divider-line" />
        </div>

        <div class="logo-row">
          <div
            v-for="(aggregator, i) in aggregators"
            :key="aggregator.name"
            class="logo-halo"
            :style="{ '--i': i }"
          >
            <img
              :src="aggregator.logo"
              :alt="aggregator.name"
              width="300"
              height="113"
              class="relative z-10 h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Add an entry and the heading and layout both follow — nothing here is
// written for exactly one partner.
const aggregators = [
  { name: 'Sanatech', logo: '/images/sanatech.webp' },
]

const title = computed(() =>
  aggregators.length === 1 ? 'Our Game Aggregator' : 'Our Game Aggregators',
)

// IntersectionObserver over ScrollTrigger: the partner logos load lazily and
// shift this section after mount, which left a scrub-free reveal measuring a
// stale start and never firing at all.
const rootEl = ref<HTMLElement>()
const shown = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!rootEl.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      shown.value = true
      observer?.disconnect()
    },
    { rootMargin: '0px 0px -12% 0px' },
  )
  observer.observe(rootEl.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.aggregator-wash {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 55% 65% at 50% 60%,
    rgba(237, 24, 121, 0.13) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.spotlight {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* the rule first, then each mark in turn */
.divider,
.logo-halo {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.logo-halo {
  transition-delay: calc(110ms + var(--i) * 120ms);
}
.spotlight.is-in .divider,
.spotlight.is-in .logo-halo {
  opacity: 1;
  transform: translateY(0);
}

.divider {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: min(20rem, 100%);
  margin-bottom: 3rem;
}
.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--color-primary) 100%);
}
.divider-line:last-child {
  background: linear-gradient(90deg, var(--color-primary) 0%, transparent 100%);
}
/* small brand lozenge holding the centre of the rule */
.divider-mark {
  width: 0.5rem;
  height: 0.5rem;
  flex-shrink: 0;
  transform: rotate(45deg);
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-coral) 100%
  );
}

.logo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* wide enough that two halos never bleed into each other */
  gap: 2.5rem 4rem;
}

.logo-halo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-halo img {
  width: 15rem;
}
/* wide and soft, so it lights the mark rather than outlining it */
.logo-halo::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 190%;
  height: 320%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    ellipse at center,
    rgba(237, 24, 121, 0.3) 0%,
    rgba(237, 24, 121, 0.1) 38%,
    transparent 68%
  );
  pointer-events: none;
}

/* a lone partner gets the full spotlight; a row of them stays legible instead */
.logo-row:has(.logo-halo:only-child) img {
  width: 20rem;
}

@media (max-width: 639px) {
  .logo-halo img,
  .logo-row:has(.logo-halo:only-child) img {
    width: 15rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .divider,
  .logo-halo {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
</style>
