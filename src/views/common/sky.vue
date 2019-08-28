<template>
  <div ref="sky" class="sky"></div>
</template>

<script>
  import Sky from '@/js/sky'

  export default {
    name: 'CommonSky',
    data () {
      return {
        sky: null
      }
    },
    mounted () {
      this.setSky()
    },
    methods: {
      setSky () {
        const width = window.innerWidth
                      || document.documentElement.clientWidth
                      || document.body.clientWidth
        const height = window.innerHeight
                      || document.documentElement.clientHeight
                      || document.body.clientHeight

        this.sky = new Sky(this.$refs.sky, {
          width,
          height,
          autoResize: true
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .sky {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
