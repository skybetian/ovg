<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[75vh] flex items-center overflow-hidden bg-black">
      <img
        src="/images/about-bg.png"
        alt=""
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0" style="background: linear-gradient(to bottom, #000816 0%, rgba(0, 45, 124, 0.7) 100%)" />

      <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full pt-24">
        <h1 class="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-tight mb-6 font-outfit">
          About Us
        </h1>
        <p class="text-white/80 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
          Learn more about our mission, vision, and the team driving innovation in
          fintech and interactive technology.
        </p>
        <NuxtLink
          to="#company-overview"
          class="btn-primary px-7 py-3 rounded"
        >
          Discover More
        </NuxtLink>
      </div>
    </section>

    <!-- Company Overview -->
    <section id="company-overview" class="bg-white py-24">
      <div class="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-4xl md:text-5xl font-bold text-black mb-8 font-outfit">
            Company Overview
          </h2>
          <p class="text-black/70 text-base leading-relaxed mb-6">
            SkyTech International is a Nevada-based technology
            company focused on developing software products in
            fintech, payment processing, and interactive
            entertainment. Founded in 2025, SkyTech was established
            to leverage software and assets developed for the U.S.
            market. Following a period of focused software
            development and successful deployment of previous
            platform versions internationally, the company launched
            operations in the United States and continues to grow its
            team and expand its product offerings for the U.S. market.
          </p>
          <p class="text-black/70 text-base leading-relaxed">
            Our team combines deep expertise in software
            engineering, financial technology, and regulatory
            compliance to deliver secure, scalable solutions.
          </p>
        </div>

        <div class="flex justify-center lg:justify-end">
          <img
            src="/images/building.png"
            alt="SkyTech International building"
            class="w-full max-w-lg rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>

    <WhyWeAreBestSection :show-read-more="false" />
    <LeadersSection />
  </div>
</template>
