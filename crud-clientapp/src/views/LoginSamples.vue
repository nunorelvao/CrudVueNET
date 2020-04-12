<template>
  <div class="container logincomponent">
    <div class="row">
      <div class="col"><h1>LOGIN</h1></div>
      <div class="w-100"></div>
      <div class="col">
        <h2>{{ msgManual }}</h2>
        <div>
          <ul>
            <li>
              <button
                type="button"
                class="btn btn-primary"
                @click="loginauthfacebook"
              >
                FACEBOOK
              </button>
            </li>
            <li>
              <a href="#" @click.prevent="login" v-if="!authenticated"
                >Direct Login</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="col">
        <h2>{{ msgPlugin }}</h2>
        <b-button v-b-modal.login-modal>SHOW POPUP</b-button>
        <LoginWidget />
      </div>
      <div class="w-100"></div>
    </div>
  </div>
</template>

<script>
import LoginWidget from "@/components/LoginWidget";

export default {
  name: "loginsamples",
  components: {
    LoginWidget
  },
  data() {
    return {
      authenticated: false,
      msgManual: "Login manual options",
      msgPlugin: "Login with widget",
      loginauthfacebook:
        "https://dev-101130.okta.com/oauth2/v1/authorize?idp=0oa525yscEPLCKBVk4x6&client_id=0oa4zlongaSZbOAON4x6&response_type=id_token&response_mode=fragment&scope=openid&redirect_uri=http://localhost:8080/implicit/callback&state=req&nonce=testnonce"
    };
  },
  created() {
    console.log("created login samples");
  }
  //mounted: function () {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495e;
}
</style>
