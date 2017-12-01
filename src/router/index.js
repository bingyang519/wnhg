import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/index'
// import goodsDetails from '@/pages/goodsDetails'
// import login from '@/pages/login'
// import me from '@/pages/me'
// import surePay from '@/pages/surePay'
// import classify from '@/pages/classify'
// import goodsList from '@/pages/goodsList'
// import order from '@/pages/order'

const Index = () => import('@/pages/index')
const goodsDetails = () => import('@/pages/goodsDetails')
const login = () => import('@/pages/login')
const me = () => import('@/pages/me')
const surePay = () => import('@/pages/surePay')
const classify = () => import('@/pages/classify')
const goodsList = () => import('@/pages/goodsList')
const order = () => import('@/pages/order')


Vue.use(Router)


export default new Router({
  mode:'history',
  routes: [{
    path: '/',
    name: 'index',
    component: Index,
    meta:{
        keepAlive:true,
        isKeepAlive:false,
    }
  }, {
    path: '/goodsDetails',
    name: 'goodsDetails',
    component: goodsDetails,
    meta:{
        keepAlive:true,
        isKeepAlive:false,
    }
  },{
    path:'/login',
    name:'login',
    component:login
  },{
    path:'/me',
    name:'me',
    component:me,
    meta:{
        isLoginLimit:true
    }
  },{
      path:'/surePay',
      name:'surePay',
      component:surePay,
      meta:{
          isLoginLimit:true
      }
  },{
      path:'/classify',
      name:'classify',
      component:classify,
      meta:{
          keepAlive:true,
          isKeepAlive:false,
      }
  },{
      path:'/goodsList',
      name:'goodsList',
      component:goodsList,
      meta:{
          keepAlive:true,
          isKeepAlive:false,
      }
  },{
      path:'/order',
      name:'order',
      component:order,
      meta:{
          keepAlive:false,
          isLoginLimit:true
      }
  }],
  scrollBehavior (to, from, savedPosition) {
      if(savedPosition){
          return savedPosition;
      }else{
          return {x:0,y:0}
      }
  }
})
