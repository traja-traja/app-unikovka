<template>
    <el-carousel
        ref="carousel"
        indicator-position="outside"
        :autoplay="false"
        height="220px"
        arrow="never"
        trigger="click"
        @change="carouselItemViewed">

            <el-carousel-item
                v-for="(advise, i) in gameAdvises"
                :key="advise">
                    <CarouselItemContent
                        :advise="advise"
                        :adviseStartNumber="i*3+1">
                    </CarouselItemContent>
            </el-carousel-item>

    </el-carousel>
</template>

<script>
import CarouselItemContent from './CarouselItemContent.vue'

export default {
    components: {
        CarouselItemContent
    },

    emits: ['carousel-has-been-viewed'],

    props: {
        gameAdvises: Object
    },

    data() {
        return {
            carouselItemsViewed: [],
            carouselViewed: false
        }
    },

    watch: {
        carouselViewed(value) {
            if (value) {
                this.$emit('carousel-has-been-viewed')
            }
        }
    },

    methods: {
        carouselItemViewed(itemNumber) {
            // in the event, the current item shown in carousel is provided (0, 1, 2, 3)
            this.carouselItemsViewed[itemNumber] = true
            // if all carousel items have been shown (all items === true), carouselViewed should be set to true
            if (this.carouselItemsViewed.includes(false) === false) {
                this.carouselViewed = true
            }
        },

        carouselGoPreviousItem() {
            this.$refs.carousel.prev()
        },

        carouselGoNextItem() {
            this.$refs.carousel.next()
        },

        // initialize what items has been viewed by user (= first one was viewed)
        initializeCarouselItemsViewed() {
            if (this.gameAdvises.length) {
                this.carouselItemsViewed = new Array(this.gameAdvises.length).fill(false)
                this.carouselItemViewed(0)
            }
        }
    },

    mounted() {
        this.initializeCarouselItemsViewed()
    }
}
</script>