<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="title" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  data() {
    return {
      title:
        "CRUD .NET SampleApp" +
        "<br />" +
        "ENV: " +
        process.env.NODE_ENV +
        "<br />" +
        "API_BASEURL ENV: " +
        process.env.VUE_APP_API_BASEURL
    };
  },
  components: {
    HelloWorld
  }
};
</script>
