<template>
    <div id="app">
        <template v-if="!isShowMultiple && show">
            <Vue263player :source="source" 
            ref="VueAliplayerV2" 
            :options="options"
            @micStatusChange="micStatusChange"
            @baberrageStatusChange="baberrageStatusChange"
            @error="playerError"
            style="position: relative;"
            />
        </template>
        <p class="remove-text" v-if="!show">播放器已销毁!</p>
        <div class="player-btns">
            <template v-if="!isShowMultiple && show">
                <span @click="play()">播放</span>
                <span @click="pause()">暂停</span>
                <span @click="replay()">重播</span>
                <span  @click="lianmai()">连麦</span>
                <span  @click="addBarrage()">添加弹幕</span>
                <span @click="disconnectMic()">下麦</span>
                <span @click="getCurrentTime()">播放时刻</span>
                <span @click="getStatus()">获取播放器状态</span>
            </template>
            <span @click="show = !show">{{ show ? '销毁' : '重载' }}</span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            options: {
                isLive: !false,   //切换为直播流的时候必填
                autoplay: true,
                rePlay: false,
                playsinline: true,
                preload: true,
                controlBarVisibility: "hover",
                useH5Prism: true,
                mediaType:'video',
                // useFlashPrism: false,    //指定为flash
                // disableSeek: true //禁用进度条的Seek，默认值为false
            },
            source: JSON.stringify({'LD':'http://119.61.7.138:10002/live/test0_customud.m3u8','SD':'http://119.61.7.138:10002/live/test0_customud.m3u8'}),
            // source: '//ivi.bupt.edu.cn/hls/cctv1.m3u8',
            //http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8
            show: true,
            isShowMultiple: false,
        }
    },
    
    methods:{

        play(){
            this.$refs.VueAliplayerV2.play()
        },

        pause(){
            this.$refs.VueAliplayerV2.pause();
        },
        lianmai(){
            this.$refs.VueAliplayerV2.connectMic({roomId:'2834016832',userName:'dyy3'});
        },
        replay(){
            this.$refs.VueAliplayerV2.replay();
        },

        getCurrentTime(){
            this.$refs.VueAliplayerV2.getCurrentTime();
        },

        getStatus(){
           const status =  this.$refs.VueAliplayerV2.getStatus();
           console.log(`getStatus:`, status);
        },
        // 连麦状态发生改变触发
        //连麦状态： 0->未连麦  1->正在连麦中  2->已连麦  3->被下麦 4->主动下麦成功 5->连麦失败
        micStatusChange(micStatus){
            console.log(micStatus)
        },
        // 主动下麦
        disconnectMic(){
            this.$refs.VueAliplayerV2.disconnectMic();
        },
        /***
         * 直播模式添加弹幕
         */
        addBarrage(){
             this.$refs.VueAliplayerV2.addBarrage();
        },
        /***
         * 
         * 弹幕开关状态发生改变
         */
        baberrageStatusChange(value){
            console.log(value);
        },
        /***
         * 播放错误
         */
        playerError(err){
            console.log(err)
        }
    }
}
</script>
<style lang="less">
* {
    margin: 0;
    padding: 0;
}
.remove-text{
    text-align: center;
    padding: 20px;
    font-size: 24px;
}
.show-multiple{
    display: flex;
    .multiple-player{
        width: calc(100% / 4);
        margin: 20px;
    }
}
.player-btns{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    span {
        margin: 0 auto;
        display: inline-block;
        padding: 5px 10px;
        width: 150px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #eee;
        background: #e1e1e1;
        border-radius: 10px;
        text-align: center;
        margin: 5px;
        cursor: pointer;
    }
}
.source-box{
    padding: 5px 10px;
    margin-bottom: 10px;
    .source-label{
        margin-right: 20px;
        font-size: 16px;
        display: block;
    }
    #source{
        margin-top: 10px;
    }
    .source-input{
        margin-top: 10px;
        padding: 5px 10px;
        width: 80%;
        border: 1px solid #ccc;
    }
}
</style>
