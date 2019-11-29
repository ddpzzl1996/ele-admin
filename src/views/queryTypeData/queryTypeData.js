import { queryTypeData } from '@/api/newDataStatic'

export default {
  data() {
    return {
      count: 0,
      list: [],
      currentPage4: 1,
      formData: {
        page: 1,
        limit: 10,
        typeName: '',
        imageType: ''
      }
    }
  },
  created() {
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
      queryTypeData(this.formData).then(res => {
        this.list = res.data.data
        this.count = res.data.count
        console.log(res)
      })
    }
  }
}
