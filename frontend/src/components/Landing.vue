<template>
    <div id="pseudo-body">
        <div id="topbar" class="bg-rounded-light">
            <div class="topbar-wrapper-l"><ClockWidget /></div>
            <div class="topbar-wrapper-r">
                <p>{{ formatDate() }}</p>
                <p>|</p>
                <i id='i-user' class="fa-solid fa-circle-user "></i>
                <i id='i-settings' class="fa-solid fa-gear "></i>
            </div>
        </div>
        <div id="greeting">
            <p>Welcome [[USERNAME]]</p>
        </div>
        <div id="room-join">
            <h1>Join a room</h1>
            <p>Invite code:</p>
            <input type="text" id="inv-code" name="inv-code" placeholder="Enter Code Here">
            <button id="inv-code-enter" @click="$router.push('Room')">JOIN</button>
            <p class="centered-red">Invalid Room ID</p>
        </div>
        <div class="room-host">
            <div id="room-open">
                <h1>My rooms</h1>
                <div class="select-border select-lg">
                    <div class="select-inner-scroller">
                        <div class="select-square"></div>
                        <div class="select-square"></div>
                        <div class="select-square"></div>
                        <div class="select-square"></div>
                        <div class="select-square"></div>
                        <div class="select-square"></div>
                    </div>
                </div>
            </div>
            <div id="room-make">
                <h1>Create a room</h1>
                <div class="select-border select-sm">
                    <div class="select-square plus">
                        <p>+</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ClockWidget from './ClockWidget.vue';
export default {
    name: "LandingPage",
    components: { ClockWidget },
    methods: {
        formatDate() {
            const monthInWords = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ]
            const dayOfWeek =[
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ]
            const date = new Date();
            return `${dayOfWeek[date.getDay()]} ${monthInWords[date.getMonth()]} ${date.getDate()}`;
        }
    }
}
</script>

<style scoped>
#pseudo-body > * {
    position: absolute;
}

* {
    margin: 0px;
}

/*Generic class-based styling*/
.bg-rounded-light {
    background-color: #ececec;
    border-radius: 34px;
}


.bg-rounded-dark {
    background-color: #757575;
    border-radius: 34px;
}

/*Component Positioning, Sizing*/

#topbar {
    width: 95%;
    height: 2.5rem;
    left: 2.5%;
    top: 30px;
    text-align: center;
}

#greeting {
    left: 2.5%;
    top: 120px;
}

#greeting > p {
    font-size: 4em;
    font-weight: 800;
}

#room-join {
    width: 300px;
    left: 2.5%;
    top: 280px;
    font-size: 1.5em;
}

#room-join > * {
    margin: 8px 0px;
}

#room-join > input[type=text] {
    width: 90%;
    height: 3em;
    padding: 0.5em 1.5em;
    border-radius: 34px;
    background-color: #ececec;
    border: none;
}

#inv-code-enter {
    width: 140px;
    height: 3em;
    margin-left: 80px;
    background-color: black;
    color: white;
    border-radius: 34px;
    font-weight: 600;
    cursor: pointer;
}

.centered-red {
    text-align: center;
    font-size: 1rem;
    color: red;
}

.room-host {
    top: 280px;
    left: calc(2.5% + 400px);
    font-size: 1.5em;
}

.select-border {
    background-color: #757575;
    padding: 15px;
    border-radius: 28px;
    margin: 10px 0px;
}

.select-inner-scroller {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    border-radius: 20px;
}

.select-sm {
    max-width: 120px;
    max-height: 140px;
}

.select-lg {
    max-width: 525px;
}

.select-square {
    background-color: #ececec;
    min-width: 120px;
    min-height: 120px;
    border-radius: 20px;
    cursor: pointer;
}

.plus{
    display: flex;
    text-align: center;
    font-size: 4rem;
    align-items: center;
    justify-content: center;
}

.topbar-wrapper-l {
    position: absolute;
    top: 0.3rem;
    left: 20px;
}

.topbar-wrapper-r {
    position: absolute;
    top: 0.63rem;
    right: 20px;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    gap: 1rem;
}

#topbar-wrapper-r > * {
    position: absolute;
    top: 1.25rem;
}

</style>