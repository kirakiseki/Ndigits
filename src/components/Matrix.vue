<script setup lang="ts">
import { digits, flatten, startStatus } from '~/global'
</script>

<template>
  <div :class="`w-${digits === 8 ? 24 : 32}`" flex flex-wrap mx-10 mb-30 bg-bluegray-1 dark:bg-bluegray-5>
    <div v-for="number in flatten(startStatus)" :key="number" w-8 h-8 flex border>
      <p flex-auto self-center text-5>
        {{ number !== 0 ? number : "" }}
      </p>
    </div>
  </div>
</template>
