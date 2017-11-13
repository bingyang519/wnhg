<template>
  <div class="login">
      <div class="text">
          账号：<input type="text" v-model="mobile">
      </div>
      <div class="pwd">
          密码：<input type="password" v-model="paddword">
      </div>
      <div class="err">{{err}}</div>
      <button @click.prevent="login">登陆</button>
      <button @click.prevent="ddd">ddd</button>
  </div>
</template>
<script>
import hex_md5 from '../assets/js/md5'
export default {
    name:'login',
    data(){
        return {
            mobile:'',
            paddword:'',
            err:'',
        }
    },
    computed:{
        pwd(){
            return hex_md5(this.paddword)
        }
    },
    methods:{
        login(){
            this.$http.post(this.API.login,`mobile=${this.mobile}&password=${this.pwd}`)
            .then((res)=>{
                this.err=''
                console.log(res,111)
                if(res.data.msg=='00000001'){
                    this.err='账号或密码错'
                }else if(res.data.msg=='00000007'){
                    this.err='手机号错误'
                }else if(res.data.msg=="00000000"){
                    this.err='chengg'
                    this.$router.go(-1)
                }
            })
            .catch((err)=>{
                console.log(err,222)
            })
        },
        ddd(){
            alert(this.isLogin)
        }
    }
}
</script>

<style scoped>
.login{
    margin-top: 200px;
    margin-left: 100px;
}
.login .pwd{
    margin-top: 20px;
}
.login button{
    width: 100px;
    height: 50px;
    margin-top: 50px;
    margin-left: 150px;
}
.err{
    color: red;
    margin-top: 10px;
    margin-left: 10px;
}
</style>

