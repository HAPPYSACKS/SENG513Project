<template>
    <div class="widget-wrapper-full widget-wrapper" ref="widget" v-if="getWidgetStyle(widData.type) == 'full'">
        <div class="top-bar-full">
            <div>
                <i class="fa-solid fa-arrows-up-down-left-right fa-lg" @click="test()"></i>
            </div>
            <div>
                <i v-if="widData.isGroup == true" class="fa-solid fa-users fa-lg"></i>
                &nbsp;
                <span>{{widData.name}}</span>
            </div>
            <div>
                <i class="fa-solid fa-minus fa-lg"></i>
                &nbsp;
                <i class="fa-solid fa-xmark fa-lg"></i>
            </div>
        </div>
        <div class="content content-full">
            <component :is="getWidget(widData.type)"></component>
        </div>
    </div>
    <div class="widget-wrapper-compact widget-wrapper" ref="widget" v-if="getWidgetStyle(widData.type) == 'compact'">
        <div class="content content-compact">
            <component :is="getWidget(widData.type)"></component>
            <div class="bar-compact">
                <i class="fa-solid fa-arrows-up-down-left-right fa-lg"></i>
                &nbsp;
                <i class="fa-solid fa-minus fa-lg"></i>
                &nbsp;
                <i class="fa-solid fa-xmark fa-lg"></i>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import WidgetDefault from './widgets/Default.vue';
import TimerWidget from './TimerWidget.vue';
export default {
    name: 'FullWidget',
    data() {
        return {
            posX: 20,
            posY: 30,
            dragObject: {
                offsetX: 0,
                offsetY: 0,
                stillDown: false
            }
        }
    },
    props: {
        widData: Object
    },
    components: {
        // eslint-disable-next-line vue/no-unused-components
        WidgetDefault,
        // eslint-disable-next-line vue/no-unused-components
        TimerWidget
    },
    methods: {
        test() {
            console.log('widget');
        },
        getWidgetStyle(id) {
            let toReturn = ''
            if([4].includes(id)) {
                toReturn = 'compact';
            } else {
                toReturn = 'full';
            }
            return toReturn;
        },
        getWidget(id) {
            let toReturn = '';
            switch(id) {
                case 1:
                    toReturn = TimerWidget;
                    break;
                default:
                    toReturn = WidgetDefault;
            }
            return toReturn;
        },
        dragWidget(e) {
            console.log('a');
            const widget = ref();
            const mouseX = e.pageX;
            const mouseY = e.pageY;
            if(this.dragObject.stillDown) {
                widget.value.style.left = mouseX - this.dragObject.offsetX;
                widget.value.style.top = mouseY - this.dragObject.offsetY;
            } else {
                this.dragObject.offsetX = mouseX - this.dragObject.offsetX;
                this.dragObject.offsetY = mouseY - this.dragObject.offsetY;
                this.dragObject.stillDown = true;
            }
        },
        dragWidgetStop() {
            this.dragObject.stillDown = false;
        }
    },
}
</script>

<style>
    @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");
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
    .content-compact {
        position: relative;
        max-width: fit-content;
    }
</style>