export default global = {
    state: {
        drawerOpen: false
    },
    mutations: {
        drawerOpen: (state, payload) => {
            state.drawerOpen = payload;
        }
    }
};