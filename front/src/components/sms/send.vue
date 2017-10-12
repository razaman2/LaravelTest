<template>
    <div>
        <div>
            <input v-model="recipient" type="number">
        </div>
        <hr>
        <textarea v-model="body" cols="30" rows="10"></textarea>
        <div>
            <input type="button" value="send" v-on:click="send">
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                recipient: '',
                body: '',
            }
        },
        methods: {
            send () {
                this.$http.get('api/sms/send/' + this.recipient + '/' + this.body).then(response => {
                    console.log(response);
                });
            }
        }
    }
</script>