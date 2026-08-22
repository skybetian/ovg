<template>
  <div ref="rootEl" class="halftone" :style="{ aspectRatio: ratio, backgroundColor }">
    <canvas ref="canvasEl" class="halftone-canvas" :aria-label="alt" role="img" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt: string
  /** distance between dot centres, in CSS px */
  dotSpacing?: number
  /** largest dot radius, in CSS px. Above spacing/2 neighbouring dots merge into solid ink */
  maxDotSize?: number
  /** ink below this much coverage is dropped entirely, which keeps the blacks clean */
  threshold?: number
  dotColor?: string
  backgroundColor?: string
  /** >1 pushes midtones toward the background, <1 floods them with ink */
  contrast?: number
  /** samples per CSS px when reading the source. 1 is plenty; raise for very fine grids */
  scale?: number
  /** false: bright source becomes ink (matches the reference). true: dark becomes ink */
  invert?: boolean
  /** force a 1:1 frame; the source is centre-cropped to fill it */
  square?: boolean
}>(), {
  dotSpacing: 5,
  maxDotSize: 4,
  threshold: 0.06,
  dotColor: '#CA3628',
  backgroundColor: '#000000',
  contrast: 1.15,
  scale: 1,
  invert: false,
  square: false,
})

const rootEl = ref<HTMLElement>()
const canvasEl = ref<HTMLCanvasElement>()
const ratio = ref('4 / 3')

let source: HTMLImageElement | null = null
let observer: ResizeObserver | undefined
let frame = 0

/** Average the source down to one pixel per dot cell — far cheaper than reading
 *  full resolution, and the averaging is the sampling the halftone wants anyway. */
function sampleGrid(cols: number, rows: number) {
  if (!source || cols < 1 || rows < 1) return null
  const c = document.createElement('canvas')
  c.width = cols
  c.height = rows
  const g = c.getContext('2d', { willReadFrequently: true })
  if (!g) return null
  g.imageSmoothingEnabled = true
  g.imageSmoothingQuality = 'high'
  if (props.square) {
    // centre-crop the longer axis rather than squashing the subject
    const side = Math.min(source.naturalWidth, source.naturalHeight)
    const sx = (source.naturalWidth - side) / 2
    const sy = (source.naturalHeight - side) / 2
    g.drawImage(source, sx, sy, side, side, 0, 0, cols, rows)
  } else {
    g.drawImage(source, 0, 0, cols, rows)
  }
  return g.getImageData(0, 0, cols, rows).data
}

function render() {
  const canvas = canvasEl.value
  const root = rootEl.value
  if (!canvas || !root || !source) return

  const cssW = root.clientWidth
  const cssH = root.clientHeight
  if (cssW < 2 || cssH < 2) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.round(cssW * dpr)
  canvas.height = Math.round(cssH * dpr)

  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(0, 0, cssW, cssH)

  const spacing = Math.max(2, props.dotSpacing)
  const cols = Math.ceil(cssW / spacing) + 1
  const rows = Math.ceil(cssH / spacing) + 1

  const data = sampleGrid(
    Math.max(1, Math.round(cols * props.scale)),
    Math.max(1, Math.round(rows * props.scale)),
  )
  if (!data) return

  const sCols = Math.max(1, Math.round(cols * props.scale))
  const sRows = Math.max(1, Math.round(rows * props.scale))

  ctx.fillStyle = props.dotColor
  ctx.beginPath()

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const sx = Math.min(sCols - 1, Math.floor((col / cols) * sCols))
      const sy = Math.min(sRows - 1, Math.floor((row / rows) * sRows))
      const i = (sy * sCols + sx) * 4

      // Rec. 601 luma: matches how the eye weights the channels
      const luma = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255
      let ink = props.invert ? 1 - luma : luma

      if (ink <= props.threshold) continue
      ink = (ink - props.threshold) / (1 - props.threshold)
      ink = Math.pow(ink, props.contrast)

      const r = props.maxDotSize * ink
      if (r < 0.18) continue

      const x = col * spacing
      const y = row * spacing
      ctx.moveTo(x + r, y)
      ctx.arc(x, y, r, 0, Math.PI * 2)
    }
  }

  ctx.fill()
}

function scheduleRender() {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(render)
}

onMounted(() => {
  const img = new Image()
  img.decoding = 'async'
  img.src = props.src
  img.onload = () => {
    source = img
    ratio.value = props.square ? '1 / 1' : `${img.naturalWidth} / ${img.naturalHeight}`
    nextTick(scheduleRender)
  }

  if (rootEl.value) {
    observer = new ResizeObserver(scheduleRender)
    observer.observe(rootEl.value)
  }
})

// live-editable: changing any knob redraws without a reload
watch(
  () => [
    props.src, props.dotSpacing, props.maxDotSize, props.threshold,
    props.dotColor, props.backgroundColor, props.contrast, props.scale, props.invert, props.square,
  ],
  () => {
    if (props.src !== source?.getAttribute('src')) {
      const img = new Image()
      img.decoding = 'async'
      img.src = props.src
      img.onload = () => {
        source = img
        ratio.value = props.square ? '1 / 1' : `${img.naturalWidth} / ${img.naturalHeight}`
        scheduleRender()
      }
      return
    }
    scheduleRender()
  },
)

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<style scoped>
.halftone {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.halftone-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
