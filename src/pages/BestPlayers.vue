<template>
  <PageLayout>

      <template v-slot:main-header>
        <h1 class="text-center">Nejlepší hráči</h1>
      </template>

      <el-card v-loading="isLoading">

        <div v-if="!goodGameResults.length && !badGameResults.length">
          <p>Zatím není dostatek dat pro zobrazení výsledků.</p>
        </div>

        <div v-else>
          
          <div v-if="goodGameResults.length">
            <h2 class="first">Nejrychlejší hráči</h2>
            <el-table
              :data="goodGameResults"
              style="width: 100%">
                <el-table-column
                  prop="order"
                  label="#">
                </el-table-column>
                <el-table-column
                  prop="userName"
                  label="Hráč">
                </el-table-column>
                <el-table-column
                  prop="className"
                  label="Třída">
                </el-table-column>
                <el-table-column
                  prop="totalTime"
                  label="Čas">
                </el-table-column>
            </el-table>
          </div>

          <div v-if="badGameResults.length">
            <h2>Úspěšní hráči (náhodné pořadí)</h2>
            <el-table
              :data="badGameResults"
              style="width: 100%">
                <el-table-column
                  prop="userName"
                  label="Hráč">
                </el-table-column>
                <el-table-column
                  prop="className"
                  label="Třída">
                </el-table-column>
            </el-table>
          </div>
          
        </div>
      </el-card>

    </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout.vue'

export default {
  components: {
    PageLayout
  },

  data() {
    return {
      isLoading: false
    }
  },

  computed: {
    // order list of data
    goodGameResults() {
      return this.$store.getters.goodGameResults
    },

    // unorder list of data
    badGameResults() {
      return this.$store.getters.badGameResults
    }
  },

  methods: {
    getGame() {
      this.isLoading = true
      this.$store.dispatch('getGameResults')
      .then(() => {
        this.isLoading = false
      })
      .catch((err) => {
        console.log(err)
        this.isLoading = false
        // @todo 'Aplikace je rozbitá... Fňuk :( Nastavení aplikace se totiž nepodařilo načíst. Dej vědět svému učiteli.'
      })
    }
  },

  mounted() {
    this.getGame()
  }
}
</script>
<style scoped>
h2.first {
  margin-top: 0;
}
</style>