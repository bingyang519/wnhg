<template>
  <div>
    <swiper :list="bannerList" v-if="bannerList.length>0"></swiper>
    <div class="subject" v-if="subject.length>0">
        <h6>热门推荐</h6>
        <ul>
            <li v-for="item in subject">
                <img v-lazy="item.url" :alt="item.title">
            </li>
        </ul>
    </div>
    <div class="goods" v-if="goodsType.length>0">
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
    <loading :isShow='loadingIsShow'></loading>
  </div>
</template>
<script>
import swiper from "../components/swiper";
import foot from "../components/foot";
import loading from "../components/loading";
export default {
  data() {
    return {
      isFirstEnter: true,
      loadingIsShow: false,
      bannerList: [],
      subject: [],
      goodsType: []
    };
  },
  components: {
    swiper,
    foot,
    loading
  },
  methods: {
    indexMo() {
      this.loadingIsShow = true;
      this.$http
        .post(this.API.indexMo)
        .then(res => {
          console.log(res.data, 11);
          this.loadingIsShow = false;
          this.bannerList = res.data.bannerList;
          this.subject = res.data.subject;
          this.goodsType = res.data.goodsType;
        })
        .catch(err => {
          console.log(err, 22);
        });
    }
  },
  created() {
    this.isFirstEnter = true;
  },
  activated() {
    if (!this.$route.meta.isKeepAlive || this.isFirstEnter) {
      console.log("我是index的activated方法");
      this.indexMo();
    }
    this.$route.meta.isKeepAlive = false;
    this.isFirstEnter = false;
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    if (from.name == "goodsDetails") {
      to.meta.isKeepAlive = true;
    }
    next();
  }
};
</script>
<style scoped>
.subject {
  margin-top: 20px;
  background: #fff;
}
.subject h6 {
  font-size: 28px; /*px*/
  text-align: center;
  padding: 10px 0;
  border-bottom: 2px solid #ebebeb;
}
.subject ul {
  display: flex;
  flex-wrap: wrap;
}
.subject ul li {
  width: 50%;
  box-sizing: border-box;
  border-bottom: 2px solid #ebebeb;
}
.subject ul li:nth-child(2n + 1) {
  border-right: 2px solid #ebebeb;
}
.subject ul li img {
  display: block;
  width: 100%;
}
.goods {
  background: #fff;
  margin-top: 20px;
}
.goods h6 {
  font-size: 28px; /*px*/
  text-align: center;
  padding: 10px 0;
  border-bottom: 2px solid #ebebeb;
}
.goods ul {
  display: flex;
  flex-wrap: wrap;
}
.goods ul li {
  width: 50%;
  box-sizing: border-box;
  border-bottom: 2px solid #ebebeb;
}
.goods ul li:nth-child(2n + 1) {
  border-right: 2px solid #ebebeb;
}
.goods ul li img {
  display: block;
  width: 300px;
  height: 300px;
  margin: 20px auto;
}
.goods ul li p {
  font-size: 26px; /*px*/
  color: #4d4d4d;
  padding: 0 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goods ul li span {
  padding-left: 20px;
  font-size: 24px; /*px*/
  color: #d62828;
}
.goods ul li del {
  font-size: 24px; /*px*/
  color: #eee;
  margin-left: 10px;
}
</style>

