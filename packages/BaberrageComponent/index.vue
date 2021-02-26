<template>
    <div @click="changeBaberrage" class="control_change_baberrage">
        <div class="baberrage_open" v-if="baberrageShow"></div>
        <div class="baberrage_close" v-else></div>
    </div>
</template>
<script>
    export default {
        name: 'BaberrageComponent',
        data () {
           return {
             baberrageShow:false,
           }
        },
        methods: {
            // 开关弹幕按钮
            changeBaberrage(){
               this.baberrageShow = !this.baberrageShow;
               /***弹幕开关状态改变触发***/
               this.$emit('baberrageStatusChange',!this.baberrageShow)
            }
        }
    }
</script>
<style>
   .control_change_baberrage{position: absolute;bottom: 3px;right: 60px;text-align: center;z-index: 111111;}
  .baberrage_open{
        background: url(../static/images/baberrage_open.png) no-repeat !important;
        background-size: 75% !important;
        width: 24px;
        height: 24px;
        cursor: pointer;
  }
  .baberrage_close{
        background: url(../static/images/baberrage_close.png) no-repeat !important;
        background-size: 75% !important;
        width: 24px;
        height: 24px;
        cursor: pointer;
  }
</style>
