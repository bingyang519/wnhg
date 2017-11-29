<template>
  <div class="testScroll">
        <transition-group tag="ul" name="slide">
          <li 
            v-for="(item,index) in dataList"
            :key='index'
            v-show="index==count"
          >
              {{item.title}}
          </li>
        </transition-group>
  </div>
</template>
<script>
export default {
  data(){
      return {
          count:0,
          intervalId:null,
      }
  },
  props:{
      dataList:{
          default:[],
          type:Array,
      }
  },
  methods:{
      getText(){
          let len=this.dataList.length;
          if(len==0){
              return
          }
          if(this.count==len-1){
              this.count=0
          }else{
              this.count++
          }
      }
  },
  created(){
      this.intervalId=setInterval(()=>{
          this.getText();
      },2000)
  },
  destroyed(){
      clearInterval(this.intervalId)
  }
}
</script>

<style scoped>
.testScroll{
    background: #fff;
    margin: 20px 0;
    height: 70px;
}
ul{
    position: relative;
    width: 100%;
    height: 70px;
    background: #fff;
    overflow: hidden;
}
li{
    font-size: 28px;/*px*/
    background: #fff;
    overflow: hidden;
    margin: 0 auto;
    padding: 0 20px;
    height: 70px;
    line-height: 70px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;    
    position: absolute;
}
.slide-enter-active,
.slide-leave-active{
    transition: all .5s ease;
}
.slide-enter{
    transform: translateY(100%);
}
.slide-leave-to{
    transform: translateY(-100%);
}
</style>
