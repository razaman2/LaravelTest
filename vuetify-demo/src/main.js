import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'vuetify/dist/vuetify.min';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.use(Vuetify);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
