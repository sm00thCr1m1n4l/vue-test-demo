<template>
    <div>
      <div v-longtap="{handler:onLongtap,timeout:500}">
        aaaaaaaaaa
      </div>
    </div>
</template>
<script>
const component = {
  name: 'App',
  props: {},
  data () {
    return {}
  },
  components: {},
  created () {
  },
  destroyed () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    onLongtap () {
      alert(321)
    }
  }
}
export default component
</script>
<style scoped lang="scss" rel="stylesheet/scss">

</style>
