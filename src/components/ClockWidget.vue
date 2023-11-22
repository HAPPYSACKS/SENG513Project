<template>
    <div id="clock">{{time}}</div>
</template>

<script>
export default {
    data() {
      return {
        time: ''
      };
    },
    methods: {
        updateTime() {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();

            let meridiem = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;

            this.time = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${meridiem}`;
        }
    },
    mounted() {
        setInterval(this.updateTime, 1000);
        this.updateTime();
    }
}
</script>

<style scoped>
    #clock {
        font-size: 24px;
        text-align: center;
    }
</style>