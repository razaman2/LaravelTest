import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  state: {
    global: {
      dealFields: null,
      rules: {
        required: (v) => !!v || 'this field is required',
        zip: (v) => {
          if (v && v.length > 0){
            return /^\d{5}$/.test(v) || 'zipcode is invalid';
          }
          return true;
        },
        phone: (v) => {
          if(v && v.length > 0){
            return /^\d{10}$/.test(v.replace(/\D/g, '')) || 'phone number is invalid';
          }
          return true;
        },
        passcode: (v) => {
          if(v && v.length > 0){
            return /^\d{5,10}$/.test(v) || 'passcode is invalid';
          }
          return true;
        },
        validate: function (form) {
          let data = [];
          if(form.$refs.form.validate()) {
            this.formStatus = true;
            let inputs = form.$refs.form.inputs;
            for(let input in inputs) {
              let label = inputs[input].label ? inputs[input].label:input;
              data[label] = inputs[input].inputValue;
            }
            console.log('Form Validation', form.$refs.form, data);
          }
        }
      }
    },
    techStatus: {
      notOnSite: true,
      'Tech In Route': null,
      'Tech Arrival': null,
      'Tech Complete': null
    },
    customerInfo: {
      'First Name': '',
      'Last Name': '',
      'Contact Phone': '',
      Address: '',
      'Address 2': '',
      City: '',
      State: '',
      Province: '',
      Zip: '',
      Postal: '',
      County: '',
      Country: ''
    },
    installInfo: {
      'Monitoring Level': '',
      'Package Type': '',
      'Monitoring Center': '',
      'Panel Type': '',
      Codeword: '',
      'Panel Phone': '',
      'Panel Location': '',
      'Transformer Location': '',
      'Cross Street': '',
      'Two Way Voice': '',
      'ADC Video': '',
      'Skybell Only': '',
    }
  },
  getters: {
    global: state => {
      return state.global;
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
    },
    dealFields: (state, payload) => {
      state.global.dealFields = payload;
    }
  },
  actions: {
    fetchDeal: (context, payload) => {
      payload.$http.post('/deal/get', payload.$route.params).then(response => {
        console.log('Fetch Deal', response);
        if(response.data.Id.match(payload.$route.params.id)) {
          context.commit('deal', response.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    updateDeal: (context, payload) => {
      payload.value.Id = payload.obj.$route.params.id;
      payload.obj.$http.post('/deal/update', {deal: payload.value}).then(response => {
        console.log('Update Deal', response);
        if(response.data[1].code.match('2001')) {
          context.dispatch('fetchDeal', payload.obj);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    dealFields: (context, payload) => {
      payload.$http.post('/deal/getfields').then(response => {
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
