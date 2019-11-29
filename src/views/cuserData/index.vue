<template>
  <div class="page-style">
    <div v-show="$route.meta.menuCode === 'CuserData'">
      <!-- 头部数据 -->
      <div class="card">
        <el-card shadow="always">
          <div class="card-details">
            <span>注册用户量</span>
            <span class="card-num">{{ topData.allNomUser }}</span>
          </div>
        </el-card>
        <el-card shadow="always">
          <div class="card-details">
            <span>今日新增用户</span>
            <span class="card-num">{{ topData.todayNewUser }}</span>
          </div>
        </el-card>
        <el-card shadow="always">
          <div class="card-details">
            <span>日活跃用户</span>
            <span class="card-num">{{ topData.userVisit }}</span>
          </div>
        </el-card>
      </div>
      <!-- 查询内容 -->
      <div style="margin-top:20px">
        <el-input
          v-model="formData.mobilePhone"
          size="small"
          placeholder="请输入电话"
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
          <el-table-column prop="nickName" label="昵称" align="center" />
          <el-table-column prop="mobilePhone" label="手机号" align="center" />
          <el-table-column prop="registTime" label="注册时间" align="center" />
          <el-table-column prop="orderStatus3" label="待完成订单" align="center" />
          <el-table-column prop="orderStatus5" sortable label="累计订单" align="center" />
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
            :total="topData.count"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.menuCode !== 'CuserData'" />
    </keep-alive>
  </div>
</template>
<script>
import cuserData from './cuserData'
export default cuserData
</script>
<style scoped>
.page-style {
  padding: 20px;
  box-sizing: border-box;
}
.card {
  display: flex;
  justify-content: space-between;
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

