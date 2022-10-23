<script setup lang="ts">
import { close, isSolved, open, result, solve, startStatus, startStatus8, targetStatus, targetStatus8 } from '~/global'

onMounted(() => {
  startStatus.value = startStatus8
  targetStatus.value = targetStatus8
})
</script>

<script lang="ts">
export default {
  methods: {
    solvebtn() {
      result.value = []
      close.value = []
      open.value = []
      isSolved.value = false
      solve.value()
    },
  },
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <!-- <Canvas /> -->
    <!-- <Link :source="{ x: 400, y: 100 }" :target="{ x: 240, y: 300 }" /> -->
    <Header />
    <div flex="~ col">
      <div flex="~ center wrap" h-55>
        <StartMatrix />
        <div i-carbon:arrow-right text-7 self-center />
        <TargetMatrix />
      </div>
    </div>
    <div flex="~ col">
      <div flex="~ center wrap">
        数码
        <Toggle />
        <ToggleH />
        H函数
      </div>
    </div>
    <div flex="~ col" mb-10>
      <div flex="~ center wrap">
        <button btn p="x4 y2" @click="solvebtn()">
          <span tracking-1 pl1>开始求解</span>
        </button>
      </div>
    </div>
    <Display />
  </main>
</template>
