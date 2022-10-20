<script setup lang="ts">
import { isSolved, result } from '~/global'
// TODO key作为标识符
</script>

<template>
  <div v-if="isSolved">
    <Matrix v-for="node in result" :key="node.fvalue" :node="node" />
  </div>
</template>
