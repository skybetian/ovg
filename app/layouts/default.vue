<template>
  <div>
    <LayoutNavbar />
    <!-- Spacer for fixed navbar -->
    <div class="h-[80px]" />
    <main>
      <slot />
    </main>
    <LayoutFooter />
    <LayoutFloatingCta />
  </div>
</template>
