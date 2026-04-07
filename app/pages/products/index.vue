<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[75vh] flex items-center overflow-hidden bg-black">
      <img
        src="/images/product-bg.png"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0" style="background: linear-gradient(to bottom, #000816 0%, rgba(0, 45, 124, 0.7) 100%)" />

      <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full pt-24">
        <h1 class="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-6 font-outfit">
          Products
        </h1>
        <p class="text-white/80 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          Skytech develops and operates technology products across fintech and interactive entertainment. Our platforms are built with compliance, security, and scalability at the core.
        </p>
        <NuxtLink
          to="#company-overview"
          class="btn-primary px-7 py-3 rounded"
        >
          Explore Games
        </NuxtLink>
      </div>
    </section>

    <!-- Our Expertise and Experience -->
    <section class="bg-white py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-outfit mb-6">
          Our Expertise and Experience
        </h2>
        <p class="text-gray-700 text-base md:text-lg max-w-2xl leading-relaxed mb-14">
          Innovating at the intersection of finance and digital experiences, we deliver seamless fintech solutions and engaging interactive entertainment that empower users worldwide.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="item in expertise"
            :key="item.title"
            class="relative rounded-2xl overflow-hidden min-h-[420px] flex flex-col justify-end shadow-lg group"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div class="relative z-10 p-6">
              <h3 class="text-white text-xl font-bold mb-3 font-outfit">
                {{ item.title }}
              </h3>
              <p class="text-white/80 text-sm leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Our Interactive Platform -->
    <section class="bg-[#000816] py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="text-center mb-14">
          <p class="text-white/70 text-sm md:text-base mb-3">Projects</p>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-outfit">
            Our Interactive Platform
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            to="/products/bsweeps"
            class="relative rounded-xl overflow-hidden aspect-[16/10] block group"
          >
            <img
              src="/images/bsweeps.png"
              alt="BSweeps"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </NuxtLink>
          <div
            v-for="n in 5"
            :key="n"
            class="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#0a1428] w-full h-full flex items-center justify-center"
          >
            <img
              src="/images/coming-soon.png"
              alt="Coming Soon"
              class="w-28 h-auto object-cover"
            />
          </div>
        </div>

        <div class="flex justify-center mt-12">
          <NuxtLink
            to="#"
            class="btn-primary px-8 py-3 rounded"
          >
            View more
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="bg-[#EEF3FB] py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="flex flex-col justify-center p-2">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-black font-outfit mb-6">
              How It Works
            </h2>
            <p class="text-gray-700 text-base leading-relaxed max-w-sm">
              From ideation to launch and beyond, we guide every step to deliver innovative, secure, and seamless fintech and interactive experiences.
            </p>
          </div>

          <div
            v-for="(step, idx) in steps"
            :key="step.title"
            :class="[
              'rounded-2xl p-8 shadow-md min-h-[260px] flex flex-col',
              step.featured ? 'bg-primary text-white' : 'bg-white text-black',
            ]"
          >
            <p
              :class="[
                'text-4xl md:text-5xl font-bold font-outfit mb-6',
                step.featured ? 'text-white' : 'text-primary',
              ]"
            >
              {{ String(idx + 1).padStart(2, '0') }}
            </p>
            <h3 class="text-xl font-bold font-outfit mb-3">{{ step.title }}</h3>
            <p :class="['text-sm leading-relaxed', step.featured ? 'text-white/90' : 'text-gray-600']">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <GameProvidersSection />

  </div>
</template>

<script setup lang="ts">
const expertise = [
  {
    title: 'Software Development',
    description: 'Custom platform development, API design, and cloud-native architecture for fintech and entertainment verticals.',
    image: '/images/software-development.png',
  },
  {
    title: 'Fintech & Payments',
    description: 'Payment processing integration, ACH and card infrastructure, ledger systems, and payout automation for regulated environments.',
    image: '/images/fintech-payments.png',
  },
  {
    title: 'Game Development',
    description: 'Interactive entertainment software, sweepstakes game logic, RNG systems, and engaging UI/UX for social gaming platforms.',
    image: '/images/game-development.png',
  },
  {
    title: 'Compliance-First',
    description: 'Geolocation enforcement, KYC/AML integration, jurisdiction-aware access controls, and regulatory reporting built from day one.',
    image: '/images/compliance-first.png',
  },
]

const steps = [
  { title: 'Discover',         description: 'Analyze user needs, market trends, and business goals to identify opportunities.', featured: false },
  { title: 'Ideate',           description: 'Brainstorm innovative solutions that merge fintech and interactive experiences.', featured: true  },
  { title: 'Design',           description: 'We believe that every customer is unique, and their needs should be addressed accordingly.', featured: false },
  { title: 'Develop & Deploy', description: 'Implement secure, scalable, and high-performing systems. Launch solutions with seamless integration.', featured: false },
  { title: 'Optimize',         description: 'Continuously monitor performance and enhance with data-driven insights.', featured: false },
]
</script>
