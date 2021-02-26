<template>
    <div @click="changeAorAV" class="control_change_AorAV">
        <div class="change_A" v-if="curPlayerStatus == 'AV'"></div>
        <div class="change_AV" v-else></div>
    </div>
</template>
<script>
    export default {
        name: 'changeAorAV',
        data () {
           return {
              curPlayerStatus:'A' // A => 仅音频 AV => 音视频
           }
        },
        methods: {
            // 切换音/音视频
            changeAorAV(){
               this.curPlayerStatus = this.curPlayerStatus == 'A' ? 'AV' : 'A';

            }
        }
    }
</script>
<style>
   .control_change_AorAV{position: absolute;bottom: 3px;right: 150px;text-align: center;z-index: 111111;}
   .change_A{
        background: url(../static/images/mic.png) no-repeat !important;
        background-size: 75% !important;
        width: 24px;
        height: 24px;
        cursor: pointer;
   }
   .change_A:hover{
        background: url(../static/images/mic_hover.png) no-repeat !important;
        background-size: 75% !important;
        width: 24px;
        height: 24px;
        cursor: pointer;
   }
   .change_AV{
        background: url(../static/images/mic.png) no-repeat !important;
        background-size: 75% !important;
        width: 24px;
        height: 24px;
        cursor: pointer;
   }
  .change_AV:hover{
        background: url(../static/images/mic_hover.png) no-repeat !important;
        background-size: 75% !important;
        width: 24px;
        height: 24px;
        cursor: pointer;
   }
</style>
