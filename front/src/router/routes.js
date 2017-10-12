import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const Router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: require('../components/auth/login.vue'),
            meta: {
                forVisitors: true
            }
        },
        {
            path: '/register',
            component: require('../components/auth/register.vue'),
            meta: {
                forVisitors: true
            }
        },
        {
            path: '/dashboard',
            component: require('../components/dashboard.vue'),
            meta: {
                forAuth: true
            }
        },
        {
            path: '/zones',
            component: require('../components/zones/zones.vue'),
            meta: {
                forAuth: true
            }
        },
        {
            path: '/zones/delete',
            component: require('../components/zones/delete.vue'),
            meta: {
                forAuth: true
            }
        },
        {
            path: '/zones/update',
            component: require('../components/zones/edit.vue'),
            meta: {
                forAuth: true
            }
        },
        {
            path: '/zones/create',
            component: require('../components/zones/create.vue'),
            meta: {
                forAuth: true
            }
        },
        {
            path: '/sms/send',
            component: require('../components/sms/send.vue'),
            meta: {
                forAuth: true
            }
        }
    ],
    linkActiveClass: 'route',
    linkExactActiveClass: 'active',
    mode: 'history'
});

export default Router;