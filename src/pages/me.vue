<template>
    <div class="me">
        <button @click="loginOut">退出登陆</button>
    </div>
</template>
<script>
export default {
  methods:{
      loginOut(){
          this.$http.post(this.API.loginOut)
          .then((res)=>{
              if(res.data.success){
                  this.$router.push({name:'index'})
              }
          })
      }
  }
}
</script>

