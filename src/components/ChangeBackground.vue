<template>
    <div class="container">
        <div class="videosContainer">
            <div class="video-container">
                <div class="video-foreground">
                    <!-- rel=0 after video ends, dont show related videos -->
                    <!-- looping is done by making the video into a playlist then loop that playlist -->
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/NJuSStkIZBg?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=NJuSStkIZBg&mute=1"
                        frameBorder="0" 
                        allowFullScreen>
                    </iframe>
                </div>
            </div>
        </div>
        <div class="buttons">
            <button>Confirm</button>
            <button>Cancel</button>
        </div>
    </div>
</template>

<style scoped>

.video-container{
  width: 225px;
  height: 125px;
  overflow:hidden;
  position:relative;
  border-radius: 10px;
}


.video-container iframe{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-container iframe{
  pointer-events: none;
}
.video-container iframe{
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: calc(100% + 120px);
}
.video-foreground{
  pointer-events:none;
}

.container {
  width: 600px;
  height: 150px;
  border-radius: 26px;
  background-color: #ececec;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  position: absolute;
}
</style>