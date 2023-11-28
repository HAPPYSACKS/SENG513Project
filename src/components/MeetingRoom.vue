<template>
  <div>
    <div class="video-container">
      <div class="video-foreground">
        <iframe
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          :src="videoSrc"
          :title="videoTitle"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>

    <div class="item leaveRoom">
      <img src="@/assets/icons/leaveRoom.png" alt="Leave Room" />
    </div>

    <WidgetPlaceholder
      v-for="(widget, index) in widgets"
      :key="index"
      v-show="widget.show"
      :widgetName="widget.name"
      :isGroup="widget.isGroup"
      :widgetContent="widget.content"
      :width="widget.width"
      :height="widget.height"
    />

    <WidgetBar
      @returnPopupInfo="getPopupInfo"
      @showNoPopupWidget="handleShowNoPopupWidget"
    />

    <ChangeBackground @onChangeBG="handleChangeBG" v-show="changeBackgroundShow" />
  </div>
</template>

<script>
import WidgetBar from "./WidgetBar.vue";
import WidgetPlaceholder from "./WidgetPlaceholder.vue";
import ChangeBackground from "./ChangeBackground.vue";

export default {
  components: { WidgetBar, WidgetPlaceholder, ChangeBackground },

  data() {
    return {
      widgets: [
        {
          name: "Room-Member",
          show: false,
          isGroup: false,
          content: "RoomMemberWidget",
          width: 300,
          height: 170,
        },
        {
          name: "Chat",
          show: false,
          isGroup: false,
          content: "ChatWidget",
          width: 300,
          height: 170,
        },
        {
          name: "Call",
          show: false,
          isGroup: false,
          content: "CallWidget",
          width: 300,
          height: 170,
        },
        {
          name: "Sound",
          show: false,
          isGroup: false,
          content: "MusicWidget",
          width: 300,
          height: 300,
        },
        {
          name: "Youtube",
          show: false,
          isGroup: false,
          content: "YoutubeWidget",
          width: 300,
          height: 170,
        },
        {
          name: "Timer",
          show: false,
          isGroup: false,
          content: "TimerWidget",
          width: 300,
          height: 170,
        },
        {
          name: "Calendar",
          show: false,
          isGroup: false,
          content: "CalendarWidget",
          width: 300,
          height: 170,
        },
        {
          name: "To-Do-List",
          show: false,
          isGroup: false,
          content: "ToDoListWidget",
          width: 300,
          height: 170,
        },
        {
          name: "Sticky-Notes",
          show: false,
          isGroup: false,
          content: "StickyNotesWidget",
          width: 300,
          height: 170,
        },
        {
          name: "Sticker",
          show: false,
          isGroup: false,
          content: "StickerWidget",
          width: 300,
          height: 170,
        },
        {
          name: "Draw",
          show: false,
          isGroup: false,
          content: "DrawWidget",
          width: 300,
          height: 170,
        },
      ],
      changeBackgroundShow: false,
      videoSrc: '',
      videoTitle: '',
    };
  },
  methods: {
    handleChangeBG(videoSrc, videoTitle){
        this.videoSrc = videoSrc
        this.videoTitle = videoTitle
    },

    handleShowNoPopupWidget(widgetName) {
      if (widgetName === "ChangeBG") {
        this.toggleChangeBG();
      } else {
        this.showWidget(widgetName);
      }
    },

    toggleChangeBG() {
      this.changeBackgroundShow = !this.changeBackgroundShow;
    },

    getPopupInfo(isGroup, widgetName) {
      this.showWidget(widgetName, isGroup);
    },

    // isGroup is optional, but set to false on default
    showWidget(widgetName, isGroup = false) {
      // return the wanted array if found into widget, else undefined
      const widget = this.widgets.find((w) => w.name === widgetName);

      if (widget) {
        widget.show = true;
        widget.isGroup = isGroup;
      }
    },
  },
};
</script>

<style scoped>
.video-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  z-index:0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: calc(100% + 120px);
}
.video-foreground {
  pointer-events: none;
}

.leaveRoom {
  top: 20px;
  right: 20px;
  position: absolute;
}

.item {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.item:hover {
  background-color: grey;
  border-radius: 5px;
}
</style>

