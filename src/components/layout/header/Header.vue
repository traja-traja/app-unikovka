<template>
  <el-header>
    <div class="el-header-holder">
      <MainMenu>
          <template v-slot:game-menu>
            <slot name="game-menu">
            </slot>
          </template>
      </MainMenu>     
    
      <div class="el-header-progressbar">
        <slot name="progressbar"></slot>
      </div>
    </div>
  </el-header>
</template>

<script>
import MainMenu from './MainMenu.vue'

export default {
    components: {
      MainMenu
    }
}
</script>

<style scoped lang="scss">
header {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
    background-color: $primary;
    padding-top: 10px;
}
.el-header-holder {
    max-width: 800px;
    margin: 0 auto;
    text-align: left;
    display: flex;
    flex-wrap: nowrap;
}
.el-header-progressbar {
  flex-basis: 80%;
  padding-left: 20px;
  padding-top: 8px;
}
</style>
