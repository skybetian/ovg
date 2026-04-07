<template>
  <footer ref="footerEl" class="bg-black text-white">
    <div class="max-w-7xl mx-auto px-6 md:px-16 py-20">
      <div class="flex flex-col lg:flex-row lg:justify-between gap-16">
        <!-- Left: Logo, description, buttons -->
        <div ref="leftColEl" class="max-w-md">
          <img src="/images/logo-full.png" alt="SkyTech International" class="h-12 mb-6" />
          <p class="text-white/70 text-sm leading-relaxed mb-8">
            Innovating at the intersection of finance and digital experiences,
            we deliver seamless fintech solutions and engaging interactive
            entertainment that empower users worldwide.
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

        <!-- Right: Links columns -->
        <div ref="linksColsEl" class="grid grid-cols-2 gap-16">
          <!-- Quick Links + Connect with us -->
          <div>
            <h3 class="text-lg font-bold mb-6">Quick Links</h3>
            <ul class="space-y-3 mb-10">
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

            <h3 class="text-lg font-bold mb-5">Connect with us</h3>
            <div class="flex gap-3">
              <a href="#" aria-label="Facebook" class="hover:opacity-80 transition-opacity">
                <img src="/images/facebook.png" alt="Facebook" class="w-9 h-9" />
              </a>
              <a href="#" aria-label="Instagram" class="hover:opacity-80 transition-opacity">
                <img src="/images/instagram.png" alt="Instagram" class="w-9 h-9" />
              </a>
              <a href="#" aria-label="LinkedIn" class="hover:opacity-80 transition-opacity">
                <img src="/images/linkedin.png" alt="LinkedIn" class="w-9 h-9" />
              </a>
            </div>
          </div>

          <!-- Legal -->
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
      </div>
    </div>

    <div ref="copyrightEl" class="bg-primary py-2">
      <p class="text-center text-white text-sm">
        &copy; {{ new Date().getFullYear() }} SkyTech International. All Rights Reserved.
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
const copyrightEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined

onMounted(() => {
  if (!footerEl.value) return

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: footerEl.value,
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
  })

  if (leftColEl.value) {
    tl.from(
      leftColEl.value.children,
      { opacity: 0, y: 30, duration: 0.7, stagger: 0.12 },
      0,
    )
  }

  if (linksColsEl.value) {
    tl.from(
      linksColsEl.value.querySelectorAll('h3, li, .flex.gap-3'),
      { opacity: 0, y: 20, duration: 0.5, stagger: 0.06 },
      '-=0.5',
    )
  }

  if (copyrightEl.value) {
    tl.from(
      copyrightEl.value,
      { opacity: 0, y: 20, duration: 0.5 },
      '-=0.2',
    )
  }

  trigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  trigger?.kill()
})
</script>
