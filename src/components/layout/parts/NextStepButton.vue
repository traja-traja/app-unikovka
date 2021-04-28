<template>
    <p class="text-center">
        <el-button
            :type="isPrimary ? 'primary' : 'default'"
            @click="clicked">
                {{ txt }}
        </el-button>
    </p>
</template>

<script>
export default {
    props: {
        carouselViewed: Boolean,
        isPrimary: Boolean,
        txt: String
    },

    emits: ['clicked'],

    methods: {
        clicked() {
            this.$emit('clicked')
        }
    }
}
</script>

<style scoped>
p {
    margin-top: 30px;
}
.el-button {
  min-width: 196px;
}
</style>