<script setup lang="ts">
import { digits, flatten } from '~/global'
import type { Node } from '~/global'

const props = defineProps<{
  node: Node
}>()
</script>

<template>
  <div :class="`w-${digits === 8 ? 24 : 32} h-${digits === 8 ? 24 : 32}`" flex flex-wrap mx-10 mb-20 mt-10 bg-bluegray-1 dark:bg-bluegray-5>
    <div v-for="number in flatten(props.node.mat)" :key="number" w-8 h-8 flex border>
      <p flex-auto self-center text-5>
        {{ number !== 0 ? number : "" }}
      </p>
    </div>
    L: {{ node.layer }} F: {{ node.fvalue }}
  </div>
</template>
