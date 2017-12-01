# Vue2.0仿唯妮海购

> A Vue.js project

## 技术栈
vue + vue-cli + vue-router + axios + flexible + ES6

## vue插件
vue-awesome-swiper + vue-lazyload + vue-infinite-scroll + px2rem

## 页面完成情况
- [x] 首页
- [x] 详情页
- [x] 订单提交页（未做数据交互）
- [x] 登陆页
- [x] 个人中心页
- [x] 订单列表页
- [x] 一级分类页
- [x] 分类商品展示页

## 部分页面展示
**首页**

![首页](https://note.youdao.com/yws/public/resource/93b8f6e3a27832bda88d165802311d38/xmlnote/940F4F06F434478492B5F7D65BD5BBCA/2090)

**详情页**

![详情页](https://note.youdao.com/yws/public/resource/93b8f6e3a27832bda88d165802311d38/xmlnote/55984CEF1C104101A15273C88E44DAB9/2087)

**一级分类页**

![一级分类页](https://note.youdao.com/yws/public/resource/93b8f6e3a27832bda88d165802311d38/xmlnote/9106D6A3A7014B3BB0E5FC3162104F51/2089)

**分类商品展示页**

![分类商品展示页](https://note.youdao.com/yws/public/resource/93b8f6e3a27832bda88d165802311d38/xmlnote/818581B112634F71AB25AE7A91251F13/2093)

## 运行说明

- 如果只是查看生产环境的页面效果，npm install 下载依赖后，直接npm run dev 即可自动打开浏览器查看。
```
// config/index.js中设置了代理来解决跨域问题--请知晓
proxyTable: {
      '/api':{
        target:'http://www.weinihaigou.com',
        changeOrigin:true,
        pathRewrite:{
          '^/api':''
        }
      }
    },
```
- 如果想查看打包后的发布环境的页面效果，因项目使用了代理来解决跨域问题，所以需把```src/assets/js/api.js```中的```const pxy='/api'```，改为```const pxy = ''```即可。
- 关于如何本地查看发布环境代码的页面效果，请移步这篇文章[利用http-server测试vue-cli打包后的项目](https://segmentfault.com/a/1190000012249873)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8888
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
