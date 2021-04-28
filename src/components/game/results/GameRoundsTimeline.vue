<template>

    <el-timeline>

        <GameRoundsTimelineItem
            v-for="(roundData, key) in roundsHistory"
            :key="key"
            :round-data="roundData">
        </GameRoundsTimelineItem>
                  
    </el-timeline>

</template>

<script>
import GameRoundsTimelineItem from './GameRoundsTimelineItem.vue'

export default {
    components: {
        GameRoundsTimelineItem
    },

    props: {
        roundsHistory: Array
    }
}
</script>

<style scoped>
ul.el-timeline {
    padding-left: 5px;
}
</style>