export default {
    state: {
        zones: [],
        event_type: ['et1', 'et2', 'et3', 'et4', 'et5'],
        device_type: ['dt1', 'dt2', 'dt3', 'dt4', 'dt5']
    },
    mutations: {
        setEventType (state, payload) {
            state.event_type = payload.event_type;
        },
        setDeviceType (state, payload) {
            state.device_type = payload.device_type;
        },
        setZones (state, payload) {
            state.zones = payload;
        },
        editZone (state, payload) {
            payload.zone.edit = true;
            state.zones.splice(payload.index, 1, payload.zone);
        },
        saveZone (state, payload) {
            state.zones.splice(payload.index, 1, payload.zone);
        },
        addZone (state, payload) {
            state.zones.push(payload.zone);
        },
        deleteZone (state, payload) {
            state.zones.splice(payload.index, 1);
        }
    },
    actions: {
        getZones (context) {
            window.$http.post('/zones/get', {}).then(response => {
                console.log('Get Zones', response);
                if(response.data.length > 0) {
                    context.commit('setZones', response.data);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        saveZone (context, payload) {
            window.$http.post('/zone/create', {zone: payload.zone}).then(response => {
                console.log('Add Zone', response);
                context.commit('saveZone', {index: payload.index,  zone: response.data});
            }).catch(error => {
                console.log(error);
            });
        },
        deleteZone (context, payload) {
            window.$http.post('/zone/archive', {zone: payload.zone}).then(response => {
                console.log('Delete Zone', response);
                if(response.data) {
                    context.commit('deleteZone', {index: payload.index});
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
}