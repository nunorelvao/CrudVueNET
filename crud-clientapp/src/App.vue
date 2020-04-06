<template>
  <div id="app">
    <header>
      <b-navbar toggleable="md" type="light" variant="light">
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
      <router-view></router-view>
    </main>

    <!-- Add the login widget on popup -->
    <LoginWidget />
  </div>
</template>

<script>
import LoginWidget from "@/components/LoginWidget";

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

<style scoped>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #f8f9fa;
  color: #fff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
