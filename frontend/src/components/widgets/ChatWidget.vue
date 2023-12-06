<template>
  <div class="chat">
    <div class="messages" ref="messages">
      <MessageBox
        v-for="(message, i) in data.messages"
        :key="i"
        :class="['message', { right: message.isMine }]"
        :dark="checkIsMine(message.user)"
        :text="message.message"
        :author="message.user"
      />
    </div>
    <ChatBox class="chat-box" @submitMsg="submitMessage" />
  </div>
</template>

<script>
import MessageBox from "@/components/widgets/MessageBox";
import ChatBox from "@/components/widgets/ChatBox";

export default {
  name: "ChatWidget",
  components: {
    ChatBox,
    MessageBox,
  },
  props: {
    data: Object,
  },
  // This is going to be called
  //  when the component gets rendered
  methods: {
    /*updateChat(message) {
      this.messages.push({ message, isMine: false });
      this.$nextTick(() => {
        const element = this.$refs["messages"];
        element.scrollTo({ behavior: "smooth", top: element.scrollHeight });
      });
    },*/
    // This method will be called when a new message is sent
    submitMessage(event, text) {
      event.preventDefault();
      this.$emit('message', text);
    },
    checkIsMine(u) {
      return u == this.data.me;
    }
  },
  emits: ["message"]
  /*
  watch: {
    messages: {
      handler(newValue, oldValue) {
        if (newValue.length > oldValue.length) {
          this.messages.push(newValue[newValue.length - 1]);
        }
      },
      deep: true,
    },
  },
  /*
mounted() {
this.$parent.$on('peer-message-received', (message) => {
  this.updateChat(message);
});
},



async function getAuthToken() {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    auth.currentUser
      .getIdToken()
      .then((token) => {
        resolve(token);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

async function updateRoomReferenceID() {
  try {
    const authToken = await getAuthToken();
    console.log(route.query);
    console.log(peer.id);
    await axios.post(
      `${API_ADDRESS}/updateRoomRefID`,
      {
        roomID: route.query.roomRefID, // Existing room ID from the database
        roomRefID: peer.id, // New ID from Peer.js
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    console.log("Room Ref ID updated successfully");
    // Additional logic after successful update
  } catch (error) {
    console.error("Error updating Room Ref ID:", error);
    // Error handling logic
  }
}



beforeDestroy() {
// Clean up the event listener when the component is destroyed
this.$parent.$off('peer-message-received');
} */
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
button {
  border: 0;
  background: #2a60ff;
  color: white;
  cursor: pointer;
  padding: 1rem;
}
input {
  border: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.1);
}
.chat {
  height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
}
  .messages {
  flex-grow: 1;
  overflow: auto;
  padding: 1rem;
}
.message + .message {
  margin-top: 1rem;
}
.message.right {
  margin-left: auto;
}
</style>