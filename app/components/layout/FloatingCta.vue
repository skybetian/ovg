<template>
  <Transition name="floating-cta">
    <button
      v-if="visible"
      class="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  const scrollY = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = scrollY / docHeight

  visible.value = progress >= 0.4
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.floating-cta-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.floating-cta-leave-active {
  transition: all 0.4s ease-in;
}
.floating-cta-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.8);
}
.floating-cta-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}
</style>
