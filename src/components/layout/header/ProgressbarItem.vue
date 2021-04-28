<template>
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="timePercentage"
      :color="color">

        <span>{{ timeCaption }} {{ timeContent }}</span>

    </el-progress>
</template>

<script>
export default {
  props: {
    time: Number,
    maxTime: Number,
    timeCaption: String,
    color: String
  },

  computed: {
    timePercentage() {
      return (this.time / this.maxTime * 100)
    },

    timeContent() {
      const seconds = (this.time % 60) + ''
      const minutes = ((this.time - seconds) / 60) + ''
      return (
        minutes.padStart(1, '0') + ':' + seconds.padStart(2, '0')
      )
    }
  },

  methods: {
    switchProgressbar() {
      this.$emit('settings-switch-progressbar')
    }
  }
}
</script>

<style scoped>
:deep() .el-progress-bar__outer {
  background-color: #6c7986;
}
</style>