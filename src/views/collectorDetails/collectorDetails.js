import { getRecoverDetails } from '@/api/newDataStatic'

export default {
  data() {
    return {
      dataValue: [],
      currentPage4: 1,
      total: 0,
      list: [],
      input1: '',
      value: '',
      formData: {
        page: 1,
        limit: 10,
        receiver: '',
        startTime: '',
        endTime: '',
        recycleWeight: '',
        weightError: ''
      },
      tableData: [
        { classId: '001', className: '一班', stuId: 1001, stuName: 'zhangsan001' },
        { classId: '001', className: '一班', stuId: 1002, stuName: 'zhangsan001' },
        { classId: '001', className: '一班', stuId: 1003, stuName: 'zhangsan001' },
        { classId: '001', className: '一班', stuId: 1004, stuName: 'zhangsan001' },
        { classId: '001', className: '一班', stuId: 1005, stuName: 'zhangsan001' },
        { classId: '002', className: '二班', stuId: 1004, stuName: 'zhangsan002' },
        { classId: '002', className: '二班', stuId: 1005, stuName: 'zhangsan002' },
        { classId: '003', className: '三班', stuId: 1006, stuName: 'zhangsan003' },
        { classId: '003', className: '三班', stuId: 1007, stuName: 'zhangsan003' },
        { classId: '003', className: '三班', stuId: 1008, stuName: 'zhangsan003' },
        { classId: '004', className: '四班', stuId: 1009, stuName: 'zhangsan004' }
      ],
      topData: {}
    }
  },
  created() {
    this.topData = JSON.parse(sessionStorage.getItem('userInfo'))
    this.setTime()
    this.formData.receiver = this.$route.params.id
    // this.getDetails()
  },
  computed: {
    groupNum() { // 获取班级列表数组
      return new Set(this.tableData.map(o => o.classId))
    }
  },
  methods: {
    classGroup(id) { // 根据班级名称获取学生数量
      return this.tableData.filter(o => o.classId == id).length
    },
    classNameLen(name) { // 根据班级名称获取该班级第一个学生在全量学生中的偏移位置
      const tmp = Array.from(this.groupNum)
      const index = tmp.indexOf(name) // 某班级在全班级中的偏移位置
      let len = 0
      for (let i = 0; i < index; i++) {
        len += this.classGroup(tmp[i])
      }
      return len
    },
    spanMethod(data) { // 对于表格数据进行分组合并操作，UI组件回调函数
      // 当前行号rowIndex
      const { row, column, rowIndex, columnIndex } = data
      if (columnIndex < 1) { // 班级合并展示区
        // 所有当前行id的数据
        const len = this.classGroup(row.classId)
        // 当前id有多少行
        const lenName = this.classNameLen(row.classId)
        if (rowIndex === lenName) { // 某班级首位学生行
          return {
            rowspan: len,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else { // 学生信息展示区
        return {
          rowspan: 1,
          colspan: 1
        }
      }
    },
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
      getRecoverDetails(this.formData).then(res => {
        console.log(res, '详情列表')
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
