// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`);
// ==============================

// Uncomment the following lines if you need IE11/Edge support
require(`quasar/dist/quasar.ie`);
require(`quasar/dist/quasar.ie.${__THEME}.css`);

import Vue from 'vue';
import Quasar, * as All from 'quasar';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Quasar, {
	components: All,
	directives: All}
); // Install Quasar Framework

if (__THEME === 'mat') {
	require('quasar-extras/roboto-font');
}
import 'quasar-extras/material-icons';
import 'quasar-extras/ionicons';
import 'quasar-extras/fontawesome';
import 'quasar-extras/animate';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'sweetalert2/dist/sweetalert2.all.min';
import { store } from './vuex/store';
import filters from './filters/filters';

Window.prototype.swal = swal;
Window.prototype.moment = moment;
Window.prototype.http = axios.create({
	baseURL: 'http://192.168.1.102:8000/api'
	// baseURL: 'http://192.168.123.107:8000/api'
});

http.interceptors.response.use(response => {
	if(response.data.error) {
		swal({
			title: 'There was an error with the request.',
			text: response.data.error,
			type: 'error',
		});
		return Promise.reject(response.data.error);
	}
	return response;
}, error => {
	return Promise.reject(error);
});

http.interceptors.request.use(config => {
	config.data.companyId = store.state.global.companyId;
	config.data.userId = store.state.global.userId;
	config.data.jobId = store.state.global.jobId;
	config.data.clientTime = moment().format('YYYY-MM-DD HH:mm:ss');
	return config;
});

Quasar.start(() => {
	/* eslint-disable no-new */
	new Vue({
		el: '#q-app',
		router, store,
		filters: filters,
		render: h => h(require('./App').default),
	});
});
