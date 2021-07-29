import Vue from 'vue';
import Router from 'vue-router';
import querySigData from './views/QuerySigData.vue';
import queryAllData from './views/QueryAllData.vue';

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
  ],
});
