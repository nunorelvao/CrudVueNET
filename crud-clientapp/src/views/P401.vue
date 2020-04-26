<template>
  <div>
    <h1>401</h1>
    <div>
      Destination [
      <b>{{ $route.params.routedFrom }}</b>] Unauthorized!
    </div>
    <hr />
    <div>Please Sig In Clicking below</div>
    <br />
    <b-button variant="outline-success" v-b-modal.login-modal>Sig In</b-button>
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
