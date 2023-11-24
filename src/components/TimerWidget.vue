<template>
    <div class="widget">
        <div id="top">
            <img src='@/assets/icons/move.png' alt="Move">
            <div>─</div>
        </div>

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
export default {
    data(){
        return{
            timeLeft: 9,
            isCountingDown: false
        }
    },
    methods:{
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
    #top{
        margin: 15px 25px 0px 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between ;
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
        
    }
</style>