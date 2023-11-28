<template>
    <div class="widget" :style="{ width: dimension.width + 'px', height: dimension.height + 'px', left: containerPosition.left + 'px', top: containerPosition.top + 'px' }">
        <TopOfWidget :widgetName="widgetName" :isGroup="isGroup" @startDrag="startDrag" @handleDrag="handleDrag" @stopDrag="stopDrag" />
        <!-- INSERT WIDGET CONTENT HERE -->
        <component :is="widgetContent" />
    </div>
</template>

<script>
import RoomMemberWidget from './widgets/RoomMemberWidget.vue'
import ChatWidget from './widgets/ChatWidget.vue'
import CallWidget from './widgets/CallWidget.vue'
import MusicWidget from './widgets/MusicWidget.vue'
import YoutubeWidget from './widgets/YoutubeWidget.vue'
import TimerWidget from './widgets/TimerWidget.vue'
import CalendarWidget from './widgets/CalendarWidget.vue'
import ToDoListWidget from './widgets/ToDoListWidget.vue'
import StickyNotesWidget from './widgets/StickyNotesWidget.vue'
import StickerWidget from './widgets/StickerWidget.vue'
import DrawWidget from './widgets/DrawWidget.vue'
import TopOfWidget from './TopOfWidget.vue'

export default {
  components: {
    RoomMemberWidget, 
    ChatWidget, 
    CallWidget,
    MusicWidget,
    YoutubeWidget,
    TimerWidget,
    CalendarWidget,
    ToDoListWidget,
    StickyNotesWidget,
    StickerWidget,
    DrawWidget,
    TopOfWidget},
  props: ["widgetName", "widgetContent","isGroup", "width", "height"],
    data() {
        return {
            containerPosition: { left: 0, top: 0 },
            dimension: {width: this.width, height: this.height},
            isDragging: false,
            offsetX: 0,
            offsetY: 0,
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
    }
};
</script>

<style scoped>
.widget {
  border-radius: 26px;
  background-color: #ececec;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  position: absolute;
}
</style>