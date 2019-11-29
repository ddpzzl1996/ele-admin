<template>
  <div>
    <StorageOrder :page-type="pageType" />
  </div>
</template>
<script>
import StorageOrder from '@/components/StorageOrder'
export default {
  components: {
    StorageOrder
  },
  data() {
    return {
      pageType: 0
    }
  }
}
</script>
<style scoped>
</style>

