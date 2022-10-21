<script setup lang="ts">
import { baseFontSize, close, curveRate, groupByLayer, lineWidth, result } from '~/global'
import type { Node } from '~/global'
</script>

<script lang="ts">
const nodes = ref<Node[]>(reactive([]))
const nodesLayer = ref<Node[][]>(reactive([[]]))
const interval = ref()
const scrollWidth = ref(0)
const refreshCount = ref(0)

watchEffect(() => {
  nodes.value = [...new Set(result.value.concat(close.value).sort((a, b) => a.layer - b.layer))]
  nodesLayer.value = groupByLayer.value(nodes.value)
  for (let layer of nodesLayer.value)
    layer = layer.sort((a, b) => a.fvalue - b.fvalue)
  console.log(nodesLayer.value)
})

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
  watch: {
    scrollWidth() {
      console.log(`upd${scrollWidth.value}`)
      if (refreshCount.value < 2) {
        this.$forceUpdate()
        refreshCount.value++
      }
      else {
        refreshCount.value = 0
      }
    },
  },
  mounted() {
    interval.value = setInterval(() => {
      scrollWidth.value = document.body.scrollWidth
    }, 300)
  },

  unmounted() {
    clearInterval(interval.value)
    console.log(`umn${scrollWidth.value}`)
    this.$refs.layerlink.reverse()
  },

  updated() {
    console.log(`updated${scrollWidth.value}`)
    if (this.$refs.layerlink) {
      this.$refs.layerlink.reverse()
      for (let linkIndex = 0; linkIndex < this.$refs.layerlink.length; linkIndex++) {
        const el = ref<HTMLCanvasElement>(this.$refs.layerlink[linkIndex])
        const canvas = el.value!
        const { ctx } = initCanvas(canvas, scrollWidth.value)
        ctx.lineWidth = lineWidth.value
        ctx.fillText(linkIndex, 10, 10, 50)
        // const { width, height } = canvas
        console.log(linkIndex)
        if (nodesLayer.value[linkIndex + 1]) {
          for (const nodeNextLayer of nodesLayer.value[linkIndex + 1]) {
            if (this.$refs?.mat) {
              // getThisElement
              const nodeNextLayerEl = this.$refs?.mat.find((item: any) => {
                return item.$data.n === nodeNextLayer
              }).$el
              // getParentElement
              const nodeNextLayerParent = this.$refs?.mat.find((item: any) => {
                return item.$data.n === nodeNextLayer.parent
              })

              const color = nodeNextLayerParent.$data.n.color
              const nodeNextLayerParentEl = nodeNextLayerParent.$el
              ctx.strokeStyle = color
              const childX = nodeNextLayerEl.getBoundingClientRect().left - baseFontSize.value * 1 + nodeNextLayerEl.getBoundingClientRect().width / 2
              const parentX = nodeNextLayerParentEl.getBoundingClientRect().left - baseFontSize.value * 1 + nodeNextLayerEl.getBoundingClientRect().width / 2
              console.log(`${childX} ${parentX}`)
              ctx.beginPath()
              ctx.moveTo(parentX, 0)
              const deltaY = curveRate.value * baseFontSize.value * 7.5
              ctx.bezierCurveTo(parentX, baseFontSize.value * 7.5 - deltaY, childX, deltaY, childX, baseFontSize.value * 7.5)
              ctx.stroke()
            }
          }
        }
      }
    }
  },
}
</script>

<template>
  <div v-for="layer in nodesLayer" :key="layer" ref="layer" flex="~ col" items-start>
    <div flex>
      <Matrix v-for="node in layer" :key="node.fvalue" ref="mat" :node="node" />
    </div>
    <canvas v-if="layer" ref="layerlink" h-30 />
  </div>
</template>
