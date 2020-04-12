<template>
  <div class="home">
    <h1 v-html="title">{{ title }}</h1>
    <h2>Home Page</h2>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      title: "HOME"
    };
  }
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