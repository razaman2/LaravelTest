import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {imageUrl: 'https://www.burgessyachts.com/media/adminforms/locations/n/e/new_york_1.jpg',
        id: '624565hghdh',
        title: 'Meetup New York',
        date: new Date(), location: 'New York', description: 'awesome meetup in new york city with the masses'},

      {imageUrl: 'http://www.parisaddress.com/var/source/district/new/tour_eiffel-paris.jpg',
        id: '46245gsvlkkf',
        title: 'Meetup Paris',
        date: new Date(), location: 'Paris', description: 'first annual meetup in paris. full attendance'},

      {imageUrl: 'http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1453920892/DUBAI-554088081-ABOVE0116.jpg?itok=5rodpyDX',
        id: 'ihuahikujd',
        title: 'Meetup Dubai',
        date: new Date(), location: 'Dubai', description: 'meetup on the other side of the world, chilling with' +
      ' the rich kids!'},

      {imageUrl: 'https://brightcove04pmdo-a.akamaihd.net/5104226627001/5104226627001_5222667852001_5214854492001-vs.jpg?pubId=5104226627001&videoId=5214854492001',
        id: 'jajmiojgioa',
        title: 'Meetup Jamaica',
        date: new Date(), location: 'Kingston Jamaica', description: 'irie in the land of ja, meetup with ackee' +
      ' and saltfish and jamaican rum.'}
    ],
    user: null,
    loading: false,
    authError: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload);
    },
    setUser (state, payload) {
      state.user = payload;
    },
    setLoading (state, payload) {
      state.loading = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    clearError (state) {
      state.error = null;
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      payload.id = "ijoapjjaojfa";
      // Reach out to firebase and store it
      commit('createMeetup', payload);
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
        commit('setLoading', false);
        const newUser = {
          id: user.uid,
          registeredMeetups: []
        };
        commit('setUser', newUser);
      }).catch(error => {
        commit('setLoading', false);
        commit('setError', error.message);
        console.log(error);
      });
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(user => {
        commit('setLoading', false);
        const newUser = {
          id: user.uid,
          registeredMeetups: []
        };
        commit('setUser', newUser)
      }).catch(error => {
        commit('setLoading', false);
        commit('setError', error.message);
        console.log(error);
      });
    },
    clearError ({commit}) {
      commit('clearError');
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 3);
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });
      }
    },
    user (state) {
      return state.user;
    },
    loading (state) {
      return state.loading;
    },
    error (state) {
      return state.error;
    }
  }
});
