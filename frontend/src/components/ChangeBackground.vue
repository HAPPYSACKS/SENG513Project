<template>
  <!--1: https://www.youtube.com/watch?v=SKJP5vUT2tk -->
  <!--2: https://www.youtube.com/watch?v=N7JCXQJyBE4 -->
  <!--3: https://www.youtube.com/watch?v=TgQ7XJjdJsc -->
  <!--4: https://www.youtube.com/watch?v=15bZlN0LrFg -->
  <!--5: https://www.youtube.com/watch?v=uZEnkpFXd9I -->
  <!--6: https://www.youtube.com/watch?v=WKFMKV05OVU -->
  <!--7: https://www.youtube.com/watch?v=Q6Jm3JSZODU -->
  <!--8: https://www.youtube.com/watch?v=NXsZZxKfXwQ -->

  <!-- rel=0 after video ends, dont show related videos -->
  <!-- looping is done by making the video into a playlist then loop that playlist -->
  <!-- <iframe
  width="100%"
  height="100%"
  src="https://www.youtube.com/embed/NJuSStkIZBg?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=NJuSStkIZBg&mute=1"
  frameBorder="0"
  allowFullScreen
>
</iframe> -->

  <div class="changeBgContainer">
    <div class="scrollContainer">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="imgContainer"
        @click="selectImage(index)"
      >
        <img :src="image.src" />
        <!-- selector always set -->
        <div :class="{ selector: true, selected: selectedIndex === index }"></div>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  emits: ['onChangeBG'],
  data() {
    return {
      images:[
        { src: require("@/assets/thumbnails/1.jpg") },
        { src: require("@/assets/thumbnails/2.jpg") },
        { src: require("@/assets/thumbnails/3.jpg") },
        { src: require("@/assets/thumbnails/4.jpg") },
        { src: require("@/assets/thumbnails/5.jpg") },
        { src: require("@/assets/thumbnails/6.jpg") },
        { src: require("@/assets/thumbnails/7.jpg") },
        { src: require("@/assets/thumbnails/8.jpg") },
      ],
      selectedIndex: null,
      videoSrc: '',
      videoTitle: '',
    };
  },
  methods: {
    selectImage(index) {
      this.selectedIndex = index;
      this.changeBackground(this.selectedIndex);
    },
    changeBackground(selectedIndex){
      switch(selectedIndex){
        case 0:
          this.videoSrc = "https://www.youtube.com/embed/SKJP5vUT2tk?autoplay=1&amp;mute=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;playlist=SKJP5vUT2tk"
          this.videoTitle = "4K Rainy Day at Cozy Coffee Shop ☕ Smooth Jazz Music to Relax/Study/Work to"
          this.$emit("onChangeBG", this.videoSrc, this.videoTitle)
          break
        case 1:
          this.videoSrc = "https://www.youtube.com/embed/N7JCXQJyBE4?autoplay=1&amp;mute=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;playlist=N7JCXQJyBE4"
          this.title="ＳＬＥＥＰＹ Lofi Cat 💤 Lofi Hip Hop Mix 🐾  Relax With My Cat [ Beats to sleep / Chill to ]"
          this.$emit("onChangeBG", this.videoSrc, this.videoTitle)
          break
        case 2:
          this.videoSrc = "https://www.youtube.com/embed/TgQ7XJjdJsc?autoplay=1&amp;mute=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;playlist=TgQ7XJjdJsc"
          this.title="relaxing autumn video game (mostly nintendo) music (w/ fall farm ambience)"
          this.$emit("onChangeBG", this.videoSrc, this.videoTitle)
          break
        case 3:
          this.videoSrc = "https://www.youtube.com/embed/15bZlN0LrFg?autoplay=1&amp;mute=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;playlist=15bZlN0LrFg"
          this.title="Calm Nintendo games music to finish the day 🌇 (Vapidbobcat)"
          this.$emit("onChangeBG", this.videoSrc, this.videoTitle)
          break
        case 4:
          this.videoSrc = "https://www.youtube.com/embed/uZEnkpFXd9I?autoplay=1&amp;mute=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;playlist=uZEnkpFXd9I"
          this.title="[4K] Oxford Tour, England | City Centre - Virtual Oxford Walking Tour"
          this.$emit("onChangeBG", this.videoSrc, this.videoTitle)
          break
        case 5:
          this.videoSrc = "https://www.youtube.com/embed/WKFMKV05OVU?autoplay=1&amp;mute=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;playlist=WKFMKV05OVU"
          this.title="Orient Train Ambience  -  A Journey from Colorado to New Mexico 1970"
          this.$emit("onChangeBG", this.videoSrc, this.videoTitle)
          break
        case 6:
          this.videoSrc = "https://www.youtube.com/embed/Q6Jm3JSZODU?autoplay=1&amp;mute=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;playlist=Q6Jm3JSZODU"
          this.title="Cozy Fire"
          this.$emit("onChangeBG", this.videoSrc, this.videoTitle)
          break
        case 7:
          this.videoSrc = "https://www.youtube.com/embed/NXsZZxKfXwQ?autoplay=1&amp;mute=1&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;loop=1&amp;playlist=NXsZZxKfXwQ"
          this.title="Akvárium | Rybičky v pozadí | Relaxační video | Bílý šum"
          this.$emit("onChangeBG", this.videoSrc, this.videoTitle)
          break
      }
    },
  },
};
</script>

<style scoped>
.selector {
  display: none;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: #dcdcdc;
  z-index: 1;
}

.selected {
  display: block;
}

.imgContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.imgContainer {
  position: relative; /* Change to relative */
  flex-shrink: 0;
  width: 225px;
  height: 125px;
  overflow: hidden;
  border-radius: 10px;
}

.imgContainer:hover {
  cursor: pointer;
  border: 3px black solid;
}

.imgContainer iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.imgContainer iframe {
  pointer-events: none;
}
.imgContainer iframe {
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: calc(100% + 120px);
}

.changeBgContainer {
  width: 700px;
  height: 200px;
  border-radius: 26px;
  gap: 5px;
  background-color: #ececec;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top:60%;
  left:28%;
}

.scrollContainer {
  gap: 10px;
  display: flex;
  flex-direction: row;
  width: 95%;
  overflow-y: hidden;
  overflow-x: scroll;
  padding-bottom: 10px;
}

.scrollContainer::-webkit-scrollbar {
  height: 12px;
}

.scrollContainer::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}

.scrollContainer::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

.scrollContainer::-webkit-scrollbar-button {
  display: none; /* Hide the scrollbar arrows */
}
</style>