export default global = {
  state: {
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
  getters: {
    customerInfo: state => {
      return state;
    }
  },
  mutations: {
    customerInfo: (state, payload) => {
      state.customerInfo = payload;
    }
  }
};
