<template>
  <div>
    {{filmTitle}}
  </div>
</template>

<script>
export default {
  name: 'DetailHeader',
  props: {
    filmTitle: {
      type: String
    }
  }
}
</script>

<style scoped lang='scss'>
  div{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: white;
  }
</style>
