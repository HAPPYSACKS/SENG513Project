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
            if (this.counter >= this.Timeout) {
                counter++;
                setTimeout(this.updateTimer, 1000);
            } else {
                this.$emit('destroy', this.Self)
            }
        }
    }
}
</script>

<style>

</style>