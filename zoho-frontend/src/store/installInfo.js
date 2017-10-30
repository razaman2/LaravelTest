export default global = {
  state: {
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
  },
  getters: {
    installInfo: state => {
      return state;
    }
  },
};
