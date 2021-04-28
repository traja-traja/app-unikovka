<template>
    <PageLayout>
        
        <el-card v-loading="isLoading">
            <IntroCarousel
                :game-advises="gameAdvises"
                @carousel-has-been-viewed="carouselHasBeenViewed"
                ref="introCarousel">
            </IntroCarousel>

            <CarouselActionButtons
                :carousel-viewed="carouselViewed"
                @carousel-go-previous-item="carouselGoPreviousItem"
                @carousel-go-next-item="carouselGoNextItem">
            </CarouselActionButtons>
        
            <NextStepButton
                :is-primary="carouselViewed"
                txt="Zahájit hru"
                @clicked="startGame">
            </NextStepButton>
        </el-card>
        
    </PageLayout>
</template>

<script>
import PageLayout from '../layout/PageLayout.vue'
import IntroCarousel from './intro/IntroCarousel.vue'
import CarouselActionButtons from './intro/CarouselActionButtons.vue'
import NextStepButton from '../layout/parts/NextStepButton.vue'

export default {
    components: {
        PageLayout,
        IntroCarousel,
        CarouselActionButtons,
        NextStepButton
    },

    emits: ['start-game'],

    props: {
        isLoading: Boolean
    },

    methods: {
        carouselGoPreviousItem() {
            this.$refs.introCarousel.carouselGoPreviousItem()
        },

        carouselGoNextItem() {
            this.$refs.introCarousel.carouselGoNextItem()
        },

        carouselHasBeenViewed() {
            this.carouselViewed = true
        },

        startGame() {
            this.$emit('start-game')
        }
    },

    // hardcoded for now
    data() {
        return {
            carouselViewed: false,
            gameAdvises: [
                {
                    title: 'Pár tipů pro tebe! 😉',
                    advises: [
                        'Čeká tě [b]6&nbsp;matematických úloh[/b]',
                        'Přeskakovat mezi úlohami nejde',
                        'Obtížnost postupně stoupá...&nbsp;🤞'
                    ]
                }, {
                    title: 'Počítá se čas ⏱',
                    advises: [
                        'Jakmile začneš hrát, zapneme stopky a měříme ti&nbsp;čas',
                        'Když budeš počítat rychle, probojuješ se do [b]žebříčku[/b]',
                        'Pozor. Když se ve výsledku sekneš, přičteme ti [b]1&nbsp;trestnou minutu[/b]&nbsp;😋'
                    ]
                }, {
                    title: 'Dobrá rada nad zlato 🏆',
                    advises: [
                        'Nevíš si rady? [b]Použij nápovědu[/b]. Nápověda ale není zadarmo...',
                        'Za první radu ti posuneme čas na stopkách [b]na 5&nbsp;minut[/b]',
                        'Při druhé to bude 10 minut. Použij ji [b]v krajní nouzi[/b]&nbsp;😱'
                    ]
                }, {
                    title: 'Hraj, kolikrát chceš 🎮',
                    advises: [
                        'Můžeš hrát pořád dokola',
                        'Počítat budeme [b]tvůj nejlepší výsledek[/b]&nbsp;🏆',
                        'Stránku neobnovuj tlačítky Obnovit, F5... (hra by začala znova)'
                    ]
                }
            ]
        }
    }
}
</script>