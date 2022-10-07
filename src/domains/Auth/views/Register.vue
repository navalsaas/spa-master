<script>
import { mapActions } from 'vuex'
import { isEmpty, first, get } from 'lodash'

export default {
  name: 'auth-register',
  computed: {
    nameError () {
      const { errors } = this
      return first(get(errors, 'name'))
    },
    emailError () {
      const { errors } = this
      return first(get(errors, 'email'))
    },
    submitValid () {
      const { user } = this

      return !isEmpty(user.name) &&
        !isEmpty(user.email) &&
        !isEmpty(user.password) &&
        !isEmpty(this.password_confirm) &&
        user.password === this.password_confirm
    }
  },
  data: () => ({
    errors: {},
    password_confirm: null,
    user: {
      name: null,
      email: null,
      password: null
    }
  }),
  methods: {
    ...mapActions('auth', ['register']),
    doRegister () {
      const { submitValid } = this

      if (!submitValid) {
        return
      }
      this.register(this.user)
        .then(() => {
          this.errors = []
          this.$router.push({ name: 'dashboard' })
        })
        .catch(({ response }) => {
          this.errors = get(response, 'data.errors', {})
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
            <h1>Criar conta</h1>
          </div>
        </div>
        <form>
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-2">
                <label for="inputNome">Nome</label>
                <input v-model="user.name" type="text" id="inputNome" class="form-control" placeholder="Informe seu nome" required>
                <small v-if="nameError" id="inputNomeHelp" class="form-text text-muted">{{ nameError }}</small>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-2">
                <label for="inputEmail">Email</label>
                <input v-model="user.email" type="email" id="inputEmail" class="form-control" placeholder="Informe seu email" required>
                <small v-if="emailError" id="inputEmailHelp" class="form-text text-muted">{{ emailError }}</small>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-2">
                <label for="inputPassword">Senha</label>
                <input v-model="user.password" type="password" id="inputPassword" class="form-control" placeholder="Senha" required>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-2">
                <label for="inputPasswordConfirm">Senha</label>
                <input v-model="password_confirm" type="password" id="inputPasswordConfirm" class="form-control" placeholder="Confirme a senha" required>
                <small v-if="password_confirm && user.password && user.password !== password_confirm" id="inputPasswordConfirmHelp" class="form-text text-muted">Senhas não conferem</small>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="button" v-on:click="doRegister()" class="btn btn-primary mb-2 mx-sm-3" :class="{ disabled: !submitValid }">Criar conta</button>
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col-6">
            <router-link :to="{name: 'auth-login'}">Já tenho uma conta</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
