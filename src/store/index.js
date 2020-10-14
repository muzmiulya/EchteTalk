import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Users from './modules/users'
import Friend from './modules/friend'
import Roomchat from './modules/roomchat'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Users,
    Friend,
    Roomchat
  },
  state: {
    name: 'Muhammad Muzmi Ulya'
  },
  mutations: {},
  actions: {},
  getters: {},
  plugins: [
    createPersistedState({
      paths: ['Auth.user'],
      storage: window.sessionStorage
    })
  ]
})
