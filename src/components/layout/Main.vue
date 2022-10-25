<script>

import Menu from './menu'
import { mapGetters } from 'vuex'

export default {
  name: 'MainApp',
  components: {
    Menu
  },
  computed: {
    ...mapGetters('auth', ['userFirstName', 'isAuthenticate'])
  }
}
</script>

<template>
  <div class="d-flex" id="wrapper">
    <vue-confirm-dialog></vue-confirm-dialog>
    <!-- Sidebar -->
    <div class="bg-light border-right" id="sidebar-wrapper" v-if="isAuthenticate">
      <div class="sidebar-heading">
        <div class="logo"><img class="icon bg-primary-2" src="/img/compiling.svg" alt="" data-inject-svg /><span>Brun</span><small>&nbsp;beta</small></div>
      </div>
      <Menu/>
    </div>
    <!-- /#sidebar-wrapper -->
    <!-- Page Content -->
    <div id="page-content-wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom" v-if="isAuthenticate">
        <button id="menu-toggle" class="navbar-toggler" type="button" data-toggle="collapse" data-target="menu-toggle" aria-controls="menu-toggle" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="d-md-none navbar-brand">
          <div class="logo"><img class="icon bg-primary-2" src="/img/compiling.svg" alt="" data-inject-svg /><span>Brun</span><small>&nbsp;beta</small></div>
        </div>
        <div class="d-none d-md-block ml-auto">Bem-vindo, {{ userFirstName }}!</div>
        <div class="d-none d-md-block ml-auto"><a href="/my-account">Minha conta</a></div>
      </nav>
      <router-view />
    </div>
    <!-- /#page-content-wrapper -->
  </div>
</template>
