<template>
  <div class="goodsList">
      <div class="goodsSort">
          <ul>
              <li @click="rank('xl')">
                  <p :class="{on:this.sort=='xl'}">销量</p>
                  <span :class="{top:this.sort=='xl' && this.order===1,bottom:this.sort=='xl' && this.order===0}"></span>
              </li>
              <li @click="rank('sj')">
                  <p :class="{on:this.sort=='sj'}">售价</p>
                  <span :class="{top:this.sort=='sj' && this.order===1,bottom:this.sort=='sj' && this.order===0}"></span>
              </li>
              <li @click="rank('kcl')">
                  <p :class="{on:this.sort=='kcl'}">库存量</p>
                  <span :class="{top:this.sort=='kcl' && this.order===1,bottom:this.sort=='kcl' && this.order===0}"></span>
              </li>
              <li @click="rank('sjsj')">
                  <p :class="{on:this.sort=='sjsj'}">上架时间</p>
                  <span :class="{top:this.sort=='sjsj' && this.order===1,bottom:this.sort=='sjsj' && this.order===0}"></span>
              </li>
              <li>
                  <p>品牌</p>
              </li>
          </ul>
      </div>
      <div 
        class="goodsDetail" 
        v-infinite-scroll="loadMore" 
        infinite-scroll-disabled="busy" 
        infinite-scroll-distance="100">
          <ul>
              <li v-for="item in list">
                  <router-link :to="{name:'goodsDetails',query:{goodsNo:item.goodsNo}}">
                    <img v-lazy="item.imgUrl" alt="">
                    <p>{{item.goodsName}}</p>
                    <span>￥{{item.mallPrice}}</span>
                    <del>￥{{item.marketPrice}}</del>
                  </router-link>
              </li>
          </ul>
      </div>
      <div class="loading" v-if="loading">数据加载中...</div>
      <div class="dataOver" v-if="this.pageNum>this.pages">我是有底线的</div>
  </div>
</template>
<script>
export default {
  name:'goodsList',
  data(){
      return {
          isFirstEnter:true,
          threeCategory:null,
          pageNum:1,
          name:'',
          sort:'',
          order:'',
          brandld:'',
          list:[],
          pages:1,
          busy:false,
          loading:false,

      }
  },
  methods:{
      getData(){
          this.busy=true;
          this.loading=true;
          let d=`name=${this.name}&pageNum=${this.pageNum}&sort=${this.sort}&order=${this.order}&brandld=${this.brandld}&threeCategory=${this.threeCategory}`
          this.$http.post(this.API.searchGoods,d)
          .then((res)=>{
              console.log(res)
              this.loading=false;
              this.list.push(...(res.data.list));
              this.pages=res.data.pages;
              this.$nextTick(()=>{
                this.pageNum++;
                this.busy=false;
              })
          })

      },
      rank(sort){
          this.pageNum=1;
          this.list=[];
          if(this.sort!==sort){
              this.order='';
              this.sort=sort
          }
          if(this.order==='' || this.order==1){
              this.order=0
          }else if(this.order==0){
              this.order=1
          }
          this.getData()
      },
      loadMore(){
          if(this.pageNum<=this.pages){
              this.getData()
          }

      }
  },
  created(){
      this.isFirstEnter=true;
  },
  mounted(){
      
  },
  activated() {
      if(!this.$route.meta.isKeepAlive || this.isFirstEnter){
          console.log('我是goodList的activated方法')
        this.threeCategory=null,
        this.pageNum=1,
        this.name='',
        this.sort='',
        this.order='',
        this.brandld='',
        this.list=[],
        this.pages=1,
        this.busy=false,
        this.loading=false,
        this.threeCategory=this.$route.query.threeCategory
        this.getData();
      }
      this.$route.meta.isKeepAlive=false;
      this.isFirstEnter=false;
    
  },
  beforeRouteEnter(to,from,next){
      if(from.name=='goodsDetails'){
          to.meta.isKeepAlive=true
      }
      next()
  },
 
}
</script>
<style scoped>
.goodsList{
    background: #fff;
}
.goodsSort{
    background: #fff;
    border-bottom: 1px solid #ebebeb;/*no*/
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
.goodsSort ul{
    display: flex;
    padding: 20px;
    justify-content: space-between;
}
.goodsSort ul li{
    display: flex;
    align-items: center;
}
.goodsSort ul li p{
    font-size: 28px;/*px*/
}
.goodsSort ul li p.on{
    color: red;
}
.goodsSort ul li span{
    width: 24px;
    height: 24px;
    display: block;
    background: url('../assets/images/icon-week.png') no-repeat -48px 0;
    margin-left: 10px;
}
.goodsSort ul li span.top{
    background-position-x: 0;
}
.goodsSort ul li span.bottom{
    background-position-x: -24px;
}
.goodsDetail ul{
    display: flex;
    flex-wrap: wrap;
    margin-top: 78px;
}
.goodsDetail ul li{
    width: 50%;
    padding-bottom: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebebeb;/*no*/
}
.goodsDetail ul li:nth-child(2n+1){
    border-right: 1px solid #ebebeb;/*no*/
}
.goodsDetail ul li img{
    width: 270px;
    height: 270px;
    display: block;
    margin: 20px auto;
}
.goodsDetail ul li p{
    padding: 0 20px;
    font-size: 28px;/*px*/
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    height: 80px;
}
.goodsDetail ul li span{
    font-size: 30px;/*px*/
    margin-left: 20px;
    color: red;
}
.goodsDetail ul li del{
    font-size: 24px;/*px*/
    color: #b6bbc1;
    margin-left: 10px;
}
.dataOver,
.loading{
    padding: 20px;
    text-align: center;
    font-size: 24px;/*px*/
}
</style>
