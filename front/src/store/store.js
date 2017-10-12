import Vue from 'vue';
import Vuex from 'vuex';
import swal from 'sweetalert';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        zones: []
    },
    getters: {
        getZones (state) {
            return state.zones;
        },
        getZone (state) {
            return null;
        }
    },
    mutations: {
        updateZones (state, zones) {
            state.zones = zones;
        },
        addZone (state, zone) {
            state.zones.push(zone);
        },
        updateZone (state, zone) {
            $index = state.zones.indexOf(zone);
            state.zones.splice(index, 1, zone);
        },
        deleteZone (state, zone) {
            $index = state.zones.indexOf(zone);
            state.zones.splice(index, 1);
        }
    },
    actions: {
        addZoneToServer (context, payload) {
            payload.conn.post('api/zones/', payload.zone).then(response => {
                console.log(response);
                if(response.body !== false) {
                    swal(
                        'Created!',
                        payload.zone.zone_name + ', has been created.',
                        'success'
                    );

                    context.commit('addZone', response.body);
                }
                else
                    swal(
                        'Not Created!',
                        payload.zone.zone_name + ', was not created.',
                        'error'
                    );
            });
        },
        deleteZone (zone) {
            this.$http.delete('api/zones/' + zone.id).then(response => {
                this.$emit('zoneDeleted', response);
            });
        },
        updateZoneOnServer (zone) {
            this.$http.put('api/zones/' + zone.id, zone).then(response => {
                this.$emit('zoneUpdated', response);
            });
        },
        getZonesFromServer (context, conn) {
            conn.get('api/zones/').then(response => {
                console.log(response);
                context.commit('updateZones', response.body);
            });
        },
        getZone (zone) {
            this.$http.get('api/zones/' + zone.id).then(response => {
                this.$emit('zoneReceived', response);
            });
        }
    }
});

export default store;