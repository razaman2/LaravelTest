import Vue from 'vue';
import Vuetify from 'vuetify';
import './stylus/main.styl';
import App from './App.vue';
import router from './router';
import {store} from './store/store';
import axios from 'axios';
import moment from 'moment';

Vue.prototype.$moment = moment;

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:8000/api'
});

Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store: store,
  router: router,
  template: '<App/>',
  components: { App }
});
