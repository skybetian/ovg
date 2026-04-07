<template>
  <nav class="bg-black w-full z-50 px-6 md:px-16 py-5">
    <div class="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
      <NuxtLink to="/">
        <img
          src="/images/logo-full.png"
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
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <NuxtLink
        to="/contacts"
        class="btn-outline-light hidden md:inline-flex text-sm px-5 py-2 rounded"
      >
        Contact Us
      </NuxtLink>

      <button
        class="md:hidden text-white"
        @click="mobileOpen = !mobileOpen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <div
      v-if="mobileOpen"
      class="md:hidden mt-4 flex flex-col gap-4 bg-black/95 backdrop-blur rounded-lg p-6"
    >
      <NuxtLink
        v-for="link in navLinks"
        :key="link.label"
        :to="link.to"
        class="text-white/80 hover:text-white transition-colors text-sm font-medium"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
      <NuxtLink
        to="/contacts"
        class="btn-outline-light text-sm px-5 py-2 rounded"
        @click="mobileOpen = false"
      >
        Contact Us
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
]
</script>
