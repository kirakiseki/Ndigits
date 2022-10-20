<script setup lang="ts">
import IOMatrix from './components/IOMatrix.vue'
import { digits, startStatus, startStatus8, targetStatus, targetStatus8 } from '~/global'

onMounted(() => {
  startStatus.value = startStatus8
  targetStatus.value = targetStatus8
})
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <!-- <Link :source="{ x: 400, y: 100 }" :target="{ x: 240, y: 300 }" /> -->
    <Header />
    <div flex="~ col">
      <div flex="~ center wrap" h-55>
        <IOMatrix />
        <div i-carbon:arrow-right text-7 self-center />
        <IOMatrix />
      </div>
    </div>
    <div flex="~ col">
      <div flex="~ center wrap">
        <Toggle />
      </div>
    </div>
    <div flex="~ col">
      <div flex="~ center wrap">
        <button btn p="x4 y2">
          <span tracking-1 pl1>开始求解</span>
        </button>
      </div>
    </div>
    <Matrix :data="[0, 4, 22, 87, 4, 9, 0, 7, 8]" :digits="digits" />
    <Matrix :data="[0, 4, 22, 87, 4, 9, 0, 7, 8]" :digits="digits" />
    <Matrix :data="[0, 4, 22, 87, 4, 9, 0, 7, 8]" :digits="digits" />
    <Matrix :data="[0, 4, 22, 87, 4, 9, 0, 7, 8]" :digits="digits" />
    <Canvas />
    <Solve />
  </main>
</template>
