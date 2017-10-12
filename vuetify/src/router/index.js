import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Meetups from '../components/Meetup/Meetups.vue'
import CreateMeetup from '../components/Meetup/CreateMeetup.vue'
import Profile from '../components/User/Profile.vue'
import Signup from '../components/User/Signup.vue'
import Signin from '../components/User/Signin.vue'
import Meetup from '../components/Meetup/Meetup.vue'
import test from '../components/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'Testing',
      component: test
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },{
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
