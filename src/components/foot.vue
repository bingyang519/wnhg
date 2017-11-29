<template>
  <div class="footer">
      <router-link :to="{name:'index'}" tag="p" exact>首页</router-link>
      <router-link :to="{name:'classify'}" tag="p">分类</router-link>
      <router-link :to="{name:'me'}" tag="p">我</router-link>
  </div>
</template>
<script>
export default {
  
}
</script>

<style scoped>
.footer{
    width: 100%;
    height: 100px;
    line-height: 100px;
    background: #fff;
    border-top: 1px solid #666;/*no*/
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
}
.footer p{
    font-size: 28px;/*px*/
    color: #000;
    width: 200px;
    text-align: center;
}
.footer p.router-link-active{
    color: red;
}
</style>
