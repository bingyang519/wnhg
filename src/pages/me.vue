<template>
    <div class="me">
        <div class="head">
            <img :src="userImg" alt="">
            <span>{{userName}}</span>
        </div>
        <test-scroll :dataList="getNoticeList"></test-scroll>
        <div class="orderList">
            <div class="all">
                <p>我的订单</p>
                <router-link to="/order?type=0" tag="span">查看全部订单 &gt;</router-link>
            </div>
            <ul>
                <router-link to="/order?type=1" tag="li">待付款</router-link>
                <router-link to="/order?type=2" tag="li">待发货</router-link>
                <router-link to="/order?type=3" tag="li">待收货</router-link>
                <router-link to="/order?type=4" tag="li">已完成</router-link>
            </ul>
        </div>
        <button @click="loginOut">退出登陆</button>
        <foot></foot>
    </div>
</template>
<script>
import testScroll from '../components/testScroll'
import foot from '../components/foot'
export default {
  data(){
      return{
          userImg:'',
          userName:'',
          getNoticeList:[],
      }
  },
  components:{
      testScroll,
      foot

  },
  methods:{
      checkUser(){
          this.$http.post(this.API.checkUser)
          .then((res)=>{
              if(res.data.success){
                  this.userImg=res.data.userInfo.headUrl;
                  this.userName=res.data.userInfo.nickName;
              }
          })
      },
      getNotice(){
          this.$http.post(this.API.getNotice)
          .then((res)=>{
              this.getNoticeList=res.data.adList
          })
      },
      loginOut(){
          this.$http.post(this.API.loginOut)
          .then((res)=>{
              if(res.data.success){
                  this.$router.push({name:'index'})
              }
          })
      }
  },
  created(){
      this.checkUser()
      this.getNotice()
  },
}
</script>
<style scoped>
.head{
    background: #fff;
    padding: 50px 0;
    display: flex;
    align-items: center;
    padding-left: 100px;
}
.head img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
}
.head span{
    font-size: 30px;/*px*/
    margin-left: 40px;
}
.orderList{
    width: 100%;
    background: #fff;
}
.orderList .all{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:20px;
    border: 1px solid #eee;/*no*/
}
.orderList .all p{
    font-size: 30px;/*px*/
}
.orderList .all span{
    color: #888;
}
.orderList ul li{
    padding: 20px 60px;
    border-bottom: 1px solid #eee;/*no*/
    font-size: 28px;/*px*/
    
}
.bonus{
    font-size: 30px;/*px*/
    padding: 20px;
    margin-top: 20px;
    background: #fff;
}
button{
    width: 400px;
    height: 80px;
    line-height: 80px;
    font-size: 30px;/*px*/
    background: #e6e6e6;
    border: none;
    color: #666;
    border-radius: 20px;
    display: block;
    margin: 40px auto 0;
}
</style>

