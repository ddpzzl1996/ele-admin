import { getOrderDetails, getRecoverList, updateApirec, cancelOrder } from '@/api/orderMan'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      topData: {},
      count: 0,
      count1: 0,
      list: [],
      cancelReasonName: '',
      cancelOrder: false,
      assign: true,
      assignPopus: false,
      assignObj: {},
      recoverList: [],
      formData: {
        page: 1,
        limit: 10,
        orderId: ''
      },
      recoverFrom: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.topData = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(this.topData)
    this.formData.orderId = this.$route.params.id
    this.getList()
    this.getRecoverList()
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
    handleSizeChange1(val) {
      this.recoverFrom.limit = val
      this.getRecoverList()
    },
    handleCurrentChange1(val) {
      this.recoverFrom.page = val
      this.getRecoverList()
    },
    getList() {
      getOrderDetails(this.formData).then(res => {
        this.list = res.data.data
        this.count = res.data.count
        this.topData.address = res.data.address
        this.topData.addressArea = res.data.addressArea
        this.topData.remark = res.data.remark
        this.topData.reserveTime = res.data.reserveTime
        this.topData.receiveTime = res.data.receiveTime
        console.log(res)
      })
    },
    // 取消订单
    cancel() {
      this.cancelOrder = true
    },
    assignOrder() {
      this.assign = false
    },
    // 获取回收员列表
    getRecoverList() {
      getRecoverList(this.recoverFrom).then(res => {
        this.recoverList = res.data.data
        this.count1 = res.data.count
        console.log(res)
      })
    },
    // 关闭弹窗
    handleClose() {
      this.cancelOrder = false
      this.assignPopus = false
      // this.assign = false
    },
    // 指派订单
    sureAssign(item) {
      this.assignPopus = true
      this.assignObj = item
      console.log(item)
    },
    // 返回
    back() {
      this.assign = !this.assign
    },
    // 取消订单
    cancellation() {
      if (!this.cancelReasonName) {
        Message({
          message: '取消原因不能为空！',
          type: 'error'
        })
        return
      } else {
        const formData = {
          orderId: this.topData.orderId,
          cancelReasonName: this.cancelReasonName
        }
        cancelOrder(formData).then(res => {
          if (res.code === 0) {
            Message({
              message: res.msg,
              title: res.msg,
              type: 'success'
            })
            this.$router.go(-1)
          }
          console.log(res)
        })
      }
    },
    // 确定指派
    sureOrder() {
      const formData = {
        orderId: this.topData.orderId,
        userId: this.assignObj.userId
      }
      updateApirec(formData).then(res => {
        if (res.code === 0) {
          Message({
            message: res.msg,
            title: res.msg,
            type: 'success'
          })
          this.$router.go(-1)
        }
      })
    }
  }
}
