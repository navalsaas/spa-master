import Vue from 'vue'
import Vuex from 'vuex'

// modules
import auth from '../domains/Auth/store'
import gratitudeDiaries from '../domains/GratitudeDiaries/store'

import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    gratitudeDiaries
  },
  plugins
})
