<script setup lang="ts">
import { digits, flatten, startStatus, unflatten } from '~/global'
</script>

<script lang="ts">
export default {
  methods: {
    changeBlank: (a: number) => {
      const side = digits.value === 8 ? 3 : 4
      const startMat = flatten.value(startStatus.value)
      const blank = startMat.indexOf(0)
      const clickNumber = startMat.indexOf(a)
      if (clickNumber === blank)
        return
      if (clickNumber === blank - 1 || clickNumber === blank + 1) {
        startMat[blank] = a
        startMat[clickNumber] = 0
      }
      else if (clickNumber === blank - side || clickNumber === blank + side) {
        startMat[blank] = a
        startMat[clickNumber] = 0
      }
      startStatus.value = unflatten.value(startMat, side)
    },
  },
}
</script>

<template>
  <div
    :class="`w-${digits === 8 ? 24 : 32} h-${digits === 8 ? 24 : 32}`" flex flex-wrap m-10 bg-bluegray-1
    dark:bg-bluegray-5
  >
    <div v-for="number in flatten(startStatus)" :key="number" w-8 h-8 flex border @click="changeBlank(number)">
      <p flex-auto self-center text-5>
        {{ number !== 0 ? number : "" }}
      </p>
    </div>
  </div>
</template>
