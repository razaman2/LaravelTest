import axios from 'axios';

let http = axios.create({baseURL: 'http://localhost:8000/api'});

export default global = {
  state: {
    dealFields: null,
    dealId: null,
    companyId: null,
    rules: {
      required: (v) => {
        if(v && v.match(/none/i)) {
          return 'none is not a valid value';
        }
        return !!v || 'this field is required';
      },
      zip: (v) => {
        if (v && v.length > 0) {
          return /^\d{5}$/.test(v) || 'zipcode is invalid';
        }
        return true;
      },
      phone: (v) => {
        if(v && v.length > 0) {
          return /^\d{10}$/.test(v.replace(/\D/g, '')) || 'phone number is invalid';
        }
        return true;
      },
      passcode: (v) => {
        if(v && v.length > 0) {
          return /^\d{5,10}$/.test(v) || 'passcode is invalid';
        }
        return true;
      },
      adcSerial: (v) => {
        if(v) {
          return /^\d{15}$/.test(v) || 'invalid serial#, must be 15 digits';
        }
      },
      adcId: (v) => {
        if(v) {
          return /^\d{5}$/.test(v) || 'customer id is invalid';
        }
      },
      validate: (form) => {
        let data = {};
        if(form.$refs.form.validate()) {
          this.formStatus = true;
          let inputs = form.$refs.form.inputs;
          for(let input in inputs) {
            data[inputs[input].$attrs.name] = inputs[input].inputValue;
          }
          console.log('Form Validation', form.$refs.form, data);
          return data;
        }
        return false;
      }
    }
  },
  getters: {
    global: state => {
      return state;
    }
  },
  mutations: {
    dealFields: (state, payload) => {
      state.dealFields = payload;
    },
    updateDealId: (state, payload) => {
      state.dealId = payload;
    },
    updateCompanyId: (state, payload) => {
      state.companyId = payload;
    }
  },
  actions: {
    dealFields: (context, payload) => {
      http.post('/deal/getfields', payload).then(response => {
        console.log('Deal Fields', response);
        if(response.data.length > 0) {
          context.commit('dealFields', response.data);
        }
      }).catch(error => {
        console.log(error);
      });
    },
    updateDealId: (context, payload) => {
      context.commit('updateDealId', payload);
    },
    updateCompanyId: (context, payload) => {
      context.commit('updateCompanyId', payload);
    }
  }
};
