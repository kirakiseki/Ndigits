<script setup lang="ts">
import { isSolved, result } from '~/global'
// TODO key作为标识符
</script>

<script lang="ts">
const display = ref(false)
watchEffect(() => {
  if (isSolved.value)
    display.value = isSolved.value
})
</script>

<template>
  <!-- <div v-if="display === true">
    <Matrix v-for="node in result" :key="node.fvalue" :node="node" />
  </div> -->
  <!-- <div v-if="display">
    display
  </div> -->
  <Matrix v-for="node in result" :key="node.fvalue" :node="node" />
</template>
