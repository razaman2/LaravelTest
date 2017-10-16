export default global = {
  state: {
    notOnSite: true,
    'Tech In Route': null,
    'Tech Arrival': null,
    'Tech Complete': null
  },
  getters: {
    techStatus: state => {
      return state;
    }
  }
};
