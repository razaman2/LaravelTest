import Vue from 'vue';
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css';
import './stylus/main.styl';
import App from './App.vue';
import router from './router';
import moment from 'moment';
import { store } from './store/store';

Vue.prototype.$moment = moment;
Vue.use(vuetify);
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store: store,
    router: router,
    template: '<App/>',
    components: { App }
});
