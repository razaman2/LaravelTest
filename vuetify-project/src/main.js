import Vue from 'vue';
import Vuetify from 'vuetify';
import './stylus/main.styl';
import App from './App.vue';
import router from './router';
import moment from 'moment';
import { store } from './store/store';

Vue.prototype.$moment = moment;
Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store: store,
  router: router,
  template: '<App/>',
  components: { App }
});
