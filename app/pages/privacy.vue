<template>
  <div>
    <PageHero
      title="Privacy Policy"
      paragraph="Learn how One Visaya Gaming Corporation handles and protects your personal data."
      cta-to="#privacy-content"
      cta-label="Read Policy"
      bg-image="/images/legal-bg.webp"
      bg-position="bottom"
    />

    <section id="privacy-content" class="bg-navy py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div ref="contentEl" class="prose-legal">
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy describes how One Visaya Gaming Corporation ("Company", "OVG") collects, uses, and protects personal data in connection with its website and technology services.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>a. Business & Contact Information</h3>
          <p>
            Name, email, phone number, and company details (for partners/clients).
          </p>
          <h3>b. Technical Data</h3>
          <p>
            IP address, browser type, device identifiers, and system logs.
          </p>
          <h3>c. Compliance Data (if applicable)</h3>
          <p>
            Identity verification data and fraud prevention data.
          </p>

          <h2>3. Purpose of Processing</h2>
          <ul>
            <li>Operate and improve our services</li>
            <li>Provide business and technical support</li>
            <li>Ensure security and fraud prevention</li>
            <li>Comply with legal and regulatory obligations</li>
          </ul>

          <h2>4. Sharing of Information</h2>
          <p>
            OVG does not sell personal data. However, data may be shared with the following:
          </p>
          <ul>
            <li>Service providers (hosting, analytics, IT support)</li>
            <li>Payment and fraud monitoring partners</li>
            <li>Regulatory authorities when required</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            One Visaya Gaming implements industry-standard safeguards including access controls, encryption, and monitoring systems.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            Personal data is retained only as necessary for business operations and to comply with legal and compliance obligations.
          </p>

          <h2>7. Geographic Restrictions</h2>
          <p>
            Access to certain services may be restricted based on jurisdiction.
          </p>

          <h2>8. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal data, subject to applicable laws.
          </p>

          <h2>9. Contact</h2>
          <p>
            <!-- TODO: real OVG data protection email -->Contact us through the form on our Contact page.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

useSeoMeta({
  title: 'Privacy Policy',
  description: 'How One Visaya Gaming Corporation (OVGC) collects, uses, and protects personal data across our website and gaming technology services, per applicable law.',
})

const contentEl = ref<HTMLElement>()

let trigger: ScrollTrigger | undefined

onMounted(() => {
  if (!contentEl.value) return

  gsap.from(contentEl.value.children, {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: contentEl.value,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })
})

onBeforeUnmount(() => {
  trigger?.kill()
})
</script>

<style scoped>
.prose-legal h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-family: 'Outfit', sans-serif;
}

.prose-legal h2:first-child {
  margin-top: 0;
}

.prose-legal h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  font-family: 'Outfit', sans-serif;
}

.prose-legal p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.prose-legal ul {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.prose-legal li {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 0.5rem;
}
</style>
