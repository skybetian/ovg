<template>
  <div class="w-full relative">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Site-wide SEO defaults: OG/Twitter fallbacks, canonical + og:url (route-reactive),
// and the Organization structured data. Pages override title/description themselves.
const config = useRuntimeConfig()
const route = useRoute()

const canonicalUrl = computed(() => `${config.public.siteUrl}${route.path}`)

useSeoMeta({
  ogType: 'website',
  ogSiteName: 'One Visaya Gaming Corporation',
  ogUrl: canonicalUrl,
  // ponytail: no dedicated 1200x630 asset exists yet — see FRED's report for the spec
  ogImage: `${config.public.siteUrl}/images/home-bg.webp`,
  twitterCard: 'summary_large_image',
})

useHead({
  titleTemplate: (titleChunk) => (titleChunk ? `${titleChunk} | One Visaya Gaming` : 'One Visaya Gaming Corporation'),
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'One Visaya Gaming Corporation',
        url: config.public.siteUrl,
        logo: `${config.public.siteUrl}/images/logo-ovg.webp`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Cebu',
          addressRegion: 'Central Visayas',
          addressCountry: 'PH',
        },
        sameAs: ['https://www.linkedin.com/company/one-visaya-gaming-corporation/'],
      }),
    },
  ],
})
</script>
