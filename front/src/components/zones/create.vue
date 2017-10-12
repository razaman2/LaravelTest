<template>
    <div>
        <zone @done="create" :zone="zone" buttonName="Create"></zone>
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
            create: function (zone) {
                this.$store.dispatch('addZoneToServer', {
                    conn: this.$http,
                    zone: zone
                });
            }
        }
    }
</script>