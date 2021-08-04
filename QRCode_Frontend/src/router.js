import Vue from 'vue';
import Router from 'vue-router';
import querySigData from './views/QuerySigData.vue';
import queryAllData from './views/QueryAllData.vue';
import admin from './views/Admin.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'queryAllData',
      component: queryAllData,
    },
    {
      path: '/querySigData/:id',
      name: 'querySigData',
      component: querySigData,
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: admin,
    },
  ],
});
