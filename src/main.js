// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import axios from 'axios'
import API from './assets/js/api.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

Vue.prototype.$http = axios;
Vue.prototype.API = API;



Vue.use(infiniteScroll)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './img/error.jpg',
  loading: require('./assets/images/loading.gif'),
  attempt: 1,
});

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if(to.meta.isLoginLimit){  // 需要登录
        axios.post(API.checkUser)
        .then((res)=>{
            if(res.data.success){
                next()
            }else{
                next({name:'login'})
            }
        })
    }else{
        next()
    }
    
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
