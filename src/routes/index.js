import Vue from 'vue'
import Router from 'vue-router'

import Layout from '../layouts/Layout';
import Login from '../views/Login'
import Register from '../views/Register'
import Dashboard from '../views/Dashboard'
import ModalTemplate from '../views/ModalTemplate';
import ListTemplate from '../views/ListTemplate';
import PQFormsList from '../views/PQ/list/PQFormsList';
import PQForm from '../views/PQ/single/PQ'
import { TOKEN } from '../config'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Layout,
    children: [{
      path: '',
      name: 'dashboard',
      component: Dashboard,
    }, {
      path: 'modal-template',
      name: 'modaltemplate',
      component: ModalTemplate,
    }, {
      path: 'list-template',
      name: 'listtemplate',
      component: ListTemplate,
    }, {
      path: 'pq-forms',
      name: 'pqforms',
      component: PQFormsList,
    }, {
      path: 'pq-forms/:id',
      name: 'pq',
      component: PQForm,
    }, {
      path: 'pq-forms/:id/view',
      name: 'pqview',
      component: PQForm,
    }],
  }, {
    path: '/login',
    name: 'login',
    component: Login,
  }, {
    path: '/register',
    name: 'register',
    component: Register,
  }]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(TOKEN);
  if (!token && to.fullPath != '/login' && to.fullPath != '/register') {
    next('/login');
    return;
  }
  else if (token && (to.fullPath == '/login' || to.fullPath == '/register')) {
    window.console.log('already logged in!');
    next('/');
    return;
  }

  next();
})

export default router;