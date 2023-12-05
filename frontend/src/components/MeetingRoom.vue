<template>
  <LoadingScreen Msg="Connecting" v-if="!ready" />
  <div v-else>
    <div class="roomid">
      <NotificationCard
        v-for="a in alerts"
        :key="a.id"
        @destroy="endAlert"
        :Msg="a.msg"
        :Timeout="a.timeout"
        :Self="a.id"
      />
    </div>
    <FullWidget
      v-for="wid in widgets"
      :key="wid.id"
      :widData="wid"
      @delete="(id) => deleteDirector(id)"
      @update="(id, data) => updateDirector(id, data)"
    />
    <div class="item leaveRoom">
      <i class="fa-solid fa-door-open fa-xl" @click="Leave()"></i>
    </div>
    <!-- <ChangeBackground/> -->
    <WidgetBar
      @create="(data) => createDirector(data)"
      :isHost="networkData.isHost"
      :roomid="roomID"
    />
  </div>
</template>

<script>
import WidgetBar from "./WidgetBarProcessing.vue";
import FullWidget from "./Widget.vue";
import LoadingScreen from "./loading.vue";
import NotificationCard from "./widgets/Notification.vue";
import axios from "axios";
</script>

<script setup>
import { ref, toRaw, isProxy, onMounted } from "vue"; //TODO: Import onMounted
import { Peer } from "peerjs";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
const route = useRoute();
const router = useRouter();

let counter = 1;
const widgets = ref([]); //widget tracking list
//let user = route.query.username; //reference to user name
let roomID = ref(""); //reference to current room number
const ready = ref(false); //
const alerts = ref([]);
let alertCounter = 1;

const networkData = {
  //room tracker for data persistent from an individual widget
  members: [], //list of members
  messages: [], //list of messages - object with user and msg keys

  thisPeer: "", //contains this client's peer
  thisConnection: "", //for client - stores connection to host
  isHost: route.query.isHost === "true", //TODO: change to data passed by prev route //Wether or not this client is host
  sharedCounter: 1, //for host - counts unique ids for
  dataConnections: [], //for host - stores all connections
  dataStatuses: {}, //for host - stores data used in establishing/de-establishing connections cleanly
};

/**/
//Widget event handlers
function deleteWidget(id) {
  const wids = isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value;
  const wids2 = wids.filter((wid) => {
    return wid.id != id;
  });
  widgets.value.splice(0, wids.length, ...wids2);
}

function createWidget(data) {
  const wids = isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value;
  const newData = structuredClone(data);
  newData.id = counter;
  counter++;
  newData.data = structuredClone(newData.default);
  delete newData.default;
  const wids2 = structuredClone(wids);
  wids2.push(newData);
  widgets.value.splice(0, wids.length, ...wids2);
}

function updateWidget(id, data) {
  const wids = isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value;
  const index = wids.findIndex((wid) => {
    return wid.id == id;
  });
  const newWid = structuredClone(wids[index]);
  Object.assign(newWid, { data: data });
  widgets.value[index] = newWid;
}

//networking handlers
function handleNetwork(dataConnection) {
  if (networkData.isHost) {
    networkData.dataConnections.push(dataConnection);
    dataConnection.on("data", (data) => {
      receiveUpdateHost(data);
    });
  } else {
    networkData.thisConnection = dataConnection;
    dataConnection.on("data", (data) => {
      receiveUpdateClient(data);
    });
  }
  /*
    if(networkData.isHost) {
        networkData.dataConnections.push(dataConnection);
        networkData.dataStatuses[dataConnection] = {joinHandshake: 0, leaveHandshake: 0, username: 'User'}
        dataConnection.on("data", (data)=>{
            if(Object.keys(data).includes('NETWORKCODE')) {
                respondHostNetworkProtocol(data.NETWORKCODE, data.data, dataConnection);
            } else {
                receiveUpdateHost(data);
            }
            receiveUpdateHost(data);
        });
        dataConnection.on('close', ()=>{
            networkData.dataConnections = networkData.dataConnections.filter((con) => {return con === dataConnection})
        })
    }
    else {
        networkData.thisConnection = dataConnection;
        dataConnection.on('open', ()=>{
            
            dataConnection.send( {
                NETWORKCODE: 'C',
                user: user
            });
        });    
        dataConnection.on("data", (data)=>{
            if(Object.keys(data).includes('NETWORKCODE')) {
                respondClientNetworkProtocol(data.NETWORKCODE, data.data);
            } else {
                receiveUpdateClient(data);
            }
            receiveUpdateClient(data);
        });
    }*/
  dataConnection.on("open", () => {
    console.log("CONNECTED");
  });
  dataConnection.on("error", (e) => {
    window.alert(
      `A fatal error has occured:\n${e.type}\n\nClick 'Ok' to return to homepage`
    );
    router.push("Home");
  });
}

function sendUpdateClient(data, code) {
  const payload = {
    dataToUpdate: data,
    code: code,
  };
  networkData.thisConnection.send(payload);
}

function SendUpdateHost(data, code) {
  const payload = {
    dataToUpdate: data,
    code: code,
  };
  for (const conn of networkData.dataConnections) {
    conn.send(payload);
  }
}

/*
function respondHostNetworkProtocol(code, data, dataConnection) {
    if(code == 'C') {
        console.log(`CLIENT CONNECTED - ${data.user}`);
        networkData.dataStatuses(dataConnection).joinHandshake = 1;

        networkData.members = networkData.members.concat(data.user);

        const res = {
            NETWORKCODE: 'AKC',
        }
        dataConnection.send(res);
    } else if (code == 'D') {
        console.log(`CLIENT DISCONNECTED - ${data.user}`);
        networkData.dataStatuses(dataConnection).leaveHandshake = 1;
        const res = {
            NETWORKCODE: 'AKD'
        }
        dataConnection.send(res);
    }
}

function respondClientNetworkProtocol(code, data) {
    const innerData = code == 'UPD' ? data.data : {};
    if(code == 'AKD') {
        peer.disconnect();
        router.push('Home');
    } else {
        if(Object.keys(innerData).includes('users')) {
            networkData.messages = innerData.users;
        }
        if(Object.keys(innerData).includes('messages')) {
            networkData.messages = innerData.messages;
        }
    }
}
*/

function receiveUpdateHost(data) {
  switch (data.code) {
    case "C": {
      createDirector(data.dataToUpdate.data);
      break;
    }
    case "U": {
      const widU = widgets.value.find((w) => {
        return w.sharedID == data.dataToUpdate.id;
      });
      if (widU === undefined) {
        console.log(
          `ERROR - ATTEMPTED TO UPDATE WIDGET WITH sharedID ${data.dataToUpdate.id}`
        );
        console.log(
          isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value
        );
      } else {
        updateDirector(data.dataToUpdate.id, data.dataToUpdate.data);
      }
      break;
    }
    case "D": {
      const widD = widgets.value.find((w) => {
        return w.sharedID == data.dataToUpdate.id;
      });
      if (widD === undefined) {
        console.log(
          `ERROR - ATTEMPTED TO DELETE WIDGET WITH sharedID ${data.dataToUpdate.id}`
        );
        console.log(
          isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value
        );
      } else {
        deleteDirector(data.dataToUpdate.id);
      }
      break;
    }
    default: {
      console.log(
        `ERROR - RECEIVED NETWORK INSTRUCTION WITHOUT PROPER CODE - ${data.code}`
      );
    }
  }
}

function receiveUpdateClient(data) {
  console.log(data);
  switch (data.code) {
    case "C": {
      createWidget(data.dataToUpdate.data);
      break;
    }
    case "U": {
      const widU = widgets.value.find((w) => {
        return w.sharedID == data.dataToUpdate.id;
      });
      if (widU === undefined) {
        console.log(
          `ERROR - ATTEMPTED TO UPDATE WIDGET WITH sharedID ${data.dataToUpdate.id}`
        );
        console.log(
          isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value
        );
      } else {
        updateWidget(widU.id, data.dataToUpdate.data);
      }
      break;
    }
    case "D": {
      const widD = widgets.value.find((w) => {
        return w.sharedID == data.dataToUpdate.id;
      });
      if (widD === undefined) {
        console.log(
          `ERROR - ATTEMPTED TO DELETE WIDGET WITH sharedID ${data.dataToUpdate.id}`
        );
        console.log(
          isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value
        );
      } else {
        deleteWidget(widD.id);
      }
      break;
    }
    default: {
      console.log(
        `ERROR - RECEIVED NETWORK INSTRUCTION WITHOUT PROPER CODE - ${data.code}`
      );
    }
  }
}

function deleteDirector(id) {
  const wids = isProxy(widgets.value) ? toRaw(widgets.value) : widgets.value;
  const wid = wids.find((w) => {
    return w.id == id;
  });
  if (wid.isGroup) {
    const data = { id: wid.sharedID };
    if (networkData.isHost) {
      SendUpdateHost(data, "D");
      deleteWidget(wid.id);
    } else {
      sendUpdateClient(data, "D");
    }
  } else {
    deleteWidget(id);
  }
}

function createDirector(data) {
  const newData = data;
  if (data.isGroup) {
    if (networkData.isHost) {
      newData.sharedID = networkData.sharedCounter;
      networkData.sharedCounter++;
      const toSend = { data: newData };
      SendUpdateHost(toSend, "C");
      createWidget(data);
    } else {
      const toSend = { data: newData };
      sendUpdateClient(toSend, "C");
    }
  } else {
    newData.sharedID = -1;
    createWidget(newData);
  }
}

function updateDirector(id, data) {
  const wid = widgets.value.find((w) => {
    return w.id == id;
  });
  if (wid.isGroup) {
    const newData = { id: wid.sharedID, data: data };
    if (networkData.isHost) {
      SendUpdateHost(newData, "U");
      updateWidget(id, data);
    } else {
      sendUpdateClient(newData, "U");
    }
  } else {
    updateWidget(id, data);
  }
}

//network creation

const peer = new Peer();
onMounted(() => {
  if (networkData.isHost) {
    console.log("HOSTING");
    peer.on("open", () => {
      ready.value = !ready.value;
      roomID.value = peer.id;

      // Make a POST request to update roomRefID
      axios
        .post("your-api-endpoint/updateRoomRefID", {
          roomID: roomID.value, // The existing room ID from the database
          roomRefID: peer.id, // The newly generated ID from Peer.js
        })
        .then((response) => {
          console.log("Room Ref ID updated successfully:", response.data);
          // Additional logic after successful update, idk what to put
        })
        .catch((error) => {
          console.error("Error updating Room Ref ID:", error);
          // Error handling logic, idk what to put
        });
      startAlert(
        `Room opened with ID ${roomID.value}. To view this again, click on the envelope icon`,
        5
      );
      peer.on("connection", (dataConnection) => {
        console.log("CONNECTION RECEIVED");
        handleNetwork(dataConnection);
      });
    });
  } else {
    console.log("JOINING");
    roomID.value = route.query.roomID;
    peer.on("open", () => {
      ready.value = !ready.value;
      const conn = peer.connect(roomID.value);
      handleNetwork(conn);
    });
  }
});

window.addEventListener("beforeunload", () => {
  peer.destroy();
});

onBeforeRouteLeave((to, from) => {
  if (peer != "") {
    peer.destroy();
  }
});
//Leave button function
function Leave() {
  let message = "Are you sure you want to leave?";
  if (networkData.isHost) {
    message =
      "Are you sure you want to leave? As host you will close the room.";
  }
  if (window.confirm(message)) {
    router.push("Home");
  }
}

//alert functions
function startAlert(msg, timeout) {
  const as = isProxy(alerts.value) ? toRaw(alerts.value) : alerts.value;
  const newData = {
    msg: msg,
    timeout: timeout,
    id: alertCounter,
  };
  alertCounter++;
  const as2 = structuredClone(as);
  as2.push(newData);
  alerts.value.splice(0, as.length, ...as2);
}

function endAlert(id) {
  const as = isProxy(alerts.value) ? toRaw(alerts.value) : alerts.value;
  const as2 = as.filter((a) => {
    return a.id != id;
  });
  alerts.value.splice(0, as.length, ...as2);
}
</script>

<style scoped>
.leaveRoom {
  top: 20px;
  right: 20px;
  position: absolute;
}

.item {
  width: 30px;
  height: 30px;
  cursor: pointer;
  text-align: center;
}
.item > i {
  margin-top: 15px;
}
.item:hover {
  background-color: grey;
  border-radius: 5px;
}

.roomid {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
