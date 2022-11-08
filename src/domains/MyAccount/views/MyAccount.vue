<script>
import MyAccountService from '@/domains/MyAccount/services'
import { mapActions } from 'vuex'
import { isEmpty, first, get } from 'lodash'

export default {
  name: 'my-account',
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
        !isEmpty(user.last_name) &&
        !isEmpty(this.password_confirm) &&
        user.password === this.password_confirm
    }
  },
  mounted () {
    MyAccountService.get()
      .then(({ data }) => {
        this.user = data
      })
      .catch(({ response }) => {
        console.log({ response })
      })
  },
  data: () => ({
    errors: {},
    password_confirm: null,
    user: {
      name: null,
      email: null,
      password: null,
      last_name: null
    }
  }),
  methods: {
    ...mapActions('auth', ['register', 'logout']),
    update () {
      const { submitValid } = this

      if (!submitValid) {
        return
      }
      MyAccountService.update(this.user)
        .then(({ data }) => {
          this.user = data
          this.$router.push({ name: 'dashboard' })
        })
        .catch(({ response }) => {
          console.log({ response })
        })
    },
    async doDelete () {
      await this.logout()
      MyAccountService.delete(this.user.id)
        .then(({ data }) => {
          this.$router.push({ name: 'auth-login' })
        })
        .catch(({ response }) => {
          console.log({ response })
        })
    },
    remove () {
      this.$confirm({
        title: 'Minha conta',
        message: 'Confirma a exclusão dessa conta??',
        button: {
          yes: 'Sim',
          no: 'Cancel'
        },
        callback: confirm => {
          if (confirm) {
            this.doDelete()
          }
        }
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
            <h1>Minha conta</h1>
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
                <label for="inputNome">Último Nome</label>
                <input v-model="user.last_name" type="text" id="inputNome" class="form-control" placeholder="Informe seu último nome" required>
                <small v-if="nameError" id="inputUltimoNomeHelp" class="form-text text-muted">{{ nameError }}</small>
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
              <button type="button" v-on:click="update()" class="btn btn-primary mb-2 mx-sm-3" :class="{ disabled: !submitValid }">Editar conta</button>
              <button type="button" v-on:click="remove()" class="btn btn-danger mb-2 mx-sm-3" :class="{ disabled: !submitValid }">Remover conta</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
