<template>
  <div>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="我是有底线的"
              @load="onLoad"
              :immediate-check="false">
      <van-cell v-for="data in filmList" :key="data.filmId" @click="handleClick(data.filmId)">
        <img :src="data.poster" alt="">
        <h3>{{ data.name }}</h3>
        <p class="actors">{{ data.actors | actorFilter }}</p>
        <p>{{ data.nation }} | {{ data.runtime }} 分钟</p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import http from '@/util/http'
import Vue from 'vue'
import {List, Cell} from 'vant'
import {ImagePreview} from 'vant'
import {mapState, mapMutations, mapActions} from 'vuex'


Vue.use(List).use(Cell)

Vue.filter('actorFilter', (arr) => {
  // let str = '主演:'
  // for (var i in arr){
  //   str += ' ' + arr[i].name
  // }
  // return str
  if (arr === undefined) return '暂无主演'
  return '主演: ' + arr.map(item => item.name).join(' ')
})
export default {
  name: 'Nowplaying',
  data () {
    return {
      loading: false, // 是否正在加载中
      finished: false, // 是否结束
      currentIndex: 1 // 记录第几页
    }
  },
  methods: {
    ...mapActions('filmModule', ['getFilmList']),
    onLoad () {

      if (this.filmList.length === this.total && this.filmList.length !== 0) {
        this.finished = true
        return
      }
      // 1.ajax请求页面新数据,
      // 2.合并新数据到老数据
      // 3.this.loading = false
      this.currentIndex++
      this.getFilmList({cityId: this.cityId, currentIndex: this.currentIndex}).then(() => this.loading = false)
      // http({
      //   url: '/gateway?cityId=110100&pageNum=' + this.currentIndex + '&pageSize=10&type=1&k=1352345',
      //   headers: {
      //     'X-Host': 'mall.film-ticket.film.list'
      //   },
      //   method: 'get'
      // }).then(res => {
      //   if (res.data.data.films.length === 0) {
      //     this.finished = true
      //     return
      //   }
      //   this.datalist = [...this.datalist, ...res.data.data.films]
      //   this.loading = false
      // })
    },
    handleClick (id) {
      // location.href = '#/center'

      // 1.路径
      this.$router.push(`/detail/${id}`) // 编成式导航

      // 2. 路由名字
      // this.$router.push({
      //   name: 'ricoDetail',
      //   params: {
      //     myid: id
      //   }
      // })

      // 3. query方式跳转详情
      // this.$router.push(`/detail?id=${id}`)
    }
  },
  mounted () {
    if (this.filmList.length === 0 ){
      this.getFilmList({cityId: this.cityId, currentIndex: this.currentIndex})
    }
  },
  computed: {
    ...mapState('cityModule', ['cityId', 'cityName']),
    ...mapState('filmModule', ['filmList', 'total'])
  }

}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.van-list {
  list-style: none;

  .van-cell {
    overflow: hidden;
    padding: 10px;

    img {
      float: left;
      width: 100px;
    }

    .actors {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
