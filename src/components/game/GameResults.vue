<template>
    <PageLayout>

        <template v-slot:main-header>
            <h1 class="text-center">
                Konec hry
            </h1>
        </template>

        <el-card v-loading="isLoading">

            <h2>Tady jsou tvé výsledky...</h2>

            <p>Celkový čas tvé hry byl: <b>{{ totalTimeTxt }}</b></p>
            <p>To znamená, že jedno kolo jsi v průměru hrál(a): <b>{{ averageTimeTxt }}</b></p>

            <h3>Průběh hry</h3>
                
            <GameRoundsTimeline
                :rounds-history="gameHistory.roundsHistory">
            </GameRoundsTimeline>

            <h3>Kam dál...?</h3>
            <p class="text-center">
                <el-button
                    @click="playAgain">
                        Hrát znova!
                </el-button>
                <el-button
                    type="primary"
                    @click="goBestPlayers">
                        Ukázat nejlepší hráče
                </el-button>
            </p>

        </el-card>

    </PageLayout>
</template>

<script>
import PageLayout from '@/components/layout/PageLayout'
import GameRoundsTimeline from './results/GameRoundsTimeline.vue'

export default {
    components: {
        PageLayout,
        GameRoundsTimeline
    },

    emits: ['play-again'],

    props: {
        gameHistory: Object,
        isLoading: Boolean
    },

    methods: {
        getTimeTxt(timeToParse) {
            const seconds = (timeToParse % 60) + ''
            const minutes = ((timeToParse - seconds) / 60) + ''
            return (
                minutes + ' minut ' + seconds + ' sekund'
            )
        },

        playAgain() {
            this.$emit('play-again')
        },

        goBestPlayers() {
            this.$router.push('/best-players')
        }
    },

    computed: {
        totalTimeTxt() {
            return this.getTimeTxt(this.gameHistory.totalTime)
        },

        averageTimeTxt() {
            const averageTime = this.gameHistory.totalTime / this.gameHistory.roundsHistory.length
            return this.getTimeTxt( Math.round(averageTime) )
        }
    }
}
</script>

<style scoped>
h3 {
    margin-top: 40px;
}
</style>