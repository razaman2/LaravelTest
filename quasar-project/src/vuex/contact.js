export default {
	state: {
		showForm: false,
		contacts: [],
		selects: {
			auth: [],
			ctactype: [],
			relation: [],
			phonetype: [],
		},
	},
	mutations: {
		setContacts (state, payload) {
			state.contacts = payload.contacts;
		},

		setSelects (state, payload) {
			for(let key in payload.selects) {
				payload.selects[key].Table.forEach(function (item) {
					state.selects[key].push(Object.assign({}, {label: item.descr.trim(), value: item[key+'_id'].trim()}));
				});
			}
		},

		showForm (state, payload) {
			state.showForm = payload;
		}
	},
	actions: {
		getContacts: context => {
			http.post('/contacts/get/all', {}).then(response => {
				console.log('Get Contacts', response);
				if(response.data.length >= 0) {
					context.commit('setContacts', {contacts: response.data});
				}
			}).catch(error => {
				console.log(new Error(error));
			});
		},

		getSelects: context => {
			http.post('/contacts/get/selects', {}).then(response => {
				console.log('Get Selects', response);
				context.commit('setSelects', {selects: response.data});
			}).catch(error => {
				console.log(new Error(error));
			});
		},

		deleteContact: (context, payload) => {
			http.post('/contact/archive', {contact: payload.contact}).then(response => {
				console.log('Delete Contact', response);
				if(/1/.test(response.data)) {
					context.dispatch('getContacts');
				}
			}).catch(error => {
				console.log(new Error(error));
			});
		},

		saveContact: (context, payload) => {
			return new Promise((resolve, reject) => {
				http.post('/contact/create', {contact: payload.contact}).then(response => {
					console.log('Save Contact', response);
					if(response.data.hasOwnProperty('id')) {
						resolve(response.data);
						context.dispatch('getContacts');
					}
				}).catch(error => {
					reject(new Error(error));
				});
			});
		}
	}
}