<template>
  <div style="width: 100%">
    <film-swiper>
      <div class="swiper-slide" v-for="(data, index) in imgList" :key="index">
        <div :style="{backgroundImage: `url(${data})`}" style="height: 200px;background-size: cover"></div>
      </div>
    </film-swiper>
    <film-header style="position: sticky; top: 0;background-color: white;z-index: 99;"></film-header>

    <router-view></router-view>
  </div>
</template>

<script>
import FilmHeader from './film/FilmHeader'
import FilmSwiper from './film/FilmSwiper'
export default {
  name: 'Film',
  components: {
    filmHeader: FilmHeader,
    filmSwiper: FilmSwiper
  },
  data(){
    return {
      imgList: ['https://pic.maizuo.com/usr/movie/3f97c0ef0eca443b9307fad1c05c188e.jpg?x-oss-process=image/quality,Q_70', 'https://pic.maizuo.com/usr/movie/0f35af2416df5a58222f902362bc927e.jpg?x-oss-process=image/quality,Q_70', 'https://pic.maizuo.com/usr/movie/346b0ca49a5fb38dd981fec3b3696be7.jpg?x-oss-process=image/quality,Q_70']
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
