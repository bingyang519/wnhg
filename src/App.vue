<template>
  <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body, h1, h2, h3, h4, h5, h6, dl, dt, dd, ul, ol, li, th, td, p, blockquote, pre, form, table, td, th, tbody, fieldset, legend, input, button, textarea, hr, header, footer, section, aside, article, nav {margin: 0;padding: 0;-webkit-tap-highlight-color: transparent}
html, body, button, input, select, textarea {font-size: 12px;outline: medium none; font-family: Microsoft Yahei,Arial,sans-serif}
[data-dpr="2"] html, [data-dpr="2"] body, [data-dpr="2"] button, [data-dpr="2"] input, [data-dpr="2"] select, [data-dpr="2"] textarea {font-size: 24px;}
[data-dpr="3"] html, [data-dpr="3"] body, [data-dpr="3"] button, [data-dpr="3"] input, [data-dpr="3"] select, [data-dpr="3"] textarea {font-size: 36px;}

header, footer, section, aside, article, nav{ display: block;}
ul,ol{list-style: none;}
body { background-color: #EEEEEE; color: #484848;}
h1, h2, h3, h4, h5, h6, th{font-size: 100%;font-weight: normal;}
a {text-decoration: none;outline: none;color: #484848;}
a:hover{text-decoration: none; -webkit-tap-highlight-color: transparent;}
table{border-collapse: collapse;border-spacing: 0;}
table,td,th,tbody{box-sizing: border-box; }
input[type=search]::-webkit-search-cancel-button{-webkit-appearance: none;}
input[type=submit],input[type=button]{-webkit-appearance: none;}
input:focus,textarea:focus{-webkit-user-modify: read-write-plaintext-only}
p,span,del,i,div,h1, h2, h3, h4, h5, h6, th{ max-height: 999999px;}   /*解决flexible下使用chrome模拟手机时字体变大问题--触发了chrome Font Boosting   http://www.cnblogs.com/axl234/p/5895347.html*/
em{ font-style: normal;}

.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
.clearfix{display:inline-block;}
* html .clearfix{height:1%;}
.clearfix{display:block;}
#app{ width: 10rem;margin: 0 auto;}
.dn{ display: none; }
</style>
