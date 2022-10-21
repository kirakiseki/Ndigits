<script setup lang="ts">
import { baseFontSize, close, curveRate, groupByLayer, result } from '~/global'
import type { Node } from '~/global'
// TODO key作为标识符
</script>

<script lang="ts">
const nodes = ref<Node[]>(reactive([]))
const nodesLayer = ref<Node[][]>(reactive([[]]))
const size = reactive(useWindowSize())

function initCanvas(canvas: HTMLCanvasElement, width = size.width, height = baseFontSize.value * 7.5, _dpi?: number) {
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

watchEffect(() => {
  nodes.value = [...new Set(result.value.concat(close.value).sort((a, b) => a.layer - b.layer))]
  // console.log(nodes.value)
  nodesLayer.value = groupByLayer.value(nodes.value)
  for (let layer of nodesLayer.value)
    layer = layer.sort((a, b) => a.fvalue - b.fvalue)
  console.log(nodesLayer.value)
})

export default {
  updated() {
    // const ctx = canvasel.value.getContext('2d')!

    // console.log(this.$refs?.mat?.[1]?.$data.n)
    // console.log(this.$refs.layerlink[0].getBoundingClientRect())
    // for (const index in this.$refs.layer as any) {
    //   if (this.$refs.layer[index].clientWidth < size.width) {
    //     this.$refs.layer[index].setAttribute('flex', '~ center')
    //     console.log(index + " " + this.$refs.layer[index].clientWidth)
    //   }
    // }
    if (this.$refs.layerlink) {
      for (let linkIndex = 0; linkIndex < this.$refs.layerlink.length; linkIndex++) {
        const el = ref<HTMLCanvasElement>(reactive(this.$refs.layerlink[linkIndex]))
        const canvas = el.value!
        const { ctx } = initCanvas(canvas)
        // const { width, height } = canvas
        console.log(linkIndex)
        // console.log(nodesLayer.value[parseInt(linkIndex) + 1]) // nextline

        // ctx.beginPath()
        // ctx.moveTo(0, 0)
        // ctx.lineTo(40, 40)
        // ctx.stroke()

        // ctx.beginPath()
        // ctx.moveTo(20, 20)
        // ctx.lineTo(80, 40)
        // ctx.stroke()
        if (nodesLayer.value[linkIndex + 1]) {
          for (const nodeNextLayer of nodesLayer.value[linkIndex + 1]) {
            // nodesLayer.value[parseInt(linkIndex) + 1].forEach((nodeNextLayer) => {
            if (this.$refs?.mat) {
              // getThisElement
              const nodeNextLayerEl = this.$refs?.mat.find((item) => {
                return item.$data.n === nodeNextLayer
              }).$el
              // getParentElement
              const nodeNextLayerParentEl = this.$refs?.mat.find((item) => {
                return item.$data.n === nodeNextLayer.parent
              }).$el
              // console.log(nodeNextLayerEl.getBoundingClientRect())
              // console.log(nodeNextLayerParentEl.getBoundingClientRect())
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
  <!-- <div v-if="display === true">
    <Matrix v-for="node in result" :key="node.fvalue" :node="node" />
    :class="this.$refs.init. `transform="translate-x-1/2""
  </div> -->
  <!-- <div v-if="display"> -->
  <!-- <div v-for="layer in nodesLayer" :key="layer" flex="~ col" pt4 items-center ref="layer"> -->
  <div v-for="layer in nodesLayer" :key="layer" ref="layer" flex="~ col" items-start>
    <div flex>
      <Matrix v-for="node in layer" :key="node.fvalue" ref="mat" :node="node" />
    </div>
    <canvas v-if="layer" ref="layerlink" h-30 />
  </div>
  <!-- <div flex flex-inline>
    <Matrix v-for="node in nodes" :key="node.fvalue" :node="node" />
  </div> -->
  <!-- </div> -->
  <!-- <Matrix v-for="node in close" :key="node.fvalue" :node="node" /> -->
</template>
