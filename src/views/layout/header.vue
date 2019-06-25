<template>
  <header class="main-header flex-box space-between pd-lr16">
    <span class="meun weight">meun</span>

    <span>logo</span>

    <ul class="nav-list ul-reset flex-box">
      <li class="mg-r16">nav</li>
      <li class="mg-r16">nav</li>
      <li class="mg-r16">nav</li>
      <li>nav</li>
    </ul>
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
  @media screen and (max-width: 900px) {
    .nav-list {
      display: none;
    }
    .meun.weight {
      display: block;
    }
  }

  .main-header {
    height: $header-h;
    @include color(primary);
    @include bg-color(bg-primary);
  }
  .meun {
    display: none;
  }
</style>
