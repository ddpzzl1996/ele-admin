<template>
  <div class="page-style">
    <!-- 查询内容 -->
    <div style="margin-top:20px;margin-right:30px">
      <el-radio-group v-model="formData.imageType" size="small" @change="getList">
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="month">本月</el-radio-button>
        <el-radio-button label="week">今日</el-radio-button>
      </el-radio-group>
      <el-input
        v-model="formData.typeName"
        size="small"
        placeholder="请输入分类名称或关键字"
        class="input-with-select"
        clearable
        style="width:300px"
        @clear="getList"
      >
        <el-button slot="append" icon="el-icon-search" @click="getList" />
      </el-input>
    </div>
    <!-- 表格 -->
    <div style="margin-top:20px">
      <el-table :data="list" border="" style="width: 100%">
        <el-table-column prop="title" label="类型" align="center" />
        <el-table-column prop="weight" label="重量(吨)" align="center" />
        <el-table-column prop="money" label="金额(万元)" align="center" />
        <el-table-column prop="rate" label="金额占比" align="center" />
        <el-table-column prop="weightError" sortable label="重量误差(吨)" align="center" />
        <el-table-column prop="moneyError" label="金额误差(万元)" align="center" />
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
</template>
<script>
import queryTypeData from './queryTypeData'
export default queryTypeData
</script>
<style scoped>
.page-style {
  padding: 20px;
  box-sizing: border-box;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>

