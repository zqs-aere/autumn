<template>
  <!-- 图片统一错误处理 -->
  <div>
    <my-transition v-if="loading">
      <div class="img-loading"></div>
    </my-transition>
    <my-transition v-else-if="showImg">
      <img
        class="my-img"
        :src="defaultSrc || realSrc"
        :alt="alt"
        @error="error"
        @click="$emit('click')">
    </my-transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'my_img',
    data () {
      return {
        defaultSrc: '',
        loading: true,
        showImg: false
      }
    },
    props: {
      src: {
        type: String,
        required: true
      },
      alt: {
        type: [String, Number],
        default: 'zqs'
      }
    },
    computed: {
      ...mapState({
        imgStaticSrc: state => `/static/theme_img/${state.index.theme}`
      }),
      realSrc () {
        const src = this.src
        const reg = /\/static\/theme_img\/[a-zA-Z]+\//gi
        if (reg.test(src)) {
          const matchPart = src.match(reg)[0]
          const result = src.replace(matchPart, '/')
          return `${this.imgStaticSrc}${result}`
        } else {
          return src
        }
      }
    },
    created () {
      let img = document.createElement('img')
      img.src = this.realSrc
      img.onload = () => {
        this.loading = false
        this.showImg = true
      }
    },
    methods: {
      error (err) {
        this.defaultSrc = '/static/theme_img/dark/v2-2dbef9e766899ebe9f80cc919a3ebb08_b.jpg'
        console.log(err)
      }
    }
  }
</script>

<style scoped lang="scss">
  .img-loading {
    border-radius: 4px;
    width: inherit;
    height: inherit;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.08), 0 15px 35px 0 rgba(0, 0, 0, 0.16);
    // @include bgColor_rgba(a);
    transition: all .5s;
    position: absolute;
    &::after {
      position: absolute;
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 50%;
      box-sizing: border-box;
      // @include borderColor_rgba(3px, solid, b, left, .8);
      // @include borderColor_rgba(3px, solid, b, right, .8);
      // @include borderColor_rgba(3px, solid, b, bottom, .8);
      // @include borderColor_rgba(3px, solid, b, top, 0);
      animation: rotate 2s linear infinite;
      top: calc(50% - 10px);
      left: calc(50% - 10px);
    }
  }
  .my-img {
    width: inherit;
    height: inherit;
  }
</style>
