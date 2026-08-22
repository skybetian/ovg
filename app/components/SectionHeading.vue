<template>
  <div ref="rootEl" :class="['section-heading', { 'is-in': shown }, align === 'left' ? 'text-left' : 'text-center']">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>

    <!-- words are split for the reveal, so the real title lives on aria-label -->
    <component :is="as" :class="['heading font-outfit', sizeClass]" :aria-label="title">
      <span
        v-for="(word, i) in words"
        :key="i"
        class="word"
        aria-hidden="true"
        :style="{ '--i': i }"
      >
        <span class="word-inner">{{ word }}</span>
      </span>
    </component>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title: string
  eyebrow?: string
  align?: 'center' | 'left'
  as?: string
  sizeClass?: string
}>(), {
  align: 'center',
  as: 'h2',
  sizeClass: 'text-3xl sm:text-4xl md:text-5xl',
})

const words = computed(() => props.title.split(' '))

const rootEl = ref<HTMLElement>()
const shown = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!rootEl.value) return

  // IntersectionObserver over ScrollTrigger: no refresh needed when lazy
  // images below shift the page, and nothing to recalculate on resize.
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      shown.value = true
      observer?.disconnect()
    },
    { rootMargin: '0px 0px -12% 0px' },
  )
  observer.observe(rootEl.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.eyebrow {
  display: inline-block;
  margin-bottom: 0.85rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-cool-gray);
  opacity: 0;
  transform: translateX(-10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.section-heading.is-in .eyebrow {
  opacity: 1;
  transform: translateX(0);
}


.heading {
  font-weight: 700;
  color: #ffffff;
  line-height: 1.15;
}

.word {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
}
.word:not(:last-child) {
  margin-right: 0.28em;
}

.word-inner {
  display: inline-block;
  transform: translateY(110%);
  transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--i) * 70ms);
}
.section-heading.is-in .word-inner {
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow,
  .word-inner {
    transition: none;
  }
  .word-inner {
    transform: translateY(0);
  }
  .eyebrow {
    opacity: 1;
    transform: none;
  }
}
</style>
