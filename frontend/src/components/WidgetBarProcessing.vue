<template>
    <WidgetBar @returnPopupInfo="getPopupInfo" @showNoPopupWidget="handleShowNoPopupWidget" :isHost="isHost"/>
</template>

<script>
import WidgetBar from './WidgetBar.vue'

export default {
  name: WidgetBar,
  components: { WidgetBar },
  emits: ['create', 'changebackground'],
  data() {
    return {
      widgets: [
        { name: 'Room-Member', isGroup: false, type: 'RoomMemberWidget', default: {}},
        { name: 'Chat', isGroup: false, type: 'ChatWidget', default: {} },
        { name: 'Sound', isGroup: false, type: 'MusicWidget', default: {}},
        { name: 'Youtube', isGroup: false, type: 'YoutubeWidget', default: {} },
        { name: 'Timer', isGroup: false, type: 'TimerWidget', default: {s: "00", m: "10", cs: "00", cm: "10", shouldCount: false, reset: 0} },
        { name: 'Calendar', isGroup: false, type: 'CalendarWidget', default: {} },
        { name: 'Sticky-Notes', isGroup: false, type: 'StickyNotesWidget', default: {content: ''} },
        { name: 'Invite', isGroup: false, type: 'InviteWidget', default: {id: this.roomid} },
        { name: 'Change Background', isGroup: false, type: 'ChangeBG', default: {} },
        { name: 'Settings', isGroup: false, type: 'SettingsWidget', default: {}},
      ],
    };
  },
  props: {
    isHost: Boolean,
    roomid: String,
  },
  methods: {
    handleShowNoPopupWidget(widgetName) {
      if (widgetName === "ChangeBG") {
        this.$emit('changebackground')
      } else {
        this.showWidget(widgetName);
      }
    },

    getPopupInfo(isGroup, widgetName) {
      this.showWidget(widgetName, isGroup);
    },

    // isGroup is optional, but set to false on default
    showWidget(widgetName, isGroup = false) {
      // return the wanted array if found into widget, else undefined
      const widget = this.widgets.find(w => w.name === widgetName);
      widget.isGroup = isGroup;
      this.$emit('create', widget);
    },
  },
};
</script>


<style scoped>
    .leaveRoom{
        top: 20px;
        right:20px;
        position: absolute;
    }

    .item{
        width: 30px;
        height: 30px;
        cursor: pointer;
    }
    .item img{
        width: 100%;
        height: 100%; 
        object-fit: contain;
    }
    .item:hover{
        background-color: grey;
        border-radius: 5px;
    }
</style>