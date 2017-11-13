<template>
  <div class="slide">
      <div class="bg" v-if="isShow" @click="hide"></div>
      <transition name="slide">
        <div class="con" v-if="isShow">
            <slot></slot>
        </div>
      </transition>
  </div>
</template>
<script>
export default {
    props:{
        isShow:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        hide(){
            this.$emit('sliderHide')
        }
    }
  
}
</script>
<style scoped>
.slide-leave-active,
.slide-enter-active{
    transition: all .3s ease;
}
.slide-leave-to,
.slide-enter{
    transform: translate3d(0,100%,0)
}
.slide .bg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    z-index: 5;
}
.slide .con{
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 6;
}
</style>

