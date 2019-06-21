<template>
  <transition
    :mode="mode"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave">
    <slot></slot>
  </transition>
</template>

<script>
  import Velocity from 'velocity-animate'

  export default {
    name: 'my_transition',
    data () {
      return {
        defaultEnterEasing: [ 0.4, 0.01, 0.165, 0.99 ],
        defaultLeaveEasing: [ 0.4, 0.01, 0.165, 0.99 ],
        defaultEnterAnimate: {scale: [1, 1.2]},
        defaultLeaveAnimate: {scale: [1.2, 1]},
        defaultEnterDuration: 400,
        defaultLeaveDuration: 200
      }
    },
    props: {
      mode: {
        type: String,
        default: 'in-out'
      },
      enterAnimate: Object,
      leaveAnimate: Object,
      enterOption: {
        type: Object,
        default () {
          return {}
        }
      },
      leaveOption: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      beforeEnter () {
        this.$emit('beforeEnter', this.$event)
      },
      enter (el, done) {
        let option = Object.assign({
          duration: this.defaultEnterDuration,
          easing: this.defaultEnterEasing
        }, this.enterOption)
        Velocity(el, 'stop')
        Velocity(el,
        this.enterAnimate || this.defaultEnterAnimate,
        {
          ...option,
          complete: done
        })
        console.log('显示动画执行中...')
      },
      afterEnter () {
        console.log('显示动画结束')
      },
      beforeLeave () {
        console.log('隐藏动画即将执行')
      },
      leave (el, done) {
        let option = Object.assign({
          duration: this.defaultLeaveDuration,
          easing: this.defaultLeaveEasing
        }, this.leaveOption)
        Velocity(el, 'stop')
        Velocity(el,
        this.leaveAnimate || this.defaultLeaveAnimate,
        {
          ...option,
          complete: done
        })
        console.log('隐藏动画执行中...')
      },
      afterLeave () {
        this.$emit('afterLeave', this.$event)
        console.log('隐藏动画结束')
      }
    }
  }
</script>
