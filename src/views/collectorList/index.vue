<template>
  <div class="page-style">
    <div v-show="$route.meta.menuCode === 'CollectorList'">
      <!-- 头部卡片 -->
      <div class="card">
        <el-card shadow="always">
          <div class="card-details">
            <span>回收员总数</span>
            <span class="card-num">{{ topData.collectorNum }}</span>
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
          <el-table-column prop="name" label="回收员" align="center" />
          <el-table-column prop="mobilePhone" label="手机号" align="center" />
          <el-table-column prop="orderNum" sortable label="累计订单" align="center" />
          <el-table-column prop="recycleWeight" sortable label="订单重量(kg)" align="center" />
          <el-table-column prop="storageWeight" label="入库重量(kg)" align="center" />
          <el-table-column prop="weightError" sortable label="重量误差(kg)" align="center" />
          <el-table-column prop="recycleMoney" sortable label="订单金额" align="center" />
          <el-table-column prop="storageMoney" label="入库金额" align="center" />
          <el-table-column prop="moneyError" sortable label="金额误差" align="center" />
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
            :total="topData.collectorNum"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.menuCode !== 'CollectorList'" />
    </keep-alive>
  </div>
</template>
<script>
import collectorList from './collectorList.js'
export default collectorList
</script>
<style scoped>
.card {
  display: flex;
  /* justify-content: space-between; */
}
.card > * {
  margin-right: 20px;
}
.page-style {
  padding: 20px;
  box-sizing: border-box;
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
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>

