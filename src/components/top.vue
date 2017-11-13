<template>
  <div class="top">
      <span @click="back">返回</span>
      {{text}}
      <span>首页</span>
  </div>
</template>
<script>
export default {
  props:{
      text:{
          default:'title',
          type:String
      }
  },
  methods:{
      back(){
          this.$router.go(-1)
      }
  }
}
</script>

<style scoped>
.top{
    width: 100%;
    height: 100px;
    line-height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 2px solid #eee;/*px*/
    z-index: 20;
    background: #fff;
    display: flex;
    justify-content: space-between;
    font-size: 30px;/*px*/
}
.top span{
    padding: 0 50px;
}
</style>

