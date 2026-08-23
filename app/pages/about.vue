<template>
  <div>
    <!-- Hero -->
    <PageHero
      title="About Us"
      paragraph="Learn more about our mission, vision, and the people building One Visaya Gaming."
      cta-to="#company-overview"
      cta-label="Discover More"
      image="/images/about-us.webp"
      image-alt="Golden globe surrounded by casino chips, dice and card suits"
      bg-image="/images/about-us-section.webp"
    />

    <!-- Company Overview -->
    <section id="company-overview" ref="overviewEl" class="bg-navy py-24">
      <div class="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div ref="overviewTextEl">
          <SectionHeading
            title="Company Overview"
            align="left"
            size-class="text-4xl md:text-5xl"
            class="mb-8"
          />
          <p class="text-white/70 text-base leading-relaxed mb-6">
            One Visaya Gaming Corporation (OVGC) is a dynamic and
            technology-driven gaming company dedicated to shaping the
            future of digital gaming through innovative technology,
            diverse gaming content, and trusted solutions. Built with
            a global outlook, OVGC brings together technology,
            content, and operational expertise to provide a
            comprehensive gaming ecosystem that enables business
            partners to scale, compete, and thrive in an increasingly
            connected market.
          </p>
          <p class="text-white/70 text-base leading-relaxed mb-6">
            With a strong focus on innovation, security, scalability,
            reliability, and operational excellence, OVGC develops and
            delivers solutions designed to meet the evolving needs of
            gaming businesses and players. Through strategic
            partnerships and access to diverse gaming content, the
            company creates seamless and engaging experiences while
            enabling its partners to efficiently expand their
            offerings and reach new opportunities.
          </p>
          <p class="text-white/70 text-base leading-relaxed">
            OVGC is committed to building long-term partnerships
            founded on trust, performance, and shared growth. By
            continuously evolving its technology, expanding its
            content ecosystem, and maintaining high standards of
            service and responsible operations, OVGC aims to establish
            itself as a leading global force in interactive gaming
            technology and a trusted partner in the international
            digital gaming industry.
          </p>
        </div>

        <div ref="overviewImageEl" class="flex justify-center lg:justify-start lg:items-start lg:order-first">
          <img
            src="/images/company-overview.webp"
            alt="Glass office towers seen from below against a blue sky"
            class="w-full max-w-lg rounded-lg shadow-2xl lg:sticky lg:top-28"
          />
        </div>
      </div>
    </section>

    <WhyWeAreBestSection :show-read-more="false" />

    <!-- Our Values: VISION acronym -->
    <section ref="valuesEl" class="bg-navy py-24">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="text-center mb-12 md:mb-16">
          <SectionHeading eyebrow="What Drives Us" title="Our Values" />
        </div>

        <div ref="valuesGridEl" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-6 md:gap-8">
          <div
            v-for="value in values"
            :key="value.name"
            class="value-card border border-white/10 rounded-xl p-6 md:p-8"
          >
            <span aria-hidden="true" class="value-watermark font-outfit">{{ value.name[0] }}</span>
            <h3 class="value-name text-2xl md:text-3xl font-bold mb-3 font-outfit">{{ value.name }}</h3>
            <p class="text-cool-gray text-sm leading-relaxed">{{ value.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline: company milestones -->
    <section ref="timelineEl" class="bg-navy-dark py-24">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="text-center mb-12 md:mb-16">
          <SectionHeading eyebrow="Our Journey" title="Timeline" />
        </div>

        <div ref="timelineListEl" class="relative">
          <!-- faint track, then the primary progress line drawn over it as you scroll -->
          <div aria-hidden="true" class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
          <div aria-hidden="true" class="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary -translate-x-1/2" />

          <div
            v-for="(milestone, i) in milestones"
            :key="milestone.year"
            class="timeline-item relative pl-12 md:pl-0 mb-12 last:mb-0 md:flex md:items-start md:gap-12"
            :class="i % 2 === 1 ? 'md:flex-row-reverse' : ''"
          >
            <span aria-hidden="true" class="timeline-dot absolute left-4 top-1.5 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2" />

            <div class="md:w-1/2" :class="i % 2 === 1 ? 'md:text-left' : 'md:text-right'">
              <span class="timeline-year grad-line text-2xl md:text-3xl font-bold font-outfit">{{ milestone.year }}</span>
              <h3 class="text-lg md:text-xl font-semibold text-white mt-1 mb-2 font-outfit">{{ milestone.title }}</h3>
              <p class="text-cool-gray text-sm leading-relaxed">{{ milestone.body }}</p>
            </div>

            <div class="hidden md:block md:w-1/2" />
          </div>
        </div>
      </div>
    </section>

    <!-- LeadersSection removed: bios/photos belong to the previous brand's leadership. Restore once OVG supplies its own team. -->
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useSeoMeta({
  title: 'About OVGC',
  description: 'Learn about One Visaya Gaming Corporation (OVGC): our mission, values, and journey building trusted, PAGCOR-compliant gaming technology since 2022.',
})

const overviewEl = ref<HTMLElement>()
const overviewTextEl = ref<HTMLElement>()
const overviewImageEl = ref<HTMLElement>()

const valuesEl = ref<HTMLElement>()
const valuesGridEl = ref<HTMLElement>()

const timelineEl = ref<HTMLElement>()
const timelineListEl = ref<HTMLElement>()

// VISION acronym — the first letter of each name is styled by ::first-letter
const values = [
  { name: 'Value Creation', body: 'We create meaningful, sustainable value for our partners, players, and stakeholders through solutions built for long-term growth.' },
  { name: 'Innovation', body: 'We continuously challenge convention, embrace emerging technologies, and develop smarter ways to advance the gaming experience.' },
  { name: 'Security & Integrity', body: 'We operate with trust, transparency, accountability, and uncompromising commitment to security and responsible business practices.' },
  { name: 'Inclusivity & Collaboration', body: 'We build strong partnerships, embrace diverse perspectives, and create an ecosystem where people, businesses, and ideas can thrive together.' },
  { name: 'Operational Excellence', body: 'We pursue excellence in everything we do, delivering reliable, efficient, scalable, and consistently high-quality solutions.' },
  { name: 'Next-Generation Thinking', body: 'We anticipate the future, adapt to a rapidly evolving industry, and continuously position OVGC and its partners for what comes next.' },
]

const milestones = [
  { year: '2022', title: 'Foundation', body: 'OVGC was incorporated with the Securities and Exchange Commission (SEC), marking the beginning of its journey to build a globally driven gaming technology company.' },
  { year: '2023', title: 'Accreditation & First Gaming Brand', body: 'OVGC secured its accreditation with PAGCOR as a Gaming System Administrator, establishing a strong foundation in gaming technology and infrastructure. The company subsequently launched and operated its first gaming brand, marking a significant milestone in its growth and expansion.' },
  { year: '2024 & 2025', title: 'Game Content Provider & Global Partnerships', body: 'OVGC expanded its gaming ecosystem by establishing strategic partnerships with Evolution and Sexy as Live Studio providers, broadening its premium gaming content and strengthening its global content network.' },
  { year: '2026', title: 'Live Studio Expansion & New Brands', body: 'OVGC continues to expand its Live Studio capabilities to serve the evolving needs of the gaming industry, while preparing to launch new brands and further strengthen its presence in the global gaming market.' },
]

let overviewTrigger: ScrollTrigger | undefined
let valuesTrigger: ScrollTrigger | undefined
const timelineTriggers: ScrollTrigger[] = []

onMounted(() => {
  if (!overviewEl.value) return

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: overviewEl.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  })

  if (overviewTextEl.value) {
    tl.from(
      overviewTextEl.value.querySelectorAll('p'),
      { opacity: 0, y: 30, duration: 0.8, stagger: 0.15 },
      0,
    )
  }

  if (overviewImageEl.value) {
    const isMobile = window.innerWidth < 1024
    tl.from(
      overviewImageEl.value,
      { opacity: 0, ...(isMobile ? { y: 40 } : { x: 60 }), duration: 1, ease: 'power3.out' },
      '<',
    )
  }

  overviewTrigger = tl.scrollTrigger

  // Our Values cards: skip the reveal entirely under reduced motion, same as WhatWeDoSection
  if (valuesEl.value && valuesGridEl.value && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const cards = valuesGridEl.value.querySelectorAll('.value-card')
    const valuesTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: valuesEl.value,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
    valuesTl.from(cards, { opacity: 0, y: 50, duration: 0.7, stagger: 0.12 })
    valuesTrigger = valuesTl.scrollTrigger
  }

  // Timeline: line draws top-to-bottom scrubbed to scroll, same scrub technique
  // as WhatWeDoSection's .mobile-progress; each item reveals on its own as reached.
  if (timelineEl.value && timelineListEl.value) {
    const line = timelineListEl.value.querySelector<HTMLElement>('.timeline-line')
    const items = Array.from(timelineListEl.value.querySelectorAll<HTMLElement>('.timeline-item'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      // Land on the finished state — no scroll-driven motion under reduced motion
      if (line) gsap.set(line, { scaleY: 1 })
      items.forEach((item) => {
        gsap.set(item, { opacity: 1, y: 0 })
        item.classList.add('is-active')
        const dot = item.querySelector('.timeline-dot')
        if (dot) gsap.set(dot, { scale: 1 })
      })
    } else {
      if (line) {
        gsap.set(line, { scaleY: 0, transformOrigin: 'top center' })
        const lineTween = gsap.to(line, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineListEl.value,
            start: 'top 75%',
            end: 'bottom 25%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        if (lineTween.scrollTrigger) timelineTriggers.push(lineTween.scrollTrigger)
      }

      items.forEach((item, i) => {
        const dot = item.querySelector('.timeline-dot')
        const itemTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        })
        itemTl.from(item, { opacity: 0, y: 50, duration: 0.7 })
        if (dot) itemTl.from(dot, { scale: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.3')
        if (itemTl.scrollTrigger) timelineTriggers.push(itemTl.scrollTrigger)

        // stays lit from its own dot until the next one takes over, so one is always active
        const next = items[i + 1]
        timelineTriggers.push(
          ScrollTrigger.create({
            trigger: item,
            start: 'top 60%',
            endTrigger: next ?? timelineListEl.value,
            end: next ? 'top 60%' : 'bottom top',
            toggleClass: { targets: item, className: 'is-active' },
            invalidateOnRefresh: true,
          }),
        )
      })
    }
  }
})

onBeforeUnmount(() => {
  overviewTrigger?.kill()
  valuesTrigger?.kill()
  timelineTriggers.forEach((t) => t.kill())
})
</script>

<style scoped>
/* soft glow so the drawn progress reads against the faint track behind it */
.timeline-line {
  box-shadow: 0 0 10px 1px var(--color-primary);
}

/* solid primary until the milestone is hovered, then the .grad-line gradient shows through */
.timeline-year {
  display: inline-block;
  color: var(--color-primary);
  transition: color 0.4s ease;
}
.timeline-item.is-active .timeline-year {
  color: transparent;
}

/* the dot the progress line has reached */
.timeline-dot {
  transition: box-shadow 0.4s ease;
}
.timeline-item.is-active .timeline-dot {
  box-shadow: 0 0 12px 3px var(--color-primary);
}

@media (prefers-reduced-motion: reduce) {
  .timeline-year,
  .timeline-dot {
    transition: none;
  }
}

/* oversized letter sitting behind the copy — decorative only, aria-hidden in the template */
.value-card {
  position: relative;
  overflow: hidden;
}
.value-card > *:not(.value-watermark) {
  position: relative;
  z-index: 1;
}
.value-watermark {
  position: absolute;
  right: 0.25rem;
  bottom: -2.5rem;
  z-index: 0;
  font-size: 15rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-primary);
  opacity: 0.03;
  pointer-events: none;
  user-select: none;
  transform-origin: bottom right;
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.value-card:hover .value-watermark {
  opacity: 0.06;
  transform: scale(1.25);
}

/* white -> primary wipe on card hover, same trick as .btn-light in main.css */
.value-name {
  width: fit-content;
  color: transparent;
  background-image: linear-gradient(to right, var(--color-primary) 50%, #ffffff 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  -webkit-background-clip: text;
  background-clip: text;
  transition: background-position 0.5s ease;
}
.value-card:hover .value-name {
  background-position: left bottom;
}

/* the VISION acronym: first letter stays primary, outside the wipe */
.value-name::first-letter {
  color: var(--color-primary);
  font-size: 1.6em;
}

@media (prefers-reduced-motion: reduce) {
  .value-name,
  .value-watermark {
    transition: none;
  }
}

</style>
