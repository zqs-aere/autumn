<template>
  <div class="my-table-column"></div>
</template>

<script>
  export default {
    name: 'my_table_column',
    data () {
      return {
      }
    },
    props: {
      name: [String, Number],
      width: [String, Number],
      prop: [String, Number],
      align: String
    }
  }
</script>

<style scoped lang="scss">

</style>
