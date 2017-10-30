export default global = {
  state: {
    'ADC Serial Number': null,
    'ADC Customer Id': null,
    username: null,
    password: null
  },
  getters: {
    alarmComServices: state => {
      return state;
    }
  },
  mutations: {
    updateADC: (state, payload) => {
      state.alarmComServices['ADC Serial Number'] = payload;
    }
  },
  actions: {
    updateADC: (context, payload) => {
      context.commit('updateADC', payload);
    }
  }
};
