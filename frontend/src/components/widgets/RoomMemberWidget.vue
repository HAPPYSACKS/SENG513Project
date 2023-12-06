<template>
  <div class="container">
    <div v-for="(x, index) in data.members" :key="index" @mouseenter="setMouseOver(index, true)" @mouseleave="setMouseOver(index, false)"  class="name">
      <p>{{ x }} <span v-show="x === data.me">(Me)</span></p>
      <button @click="kickMember(index)" v-show="memberMouseOver[index].isMouseOver && data.isHost">Kick</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      // shallow copy of members list and it has isMouseOver for each index
      memberMouseOver: this.data.members.map(member => ({ ...member, isMouseOver : false})),
    }
  },
  props: {
    data: Object,
  },
  emits:["kick"],
  methods: {
    setMouseOver(index, value){
      this.memberMouseOver[index].isMouseOver = value
    },
    kickMember(index){
      this.$emit("kick", index)
    }
  }

}
</script>

<style scoped>
span{
  padding: 0;
}

.name{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: default;
}

.name:hover{
  background-color: rgba(99, 99, 99, 0.8);
  border-radius: 5px;
}

button{
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover{
  background-color: black;
  color: white;
}

p{
  margin: 5px;
}

.container{
  padding-left: 10px;
  width: 95%;
  height: 150px;
  overflow-y: scroll;
}

.list-item {
  padding: 0.3rem 1rem;
  margin: 5px;
  background-color: #e7e7e7;
  border-radius: 5px;
}
/* Style the scrollbar */
.container::-webkit-scrollbar {
  width: 9px; 
}

.container::-webkit-scrollbar-thumb {
  background-color: #121212;
  border-radius: 5px;
}

.container::-webkit-scrollbar-track {
  background-color: #ddd;
  border-radius: 5px;
}
</style>
