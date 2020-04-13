import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import "../helpers/stringExtension"

import Home from "../views/Home.vue";
import Hello from "../views/Hello.vue";
import ListSample from "../views/ListSample.vue";
import LoginSamples from "../views/LoginSamples.vue";
import LoginWidget from "../components/LoginWidget.vue";
import P404 from "../views/P404.vue";
import P401 from "../views/P401.vue";

// 3rd party imports
import Auth from "@okta/okta-vue";

Vue.use(VueRouter);

Vue.use(Auth, {
  issuer: "https://dev-101130.okta.com/oauth2/default",
  clientId: "0oa4zlongaSZbOAON4x6",
  redirectUri: "http://localhost:8080/implicit/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true
});

const routes: Array<RouteConfig> = [
  { path: "*", component: P404, props: true },
  { path: "/p401", name: "P401", component: P401, props: true },
  { path: "/implicit/callback", component: Auth.handleCallback() },
  { path: "/", name: "Home", component: Home },
  { path: "/hello", name: "Hello", component: Hello },
  { path: "/login", name: "LoginSamples", component: LoginSamples },
  { path: "/loginwidget", name: "LoginWidget", component: LoginWidget },
  {
    path: "/listsample",
    name: "ListSample",
    component: ListSample,
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//default OKLA Redirect to auth or to app
// router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

router.beforeEach((to, from, next) => {
  //start progress
  NProgress.start();

  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = (localStorage.authenticated).toBoolean();

  //console.log(`authRequired: ${authRequired}  isAuthenticated: ${isAuthenticated}`);

  if (authRequired && !isAuthenticated) {
    next({ name: "P401", params: { routedFrom: to.path } });
  } else {
    next();
  }
  //end Progress
  NProgress.done();
});

export default router;
