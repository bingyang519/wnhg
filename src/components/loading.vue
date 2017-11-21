<template>
  <div class="loading" v-if="isShow">
      <img src="../assets/images/loading.gif" alt="">
  </div>
</template>
<script>
export default {
  props:{
      isShow:{
          default:false,
          type:Boolean
      }
  }
}
</script>

<style scoped>
.loading{
    width: 100%;
    height: 100%;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    z-index:99998;
}
.loading img{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin:auto;
    z-index:99999;
    width: 300px;
    height: 300px;
    display: block;
}
</style>

