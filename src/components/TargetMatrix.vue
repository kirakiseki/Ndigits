<script setup lang="ts">
import { digits, flatten, targetStatus, unflatten } from '~/global'
</script>

<script lang="ts">
export default {
  methods: {
    changeBlank: (a: number) => {
      const side = digits.value === 8 ? 3 : 4
      const targetMat = flatten.value(targetStatus.value)
      const blank = targetMat.indexOf(0)
      const clickNumber = targetMat.indexOf(a)
      if (clickNumber === blank)
        return
      if (clickNumber === blank - 1 || clickNumber === blank + 1) {
        targetMat[blank] = a
        targetMat[clickNumber] = 0
      }
      else if (clickNumber === blank - side || clickNumber === blank + side) {
        targetMat[blank] = a
        targetMat[clickNumber] = 0
      }
      targetStatus.value = unflatten.value(targetMat, side)
    },
  },
}
</script>

<template>
  <div
    :class="`w-${digits === 8 ? 24 : 32} h-${digits === 8 ? 24 : 32}`" flex flex-wrap m-10 bg-bluegray-1
    dark:bg-bluegray-5
  >
    <div v-for="number in flatten(targetStatus)" :key="number" w-8 h-8 flex border @click="changeBlank(number)">
      <p flex-auto self-center text-5>
        {{ number !== 0 ? number : "" }}
      </p>
    </div>
  </div>
</template>
