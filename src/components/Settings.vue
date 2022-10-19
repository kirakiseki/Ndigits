<script setup lang="ts">
import { digits, startStatus, startStatus15, startStatus8, targetStatus, targetStatus15, targetStatus8 } from '~/global'
</script>

<script lang="ts">
export default {
  methods: {
    toggleDigits() {
      digits.value = digits.value === 8 ? 15 : 8
      startStatus.value = digits.value === 8 ? startStatus8 : startStatus15
      targetStatus.value = digits.value === 8 ? targetStatus8 : targetStatus15
    },
  },
}
</script>

<template>
  <div square-btn m2>
    <button text-primary @click="toggleDigits()">
      设置运算
    </button>
  </div>
</template>
