<script setup lang="ts">
import { curveRate } from '~/global'
const props = defineProps<{
  source: { x: number; y: number }
  target: { x: number; y: number }
}>()
const deltaY = curveRate.value * (props.target.y - props.source.y)
</script>

<template>
  <svg w-screen h-screen style="z-index:-1">
    <path
      :d="`M${props.source.x} ${props.source.y} C${props.source.x} ${props.target.y - deltaY} ${props.target.x} ${props.source.y + deltaY} ${props.target.x} ${props.target.y}`"
      stroke-truegray
      stroke-2
      fill-none
    />
  </svg>
</template>
