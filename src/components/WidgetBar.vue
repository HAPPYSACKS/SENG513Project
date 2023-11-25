<template>
    <div class="menu">
            <ClockWidget/>
            <div class="widget">
              <div class="left">
                <div class="item">
                  <img @click="showPopup('roomMember')" id="roomMember" src='@/assets/icons/roomMember.png' alt="Room Member List">
                </div>
                <div class="item">
                  <img  @click="showPopup('chat')" id="chat" src='@/assets/icons/chat.png' alt="Chat">
                </div>
                <div class="item">
                  <img src='@/assets/icons/call.png' alt="Call">
                </div>
                <div class="item">
                  <img @click="showPopup('sound')" id="speaker" src='@/assets/icons/speaker.png' alt="Sound">
                </div>
                <div v-show="!iconsActive" @click="toggleMoreWidgets" class="item" id="moreWidget" ref="moreWidgetIcon">
                  <img src="@/assets/icons/widgets.png" alt="More Widgets">
                </div>
                <div class="groupedWidgets" :class="{active: iconsActive }" ref="widgetIcons">
                  <div class="item">
                    <img id="youtube" src='@/assets/icons/youtube.png' alt="YouTube">
                  </div>
                  <div class="item">
                    <img @click="showPopup('timer')" id="timer" src='@/assets/icons/timer.png' alt="Timer">
                  </div>
                  <div class="item">
                    <img id="calendar" src='@/assets/icons/calendar.png' alt="Calendar">
                  </div>
                  <div class="item">
                    <img id="toDoList" src='@/assets/icons/toDoList.png' alt="To Do List">
                  </div>
                  <div class="item">
                    <img id="stickynotes" src='@/assets/icons/stickynotes.png' alt="Sticky Notes">
                  </div>
                  <div class="item">
                    <img id="sticker" src='@/assets/icons/sticker.png' alt="Sticker">
                  </div>
                  <div class="item">
                    <img id="draw" src='@/assets/icons/draw.png' alt="Draw">
                  </div>
                </div>
              </div>
            </div>
            
              <div class="right">
                <div class="divider"></div>
                <div class="item">
                  <img src='@/assets/icons/changeBackground.png' alt="Change Background">
                </div>
                <div class="item">
                  <img src='@/assets/icons/settings.png' alt="Settings">
                </div>
              </div>
        </div>
</template>

<script>
import ClockWidget from './ClockWidget.vue'

export default {
    data(){
      return{
        iconsActive: false
      }
    },
    components: {ClockWidget},
    methods: {
      showPopup(imgID){
        this.$emit('show', imgID)
      },
      toggleMoreWidgets(){
        this.iconsActive = !this.iconsActive
        document.addEventListener('click', this.collapseIconsOnClickOutside);
      },
      collapseIconsOnClickOutside(event) {
        // TO DO:  check for potential bug
        if(!this.$refs.moreWidgetIcon.contains(event.target) && this.iconsActive && !this.$refs.widgetIcons.contains(event.target)){
          this.iconsActive = !this.iconsActive
        }

      }
    }

}
</script>

<style scoped>
    .menu{
        position: absolute;
        bottom: 22px;
        width: 60%;
        transition: width 0.5s ease;
        left: 50%;
        transform: translateX(-50%);
        background-color:#ECECEC;
        border: 1px solid #000;
        height: 50px;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        overflow: hidden;
    }

    .widget{
        display: flex;
        flex-direction: row;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
    }

    .left{
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .right{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    #moreWidget{
      display: inherit;
    }

    .groupedWidgets{
      display: flex;
      overflow: hidden;
      transition: max-width 0.5s ease; /* Add a smooth transition effect */
      max-width: 0; /* Initially hide the icons */
      gap: 10px;
    }

    .groupedWidgets.active{
      max-width: 300px; /* Set the maximum width to show the icons */
    }

    .groupedWidgets.active .item{
      display: block;
    }

    .divider{
        width: 1px;
        height: 30px;
        background-color: black;
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

    @media screen and (max-width: 1100px) {
        .menu{
          width: 90%;
          transition: width 0.5s ease;
        }
    }
    
</style>