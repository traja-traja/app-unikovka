<template>

  <router-view></router-view>

</template>

<script>
// import firebase from 'firebase/app'

// export default {
  // computed: {
  //   userIsLogged() {
  //     return this.$store.getters.userIsLogged;
  //   }
  // },

  // watch: {
    // settings loading moved into store/modules/app/actions
    // userIsLogged(currentVal, oldVal) {
    //   if (currentVal && currentVal !== oldVal) {
    //     this.$store.dispatch('getGameSettings')
    //   }
    // }
  // },

  // mounted() {
  //   // check whether the user is by chance already logged in
  //   this.$store.dispatch('updateUserIsLogged')

  //   firebase.auth().onAuthStateChanged(() => {
  //     this.$store.dispatch('updateUserIsLogged')
  //   });
  // }
// }
</script>

<style lang="scss">
* {
  /*font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;*/
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  background: linear-gradient(rgb(194,233,251) 0%, rgb(161,196,253) 100%);
  background: linear-gradient(#d4fc79 0%, #96e6a1 100%);
  background-attachment: fixed;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
.el-main {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 60px;
}
h1 {
  margin-top: 10px;
  @media (max-width: 480px) {
    font-size: 24px;
  }
}

/* common rules */
.text-center {
    text-align: center;
}

/* element componenst - rewrite rules */
.el-form--label-top .el-form-item__label {
  width: 196px;
  line-height: 20px;
  margin-top: 10px;
  @media (max-height: 568px) {
    margin-top: 0;
  }
}

a.el-button {
  text-decoration: none;
}
.el-card {
  min-height: 80px;
}
.el-alert--warning a {
  color: #D08D28;
}
.el-alert--warning .el-alert__closebtn {
  top: 16px;
}
.el-alert, .el-message {
  box-shadow: 0px 0px 15px #ccc;
}
@media (max-width: 800px) {
  .small-hidden {
    display: none;
  }
  .small-width-auto {
    min-width: 0;
  }
}
@media (max-width: 480px) {
  .xsmall-hidden {
    display: none;
  }
  .xsmall-width-auto {
    min-width: 0;
  }
  .el-message {
    min-width: 280px!important;
    width: 280px;
  }
  .el-message-box {
    width: 280px !important;
  }
}
</style>
