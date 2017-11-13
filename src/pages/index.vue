<template>
  <div>
    <swiper :list="bannerList"></swiper>
    <div class="subject">
        <h6>热门推荐</h6>
        <ul>
            <li v-for="item in subject">
                <img v-lazy="item.url" :alt="item.title">
            </li>
        </ul>
    </div>
    <div class="goods">
        <h6>全球精选好货</h6>
        <ul>
            <li v-for="item in goodsType">
                <router-link :to="{name:'goodsDetails',query:{goodsNo:item.goodsNo}}">
                    <img v-lazy="item.imgUrl" alt="">
                </router-link>
                <p>{{item.goodsName}}</p>
                <div>
                    <span>￥{{item.mallPrice}}</span>
                    <del>￥{{item.marketPrice}}</del>
                </div>
            </li>
        </ul>
    </div>
    <foot></foot>
  </div>
</template>
<script>
import swiper from '../components/swiper'
import foot from '../components/foot'
export default {
  data(){
      return{
          bannerList:[],
          subject:[],
          goodsType:[]
      }
  },
  components:{
      swiper,
      foot
  },
  methods:{
      indexMo(){
          this.$http.post(this.API.indexMo)
          .then((res)=>{
              console.log(res.data,11)
              this.bannerList=res.data.bannerList
              this.subject=res.data.subject
              this.goodsType=res.data.goodsType
          })
          .catch((err)=>{
              console.log(err,22)
          })
      }
  },
  created(){
      this.indexMo()
      console.log('我是index中的created方法')
  },
  beforeRouteLeave(to, from, next){
      console.log(to)
    //   if(to.name=='goodsDetails'){
    //       to.meta.keepAlive=false
    //   }
      next()
  }
}
</script>
<style scoped>
.subject{
    margin-top: 20px;
    background: #fff;
}
.subject h6{
    font-size: 28px;/*px*/
    text-align: center;
    padding:10px 0;
    border-bottom: 2px solid #ebebeb;
}
.subject ul{
    display: flex;
    flex-wrap: wrap;
}
.subject ul li{
    width: 50%;
    box-sizing: border-box;
    border-bottom: 2px solid #ebebeb;
    
}
.subject ul li:nth-child(2n+1){
    border-right: 2px solid #ebebeb;
}
.subject ul li img{
    display: block;
    width: 100%;
}
.goods{
    background: #fff;
    margin-top: 20px;
}
.goods h6{
    font-size: 28px;/*px*/
    text-align: center;
    padding:10px 0;
    border-bottom: 2px solid #ebebeb;
}
.goods ul{
    display: flex;
    flex-wrap: wrap;
}
.goods ul li{
    width: 50%;
     box-sizing: border-box;
    border-bottom: 2px solid #ebebeb;
}
.goods ul li:nth-child(2n+1){
    border-right: 2px solid #ebebeb;
}
.goods ul li img{
    display: block;
    width: 300px;
    height: 300px;
    margin:20px auto;
}
.goods ul li p{
    font-size: 26px;/*px*/
    color: #4d4d4d;
    padding: 0 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
}
.goods ul li span{
    padding-left: 20px;
    font-size: 24px;/*px*/
    color: #d62828;
}
.goods ul li del{
    font-size: 24px;/*px*/
    color: #eee;
    margin-left: 10px;
}
</style>

