import { getSysStorageData, queryApiArea } from '@/api/newDataStatic'
export default {
  data() {
    return {
      topData: {
        allDayMoney: '',
        allDayWeight: '',
        allMoney: '',
        allWeight: '',
        count: 0
      },
      type: 0,
      options: [],
      storageNum: '',
      currentPage4: 1,
      dataValue: [],
      list: [],
      formData: {
        page: 1,
        limit: 10,
        startTime: '',
        endTime: '',
        area: ''
      }
    }
  },
  created() {
    if (this.$route.name === 'SysStorageData') {
      this.getList()
      this.getArea()
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
      getSysStorageData(this.formData).then(res => {
        const {
          allDayMoney,
          allDayWeight,
          allMoney,
          allWeight,
          count
        } = res.data
        this.topData = {
          allDayMoney,
          allDayWeight,
          allMoney,
          allWeight,
          count
        }
        this.storageNum = res.data.storageNum
        console.log(res.data)
        this.list = res.data.data
        // this.topData = res.data
      })
    },
    // 获取地区
    getArea() {
      queryApiArea({}).then(res => {
        this.options = res.data
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
      console.log(item)
      const id = item.id
      sessionStorage.setItem('userInfo', JSON.stringify(item))
      this.$router.push({
        name: 'sysStorageDetails',
        params: {
          id: id
        }
      })
    }
  }
}
