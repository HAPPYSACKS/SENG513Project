<template>
  <div>
    <div
      class="widget-wrapper-full widget-wrapper"
      v-if="getWidgetStyle(widData.type) == 'full'"
      :style="{
        width: dimension.width + 'px',
        height: dimension.height + 'px',
        left: containerPosition.left + 'px',
        top: containerPosition.top + 'px',
      }"
    >
      <div class="top-bar-full">
        <div>
          <i style="cursor:grab" class="fa-solid fa-arrows-up-down-left-right fa-lg"
            @mousedown="startDrag"
            @touchstart="startDrag"
          ></i>
        </div>
        &nbsp; &nbsp;
        <div style="cursor:default">
          <span v-if="widData.isGroup == true">
            &nbsp;
            <i class="fa-solid fa-users fa-lg"></i>
            &nbsp;
          </span>
          <span>{{ widData.name }}</span>
        </div>
        &nbsp; &nbsp;
        <div style="cursor:pointer">
          <i class="fa-solid fa-lg"
            :class="{ 'fa-minus': !minimized, 'fa-plus': minimized }"
            @click="minimize()"
          ></i>
          &nbsp;
          <i
            class="fa-solid fa-xmark fa-lg"
            @click="$emit('delete', widData.id)"
          ></i>
        </div>
      </div>

      <div
        class="content content-full"
        :style="{ display: displayed ? 'block' : 'none' }"
      >
        <component
          :is="getWidget(widData.type)"
          :data="widData.data"
          @update="
            (data) => {
              $emit('update', widData.id, data);
            }
          "
          @message="
            (msg)=> {
              $emit('message', msg);
            }
          "
          @other="
            (code, data) => {
                $emit('other', code, data)
            }
          "
        ></component>
      </div>

      <!-- <div
        class="content content-full"
        :style="{ display: displayed ? 'block' : 'none' }"
      ></div> -->
    </div>
    <div
      class="widget-wrapper-compact widget-wrapper"
      v-if="getWidgetStyle(widData.type) == 'compact'"
      :style="{
        width: dimension.width + 'px',
        height: dimension.height + 'px',
        left: containerPosition.left + 'px',
        top: containerPosition.top + 'px',
      }"
    >
      <div
        class="content content-compact"
        :style="{ visibility: displayed ? 'visible' : 'hidden' }"
        @mouseover="displayedCompact = true"
        @mouseleave="displayedCompact = keepDisplayedCompact"
      >
        <component
          :is="getWidget(widData.type)"
          :data="widData.data"
          @update="
            (data) => {
              $emit('update', widData.id, data);
            }
          "
        ></component>
      </div>
      <div
        class="bar-compact"
        :style="{ display: displayedCompact ? 'block' : 'none' }"
        @mouseover="displayedCompact = true"
        @mouseleave="displayedCompact = keepDisplayedCompact"
      >
        <i
          class="fa-solid fa-arrows-up-down-left-right fa-lg"
          @mousedown="startDrag"
          @touchstart="startDrag"
        ></i>
        &nbsp;
        <i v-if="widData.isGroup == true" class="fa-solid fa-users fa-lg"></i>
        &nbsp;
        <i
          class="fa-solid fa-lg"
          :class="{ 'fa-minus': !minimized, 'fa-plus': minimized }"
          @click="minimize()"
        ></i>
        &nbsp;
        <i
          class="fa-solid fa-xmark fa-lg"
          @click="$emit('delete', widData.id)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import InviteWidget from "./widgets/Invite.vue";
import WidgetDefault from "./widgets/Default.vue";
import TimerWidget from "./widgets/TimerWidget.vue";
import MusicWidget from "./widgets/MusicWidget.vue";
import ChatWidget from "./widgets/ChatWidget.vue";
import YoutubeWidget from "./widgets/YoutubeWidget.vue";
import RoomMemberWidget from "./widgets/RoomMemberWidget.vue"
import StickyNotesWidget from './widgets/StickyNotesWidget.vue';
import SettingsWidget from './widgets/SettingsWidget.vue';
export default {
  name: "FullWidget",
  data() {
    return {
      containerPosition: { left: 30, top: 20 },
      dimension: { width: this.width, height: this.height },
      isDragging: false,
      offsetX: 0,
      offsetY: 0,
      displayed: true,
      displayedCompact: false,
      keepDisplayedCompact: false,
      minimized: false,
      widgets: [
        "RoomMemberWidget",
        "ChatWidget",
        "CallWidget",
        "MusicWidget",
        "YoutubeWidget",
        "TimerWidget",
        "CalendarWidget",
        "ToDoListWidget",
        "StickyNotesWidget",
        "StickerWidget",
        "DrawWidget",
        'SettingsWidget',
      ],
      compactWidgets: [],
    };
  },
  props: {
    widData: Object,
  },
  components: {
    // eslint-disable vue/no-unused-components
    WidgetDefault,
    TimerWidget,
    MusicWidget,
    YoutubeWidget,
    InviteWidget,
    ChatWidget,
  },
  emits: ["delete", "update", "message", "other"],
  methods: {
    minimize() {
      this.displayed = !this.displayed;
      this.minimized = !this.minimized;
      this.keepDisplayedCompact = !this.keepDisplayedCompact;
    },
    getWidgetStyle(id) {
      let toReturn = "";
      if (this.compactWidgets.includes(id)) {
        toReturn = "compact";
      } else {
        toReturn = "full";
      }
      return toReturn;
    },
    getWidget(id) {
      let toReturn = "";
      switch (id) {
        case "RoomMemberWidget":
          toReturn = RoomMemberWidget;
          break;
        case "ChatWidget":
          toReturn = ChatWidget;
          break;
        // case 'CallWidget':
        //     toReturn = WidgetDefault;
        //     break;
        case "MusicWidget":
          toReturn = MusicWidget;
          break;
        case "YoutubeWidget":
          toReturn = YoutubeWidget;
          break;
        case "TimerWidget":
          toReturn = TimerWidget;
          break;
        case "CalendarWidget":
          toReturn = WidgetDefault;
          break;
        case "ToDoListWidget":
          toReturn = WidgetDefault;
          break;
        case "StickyNotesWidget":
          toReturn = StickyNotesWidget;
          break;
        case "StickerWidget":
          toReturn = WidgetDefault;
          break;
        case "DrawWidget":
          toReturn = WidgetDefault;
          break;
        case "InviteWidget":
          toReturn = InviteWidget;
          break;
        case 'SettingsWidget':
          toReturn = SettingsWidget;
          break;
        default:
          toReturn = WidgetDefault;
      }
      return toReturn;
    },
    startDrag(event) {
      this.isDragging = true;
      const clientX = event.clientX || event.touches[0].clientX;
      const clientY = event.clientY || event.touches[0].clientY;
      this.offsetX = clientX - this.containerPosition.left;
      this.offsetY = clientY - this.containerPosition.top;
      this.keepDisplayedCompact = true;

      document.addEventListener("mousemove", this.handleDrag);
      document.addEventListener("mouseup", this.stopDrag);
      document.addEventListener("touchmove", this.handleDrag);
      document.addEventListener("touchend", this.stopDrag);
    },
    handleDrag(event) {
      if (this.isDragging) {
        const x = (event.clientX || event.touches[0].clientX) - this.offsetX;
        const y = (event.clientY || event.touches[0].clientY) - this.offsetY;

        this.containerPosition = { left: x, top: y };
      }
    },
    stopDrag() {
      this.isDragging = false;
      this.keepDisplayedCompact = false;
      document.removeEventListener("mousemove", this.handleDrag);
      document.removeEventListener("mouseup", this.stopDrag);
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");
.widget-wrapper {
  position: absolute;
}
.widget-wrapper-full {
  background-color: #cecece;
  border: 2px solid #757575;
  border-radius: 20px;
}
.top-bar-full {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
}
.content-full {
  margin: 0px 3px 15px 3px;
}
.bar-compact {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 8px 12px;
  border-radius: 20px 0 0 20px;
  background-color: #cecece;
  border: 1px solid black;
}
.widget-wrapper-compact {
  max-width: fit-content;
}
.content-compact {
  position: relative;
  max-width: fit-content;
}
</style>
