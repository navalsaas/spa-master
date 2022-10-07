import Vue from 'vue'
import Main from './components/layout/Main.vue'
import './registerServiceWorker'
import routerInstance from './router'
import store from './store'
import VueConfirmDialog from 'vue-confirm-dialog'

Vue.config.productionTip = false
Vue.config.ignoredElements = ['ion-icon']

Vue.use(VueConfirmDialog)

new Vue({
  router: routerInstance({ Vue, store }),
  store,
  render: h => h(Main)
}).$mount('#app')
