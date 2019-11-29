<template>
  <div>
    <!-- 头部卡片 -->
    <div v-if="pageType == 1" class="card">
      <el-card shadow="always">
        <div class="card-details">
          <span>累计订单量</span>
          <span class="card-num">{{ topData.orderNum }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计入库重量</span>
          <span class="card-num">{{ topData.recycleweight }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计入库金额</span>
          <span class="card-num">{{ topData.recyclemoney }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计手动入库重量</span>
          <span class="card-num">{{ topData.storageweight }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>累计手动入库金额</span>
          <span class="card-num">{{ topData.storagemoney }}</span>
        </div>
      </el-card>
    </div>
    <div style="margin-top:20px">入库员：{{ topData.name }}</div>
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
        <template slot="prepend">订单入库重量≥</template>
        <el-button slot="append" icon="el-icon-search" @click="getList" />
      </el-input>
      <el-input
        v-model="formData.storageWeight"
        placeholder="请输入内容"
        style="width:400px"
        size="small"
      >
        <template slot="prepend">手动入库重量≥</template>
        <el-button slot="append" icon="el-icon-search" @click="getList" />
      </el-input>
    </div>
    <!-- 表格 -->
    <div style="margin-top:20px">
      <el-table :data="list" border="" style="width: 100%" align="center">
        <el-table-column prop="name" label="回收员" align="center" />
        <el-table-column prop="receiverphone" label="手机号" align="center" />
        <el-table-column prop="storageid" label="订单编号" align="center" />
        <el-table-column prop="storagetime" label="入库时间" align="center" />
        <el-table-column prop="recycleweight" label="订单入库重量(kg)" align="center" />
        <el-table-column prop="recyclemoney" label="订单入库金额(kg)" align="center" />
        <el-table-column prop="storageweight" label="手动入库重量(kg)" align="center" />
        <el-table-column prop="storagemoney" label="手动入库金额(kg)" align="center" />
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page="currentPage4"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="formData.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
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
import storageDetails from './storageDetails.js'
export default storageDetails
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
