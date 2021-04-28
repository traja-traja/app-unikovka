<template>
    <el-form @submit.prevent="login" label-position="top">
        <el-card v-loading="isLoading">
          <el-form-item label="Nejprve zadej heslo">
            <el-input placeholder="Heslo" v-model="enteredPassword" show-password></el-input>
          </el-form-item>
          <el-button type="primary" @click="login">Potvrdit heslo</el-button>
        </el-card> 
    </el-form>
</template>

<script>

export default {
  
  data() {
    return {
      enteredPassword: '',
      isLoading: false,
    }
  },

  methods: {
    async login() {
      this.isLoading = true
      
      const actionPayload = {
        password: this.enteredPassword
      };

      // try to login user
      try {
        await this.$store.dispatch('login', actionPayload)
        
        this.$message({
          message: 'Super! Heslo je oukej.',
          type: 'success'
        })
        
      } catch (err) {
        // Error might be: The password is invalid or the user does not have a password.
        const errorMessage = err.message || 'Došlo k chybě při přihlášení. Zkus to prosím znovu za chvíli.';
        this.$message({
          message: errorMessage,
          type: 'warning'
        });
      }

      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.el-input {
  width: initial;
  margin-right: 10px;
}
</style>