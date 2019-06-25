<template>
  <section
    :class="[
      type,
      type === 'header-fixed' ? 'min-h_header-fixed' : 'min-h_no-footer'
    ]"
    class="main-section pd-lr16">
    <img class="img" src="../../assets/bg/bg_01.jpg" alt="">
    <mark-down>i am a ~~tast~~ **test**.</mark-down>
    <mark-down># 标题 :-( </mark-down>
    <mark-down source=":-) i am a ~~tast~~ **test**."></mark-down>
    <mark-down># h1 Heading 8-)</mark-down>
    <mark-down source="> tip 111"></mark-down>
    <mark-down source=">> tip 111"></mark-down>
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
