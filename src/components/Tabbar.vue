<template>
  <nav>
    <ul>
      <!--声明式导航-->
      <router-link to="/film" tag="li" active-class="ricoactive"><i class="iconfont icon-training"></i>电影</router-link>
      <router-link to="/cinema" tag="li" active-class="ricoactive"><i class="iconfont icon-all"></i>影院</router-link>
      <router-link to="/center" tag="li" active-class="ricoactive"><i class="iconfont icon-account"></i>我的</router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 25px;
  text-align: center;
  background-color: white;
  z-index: 99;
  ul {
    display: flex;
    list-style: none;

    li {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
}

.ricoactive {
  color: red
}

</style>
