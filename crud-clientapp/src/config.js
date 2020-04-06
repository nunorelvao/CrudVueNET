const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env


let clientid = (CLIENT_ID != undefined) ?  CLIENT_ID : '0oa4zlongaSZbOAON4x6';

let issuer = (ISSUER != undefined) ? ISSUER: 'https://dev-101130.okta.com/oauth2/default';

let dhttpcheck = (OKTA_TESTING_DISABLEHTTPSCHECK != undefined) ? OKTA_TESTING_DISABLEHTTPSCHECK : true;
   
export default {
  oidc: {
    clientId: clientid,
    issuer: issuer,
    redirectUri: 'http://localhost:8080/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    testing: {
      disableHttpsCheck: dhttpcheck
    },
    registerUrl: 'https://dev-101130.okta.com/signin/register'
  },
  resourceServer: {
    messagesUrl: 'https://localhost:5001/api/records'
  }
}