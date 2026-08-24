<template>
  <nav ref="navEl" class="fixed top-0 left-0 bg-black/80 backdrop-blur-md w-full z-50">
    <!-- same container as the footer and every section: the cap holds the
         padding, so the logo lines up with the content below it -->
    <div class="max-w-7xl mx-auto px-6 md:px-16 py-3 md:py-3.5 flex items-center justify-between">
      <NuxtLink to="/">
        <img
          src="/images/logo-ovg-stacked.webp"
          alt="One Visaya Gaming"
          width="440"
          height="329"
          class="nav-logo h-12 md:h-14 w-auto"
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
              <svg
                class="mobile-nav-icon"
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path :d="link.icon" />
              </svg>
              <span class="mobile-nav-label">{{ link.label }}</span>
            </NuxtLink>
          </nav>

          <button
            class="mobile-menu-close absolute top-4 right-4 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
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

// icon is a single 24x24 stroke path, drawn only in the mobile menu
const navLinks = [
  { label: 'Home', to: '/', icon: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { label: 'About Us', to: '/about', icon: 'M3 21H21M4 21V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V21M9 21V13C9 12.2044 9.31607 11.4413 9.87868 10.8787C10.4413 10.3161 11.2044 10 12 10C12.7956 10 13.5587 10.3161 14.1213 10.8787C14.6839 11.4413 15 12.2044 15 13V21' },
  { label: 'Products', to: '/products', icon: 'M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364M3 12C3 10.8181 3.23279 9.64778 3.68508 8.55585C4.13738 7.46392 4.80031 6.47177 5.63604 5.63604M3 12H7M5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21M5.63604 18.364L8.46447 15.5355M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364M12 21V17M18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12M18.364 18.364L15.5355 15.5355M21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604M21 12H17M18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3M18.364 5.63604L15.5355 8.46447M12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604M12 3V7M5.63604 5.63604L8.46447 8.46447M7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355M7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447M8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17M12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355M15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12M17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447M15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7M12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447' },
]

const mobileLinks = [
  ...navLinks,
  { label: 'Contact Us', to: '/contacts', icon: 'M9 4H5C4.46957 4 3.96086 4.21071 3.58579 4.58579C3.21071 4.96086 3 5.46957 3 6C3.23705 9.90074 4.8935 13.5798 7.65683 16.3432C10.4202 19.1065 14.0993 20.763 18 21C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V15L15 13L13.5 15.5C11.3285 14.429 9.57096 12.6715 8.5 10.5L11 9L9 4Z' },
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
  /* one ramp, shared by the label's text fill and the rule under the row */
  --brand-ramp: radial-gradient(
    ellipse 70% 100% at 50% 50%,
    var(--color-coral) 0%,
    var(--color-primary) 55%,
    var(--color-magenta-deep) 100%
  );
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  transition: opacity 0.2s ease;
  animation: mobile-link-in 0.4s ease-out both;
  animation-delay: var(--delay, 0ms);
}
.mobile-nav-link:active {
  opacity: 0.7;
}

/* the icon takes the same brand colour and the same curve as the label it
   sits beside; an SVG stroke cannot carry the label's background-clip
   gradient, so it lands on that gradient's mid tone */
.mobile-nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.35s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-nav-link:focus-visible,
.mobile-menu-close:focus-visible {
  outline: 2px solid var(--color-coral);
  outline-offset: 4px;
}

/* Same brand gradient as desktop .nav-underline. The rule spans the whole
   row, icon included — the icon is part of the menu item, not decoration
   beside it. */
.mobile-nav-label {
  display: inline-block;
  color: rgba(255, 255, 255, 0.8);
  background-image: var(--brand-ramp);
  -webkit-background-clip: text;
  background-clip: text;
  transition: color 0.35s ease;
}
.mobile-nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.35rem;
  height: 2px;
  border-radius: 2px;
  background-image: var(--brand-ramp);
  transform: scaleX(0);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-nav-link:hover .mobile-nav-label,
.mobile-nav-link-active .mobile-nav-label {
  color: transparent;
}
.mobile-nav-link:hover::after,
.mobile-nav-link-active::after {
  transform: scaleX(1);
}
.mobile-nav-link:hover .mobile-nav-icon,
.mobile-nav-link-active .mobile-nav-icon {
  color: var(--color-primary);
  transform: translateX(2px);
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
  .mobile-nav-icon,
  .mobile-nav-label,
  .mobile-nav-link::after {
    transition: none;
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
