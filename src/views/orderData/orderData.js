import { getList } from '@/api/orderMan'
export default {
  data() {
    return {
      dataValue: [],
      list: [],
      type: 0,
      count: 0,
      formData: {
        page: 1,
        limit: 10,
        startTime: '',
        endTime: '',
        orderStatus: ''
      }
    }
  },
  created() {
    if (this.$route.name === 'OrderData') {
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
    getList() {
      getList(this.formData).then(res => {
        this.list = res.data.data
        this.count = res.data.count
        console.log(res)
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
        const WeekFirstDay = new Date(day1 - (day1.getDay() - 1) * 86400000)
        const M = Number(WeekFirstDay.getMonth()) + 1
        const startTime = day1.getFullYear() + '-' + M + '-' + WeekFirstDay.getDate()
        const WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000)
        const N = Number(WeekLastDay.getMonth()) + 1
        const endTime = WeekLastDay.getFullYear() + '-' + N + '-' + WeekLastDay.getDate()
        // const day1 = new Date()
        // day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
        // const startTime = day1.getFullYear() + '-' + (day1.getMonth() + 1) + '-' + day1.getDate()
        // const day2 = new Date()
        // const endTime = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate()
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
      console.log(item)
      const id = item.orderId
      sessionStorage.setItem('userInfo', JSON.stringify(item))
      this.$router.push({
        name: 'OrderDetails',
        params: {
          id: id
        }
      })
    }
  }
}
