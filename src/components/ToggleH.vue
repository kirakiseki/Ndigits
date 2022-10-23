<script setup lang="ts">
import { Hfunc, Hfunc1, Hfunc2, Hselect, close, isSolved, open, result } from '~/global'
</script>

<script lang="ts">
export default {
  methods: {
    toggleH() {
      Hfunc.value = Hselect.value === 1 ? Hfunc2.value : Hfunc1.value
      Hselect.value = Hselect.value === 1 ? 2 : 1
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
    <button :class="Hselect === 1 ? 'text-primary' : 'op80' " @click="toggleH()">
      错排数
    </button>
    <div w-1px h-4 border="r base" />
    <button :class="Hselect === 2 ? 'text-primary' : 'op80' " @click="toggleH()">
      错排距离
    </button>
  </div>
</template>
