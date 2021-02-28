const module = {
  namespaced: true, // 命名空间
  state: {
    cityId: '310100',
    cityName: '上海',
  },
  mutations: {
    changeCityName(state, name){
      state.cityName = name
    },
    changeCityId(state, id){
      state.cityId = id
    }
  },
  actions: {

  }
}
export default module
