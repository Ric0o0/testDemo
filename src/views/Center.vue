<template>
  <div>
    center
  </div>
</template>

<script>
export default {
  name: 'Center',
  mounted () {
    // 检查是否有token, 如果没有, 重定向到login
    // if (!localStorage.getItem('token')) {
    //   this.$router.push('/login')
    // }
  },

  // 局部路由拦截
  beforeRouterEnter (to, from, next) {
    if (!localStorage.getItem('token')) {
      // 验证为false, 跳转login
      next('/login')
    } else {
      next()
    }
  }
}
</script>

<style scoped>

</style>
