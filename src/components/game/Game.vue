<template>
    <PageLayout>
        <template v-slot:game-menu>
            <el-dropdown-item>
                <el-checkbox v-model="showTotalTime">Zobrazit celkový čas</el-checkbox>
            </el-dropdown-item>
        </template>

        <template v-slot:progressbar>
            <Progressbar
                :show-total-time="showTotalTime"
                :current-round-time="currentRoundTime"
                :max-round-time="maxRoundTime"
                :total-time="totalTime"
                :max-total-time="maxTotalTime"
                @switch-progressbar="switchProgressbar">
            </Progressbar>
        </template>

        <template v-slot:main-header>
            <h1 class="text-center">
                Hra běží, držím ti palec! ✊
            </h1>
        </template>

        <el-card>
            <GameRound
                :key="currentRoundNumber"
                :current-round-number="currentRoundNumber"
                :current-round-time="currentRoundTime"
                :game-round-data="gameRoundData"
                :game-is-completed="gameIsCompleted"
                @round-completed="roundCompleted"
                @time-add="addTime"
                @time-shift="shiftTime"
                @start-next-round="startNextRound">
            </GameRound>
        </el-card>

    </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout'
import Progressbar from '@/components/layout/header/Progressbar.vue'
import GameRound from './round/GameRound'

export default {
    components: {
        PageLayout,
        Progressbar,
        GameRound
    },

    emits: ['game-completed'],

    props: {
        isLoading: Boolean
    },

    data() {
        return {
            // main logic of the game
            currentRoundNumber: 0, // which round is currently played by user

            // history saved for each round
            roundsHistory: [],

            // timer (progressbar)
            currentRoundTime: 0,
            passedRoundsTime: 0,
            maxRoundTime: 600, // after reaching round time limit, the timer is stopped

            gameIsCompleted: false,

            showTotalTime: false
        }
    },

    computed: {
        totalTime() {
            return this.passedRoundsTime + this.currentRoundTime
        },
        
        maxTotalTime() {
            return this.maxRoundTime * this.gameData.gameRounds.length
        },

        gameData() {
            return this.$store.getters.gameData
        },

        gameRoundData() {
            return this.gameData.gameRounds[this.currentRoundNumber]
        }
    },

    watch: {
         // to stop timer after reaching max round time
        currentRoundTime(value) {
            if (value >= this.maxRoundTime) {
                this.endTimer()
            }
        }
    },

    methods: {
        addTime(payload) {
            const time = payload.time
            // do not let increase the timer above the limit
            if (this.currentRoundTime + time >= this.maxRoundTime) {
                this.currentRoundTime = this.maxRoundTime
            } else {
                this.currentRoundTime += time
            }
        },

        shiftTime(payload) {
            const time = payload.time
            if (this.currentRoundTime < time) {
                this.currentRoundTime = time
            }
        },

        saveRoundIntoHistory(payload) {
            this.roundsHistory.push({
                roundNumber: this.currentRoundNumber,
                roundTime: this.currentRoundTime,
                roundLog: payload
            })
        },

        roundCompleted(payload) {
            // end timer
            this.endTimer()
            
            // save round result into history
            this.saveRoundIntoHistory(payload)
            
            // show success message
            this.showSuccess()
        },

        showSuccess() {
            //
        },

        // all things done to start the game
        startRound() {
            this.startTimer()
        },

        startNextRound() {
            this.continueToNextRound()
        },

        continueToNextRound() {
            // count any passed rounds time and reset counters
            this.passedRoundsTime += this.currentRoundTime
            this.currentRoundTime = 0

            // check whether this round is not last one:
            if (this.currentRoundNumber+1 < this.gameData.gameRounds.length) {
                this.currentRoundNumber += 1
                this.startRound()
            } else {
                this.gameCompleted()
            }
        },

        gameCompleted() {

            this.currentRoundTime = 0
            this.gameIsCompleted = true
            
            this.$emit('game-completed', {
                totalTime: this.totalTime,
                roundsHistory: this.roundsHistory
                }
            )
        },

        startTimer() {
            this.intervalHandler = setInterval(() => {
                this.currentRoundTime += 1
            }, 1000)
        },

        endTimer() {
            clearInterval(this.intervalHandler)
        },

        switchProgressbar() {
            this.showTotalTime = !this.showTotalTime
        }
    },

    mounted() {
        this.startRound()
    }
}
</script>

<style scoped lang="scss">
.el-input {
  width: initial;
  margin-right: 10px;
}
</style>
