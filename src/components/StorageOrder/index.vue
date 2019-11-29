<template>
  <div class="page-style">
    <div class="orderStatus" style="margin-top:20px">
      <div>订单时间：</div>
      <!-- 时间查询 -->
      <el-button size="small" :type="type==1?'primary':''" @click="selectType(1)">今日</el-button>
      <el-button size="small" :type="type==2?'primary':''" @click="selectType(2)">本周</el-button>
      <el-button size="small" :type="type==3?'primary':''" @click="selectType(3)">本月</el-button>
      <el-date-picker
        v-model="dataValue"
        value-format="yyyy-MM-dd"
        size="small"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleChangeData"
      />
    </div>
    <!-- 入库表格 -->
    <div style="margin-top:20px">
      <el-table :data="list" border="" style="width: 100%">
        <el-table-column prop="storageid" label="入库订单编号" align="center"/>
        <el-table-column prop="storagename" label="姓名" align="center"/>
        <el-table-column label="类别" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.usertype | usertype }}</span>
            <!-- <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">查看明细</el-button> -->
          </template>
        </el-table-column>
        <el-table-column prop="storagetime" label="入库时间" align="center"/>
        <el-table-column prop="recycleweight" label="核算物品重量" align="center"/>
        <el-table-column prop="storageweight" label="实际重量" align="center"/>
        <el-table-column prop="storagemoney" label="金额" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="formData.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="formData.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 待入库表格 -->
  </div>
</template>
<script>
import { StorageOrder } from '@/api/orderMan'

export default {
  props: ['pageType'],
  data() {
    return {
      type: 0,
      count: 0,
      dataValue: [],
      list: [],
      formData: {
        page: 1,
        limit: 10,
        startTime: '',
        endTime: '',
        storageStatus: 0
      }
    }
  },
  created() {
    this.formData.storageStatus = this.pageType
    this.getList()
    console.log(this.pageType)
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
    // 列表
    getList() {
      StorageOrder(this.formData).then(res => {
        this.count = res.data.count
        this.list = res.data.data
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
</script>
<style scoped>
.orderStatus {
  display: flex;
  align-items: center;
}
</style>
