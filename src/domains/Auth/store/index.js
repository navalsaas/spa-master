import mutations from './mutations'
import * as getters from './getters'
import state from './state'
import actions from './actions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
