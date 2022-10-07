<script>
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'

export default {
  name: 'auth-login',
  computed: {
    submitValid () {
      const { user } = this

      return !isEmpty(user.email) &&
        !isEmpty(user.password)
    }
  },
  data: () => ({
    error: '',
    user: {
      email: null,
      password: null
    }
  }),
  methods: {
    ...mapActions('auth', ['login']),
    doLogin () {
      const { submitValid } = this

      if (!submitValid) {
        return
      }
      this.login(this.user)
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        })
        .catch(() => {
          this.error = 'Não autorizado'
        })
    }
  }
}
</script>
<template>
  <div class="container-fluid">
    <!-- Section 1 START -->
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Autenticar</h1>
          </div>
        </div>
        <form>
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-2">
                <label for="inputEmail">Email</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Informe seu email" v-model="user.email" required>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-2">
                <label for="inputPassword">Senha</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Informe sua senha" v-model="user.password" required>
              </div>
            </div>
          </div>
          <div class="row" v-if="error">
            <div class="col-12">
                <label>{{ error }}</label>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="button" v-on:click="doLogin()" class="btn btn-primary mb-2 mx-sm-3" :class="{ disabled: !submitValid }">Logar</button>
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col-6">
            <router-link :to="{name: 'auth-register'}">Criar conta nova</router-link>
          </div>
          <div class="col-6" v-if="false">
            <router-link :to="{name: 'auth-password'}">Esqueci minha senha</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
