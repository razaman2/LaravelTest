import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import {store} from "./store/index"
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify);
Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyCnrtiwq0QlcZRL35XFsQPc2eF_EyhCx_4",
      authDomain: "dev-meetup-889c2.firebaseapp.com",
      databaseURL: "https://dev-meetup-889c2.firebaseio.com",
      projectId: "dev-meetup-889c2",
      storageBucket: "",
    });
  }
});
