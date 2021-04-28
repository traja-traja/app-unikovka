<template>
    <div class="text-center">

        <el-button
            @click="$emit('carousel-go-previous-item')"
            class="xsmall-width-auto">
                <i class="el-icon-arrow-left"></i>
                <span class="xsmall-hidden">Předchozí tip</span>
        </el-button>

        <el-button
            :type="!carouselViewed ? 'primary' : 'default'"
            @click="$emit('carousel-go-next-item')"
            class="xsmall-width-auto">
                Další tip
                <i class="el-icon-arrow-right"></i>
        </el-button>

    </div>
</template>

<script>
export default {
    emits: [
        'carousel-go-previous-item',
        'carousel-go-next-item'
    ],

    props: {
        carouselViewed: Boolean
    }
}
</script>
