<template>
    <div  class="control_change_rate">
        <ul  v-if="showRateList" @click="changeRate"  @mouseenter="mouseenterRateList" @mouseleave="mouseleaveRateList">
            <li v-for="(rate,index) in rateList" :key="index" :class="{ 'change_rate_active' :rate.dataRate == currentRate}" :data-rate="rate.dataRate">
                {{rate.dataRateName}}
            </li>
        </ul>
        <li class="current_rate"  @click="clickCurrentRate" @mouseleave="mouseleaveCurrentRate" >
            <span v-if="currentRate == '1.0'">倍速</span>
            <span v-else>{{currentRate}}x</span>
        </li>
    </div>
</template>
<script>
    export default {
        name: 'rate',
        data () {
           return {
              currentRate:'1.0',
              showRateList:false,
              timeId:null,
              rateList:[
                  {dataRate:'0.75',dataRateName:'0.75x'},
                  {dataRate:'1.0',dataRateName:'1.0x'},
                  {dataRate:'1.25',dataRateName:'1.25x'},
                  {dataRate:'1.5',dataRateName:'1.5x'},
                  {dataRate:'2.0',dataRateName:'2.0x'}
              ]
           }
        },
        methods: {
            // 切换分辨率
            changeRate({target}){
              const rate = target.dataset.rate;
              console.log(rate);
              if(rate && rate != this.currentRate){
                //  设置倍速
                 this.$parent.setSpeed(rate);
                 this.currentRate = rate;
              }
            },
            clickCurrentRate(){
                this.showRateList = true;
                console.log(this.showRateList);
            },
            mouseleaveCurrentRate(){
                this.timeId = setTimeout(() => {
                    this.showRateList = false;
                }, 100);
            },
            mouseenterRateList(){
                clearTimeout(this.timeId)
            },
            mouseleaveRateList(){
                this.showRateList = false;
            }
        }
    }
</script>
<style>
  li{list-style: none;}
  .control_change_rate{position: absolute;bottom: 10px;right: 60px;text-align: center;z-index: 111111;}
  .current_rate{color: #fff;cursor: pointer;}
  .current_rate:hover, .control_change_rate>ul li:hover, .change_rate_active{color: #2081EB;}
  .control_change_rate>ul{    background: rgba(0,0,0,0.8);color: #fff;border-radius: 8px;text-align: center;width: 120px;position: absolute;bottom: 33px;right: -45px}
  .control_change_rate>ul li{line-height: 35px;cursor: pointer;}
</style>
