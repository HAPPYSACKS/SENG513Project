<template>
    <div class="widget" :style="{ left: containerPosition.left + 'px', top: containerPosition.top + 'px' }">
        <TopOfWidget :widgetType="widgetType" @startDrag="startDrag" @handleDrag="handleDrag" @stopDrag="stopDrag" />
        <div>
            <span>{{timeLeft}}</span>
        </div>

        <div id="buttons">
            <button @click="startOrStopTimer">Start/Stop</button>
            <button @click="resetTimer" class="reset">Reset</button>
        </div>

    </div>
</template>

<script>
import TopOfWidget from './TopOfWidget.vue'
export default {
    components: {TopOfWidget},
    props:["widgetType"],
    data(){
        return{
            timeLeft: 9,
            isCountingDown: false,
            containerPosition: { left: 0, top: 0 },
            isDragging: false,
            offsetX: 0,
            offsetY: 0,
        }
    },
    methods:{
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

        startOrStopTimer(){
            this.isCountingDown = !this.isCountingDown
            if (this.isCountingDown){
                this.updateTimer()
            }
        },
        updateTimer(){
            let timerID
            if(this.timeLeft > 0 && this.isCountingDown){
                this.timeLeft--
                timerID = setTimeout(this.updateTimer, 1000)
            } else{
                clearTimeout(timerID)
            }
        },
        resetTimer(){
            this.isCountingDown = false;
            this.timeLeft = 9
        }
    }
}
</script>

<style scoped>
    .reset{
        background-color: #ECECEC;
        color: #757575;
        border: 3px solid #757575;
    }

    button{
        padding: 5px;
        font-family: inter;
        color: white;
        font-size: 18px;
        border-radius: 10px;
        background: #757575;
        border:0;
    }
    #buttons{
        display: flex;
        justify-content: space-evenly;
    }
    span{
        margin-top:-8px;
        font-size: 65px;
        display: flex;
        justify-content: center;
    }
    img{
        width: 25px;
    }
    .widget{
        width: 300px;
        height: 170px;
        border-radius: 26px;
        background-color: #ECECEC;
        border: 1px solid #000;
        display: flex;
        flex-direction: column;
        position: absolute;
    }
</style>