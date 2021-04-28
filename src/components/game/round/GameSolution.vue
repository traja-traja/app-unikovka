<template>
    <transition name="fade" mode="out-in">
        <div v-if="showOptions">
            <el-form :inline="true" label-position="left" @submit.prevent="checkSolution" class="text-center">
                <el-form-item label="Vyber správnou možnost">
                    <el-button
                        v-for="(option, key) in solutionOptions"
                        :key="key"
                        :type="optionRightSolution[key] ? 'success' : 'primary'"
                        :disabled="optionUsed[key] || solutionIsRight"
                        @click="checkSolutionSelected(option, key)">
                            {{ option }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <div v-else>
            <el-form :inline="true" label-position="left" @submit.prevent="checkSolutionEnterred" class="text-center">
                <el-form-item label="Napiš správné řešení">
                    <el-input
                        v-model="enterredResult"
                        type="number"
                        step='0.01'
                        :controls="false"
                        :disabled="solutionIsRight"
                        @focus="solutionIsBad=false"
                        @input="solutionIsBad=false">
                    </el-input>

                    <transition name="fade">
                        <el-button
                            :type="solutionIsRight ? 'success' : 'primary'"
                            :disabled="!enterredResultIsNumber || solutionIsRight"
                            @click="checkSolutionEnterred">
                                Potvrdit
                        </el-button>
                    </transition>

                </el-form-item>
            </el-form>
        </div>
    </transition>

    <transition name="fade" mode="out-in">
        <div class="solution solution--right" v-if="solutionIsRight">
            <i class="el-icon-success"></i>
            {{ successTxt }}
        </div>

        <div class="solution solution--bad" v-else-if="solutionIsBad">
            <i class="el-icon-warning"></i>
            {{ badTxt }}
        </div>
    </transition>

</template>

<script>
export default {
    props: {
        showOptions: Boolean,
        solutionOptions: Object,
        solution: Number
    },

    emits: [
        'right-solution-enterred',
        'bad-solution-enterred'
    ],

    data() {
        return {
            enterredResult: '',
            solutionIsRight: false,
            solutionIsBad: false,
            optionUsed: [false, false, false],
            optionRightSolution: [false, false, false],
            successTxt: '',
            successTxtList: [
                'Super! Trefa!!!',
                'Pecka! Seš mazák! 😎',
                'Boží! Parádní trefa!',
                'Paráda! To tam padlo!',
                'Jooo! Trefa do černého!'
            ],
            badTxt: '',
            badTxtList: [
                'Eeee, bohužel! Zkus to ještě jednou',
                'Grr. Tohle nevyšlo 😪',
                'Nene, tohle číslo tam nepadne.',
                'Samá voda. Samá voda.',
                'Noup 😪 Tohle neni správný řešení'
            ]
        }
    },

    computed: {
        enterredResultIsNumber() {
            const regNumber = /^-?(\d+\.?\d*)$|^-?(\d+,?\d*)$/
             return this.enterredResult.trim().match(regNumber)
        },

        // enterredResultIcon() {
        //     return (
        //         this.solutionIsBad ? 'el-icon-warning' : ''
        //     )
        // }
    },

    methods: {
        checkSolutionSelected(option, key) {
            if (this.solutionIsRight) { return }
            if (this.checkSolution(option)) {
                this.optionRightSolution[key] = true
            } else {
                this.optionUsed[key] = true
            }
        },

        checkSolutionEnterred() {
            if (this.solutionIsRight) { return }
            if (!this.enterredResultIsNumber) {
                alert('číslo je ve špatném formátu')
                return;
            }
            let userSolution = this.enterredResult.trim().replace(',', '.')
            this.checkSolution(+userSolution)
        },

        checkSolution(userSolution) {
            if (this.solution === userSolution) {
                this.updateSuccessTxt()
                this.solutionIsRight = true
                this.solutionIsBad = false
                this.$emit('right-solution-enterred')
                return true
            } else {
                this.updateBadTxt()
                this.solutionIsRight = false
                this.solutionIsBad = true
                this.$emit('bad-solution-enterred')
                return false
            }
        },

        updateSuccessTxt() {
            const randonIndex = Math.floor(Math.random() * this.successTxtList.length)
            this.successTxt = this.successTxtList[randonIndex]
        },

        updateBadTxt() {
            const randonIndex = Math.floor(Math.random() * this.badTxtList.length)
            this.badTxt = this.badTxtList[randonIndex]
        }
    }
}
</script>

<style scoped lang="scss">
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
.el-form-item {
    line-height: 50px;
    margin-bottom: 10px;
}
.el-form-item :deep() label {
    color: black;
    font-weight: bold;
}
.el-button {
    margin-top: 5px;
    margin-bottom: 5px;
}

/* to hide arrow at input item START */
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
/* to hide arrow at input item END */

.solution {
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;
    margin: 10px auto;
    width: 100%;
    max-width: 250px;
    border: 1px solid grey;
    padding: 12px;
}
.solution--right {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67C23A;
}
.solution--bad {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #E6A23C;
}
</style>
