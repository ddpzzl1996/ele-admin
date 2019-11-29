<template>
  <div>
    <!-- 头部卡片 -->
    <div class="card">
      <el-card shadow="always">
        <div class="card-details">
          <span>注册用户量</span>
          <span class="card-num">{{ topData.registCount }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>成交用户量</span>
          <span class="card-num">{{ topData.orderCount }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>成交率</span>
          <span class="card-num">{{ topData.turnoverRate }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计订单量</span>
          <span class="card-num">{{ topData.allOrderNum }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计订单重量</span>
          <span class="card-num">{{ topData.orderWeightCount }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计订单金额</span>
          <span class="card-num">{{ topData.orderMoneyCount }}</span>
        </div>
      </el-card>
    </div>
    <div style="margin-top:20px">推广员：{{ topData.name }}</div>
    <div style="margin-top:20px">
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
      <el-select v-model="value" placeholder="请选择" size="small" @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="formData.orderWeightCount"
        placeholder="请输入内容"
        style="width:400px"
        size="small"
      >
        <template slot="prepend">订单重量>=</template>
        <el-button slot="append" icon="el-icon-search" @click="getDetails" />
      </el-input>
    </div>
    <!-- 表格 -->
    <div style="margin-top:20px">
      <el-table :data="list" border="" style="width: 100%" align="center">
        <el-table-column prop="orderId" label="订单编号" />
        <el-table-column prop="relaName" label="下单用户" />
        <el-table-column prop="createTime" label="下单时间" />
        <el-table-column prop="completeTime" label="完成时间" />
        <el-table-column prop="nickName" label="回收员" />
        <el-table-column prop="orderWeightCount" label="订单重量（kg）" />
        <el-table-column prop="orderMoneyCount" label="订单金额" />
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="formData.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import PromotionDetails from './PromotionDetails.js'
export default PromotionDetails
</script>
<style scoped>
.card {
  display: flex;
  justify-content: space-between;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
