<template>
  <div class="iframe-container">
    <iframe :src="src" scrolling="auto" frameborder="0" class="frame" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      src: 'http://192.168.0.100/echarts/'
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.iframe-container {
  position: absolute;
  top: 20px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin-top: -29px;
  .frame {
    position: relative;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
