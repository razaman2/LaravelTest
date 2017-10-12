import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import account from '@/components/account';
import sales from '@/components/sales';
import leaderboard from '@/components/leaderboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/account/:id?',
      name: 'account',
      component: account
    },
    {
      path: '/sales',
      name: 'sales',
      component: sales
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: leaderboard
    }
  ],
  mode: 'history'
});
