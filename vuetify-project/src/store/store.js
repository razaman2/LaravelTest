import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import global from './global';
import techStatus from './techStatus';
import alarmCom from './alarmCom';
import customerInfo from './customerInfo';
import installInfo from './installInfo';
import recentJobs from './recentJobs';

let http = axios.create({baseURL: 'http://192.168.81.102:8000/api'});

http.interceptors.response.use(function (response) {
    if(response.data.error) {
        swal({
            title: 'There was an error with the request.',
            text: response.data.error,
            type: 'error'
        });

        return Promise.reject(response.data.error);
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.request.use(function (config) {
    config.data.companyId = store.getters.global.companyId;
    config.data.userId = store.getters.global.userId;
    config.data.Id = store.getters.global.dealId;
    return config;
}, function (error) {
    return Promise.reject(error);
});

Vue.use(Vuex);

function refreshPage(context) {
    return context.getters.jobs.from === context.getters.jobs.to ?
        context.getters.jobs.previous_page_url !== null ?
            context.getters.jobs.previous_page_url :
            context.getters.jobs.path :
        context.getters.jobs.path + '?page=' + context.getters.jobs.current_page
}

export const store = new Vuex.Store({
    strict: true,
    modules: {
        global: global,
        techStatus: techStatus,
        alarmComServices: alarmCom,
        customerInfo: customerInfo,
        installInfo: installInfo,
        recentJobs: recentJobs
    },
    mutations: {
        deal: (state, payload) => {
            for(let key in state.customerInfo) {
                if(key in payload) {
                    if(payload[key] && payload[key].match(/usa/i)) {
                        payload[key] = 'U.S.A';
                    }
                    state.customerInfo[key] = payload[key];
                }
            }
            for(let key in state.installInfo) {
                if(key in payload) {
                    state.installInfo[key] = payload[key];
                }
            }
            for(let key in state.techStatus) {
                if(key in payload) {
                    state.techStatus[key] = payload[key];
                }
            }
            for(let key in state.alarmComServices) {
                if(key in payload) {
                    state.alarmComServices[key] = payload[key];
                }
            }
        }
    },
    actions: {
        fetchDeal: (context, payload) => {
            if(!payload) {
                swal({
                    title: 'Fetching Deal',
                    text: 'Please wait while we fetch record from crm...',
                    type: 'info',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    onOpen: function () {
                        swal.showLoading();
                    }
                });
            }
            http.post('/deal/get', {}).then(response => {
                console.log('Fetch Deal', response);
                if(response.data.Id.match(context.getters.global.dealId)) {
                    context.commit('deal', response.data);
                    context.dispatch('updateRecentJobs', response.data);
                }
            }).then(() => {
                swal.close();
            }).catch(error => {
                console.log(error);
            });
        },
        updateDeal: (context, payload) => {
            swal({
                title: 'Updating Deal',
                text: 'Please wait while we update record in crm...',
                type: 'info',
                allowOutsideClick: false,
                allowEscapeKey: false,
                onOpen: function () {
                    swal.showLoading();
                }
            });
            http.post('/deal/update', payload).then(response => {
                console.log('Update Deal', response);
                if(response.data[1].code.match(/2001/)) {
                    swal({
                        title: 'Deal Updated',
                        text: 'Record was successfully updated...',
                        type: 'success',
                        useRejections: false,
                        timer: 2000
                    }).then(() => {
                        context.dispatch('fetchDeal', {update: true});
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        },
        dealFields: context => {
            http.post('/deal/getfields', {}).then(response => {
                console.log('Deal Fields', response);
                if(response.data.length > 0) {
                    context.commit('dealFields', response.data);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        getRecentJobs: (context, payload) => {
            swal({
                title: 'Loading Recent Jobs',
                text: 'Please wait while recent jobs are loaded...',
                type: 'info',
                allowOutsideClick: false,
                allowEscapeKey: false,
                onOpen: function () {
                    swal.showLoading();
                }
            });
            http.post((payload) ? payload : '/recent/jobs/get', {}).then(response => {
                console.log('Get Recent Jobs', response);
                if(response.data.total > 0) {
                    context.commit('getRecentJobs', response.data);
                }
            }).then(() => {
                swal.close();
            }).catch(error => {
                console.log(error);
            });
        },
        updateRecentJobs: (context, payload) => {
            http.post('/recent/jobs/update', {job: payload}).then(response => {
                console.log('Update Recent Jobs', response);
            }).catch(error => {
                console.log(error);
            });
        },
        getArchivedJobs: (context, payload) => {
            http.post((payload) ? payload : '/recent/jobs/get/archived', {}).then(response => {
                console.log('Get Archived Jobs', response);
                if(response.data.total > 0) {
                    context.commit('getRecentJobs', response.data);
                }
            }).catch(error => {
                Console.log(error);
            })
        },
        archiveRecentJob: (context, payload) => {
            http.post('/recent/jobs/archive', {id: payload}).then(response => {
                console.log('Archive Recent Job', response);
                if(response.data) {
                    context.dispatch('getRecentJobs', refreshPage(context));
                }
            }).catch(error => {
                console.log(error);
            });
        },
        restoreArchivedJob: (context, payload) => {
            http.post('/recent/jobs/restore/archived', {id: payload}).then(response => {
                console.log('Restore Archived Job', response);
                if(response.data) {
                    context.dispatch('getArchivedJobs', refreshPage(context));
                }
            }).catch(error => {
                console.log(error);
            });
        },
        deleteArchivedJob: (context, payload) => {
            // ask if its ok to permanently delete job, yes or no. if yes then delete, if no then exit.
            http.post('/recent/jobs/delete/archived', {id: payload}).then(response => {
                console.log('Delete Archived Job', response);
                if(response.data) {
                    context.dispatch('getArchivedJobs', refreshPage(context));
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
});
