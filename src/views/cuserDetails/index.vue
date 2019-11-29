<template>
  <div>
    <el-page-header content="普通用户详情" @back="goBack" />
    <!-- 数据 -->
    <div style="margin-top:20px">
      <div>
        <span>用户昵称：</span>
        <span>{{ topData.nickName }}</span>
      </div>
      <el-divider />
      <div>
        <span>角色：</span>
        <span>{{ topData.userType }}</span>
      </div>
      <el-divider />
      <div>
        <span>手机号：</span>
        <span>{{ topData.mobilePhone }}</span>
      </div>
      <el-divider />
      <div>
        <span>注册时间：</span>
        <span>{{ topData.registTime }}</span>
      </div>
      <el-divider />
      <div>
        <span>最后登录时间：</span>
        <span>{{ topData.loginTime }}</span>
      </div>
      <el-divider />
      <div v-if="topData.tgName">
        <span>推广人：</span>
        <span>{{ topData.tgName }}</span>
      </div>
      <el-divider v-if="topData.tgName" />
      <div v-if=" topData.yqName ">
        <span>邀请人：</span>
        <span>{{ topData.yqName }}</span>
      </div>
      <el-divider v-if=" topData.yqName " />
      <div>
        <span>待完成订单：</span>
        <span>{{ topData.orderStatus3 }}</span>
      </div>
      <el-divider />
      <div>
        <span>累计订单：</span>
        <span>{{ topData.orderStatus5 }}</span>
      </div>
      <el-divider />
      <div>
        <span>头像：</span>
        <span>{{ topData.avatar }}</span>
      </div>
      <el-divider />
      <div class="address">
        <span style="margin-right:50px">地址:</span>
        <div class="address-details">
          <div v-for="(item,index) in address" :key="item.addressId">
            <span>{{ index+1 }}.{{ item.addressArea }}{{ item.detailAddress }}</span>
            <el-divider />
          </div>
        </div>
      </div>
      <el-divider />
      <div>
        <span>订单流水记录：</span>
        <span>{{ topData.count }}</span>
      </div>
      <el-divider />
      <!-- 表格 -->
      <div style="margin-top:20px">
        <el-table :data="list" border="" style="width: 100%">
          <el-table-column prop="createtime" label="下单时间" align="center" />
          <el-table-column prop="orderid" label="订单号" align="center" />
          <el-table-column prop="weight" label="订单重量" align="center" />
          <el-table-column prop="money" label="订单金额" align="center" />
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
    <!-- 表格 -->
  </div>
</template>
<script>
import cuserDetails from './cuserDetails'
export default cuserDetails
</script>
<style scoped>
.address {
  display: flex;
  align-items: flex-start;
}
.address-details {
  display: flex;
  flex-direction: column;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
