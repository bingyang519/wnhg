<template>
  <div class="login">
      <top text='登陆'></top>
      <div class="text">
          账号：<input type="text" v-model="mobile">
      </div>
      <div class="pwd">
          密码：<input type="password" v-model="paddword">
      </div>
      <div class="err">{{err}}</div>
      <div class="btn">
        <button>填入账号</button>
        <button>填入密码</button>
      </div>
      <button @click.prevent="login">登陆</button>
      <div>用户名 15757135989 密码 123456</div>
  </div>
</template>
<script>
import hex_md5 from '../assets/js/md5'
import top from '@/components/top'
export default {
    name:'login',
    data(){
        return {
            mobile:'',
            paddword:'',
            err:'',
        }
    },
    components:{
        top
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

