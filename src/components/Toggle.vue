<script setup lang="ts">
import { close, digits, isSolved, open, result, startStatus, startStatus15, startStatus8, targetStatus, targetStatus15, targetStatus8 } from '~/global'
</script>

<script lang="ts">
export default {
  methods: {
    toggleDigits() {
      digits.value = digits.value === 8 ? 15 : 8
      startStatus.value = digits.value === 8 ? startStatus8 : startStatus15
      targetStatus.value = digits.value === 8 ? targetStatus8 : targetStatus15
      result.value = []
      close.value = []
      open.value = []
      isSolved.value = false
    },
  },
}
</script>

<template>
  <div square-btn m2>
    <button :class="digits === 8 ? 'text-primary' : 'op80' " @click="toggleDigits()">
      8数码
    </button>
    <div w-1px h-4 border="r base" />
    <button :class="digits === 15 ? 'text-primary' : 'op80' " @click="toggleDigits()">
      15数码
    </button>
  </div>
</template>
