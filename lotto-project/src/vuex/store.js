import Vue from 'vue';
import Vuex from 'vuex';
import ui from './ui';
import zone from './zone';
import global from './global';

Vue.use(Vuex);

export const store = new Vuex.Store({
    // strict: true,
    modules: {
        ui, zone, global
    },
    mutations: {
    },
    actions: {
    }
});