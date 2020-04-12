//Get from Env Vars
const { VUE_APP_OKTA_CLIENT_ID, VUE_APP_OKTA_ISSUER, VUE_APP_OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;

export default {
  oidc: {
    clientId: VUE_APP_OKTA_CLIENT_ID,
    issuer: VUE_APP_OKTA_ISSUER,
    redirectUri: "http://localhost:8080/implicit/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    testing: {
      disableHttpsCheck: VUE_APP_OKTA_TESTING_DISABLEHTTPSCHECK
    },
    registerUrl: "https://dev-101130.okta.com/signin/register"
  },
  resourceServer: {
    messagesUrl: "https://localhost:5001/api/records"
  }
};
