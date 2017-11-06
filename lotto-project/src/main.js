import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'sweetalert2/dist/sweetalert2.all.min';
import { store } from './vuex/store';
import 'vuetify/dist/vuetify.min.css';
import 'vuetify/dist/vuetify.min';
import './stylus/main.styl';
import './stylus/theme.styl';
import router from './router';

Window.prototype.swal = swal;
Window.prototype.moment = moment;
Window.prototype.http = axios.create({baseURL: 'http://192.168.81.102:8000/api'});

Vue.use(Vuetify);

http.interceptors.response.use(response => {
    if(response.data.error) {
        swal({
            title: 'There was an error with the request.',
            text: response.data.error,
            type: 'error'
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

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
