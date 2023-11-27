<template>
    <!--<FullWidget :widData="testData" @delete="(id)=>deleteWidget(id)"/>-->
    <div v-for="wid in widgets" :key="wid.id">
        <FullWidget :widData="wid" @delete="(id)=>deleteWidget(id)"/>
    </div>
    <WidgetPopup v-show="showPopup" :onTogglePopup="togglePopupPLS" :imgID="imgID" :top="top" :left="left" ref="innerPopup"/>
    <div class="item leaveRoom">
        <!-- @ alias for src -->
        <img src="@/assets/icons/leaveRoom.png" alt="Leave Room">
    </div>

    <WidgetBar @show="togglePopupPLS"/>
</template>


<script>
import WidgetBar from './WidgetBar.vue'
import WidgetPopup from './WidgetPopup.vue'
import FullWidget from './Widget.vue'

export default {
    components: { WidgetBar, WidgetPopup, FullWidget},

    data(){
        return {
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
            this.showPopup = !this.showPopup
            if(this.showPopup){
                this.imgID = imgID

                // Wait for the next DOM update before calling calc so offset is correct
                this.$nextTick(() => {
                    this.calc();
                });
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

