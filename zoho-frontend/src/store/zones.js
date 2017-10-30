export default {
    state: {
        phoneMask: '(###) ###-####',
        phone: null
    },
    mutations: {
        phone: (state, payload) => {
            state.phone = payload;
        }
    }
}