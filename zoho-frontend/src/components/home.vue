<template>
    <v-container grid-list-md>
        <v-layout class="justify-space-between">
            <v-subheader v-if="jobs.data.length > 0">Displaying {{ jobs.from }} to {{ jobs.to }} of {{ jobs.total }} jobs.</v-subheader>
            <div v-if="showTrashed === 'delete'" @click="getJobs('/recent/recentJobs/get/archived')" style="cursor: pointer">
                <v-icon class="orange--text icon--x-large">{{ showTrashed }}</v-icon>
            </div>
            <div v-else @click="getJobs(null)" style="cursor: pointer">
                <v-icon class="green--text icon--x-large">{{ showTrashed }}</v-icon>
            </div>
        </v-layout>

        <template v-if="jobs.data.length > 0">
            <v-layout class="mb-3" column>
                <v-flex v-for="(job, index) in jobs.data" :key="index">
                    <v-card @click="loadJob(job.job_id)" hover>
                        <v-card-title class="justify-space-between">
                            <v-layout>
                                <v-flex>
                                    <v-icon class="blue--text icon--x-large">person</v-icon>
                                </v-flex>
                                <v-flex>
                                    <h5>{{ job.first_name }} {{ job.last_name }}</h5>
                                </v-flex>
                                <v-flex class="text-xs-right">
                                    <strong class="grey--text">Created: {{ job.created_at }}</strong>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-actions class="justify-space-between">
                            <v-subheader>
                                <small v-if="job.deleted_at">Archived: {{ job.updated_at }}</small>
                                <small v-else>Last Updated: {{ job.updated_at }}</small>
                            </v-subheader>
                            <div v-if="job.deleted_at" class="d-flex">
                                <div @click.stop="restoreArchived(job.id)">
                                    <v-btn class="hidden-xs-only btn--flat blue--text">Restore</v-btn>
                                    <v-icon class="hidden-sm-and-up mr-5 blue--text icon--x-large">restore</v-icon>
                                </div>
                                <div @click.stop="deleteArchived(job.id)">
                                    <v-btn class="hidden-xs-only btn--flat red--text">Delete</v-btn>
                                    <v-icon class="hidden-sm-and-up red--text icon--x-large">delete_forever
                                    </v-icon>
                                </div>
                            </div>
                            <div v-else @click.stop="archiveJob(job.id)">
                                <v-btn class="hidden-xs-only btn--flat orange--text">Archive</v-btn>
                                <v-icon class="hidden-sm-and-up orange--text icon--x-large">archive</v-icon>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>

            <v-divider></v-divider>

            <v-layout>

                <v-flex class="text-xs-center">
                    <v-btn @click="getJobs(jobs.prev_page_url)"
                           :disabled="jobs.current_page === 1"
                           class="btn--flat">
                        <v-icon class="icon--x-large">fast_rewind</v-icon>
                    </v-btn>
                </v-flex>

                <v-flex>
                    <v-subheader style="justify-content: center">Page {{ jobs.current_page }} of {{ jobs.last_page }}</v-subheader>
                </v-flex>

                <v-flex class="text-xs-center">
                    <v-btn @click="getJobs(jobs.next_page_url)"
                           :disabled="jobs.current_page === jobs.last_page"
                           class="btn--flat">
                        <v-icon class="icon--x-large">fast_forward</v-icon>
                    </v-btn>
                </v-flex>

            </v-layout>
        </template>

        <v-layout v-else>
            <v-flex>
                <h3>{{ jobCount }}</h3>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        created: function () {
            this.getJobs(null);
        },
        computed: {
            jobs () {
                return this.$store.state.recentJobs.jobs;
            },
            jobCount () {
                return this.jobs.data.length > 0 ? '' : 'There Were No Recent Jobs Found';
            },
            showTrashed: {
                get: function () {
                    return this.$store.state.recentJobs.showTrashed;
                },
                set: function (value) {
                    this.$store.commit('showTrashed', value);
                }
            }
        },
        methods: {
            getJobs: function (url) {
                this.$store.dispatch('getRecentJobs', url);
            },
            loadJob: function (jobId) {
                this.$router.push('/account/' + jobId);
            },
            archiveJob: function (id) {
                this.$store.dispatch('archiveRecentJob', id);
            },
            deleteArchived(id) {
                this.$store.dispatch('deleteArchivedJob', id);
            },
            restoreArchived: function (id) {
                this.$store.dispatch('restoreArchivedJob', id);
            }
        }
    }
    //    import axios from 'axios';
    //
    //    const surround = ['DOLBY DIGITAL', 'DTS SURROUND', 'DIRECT', 'PURE DIRECT', 'STEREO', 'MCH STEREO', 'VIRTUAL', 'AUTO'];
    //
    //    const source = ['BD', 'M-XPORT', 'NET/USB'];
    //
    //    let http = axios.create({
    //        baseURL: 'http://192.168.1.11',
    //    });
    //
    //    export default {
    //        data () {
    //            return {
    //                pwr: 'off',
    //                status: null
    //            }
    //        },
    //        methods: {
    //            on: function () {
    //                this.pwr = 'on';
    //                http.get('/MainZone/index.put.asp?cmd0=PutSystem_OnStandby/ON&cmd1=aspMainZone_WebUpdateStatus/').then(response => {
    //                    console.log(response);
    //                })
    //            },
    //            off: function () {
    //                this.pwr = 'off';
    //                http.get('/MainZone/index.put.asp?cmd0=PutSystem_OnStandby/STANDBY&cmd1=aspMainZone_WebUpdateStatus/').then(response => {
    //                    console.log(response);
    //                })
    //            }
    //        }
    //    }
</script>
