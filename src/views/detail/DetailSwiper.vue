<template>
  <div :class="swiperName">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.min.css'
export default {
  name: 'DetailSwiper',
  props: {
    perSlide: {
      type: Number,
      default: 1
    },
    swiperName: {
      type: String,
      default: '.swiper-container'
    }
  },
  mounted(){
    new Swiper('.'+this.swiperName,{
      slidesPerView: this.perSlide,
      spaceBetween: 30,
      freeMode: true
    })
  }
}
</script>

<style scoped lang='scss'>
.swiper-wrapper{
  img{
    width: 100%;
  }
}
</style>
