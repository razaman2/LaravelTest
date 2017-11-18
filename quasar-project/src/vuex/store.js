import Vue from 'vue';
import Vuex from 'vuex';
import ui from './ui';
import zone from './zone';
import contact from './contact';
import global from './global';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		ui, zone, contact, global
	}
});