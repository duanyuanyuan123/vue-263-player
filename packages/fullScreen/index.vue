<template>
   <div class="control_full_screen">
       <div @click="handelFullScreen">
          <span class="full_screen_icon" v-if="!isFullScreen"></span>
          <span class="quit_screen_icon" v-else></span>
       </div>
   </div>
</template>
<script>
    export default {
        name: 'fullscreen',
        props: {
           isFullScreen:{
                required:true,
                type:[Boolean],
                default:false
           }
        },
        data () {
           return {
            //   isFullScreen:false,
           }
        },
        methods: {
            /****
             * 设置全屏/退出全屏
             * 
             */
            handelFullScreen(){
                // 236Player
                this.$parent.handelFullScreen();
             
            }
        }
    }
</script>
<style>
    .control_full_screen{position: absolute;bottom: 0px;right: 15px;text-align: center;z-index: 111111;}
    .control_full_screen>div span{width: 24px;height: 24px;display: inline-block;cursor: pointer;}
    .full_screen_icon{
        background: url(../static/images/full_screen.png) no-repeat !important;
        background-size: 70% !important;
    }
    .full_screen_icon:hover{
        background: url(../static/images/full_screen_hover.png) no-repeat !important;
        background-size: 70% !important;
    }
    .quit_screen_icon{
        background: url(../static/images/quit_full_screen.png) no-repeat !important;
        background-size: 70% !important;
    }
    .quit_screen_icon:hover{
        background: url(../static/images/quit_full_screen_hover.png) no-repeat !important;
        background-size: 70% !important;
    }
</style>
