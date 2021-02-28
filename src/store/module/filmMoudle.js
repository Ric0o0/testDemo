import http from '../../util/http'

const module = {
  namespaced: true,
  state: {
    filmList: [],
    total: null,
  },
  mutations: {
    setFilmList (state, arr) {
      if (state.filmList.length === 0){
        state.filmList = arr
      } else {
        state.filmList = [...state.filmList, ...arr]
      }
    },
    setTotal (state, num){
      state.total = num
    },
    clearFilmList (state){
      state.total = null
      state.filmList = []
    }
  },
  actions: {
    getFilmList (store, obj) {
      return http({
        url: `/gateway?cityId=${obj.cityId}&pageNum=${obj.currentIndex}&pageSize=10&type=1&k=1352345`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        store.commit('setFilmList', res.data.data.films)
        store.commit('setTotal', res.data.data.total)
      })
    }
  }
}
export default module
