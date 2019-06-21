<template>
  <span
    @mouseenter="isShow = true"
    @mouseleave="isShow = false"
    :class="[
      {
        'hover-status': isShow
      },
      `position-${position}`,
      'my-drop-down drop-down_trigger'
    ]">
    <template>
      <slot></slot>
    </template>
    <aside
      class="drop-down_content"
      :class="{'show-after': showAfter}">
      <my-transition
        v-show="isShow"
        ref="dropDownContent"
        :enter-animate="enterAnimate"
        :leave-animate="leaveAnimate"
        :enter-option="enterOption"
        :leave-option="leaveOption"
        @beforeEnter="beforeEnter"
        @afterLeave="afterLeave">
        <div
          @click="isShow = false"
          class="scroll-content">
          <slot name="content"></slot>
        </div>
      </my-transition>
    </aside>
  </span>
</template>

<script>
  export default {
    name: 'my_drop_down',
    props: {
      position: {
        type: String,
        default: 'bottom-start'
      }
    },
    data () {
      return {
        isShow: false,
        showAfter: false,
        content: null,
        enterAnimate: {
          height: '',
          paddingTop: '8px',
          paddingBottom: '8px'
        },
        leaveAnimate: {
          height: '0px',
          paddingTop: '0px',
          paddingBottom: '0px'
        },
        enterOption: {
          duration: 300
        },
        leaveOption: {
          duration: 200
        },
        styleMap: {
          left: '-9999px',
          top: '-9999px',
          position: 'absolute',
          display: 'block'
        }
      }
    },
    mounted () {
      const content = this.$refs.dropDownContent.$el
      const map = this.styleMap
      const body = document.body || document.documentElement

      let _content = content.cloneNode(true)

      for (let k in map) {
        _content.style[k] = map[k]
      }

      body.appendChild(_content)
      this.enterAnimate.height = `${_content.offsetHeight + 16}px`
      body.removeChild(_content)

      this.content = content
    },
    methods: {
      beforeEnter () {
        this.showAfter = true
        this.$nextTick(() => {
          this.content.scrollTop = 0
        })
      },
      afterLeave () {
        this.showAfter = false
      }
    },
    beforeDestroy () {
      this.content = null
    }
  }
</script>

<style scoped lang="scss">
  .drop-down_trigger {
    cursor: pointer;
  }
  .my-drop-down {
    position: relative;
    display: inline-block;
    .drop-down_content {
      position: absolute;
      border-radius: 4px;
      z-index: 98;
      transition: background .3s;
      // @include bgColor(drop-down_content);
      // @include boxShadow(drop-down_content-shadow);
      .scroll-content {
        position: relative;
        z-index: 100;
        height: 0px;
        max-height: 400px;
        overflow: scroll;
        box-sizing: border-box;
      }
    }
  }

  .drop-down_content.show-after::after {
    content: '';
    position: absolute;
    z-index: 99;
    width: 0px;
    height: 0px;
    transition: border-color .3s;
    // @include boxShadow(drop-down_triangle);
  }

  // 底部
  .position-bottom,
  .position-bottom-start,
  .position-bottom-end {
    &.hover-status::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      height: 8px;
      width: 100%;
    }
    .drop-down_content {
      top: calc(100% + 8px);
      &.show-after::after {
        transform: rotate(135deg);
        border-top: 4px solid transparent;
        border-right: 4px solid transparent;
        // @include borderColor_rgba(4px, solid, drop-down_content, left);
        // @include borderColor_rgba(4px, solid, drop-down_content, bottom);
      }
    }
  }
  .position-bottom {
    .drop-down_content {
      left: 50%;
      transform: translate(-50%, 0);
      &.show-after::after {
        left: calc(50% - 4px);
        top: -4px;
      }
    }
  }
  .position-bottom-start {
    .drop-down_content {
      left: 0;
      &.show-after::after {
        left: 16px;
        top: -4px;
      }
    }
  }
  .position-bottom-end {
    .drop-down_content {
      right: 0;
      &.show-after::after {
        right: 16px;
        top: -4px;
      }
    }
  }
</style>
