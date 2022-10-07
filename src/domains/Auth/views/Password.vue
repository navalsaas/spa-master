<script>
export default {
  name: 'auth-password',
  data: () => ({
    email: null
  })
}
</script>
<template>
  <div class="container-fluid">
    <!-- Section 1 START -->
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Esqueci minha senha</h1>
          </div>
        </div>
        <form class="form-inline mb-4">
          <div class="row">
            <div class="col-12">
              <div class="form-group mb-2">
                <label for="inputEmail" class="sr-only">Email</label>
                <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Informe seu email" required>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button type="button" class="btn btn-primary mb-2 mx-sm-3" :class="{ disabled: !email }">Recuperar senha</button>
            </div>
          </div>
        </form>
        <div class="row">
          <div class="col-6">
            <router-link :to="{name: 'auth-login'}">Login</router-link>
          </div>
          <div class="col-6">
            <router-link :to="{name: 'auth-register'}">Criar conta nova</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
