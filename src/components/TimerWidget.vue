<template>
  <div class="widget" :style="{ left: containerPosition.left + 'px', top: containerPosition.top + 'px' }">
    <TopOfWidget :widgetType="widgetType" @startDrag="startDrag" @handleDrag="handleDrag" @stopDrag="stopDrag" />

    <div style="display:flex; justify-content:center;">
      <input v-model="minutes" @input="validateInput" :class="{ 'flash': isFlashing }" class="input-field" />
      <p  style="margin: 0px; font-size: 50px;" :class="{ 'flash': isFlashing }">:</p>
      <input v-model="seconds" @input="validateInput" :class="{ 'flash': isFlashing }" class="input-field" />
    </div>

    <div id="buttons">
      <button @click="startOrStopTimer">{{ message }}</button>
      <button @click="resetTimer" class="reset">Reset</button>
    </div>
  </div>
</template>

<script>
import TopOfWidget from './TopOfWidget.vue'

export default {
  components: { TopOfWidget },
  props: ["widgetType"],
    data() {
    return {
        minutes: "10", // Set default minutes to 10
        seconds: "00", // Set default seconds to 00
        isCountingDown: false,
        containerPosition: { left: 0, top: 0 },
        isDragging: false,
        offsetX: 0,
        offsetY: 0,
        message: 'Start',
        isFlashing: false,
    };
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.offsetX = event.clientX - this.$el.getBoundingClientRect().left;
      this.offsetY = event.clientY - this.$el.getBoundingClientRect().top;

      document.addEventListener("mousemove", this.handleDrag);
      document.addEventListener("mouseup", this.stopDrag);
    },
    handleDrag(event) {
      if (this.isDragging) {
        const x = event.clientX - this.offsetX;
        const y = event.clientY - this.offsetY;

        this.containerPosition = { left: x, top: y };
      }
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.handleDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    startOrStopTimer() {
      this.isCountingDown = !this.isCountingDown;
      if (this.isCountingDown) {
        this.updateTimer();
        this.message = "Stop";
      } else {
        this.message = "Start";
      }
    },
    updateTimer() {
      let totalSeconds = parseInt(this.minutes) * 60 + parseInt(this.seconds);
      let timerID;

      if (totalSeconds > 0 && this.isCountingDown) {
        totalSeconds--;
        this.minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        this.seconds = String(totalSeconds % 60).padStart(2, '0');
        timerID = setTimeout(this.updateTimer, 1000);
      } else {
        clearTimeout(timerID);
        this.message = "Start"
        this.isFlashing = true;

         setTimeout(() => {
          this.isFlashing = false; // Reset flashing after a short delay
          this.message = "Start";
        }, 1000);
      }
    },
    resetTimer() {
      this.isCountingDown = false;
      this.minutes = "00";
      this.seconds = "00";
      this.message = "Start";
    },
    validateInput() {
      // Ensure minutes and seconds are in the valid range
      this.minutes = this.validateNumberInput(this.minutes, 0, 59);
      this.seconds = this.validateNumberInput(this.seconds, 0, 59);
    },
    validateNumberInput(value, min, max) {
      const intValue = parseInt(value);
      if (isNaN(intValue) || intValue < min) {
        return String(min).padStart(2, '0');
      } else if (intValue > max) {
        return String(max).padStart(2, '0');
      }
      return String(intValue).padStart(2, '0');
    },
  },
};
</script>

<style scoped>
.input-field{
    background: none;
    border: none;
    width: 66px;
    font-size: 50px;
    font-family: "inter";   
    text-align: center;
}

.reset {
  background-color: #ececec;
  color: #757575;
  border: 3px solid #757575;
}

.flash {
  animation: flashAnimation 0.1s infinite alternate;
}

@keyframes flashAnimation {
  from {
    color: inherit;
  }
  to {
    color: #ececec;
  }
}

button {
  padding: 5px;
  font-family: inter;
  color: white;
  font-size: 18px;
  border-radius: 10px;
  background: #757575;
  border: 0;
}

#buttons {
  display: flex;
  justify-content: space-evenly;
}

.widget {
  width: 300px;
  height: 170px;
  border-radius: 26px;
  background-color: #ececec;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  position: absolute;
}

</style>
