<template>
  <div class="page-style">
    <div v-show="$route.meta.menuCode === 'promoterData'">
      <!-- 头部卡片 -->
      <div class="card">
        <el-card shadow="always">
          <div class="card-details">
            <span>推广员总数</span>
            <span class="card-num">{{ total }}</span>
          </div>
        </el-card>
      </div>
      <!-- 查询内容 -->
      <div style="margin-top:20px">
        <el-input
          v-model="formData.paramName"
          size="small"
          placeholder="请输入电话、姓名、昵称"
          class="input-with-select"
          clearable
          style="width:300px"
          @clear="getList"
        >
          <el-button slot="append" icon="el-icon-search" @click="getList" />
        </el-input>
        <el-button size="small" :type="type==1?'primary':''" @click="selectType(1)">今日</el-button>
        <el-button size="small" :type="type==2?'primary':''" @click="selectType(2)">昨天</el-button>
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
          <el-table-column prop="name" label="推广员" align="center" />
          <el-table-column prop="mobilePhone" label="手机号" align="center" />
          <el-table-column prop="registCount" label="注册用户量" align="center" />
          <el-table-column prop="orderCount" label="成交用户量" align="center" />
          <el-table-column prop="turnoverRate" sortable label="成交率" align="center" />
          <el-table-column prop="allOrderNum" label="累计订单" align="center" />
          <el-table-column prop="orderWeightCount" label="累计订单重量（KG）" align="center" />
          <el-table-column prop="orderMoneyCount" label="累计订单金额" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">查看明细</el-button>
            </template>
          </el-table-column>
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
    <keep-alive>
      <router-view v-if="$route.meta.menuCode !== 'promoterData'" />
    </keep-alive>
  </div>
</template>
<script>
import promoterData from './promoterData.js'
export default promoterData
</script>
<style scoped>
.card {
  margin-top: 20px;
  display: flex;
  /* justify-content: space-around; */
}
.card-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
.card-num {
  margin-top: 10px;
  font-size: 28px;
  font-weight: bold;
}
.page-style {
  padding: 20px;
  box-sizing: border-box;
}
</style>

