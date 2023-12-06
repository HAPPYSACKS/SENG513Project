<template>
    <h3>Room ID:</h3>
    <h3>{{ this.data.id }}</h3>
    <p>Other users should copy-paste<br>this into the 'Join' field</p>
</template>

<script>
export default {
    name: 'InviteWidget',
    props: {
        data: Object
    },
    emits: ['update', 'message']
}
</script>
<style scoped>
* {
    text-align: center;
}
</style>