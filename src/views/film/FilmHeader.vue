<template>
  <div>
    <ul>
      <router-link to="/film/nowplaying" tag="li" active-class="ricoactive1">正在热映</router-link>
      <router-link to="/film/comingsoon" tag="li" active-class="ricoactive1">即将上映</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilmHeader'
}
</script>

<style scoped lang="scss">
.ricoactive1 {
  color: #0c80dc;
  }
*{
  margin: 0;
  padding: 0;
}
ul {
  display: flex;
  list-style: none;
  text-align: center;
  height: 50px;
  line-height: 50px;
li {
  flex: 1;
  }

  }
</style>
