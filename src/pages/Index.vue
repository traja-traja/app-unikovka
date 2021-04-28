<template>
  <div class="home-page">

    <h1>Únikovka!<span>... z matiky!</span></h1>

    <div class="welcome-box">
      Ahoj, {{ activeUser ? activeUser.greeting + ', ' : '' }} vítej v Únikovce!
    </div>

    <div class="main-menu">
      <router-link to="/game" class="el-button el-button--primary">Hrát únikovku!</router-link>
      <router-link to="/best-players" class="el-button el-button--primary">Nejlepší hráči</router-link>
      <router-link to="/login" class="el-button">Přihlášení a změna hráče</router-link>
    </div>

  </div>
</template>

<script>

export default {
  components: {
  },
  props: {
    activeUser: {
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
.home-page {
  min-height: 100%;
  background-image: url('../assets/logo.svg');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 100% auto;
  position: relative;
}
h1 {
  color: $primary;
  margin-top: 0;
  text-align: center;
  padding-top: 50%;
  @media (min-width: 667px) {
    text-align: left;
    padding-top: 10%;
    padding-left: 15%;
    padding-bottom: 5%;
    color: white;
  }
}
.welcome-box {
  text-align: center;
  padding-top: 5%;
  padding-bottom: 5%;
  @media (min-width: 667px) {
    text-align: left;
    padding-top: 0;
    padding-left: 15%;
    padding-bottom: 5px;
    margin-bottom: 20%;
    color: white;
    @media (orientation:landscape) and (min-aspect-ratio: 3/2) {
      display: none;
    }
  }
}
.main-menu {
  margin: 2rem;
  @media (min-width: 667px) {
    margin: 0;
    position: absolute;
    left: 15%;
    bottom: 15%;
  }
}

.main-menu a {
  margin: 1rem auto;
  @media (min-width: 667px) {
    margin: 1rem 0;
  }
  display: block;
  min-width: 0;
  width: 100%;
  max-width: 20rem;
}

.el-button {
  box-shadow: 0px 0px 15px rgba(50, 50, 50, 0.5);
}
h1 span {
  display: block;
  font-size: 0.7em;
  color: $secondary;
}

</style>
