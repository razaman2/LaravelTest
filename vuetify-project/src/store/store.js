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

const http = axios.create({baseURL: 'http://192.168.81.102:8000/api'});

http.interceptors.response.use(response => {
    if(response.data.error) {
        swal({
            title: 'There was an error with the request.',
            text: response.data.error,
            type: 'error'
        });

        return Promise.reject(response.data.error);
    }
    return response;
}, error => {
    return Promise.reject(error);
});

http.interceptors.request.use(config => {
    config.data.companyId = store.getters.global.companyId;
    config.data.userId = store.getters.global.userId;
    config.data.Id = store.getters.global.dealId;
    config.data.clientTime = new Date().toLocaleString();
    return config;
}, error => {
    return Promise.reject(error);
});

function refreshPage(context) {
    if(context.state.recentJobs.jobs.from === context.state.recentJobs.jobs.to) {
        return context.state.recentJobs.jobs.prev_page_url;
    } else {
        return context.state.recentJobs.jobs.path + '?page=' + context.state.recentJobs.jobs.current_page;
    }
}

Vue.use(Vuex);

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
            http.post((payload) ? payload : '/recent/recentJobs/get', {}).then(response => {
                console.log('Get Recent Jobs', response);
                if(response.data.total >= 0) {
                    if(response.data.path.match(/get\/archived/) && response.data.total > 0) {
                        context.commit('getRecentJobs', response.data);
                        context.commit('showTrashed', 'arrow_back');
                    } else if(response.data.path.match(/get\/archived/) && response.data.total === 0) {
                    } else {
                        context.commit('getRecentJobs', response.data);
                        context.commit('showTrashed', 'delete');
                    }
                }
            }).then(() => {
                swal.close();
            }).catch(error => {
                console.log(error);
            });
        },
        updateRecentJobs: (context, payload) => {
            http.post('/recent/recentJobs/update', {job: payload}).then(response => {
                console.log('Update Recent Jobs', response);
            }).catch(error => {
                console.log(error);
            });
        },
        archiveRecentJob: (context, payload) => {
            http.post('/recent/recentJobs/archive', {id: payload}).then(response => {
                console.log('Archive Recent Job', response);
                if(response.data) {
                    context.dispatch('getRecentJobs', refreshPage(context));
                }
            }).catch(error => {
                console.log(error);
            });
        },
        restoreArchivedJob: (context, payload) => {
            http.post('/recent/recentJobs/restore/archived', {id: payload}).then(response => {
                console.log('Restore Archived Job', response);
                if(response.data) {
                    context.dispatch('getRecentJobs', refreshPage(context));
                }
            }).catch(error => {
                console.log(error);
            });
        },
        deleteArchivedJob: (context, payload) => {
            swal({
                title: 'Delete Recent Job?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(function () {
                http.post('/recent/recentJobs/delete/archived', {id: payload}).then(response => {
                    console.log('Delete Archived Job', response);
                    if(response.data) {
                        swal({
                            title: 'Deleted Recent Job',
                            text: 'Record was successfully deleted...',
                            type: 'success',
                            useRejections: false,
                            timer: 2000
                        }).then(() => {
                            context.dispatch('getRecentJobs', refreshPage(context));
                        });
                    }
                }).catch(error => {
                    console.log(error);
                });
            });
        }
    }
});
