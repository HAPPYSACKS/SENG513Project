<template>
    <div class="widget-wrapper-full widget-wrapper" v-if="getWidgetStyle(widData.type) == 'full'"
    :style="{ width: dimension.width + 'px', height: dimension.height + 'px', left: containerPosition.left + 'px', top: containerPosition.top + 'px' }">
        <div class="top-bar-full">
            <div>
                <i class="fa-solid fa-arrows-up-down-left-right fa-lg"
                @mousedown="startDrag"></i>
            </div>
            <div>
                <i v-if="widData.isGroup == true" class="fa-solid fa-users fa-lg"></i>
                &nbsp;
                <span>{{widData.name}}</span>
            </div>
            <div>
                <i class="fa-solid fa-minus fa-lg"></i>
                &nbsp;
                <i class="fa-solid fa-xmark fa-lg"
                @click="$emit('delete', widData.id)"></i>
            </div>
        </div>
        <div class="content content-full">
            <component :is="getWidget(widData.type)"></component>
        </div>
    </div>
    <div class="widget-wrapper-compact widget-wrapper" v-if="getWidgetStyle(widData.type) == 'compact'"
    :style="{ width: dimension.width + 'px', height: dimension.height + 'px', left: containerPosition.left + 'px', top: containerPosition.top + 'px' }">
        <div class="content content-compact">
            <component :is="getWidget(widData.type)"></component>
            <div class="bar-compact">
                <i class="fa-solid fa-arrows-up-down-left-right fa-lg"
                @mousedown="startDrag"></i>
                &nbsp;
                <i class="fa-solid fa-minus fa-lg"></i>
                &nbsp;
                <i class="fa-solid fa-xmark fa-lg"
                @click="$emit('delete', widData.id)"></i>
            </div>
        </div>
    </div>
</template>

<script>
import WidgetDefault from './widgets/Default.vue';
import TimerWidget from './widgets/TimerWidget.vue';
export default {
    name: 'FullWidget',
    data() {
        return {
            containerPosition: { left: 30, top: 20 },
            dimension: {width: this.width, height: this.height},
            isDragging: false,
            offsetX: 0,
            offsetY: 0,
            widgets: [
            'RoomMemberWidget',
            'ChatWidget',
            'CallWidget',
            'MusicWidget',
            'YoutubeWidget',
            'TimerWidget',
            'CalendarWidget',
            'ToDoListWidget',
            'StickyNotesWidget',
            'StickerWidget',
            'DrawWidget'
            ],
            compactWidgets: [
                
            ]
        }
    },
    props: {
        widData: Object
    },
    components: {
        // eslint-disable vue/no-unused-components
        WidgetDefault,
        TimerWidget
    },
    emits: ['delete'],
    methods: {
        test() {
            console.log('widget');
        },
        getWidgetStyle(id) {
            let toReturn = ''
            if(this.compactWidgets.includes(id)) {
                toReturn = 'compact';
            } else {
                toReturn = 'full';
            }
            return toReturn;
        },
        getWidget(id) {
            let toReturn = '';
            switch(id) {
                case 'RoomMemberWidget':
                    toReturn = WidgetDefault;
                    break;
                case 'ChatWidget':
                    toReturn = WidgetDefault;
                    break;
                case 'CallWidget':
                    toReturn = WidgetDefault;
                    break;
                case 'MusicWidget':
                    toReturn = WidgetDefault;
                    break;
                case 'YoutubeWidget':
                    toReturn = WidgetDefault;
                    break;
                case 'TimerWidget':
                    toReturn = TimerWidget;
                    break;
                case 'CalendarWidget':
                    toReturn = WidgetDefault;
                    break;
                case 'ToDoListWidget':
                    toReturn = WidgetDefault;
                    break;
                case 'StickyNotesWidget':
                    toReturn = WidgetDefault;
                    break;
                case 'StickerWidget':
                    toReturn = WidgetDefault;
                    break;
                case 'DrawWidget':
                    toReturn = WidgetDefault;
                    break;
                default:
                    toReturn = WidgetDefault;
            }
            return toReturn;
        },
        startDrag(event) {
            this.isDragging = true;
            this.offsetX = event.clientX - this.containerPosition.left;
            this.offsetY = event.clientY - this.containerPosition.top;

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
    },
    
}
</script>

<style>
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");
    .widget-wrapper {
        background-color: #cecece;
    }
    .widget-wrapper-full {
        position: absolute;
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
        position: absolute;
    }
    .content-compact {
        position: relative;
        max-width: fit-content;
    }
</style>