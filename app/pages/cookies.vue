<template>
  <div>
    <PageHero
      title="Cookie Policy"
      paragraph="Understand how we use cookies and similar technologies on our platforms."
      cta-to="#cookies-content"
      cta-label="Read Policy"
      bg-image="/images/legal-bg.webp"
      bg-position="bottom"
    />

    <section id="cookies-content" class="bg-navy py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div ref="contentEl" class="prose-legal">
          <h2>1. Overview</h2>
          <p>
            OVG uses cookies to enhance functionality and performance.
          </p>

          <h2>2. Types of Cookies</h2>
          <ul>
            <li>Essential (security, login)</li>
            <li>Analytics (traffic insights)</li>
            <li>Functional (preferences)</li>
          </ul>

          <h2>3. Third-Party Cookies</h2>
          <p>
            OVG may use analytics and service providers.
          </p>

          <h2>4. Control</h2>
          <p>
            Users may manage cookie preferences through their browser settings.
          </p>

          <h2>5. Consent</h2>
          <p>
            Where required by applicable laws, OVG obtains user consent prior to the use of non-essential cookies.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useSeoMeta({
  title: 'Cookie Policy',
  description: 'Learn how One Visaya Gaming Corporation uses cookies and similar technologies to enhance functionality, performance, and security across our platforms.',
})

const contentEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined

onMounted(() => {
  if (!contentEl.value) return

  gsap.from(contentEl.value.children, {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: contentEl.value,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })
})

onBeforeUnmount(() => {
  trigger?.kill()
})
</script>

<style scoped>
.prose-legal h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-family: 'Outfit', sans-serif;
}

.prose-legal h2:first-child {
  margin-top: 0;
}

.prose-legal p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.prose-legal ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.prose-legal li {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 0.5rem;
}
</style>
