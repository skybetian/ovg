<template>
  <div>
    <PageHero
      title="Terms of Use"
      paragraph="Please read these terms carefully before using our services."
      cta-to="#terms-content"
      cta-label="Read Terms"
      bg-image="/images/legal-bg.webp"
      bg-position="bottom"
    />

    <section id="terms-content" class="bg-navy py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div ref="contentEl" class="prose-legal">
          <h2>1. Business Overview</h2>
          <p>
            Skytech International LLC ("Skytech LLC") is a company organized under the laws of the State of Nevada, USA, and operates as a technology and platform provider offering software infrastructure and digital solutions for promotional engagement platforms.
          </p>

          <h2>2. Business Model & Risk Positioning</h2>
          <p>
            Skytech LLC provides backend systems, payment integrations, fraud monitoring, and user management tools. Consumer-facing sweepstakes platforms are operated separately and in compliance with applicable laws.
          </p>

          <h2>3. Compliance Controls</h2>
          <ul>
            <li>Know Your Customer (KYC) verification procedures</li>
            <li>Anti-Money Laundering (AML) and fraud monitoring</li>
            <li>Geolocation restrictions</li>
            <li>Transaction monitoring</li>
            <li>Chargeback mitigation processes</li>
          </ul>

          <h2>4. Jurisdictional Restrictions</h2>
          <p>
            Access to services may not be available in certain jurisdictions, including Washington, Idaho, Michigan, and Nevada. Controls are implemented to ensure compliance with applicable laws and regulations.
          </p>

          <h2>5. Payment & PCI Compliance</h2>
          <p>
            All payments are processed through third-party providers that are compliant with PCI DSS standards and the Company does not store full cardholder data.
          </p>

          <h2>6. Privacy & Data Protection Summary</h2>
          <p>
            Skytech LLC processes personal data for operational, compliance, and fraud prevention purposes. Processed data is not sold and is protected by appropriate security controls.
          </p>

          <h2>7. Terms of Use Summary</h2>
          <p>
            Users must be at least 18 years of age and comply with applicable laws. Fraudulent, abusive, and unauthorized activities are strictly prohibited.
          </p>

          <h2>8. Supporting Policies Included</h2>
          <ul>
            <li><NuxtLink to="/privacy" class="text-sky-blue underline underline-offset-4 hover:text-primary transition-colors">Privacy Policy</NuxtLink></li>
            <li><NuxtLink to="/terms" class="text-sky-blue underline underline-offset-4 hover:text-primary transition-colors">Terms of Use</NuxtLink></li>
            <li><NuxtLink to="/cookies" class="text-sky-blue underline underline-offset-4 hover:text-primary transition-colors">Cookie Policy</NuxtLink></li>
          </ul>

          <h2>9. Acceptance</h2>
          <p>
            By accessing or using this website, you agree to these Terms.
          </p>

          <h2>10. Nature of Services</h2>
          <p>
            Skytech International LLC provides:
          </p>
          <ul>
            <li>Technology infrastructure</li>
            <li>Software solutions</li>
            <li>Platform services</li>
          </ul>

          <h2>11. Use of Website</h2>
          <p>
            With continued use of this website, you agree not to:
          </p>
          <ul>
            <li>Engage in unlawful activity</li>
            <li>Attempt to access restricted systems</li>
            <li>Disrupt or misuse the website</li>
          </ul>

          <h2>12. Intellectual Property</h2>
          <p>
            All content is owned by or licensed to the Company.
          </p>

          <h2>13. Third-Party Services</h2>
          <p>
            The Company may integrate third-party services, but does not control and is not responsible for their actions.
          </p>

          <h2>14. Geographic Restrictions</h2>
          <p>
            Services may not be available in all jurisdictions, including certain U.S. states such as Washington, Idaho, Michigan, and Nevada.
          </p>

          <h2>15. Disclaimer</h2>
          <p>
            The website is provided on an "as is" and "as available" basis.
          </p>

          <h2>16. Limitation of Liability</h2>
          <p>
            The Company is not liable for indirect, incidental, or consequential damages to the fullest extent permitted by law.
          </p>

          <h2>17. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Nevada, USA.
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
