<template>
    <div class="widget">
        <div id="top">
            <img src='@/assets/icons/move.png' alt="Move">
            <div>─</div>
        </div>
        <!-- <div class="buttons">
            <button @click = "onAmbient">Ambient</button>
            <button @click = "onMusic">Music</button>
        </div> -->
        <div class="soundControl">
            <div>
                <div class="playlistOptions">
                    <button @click = "choosePlaylist('1')">1</button>
                    <button  @click = "choosePlaylist('2')">2</button>
                    <button  @click = "choosePlaylist('3')">3</button>
                </div>
                <iframe style="border-radius:12px" :src="source" width="100%" height="155" frameBorder="0" allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            </div>
            <div class="ambientSliders">
                <VolumeSlider v-for="(sound, index) in labels" :key="index" :label="sound"/>
            </div>
            <!--rain: https://freesound.org/people/Garuda1982/sounds/627272/ -->
            <!--traffic: https://freesound.org/people/dheming/sounds/173410/ -->
            <!-- train: https://freesound.org/people/YOH/sounds/170866/ -->
            <!-- keyboard: https://freesound.org/people/Trollarch2/sounds/331656/ -->
            <!-- campfire: https://freesound.org/people/Dynamicell/sounds/17554/ -->
            <!-- park: https://freesound.org/people/klankbeeld/sounds/193032/ -->
            <!-- people: https://freesound.org/people/bruno.auzet/sounds/527749/ -->
        </div>
    </div>
</template>

<script>
import VolumeSlider from './VolumeSlider.vue'
export default {
    components: {VolumeSlider},
    data(){
        return{
            source:"https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS?utm_source=generator",
            isOnMusic: false,
            isOnAmbient: true,
            sliderValue: 0,
            labels: ['Rain', 'Traffic', 'Keyboard', 'Campfire', 'Train', 'Park', 'People']
        }
    },
    methods: {
        choosePlaylist(button){
            switch(button){
                case '1':
                    this.source = "https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS?utm_source=generator"
                    break
                case '2':
                    this.source = "https://open.spotify.com/embed/playlist/37i9dQZF1DX9RwfGbeGQwP?utm_source=generator"
                    break
                case '3':
                    this.source = "https://open.spotify.com/embed/playlist/37i9dQZF1DWZGf5qyZ9Bl3?utm_source=generator"
                    break
            }
        },
        onMusic(){
            this.isOnMusic = true
            this.isOnAmbient = false
        },
        onAmbient(){
            this.isOnAmbient = true
            this.isOnMusic = false
        }
    }
}
</script>

<style scoped>
    .widget{
        width: 300px;
        height: 300px;
        border-radius: 26px;
        background-color: #ECECEC;
        border: 1px solid #000;
        display: flex;
        flex-direction: column;
    }

    .ambientSliders{
        /* display: inline-block; */
        width: 90%;

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

    .buttons{
        margin: 5px auto 0px;
        display: flex;
        justify-content: space-evenly;
        width: 100%;
    }

    .buttons button{
        width: 90px;
        height: 30px;
        font-family: Inter;
        background-color: hsla(0,0%,100%,.05);
        border: 1px solid black;
        border-radius: 8px;
        cursor: pointer;
    }

    .playlistOptions{
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        margin-bottom: 10px;
    }
    
    .playlistOptions button{
        width: 50px;
        border-radius: 5px;
        cursor:pointer;
    }

    .soundControl{
        width: 95%;
        height: 80%;
        margin:10px auto;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        overflow-y: scroll;
    }

    /* Style the scrollbar */
    .soundControl::-webkit-scrollbar {
      width: 9px; 
    }

    .soundControl::-webkit-scrollbar-thumb {
      background-color: #121212;
      border-radius: 5px;
    }

    .soundControl::-webkit-scrollbar-track {
      background-color: #ddd;
      border-radius: 5px;
    }
</style>

