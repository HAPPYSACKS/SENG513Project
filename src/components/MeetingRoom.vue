<template>
    <FullWidget v-for="wid in widgets" :key="wid.id" :widData="wid" @delete="(id)=>deleteWidget(id)"/>
    <div class="item leaveRoom">
      <img src="@/assets/icons/leaveRoom.png" alt="Leave Room">
    </div>
    <!-- <ChangeBackground/> -->
    <WidgetBar @create="(data) => createWidget(data)"/>
</template>


<script>
import WidgetBar from './WidgetBarProcessing.vue'
import FullWidget from './Widget.vue'
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

