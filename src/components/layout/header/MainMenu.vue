<template>
  <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link el-button el-button--primary">
      Menu<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="go-home">Hlavní menu</el-dropdown-item>
        <el-dropdown-item command="go-game">Hrát únikovku</el-dropdown-item>
        <el-dropdown-item command="go-best-players">Nejlepší hráči</el-dropdown-item>
        <el-dropdown-item command="go-login">{{ loginItemTxt }}</el-dropdown-item>
        <el-dropdown-item command="screenfull" v-if="screenfullButtonShown">Fullscreen mód</el-dropdown-item>
        
        <slot name="game-menu">
        </slot>

      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import screenfull from 'screenfull'

export default {
    data() {
      return {
        screenfullButtonShown: false
      }
    },
    
    methods: {
        toggleFullscreen() {
            if (screenfull.isEnabled) {
              screenfull.toggle()
            }
        },

        handleCommand(command) {
          switch (command) {
            case 'go-home': this.$router.push('/')
              break;
            case 'go-game': this.$router.push('/game')
              break;
            case 'go-best-players': this.$router.push('/best-players')
              break;
            case 'go-login': this.$router.push('/login')
              break;
            case 'screenfull': this.toggleFullscreen()
              break;
          }
        },

        // show screenfulll button only when the feature is enabled in the browser
        initializescreenfullButton() {
          this.screenfullButtonShown = screenfull.isEnabled
        }
    },

    computed: {
        buttonClass() {
          return [
              {
                'is-disabled': !this.$store.getters.userIsLogged,
                'el-button--primary': this.$store.getters.userIsLogged
              },
              'el-button'
            ]
        },

        loginItemTxt() {
          if (this.$store.getters.activeUser) {
            return 'Přepnout hráče'
          } else {
            return 'Přihlásit se'
          }
        }
    },

    mounted() {
      this.initializescreenfullButton()
    }
}
</script>

<style scoped lang="scss">
.el-button {
  min-width: 0;
}
.el-popper {
  z-index: 100;
}
</style>
