import Vue from 'vue'
import Vuex from 'vuex'
import cityModule from './module/cityModule'
import cinemaModule from './module/cinemaModule'
import tabbarModule from './module/tabbarModule'
import filmModule from './module/filmMoudle'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  // 公共状态
  state: {

  },
  // 监控
  mutations: {

  },
  // 异步
  actions: {

  },
  // 各个模块
  modules: {
    cityModule,
    cinemaModule,
    tabbarModule,
    filmModule
  }
})
