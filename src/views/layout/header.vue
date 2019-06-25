<template>
  <header
    :class="type"
    class="main-header flex-box space-between pd-lr16">
    <span
      class="meun weight"
      @click.stop="changeAside">
      meun
    </span>

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
    props: {
      type: {
        type: String
      }
    },
    data () {
      return {
      }
    },
    methods: {
      changeAside () {
        this.$emit('changeAside')
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

    &.fixed {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 9;
      width: 100%;
      box-sizing: border-box;
    }
  }
  .meun {
    display: none;
    cursor: pointer;
  }
</style>
