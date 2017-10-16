import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import global from './global';
import techStatus from './techStatus';
import alarmCom from './alarmCom';
import customerInfo from './customerInfo';
import installInfo from './installInfo';

let http = axios.create({baseURL: 'http://localhost:8000/api'});

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    global: global,
    techStatus: techStatus,
    alarmComServices: alarmCom,
    customerInfo: customerInfo,
    installInfo: installInfo
  },
  mutations: {
    deal: (state, payload) => {
      for(let key in state.customerInfo) {
        if(key in payload) {
          if(payload[key].match(/usa/i)) {
            payload[key] = 'U.S.A';
          }
          state.customerInfo[key] = payload[key];
        }
      }
      for(let key in state.installInfo) {
        if(key in payload) {
          state.installInfo[key] = payload[key];
        }
      }
      for(let key in state.techStatus) {
        if(key in payload) {
          state.techStatus[key] = payload[key];
        }
      }
      for(let key in state.alarmComServices) {
        if(key in payload) {
          state.alarmComServices[key] = payload[key];
        }
      }
    }
  },
  actions: {
    fetchDeal: (context, payload) => {
      if(!payload.update) {
        swal({
          title: 'Fetching Deal',
          text: 'Please wait while we fetch record from crm...',
          type: 'info',
          allowOutsideClick: false,
          allowEscapeKey: false,
          onOpen: function () {
            swal.showLoading();
          }
        });
      }
      http.post('/deal/get', payload).then(response => {
        console.log('Fetch Deal', response);
        if(response.data.Id === payload.id) {
          context.commit('deal', response.data);
        }
        swal.close();
      }).catch(error => {
        console.log(error);
      });
    },
    updateDeal: (context, payload) => {
      swal({
        title: 'Updating Deal',
        text: 'Please wait while we update record in crm...',
        type: 'info',
        allowOutsideClick: false,
        allowEscapeKey: false,
        onOpen: function () {
          swal.showLoading();
        }
      });
      http.post('/deal/update', payload).then(response => {
        console.log('Update Deal', response);
        if(response.data[1].code.match('2001')) {
          swal({
            title: 'Deal Updated',
            text: 'Record was successfully updated...',
            type: 'success',
            useRejections: false,
            timer: 2000
          });
          context.dispatch('fetchDeal', {companyId: context.getters.global.companyId, id: context.getters.global.dealId, update: true});
        }
      }).catch(error => {
        console.log(error);
      });
    },
    dealFields: (context, payload) => {
      http.post('/deal/getfields', payload).then(response => {
        console.log('Deal Fields', response);
        if(response.data.length > 0) {
          context.commit('dealFields', response.data);
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }
});
