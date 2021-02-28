import Vue from 'vue'
import Vuex from 'vuex'
import http from '../util/http'
Vue.use(Vuex)

// store '全局'的对象  只存在内存中  未拆分模块
export default new Vuex.Store({
  state: {
    cityId: '310100',
    cityName: '上海',
    isTabbarShow: true,

    cinemaList: []
  },
  //集中式修改 -- 被监控
  mutations: {
    changeCityName(state, name){
      state.cityName = name
    },
    changeCityId(state, id){
      state.cityId = id
    },
    showTabbar(state){
      state.isTabbarShow = true
    },
    hideTabbar(state){
      state.isTabbarShow = false
    },
    setCinemaList(state, cinemaList){
      state.cinemaList = cinemaList
    },
    clearCinemaList(state){
      state.cinemaList = []
    }
  },
  actions: {
    getCinemaList(store, cityId){
      return http({
        url: '/gateway?cityId=' + cityId + '&ticketFlag=1&k=2500238',
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('setCinemaList', res.data.data.cinemas)
      })
    }
  }
})
