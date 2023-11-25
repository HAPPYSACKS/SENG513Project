<template>
  <div id="container">
    <img id="handle" @mousedown="startDrag" src="@/assets/icons/move.png" alt="Move">
    <p>{{ widgetType }}</p>
    <div>─</div>
  </div>
</template>

<script>
export default {
  props: ["widgetType"],
  methods: {
    startDrag(event) {
      this.$emit("startDrag", event);
    },
  },
};
</script>

<style scoped>
  p {
    margin: 0;
  }
  
  #handle{
        -webkit-user-drag: none;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
  }

  #container {
    /* position: absolute; */
    margin: 15px 25px 0px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
