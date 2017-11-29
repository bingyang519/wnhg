<template>
  <div class="login">
      <top text='登陆'></top>
      <div class="text">
          <span>账号：</span>
          <input type="text" v-model="mobile">
          <button @click="setName">自动填入账号</button>
      </div>
      <div class="pwd">
          <span>密码：</span>
          <input type="password" v-model="paddword">
          <button @click="setPwd">自动填入密码</button>
      </div>
      <div class="err">{{err}}</div>
      <div class="btn">
      </div>
      <button @click.prevent="login" class="button">登陆</button>
      <div class="namePwd">用户名 15757135989 密码 123456</div>
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
        setName(){
            this.mobile=15757135989
        },
        setPwd(){
            this.paddword='123456'
        }
    }
}
</script>

<style scoped>
.login{
    background: #fff;
    width: 100%;
    height: 100%;
    padding: 200px 0;
} 
.login .text,
.login .pwd{
    display: flex;
    justify-content: center;
    align-items: center;
}
.login .text span,
.login .pwd span{
    font-size: 28px;/*px*/
}
.login .text input,
.login .pwd input{
    font-size: 28px;/*px*/
    width: 300px;
    height: 60px;
    background: #fff;
    padding-left: 20px;
    border: 1px solid #eee;/*no*/
}
.login .text button,
.login .pwd button{
    font-size: 24px;/*px*/
    background: #eee;
    border: 1px solid #eee;/*no*/
    margin-left: 20px;
    padding: 10px;
    border-radius: 10px;
}
.login .pwd{
    margin-top: 40px;
}
.login .button{
    width: 300px;
    height: 80px;
    display: block;
    margin: 0 auto;
    margin-top: 150px;
    font-size: 30px;/*px*/
}
.err{
    color: red;
    margin-top: 50px;
    text-align: center;
}
.namePwd{
    margin-top: 50px;
    text-align: center;
}
</style>

