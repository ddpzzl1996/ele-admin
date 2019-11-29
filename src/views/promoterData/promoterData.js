import { getList } from '@/api/newDataStatic'
export default {
  data() {
    return {
      total: 0,
      type: 0,
      dataValue: '',
      list: [],
      currentPage4: 1,
      formData: {
        page: 1,
        limit: 10,
        startTime: '',
        endTime: '',
        paramName: '', // 姓名、电话
        orderWeightCount: '', // 订单重量
        sortType: '' // 第几单
      }
    }
  },
  created() {
    if (this.$route.name === 'promoterData') {
      this.getList()
    }
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
      getList(this.formData).then(res => {
        if (res.code === 0) {
          console.log(res, '推广人员列表')
          this.total = res.data.count
          this.list = res.data.data
        }
      })
    },
    // 选择时间查询
    selectType(type) {
      this.type = type
      if (type === 1) {
        const day2 = new Date()
        const startTime = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate()
        const day3 = new Date()
        day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000)
        const endTime = day3.getFullYear() + '-' + (day3.getMonth() + 1) + '-' + day3.getDate()
        this.dataValue = [startTime, endTime]
        this.setTime(startTime, endTime)
      }
      if (type === 2) {
        const day1 = new Date()
        day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
        const startTime = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate()
        const day2 = new Date()
        const endTime = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate()
        this.dataValue = [startTime, endTime]
        this.setTime(startTime, endTime)
      }
      if (type === 3) {
        var Nowdate = new Date()
        var MonthFirstDay = new Date(Nowdate.getYear(), Nowdate.getMonth(), 1)
        const M = Number(MonthFirstDay.getMonth()) + 1
        const startTime = Nowdate.getFullYear() + '-' + M + '-' + MonthFirstDay.getDate()
        var MonthNextFirstDay = new Date(Nowdate.getYear(), Nowdate.getMonth() + 1, 1)
        var MonthLastDay = new Date(MonthNextFirstDay - 86400000)
        const N = Number(MonthLastDay.getMonth()) + 1
        const endTime = Nowdate.getFullYear() + '-' + N + '-' + MonthLastDay.getDate()
        this.dataValue = [startTime, endTime]
        this.setTime(startTime, endTime)
      }
    },
    // 设置时间查询
    setTime(startTime, endTime) {
      this.formData.startTime = startTime
      this.formData.endTime = endTime
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
      const id = item.userId
      sessionStorage.setItem('userInfo', JSON.stringify(item))
      this.$router.push({
        name: 'PromotionDetails',
        params: {
          id: id
        }
      })
    }
  }
}
