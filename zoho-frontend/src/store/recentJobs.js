export default global = {
    state: {
        jobs: {
            data: []
        },
        showTrashed: null
    },
    mutations: {
        getRecentJobs: (state, payload) => {
            state.jobs = payload;
        },
        showTrashed: (state, payload) => {
            state.showTrashed = payload;
        }
    }
};