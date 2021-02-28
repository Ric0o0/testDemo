import http from '../../util/http'

const module = {
  namespaced: true,
  state: {
    cinemaList: []
  },
  mutations: {
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
}
export default module
