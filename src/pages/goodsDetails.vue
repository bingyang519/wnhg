<template>
  <div class="goodDetail">
    <top text='详情页'></top>
    <swiper :list="imgShowList" class="swiper1"></swiper>
    <div class="tit">
      <p>{{goodsDetail.goodsName2}}</p>
      <div class="price">￥{{minPrice}} ~ {{maxPrice}}</div>
      <div class="market">
        价格：￥<del>{{marketPrice}}</del>
      </div>
      <div class="fee">{{goodsDetail.origin}}品牌 保税区邮，预计2个工作日左右到达</div>
    </div>
	<div class="specification" @click="specificationClick">
		<p>说明：</p>
		<div>
			<span>商品税率</span>
			<span>{{post.postPolicy_desc}}</span>
			<span>100%正品保证</span>
			<span>假一赔十</span>
		</div>
	</div>
	<slider 
    :isShow="specificationIsShow" 
    @sliderHide="specificationHide"
    >
		<h5>商品说明</h5>
		<ul class="ul">
			<li>
				<h6>商品税费</h6>
				<p>本产品适用税率为：{{ goodsDetail.tax*1000/10}}%税费收取规则</p>
			</li>
			<li>
				<h6>商品运费</h6>
				<p>实付满{{post.limitMoney}}元免运费，不足金额的订单收取10元运费，税费、优惠券不计入{{post.limitMoney}}元金额</p>
			</li>
			<li>
				<h6>正品保障</h6>
				<p>唯妮海购每一件商品都经过严苛的品质把关，100%正品保证</p>
			</li>
			<li>
				<h6>假一赔十</h6>
				<p>杜绝一切假货，让你无忧购物</p>
			</li>
		</ul>
    </slider>
	<div class="brand">
		<h6>品牌详情</h6>
		<p>{{goodsDetail.brandStory}}</p>
		<img :src="goodsDetail.brandLogo" alt="">
		<a href="">查看该品牌所有的单品</a>
	</div>
	<div class="detailImg">
		<p>图文详情</p>
		<img v-for="item in imgList" v-lazy="item.imgUrl" alt="">
	</div>
	<div class="footer">
		<div class="btn">
			<div class="bike">加入购物车</div>
			<div class="buy" @click="buy">立即购买</div>
		</div>
	</div>
	<slider 
    :isShow="buyIsShow" 
    @sliderHide="buyHide"
    >
		<div class="sku_header">
			<div class="img">
				<img :src="detailImg" alt="">
			</div>
			<div class="price">
                <transition name="price" mode="out-in">
                    <div class="no_sel" v-if="!hasSel" key="no_sel">
                        <p>￥{{minPrice}} ~ {{maxPrice}}</p>
                        <span>库存：{{realStock}}件</span>
                        <em>请选择商品规格</em>
                    </div>
                    <div class="has_sel" v-else key="has_sel">
                        <ul>
                            <li v-for="item in getIntervalPrice">
                                <span>{{item.intervalFirst}}-{{item.intervalLast}}件单价</span>
                                <em>￥{{item.price}}</em>
                            </li>
                        </ul>
                        <p>库存：{{count}}</p>
                        <p>已选：{{detailSel}}</p>
                    </div>
                </transition>
			</div>
		</div>
		<div class="sku_con">
			<p>规格分类</p>
            <div>
                <label 
                    v-for="(item,index) in detailList" 
                    @click="getPrice(item.skuId,index)"
                    :class="{active:skuId==item.skuId}"
                >
                    {{item.skuName}}
                </label>
            </div>
		</div>
        <div class="num">
            <p>购买数量</p>
            <div>
                <em @click="cut">-</em>
                <input type="text" v-model="buyNum" @keyup="numKeyUp" @blur="numBlur">
                <em @click="add">+</em>
            </div>
        </div>
        <div 
            :class="['btn',{none:realStock==0 || (count==0 && skuId!=0)}]"
            @click="btnClick"
        >
            确定
        </div>
	</slider>
    <layer 
        :layerShow='layerIsShow' 
        :text='layerText'
        @layerHide='layerIsShow=false' 
    ></layer>
  </div>
</template>
<script>
import swiper from "@/components/swiper";
import slider from "@/components/slider";
import layer from "@/components/layer";
import top from "@/components/top";
import commonMethods from '@/assets/js/common';
export default {
  name: "goodsDetails",
  data() {
    return {
      goodsNo: "",
      imgShowList: [],
      goodsDetail: {},
      imgList: [],
      detailList:[],
	  specificationIsShow: false,
	  buyIsShow:false,
      post: {},
      realStock:0,
      count:0,
      detailImg:'',
      detailSel:'',
      getIntervalPrice:[],
      hasSel:false,
      buyNum:1,
      skuId:0,
      layerIsShow:false,
      layerText:''
    };
  },
  components: {
    swiper,
    slider,
    layer,
    top,
  },
  computed: {
    minPrice() {
      return Number(this.goodsDetail.minPrice).toFixed(2);
    },
    maxPrice() {
      return Number(this.goodsDetail.maxPrice).toFixed(2);
    },
    marketPrice() {
      return Number(this.goodsDetail.marketPrice).toFixed(2);
    }
  },
  methods: {
    getData() {
      this.$http
        .post(this.API.detailMo, "goodsNo=" + this.goodsNo)
        .then(res => {
          console.log(res.data);
          this.imgShowList = res.data.imgShowList;
          this.goodsDetail = res.data.goodsDetail;
          this.imgList = res.data.imgList;
          this.post = res.data.post;
          this.detailList=res.data.detailList
          this.detailImg=res.data.goodsDetail.imgUrl2
          this.realStock=res.data.goodsDetail.realStock
        });
    },
    specificationClick() {
      this.specificationIsShow = true;
    },
    specificationHide() {
      this.specificationIsShow = false;
    },
    buy() {
		this.$http.post(this.API.checkUser)
			.then((res)=>{
				if(res.data.success){
					this.buyIsShow=true;
				}else{
					this.$router.push({name:'login'})
				}
			})
	},
	buyHide(){
		this.buyIsShow=false;
    },
    getPrice(skuLd,index){
        this.detailSel=this.detailList[index].skuName
        this.count=this.detailList[index].count
        this.detailImg=this.detailList[index].imgUrl2
        this.skuId=skuLd
        this.hasSel=true
        this.buyNum=1
        this.$http.post(this.API.getIntervalPrice,`skuId=${skuLd}`).
        then((res)=>{
            if(res.data.success){
                this.getIntervalPrice=res.data.result
            }
        })
    },
    cut(){
        if(this.buyNum>1){
            this.buyNum--
        }
    },
    add(){
        if(this.skuId==0){
            if(this.buyNum<this.realStock){
                this.buyNum++
            }
        }else{
            if(this.buyNum<this.count){
                this.buyNum++
            }
        }
    },
    numKeyUp(){
        this.buyNum=this.buyNum.replace(/\D/g,'')
    },
    numBlur(){
        console.log(this.buyNum)
        if(this.skuId==0){
            if(this.buyNum>this.realStock){
                this.buyNum=1
            }
        }else{
            if(this.buyNum>this.count){
                this.buyNum=1
            }
        }
        if(this.buyNum==0){
            this.buyNum=1
        }
    },
    btnClick(){
        if(this.realStock==0 || (this.skuId!=0 && this.count==0)){
            return false;
        }
        if(this.detailList.length>0 && !this.detailSel){
            this.layerText='请选择规格'
            this.layerIsShow=true
            return false;
        }
        //跳转到支付页面
        commonMethods.setCookie('PALACE_ORDER_SKUNO', this.skuId);
        commonMethods.setCookie('PALACE_ORDER_NUMS', this.buyNum);
        commonMethods.setCookie('PALACE_ORDER_COUPONID', "");
        commonMethods.setCookie('PALACE_ORDER_ADDRESS', "");
        commonMethods.setCookie('fromShop', 0);
        this.$router.push({name:'surePay'})
    }
  },
  created() {
    this.goodsNo = this.$route.query.goodsNo;
    console.log('我是goodsDetail中的created方法')
  },
  mounted() {
    this.getData();
    console.log(this.$route.meta.keepAlive)
    this.$route.meta.keepAlive=true
  },
  beforeRouteLeave(to, from, next){
      console.log(to)
      if(to.name=='index'){
          to.meta.keepAlive=true
      }
    //   if(to.name=='surePay'){
    //       from.meta.keepAlive=true;
    //   }
      next()
  },
  beforeRouteEnter(to, from, next){
    //   to.meta.keepAlive=true
    //   console.log(to,1111)
      next()
  }
};
</script>
<style scoped>
.price-enter-active,
.price-leave-active{
    transition: all .5s ease;
}
.price-enter,
.price-leave-to{
    opacity: 0;
}
.swiper1{
    margin-top: 100px;
}
.tit {
  background: #fff;
  border-top: 2px solid #ededed;
  border-bottom: 2px solid #ededed;
  padding: 20px;
}
.tit p {
  font-size: 30px;/*px*/
  color: #4d4d4d;
  padding: 0 20px;
  border-bottom: 2px solid #ededed;
}
.tit .price {
  font-size: 28px;/*px*/
  color: #f45e48;
  padding: 10px 20px;
}
.tit .market {
  font-size: 24px;/*px*/
  color: #adadad;
  padding: 0 20px;
}
.tit .fee {
  color: #adadad;
  padding: 5px 20px;
}
.specification {
  display: flex;
  background: #ffffff;
  margin-top: 20px;
  padding: 20px 40px;
}
.specification p {
  font-size: 30px;/*px*/
}
.specification div {
  width: 400px;
  display: flex;
  flex-wrap: wrap;
}
.specification div span {
  font-size: 28px;/*px*/
  display: block;
  margin-left: 20px;
}
.specification div span::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}
.slide h5 {
  font-size: 30px;/*px*/
  text-align: center;
  padding: 20px;
}
.slide .ul {
  padding-bottom: 20px;
}
.slide .ul li {
  padding: 10px 20px;
}
.slide .ul li h6 {
  font-size: 28px;/*px*/
}
.slide .ul li h6::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  background: red;
  vertical-align: middle;
  margin-right: 10px;
  transform: rotate(45deg);
}
.slide .ul li p {
  font-size: 24px;/*px*/
}
.brand {
  margin-top: 20px;
  background: #fff;
}
.brand h6 {
  padding: 20px;
  font-size: 30px;/*px*/
  text-align: center;
}
.brand p {
  font-size: 24px;/*px*/
  line-height: 1.5;
  padding: 0 20px;
}
.brand img {
  width: 100px;
  height: 100px;
  display: block;
  margin: 10px auto;
}
.brand a {
  font-size: 28px;/*px*/
  text-align: center;
  display: block;
  padding-bottom: 10px;
  color: orange;
}
.detailImg {
  margin-top: 20px;
  background: #fff;
}
.detailImg p {
  font-size: 30px;/*px*/
  text-align: center;
  margin: 20px;
}
.detailImg img {
  width: 100%;
  display: block;
}
.footer {
  width: 100%;
  height: 100px;
  line-height: 100px;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #fff;
  border-top: 2px solid #666;
  display: flex;
  flex-direction: row-reverse;
}
.footer .btn {
  width: 60%;
  border-left: 2px solid #666;
  display: flex;
  align-items: stretch;
}
.footer .btn .bike {
  width: 50%;
  text-align: center;
  font-size: 30px;/*px*/
}
.footer .btn .buy {
  width: 50%;
  background: red;
  text-align: center;
  font-size: 30px;/*px*/
  color: #fff;
}
.sku_header{
    display: flex;
    border-bottom: 2px solid #eee;
} 
.sku_header .img{
    width: 180px;
    height: 180px;
    overflow: hidden;
    border: 2px solid #eee;
    margin-left: 20px;
    transform: translateY(-30px);
    background: #fff;
}
.sku_header .img img{
    display: block;
    width: 100%;
}
.sku_header .price{
    margin-top: 20px;
    margin-left: 30px;
    width:500px;
}
.sku_header .price .no_sel p{
    font-size: 30px;/*px*/
    color: red;
}
.sku_header .price .no_sel em,
.sku_header .price .no_sel span{
    display: block;
    font-size: 28px;/*px*/
}
.sku_header .price .has_sel ul{
    display: flex;
    justify-content: space-between;
}
.sku_header .price .has_sel ul li{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.slide .sku_con{
    padding: 0 20px;
    margin-top: 30px;
    margin-bottom: 40px;
}
.slide .sku_con p{
    font-size: 30px;/*px*/
    margin-bottom: 20px;
}
.slide .sku_con div{
    display: flex;
    flex-wrap: wrap;
}
.slide .sku_con div label{
    display: block;
    width: 150px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-left: 30px;
    font-size: 28px;/*px*/
    border: 2px solid #eee;
}
.slide .sku_con div label.active{
    background:red;
    color: #fff;
}
.slide .num{
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-top: 2px solid #eee;
    border-bottom: 2px solid #eee;
}
.slide .num p{
    font-size: 30px;/*px*/
}
.slide .num div{
    display: flex;
    justify-content: center;
    border: 2px solid #eee;
}
.slide .num em{
    width: 70px;
    display: block;
    font-size: 30px;/*px*/
    text-align: center;
}
.slide .num input{
    width: 100px;
    border: none;
    border-left: 2px solid #eee;
    border-right: 2px solid #eee;
    text-align: center;
    font-size: 28px;/*px*/
}
.slide .btn{
    width: 300px;
    height: 70px;
    line-height: 70px;
    border-radius: 20px;
    text-align: center;
    background: red;
    color: #fff;
    font-size: 30px;/*px*/
    margin:30px auto;
}
.slide .none{
    background: #eee;
}
</style>


