<template>
    <div  class="control_change_resolution"  :class="{'setRight':!isLive}">
        <ul class="player_control_list"
            @click="changeResolution"
            @mouseenter="mouseenterResolutionList"
            @mouseleave="mouseleaveResolutionList"
            v-if="showResolutionList"
            
            >
           
            <li v-for="(resolution,index) in resolutionList" 
                :key="index" 
                :data-quality="resolution.quality"
                    :class="{ 'change_resolution_active' :resolution.quality == curQuality.quality}" 
                >
                {{resolution.qualityName}}
            </li>
        </ul>
        <div @click="clickCurrentResolution" 
                @mouseleave="mouseleaveCurrentResolution" class="current_resolution">{{curQuality.qualityName}}</div>
    </div>
</template>
<script>
    export default {
        name: 'qualityComponent',
        watch:{
            source:{   //配置项是对象,只能深度监听
                handler(){
                    this.initResList();
                },
                deep: true
            },
        },
        props:['isLive'],
        data () {
           return {
            resolutionList:[],
            curQuality:{
                qualityName:null,
                src:null,
                quality:null
            },
            showResolutionList:false,
            timeId:null,
            source:null,
           }
        },
        methods: {
            /***
             * 初始化分辨率列表
             * 
             */
            initResList(){
                console.log(this.source);
                for(let quality in JSON.parse(this.source)){
                    /**标清**/
                    let qualityName = null
                    if(quality == 'LD'){
                      qualityName = '标清';
                    }else if(quality == 'SD'){
                       /**高清**/
                        qualityName = '高清';
                    }else if(quality == 'HD'){
                         /**超高清**/
                         alityName = '超高清';
                    }
                    this.resolutionList.push({quality,qualityName,src:JSON.parse(this.source)[quality]})
                };
                this.curQuality = this.resolutionList[0]
                console.log(this.resolutionList);
            },
            // 切换分辨率
            changeResolution({target}){
              const quality = target.dataset.quality;
              let qualityInfo = this.resolutionList.find((info)=>{return info.quality == quality});
              if(!quality || qualityInfo.quality == this.curQuality.quality)return;
              let getCurrentTime = this.$parent.getCurrentTime();
              this.$parent.loadByUrl(qualityInfo.src,getCurrentTime);
              this.curQuality = qualityInfo;
            },
            clickCurrentResolution(){
                this.showResolutionList = true;
            },
            mouseleaveCurrentResolution(){
                this.timeId = setTimeout(() => {
                    this.showResolutionList = false;
                }, 100);
            },
            mouseenterResolutionList(){
                clearTimeout(this.timeId)
            },
            mouseleaveResolutionList(){
                this.showResolutionList = false;
            }
        }
    }
</script>
<style>
   .control_change_resolution{position: absolute;bottom: 10px;right: 190px;text-align: center;z-index: 111111;}
   .setRight{right: 150px;}
   .player_control_list{background: rgba(0,0,0,0.8);color: #fff;border-radius: 8px;text-align: center;width: 120px;position: absolute;bottom: 33px;right: -45px}
   .player_control_list li{line-height: 35px;cursor: pointer;}
   .current_resolution{color: #fff;cursor: pointer;}
   .current_resolution:hover,.change_resolution_active,.player_control_list li:hover{color: #2081EB;}
</style>
