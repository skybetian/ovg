<template>
  <section class="bg-white py-24">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      <div class="text-center mb-20">
        <p class="text-primary font-bold text-sm mb-3">The Leaders</p>
        <h2 class="text-4xl md:text-5xl font-bold text-black mb-4 font-outfit">
          The Team Behind SkyTech
        </h2>
        <p class="text-black/60 text-base">
          Meet the experienced leaders driving innovation, strategy, and growth.
        </p>
      </div>

      <div class="flex flex-col gap-20">
        <div
          v-for="(leader, index) in leaders"
          :key="leader.name"
          class="grid grid-cols-1 lg:grid-cols-2 items-center px-10"
        >
          <div :class="index % 2 === 1 ? 'lg:order-2' : ''">
            <img
              :src="leader.image"
              :alt="leader.name"
              class="w-full"
            />
          </div>

          <div
            class="relative overflow-hidden h-full p-8"
            :class="index % 2 === 1 ? 'lg:order-1' : ''"
          >
            <img
              src="/images/pattern.png"
              alt=""
              class="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            />
            <div class="relative z-10">
              <h3 class="text-3xl font-bold text-primary mb-2">{{ leader.name }}</h3>
              <p class="text-black/70 text-sm mb-5">{{ leader.role }}</p>
              <div class="w-12 h-0.5 bg-black/30 mb-6" />
              <p class="text-black/70 text-base leading-relaxed max-w-md">
                {{ leader.bio }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const leaders = [
  {
    name: 'Wendy Wongso',
    role: 'Chief Executive Officer',
    image: '/images/user-placeholder-rect.png',
    bio: 'As Managing Member and CEO, Wendy leads Skytech\'s strategic direction and oversees all business operations. He brings extensive experience in technology management and business development to drive the company\'s growth in the fintech and interactive entertainment sectors.',
  },
  {
    name: 'Rich Newman',
    role: 'Legal Advisor',
    image: '/images/rich-newman.png',
    bio: 'Rich serves as Legal Advisor, providing expert guidance on regulatory compliance, corporate governance, and legal strategy. His experience in U.S. gaming and technology law helps guide SkyTech in understanding and meeting applicable legal requirements across jurisdictions.',
  },
  {
    name: 'Mark Munger',
    role: 'Compliance & Technology Advisor',
    image: '/images/mark-munger.png',
    bio: 'Mark advises on compliance strategy and technology architecture. With deep expertise in software engineering and fintech regulatory requirements, he provides guidance to help Skytech build platforms with security, scalability, and compliance at their core.',
  },
]
</script>
