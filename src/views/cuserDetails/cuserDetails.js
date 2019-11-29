import { cuserDetails } from '@/api/newDataStatic'

export default {
  data() {
    return {
      topData: {},
      currentPage4: 1,
      formData: {
        page: 1,
        limit: 10
      },
      list: [],
      address: []
    }
  },
  created() {
    this.topData = JSON.parse(sessionStorage.getItem('userInfo'))
    this.formData.userId = this.topData.userId
    this.formData.mobilePhone = this.topData.mobilePhone
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.formData.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.formData.page = val
      this.getList()
    },
    getList() {
      cuserDetails(this.formData).then(res => {
        this.address = res.data.address
        this.topData.count = res.data.count
        this.list = res.data.orderList
        console.log(res)
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
