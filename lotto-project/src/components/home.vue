<template>
    <v-container>
        <v-card>
            <v-toolbar>
                <v-toolbar-side-icon @click="getZones">
                    <v-icon class="green--text">refresh</v-icon>
                </v-toolbar-side-icon>
                <v-toolbar-title>Zonelist</v-toolbar-title>
                <v-content class="text-xs-right">
                    <v-icon>keyboard_arrow_down</v-icon>
                </v-content>
            </v-toolbar>
            <v-container>
                <v-card class="mb-2" hover v-for="(zone,  index) in zones" :key="index">
                    <v-container fluid>
                        <v-content class="text-xs-right blue--text">
                            <small v-if="zone.created_at">Created: {{ zone.created_at }}</small>
                        </v-content>
                        <v-layout class="align-baseline">
                            <v-checkbox v-model="zone.existing"></v-checkbox>
                            <v-text-field label="Zone Number" mask="##" v-model="zone.zone_number"></v-text-field>
                            <v-text-field label="Zone Name" v-model="zone.zone_name"></v-text-field>
                            <v-icon :class="zone.tested ? 'green--text' : 'red--text'">check_circle</v-icon>
                        </v-layout>
                        <v-layout>
                            <v-select :items="eventType" label="Event Type" v-model="zone.event_type"></v-select>
                            <v-select :items="deviceType" label="Device Type" v-model="zone.device_type"></v-select>
                        </v-layout>
                    </v-container>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-subheader v-if="zone.updated_at">Updated: {{ zone.updated_at }}</v-subheader>
                        <v-content class="text-xs-right">
                            <template v-if="!zone.edit && zone.id">
                                <v-btn flat class="blue--text" @click="edit(index)">edit</v-btn>
                                <v-btn flat class="red--text" @click="destroy(index)">delete</v-btn>
                            </template>
                            <v-btn flat class="green--text" v-else @click="save(index)">save</v-btn>
                        </v-content>
                    </v-card-actions>
                </v-card>
            </v-container>
            <v-card-actions>
                <v-content class="text-xs-right">
                    <v-btn flat class="green--text" large @click="create">create</v-btn>
                </v-content>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        created () {
            this.getZones();
        },
        computed: {
            zones () {
                return this.$store.state.zone.zones;
            },
            eventType () {
                return this.$store.state.zone.event_type;
            },
            deviceType () {
                return this.$store.state.zone.device_type;
            }
        },
        methods: {
            save (index) {
                this.$store.dispatch('saveZone', {index, zone: this.zones[index]})
            },
            edit (index) {
                this.$store.commit('editZone', {index, zone: this.zones[index]})
            },
            destroy (index) {
                this.$store.dispatch('deleteZone', {index, zone: this.zones[index]})
            },
            create () {
                let zone = {
                    existing: false,
                    tested: false,
                    zone_number: null,
                    zone_name: null,
                    event_type: null,
                    device_type: null,
                };
                this.$store.commit('addZone', {zone});
            },
            getZones () {
                this.$store.dispatch('getZones');
            }
        }
    }
</script>
