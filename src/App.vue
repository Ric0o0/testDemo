<template>
  <div id="app">
    <!--    hello world &#45;&#45; {{ myname }}-->
    <!--    <ul>-->
    <!--      <li>111</li>-->
    <!--      <li>222</li>-->
    <!--      <li>333</li>-->
    <!--    </ul>-->
    <!--    <button @click="handleClick">click</button>-->
    <!--    <input type="text" v-model="mytext">-->
    <!--    <button @click="handleAdd">add</button>-->
    <!--    <div v-if="datalist.length === 0">购物车空空如也</div>-->
    <!--    <ul v-else>-->
    <!--      <li v-for="(data, index) in datalist" :key="data">-->
    <!--        {{ data }}-->
    <!--        <button @click="handleDel(index)">del</button>-->
    <!--      </li>-->
    <!--    </ul>-->

    <!--    <navbar></navbar>-->
    <!--    <sidebar></sidebar>-->

    <!--    <home v-show="which==='home'"></home>-->
    <!--    <list v-show="which==='list'"></list>-->
    <!--    <shopcar v-show="which==='shopcar'"></shopcar>-->

    <tabbar v-show="isTabbarShow"></tabbar>
    <!--路由容器-->
    <section>
      <router-view></router-view>
    </section>
    <!--    <router-view></router-view>-->
  </div>
</template>
<script>
import Tabbar from './components/Tabbar'
import navbar from './components/Navbar'
import sidebar from './components/Sidebar'
import Vue from 'vue'
import {mapState} from 'vuex'

Vue.component('navbar', navbar)
Vue.component('sidebar', sidebar)
Vue.component('tabbar', Tabbar)

// ES6模块导出
export default {
  data () {
    return {
      myname: 'rico',
      mytext: '',
      datalist: []

    }
  },

  // components: {
  //   sidebar, // 局部注册组件
  //   navbar
  // },
  methods: {
    handleClick () {
      this.myname = 'rico1111'
    },
    handleAdd () {
      this.datalist.push(this.mytext)
      this.mytext = ''
    },
    handleDel (index) {
      this.datalist.splice(index, 1)
    }
  },
  computed: {
    ...mapState('tabbarModule', ['isTabbarShow'])
  },
  mounted () {
    // console.log(mapState('tabbarModule', ['isTabbarShow']))
  }
  // mounted () {
  // 1. 后端配置好 CORS
  // axios.get('http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5').then(res => {
  //   console.log(res.data)
  // })

  // 2. 猫眼 反向代理
  // axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=AAA6A75032B511EB8BFC9F99ADB2DED7C215A5AA16C445699C0EE3C072CF47E2&optimus_risk_level=71&optimus_code=10').then(res=>{
  //   console.log(res.data)
  // })

  // 3. 卖座
  //   axios({
  //     url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=100&type=1&k=1352345",
  //     headers: {
  //       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606707116641191372652545","bc":"110100"}',
  //       'X-Host': 'mall.film-ticket.film.list'
  //     },
  //     method: 'get'
  //   }).then(res => {
  //     console.log(res.data)})
  // }
}
</script>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

ul {
  li {
    background-color: red;
  }
}

section {
  margin-bottom: 50px;
}
</style>
