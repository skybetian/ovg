<template>
  <nav ref="navEl" class="fixed top-0 left-0 bg-black/80 backdrop-blur-md w-full z-50 px-6 md:px-16 py-5">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <NuxtLink to="/">
        <img
          src="/images/logo-ovg.webp"
          alt="One Visaya Gaming"
          width="262"
          height="44"
          class="nav-logo h-10 w-auto"
        />
      </NuxtLink>

      <div class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.label"
          :to="link.to"
          class="nav-underline"
          :class="{ 'nav-link-active': isActive(link.to) }"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <NuxtLink
        to="/contacts"
        class="btn-outline-light !hidden md:!inline-flex text-sm px-5 py-2 rounded"
      >
        Contact Us
      </NuxtLink>

      <button
        ref="menuButtonRef"
        class="md:hidden text-white"
        aria-label="Open menu"
        aria-controls="mobile-nav-menu"
        :aria-expanded="mobileOpen"
        @click="openMenu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Fullscreen mobile menu -->
    <Teleport to="body">
      <Transition name="mobile-menu">
        <div
          v-if="mobileOpen"
          id="mobile-nav-menu"
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          class="fixed inset-0 z-[200] flex flex-col items-center justify-center md:hidden"
          style="background: radial-gradient(circle at 50% 40%, var(--color-violet) 0%, var(--color-navy) 45%, var(--color-black) 100%)"
          @keydown="handleMenuKeydown"
        >
          <nav class="flex flex-col items-center gap-2" aria-label="Mobile navigation">
            <NuxtLink
              v-for="(link, i) in mobileLinks"
              :key="link.label"
              :to="link.to"
              class="mobile-nav-link py-3 text-2xl font-light tracking-wide"
              :class="{ 'mobile-nav-link-active': isActive(link.to) }"
              :style="{ '--delay': `${i * 60}ms` }"
              @click="closeMenu"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>

          <button
            class="mobile-menu-close absolute left-1/2 -translate-x-1/2 bottom-[max(4rem,env(safe-area-inset-bottom))] w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Close menu"
            @click="closeMenu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)
const dialogRef = ref<HTMLElement | null>(null)
const menuButtonRef = ref<HTMLButtonElement | null>(null)

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

// Opens the overlay, locks background scroll, and moves focus inside it (WCAG focus order).
function openMenu() {
  mobileOpen.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    dialogRef.value?.querySelector<HTMLElement>('a, button')?.focus()
  })
}

// Closing always restores scroll and returns focus to the trigger that opened it.
function closeMenu() {
  if (!mobileOpen.value) return
  mobileOpen.value = false
  document.body.style.overflow = ''
  nextTick(() => menuButtonRef.value?.focus())
}

// Escape closes; Tab/Shift+Tab wrap inside the dialog so focus never leaks to the hidden page.
function handleMenuKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeMenu()
    return
  }
  if (e.key !== 'Tab' || !dialogRef.value) return
  const focusable = dialogRef.value.querySelectorAll<HTMLElement>('a, button')
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (!first || !last) return
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}

// Safety net: if the component unmounts while the menu is open, don't leave scroll locked.
onUnmounted(() => {
  if (mobileOpen.value) document.body.style.overflow = ''
})

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
]

const mobileLinks = [
  ...navLinks,
  { label: 'Contact Us', to: '/contacts' },
]

</script>

<style scoped>
/* Enter is slightly slower + a hint of scale so the takeover reads as deliberate; leave stays snappy. */
.mobile-menu-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.mobile-menu-leave-active {
  transition: opacity 0.2s ease;
}
.mobile-menu-enter-from {
  opacity: 0;
  transform: scale(0.98);
}
.mobile-menu-leave-to {
  opacity: 0;
}

/* Links stagger in via --delay (set per item in the template) instead of a JS timeline. */
.mobile-nav-link {
  position: relative;
  display: inline-block;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease, opacity 0.2s ease;
  animation: mobile-link-in 0.4s ease-out both;
  animation-delay: var(--delay, 0ms);
}
.mobile-nav-link:active {
  opacity: 0.7;
}
.mobile-nav-link:focus-visible,
.mobile-menu-close:focus-visible {
  outline: 2px solid var(--color-coral);
  outline-offset: 4px;
}

/* Same brand gradient as desktop .nav-underline, sized for the fullscreen menu instead of the navbar. */
.mobile-nav-link-active {
  background-image: radial-gradient(
    ellipse 70% 100% at 50% 50%,
    var(--color-coral) 0%,
    var(--color-primary) 55%,
    var(--color-magenta-deep) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.mobile-nav-link-active::after {
  content: "";
  position: absolute;
  left: 25%;
  right: 25%;
  bottom: 0.25rem;
  height: 2px;
  border-radius: 2px;
  background: inherit;
  background-clip: border-box;
}

@keyframes mobile-link-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-enter-active,
  .mobile-menu-leave-active {
    transition: opacity 0.2s ease;
  }
  .mobile-menu-enter-from {
    transform: none;
  }
  .mobile-nav-link {
    animation: none;
  }
}

/* brand gradient opens from the centre, and the label takes the same gradient */
.nav-underline {
  position: relative;
  display: inline-block;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  background-image: radial-gradient(
    ellipse 70% 100% at 50% 50%,
    var(--color-coral) 0%,
    var(--color-primary) 55%,
    var(--color-magenta-deep) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  transition: color 0.35s ease;
}
.nav-underline::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.25rem;
  height: 2px;
  border-radius: 2px;
  background: inherit;
  background-clip: border-box;
  transform: scaleX(0);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.nav-underline:hover {
  color: transparent;
}
.nav-underline:hover::after {
  transform: scaleX(1);
}

.nav-link-active {
  color: #ffffff;
}

@media (prefers-reduced-motion: reduce) {
  .nav-underline,
  .nav-underline::after {
    transition: none;
  }
}
</style>
