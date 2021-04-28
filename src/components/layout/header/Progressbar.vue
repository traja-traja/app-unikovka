<template>
    <ProgressbarItem
      v-show="!showTotalTime"
      :time="currentRoundTime"
      :max-time="maxRoundTime"
      time-caption="čas kola = "
      color="#409EFF"
      @click="switchProgressbar">
    </ProgressbarItem>

    <ProgressbarItem
      v-show="showTotalTime"
      :time="totalTime"
      :max-time="maxTotalTime"
      time-caption="celkový čas = "
      @click="switchProgressbar"
      color="#41B883">
    </ProgressbarItem>
</template>

<script>
import ProgressbarItem from './ProgressbarItem.vue'

export default {
  components: {
    ProgressbarItem
  },

  emits: ['switch-progressbar'],

  props: {
    showTotalTime: Boolean,
    currentRoundTime: Number,
    maxRoundTime: Number,
    totalTime: Number,
    maxTotalTime: Number
  },

  methods: {
    switchProgressbar() {
      this.$emit('switch-progressbar')
    }
  }
}
</script>

<style scoped>
.el-progress {
  cursor: Pointer;
}
</style>