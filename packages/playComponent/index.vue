<template>
    <div @click="changePlayStatus" class="control_change_playstatus">
         <div class="change_paly" v-if="curPlayStatus == 'pause'"></div>
        <div class="change_pause" v-else></div>
    </div>
</template>
<script>
    export default {
        name: 'playComponent',
        data () {
           return {
             curPlayStatus:'play' //play or pause
           }
        },
        methods: {
            // 切换播放状态
            changePlayStatus(){
               this.curPlayStatus = this.curPlayStatus == 'play' ? 'pause' : 'play';
               if(this.curPlayStatus == 'play'){
                   this.$parent.play();
               }else{
                   this.$parent.pause();
               }
            }   
        }
    }
</script>
<style>
   .control_change_playstatus{position: absolute;bottom: 0px;left: 15px;text-align: center;z-index: 111111;cursor: pointer;}
   .change_paly{background: url(../static/images/play.png) no-repeat !important;background-size: 62% !important;width: 30px;height: 30px;}
   .change_paly:hover{ background: url(../static/images/play_hover.png) no-repeat !important;background-size: 62% !important;width: 30px;height: 30px;}
   .change_pause{background: url(../static/images/pause.png) no-repeat !important;background-size: 62% !important;width: 30px;height: 30px;}
   .change_pause:hover{ background: url(../static/images/pause_hover.png) no-repeat !important;background-size:62% !important;width: 30px;height: 30px;}
</style>
