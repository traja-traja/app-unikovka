<template>

    <h2>Úloha č. {{ currentRoundNumber + 1 }} ze 6</h2>
    <RichText
        :txt="gameRoundData.assignmentText">
    </RichText>

    <h3>Nápověda</h3>
    <GameHelp
        :txt="gameRoundData.adviseText"
        :show-help="helpIsVisible"
        :round-is-completed="roundIsCompleted"
        :current-round-time="currentRoundTime"
        @first-help-used="firstHelpUsed"
        @second-help-used="secondHelpUsed">
    </GameHelp>    

    <h3>Řešení</h3>
    <GameSolution
        :solution="gameRoundData.solution"
        :solution-options="gameRoundData.options"
        :show-options="optionsAreVisible"
        @right-solution-enterred="rightSolutionEnterred"
        @bad-solution-enterred="badSolutionEnterred">
    </GameSolution>

    <NextStepButton v-if="roundIsCompleted"
        :is-primary="true"
        txt="Zobrazit další úlohu"
        @clicked="startNextRound">
    </NextStepButton>

</template>

<script>
import RichText from '../../layout/parts/RichText.vue'
import NextStepButton from '../../layout/parts/NextStepButton.vue'
import GameHelp from './GameHelp.vue'
import GameSolution from './GameSolution.vue'

export default {
    components: {
        RichText,
        NextStepButton,
        GameHelp,
        GameSolution
    },

    emits: [
        'time-add',
        'time-shift',
        'round-completed',
        'start-next-round'
    ],

    data() {
        return {
            isLoading: false,
            roundIsCompleted: false,
            helpIsVisible: false,
            optionsAreVisible: false,
            roundLog: []
        }
    },

    props: {
        currentRoundNumber: Number,
        currentRoundTime: Number,
        gameRoundData: Object,
        gameIsCompleted: Boolean
    },

    methods: {
        firstHelpUsed() {
            this.helpIsVisible = true
            this.$emit('time-shift', {
                time: 5*60 // @todo avoid hardcoded
            })
            this.logEvent('first-help')
        },

        secondHelpUsed() {
            this.optionsAreVisible = true
            this.$emit('time-shift', {
                time: 10*60 // @todo avoid hardcoded
            })
            this.logEvent('second-help')
        },

        rightSolutionEnterred() {
            this.roundIsCompleted = true
            this.logEvent('right-solution')
            this.roundCompleted()
        },

        badSolutionEnterred() {
            this.$emit('time-add', {
                time: 1*60
            })
            this.logEvent('bad-solution')
        },

        roundCompleted() {
            this.$emit('round-completed', this.roundLog)
        },

        startNextRound() {
            this.$emit('start-next-round')
        },

        logEvent(event) {
            this.roundLog.push({
                time: this.currentRoundTime,
                event: event
            })
        }
    }
}
</script>

<style scoped lang="scss">
h2 {
    font-size: 20px;
    margin-top: 5px;
}
h3 {
    font-size: 12px;
    font-weight: normal;
    border-top: 1px solid #dddddd;
    padding-top: 2px;
    color: #999999;
    margin-top: 25px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.el-input {
  width: initial;
  margin-right: 10px;    
}
/* Chrome, Safari, Edge, Opera */
:deep() input::-webkit-outer-spin-button,
:deep() input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
:deep() input[type=number] {
    -moz-appearance: textfield;
}
.is-error :deep() input {
    border-color: red;
    border-width: 2px;
}
.is-error :deep() i {
    color: red;
}

:deep() strong {
  background-color: #eee;
  display: inline-block;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  white-space: nowrap;
}
</style>
