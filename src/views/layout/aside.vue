<template>
  <my-transition
    :enterAnimate="{
      left: 0
    }"
    :leaveAnimate="{
      left: '-60vw'
    }">
    <aside
      v-if="show"
      class="aside"
      @click.stop>
      123 {{ show }}
    </aside>
  </my-transition>
</template>

<script>
  import { lockBody, addBodyEvent } from '@/js/util'

  export default {
    name: 'main_aside',
    props: {
      show: {
        type: Boolean
      }
    },
    data () {
      return {
      }
    },
    watch: {
      show (isShow) {
        console.log(isShow)
        lockBody(isShow)
        addBodyEvent(this.closeAside, isShow)
      }
    },
    methods: {
      closeAside () {
        this.$emit('update:show', !this.show)
      }
    },
  }
</script>

<style scoped lang="scss">
  .aside {
    position: fixed;
    left: -60vw;
    top: 0;
    height: 100vh;
    z-index: 10;
    width: 60vw;
    box-shadow: 0 2px 6.5px -2.5px getSingleValue(sha-primary);
    @include bg-color(bg-primary);
  }
</style>
