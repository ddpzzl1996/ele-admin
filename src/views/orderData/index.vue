<template>
  <div class="page-style">
    <div v-show="$route.meta.menuCode === 'OrderData'">
      <div class="orderStatus">
        <div>订单状态：</div>
        <div>
          <el-radio-group v-model="formData.orderStatus" @change="getList">
            <el-radio-button label="">全部</el-radio-button>
            <el-radio-button label="1">待接单</el-radio-button>
            <el-radio-button label="2">服务中</el-radio-button>
            <el-radio-button label="5">已完成</el-radio-button>
            <el-radio-button label="6">已取消</el-radio-button>
          </el-radio-group>
        </div>
      </div>
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
      <!-- 表格 -->
      <div style="margin-top:20px">
        <el-table :data="list" border="" style="width: 100%">
          <el-table-column prop="orderId" label="订单号" align="center" />
          <el-table-column prop="name" label="昵称" align="center" />
          <el-table-column prop="createTime" label="下单时间" align="center" />
          <el-table-column prop="receiveTime" label="接单时间" align="center" />
          <el-table-column prop="completeTime" label="完成时间" align="center" />
          <el-table-column label="订单状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.orderStatus | getStatus }}</span>
              <!-- <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">查看明细</el-button> -->
            </template>
          </el-table-column>
          <el-table-column prop="orderMoney" label="金额" align="center" />
          <el-table-column prop="orderWeight" label="重量" align="center" />
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
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.menuCode !== 'OrderData'" />
    </keep-alive>
  </div>
</template>
<script>
import orderData from './orderData'
export default orderData
</script>
<style scoped>
.orderStatus {
  display: flex;
  align-items: center;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
