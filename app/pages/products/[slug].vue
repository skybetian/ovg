<template>
  <div>
    <!-- Hero image -->
    <section class="bg-white pt-28 pb-12 md:pt-32 md:pb-16">
      <div class="max-w-6xl mx-auto px-6 md:px-16">
        <div class="rounded-2xl overflow-hidden shadow-lg">
          <img :src="product.hero" :alt="product.name" class="w-full h-auto object-cover" />
        </div>
      </div>
    </section>

    <!-- Body -->
    <section class="bg-white pb-20 md:pb-28">
      <div class="max-w-6xl mx-auto px-6 md:px-16">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-outfit mb-6">
          {{ product.name }}
        </h1>

        <p class="text-gray-800 text-base md:text-lg leading-relaxed mb-6">
          {{ product.intro }}
        </p>

        <p class="text-gray-800 font-medium mb-3">Key Features:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-800 mb-6">
          <li v-for="feature in product.keyFeatures" :key="feature">
            {{ feature }}
          </li>
        </ul>

        <p class="text-gray-800 mb-6">
          Visit
          <a
            :href="product.websiteHref"
            target="_blank"
            rel="noopener"
            class="underline underline-offset-4 hover:text-primary"
          >
            {{ product.websiteLabel }}
          </a>
          to learn more.
        </p>

        <p class="text-gray-800 mb-10">
          Follow {{ product.name }}:
          <template v-for="(social, idx) in product.socials" :key="social.label">
            <a
              :href="social.href"
              target="_blank"
              rel="noopener"
              class="underline underline-offset-4 hover:text-primary"
            >
              {{ social.label }}
            </a>
            <span v-if="idx < product.socials.length - 1"> | </span>
          </template>
        </p>

        <p class="text-gray-700 text-sm leading-relaxed">
          <span class="font-semibold">Legal Note:</span> {{ product.legalNote }}
        </p>
      </div>
    </section>

    <!-- Gallery -->
    <section class="bg-[#EEF3FB] py-20 md:py-28">
      <div class="max-w-6xl mx-auto px-6 md:px-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-outfit mb-12">
          Gallery
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(image, idx) in product.gallery"
            :key="idx"
            class="rounded-xl overflow-hidden aspect-[16/10] shadow-md"
          >
            <img :src="image" :alt="`${product.name} screenshot ${idx + 1}`" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <GameProvidersSection />
  </div>
</template>

<script setup lang="ts">
import { findProduct } from '~/data/products'

const route = useRoute()
const slug = String(route.params.slug)

const product = findProduct(slug)
if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}

useHead({
  title: `${product.name} — SkyTech International`,
})
</script>
