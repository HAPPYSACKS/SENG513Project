<template>
    <div class="card">
        <p class="content">{{ Msg }}</p>
    </div>
</template>

<script>
export default {
    name: 'NotificationCard',
    props: {
        Msg: String,
        Timeout: Number,
        Self: Number,
    },
    data() {
        return {
            counter: 0
        }
    },
    emits: ['destroy'],
    methods: {
        updateTimer() {
            if (this.counter < this.Timeout) {
                this.counter++;
                setTimeout(this.updateTimer, 1000);
            } else {
                this.$emit('destroy', this.Self)
            }
        }
    },
    mounted() {
        this.updateTimer();
    }
}
</script>

<style>
.card {
    width: 330px;
    background-color: #cecece;
    text-align: center;
    border: 1px solid black;
    border-radius: 12px;
}
</style>