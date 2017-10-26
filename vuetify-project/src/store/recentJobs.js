export default global = {
    state: {
        jobs: {}
    },
    getters: {
        jobs: state => {
            return state.jobs;
        }
    },
    mutations: {
        getRecentJobs: (state, payload) => {
            state.jobs = payload;
        }
    }
};