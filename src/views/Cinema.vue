<template>
<div>
  <van-nav-bar
    title="标题"
    right-text="按钮"
    style="height: 50px"
    @click-left="handleLeft()"
    @click-right="handleSearch()">

    <template #left>
      {{ cityName }}
      <van-icon name="arrow-down" color="#000" />
    </template>
    <template #right>
      <van-icon name="search" size="22" color="#000" />
    </template>
  </van-nav-bar>

  <div :style="{height: height}" class="cinema">
    <ul>
      <li v-for="data in cinemaList" :key="data.cinemaId">
        <div>{{data.name}}</div>
        <div class="address">{{data.address}}</div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>

import BetterScroll from 'better-scroll'
import { NavBar, Icon } from 'vant'
import Vue from 'vue'
import {mapState, mapActions, mapMutations} from 'vuex'

Vue.use(NavBar).use(Icon)
export default {
  name: 'Cinema',
  data(){
    return {
      height: 0
    }
  },
  methods: {
    handleLeft(){
      // 清空cinemaList
      this.clearCinemaList()
      this.$router.push('/city')
    },
    handleSearch(){
      this.$router.push('/search')
    },
    ...mapActions('cinemaModule', ['getCinemaList']),
    ...mapMutations('cinemaModule', ['clearCinemaList'])
  },
  computed: {
    ...mapState('cinemaModule', ['cinemaList']),
    ...mapState('cityModule', ['cityId', 'cityName'])
  },
  mounted(){
    //访问 cityName, cityId


    this.height = document.documentElement.clientHeight - 100 + 'px'
    if (this.cinemaList.length === 0){
      // vuex 异步流程
      this.getCinemaList(this.cityId).then(() => {
        this.$nextTick(()=>{
          new BetterScroll('.cinema', {
            scrollbar: {
              fade: true
            }
          })
        })
      })
    } else {
      // console.log('缓存')
      this.$nextTick(()=>{
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
    // // 状态立即更改,, dom异步渲染


  }
}
</script>

<style lang="scss" scoped>
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
