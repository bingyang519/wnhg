<template>
    <div class="surepay">
        <top text='确认支付'></top>
        <div class="add">
            <div class="detail" v-if="addrList.length>0">
                <p>{{addrList[0].person_name}} {{addrList[0].serv_num}}</p>
                <span>{{addrList[0].area_name}} {{addrList[0].address}}</span>
            </div>
            <div class="arr">></div>
        </div>
        <div class="goodsInfo" v-if="shopList.length>0">
            <img :src="shopList[0].imgUrl" alt="">
            <div class="info">
                <p>{{shopList[0].goodsName2}}</p>
                <span>规格：{{shopList[0].skuName}}</span>
                <em>￥{{shopList[0].skuPrice}}</em>
            </div>
            <div class="num">
                X{{shopList[0].num}}
            </div>
        </div>
        <div class="priceList">
            <ul>
                <li>
                    <span>优惠券：</span>
                    <em>可用0张</em>
                </li>
                <li>
                    <span>商品金额（不含税）：</span>
                    <em>￥{{amountAll}}</em>
                </li>
                <li>
                    <span>活动：</span>
                    <em>￥0</em>
                </li>
                <li>
                    <span>优惠券优惠：</span>
                    <em>￥0</em>
                </li>
                <li>
                    <span>运费：</span>
                    <em>￥0</em>
                </li>
                <li>
                    <span>预计税费：</span>
                    <em>￥0</em>
                </li>
                <li>
                    <span>应付总额：</span>
                    <em>￥{{amountAll}}</em>
                </li>
            </ul>
        </div>
        <div class="foot">
            <p>总计：<span>￥{{amountAll}}</span></p>
            <div class="btn">确认并付款</div>
        </div>
    </div>
</template>
<script>
import top from "@/components/top";
export default {
  data() {
    return {
      addrList: [],
      shopList: [],
      amountAll: 0,
      couDiscount: 0,
      discount: 0,
      postAge: 0,
      shopCount: 0,
      taxAll: 0
    };
  },
  components: {
    top
  },
  methods: {
    getData() {
      this.$http
        .post(this.API.toMoPalaceOrder)
        .then(res => {
          console.log(res.data);
          this.addrList = res.data.addrList;
          this.shopList = res.data.shopList;
          this.amountAll = res.data.amountAll;
          this.couDiscount = res.data.couDiscount;
          this.discount = res.data.discount;
          this.postAge = res.data.postAge;
          this.shopCount = res.data.shopCount;
          this.taxAll = res.data.taxAll;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    console.log("我是surePay中的created方法");
  },
  mounted() {
    this.getData();
  },
  beforeRouteLeave(to, from, next){
      console.log(to)
      if(to.name=='goodsDetails'){
          to.meta.keepAlive=true
      }
      next()
  }
};
</script>
<style scoped>
.add {
  margin-top: 100px;
  background: #fff;
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add .detail p {
  font-size: 30px; /*px*/
  margin-bottom: 10px;
}
.add .detail span {
  font-size: 24px; /*px*/
  color: #999;
}
.add .arr {
  font-size: 40px; /*px*/
}
.goodsInfo {
  margin: 20px 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.goodsInfo img {
  width: 200px;
  height: 200px;
  display: block;
}
.goodsInfo .info {
  padding-left: 20px;
  padding-right: 60px;
}
.goodsInfo .info p {
  font-size: 28px; /*px*/
}
.goodsInfo .info span {
  font-size: 24px; /*px*/
  display: block;
  padding: 10px 0;
  color: #999;
}
.goodsInfo .info em {
  font-size: 24px;
  display: block;
  color: red;
}
.priceList {
  background: #fff;
}
.priceList ul li {
  padding: 20px 40px;
  border-bottom: 1px solid #999; /*px*/
  font-size: 28px; /*px*/
  display: flex;
  justify-content: space-between;
}
.priceList ul li em {
  color: red;
}
.foot {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  line-height: 100px;
  display: flex;
  justify-content: flex-end;
  background: #fff;
}
.foot .btn {
  width: 250px;
  background: red;
  text-align: center;
  color: #fff;
  font-size: 30px; /*px*/
}
.foot p {
  margin-right: 30px;
  font-size: 28px;
}
.foot p span {
  color: red;
}
</style>
