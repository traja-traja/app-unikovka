<template>
    <el-card v-loading="isLoading">
        <el-form v-if="listOfUsers" label-position="top">
            <el-form-item label="Vyber svou třídu">
                <el-select v-model="selectedClass" placeholder="Vyber třídu" @change="classChanged">
                    <el-option
                        v-for="(schoolClass, key) in listOfUsers.schoolClasses"
                        :key="key"
                        :value="key"
                        :label="schoolClass.className">
                    </el-option>
                </el-select>
            </el-form-item>

            <div v-if="selectedClass !== null">
                <el-form-item label="Vyber, kdo hraje">
                    <el-select v-model="selectedStudent" placeholder="Vyber hráče">
                        <el-option
                            v-for="(student, key) in listOfUsers.schoolClasses[selectedClass].students"
                            :key="key"
                            :value="key"
                            :label="student.firstName + ' ' + student.lastName + '.'">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <el-button v-if="selectedStudent !== null" type="primary" @click.prevent="confirmSelectedStudent">Potvrď výběr hráče</el-button>
        </el-form>
    </el-card>
</template>

<script>
// import { MdButton } from 'vue-material'

export default {
    data() {
        return {
            isLoading: false,
            selectedClass: null, // ID of selected Class
            selectedStudent: null // ID of selected Student
        }
    },

    methods: {
        confirmSelectedStudent() {
            this.$store.dispatch('setActiveUser',
                this.listOfUsers
                    .schoolClasses[this.selectedClass]
                    .students[this.selectedStudent]
            )
        },

        // when class changed, reset currently selected student
        classChanged() {
            this.selectedStudent = null;
        },         
    },

    computed: {
        listOfUsers() {
            return this.$store.getters.listOfUsers
        }
    },

    mounted() {
        // do not load if already exists
        if (this.listOfUsers && this.listOfUsers.schoolClasses) {
            return
        }
        this.isLoading = true
        this.$store.dispatch('getListOfUsers')
            .then(() => {
                this.isLoading = false
            })
    }
}
</script>

<style scoped lang="scss">
button {
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>
