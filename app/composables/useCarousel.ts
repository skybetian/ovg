import type { ComputedRef, Ref } from 'vue'

// Shared pointer-drag paging behind TestimonialSection, Game Categories and any future carousel.
// Chunks `items` into pages of `perPage`, drags the track by pointer delta with end-of-track resistance.
export function useCarousel<T>(items: Ref<T[]> | ComputedRef<T[]>, perPage: Ref<number>) {
  const viewportEl = ref<HTMLElement>()
  const current = ref(0)
  const dragOffset = ref(0)
  const dragging = ref(false)

  const pages = computed(() => {
    const out: T[][] = []
    for (let i = 0; i < items.value.length; i += perPage.value) {
      out.push(items.value.slice(i, i + perPage.value))
    }
    return out
  })

  const trackStyle = computed(() => ({
    transform: `translate3d(calc(${-current.value * 100}% + ${dragOffset.value}px), 0, 0)`,
    touchAction: 'pan-y',
    cursor: dragging.value ? 'grabbing' : 'grab',
    userSelect: 'none' as const,
  }))

  let pointerId: number | null = null
  let startX = 0
  let trackWidth = 0

  function onDown(e: PointerEvent) {
    if (!viewportEl.value || (e.pointerType === 'mouse' && e.button !== 0)) return
    pointerId = e.pointerId
    startX = e.clientX
    trackWidth = viewportEl.value.clientWidth
    dragging.value = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onMove(e: PointerEvent) {
    if (!dragging.value || e.pointerId !== pointerId) return
    let delta = e.clientX - startX
    const last = pages.value.length - 1
    // rubber-band at the ends so it cannot be dragged into empty space
    if ((current.value === 0 && delta > 0) || (current.value === last && delta < 0)) delta *= 0.35
    dragOffset.value = delta
  }

  function onUp(e: PointerEvent) {
    if (!dragging.value || e.pointerId !== pointerId) return
    const threshold = Math.max(50, trackWidth * 0.15)
    const last = pages.value.length - 1
    if (dragOffset.value <= -threshold && current.value < last) current.value++
    else if (dragOffset.value >= threshold && current.value > 0) current.value--
    dragOffset.value = 0
    dragging.value = false
    pointerId = null
  }

  // fewer pages after a resize (perPage change) can leave current past the end
  function clampCurrent() {
    current.value = Math.min(current.value, Math.max(0, pages.value.length - 1))
  }

  return { viewportEl, current, dragOffset, dragging, pages, trackStyle, onDown, onMove, onUp, clampCurrent }
}
