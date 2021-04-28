<template>  
    <!-- div v-if="!activeUser">
        <el-alert
            title=""
            type="warning"
            show-icon>
                <b>Výstraha:</b>
                Hraješ jako host. Až dohraješ, tvoje skóre se nikam neuloží.
            <router-link to="/login">Chceš se raději přihlásit?</router-link>
        </el-alert>
    </div -->

    <h1 class="text-center">
        Ahoj{{ activeUser ? ' ' + activeUser.greeting : '' }}, vítej v Únikovce!
    </h1>
</template>

<script>
export default {
    computed: {
        activeUser() {
            return this.$store.getters.activeUser
        },
    }
}
</script>
