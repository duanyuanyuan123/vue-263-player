<template>
   <div class="263_player_control">
       <div @click="changeResolution" class="control_change_resolution">
            <ul>
                <li></li>
            </ul>
       </div>
   </div>
</template>
<script>
    export default {
        name: 'playercontrol',
        data () {
           return {
            resolutionList:[
                {}
            ]
           }
        },
        methods: {
            // 切换分辨率
            changeResolution(){

            }
        }
    }
</script>
<style>

</style>
