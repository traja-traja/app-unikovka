<template>
  
  <GameIntro
    v-if="gameState === 'introduction'"
    :is-loading="isLoading"
    @start-game="startGame">
  </GameIntro>

  <Game
    v-if="gameState === 'playing'"
    :game-data="gameData"
    :is-loading="isLoading"
    @game-completed="gameCompleted">
  </Game>

  <GameResults
    v-if="gameState === 'game-results'"
    :game-history="gameHistory"
    :is-loading="isLoading"
    @play-again="playAgain">
  </GameResults>

</template>

<script>
import GameIntro from '@/components/game/GameIntro.vue'
import Game from '@/components/game/Game.vue'
import GameResults from '@/components/game/GameResults.vue'
import { ElMessageBox } from 'element-plus';

export default {
  components: {
    GameIntro,
    Game,
    GameResults
  },

  data() {
    return {
      gameState: 'introduction',
      gameResults: null,
      isLoading: false
    }
  },

  computed: {
    gameData() {
      return this.$store.getters.gameData
    },

    activeUser() {
      return this.$store.getters.activeUser
    }
  },

  methods: {
    startGame() {
      this.gameState = 'playing'
    },

    gameCompleted(payload) {
      this.gameHistory = payload
      // if user is logged, save game results
      if (this.activeUser) {
        this.saveGameResults()
      } else {
        this.showSuccessMessage()
      }
    },

    showSuccessMessage() {
      this.$alert(
        'Huráááááá! Konec hry. Seš šikula! 😎', // message and title below
        'Konec hry 🤩', {
          confirmButtonText: 'Zobrazit skóre',
          callback: () => {
            this.showGameResults()
          }
        }
      )
    },

    saveGameResults() {
      this.isLoading = true
      this.$alert(
        'Prosím o malé strpení, chroustám...',
        'Konec hry 🤩', {
          showClose: false,
          showConfirmButton: false
        }
      )
      this.$store.dispatch('saveGameResults', this.gameHistory)
        .then(() => {
          this.isLoading = false
          ElMessageBox.close() // close loading message box
          this.showSuccessMessage()
        })
        .catch(() => {
          this.isLoading = false
          ElMessageBox.close() // close loading message box
          this.showErrorMessage()
        })
    },

    showErrorMessage() {
      this.$confirm(
          'Omlouváme se. Došlo k chybě při ukládání tvých výsledků do databáze. To znamená, že zatím tvé skóre nebylo zaznamenáno. Zkoukni, jestli ti jde internet, a kdyžtak to zkus znovu... 😏',
          'Chyba při ukládání výsledků 😐', {
            confirmButtonText: 'Zkusit znovu',
            cancelButtonText: 'Přeskočit'
          }
        ).then(() => {
          this.saveGameResults() // try again
        }).catch(() => {
          this.showSuccessMessage() // after hiding this error message, show the success message immediately
        })
    },

    showNotLoggedMessage() {
      this.$confirm(
          'Nejsi přihlášená/přihlášený. To znamená, že budeš moct hrát hru jen jako host a výsledky tvé hry se nikam neuloží... 😏',
          'Chceš se přihlásit?', {
            confirmButtonText: 'Chci se přihlásit',
            cancelButtonText: 'Hrát jako host'
          }
        ).then(() => {
          this.$router.push('/login')
        }).catch(() => {}) // catch = do nothing
    },

    showGameResults() {
      this.gameState = 'game-results'
    },

    playAgain() {
      this.gameState = 'introduction'
      this.getGameData()
    },

    getGameData() {
      this.isLoading = true
      this.$store.dispatch('getGameData')
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
    this.getGameData()
    if (!this.activeUser) {
      this.showNotLoggedMessage()
    }
  }
}
</script>
