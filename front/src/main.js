import Vue from 'vue'
import App from './App.vue'
import Router from './router/routes'
import VueResource from 'vue-resource'
import Auth from './packages/auth/auth'
import VeeValidate from 'vee-validate'
import store from './store/store'

Vue.use(VueResource);
Vue.use(Auth);
Vue.use(VeeValidate);

Vue.http.options.root = 'http://localhost:8000';
Vue.http.headers.common['Authorization'] = 'Bearer ' + Vue.auth.getToken();

Router.beforeEach(
    (to, from, next) =>
    {
        let authenticated = Vue.auth.isAuthenticated();

        if(to.matched.some(record => record.meta.forVisitors))
        {
            if(authenticated)
            {
                next({
                    path: '/dashboard'
                });
            }
            else next();
        }
        else if(to.matched.some(record => record.meta.forAuth))
        {
            if(!authenticated)
            {
                next({
                    path: '/login'
                });
            }
            else next();
        }else next();
        // else
        // {
        //     if(authenticated)
        //     {
        //         next();
        //     }
        // }
    }
);

new Vue({
    el: '#app',
    store,
    render: h => h(App),
    router: Router
});
