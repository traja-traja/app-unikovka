<template>
    
    <transition name="fade" mode="out-in">

        <div v-if="!firstHelpUsed">
            <p class="text-center help-caption">
                Nevíš si rady?
                    <el-badge
                        :hidden="!badgeTime"
                        :value="badgeTime"
                        class="item"
                        type="warning">
                            <el-button
                                @click="showFirstHelp"
                                :disabled="roundIsCompleted"
                                type="warning"
                                plain>
                                    Zobrazit nápovědu
                            </el-button>
                    </el-badge>
            </p>
        </div>

        <div v-else>
            <RichText
                :txt="txt">
            </RichText>

            <transition name="fade">
                <p class="text-center help-caption" v-if="!secondHelpUsed">
                    Grrr... pořád nevíš? 😏
                    <el-badge
                        :hidden="!badgeTime"
                        :value="badgeTime"
                        class="item"
                        type="warning">
                            <el-button
                                @click="showSecondHelp"
                                :disabled="roundIsCompleted"
                                type="warning"
                                plain>
                                    Zobrazit možnosti
                            </el-button>
                    </el-badge>
                </p>
            </transition>
        </div>

    </transition>

</template>

<script>
import RichText from '../../layout/parts/RichText.vue'

export default {
    components: {
        RichText
    },

    emits: [
        'first-help-used',
        'second-help-used'
    ],

    props: {
        txt: String,
        roundIsCompleted: Boolean,
        currentRoundTime: Number
    },

    data() {
        return {
            firstHelpUsed: false,
            secondHelpUsed: false
        }
    },

    computed: {
        badgeTime() {
            let timeToParse;
            if (this.firstHelpUsed === false) {
                timeToParse = 5*60 - this.currentRoundTime // @todo not hardcoded time
            } else {
                timeToParse = 10*60 - this.currentRoundTime // @todo not hardcoded time
            }
            if (timeToParse <= 0) { return 0 }
            const seconds = (timeToParse % 60) + ''
            const minutes = ((timeToParse - seconds) / 60) + ''
            return (
                '+' + minutes.padStart(1, '0') + ':' + seconds.padStart(2, '0')
            )
        }
    },

    methods: {
        showFirstHelp() {
            this.firstHelpUsed = true
            this.$emit('first-help-used')
        },

        // to show second help = to show options
        showSecondHelp() {
            this.secondHelpUsed = true
            this.$emit('second-help-used')
        }
    }
}
</script>

<style scoped lang="scss">
.help-caption {
    line-height: 2.2em;
    font-weight: bold;
    font-size: 14px;
    margin-top: 20px;
    margin-bottom: 30px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
