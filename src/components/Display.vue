<script setup lang="ts">
import { close, groupBy, result } from '~/global'
import type { Node } from '~/global'
// TODO key作为标识符
</script>

<script lang="ts">
const nodes = ref<Node[]>(reactive([]))
const nodesLayer = ref<Node[][]>(reactive([[]]))
const size = reactive(useWindowSize())
watchEffect(() => {
  nodes.value = [...new Set(result.value.concat(close.value).sort((a, b) => a.layer - b.layer))]
  // console.log(nodes.value)
  nodesLayer.value = groupBy.value(nodes.value)
  console.log(nodesLayer.value)
})

export default {
  updated() {
    // console.log(this.$refs?.mat?.[1]?.$data.n)
    // for (const index in this.$refs.layer as any) {
    //   if (this.$refs.layer[index].clientWidth < size.width) {
    //     this.$refs.layer[index].setAttribute('flex', '~ center')
    //     console.log(index + " " + this.$refs.layer[index].clientWidth)
    //   }
    // }
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
  <div v-for="layer in nodesLayer" :key="layer" ref="layer" flex>
    <div flex>
      <Matrix v-for="node in layer" :key="node.fvalue" ref="mat" :node="node" />
    </div>
  </div>
  <!-- <div flex flex-inline>
    <Matrix v-for="node in nodes" :key="node.fvalue" :node="node" />
  </div> -->
  <!-- </div> -->
  <!-- <Matrix v-for="node in close" :key="node.fvalue" :node="node" /> -->
</template>
