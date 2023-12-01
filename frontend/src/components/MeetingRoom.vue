<template>
    <FullWidget v-for="wid in widgets" :key="wid.id" :widData="wid"
    @delete="(id)=>deleteWidget(id)"
    @update="(id, data)=>updateWidget(id, data)"/>
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
import { ref, toRaw, isProxy } from 'vue'; //TODO: Import onMounted
//import { Peer } from 'peerjs';
let counter = 1;
const widgets = ref([]); //widget tracking list
/*
const networkData = { //room tracker for data persistent from an individual widget
    members: [],
    messages: [],

    thisPeer: '',
    thisConnection: '',
    isHost: true, //TODO: change to data passed by prev route //Wether or not this client is host
    dataConnections: [],
}
const keyPrepend = "CA-UCALGARY-SENG513-F23-G12"; //prepend used for every peer key (to avoid any key clashes)
/**/
//Widget event handlers
function deleteWidget(id) {
    const wids = isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value;
    const wids2 = wids.filter((wid) => {return wid.id != id});
    widgets.value.splice(0, wids.length, ...wids2);
}

function createWidget(data) {
    const wids = isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value;
    const newData = JSON.parse(JSON.stringify(data));
    newData.id = counter;
    counter++;
    newData.data = JSON.parse(JSON.stringify(newData.default));
    delete newData.default
    const wids2 = JSON.parse(JSON.stringify(wids));
    wids2.push(newData);
    widgets.value.splice(0, wids.length, ...wids2); 
}

function updateWidget(id, data) {
    const wids = isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value;
    const index = wids.findIndex((wid) => {return wid.id == id})
    const newWid = JSON.parse(JSON.stringify(wids[index]))
    Object.assign(newWid, {data: data});
    widgets.value[index] = newWid;
    console.log(toRaw(widgets.value))
}

/*
//networking handlers
function handleNetwork(dataConnection) {
    networkData.dataConnections.push(dataConnection);
    dataConnection.on('open', ()=>{
        //handle connection opened
    });    
    dataConnection.on("data", (data)=>{
        //handle data received
    });
    dataConnection.on('close', ()=>{
       //handle data closed
    });
    dataConnection.on('error', (e)=>{
        //handle data error
    });
}

function sendUpdate(data, code) {
    const payload = {
        curCounter: counter,
        dataToUpdate: data,
        code: code
    }
    thisConnection.send(payload);
}

function receiveUpdate(data) {
    switch(data.code) {
        case 'C':

            break;
        case 'U':

            break;
        case 'D':

            break;
    }
}

function deleteDirector(id) {
    const data = {id: id}
    if(networkData.isHost) {
        for(const conn of networkData.dataConnections) {
            sendUpdate(data, 'D');
        }
        deleteWidget(id);
    } else {
        networkData.thisConnection.sendUpdate(data, 'D');
    }
}

function createDirector(data) {
    const newData = JSON.parse(JSON.stringify(data));
    if(networkData.isHost) {
        newData.id = counter;
        counter++;
        for(const conn of networkData.dataConnections) {
            sendUpdate(newData, 'C');
        }
        createWidget(id);
    } else {
        networkData.thisConnection.sendUpdate(newData, 'C');
    }
}

function updateDirector(data) {
    
}
//network creation

onMounted(()=>{
    const key =
        networkData.isHost?
        `${keyPrepend}-HOST` : //TODO: Replace with random unused host key
        `${keyPrepend}-JOIN` ; //TODO: Replace with username or session token or something
    networkData.thisPeer = new Peer(key);
    
    if(networkData.isHost) {
        peer.on('connection', (dataConnection)=>{
            handleNetwork(dataConnection);
        }) 
    } else {
        const conn = peer.connect(`${keyPrepend}-HOST`) //TODO: Replace with key passed from landing
        handleNetwork(conn);
    }

    window.addEventListener("beforeunload", ()=>{
        peer.destroy;
    })
})
/* */
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

