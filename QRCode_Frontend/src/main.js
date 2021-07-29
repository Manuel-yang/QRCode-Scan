import { BootstrapVue } from 'bootstrap-vue';
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
// Vue.use(VueRouter);
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
