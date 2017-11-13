<template>
    <transition name="layer1">
        <span class="layer" v-if="layerShow">
            {{text}}
        </span>
    </transition>
</template>
<script>
export default {
    name:'layer',
    data(){
        return{

        }
    },
    props:{
        text:{
            default:'',
            type:String
        },
        layerShow:{
            default:true,
            type:Boolean
        }
    },
    watch:{
        layerShow(){
            if(this.layerShow){
                setTimeout(()=> {
                    this.$emit('layerHide')
                }, 1000);
            }
        }
    }
  
}
</script>
<style scoped>
    .layer1-enter-active,
    .layer1-leave-active{
        transition: all .5s ease;        
    }
    .layer1-enter,
    .layer1-leave-to{
        opacity: 0;
    }
    .layer{
        position: fixed;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
        left: 50%;
        background: #000;
        border-radius: 20px;
        color: #fff;
        z-index:100;
        display: inline-block;
        padding: 20px 40px;
    }
    

</style>
