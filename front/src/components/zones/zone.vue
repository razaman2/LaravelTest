<template>
    <div>
        <div class="zone_create">
            <div class="zone_create_row1">
                <div>
                    <label for="zone_id">Zone Id</label>
                    <input id="zone_id" v-model="zone.zone_id" type="number">
                </div>
                <div class="zone_create_checkbox">
                    <div>
                        <label for="tested">Tested</label>
                        <input id="tested" v-model="zone.tested" type="checkbox">
                    </div>
                    <div>
                        <label for="existing">Existing</label>
                        <input id="existing" v-model="zone.existing" type="checkbox">
                    </div>
                </div>
            </div>
            <br><hr><br>
            <div class="zone_create_row2">
                <label for="zone_name">Zone Name</label>
                <input id="zone_name" v-model="zone.zone_name" type="text">
            </div>
            <br><hr><br>
            <div class="zone_create_row3">
                <div>
                    <label for="event_type">Event Type</label>
                    <select id="event_type" v-model="zone.event_type">
                        <option>Burglary</option>
                        <option>Fire</option>
                        <option>Motion</option>
                        <option>Carbon</option>
                        <option>panic</option>
                    </select>
                </div>
                <div>
                    <label for="device_type">Device Type</label>
                    <select id="device_type" v-model="zone.device_type">
                        <option>DSR</option>
                        <option>WSR</option>
                        <option>SMK</option>
                        <option>MOT</option>
                        <option>CBN</option>
                    </select>
                </div>
            </div>
            <br><hr><br>
            <div>
                <input type="button" @click="done" v-model="buttonName">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['buttonName', 'zone'],
        methods: {
            done () {
                this.$emit('done', this.zone);
            }
        }
    }
</script>

<style>
    .zone_create{
        display: flex;
        flex-flow: column;
        border: 1px solid lightgrey;
        padding: 3%;
    }
    .zone_create_row1, .zone_create_row2, .zone_create_row3{
        display: flex;
    }
    .zone_create_checkbox{
        display: flex;
    }
</style>