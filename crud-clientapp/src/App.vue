<template>
  <div id="app">
    <header>
      <b-navbar toggleable="md" type="dark" variant="dark">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand href="#" v-b-modal.login-modal v-if="!authenticated">Login</b-navbar-brand>
        <b-navbar-brand href="#" @click.prevent="logout" v-else>Logout</b-navbar-brand>
        <b-collapse is-nav id="nav-collapse">
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/listsample">List Records</b-nav-item>
            <b-nav-item to="/hello">Hello</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>

    <main>
      <!-- <nprogress-container></nprogress-container> -->
      <router-view />
    </main>

    <!-- Add the login widget on popup -->
    <LoginWidget />
  </div>
</template>

<script>
import LoginWidget from "./components/LoginWidget";

export default {
  name: "app",
  components: {
    LoginWidget
  },
  data: function() {
    return {
      authenticated: false
    };
  },
  created() {
    this.isAuthenticated();
  },
  watch: {
    // Everytime the route changes, check for auth status
    $route: "isAuthenticated"
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
      localStorage.authenticated = this.authenticated;
    },
    login() {
      this.$auth.loginRedirect("/");
    },
    async logout() {
      await this.$auth.logout();
      await this.isAuthenticated();

      // Navigate back to home
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style>
html,
body,
main {
  background-color: #343a40;
}
h1,
h2 {
  font-weight: normal;
  font-family: fantasy;
  background: -webkit-linear-gradient(#c1cabd, #a8cf95);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e1f0da;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #4f92d4;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
