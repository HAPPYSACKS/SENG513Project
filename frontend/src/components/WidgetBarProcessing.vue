<template>
    <WidgetBar @returnPopupInfo="getPopupInfo" @showNoPopupWidget="handleShowNoPopupWidget"/>
</template>

<script>
import WidgetBar from './WidgetBar.vue'

export default {
  name: WidgetBar,
  components: { WidgetBar },
  emits: ['create'],
  data() {
    return {
      widgets: [
        { name: 'Room-Member', isGroup: false, type: 'RoomMemberWidget' },
        { name: 'Chat', isGroup: false, type: 'ChatWidget' },
        { name: 'Call', isGroup: false, type: 'CallWidget' },
        { name: 'Sound', isGroup: false, type: 'MusicWidget'},
        { name: 'Youtube', isGroup: false, type: 'YoutubeWidget' },
        { name: 'Timer', isGroup: false, type: 'TimerWidget' },
        { name: 'Calendar', isGroup: false, type: 'CalendarWidget' },
        { name: 'To-Do-List', isGroup: false, type: 'ToDoListWidget' },
        { name: 'Sticky-Notes', isGroup: false, type: 'StickyNotesWidget' },
        { name: 'Sticker', isGroup: false, type: 'StickerWidget' },
        { name: 'Draw', isGroup: false, type: 'DrawWidget' },
        { name: 'Settings', isGroup: false, type: 'SettingsWidget'}
      ],
    };
  },
  methods: {
    handleShowNoPopupWidget(widgetName) {
      this.showWidget(widgetName);
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