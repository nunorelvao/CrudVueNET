import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress/nprogress'
import 'nprogress/nprogress.css'


import Home from '@/components/Home'
import Hello from '@/components/Hello'
import ListSample from '@/components/ListSample'
import LoginSamples from '@/components/LoginSamples'
import LoginWidget from '@/components/LoginWidget'
import P404 from '@/components/P404'
import P401 from '@/components/P401'

// 3rd party imports
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-101130.okta.com/oauth2/default',
  clientId: '0oa4zlongaSZbOAON4x6',
  redirectUri: 'http://localhost:8080/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
})


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '*', component: P404, props: true },
    { path: '/p401',name: 'P401',  component: P401, props: true },
    { path: '/implicit/callback', component: Auth.handleCallback() },
    { path: '/', name: 'Home', component: Home },
    { path: '/hello', name: 'Hello', component: Hello },
    { path: '/login', name: 'LoginSamples', component: LoginSamples },
    { path: '/loginwidget', name: 'LoginWidget', component: LoginWidget },
    { path: '/listsample', name: 'ListSample', component: ListSample, meta: { requiresAuth: true }  }
  ]
})

//default OKLA Redirect to auth or to app
// router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

router.beforeEach((to, from, next) => {
  //start progress
  NProgress.start();

  let authRequired = to.matched.some(record => record.meta.requiresAuth);
  let isAuthenticated = stringToBoolean(localStorage.authenticated);
  
  //console.log(`authRequired: ${authRequired}  isAuthenticated: ${isAuthenticated}`);
 
  if (authRequired && !isAuthenticated) { 
    next({name: 'P401', params: {routedFrom: to.path}});
  } else {
    next();
  }
  
  //end Progress
  NProgress.done()
})

function stringToBoolean(string){
  switch(string.toLowerCase().trim()){
      case "true": case "yes": case "1": return true;
      case "false": case "no": case "0": case null: return false;
      default: return Boolean(string);
  }
}

export default router
