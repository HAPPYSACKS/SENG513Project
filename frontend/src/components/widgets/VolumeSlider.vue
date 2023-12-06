<template>
  <div class="sliderContainer">
    <p>{{ label }}</p>
    <input
      ref="slider"
      type="range"
      min="0"
      max="100"
      v-model="sliderValue"
      @input="handleInput"
      class="slider"
    />
  </div>
</template>

<script>
export default {
  props: ['label'],

  data() {
    return {
      sliderValue: 0,
      audio: null,
    };
  },
  methods: {
    handleInput() {
      const value = (this.sliderValue - 0) / (100 - 0);
      const thumbColor = '#171717';
      this.$refs.slider.style.background = `linear-gradient(to right, ${thumbColor} 0%, ${thumbColor} ${value * 100}%, #8e8e8e ${value * 100}%, #8e8e8e 100%)`;
      this.$refs.slider.style.setProperty('--thumb-color', thumbColor);

      this.audio.volume = value;

      this.audio.play();
    },
    loadAudio() {
      const fileName = this.label;
      const filePath = require(`@/assets/sounds/${fileName}.mp3`);
      this.audio = new Audio(filePath);
      this.audio.loop = true;
    }
  },
  watch: {
    label: 'loadAudio',
  },
  mounted() {
    // Load initial audio file
    this.loadAudio();
  },
};
</script>

<style scoped>
p{
   width: 170px;
}

.sliderContainer {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-around;
}

input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 10px;
  outline: none;
  opacity: 0.7;
  position: relative;
  border-radius: 5px;
  background: #8e8e8e;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: rgb(47, 47, 47);
  border-radius: 50%;
  cursor: grab;
  position: relative;
  z-index: 2;
}
</style>
