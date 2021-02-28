<template>
  <v-touch v-on:swiperight="onSwipeRight">
    <div v-if="filmInfo" style="width: 100%; overflow:hidden;padding-bottom: 50px">


      <detail-header v-top :film-title="filmInfo.name"></detail-header>
      <div :style="{backgroundImage: `url(${filmInfo.poster})`}"
           style="height: 200px;background-size: cover;background-position: center"></div>
      <h3>{{ filmInfo.name }} -- {{ filmInfo.filmType.name }}</h3>

      <div>{{ filmInfo.category }}</div>
      <div>{{ filmInfo.premiereAt | timeConvert }} 上映</div>
      <div>{{ filmInfo.nation }} | {{ filmInfo.runtime }} 分钟</div>
      <div :class="isShow ? '' : 'synopsis'" style="padding-top: 20px;">{{ filmInfo.synopsis }}</div>
      <div style="text-align:center;" @click="isShow=!isShow"><i class="iconfont"
                                                                 :class="isShow?'icon-less':'icon-moreunfold'"></i>
      </div>

      <h3>演职人员</h3>
      <detail-swiper :per-slide="3" swiper-name="swiper-container-actors">
        <div class="swiper-slide" v-for="(data, index) in filmInfo.actors" :key="index">
          <img :src="data.avatarAddress" alt="">
          <div style="text-align:center;">
            <div>{{ data.name }}</div>
            <div>{{ data.role }}</div>
          </div>
        </div>
      </detail-swiper>
      <h3>剧照</h3>
      <detail-swiper :per-slide="2" swiper-name="swiper-container-photos">
        <div class="swiper-slide" v-for="(data, index) in filmInfo.photos" :key="index">
          <img :src="data" alt="" @click="handlePreview(index)">
        </div>
      </detail-swiper>
    </div>
  </v-touch>
</template>

<script>
import http from '@/util/http'  //别名 @ => src绝对路径
import Vue from 'vue'
import moment from 'moment'
import DetailSwiper from './detail/DetailSwiper'
import DetailHeader from './detail/DetailHeader'
import {ImagePreview, Toast} from 'vant'
import {mapMutations} from 'vuex'
import Vuetouch from 'vue-touch'

Vue.use(Vuetouch)
Vue.filter('timeConvert', (time) => {
  return moment(time * 1000).format('YYYY-MM-DD')
})

//定义指令
Vue.directive('top', {
  inserted (el) {
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.body.scrollTop || document.documentElement.scrollTop) > 50) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  unbind () {
    window.onscroll = null // 销毁监听事件
  }
})
export default {
  name: 'Detail',
  components: {
    detailSwiper: DetailSwiper,
    detailHeader: DetailHeader
  },
  data () {
    return {
      filmInfo: null,
      isShow: false
    }
  },
  methods: {
    ...mapMutations('tabbarModule', ['show', 'hide']),
    handlePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        loop: false,
        closeable: true
      })
    },
    onSwipeRight () {
      this.$router.back()
    }
  },
  mounted () {
    this.hide()
    // console.log('利用获取的id, ajax请求后端接口', location.hash)
    // console.log('利用获取的id, ajax请求后端接口: ', this.$route.params.myid) // 当前匹配的路由对象  router是整个路由信息

    // console.log('利用获取的id, ajax请求后端接口: ', this.$route.query.id)
    http({
      url: `/gateway?filmId=${this.$route.params.myid}&k=2466239`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      },
      method: 'get'
    }).then(res => {
      this.filmInfo = res.data.data.film
    })

  },
  beforeDestroy () {
    this.show()
  }
}
// https://m.maizuo.com/gateway?filmId=5335&k=6936092
// https://m.maizuo.com/gateway?filmId=4835&k=4233727
</script>

<style scoped lang="scss">
.synopsis {
  height: 40px;
  overflow: hidden;
}
</style>
