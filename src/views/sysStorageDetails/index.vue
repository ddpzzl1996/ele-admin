<template>
  <div>
    <!-- 头部卡片 -->
    <div class="card">
      <el-card shadow="always">
        <div class="card-details">
          <span>总入库重量(吨)</span>
          <span class="card-num">{{ topData.storageWeight }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>日均入库重量(吨)</span>
          <span class="card-num">{{ topData.dayStorageWeight }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>总入库金额(万元)</span>
          <span class="card-num">{{ topData.storageMoney }}</span>
        </div>
      </el-card>
      <el-card shadow="always">
        <div class="card-details">
          <span>日均入库金额(万元)</span>
          <span class="card-num">{{ topData.dayStorageMoney }}</span>
        </div>
      </el-card>
    </div>
    <!-- 仓库名字 -->
    <div class="storagename">{{ topData.storagename }}</div>
    <!-- 柱状图 -->
    <div class="select">
      <div style="margin-top:20px;margin-right:30px">
        <el-radio-group v-model="radio1" @change="radioChange">
          <el-radio-button label="1">订单量</el-radio-button>
          <el-radio-button label="2">金额</el-radio-button>
          <el-radio-button label="3">重量</el-radio-button>
        </el-radio-group>
      </div>
      <div style="margin-top:20px">
        <el-radio-group v-model="formData.timeType" @change="getList">
          <el-radio-button label="week">周</el-radio-button>
          <el-radio-button label="month">月</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div id="myChart" :style="{width: '100%', height: '500px'}" />
    <!-- 饼状图 -->
    <div style="margin-top:20px">
      <el-radio-group v-model="formData.imageType" @change="getList">
        <el-radio-button label="week">周</el-radio-button>
        <el-radio-button label="month">月</el-radio-button>
      </el-radio-group>
    </div>
    <div class="totalMoney">总额：{{ totalMoney }}</div>
    <div id="myChart1" :style="{width: '100%', height: '300px'}" />
  </div>
</template>
<script>
import sysStorageDetails from './sysStorageDetails'
export default sysStorageDetails
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
.storagename {
  font-size: 28px;
  font-weight: bold;
  margin-top: 20px;
}
.select{
  display: flex;
}
.totalMoney{
  font-size: 28px;
  font-weight: bold;
  margin-top: 20px;
}
</style>

