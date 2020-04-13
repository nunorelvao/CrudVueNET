import * as qs from "qs";
import { PathLike } from "fs";

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

  apiConfig: {
    returnRejectedPromiseOnError: true,
    withCredentials: true,
    timeout: 30000,
    baseURL: "https://localhost:5001/api",
    headers: {
      common: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    //paramsSerializer: (params: PathLike) => qs.stringify(params, { indices: false }),
  }
};
