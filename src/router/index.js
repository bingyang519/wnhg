import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import goodsDetails from '@/pages/goodsDetails'
import login from '@/pages/login'
import me from '@/pages/me'
import surePay from '@/pages/surePay'
import classify from '@/pages/classify'
import goodsList from '@/pages/goodsList'


Vue.use(Router)


export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: Index,
    meta:{
        keepAlive:true,
    }
  }, {
    path: '/goodsDetails',
    name: 'goodsDetails',
    component: goodsDetails,
    meta:{
        keepAlive:true,
    }
  },{
    path:'/login',
    name:'login',
    component:login
  },{
    path:'/me',
    name:'me',
    component:me
  },{
      path:'/surePay',
      name:'surePay',
      component:surePay
  },{
      path:'/classify',
      name:'classify',
      component:classify
  },{
      path:'/goodsList',
      name:'goodsList',
      component:goodsList
  }]
})
