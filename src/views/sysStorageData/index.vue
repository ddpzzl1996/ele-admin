<template>
  <div class="page-style">
    <div v-show="$route.meta.menuCode === 'SysStorageData'">
      <!-- 头部卡片 -->
      <div class="card">
        <el-card shadow="always">
          <div class="card-details">
            <span>仓库总数量</span>
            <span class="card-num">{{ topData.count }}</span>
          </div>
        </el-card>
        <el-card shadow="always">
          <div class="card-details">
            <span>总入库重量(吨)</span>
            <span class="card-num">{{ topData.allWeight }}</span>
          </div>
        </el-card>
        <el-card shadow="always">
          <div class="card-details">
            <span>日均入库重量(吨)</span>
            <span class="card-num">{{ topData.allDayWeight }}</span>
          </div>
        </el-card>
        <el-card shadow="always">
          <div class="card-details">
            <span>总入库金额(万元)</span>
            <span class="card-num">{{ topData.allMoney }}</span>
          </div>
        </el-card>
        <el-card shadow="always">
          <div class="card-details">
            <span>日均入库金额(万元)</span>
            <span class="card-num">{{ topData.allDayMoney }}</span>
          </div>
        </el-card>
      </div>
      <!-- 查询内容 -->
      <div style="margin-top:20px">
        <el-select
          v-model="formData.area"
          clearable
          placeholder="请选择地区"
          size="small"
          style="width:180px"
          @change="getList"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
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
          <el-table-column prop="areaname" label="所属地区" align="center" />
          <el-table-column prop="storagename" label="仓库名称" align="center" />
          <el-table-column prop="orderNum" label="累计订单量" align="center" />
          <el-table-column prop="storageWeight" label="总入库重量(吨)" align="center" />
          <el-table-column prop="dayStorageWeight" sortable label="日均入库重量(吨)" align="center" />
          <el-table-column prop="storageMoney" label="总入库金额(万元)" align="center" />
          <el-table-column prop="dayStorageMoney" label="日均入库金额(万元)" align="center" />
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
      <!--  -->
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.menuCode !== 'SysStorageData'" />
    </keep-alive>
  </div>
</template>
<script>
import sysStorageData from './sysStorageData'
export default sysStorageData
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
