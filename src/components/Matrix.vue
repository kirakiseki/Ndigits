<script setup lang="ts">
import type { PropType } from 'vue'
import type { Node } from '~/global'
import { digits, flatten } from '~/global'

// const props = defineProps<{
//   node: SolveNode
// }>()
</script>

<script lang="ts">
export default {
  props: {
    node: {
      type: Object as PropType<Node>,
      required: true,
    },
  },
  data() {
    return {
      n: this.$props.node,
    }
  },
}
</script>

<template>
  <div :class="`w-${digits === 8 ? 24 : 32} h-${digits === 8 ? 24 : 32}`" flex flex-wrap mx-10 mb-20 mt-10 bg-bluegray-1 dark:bg-bluegray-5>
    <div v-for="number in flatten(node.mat)" :key="number" w-8 h-8 flex border>
      <p flex-auto self-center text-5>
        {{ number !== 0 ? number : "" }}
      </p>
    </div>
    L: {{ node.layer }} F: {{ node.fvalue }}
  </div>
</template>
