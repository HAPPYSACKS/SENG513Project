<template>
  <div id="wrap">
    <h1>{{ Msg }}&nbsp;<i class="fa-solid fa-spinner fa-spin-pulse"></i></h1>
  </div>
</template>

<script>
export default {
  name: "LoadingScreen",
  data() {
    return {};
  },
  props: {
    Msg: String,
  },
};
</script>

<style scoped>
#wrap {
  text-align: center;
  margin-top: 200px;
}
</style>
