<template>
  <div id="container">
    <img id="handle" @mousedown="startDrag" src="@/assets/icons/move.png" alt="Move">
    <div style="display: flex; flex-direction: row; gap: 10px;">
      <img v-show="isGroup" style="width: 30px" src="@/assets/icons/group.png" alt="For Room">
      <p>{{ widgetName }}</p>
    </div>
    <div style="display: flex; flex-direction: row; gap: 15px;">
      <div>─</div>
      <div>x</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isGroup", "widgetName"],
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
    margin: 10px 25px 0px 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
</style>
