/* eslint-disable @typescript-eslint/no-unused-vars */
<template>
  <div>
    <div id="okta-placeholder" style="display:none;">
      <div id="okta-signin-container"></div>
    </div>

    <b-modal
      id="login-modal"
      title="LOGIN"
      header-bg-variant="dark"
      body-bg-variant="dark"
      static
      lazy
      hide-footer
      no-stacking
      no-close-on-esc
      no-close-on-backdrop
    >
      <div id="login-modal-container"></div>
    </b-modal>
  </div>
</template>

<script>
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/dist/css/okta-sign-in.min.css";
import sampleConfig from "../config";

export default {
  name: "loginwidget",
  data() {
    return {
      authenticated: false
    };
  },
  created() {
    console.log("created login widget");
  },
  mounted: function() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.$root.$on("bv::modal::shown", (bvEvent, modalId) => {
      const sigInEl = document.getElementById("okta-signin-container");
      //sigInEl.style.display = "";
      document.getElementById("login-modal-container").append(sigInEl);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.$root.$on("bv::modal::hide", (bvEvent, modalId) => {
      const sigInEl = document.getElementById("okta-signin-container");
      //sigInEl.style.display = "none";
      document.getElementById("okta-placeholder").append(sigInEl);
    });

    this.$nextTick(function() {
      this.widget = new OktaSignIn({
        /**
         * Note: when using the Sign-In Widget for an OIDC flow, it still
         * needs to be configured with the base URL for your Okta Org. Here
         * we derive it from the given issuer for convenience.
         */
        baseUrl: sampleConfig.oidc.issuer.split("/oauth2")[0],
        el: "#okta-signin-container",
        clientId: sampleConfig.oidc.clientId,
        redirectUri: sampleConfig.oidc.redirectUri,
        logo: require("@/assets/logo.png"),
        i18n: {
          en: {
            "primaryauth.title": "Sign in to Vue & Company"
          }
        },
        idpDisplay: "PRIMARY",
        idps: [
          { type: "GOOGLE", id: "xxxxxxxxxxxxxxxxxx" },
          { type: "FACEBOOK", id: "0oa525yscEPLCKBVk4x6" },
          { type: "LINKEDIN", id: "xxxxxxxxxxxxxxxxxxx" }
        ],
        authParams: {
          pkce: true,
          issuer: sampleConfig.oidc.issuer,
          display: "page",
          scopes: sampleConfig.oidc.scopes
        },
        features: {
          registration: true
        },
        registration: {
          click: function() {
            window.location.href = sampleConfig.oidc.registerUrl;
          }
        }
      });

      this.widget.showSignInToGetTokens({
        clientId: sampleConfig.oidc.clientId,
        redirectUri: sampleConfig.oidc.redirectUri,
        // Return an access token from the authorization server
        getAccessToken: true,
        // Return an ID token from the authorization server
        getIdToken: true,
        scope: sampleConfig.oidc.scopes
      });

      //   this.widget.renderEl(
      //     { el: '#okta-signin-container' },
      //             function success(res) {
      //           // The properties in the response object depend on two factors:
      //           // 1. The type of authentication flow that has just completed, determined by res.status
      //           // 2. What type of token the widget is returning

      //           // The user has started the password recovery flow, and is on the confirmation
      //           // screen letting them know that an email is on the way.

      //           if (res.status === 'FORGOT_PASSWORD_EMAIL_SENT') {
      //           // Any followup action you want to take
      //           return;
      //           }

      //           // The user has started the unlock account flow, and is on the confirmation
      //           // screen letting them know that an email is on the way.
      //           if (res.status === 'UNLOCK_ACCOUNT_EMAIL_SENT') {
      //           // Any followup action you want to take
      //           return;
      //           }

      //           // The user has successfully completed the authentication flow
      //           if (res.status === 'SUCCESS') {

      //                 // Handle success when the widget is not configured for OIDC

      //                 if (res.type === 'SESSION_STEP_UP') {
      //                     // Session step up response
      //                     // If the widget is not configured for OIDC and the authentication type is SESSION_STEP_UP,
      //                     // the response will contain user metadata and a stepUp object with the url of the resource
      //                     // and a 'finish' function to navigate to that url
      //                     console.log(res.user);
      //                     console.log('Target resource url: ' + res.stepUp.url);
      //                     res.stepUp.finish();
      //                     return;
      //                 } else {
      //                     // If the widget is not configured for OIDC, the response will contain
      //                     // user metadata and a sessionToken that can be converted to an Okta
      //                     // session cookie:
      //                     console.log(res.user);
      //                     res.session.setCookieAndRedirect('http://localhost:8080');
      //                     return;
      //                 }

      //                 // OIDC response

      //                 // If the widget is configured for OIDC with a single responseType, the
      //                 // response will be the token.
      //                 // i.e. authParams.responseType = 'id_token':
      //                 console.log(res.claims);
      //                 signIn.tokenManager.add('my_id_token', res);

      //                 // If the widget is configured for OIDC with multiple responseTypes, the
      //                 // response will be an array of tokens:
      //                 // i.e. authParams.responseType = ['id_token', 'token']
      //                 signIn.tokenManager.add('my_id_token', res[0]);
      //                 signIn.tokenManager.add('my_access_token', res[1]);

      //                 return;
      //           }
      //     },
      //     function error(err) {
      //         // This function is invoked with errors the widget cannot recover from:
      //         // Known errors: CONFIG_ERROR, UNSUPPORTED_BROWSER_ERROR
      //         throw err
      //     }
      //   )
    });
  },
  destroyed() {
    // Remove the widget from the DOM on path change
    console.log("widget destroyed");
    this.widget.remove();
  },
  methods: {
    //anymethod() {}
  }
};
</script>

<style>
#okta-sign-in {
  margin: auto !important;
}
#okta-signin-container .okta-sign-in-header {
  background-color: #c1cabd;
}
#okta-signin-container .auth-content {
  background-color: #c1cabd;
  /* background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      #c1cabd 10px,
      #a8cf95 20px /* #c1cabd, #a8cf95 
    ), 
   linear-gradient(to bottom, #eee, #999); */
}
</style>
