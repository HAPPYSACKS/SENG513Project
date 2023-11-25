<template>
    <WidgetPopup v-show="showPopup" @getType="getTypeForWidget" :onTogglePopup="togglePopupPLS" :imgID="imgID" :top="top" :left="left" ref="innerPopup"/>
    <MusicWidget v-show="showMusicWidget" />
    <TimerWidget v-show="showTimerWidget" :widgetType="widgetType" />
    <div class="item leaveRoom">
        <!-- @ alias for src -->
        <img src="@/assets/icons/leaveRoom.png" alt="Leave Room">
    </div>

    <WidgetBar @show="togglePopupPLS"/>
</template>

<script>
import WidgetBar from './WidgetBar.vue'
import WidgetPopup from './WidgetPopup.vue'
import TimerWidget from './TimerWidget.vue'
import MusicWidget from './MusicWidget.vue'

export default {
    components: {WidgetBar, WidgetPopup, TimerWidget, MusicWidget},

    data(){
        return {
            widgetType: '',
            showTimerWidget: false,
            showMusicWidget: false,
            showPopup: false,
            imgID:'',
            top: 0,
            left: 0,
        }
    },
    methods:{
        togglePopupPLS(imgID){
            if(imgID === "sound"){
                this.showMusicWidget = !this.showMusicWidget
            }
            else{
                this.showPopup = !this.showPopup
                if(this.showPopup){
                    this.imgID = imgID

                    // Wait for the next DOM update before calling calc so offset is correct
                    this.$nextTick(() => {
                        this.calc()

                    });
                }
            }
        },

        
        getTypeForWidget(type){
            switch(this.imgID){
                case 'timer':
                    this.showTimerWidget = true
                    this.widgetType = type
                    break
            }
        },

        calc(){
            const popup = document.getElementById('popup');
            const icon = document.getElementById(this.imgID).getBoundingClientRect();
            this.top = icon.top - popup.offsetHeight - 10
            this.left = icon.left + icon.width/2 - popup.offsetWidth / 2
        }
    }
}
</script>

<style scoped>
    .leaveRoom{
        top: 20px;
        right:20px;
        position: absolute;
    }

    .item{
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .item img{
        width: 100%;
        height: 100%; 
        object-fit: contain;
    }
    .item:hover{
        background-color: grey;
        border-radius: 5px;
    }
</style>

