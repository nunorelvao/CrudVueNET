//Get from Env Vars
const { VUE_APP_OKTA_CLIENT_ID, VUE_APP_OKTA_ISSUER, VUE_APP_OKTA_TESTING_DISABLEHTTPSCHECK, VUE_APP_OKTA_REDIRECTURI, VUE_APP_API_BASEURL } = process.env;
export default {
    oidc: {
        clientId: VUE_APP_OKTA_CLIENT_ID,
        issuer: VUE_APP_OKTA_ISSUER,
        redirectUri: VUE_APP_OKTA_REDIRECTURI,
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
        baseURL: VUE_APP_API_BASEURL,
        headers: {
            common: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        },
    }
};
//# sourceMappingURL=config.js.map