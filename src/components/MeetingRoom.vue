<template>
<<<<<<< HEAD
    <!--<FullWidget :widData="testData" @delete="(id)=>deleteWidget(id)"/>-->
    <div v-for="wid in widgets" :key="wid.id">
        <FullWidget :widData="wid" @delete="(id)=>deleteWidget(id)"/>
    </div>
    <WidgetPopup v-show="showPopup" :onTogglePopup="togglePopupPLS" :imgID="imgID" :top="top" :left="left" ref="innerPopup"/>
=======
    <WidgetPopup v-show="showPopup" @getType="getTypeForWidget" :onTogglePopup="togglePopupPLS" :imgID="imgID" :top="top" :left="left" ref="innerPopup"/>
>>>>>>> carlos
    <div class="item leaveRoom">
        <!-- @ alias for src -->
        <img src="@/assets/icons/leaveRoom.png" alt="Leave Room">
    </div>
    <WidgetPlaceholder v-show="showTimerWidget" :widgetName="'Timer'" :widgetType="widgetType" :widgetContent="'TimerWidget'" :width="300" :height="170"/>
    <WidgetPlaceholder v-show="showMusicWidget" :widgetName="'Sound'" :widgetContent="'MusicWidget'" :width="300" :height="300"/>
    <!-- <ChangeBackground/> -->
    <WidgetBar @show="togglePopupPLS"/>
</template>


<script>
import WidgetBar from './WidgetBar.vue'
import WidgetPopup from './WidgetPopup.vue'
<<<<<<< HEAD
import FullWidget from './Widget.vue'

export default {
    components: { WidgetBar, WidgetPopup, FullWidget},
=======
import WidgetPlaceholder from './WidgetPlaceholder.vue'
// import ChangeBackground from './ChangeBackground.vue'

// PASS IN TYPE(timer,whatever), ISGROUP, NAME
// MAKE WIDGETPOPUP AND WIDGETBAR TOGETHER

export default {
    components: {WidgetBar, WidgetPopup, WidgetPlaceholder},
>>>>>>> carlos

    data(){
        return {
            widgetType: '',
            showTimerWidget: false,
            showMusicWidget: false,
            showPopup: false,
            imgID:'',
            top: 0,
            left: 0,
            testData: {
                id: 0,
                type: 0,
                isGroup: true,
                name: 'test'
            }
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

<script setup>
import { ref, toRaw } from 'vue'
let widgets = ref([
{
    id: 0,
    type: 0,
    isGroup: true,
    name: 'test'
},
{
    id: 1,
    type: 1,
    isGroup: true,
    name: 'Timer'
},
]);

function deleteWidget(id) {
    const wids = toRaw(widgets.value);
    console.log(wids);
    const wids2 = wids.filter((wid) => {return wid.id != id});
    console.log(wids2);
    widgets.value.splice(0, wids.length, ...wids2);
    console.log(widgets.value);
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

