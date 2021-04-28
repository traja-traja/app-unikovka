<template>
  <el-container direction="vertical">

    <Header>

        <template v-slot:progressbar>
          <slot name="progressbar"></slot>
        </template>

        <template v-slot:game-menu>
          <slot name="game-menu"></slot>
        </template>

    </Header>
    
    <el-main>

      <slot name="main-header">
        <hello-user></hello-user>
      </slot>

      <div class="home">
        <slot></slot>  
      </div>

    </el-main>

  </el-container>
</template>

<script>
import Header from './header/Header.vue'
import HelloUser from './parts/HelloUser.vue'

export default {
    components: {
        Header,
        HelloUser
    }
}
</script>
