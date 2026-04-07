<template>
  <section class="bg-white py-20 md:py-28">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      <div class="text-center mb-12">
        <p class="text-primary text-sm md:text-base font-semibold mb-3">Game Providers</p>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-outfit">
          Our Gaming Partners
        </h2>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6 max-w-5xl mx-auto">
        <div
          v-for="provider in providers"
          :key="provider.name"
          class="flex items-center justify-center h-24"
        >
          <img
            :src="provider.logo"
            :alt="provider.name"
            class="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const providers = [
  { name: 'Cewin',           logo: '/images/cewin.png' },
  { name: 'Evolution',       logo: '/images/evolution.png' },
  { name: 'No Limit City',   logo: '/images/no-limit-city.png' },
  { name: 'NetEnt',          logo: '/images/netent.png' },
  { name: 'Red Tiger',       logo: '/images/red-tiger.png' },
  { name: 'First Person',    logo: '/images/first-person.png' },
  { name: 'Big Time Gaming', logo: '/images/big-time-gaming.png' },
  { name: 'Altenar',         logo: '/images/altenar.png' },
]
</script>
