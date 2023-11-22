<template>
  <p id="host-id">Your Host ID: </p>
  <input type="text" id="join-id">
  <button id="join-enter">JOIN</button>
  <button id="leave-enter">DISCONNECT</button>
  <p id="connection-status">Connection status: disconnected</p>
  <input type="text" id="chat-input">
  <button id="chat-enter">SEND MESSAGE</button>
  <div id="chat-box"></div>
</template>

<script>
import { Peer } from "peerjs";
import { onMounted } from "vue";
export default {
  name: 'App',
  setup() {
    onMounted(()=>{
      const peer = new Peer();

      //the Elements I made for the demo
      const host_id = document.getElementById("host-id");
      const join_id = document.getElementById('join-id')
      const join_btn = document.getElementById("join-enter");
      const leave_btn = document.getElementById("leave-enter");
      const conn_stat = document.getElementById("connection-status");
      const chat_input = document.getElementById("chat-input");
      const chat_send = document.getElementById("chat-enter");
      const chat_box = document.getElementById("chat-box");
      
      function connectionEstablished(dataConnection) {
        dataConnection.on('open', ()=>{
          conn_stat.innerHTML = `Connection status: connected`;
          //send info to connected peers
          chat_send.addEventListener("click", ()=>{
            const input = chat_input.value
            chat_box.innerHTML = chat_box.innerHTML.concat("", `<p>${peer.id}: ${input}</p>`);
            if (input != "") {
              dataConnection.send(input);
              chat_input.value = "";
            }
          });
          //get info from connected peers
          dataConnection.on("data", (data)=>{
            chat_box.innerHTML = chat_box.innerHTML.concat("", `<p>${dataConnection.peer}: ${data}</p>`);
          })
        })
        dataConnection.on('close', ()=>{
          conn_stat.innerHTML = `Connection status: disconnected`;
        })
        dataConnection.on('error', (e)=>{
          conn_stat.innerHTML = `Connection status: error ${e}`;
        })
      }

      //Peer event listeners
      peer.on('open', ()=>{
        host_id.innerHTML = `Your Host ID: ${peer.id}`;
      })

      peer.on('connection', (dataConnection)=>{
        connectionEstablished(dataConnection);
      });

      join_btn.addEventListener("click", ()=>{
        const input = join_id.value;
        if(input != "") {
          const conn = peer.connect(input);
          connectionEstablished(conn);
        }
      })

      leave_btn.addEventListener("click", ()=>{
        peer.disconnect();
      })

      document.addEventListener("beforeunload", ()=>{
        peer.destroy();
      })
    })
  }
}
</script>

<style>

#chat-box {
  min-height: 2rem;
  border: 3px solid black;
}
</style>
