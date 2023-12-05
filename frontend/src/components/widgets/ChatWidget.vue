<template>
  <div class="chat">
    <div class="messages" ref="messages">
      <MessageBox
        v-for="message in messages"
        :key="message.id"
        :class="['message', { right: message.isMine }]"
        :dark="message.isMine"
        :text="message.text"
        :author="userName"
      />
    </div>
    <ChatBox class="chat-box" @submit="submitMessage" />
  </div>
</template>

<script>
import MessageBox from "@/components/widgets/MessageBox";
import ChatBox from "@/components/widgets/ChatBox";
import Vue from "vue";
export default {
  name: "ChatWidget",
  data() {
    return {
      messages: [], // Array of chat messages
    };
  },
  components: {
    ChatBox,
    MessageBox,
  },
  props: {
    data: Object,
    peerId: String,
    userName: String,
  },
  // This is going to be called
  //  when the component gets rendered
  methods: {
    updateChat(message) {
      this.messages.push({ message, isMine: false });
      Vue.nextTick(() => {
        const element = this.$refs["messages"];
        element.scrollTo({ behavior: "smooth", top: element.scrollHeight });
      });
    },
    // This method will be called when a new message is sent
    submitMessage(event, text) {
      event.preventDefault();
      const newMessage = {
        id: this._uid,
        text: text,
        userId: this.peerId,
        author: this.peerId,
        isMine: true,
      };
      this.messages.push(newMessage);
      this.$emit("update", newMessage);
      this.$nextTick(() => {
        const element = this.$refs["messages"];
        element.scrollTo({ behavior: "smooth", top: element.scrollHeight });
      });
    },
  },
  emits: ["update"],
  computed: {
    chatLength() {
      return this.messages.length;
    },
  },
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
beforeDestroy() {
// Clean up the event listener when the component is destroyed
this.$parent.$off('peer-message-received');
} */
};
</script>
<style>
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
</style>
<style scoped>
.chat {
  height: 50vh;
  width: 25vw;
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
