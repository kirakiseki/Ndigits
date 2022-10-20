<script>
export default {
  data() {
    return {
      index: 0, // 索引
    }
  },
  watch: { // 实时检测
    index(idx) { // 实时监听index的变化
      console.log(idx) // 在这里你可以再根据idx的值，做出其它的操作
    },
  },
  methods: {
    showFun(idx) {
      this.index = idx
    },
  },
}
</script>

<template>
  {{ index }}
  <div>
    <div @click="showFun(0)">
      Tab1
    </div>
    <div @click="showFun(1)">
      Tab2
    </div>
    <div @click="showFun(2)">
      Tab3
    </div>
  </div>
  <div>
    <div v-if="index === 0">
      cont1
    </div>
    <div v-if="index === 1">
      cont2
    </div>
    <div v-if="index === 2">
      cont3
    </div>
  </div>
</template>
