<template>
    <div>
        <div v-for="zone in zones">
            <zone v-on:done="selected" :zone="zone" buttonName="select"></zone>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            zone: require('../zones/zone.vue')
        },
        computed: {
            zones () {
                return this.$store.getters.getZones;
            }
        },
        created: function () {
            this.$store.dispatch('getZonesFromServer', this.$http);
        },
        methods: {
            selected (zone) {
                this.$emit('done', this.zone);
            }
        }
    }
</script>