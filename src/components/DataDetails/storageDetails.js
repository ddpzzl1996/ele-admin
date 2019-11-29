import { getStorageDetails } from '@/api/newDataStatic'
export default {
  props: [
    'pageType'
  ],
  data() {
    return {
      count: 0,
      type: 0,
      storageNum: '',
      currentPage4: 1,
      topData: [],
      dataValue: [],
      list: [],
      formData: {
        page: 1,
        limit: 10,
        startTime: '',
        storageUserId: '',
        endTime: '',
        recycleWeight: '',
        storageWeight: ''
      }
    }
  },
  created() {
    this.formData.storageUserId = this.$route.params.id
    this.topData = JSON.parse(sessionStorage.getItem('userInfo'))
    this.setTime()
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
    // 获取列表
    getList() {
      getStorageDetails(this.formData).then(res => {
        this.count = res.data.count
        this.storageNum = res.data.storageNum
        console.log(res.data)
        this.list = res.data.data
        // this.topData = res.data
      })
    },
    // 设置时间查询
    setTime() {
      const day2 = new Date()
      const startTime = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate()
      const day3 = new Date()
      day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000)
      const endTime = day3.getFullYear() + '-' + (day3.getMonth() + 1) + '-' + day3.getDate()
      this.formData.startTime = startTime
      this.formData.endTime = endTime
      this.dataValue = [startTime, endTime]
      this.getList()
    },
    // 选择时间
    handleChangeData(item) {
      if (item) {
        this.setTime(item[0], item[1])
      }
      this.type = 0
    },
    // 查看明细
    handleEdit(index, item) {
      console.log(item)
      const id = item.userId
      sessionStorage.setItem('userInfo', JSON.stringify(item))
      this.$router.push({
        name: 'StorageDetails',
        params: {
          id: id
        }
      })
    }
  }
}
