<template>
  <div>
    <DataDetails :page-type="pageType" />
  </div>
</template>
<script>
import DataDetails from '@/components/DataDetails'
export default {
  components: {
    DataDetails
  },
  data() {
    return {
      pageType: 1
    }
  }
}
// import storageDetails from './storageDetails.js'
// export default storageDetails
</script>
<style scoped>
.card {
  display: flex;
  justify-content: space-between;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
.card-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-num {
  margin-top: 10px;
  font-size: 28px;
  font-weight: bold;
}
</style>
