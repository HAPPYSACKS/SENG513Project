<template>
  <div
    class="rectangle-container slide-in-top"
    id="popup"
    :style="{ top: top + 'px', left: left + 'px' }"
  >
    <div class="rectangle">
      <div @click="clickMyself" class="half for-myself">For Myself</div>
      <div class="half for-room">For Room</div>
    </div>
    <!-- <div class="triangle"></div> -->
  </div>
</template>

<script>
export default {
  props: ["imgID", "top", "left", "onTogglePopup"],
  methods: {
    clickMyself() {
      this.onTogglePopup(this.imgID);
    },
  },
};
</script>


<style scoped>
.rectangle-container {
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  /* display: none; */
  position: absolute;
  width: 250px;
  height: 50px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1000; /* Ensure it's on top of other elements */
}

.rectangle {
  width: 100%;
  height: 100%;
  background-color: #ececec;
  transition: background-color 0.3s;
  display: flex;
}

.half {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.for-myself:hover,
.for-room:hover {
  background-color: #000;
  color: #ececec;
}

.slide-in-top {
	animation: slide-in-top 0.3s ease;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
