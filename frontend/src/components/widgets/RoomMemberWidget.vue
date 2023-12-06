<template>
  <div class="container">
    <div v-for="(member, i) in data.members"
    :key="i"
    class="list-item">
    <h3>{{ member }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
}
</script>

<style scoped>
.container{
  width: 300px;
  height: 300px;
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
