<template>
    <div>
        <h2 class="text-center">{{ advise.title }}</h2>
        <ol :start="adviseStartNumber">
            <li
                v-for="(adviseItem) in advise.advises"
                :key="adviseItem">

                    <rich-text :txt="adviseItem"></rich-text>

            </li>
        </ol>
    </div>
</template>

<script>
import RichText from '../../layout/parts/RichText.vue'

export default {
    components: {
        RichText
    },

    props: {
        adviseStartNumber: Number,
        advise: Object
    }
}
</script>

<style lang="scss" scoped>
div {
    max-width: 560px;
    margin: 0 auto;
}
h2 {
    margin-bottom: 45px;
    font-size: 20px;
    @media (max-width: 600px) {
        margin-bottom: 25px;
    }
    @media (max-width: 500px) {
        margin-bottom: 20px;
    }
    @media (max-width: 374px) {
        margin-bottom: 10px;
    }
}
ol {
    padding-left: 25px;
}
ol li {
    padding-left: 10px;
    margin: 25px 0;
    @media (max-width: 540px) {
        margin: 20px 0;
    }
    @media (max-width: 500px) {
        padding-left: 5px;
        margin: 15px 0;
    }
    @media (max-width: 374px) {
        padding-left: 5px;
        margin: 8px 0;
        font-size: 15px;
    }
}
</style>