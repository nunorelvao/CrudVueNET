<template>
  <div>
    <h1>401</h1>
    <div>
      Destination [
      <b>{{ $route.params.routedFrom }}</b>] Unauthorized!
    </div>
    <div>
      Please Sig In:
      <b-button variant="outline-primary" v-b-modal.login-modal>Sig In</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "P401",
  data() {
    return {};
  }
};
</script>
