import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import global from './global';

let http = axios.create({baseURL: 'http://localhost:8000/api'});

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    global: global
  },
  state: {
    alarmComServices: {
      'ADC Serial Number': null,
      'ADC Customer Id': null,
      username: null,
      password: null
    },
    techStatus: {
      notOnSite: true,
      'Tech In Route': null,
      'Tech Arrival': null,
      'Tech Complete': null
    },
    customerInfo: {
      'First Name': null,
      'Last Name': null,
      'Contact Phone': null,
      Address: null,
      'Address 2': null,
      City: null,
      State: null,
      Province: null,
      Zip: null,
      Postal: null,
      County: null,
      Country: null
    },
    installInfo: {
      'Monitoring Level': null,
      'Package Type': null,
      'Monitoring Center': null,
      'Panel Type': null,
      Codeword: null,
      'Panel Phone': null,
      'Panel Location': null,
      'Transformer Location': null,
      'Cross Street': null,
      'Two Way Voice': null,
      'ADC Video': null,
      'Skybell Only': null,
    }
  },
  getters: {
    alarmComServices: state => {
      return state.alarmComServices;
    },
    techStatus: state => {
      return state.techStatus;
    },
    customerInfo: state => {
      return state.customerInfo;
    },
    installInfo: state => {
      return state.installInfo;
    },
    dealPicklists: state => {
      let fields = {};
      for(let field in state.global.dealFields) {
        if(state.global.dealFields[field].type === 'Pick List') {
          fields[state.global.dealFields[field].label] = state.global.dealFields[field].options;
        }
      }
      return fields;
    }
  },
  mutations: {
    customerInfo: (state, payload) => {
      state.customerInfo = payload;
    },
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
    },
    updateADC: (state, payload) => {
      state.alarmComServices['ADC Serial Number'] = payload;
    }
  },
  actions: {
    fetchDeal: (context, payload) => {
      if(!payload.update) {
        swal({
          title: 'Fetching Deal',
          text: 'Please wait while we fetch record from crm...',
          type: 'info',
          useRejections: false,
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
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 2000
          });
          context.dispatch('fetchDeal', {companyId: context.getters.global.companyId, id: context.getters.global.dealId, update: true});
        }
      }).catch(error => {
        console.log(error);
      });
    },
    updateADC: (context, payload) => {
      context.commit('updateADC', payload);
    }
  }
});
