import { getDetails } from '@/api/newDataStatic'

export default {
  data() {
    return {
      dataValue: [],
      currentPage4: 1,
      total: 0,
      options: [{
        value: '',
        label: '全部订单'
      }, {
        value: '1',
        label: '第一单重量'
      }, {
        value: '2',
        label: '第二单重量'
      }, {
        value: '3',
        label: '第三单重量'
      }, {
        value: '4',
        label: '第四单重量'
      }],
      list: [],
      input1: '',
      value: '',
      formData: {
        page: 1,
        limit: 10,
        userId: '',
        startTime: '',
        endTime: '',
        sortType: '',
        orderWeightCount: ''
      },
      topData: {}
    }
  },
  created() {
    this.topData = JSON.parse(sessionStorage.getItem('userInfo'))
    this.setTime()
    this.formData.userId = this.$route.params.id
    // this.getDetails()
  },
  methods: {
    handleSizeChange(val) {
      this.formData.limit = val
      this.getDetails()
    },
    handleCurrentChange(val) {
      this.formData.page = val
      this.getDetails()
    },
    // 设置时间
    setTime() {
      const day2 = new Date()
      const startTime = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate()
      const day3 = new Date()
      day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000)
      const endTime = day3.getFullYear() + '-' + (day3.getMonth() + 1) + '-' + day3.getDate()
      this.dataValue = [startTime, endTime]
      this.selectTime(startTime, endTime)
    },
    // 下拉选改变时
    selectChange(item) {
      console.log(item)
      this.formData.sortType = item
      this.getDetails()
    },
    // 设置查询时间
    selectTime(startTime, endTime) {
      this.formData.startTime = startTime
      this.formData.endTime = endTime
      this.getDetails()
    },
    // 获取详情
    getDetails() {
      getDetails(this.formData).then(res => {
        console.log(res.data.data, '详情列表')
        this.total = res.data.count
        this.list = res.data.data
      })
    },
    // 时间选择器
    handleChangeData(item) {
      console.log(item)
      if (item) {
        this.selectTime(item[0], item[1])
      }
      this.getDetails()
    }
  }
}
