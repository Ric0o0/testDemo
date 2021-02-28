<template>
  <div>
    <van-index-bar @change="handleSelect">
      <div v-for="data in cityList" :key="data.index">
        <van-index-anchor :index="data.index" >{{data.index}}</van-index-anchor>
        <div v-for="item in data.cities">
          <van-cell :title="item.name" @click="handleChangeCity(item)"/>
        </div>
      </div>
    </van-index-bar>
  </div>
</template>

<script>

import http from '../util/http'
import Vue from 'vue';
import { IndexBar, IndexAnchor, Toast } from 'vant';
import {mapMutations} from 'vuex'

Vue.use(IndexBar);
Vue.use(IndexAnchor).use(Toast);
export default {
  name: 'City',
  data(){
    return {
      cityList: null,
      temp: []
    }
  },
  mounted(){
    // [
    //   {
    //     index: 'A',
    //     cities: [{}, {}, {}...]
    //   },
    //   {
    //     index: 'B',
    //     cities: [{}, {}, {}...]
    //   },
    // ]
    http({
      url: '/gateway?k=5636415',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      this.temp = res.data.data.cities
      this.cityList = this.arrSortByABC
    })
  },
  computed: {
    arrSortByABC: function (){
      let arr = []
      for (let i = 0; i < 26; i++){
        arr.push({
          index: String.fromCharCode(i+65),
          cities: []
        })
      }
      for (let i = 0; i < this.temp.length; i++){
        for (let j = 0; j < arr.length; j++){
          if (this.temp[i]['pinyin'][0].toUpperCase() === arr[j]['index']){
            arr[j]['cities'].push(this.temp[i])
            break
          }
        }
      }
      return arr
    }
  },
  methods: {
    ...mapMutations('cityModule', ['changeCityName', 'changeCityId']),
    ...mapMutations('filmModule', ['clearFilmList']),
    handleSelect (index) {
      Toast(index)
    },
    handleChangeCity(cityobj){
      // this.$store.state.cityName = cityobj.name // 不能直接修改
      // this.$store.state.cityId = cityobj.cityId
      this.changeCityName(cityobj.name)
      this.changeCityId(cityobj.cityId)
      this.clearFilmList()
      this.$router.back()
    }
  }
}
</script>

<style scoped lang='scss'>

</style>
