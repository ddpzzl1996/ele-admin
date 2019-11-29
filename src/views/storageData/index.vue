<template>
  <div class="page-style">
    <div v-show="$route.meta.menuCode === 'StorageData'">
      <!-- 头部卡片 -->
      <div class="card">
        <el-card shadow="always">
          <div class="card-details">
            <span>入库员总数</span>
            <span class="card-num">{{ storageNum }}</span>
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
          <el-table-column prop="name" label="入库员" align="center" />
          <el-table-column prop="storageuserphone" label="手机号" align="center" />
          <el-table-column prop="storagename" label="所属仓库" align="center" />
          <el-table-column prop="orderNum" label="订单量" align="center" />
          <el-table-column prop="recycleweight" sortable label="订单入库重量(kg)" align="center" />
          <el-table-column prop="recyclemoney" sortable label="订单入库金额" align="center" />
          <el-table-column prop="storageweight" sortable label="手动入库重量(kg)" align="center" />
          <el-table-column prop="storagemoney" sortable label="手动入库金额" align="center" />
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
            :total="count"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.menuCode !== 'StorageData'" />
    </keep-alive>
  </div>
</template>
<script>
import storageData from './storageData.js'
export default storageData
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

