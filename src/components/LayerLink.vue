<script setup lang="ts">
import type { PropType } from 'vue'
import { baseFontSize, curveRate, groupByLayer, lineWidth, nodes, nodesLayer, result, scrollWidth } from '~/global'
import type { Node } from '~/global'
</script>

<script lang="ts">
function initCanvas(canvas: HTMLCanvasElement, width = scrollWidth.value, height = baseFontSize.value * 7.5, _dpi?: number) {
  console.log(`init${width}`)
  const ctx = canvas.getContext('2d')!

  const dpr = window.devicePixelRatio || 1
  // @ts-expect-error vendor
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1

  const dpi = _dpi || dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  ctx.scale(dpi, dpi)

  return { ctx, dpi }
}

export default {
  props: {
    layer: {
      type: Object as PropType<Node[]>,
      required: true,
    },
  },
  mounted() {
    this.render()
    console.log(`mounted${scrollWidth.value}`)
  },
  updated() {
    this.render()
    console.log(`updated${scrollWidth.value}`)
  },
  methods: {
    render() {
      const el = ref<HTMLCanvasElement>(reactive(this.$refs.layerlink))
      const canvas = el.value!
      const { ctx } = initCanvas(canvas, scrollWidth.value)
      ctx.lineWidth = lineWidth.value

      const childLayer = this.layer?.[0].layer + 1
      console.log(childLayer)
      console.log('test')
      if (nodesLayer.value[childLayer]) {
        const childNodes = nodesLayer.value[childLayer]
        // console.log(childNodes)
        for (const child of childNodes) {
          console.log(this.$refs?.mat)
          if (this.$refs?.mat) {
          // getThisElement
            const childEl = this.$refs?.mat.find((item) => {
              return item.$data.n === child
            }).$el
            // getParentElement
            const parent = this.$refs?.mat.find((item) => {
              return item.$data.n === childEl.parent
            }).$el

            const color = parent.$data.n.color
            const parentEl = parent.$el
            ctx.strokeStyle = color
            const childX = childEl.getBoundingClientRect().left - baseFontSize.value * 1 + childEl.getBoundingClientRect().width / 2
            const parentX = parentEl.getBoundingClientRect().left - baseFontSize.value * 1 + childEl.getBoundingClientRect().width / 2
            console.log(`${childX} ${parentX}`)
            ctx.beginPath()
            ctx.moveTo(parentX, 0)
            const deltaY = curveRate.value * baseFontSize.value * 7.5
            ctx.bezierCurveTo(parentX, baseFontSize.value * 7.5 - deltaY, childX, deltaY, childX, baseFontSize.value * 7.5)
            ctx.stroke()
          }
        }
      }
    },
  },
}
</script>

<template>
  <canvas v-if="layer" ref="layerlink" h-30 />
</template>
