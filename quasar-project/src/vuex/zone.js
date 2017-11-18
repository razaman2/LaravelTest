export default {
	state: {
		zones: [],
		event_type: [{label: 'et1', value: 'et1'}, {label: 'et2', value: 'et2'}, {label: 'et3', value: 'et3'}, {label: 'et4', value: 'et4'}, {label: 'et5', value: 'et5'}],
		device_type: [{label: 'dt1', value: 'dt1'}, {label: 'dt2', value: 'dt2'}, {label: 'dt3', value: 'dt3'}, {label: 'dt4', value: 'dt4'}, {label: 'dt5', value: 'dt5'}]
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
			http.post('/zones/get/all', {}).then(response => {
				console.log('Get Zones', response);
				if(response.data.length > 0) {
					context.commit('setZones', response.data);
				}
			}).catch(error => {
				console.log(error);
			});
		},

		saveZone (context, payload) {
			http.post('/zone/create', {zone: payload.zone}).then(response => {
				console.log('Add Zone', response);
				context.commit('saveZone', {index: payload.index,  zone: response.data});
			}).catch(error => {
				console.log(error);
			});
		},

		deleteZone (context, payload) {
			swal({
				title: 'Delete, ' + payload.zone.zone_name + '?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then(function () {
				http.post('/zone/archive', {zone: payload.zone}).then(response => {
					console.log('Delete Zone', response);
					if(response.data) {
						swal({
							title: 'Deleted Zone',
							text: payload.zone.zone_name + ', was successfully deleted...',
							type: 'success',
							useRejections: false,
							timer: 2000
						}).then(() => {
							context.commit('deleteZone', {index: payload.index});
						});
					}
				}).catch(error => {
					console.log(error);
				});
			});
		}
	}
}