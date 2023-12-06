<template>
  <div class="container">
    <p>{{this.data.members}}</p>
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
