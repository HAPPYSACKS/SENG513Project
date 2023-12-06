<template>
  <div style="width: 300px; height: 100px;">
    <div style="display:flex; justify-content:center;">
      <input v-model="minutes" @input="validateInput" :class="{ 'flash': isFlashing }" class="input-field" />
      <p  style="margin: 0px; font-size: 50px;" :class="{ 'flash': isFlashing }">:</p>
      <input v-model="seconds" @input="validateInput" :class="{ 'flash': isFlashing }" class="input-field" />
    </div>

    <div id="buttons">
      <button @click="emitUpdateEvent({cs: this.seconds, cm: this.minutes, shouldCount: !this.isCountingDown})">{{ message }}</button>
      <button @click="emitUpdateEvent({cs: this.seconds, cm: this.minutes, reset: !data.reset, shouldCount: false})" class="reset">Reset</button>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
        resetMinutes: "10",
        resetSeconds: "00",
        minutes: this.data.cm, // Set default minutes to 10
        seconds: this.data.cs, // Set default seconds to 00
        isCountingDown: false,
        message: 'Start',
        isFlashing: false,
    };
  },
  props: {
    data: Object
  },
  methods: {
    stopTimer() {
      this.isCountingDown = false;
      this.message = "Start";
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
      this.emitUpdateEvent({cs: this.seconds, cm: this.minutes});
      if (totalSeconds > 0 && this.isCountingDown) {
        totalSeconds--;
        this.minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        this.seconds = String(totalSeconds % 60).padStart(2, '0');
        timerID = setTimeout(this.updateTimer, 1000);
      } else {
        clearTimeout(timerID);
        this.message = "Start"
        if(totalSeconds == 0){
            this.isFlashing = true;

            setTimeout(() => {
            this.isFlashing = false; // Reset flashing after a short delay
            this.message = "Start";
            }, 1000);
        }

      }
    },
    resetTimer() {
      this.isCountingDown = false;
      this.minutes = this.resetMinutes;
      this.seconds = this.resetSeconds;
      this.message = "Start";
    },
    validateInput() {
      // Ensure minutes and seconds are in the valid range
      this.minutes = this.validateNumberInput(this.minutes, 0, 59);
      this.seconds = this.validateNumberInput(this.seconds, 0, 59);
      this.emitUpdateEvent({cs: this.seconds, cm: this.minutes, m: this.minutes, s:this.seconds});
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
    emitUpdateEvent(data) {
      const newData = structuredClone(this.data);
      Object.assign(newData, data);//newData.assign(data);  
      this.$emit('update', newData);
    }
  },
  emits: ['update'],
  watch: {
    data: {
      handler(newData, oldData) {
        if(oldData.s != newData.s || oldData.m != newData.m) {
          this.resetMinutes = newData.m;
          this.resetSeconds = newData.s;
          this.minutes = this.resetMinutes;
          this.seconds = this.resetSeconds;
          this.stopTimer();
        }
        if(newData.shouldCount != this.isCountingDown) {
          this.startOrStopTimer();
        }
        if(newData.reset != oldData.reset) {
          this.resetTimer();
        }
      }
    }
  },
  mounted() {
    if(this.data.shouldCount) this.startOrStopTimer();
  }
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
</style>