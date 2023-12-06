<template>
    <textarea v-model="content" type="text" id="sticky-note-text-area" placeholder="Type anything here!" @input="emitUpdateEvent({content: this.content})"></textarea>
</template>

<script>
export default {
    data() {
        return {
            content: ''
        }
    },
    props: {
        data: Object
    },
    methods: {
        emitUpdateEvent(data) {
            const newData = structuredClone(this.data);
            Object.assign(newData, data);  
            this.$emit('update', newData);
        }
    },
    emits: ['update'],
    watch: {
        data: {
            handler(newData, oldData) {
                if(newData.content == oldData.content) this.content = `${newData.content}`;
            }
        }
    }
}
</script>

<style scoped>

#sticky-note-text-area {
    font-family: 'Inter';
    background-color: #cecece;
    border: none;
    width: 250px;
    height: 75px;
}

</style>