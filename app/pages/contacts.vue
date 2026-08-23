<template>
  <div>
    <!-- Hero -->
    <PageHero
      title="Contacts"
      paragraph="Contact us for business inquiries, technical support, or collaboration opportunities."
      cta-to="#lets-talk"
      cta-label="Send Us Inquiry"
      image="/images/contact-us.webp"
      image-alt="Smiling support agent wearing a headset, framed by playing cards and chips"
      bg-image="/images/contact-us-section.webp"
    />

    <!-- Let's Talk -->
    <section id="lets-talk" ref="letsTalkEl" class="bg-navy py-20 md:py-28">
      <div class="max-w-7xl mx-auto px-6 md:px-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Left: info -->
          <div ref="letsTalkInfoEl">
            <SectionHeading
              eyebrow="Get in Touch"
              title="Let’s Talk"
              align="left"
              size-class="text-4xl md:text-5xl lg:text-6xl"
              class="mb-6"
            />
            <p class="text-white/70 text-base md:text-lg leading-relaxed max-w-md mb-12">
              Have some big idea or brand to develop and need help? Then reach out we&rsquo;d love to hear about your project and provide help
            </p>

            <h3 class="text-2xl font-bold text-white font-outfit mb-3">Location</h3>
            <p class="text-white/70 mb-10">
              Cebu, Central Visayas, Philippines
            </p>

            <h3 class="text-2xl font-bold text-white font-outfit mb-3">Email</h3>
            <!-- TODO: real OVG contact email --><p class="text-white/70 mb-10">Please use the form to reach us.</p>

            <h3 class="text-2xl font-bold text-white font-outfit mb-4">Socials</h3>
            <ul class="space-y-3">
              <li>
                <a href="https://www.linkedin.com/company/one-visaya-gaming-corporation/" target="_blank" rel="noopener" class="text-sky-blue underline underline-offset-4 hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <!-- Right: form -->
          <form ref="letsTalkFormEl" class="space-y-6" novalidate @submit.prevent="onSubmit">
            <div>
              <label for="name" class="block text-sm font-medium text-white mb-2">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                :class="[
                  'w-full bg-gray-100 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary',
                  errors.name ? 'border-red-500' : 'border-transparent',
                ]"
                @blur="validateField('name')"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-white mb-2">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                :class="[
                  'w-full bg-gray-100 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary',
                  errors.email ? 'border-red-500' : 'border-transparent',
                ]"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <div>
              <label for="contact" class="block text-sm font-medium text-white mb-2">Contact Number</label>
              <input
                id="contact"
                v-model="form.contact"
                type="tel"
                :class="[
                  'w-full bg-gray-100 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary',
                  errors.contact ? 'border-red-500' : 'border-transparent',
                ]"
                @blur="validateField('contact')"
              />
              <p v-if="errors.contact" class="mt-1 text-sm text-red-600">{{ errors.contact }}</p>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-white mb-2">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                :class="[
                  'w-full bg-gray-100 border rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none',
                  errors.message ? 'border-red-500' : 'border-transparent',
                ]"
                @blur="validateField('message')"
              />
              <p v-if="errors.message" class="mt-1 text-sm text-red-600">{{ errors.message }}</p>
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="btn-primary w-full py-4 rounded disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { z } from 'zod'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const letsTalkEl = ref<HTMLElement>()
const letsTalkInfoEl = ref<HTMLElement>()
const letsTalkFormEl = ref<HTMLFormElement>()

let letsTalkTrigger: ScrollTrigger | undefined

onMounted(() => {
  if (!letsTalkEl.value) return

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    scrollTrigger: {
      trigger: letsTalkEl.value,
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
  })

  // Info content fade up
  if (letsTalkInfoEl.value) {
    tl.from(
      letsTalkInfoEl.value.querySelectorAll('p, h3, ul'),
      { opacity: 0, y: 30, duration: 0.7, stagger: 0.1 },
      0,
    )
  }

  // Form slide in from right; mobile rises up instead — an x-transform on a w-full
  // grid item with no overflow-hidden ancestor here would overflow the viewport.
  if (letsTalkFormEl.value) {
    const isMobile = window.innerWidth < 1024
    tl.from(
      letsTalkFormEl.value,
      { opacity: 0, ...(isMobile ? { y: 40 } : { x: 60 }), duration: 0.9, ease: 'power3.out' },
      '<',
    )
  }

  letsTalkTrigger = tl.scrollTrigger
})

onBeforeUnmount(() => {
  letsTalkTrigger?.kill()
})

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  contact: z
    .string()
    .trim()
    .min(7, 'Enter a valid contact number')
    .regex(/^[+()\-\s\d]+$/, 'Only digits, spaces and + ( ) - are allowed'),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
})

type ContactForm = z.infer<typeof contactSchema>
type FieldErrors = Partial<Record<keyof ContactForm, string>>

const form = reactive<ContactForm>({
  name: '',
  email: '',
  contact: '',
  message: '',
})

const errors = reactive<FieldErrors>({})
const submitting = ref(false)

function validateField(field: keyof ContactForm) {
  const result = contactSchema.shape[field].safeParse(form[field])
  errors[field] = result.success ? undefined : result.error.issues[0]?.message
}

function validateAll(): boolean {
  const result = contactSchema.safeParse(form)
  ;(Object.keys(form) as (keyof ContactForm)[]).forEach((k) => (errors[k] = undefined))

  if (result.success) return true

  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof ContactForm | undefined
    if (key && !errors[key]) errors[key] = issue.message
  }
  return false
}

async function onSubmit() {
  if (!validateAll()) return

  submitting.value = true
  try {
    // TODO: wire up form submission
    console.log('Contact form submitted', { ...form })
  } finally {
    submitting.value = false
  }
}
</script>

