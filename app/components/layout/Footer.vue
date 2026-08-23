<template>
  <footer ref="footerEl" class="bg-black text-white">
    <div class="max-w-7xl mx-auto px-6 md:px-16 py-14 md:py-20">
      <div class="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-16">
        <!-- Left: Logo, description, buttons -->
        <div ref="leftColEl" class="max-w-md">
          <img src="/images/logo-ovg.webp" alt="One Visaya Gaming" class="h-12 mb-6" />
          <p class="text-white/70 text-sm leading-relaxed mb-8">
            One Visaya Gaming Corporation has been in the business of online
            entertainment since 2022, operating with strict adherence to the
            PAGCOR codes of conduct.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink to="/contacts" class="btn-primary px-7 py-3 rounded">
              Get Started
            </NuxtLink>
            <NuxtLink to="/products" class="btn-outline-light px-7 py-3 rounded">
              See Our Products
            </NuxtLink>
          </div>
        </div>

        <!-- Right: Links + Socials -->
        <div ref="linksColsEl" class="flex flex-col gap-10">
          <!-- Row: Quick Links & Legal -->
          <div class="grid grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div>
              <h3 class="text-lg font-bold mb-6">Quick Links</h3>
              <ul class="space-y-3">
                <li>
                  <NuxtLink to="/" class="footer-link text-sm">
                    Home
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/about" class="footer-link text-sm">
                    About Us
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/products" class="footer-link text-sm">
                    Products
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/contacts" class="footer-link text-sm">
                    Contact Us
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-bold mb-6">Legal</h3>
              <ul class="space-y-3">
                <li>
                  <NuxtLink to="/terms" class="footer-link text-sm">
                    Terms of Use
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/privacy" class="footer-link text-sm">
                    Privacy Policy
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/cookies" class="footer-link text-sm">
                    Cookie Policy
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>

          <!-- Connect with us -->
          <div>
            <h3 class="text-lg font-bold mb-5">Connect with us</h3>
            <div class="flex gap-3">
              <a href="https://www.linkedin.com/company/one-visaya-gaming-corporation/" target="_blank" rel="noopener" aria-label="LinkedIn" class="social-icon">
                <img src="/images/linkedin.webp" alt="LinkedIn" class="w-9 h-9" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- was a full-width bg-primary bar: heavy on pink, and white on #ED1879 is only 4.20:1 -->
    <div class="border-t border-primary/30 bg-black py-4">
      <p class="text-center text-white/60 text-sm">
        &copy; {{ new Date().getFullYear() }} One Visaya Gaming Corporation. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerEl = ref<HTMLElement>()
const leftColEl = ref<HTMLElement>()
const linksColsEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined

onMounted(() => {
  if (!footerEl.value) return

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: footerEl.value,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })

  // Logo, description, buttons — fade up one by one
  if (leftColEl.value) {
    tl.from(
      leftColEl.value.children,
      { opacity: 0, y: 40, duration: 0.8, stagger: 0.15 },
      0,
    )
  }

  // Links columns + social icons
  if (linksColsEl.value) {
    tl.from(
      linksColsEl.value.querySelectorAll('h3, ul, .flex.gap-3'),
      { opacity: 0, y: 40, duration: 0.8, stagger: 0.1 },
      0.2,
    )
  }

  trigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  trigger?.kill()
})
</script>

<style scoped>
.social-icon {
  display: inline-flex;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease;
  will-change: transform;
}
.social-icon img {
  transition: filter 0.3s ease;
}
.social-icon:hover {
  transform: translateY(-4px) scale(1.1);
}
.social-icon:hover img {
  filter: drop-shadow(0 6px 12px rgba(237, 24, 121, 0.55));
}
.social-icon:active {
  transform: translateY(-2px) scale(1.05);
}
</style>
