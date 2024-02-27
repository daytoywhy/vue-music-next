import { createStore, createLogger } from 'vuex'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions'

const debug = import.meta.env.MODE !== 'production'
export default createStore({
  state,
  getters,
  actions,
  mutations,
  plugins: debug ? [createLogger()] : []
})
