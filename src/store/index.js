import Vue from 'vue'
import Vuex from 'vuex'

import UsersStore from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    users: UsersStore
  }
})