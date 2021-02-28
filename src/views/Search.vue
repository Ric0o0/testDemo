<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词" @cancel="onCancel"/>
<!--      @search="onSearch"-->
<!--      @cancel="onCancel"-->
    <van-list class="cinema">
      <van-cell v-for="data in computedList" :key="data.cinemaId">
        <div>{{data.name}}</div>
        <div class="address">{{data.address}}</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import Vue from 'vue';
import { Search, List, Cell } from 'vant';
import {mapState, mapMutations, mapActions} from 'vuex'


Vue.use(Search).use(List).use(Cell);
export default {
  name: 'Search',
  data(){
    return {
      value: ''
    }
  },
  methods: {
    onCancel(){
      this.$router.replace('/cinema')
    },
    ...mapMutations('tabbarModule', ['show', 'hide']),
    ...mapActions('cinemaModule', ['getCinemaList'])
  },
  computed: {
    computedList (){
      if (this.value === ''){
        return []
      }
      return this.cinemaList.filter((item) => {
        return item.name.toUpperCase().includes(this.value.toUpperCase()) || item.address.toUpperCase().includes(this.value.toUpperCase())
      })

    },
    ...mapState('cinemaModule', ['cinemaList']),
    ...mapState('cityModule', ['cityId', 'cityName']),
  },
  mounted(){
    this.hide()
    if (this.cinemaList.length === 0){
      this.getCinemaList(this.cityId)
    }
  },
  beforeDestroy(){
    this.show()
  }
}
</script>

<style scoped lang='scss'>
.cinema{
  height: 100%;
  overflow: hidden;
  position: relative; // 滚动条高度修正

  li{
    padding: 5px;
    .address{
      font-size: 12px;
      color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
