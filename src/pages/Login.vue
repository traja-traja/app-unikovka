<template>
  <PageLayout>

    <template v-slot:main-header>
      <h1 class="text-center">
        Přihlášení
      </h1>
    </template>

    <div class="home text-center">

        <TypePassword v-if="!$store.getters.userIsLogged" />

        <div v-else>
          <el-card v-if="activeUser">
            <p class="user-info">
              Super! Jsi přihlášen{{ activeUser.gender === 'M' ? 'ý' : 'a' }}
              jako <b>{{ activeUser.firstName }}&nbsp;{{ activeUser.lastName }}.</b>
              ze&nbsp;třídy&nbsp;<b>{{ activeUser.className }}</b></p>
            <p>
              Nejsi to ty? &nbsp;
              <el-button type="danger" plain @click="resetActiveUser">Změnit hráče</el-button>
            </p>
          </el-card>
          <SelectUser v-else />
        </div>

        <div class="action-button" v-if="$store.getters.userIsLogged">
          <div v-if="activeUser">
            <router-link to="/game" class="el-button el-button--primary">Hrát hru!</router-link>
          </div>
          <div v-else>
            Pokud si chceš hru jen zkusit, můžeš si zahrát jako host. &nbsp;
            <router-link to="/game" class="el-button">Hrát jako host</router-link>
          </div>
        </div>

    </div>
    
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout.vue'
import TypePassword from '@/components/login/TypePassword.vue'
import SelectUser from '@/components/login/SelectUser.vue'

export default {
  components: {
    PageLayout,
    TypePassword,
    SelectUser
  },

  computed: {
    activeUser() {
      return this.$store.getters.activeUser
    }
  },

  methods: {
    resetActiveUser() {
        this.$store.dispatch('resetActiveUser')
    },
  },

  mounted() {
    // check whether the user is by chance already logged in
    this.$store.dispatch('updateUserIsLogged')
  }
}
</script>

<style scoped>
.action-button {
  margin-top: 20px;
}
.user-info {
  margin-bottom: 60px;
}
.intro-paragraph {
  margin-top: 80px;
}
b {
  background-color: #eee;
  display: inline-block;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
@media (max-height: 667px) {
  .intro-paragraph {
    margin-top: 50px;
  }
  .user-info {
    margin-bottom: 40px;
  }
}
@media (max-height: 568px) {
  .intro-paragraph {
    margin-top: 30px;
  }
  .user-info {
    margin-bottom: 30px;
  }
}
</style>