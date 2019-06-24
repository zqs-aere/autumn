<template>
  <header class="main-header">
    header (change hash)
  </header>
</template>

<script>
  export default {
    name: 'main_header',
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .main-header {
    height: $header-h;
    @include color(primary);
    @include bg-color(bg-primary);
  }
</style>
