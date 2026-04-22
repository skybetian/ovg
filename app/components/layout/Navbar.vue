<template>
  <nav ref="navEl" class="fixed top-0 left-0 bg-black/80 backdrop-blur-md w-full z-50 px-6 md:px-16 py-5">
    <div class="max-w-7xl mx-auto md:px-6 md:px-16 flex items-center justify-between">
      <NuxtLink to="/">
        <img
          src="/images/logo-full.webp"
          alt="SkyTech International"
          class="h-10"
        />
      </NuxtLink>

      <div class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="nav-link-shift"
          :class="{ 'nav-link-active': isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <NuxtLink
        to="/contacts"
        class="btn-outline-light !hidden md:!inline-flex text-sm px-5 py-2 rounded"
      >
        Contact Us
      </NuxtLink>

      <button
        class="md:hidden text-white"
        @click="mobileOpen = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Fullscreen mobile menu -->
    <Teleport to="body">
      <Transition name="mobile-menu">
        <div
          v-if="mobileOpen"
          class="fixed inset-0 z-[200] flex flex-col items-center justify-center md:hidden"
          style="background: radial-gradient(circle at 50% 40%, rgb(0, 30, 90) 0%, rgb(1, 12, 35) 45%, rgb(0, 4, 12) 100%)"
        >
          <nav class="flex flex-col items-center gap-8">
            <NuxtLink
              v-for="link in mobileLinks"
              :key="link.label"
              :to="link.to"
              class="text-white/80 text-2xl font-light tracking-wide transition-colors hover:text-white"
              :class="{ '!text-white underline underline-offset-8 decoration-white decoration-[1px]': isActive(link.to) }"
              @click="mobileOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <button
            class="absolute bottom-16 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            @click="mobileOpen = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
]

const mobileLinks = [
  ...navLinks,
  { label: 'Contact Us', to: '/contacts' },
]
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

.nav-link-active {
  color: #ffffff;
  background-size: 100% 1px;
  background-image: linear-gradient(to right, #ffffff, #ffffff);
}
</style>
