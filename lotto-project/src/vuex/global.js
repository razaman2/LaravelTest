export default {
    state: {
        companyId: '0000000000000000000',
        userId: '1111111111111111111',
        jobId: '2222222222222222222'
    },
    getters: {
        clientTime () {
            return window.$moment().format('YYYY-MM-DD HH:mm:ss');
        }
    }
}