<template>
    <div>
        <zone @done="update" :zone="zone" buttonName="Update"></zone>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                zone: {}
            }
        },
        components: {
            zone: require('./zone.vue')
        },
        methods: {
            update: function (zone) {
                this.$store.dispatch('updateZoneOnServer', {
                    conn: this.$http,
                    zone: zone
                });
            }
        }
    }
</script>