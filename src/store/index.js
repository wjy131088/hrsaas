import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters,
  plugins: [createPersistedState({
    // paths: ['user.token','user.hrsaasTime']
    // 用于存储持久状态的密钥。默认为vuex。
    key: 'HRSAAS',
    reducer(state) {
      // console.log(state)
      const { token, hrsaasTime } = state.user
      return {
        user: {
          token: token,
          hrsaasTime: hrsaasTime
        }
      }
    }
  })]
})

export default store
