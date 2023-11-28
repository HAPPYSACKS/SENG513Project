<template>
    <FullWidget v-for="wid in widgets" :key="wid.id" :widData="wid" @delete="(id)=>deleteWidget(id)"/>
    <div class="item leaveRoom">
        <!-- @ alias for src -->
        <img src="@/assets/icons/leaveRoom.png" alt="Leave Room">
    </div>
    <!-- <ChangeBackground/> -->
    <WidgetBar @create="(data) => createWidget(data)"/>
</template>


<script>
import WidgetBar from './WidgetBarProcessing.vue'
import FullWidget from './Widget.vue'
/*
export default {
    components: { WidgetBar, WidgetPopup, FullWidget},

    data(){
        return {
            /*widgetType: '',
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
}*/
</script>

<script setup>
import { ref, toRaw, isProxy } from 'vue'
let counter = 2;
let widgets = ref([
{
    id: 0,
    type: "Default",
    isGroup: false,
    name: 'test'
},
{
    id: 1,
    type: "TimerWidget",
    isGroup: true,
    name: 'Timer'
},
]);

function deleteWidget(id) {
    const wids = toRaw(widgets.value);
    const wids2 = wids.filter((wid) => {return wid.id != id});
    widgets.value.splice(0, wids.length, ...wids2);
}

function createWidget(data) {
    const newData = (isProxy(data) ? toRaw(data) : data);
    newData.id = counter;
    counter++;
    const wids = toRaw(widgets.value);
    const wids2 = JSON.parse(JSON.stringify(wids));
    wids2.push(newData);
    widgets.value.splice(0, wids.length, ...wids2);
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

