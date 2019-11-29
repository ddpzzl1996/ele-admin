<template>
  <div>
    <!-- 头部卡片 -->
    <div class="card">
      <el-card shadow="always">
        <div class="card-details">
          <span>累计订单量</span>
          <span class="card-num">{{ topData.recycleWeight }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计订单重量</span>
          <span class="card-num">{{ topData.recycleWeight }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计入库重量</span>
          <span class="card-num">{{ topData.storageWeight }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计重量误差</span>
          <span class="card-num">{{ topData.weightError }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计订单金额</span>
          <span class="card-num">{{ topData.recycleMoney }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计入库金额</span>
          <span class="card-num">{{ topData.storageMoney }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计金额误差</span>
          <span class="card-num">{{ topData.moneyError }}</span>
        </div>
      </el-card>
    </div>
    <div style="margin-top:20px">回收员：{{ topData.name }}</div>
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
      <el-input
        v-model="formData.recycleWeight"
        placeholder="请输入内容"
        style="width:400px"
        size="small"
      >
        <template slot="prepend">订单重量≥</template>
        <el-button slot="append" icon="el-icon-search" @click="getDetails" />
      </el-input>
      <el-input v-model="formData.weightError" placeholder="请输入内容" style="width:400px" size="small">
        <template slot="prepend">重量误差≥</template>
        <el-button slot="append" icon="el-icon-search" @click="getDetails" />
      </el-input>
    </div>
    <!-- 表格 -->
    <div style="margin-top:20px">
      <el-table :data="list" border="" style="width: 100%" align="center">
        <el-table-column prop="storageId" label="入库订单编号" align="center" />
        <el-table-column prop="storageName" label="仓库名称" align="center" />
        <el-table-column prop="createTime" label="入库时间" align="center" />
        <el-table-column prop="recycleWeight" label="订单重量(kg)" align="center" />
        <el-table-column prop="weightError" label="重量误差(kg)" align="center" />
        <el-table-column prop="recycleMoney" label="订单金额" align="center" />
        <el-table-column prop="moneyError" label="金额误差(kg)" align="center" />
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
    <!-- 表格合并实例 -->
    <!-- <div>
      <el-table :data="tableData" :span-method="spanMethod">
        <el-table-column prop="classId" label="班级ID" />
        <el-table-column prop="className" label="班级名" />
        <el-table-column prop="stuId" label="学号" />
        <el-table-column prop="stuName" label="姓名" />
      </el-table>
    </div>-->
    <!--  -->
  </div>
</template>
<script>
import collectorDetails from './collectorDetails.js'
export default collectorDetails
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
.card-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-num {
  margin-top: 10px;
  font-size: 28px;
  font-weight: bold;
}
</style>
