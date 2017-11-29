<template>
  <div class="order">
      <loading></loading>
      <top text="我的订单"></top>
      <div class="tit">
        <router-link to="/order?type=0" replace>全部</router-link>
        <router-link to="/order?type=1" replace>待付款</router-link>
        <router-link to="/order?type=2" replace>待发货</router-link>
        <router-link to="/order?type=3" replace>待收货</router-link>
        <router-link to="/order?type=4" replace>已完成</router-link>
      </div>
      <ul>
          <li v-for="item in orderList">
              <div class="top">
                  <span>订单编号：{{item.tradeNo}}</span>
                  <em>交易关闭</em>
              </div>
              <template v-for="i in item.orderGoods">
                <router-link :to="{name:'goodsDetails',query:{goodsNo:i.tradeGoodsNo}}">
                    <div class="con">
                        <div class="left">
                            <img v-lazy="i.goodsImgUrl" alt="">
                            <div class="info">
                                <p>{{i.tradeName}}</p>
                                <span>规格：{{i.skuName}}</span>
                            </div>
                        </div>
                        <div class="right">
                            <p>￥{{i.sellPrice}}</p>
                            <span>x {{i.sellCount}}</span>
                        </div>
                    </div>
                </router-link>
                <div class="bottom">
                    <span>{{getTime(item.regTime)}}</span>
                    <p>共1件 应付总额：<em>￥{{i.sellTotal}}</em></p>
                </div>
              </template>
          </li>
      </ul>
      <div class="noData" v-if="noData">暂无数据</div>
      <div class="loading" v-if="loading">数据加载中...</div>
  </div>
</template>
<script>
import top from '../components/top'
import loading from '../components/loading'
export default {
    data(){
        return{
            orderList:[],
            loading:false,
            noData:false,

        }
    },
    components:{
        top,
        loading
    },
    watch:{
        '$route'(){
            this.orderList=[]
            this.getData()
        }
    },
    methods:{
        getTime(d){
            return `${new Date(d).getFullYear()}-${new Date(d).getMonth()+1}-${new Date(d).getDate()}`
        },
        getData(){
            this.loading=true;
            this.noData=false;
            this.$http.post(this.API.orderMo,`type=${this.$route.query.type}`)
            .then((res)=>{
                console.log(res.data.orderTrades)
                this.orderList=res.data.orderTrades
                this.loading=false;
                if(this.orderList.length>0){
                    this.noData=false;
                }else{
                    this.noData=true;
                }
            })
        }
    },
    mounted(){
        this.getData()
    }
}
</script>
<style scoped>
.tit{
    margin-top: 100px;
    border-top: 1px solid #666;/*no*/
    background: #fff;
    display: flex;
    justify-content: space-around;
}
.tit a{
    padding: 20px 10px;
    font-size: 28px;/*px*/
    border-bottom: 4px solid transparent;/*px*/

}
.tit a.router-link-exact-active{
    border-bottom: 4px solid  #bc4344;/*px*/
}
ul{
    width: 100%;
}
ul li{
    margin-top: 20px;
    background: #fff;
    padding: 0 30px;
}
ul li .top{
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
}
ul li .top span{
    font-size: 24px;/*px*/
}
ul li .top em{
    font-size: 24px;/*px*/
    color: red;
}
ul li .con{
    border-bottom: 1px solid #eee;/*no*/
    border-top: 1px solid #eee;/*no*/
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
}
ul li .con .left{
    display: flex;
}
ul li .con .left img{
    width: 120px;
    height: 120px;
    display: block;
}
ul li .con .left .info{
    width: 450px;
    margin-left: 20px;
}
ul li .con .left .info p{
    font-size: 28px;/*px*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
}
ul li .con .left .info span{
    font-size: 24px;/*px*/
    color: #999;
    margin-top: 5px;
    display: block;
}
ul li .con .right{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
ul li .con .right p{
    font-size: 28px;/*px*/
}
ul li .con .right span{
    font-size: 24px;/*px*/
    color: #999;
}
ul li .bottom{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
}
ul li .bottom span{
    font-size: 24px;/*px*/
}
ul li .bottom p{
    font-size: 24px;/*px*/
}
ul li .bottom p em{
    color: red;
}
.loading{
    font-size: 24px;/*px*/
    margin-top: 20px;
    text-align: center;
}
.noData{
    font-size: 30px;/*px*/
    text-align: center;
    margin-top: 200px;
}
</style>
