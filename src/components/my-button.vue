<template>
  <button
    @click="$emit('click')"
    :class="btnClass">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'my_button',
    props: {
      type: {
        type: String,
        default: 'normal'
      },
      size: {
        type: String,
        default: 'normal'
      }
    },
    data () {
      return {}
    },
    computed: {
      btnClass () {
        const type = this.type
        const size = this.size
        return [
          'my-button',
          `type-${type}`,
          `size-${size}`
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .my-button {
    border-radius: 4px;
    box-shadow: none;
    outline: none;
    line-height: inherit;
    cursor: pointer;
    transition: background .3s;
    // &.type-normal {
    //   @include borderColor_rgba(1px, solid, btn-noraml_border);
    //   @include bgColor(btn-noraml_bg);
    // }
    // &.type-primary {
    //   @include borderColor_rgba(1px, solid, btn-noraml_bg);
    //   @include bgColor(btn-noraml_border);
    // }

    // &.size-normal {
    //   @include font_size(14px);
    //   padding: 7px 16px 6px;
    // }
  }
</style>
