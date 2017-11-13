<template>
  <div class="footer">
      <router-link :to="{name:'index'}" tag="p" exact>首页</router-link>
      <router-link :to="{name:'classify'}" tag="p">分类</router-link>
      <p @click="my">我</p>
  </div>
</template>
<script>
export default {
  methods:{
      my(){
          this.$http.post(this.API.checkUser)
            .then((res)=>{
                if(res.data.success){
                    this.$router.push({name:'me'})
                }else{
                    this.$router.push({name:'login'})
                }
            })
         
      }
  }
}
</script>

<style scoped>
.footer{
    width: 100%;
    height: 100px;
    line-height: 100px;
    background: #fff;
    border-top: 1px solid #666;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
}
.footer p{
    font-size: 28px;
    color: #000;
    width: 200px;
    text-align: center;
}
.footer p.router-link-active{
    color: red;
}
</style>
