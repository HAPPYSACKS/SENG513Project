<template>
    <div class="widget" :style="{ width: dimension.width + 'px', height: dimension.height + 'px', left: containerPosition.left + 'px', top: containerPosition.top + 'px' }">
        <TopOfWidget :widgetName="widgetName" :widgetType="widgetType" @startDrag="startDrag" @handleDrag="handleDrag" @stopDrag="stopDrag" />
        <!-- INSERT WIDGET CONTENT HERE -->
        <component :is="widgetContent" />
    </div>
</template>

<script>
import TopOfWidget from './TopOfWidget.vue'
import TimerWidget from './TimerWidget.vue'
import MusicWidget from './MusicWidget.vue'

export default {
  components: { TopOfWidget, TimerWidget, MusicWidget},
  props: ["widgetName", "widgetContent","widgetType", "width", "height"],
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