<template>
  <section
    :class="[
      type,
      type === 'header-fixed' ? 'min-h_header-fixed' : 'min-h_no-footer'
    ]"
    class="main-section pd-lr16">
    <img class="img" src="../../assets/bg/bg_01.jpg" alt="">
  </section>
</template>

<script>
  export default {
    name: 'main_section',
    props: {
      type: {
        type: String
      }
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .main-section.header-fixed {
    padding-top: calc(#{$header-h} + 16px);
    box-sizing: border-box;
  }
  .img {
    width: 80%;
    height: auto;
    margin: 0 auto;
    display: block;
  }
</style>
