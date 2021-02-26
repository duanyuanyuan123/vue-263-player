<template>
   <div>    
       <audio  ref="lianmai" autoplay></audio >
   </div>
</template>
<script>
import { CcHttpClient, CcWebSocket }  from "../sdk/ccsdk";
import { uuid } from "../sdk/global"
import { getAccessToken, joinRoom} from "../sdk/meetSdk";
import { webrtc } from "../sdk/OwtSdk"; //引入owt
export default { 
    name: 'lianmai',
    data () {
        return {
            liammaiBgUrl:null,//连麦的背景图
            CcHttpClient:new CcHttpClient(),
            CcWebsocketClient:new CcWebSocket(),
            owt: new webrtc(),
            lianMaiOptions:{
                roomId:null,//连麦房间号
                userName:null, //连麦用户
                user:uuid(32),//连麦用户的uid
            }, 
            lianMaiStatus:{
                applyStatus:0, //申请状态: 0->去申请  1->申请中   2->取消申请
            }, 
            micStatus:0, //连麦状态： 0->未连麦  1->正在连麦中  2->已连麦  3->被下麦 4->主动下麦成功 5->连麦失败
            audioStatus:'mute', //声音状态： mute/unmute
            userInfo:{
                uid:null,
                cid:null,
                sid:null,
            },
            curParticipantId:null,
            ccUrl: "https://cclocation.263cv.net:18080/",
            appServerUrl: "https://appserver.263cv.net:7777/",
            ccBrokerUrl: "wss://ccbroker.263cv.net:18043/",
            user:uuid(32),
            events:{
                 /**
                 * 连麦状态发生变化时触发。
                 */
                'micStatus':'micStatusChange',  
                /**
                 * 声音状态发生变化时触发。
                 */
                'audioStatus':'audioStatusChange',
            },
        }
    },
    created(){
        this.init();
    },
    watch:{
        micStatus(){
            this.lianmaiStatusChange('micStatus',{micStatus:this.micStatus});
        },
       audioStatus(){
            this.lianmaiStatusChange('audioStatus',{audioStatus:this.audioStatus});
       }
    },
    methods: { 
        init(){
            // 
             console.log(this.CcHttpClient);
             console.log(this.CcWebsocketClient);
        },
        // 连接麦克风
        async connectMic(lianMaiOptions){
            // 取消发布
            // 正在连麦中
            this.micStatus = 1;
            if(this.owt && this.owt.conference){
               this.disconnectMic();
            };
            this.lianMaiOptions.userName = lianMaiOptions.userName;
            this.lianMaiOptions.roomId = lianMaiOptions.roomId ? lianMaiOptions.roomId : '2834016832';
            this.lianMaiOptions.user = window.btoa(lianMaiOptions.userName).length > 12 ? window.btoa(lianMaiOptions.userName).slice(0,12) : window.btoa(lianMaiOptions.userName);
            // 注册cc游客用来连麦
            let regCCRes = await this.CcHttpClient.registerCC(
                { name: this.lianMaiOptions.userName, passwd: "111111" ,user:this.lianMaiOptions.user },
                this.ccUrl
            ).catch(err => {
                return err;
            });
            // 连麦用户登录cc
            let loginCCRes = null;
            if ((regCCRes.data && regCCRes.data.status == 405) || regCCRes.status === 200) {
                loginCCRes = await this.CcHttpClient.ulogin({
                    name: this.lianMaiOptions.user,
                    passwd:"111111",
                    devt: "Web_control" , //改成9z
                });
            };
            if (loginCCRes.status == 200) {
                this.userInfo = {
                    uid: loginCCRes.data.uid,
                    cid: loginCCRes.data.cid,
                    sid: loginCCRes.data.sid
                };
                //请求Appserver auth 鉴权
               const authRes = await getAccessToken(this.userInfo, this.appServerUrl);
               if (authRes.status == 200) {
                     //  joinRoom 获取RoomToken
                    const getTokenRes = await joinRoom(this.lianMaiOptions.roomId, {
                        sid: this.userInfo.sid,
                        force: true
                    }).catch((err)=>{return err});
                    console.log(getTokenRes);
                    const conferenceInfo = await this.owt.init(getTokenRes.roomToken);
                    this.owt.eventListener();
                    this.owtEvent();
                    //获取麦克风
                    this.owt.publishLocal.publishStream = await this.owt.createStream(false,true);
                    this.owt.publishLocalStream().then(publication=>{
                        if(publication){
                            console.log(publication);
                          const mixStream =  conferenceInfo.remoteStreams
                            .find(stream => {
                                return stream.source.video == "mixed" && stream.id == `${stream.id.split("-")[0]}-common`;
                            })
                          console.log(mixStream);
                          this.owt.SubscribeMixStream(mixStream,{audio:true,video:false}).then(subscription=>{
                              this.$refs.lianmai.srcObject = subscription.mixedStream;
                              this.micStatus = 2;
                          }).catch(err=>{
                              this.micStatus = 5;
                          })
                        }
                    }).catch(err=>{
                        this.micStatus = 5;
                        console.log(err);
                    })
                }
            }
        },
        // 下麦
        async disconnectMic(){
           if(this.owt.publishLocal.publication && this.owt.publishLocal.publication.stop){this.owt.publishLocal.publication.stop();this.owt.publishLocal.publication = null};
           if(this.owt.subscribeMixed.subscription  && this.owt.subscribeMixed.subscription.stop){this.owt.subscribeMixed.subscription.stop();this.owt.subscribeMixed.subscription  = null;};
           if(this.owt.conference && this.owt.conference.leave){this.owt.conference.leave();this.owt.conference = null}
           //主动下麦成功
           this.micStatus = 4;
        },
        // 连麦状态改变
        lianmaiStatusChange(eventName,eventData){
           //连麦成功
           this.$emit('lianmaiStatusChange',{eventName:this.events[eventName],eventData});
        },
        // portal 消息通知
        owtEvent(){
           this.owt.participantleave = msg => {
              console.log(msg)
           };
           this.owt.audiostatuschange = msg => {
              console.log(msg)
           };
           this.owt.streamadded = msg =>{
               console.log(msg)
           };
           /**
            * 被主持人请出会议：被下麦
            * 
            */
           this.owt.exitRoomEvent = msg => {
             this.micStatus = 3;
           };
            this.owt.iceStatusChange = msg => {
              console.log(msg)
           };
           this.owt.publicLocalended = async(msg)=>{
             console.log(msg)
           };
           this.owt.subscribeMixended = async(msg)=>{
             console.log(msg)
           };
        } 
    }
}
</script>