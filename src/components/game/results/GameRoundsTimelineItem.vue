<template>

    <el-timeline-item
        :timestamp="roundDetails">
        {{ roundNumber }}. kolo, čas {{ roundTimeTxt }}
    </el-timeline-item>

</template>

<script>
export default {
    props: {
        roundData: Object
    },

    computed: {
        roundTimeTxt() {
            const timeToParse = this.roundData.roundTime
            const seconds = (timeToParse % 60) + ''
            const minutes = ((timeToParse - seconds) / 60) + ''
            return (
                minutes.padStart(1, '0') + ':' + seconds.padStart(2, '0')
            )
        },

        roundNumber() {
            return this.roundData.roundNumber + 1
        },

        // used to return the proper suffix for verbs 'vyřešil/vyřešila'
        verbSuffix() {
            switch (this.$store.getters.userGender) {
                case 'M':
                    return ''
                case 'F':
                    return 'a'
                default:
                    return '(a)'
            }
        },

        roundDetails() {
            const roundLogEventList = this.roundData.roundLog.map(x => x.event)
            const roundDetails = []
            if (roundLogEventList.length === 1 && roundLogEventList.includes('right-solution')) {
                roundDetails.push('příklad jsi vyřešil' + this.verbSuffix + ' na první pokus')
                return roundDetails.join()
            }
            if (roundLogEventList.includes('bad-solution')) {
                roundDetails.push('netrefil' + this.verbSuffix + ' ses napoprvé')
            }
            if (roundLogEventList.includes('first-help')) {
                roundDetails.push('použil' + this.verbSuffix + ' jsi nápovědu')
            }
            if (roundLogEventList.includes('second-help')) {
                roundDetails.push('použil' + this.verbSuffix + ' jsi možnosti')
            }
            return roundDetails.join(', ')
        }
    }
}
</script>