<template>
    <div class="container">
        <p style="cursor: default;">Room ID:</p>
        <span v-show="copied">copied!</span>
        <span v-show="!copied">{{ this.data.id }}</span>
        <i @click="copyLink" style="cursor: pointer;" class="fa fa-clone" aria-hidden="true"></i>
        <!-- <p>Other users should copy-paste<br>this into the 'Join' field</p> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            copied: false
        }
    },
    name: 'InviteWidget',
    props: {
        data: Object
    },
    emits: ['update', 'message'],
    methods: {
        copyLink(){
            this.copied = !this.copied
            navigator.clipboard.writeText(this.data.id);
            setTimeout(() => {
                this.copied = !this.copied;
            }, 2000);
        }
    }
}
</script>
<style scoped>
* {
    text-align: center;
    margin:0;
}

.container{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding: 10px 10px 0 10px;
}
</style>