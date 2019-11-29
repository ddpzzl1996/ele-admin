<template>
  <div>
    <div v-show="assign">
      <div class="lastData">
        <div>
          <span>订单状态：{{ topData.orderStatus | getStatus }}</span>
          <span />
        </div>
        <div>
          <span>订单编号：{{ topData.orderId }}</span>
          <span />
        </div>
        <div>
          <span>下单时间：{{ topData.createTime }}</span>
          <span />
        </div>
        <div>
          <span>预约时间：{{ topData.reserveTime }}</span>
          <span />
        </div>
        <div>
          <span>下单用户：{{ topData.relaName }}({{ topData.mobilePhone }})</span>
          <span />
        </div>
        <div>
          <span>地址：{{ topData.addressArea }}{{ topData.address }}</span>
          <span />
        </div>
        <div v-if="topData.remark">
          <span>备注：{{ topData.remark }}</span>
          <span />
        </div>
        <div>
          <span>回收人员：{{ topData.name }}</span>
          <span />
        </div>
        <div>
          <span>接单时间：{{ topData.receiveTime }}</span>
          <span />
        </div>
        <!-- <div>
          <span>取消时间：{{ topData.receiveTime }}</span>
          <span />
        </div> -->
        <!-- <div>
          <span>取消原因：{{ topData.receiveTime }}</span>
          <span />
        </div> -->
      </div>
      <!-- 指派订单 -->
      <div v-if="topData.orderStatus == 1 || topData.orderStatus == 2" style="margin-top:20px">
        <el-button v-if="topData.orderStatus == 1" type="primary" @click="assignOrder">指派工作人员</el-button>
        <el-button v-if="topData.orderStatus == 2" type="primary" @click="assignOrder">重新指派</el-button>
        <el-button type="danger" @click="cancel">取消订单</el-button>
      </div>
      <!-- 表格 -->
      <div style="margin-top:20px">
        <el-table :data="list" border="" style="width: 100%">
          <el-table-column prop="title" label="物品类型" align="center" />
          <el-table-column prop="weight" label="重量(kg)" align="center" />
          <el-table-column prop="money" label="金额(元)" align="center" />
        </el-table>
        <div class="pagination">
          <el-pagination
            :current-page="formData.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="formData.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <!-- 取消订单弹窗 -->
      <el-dialog title="取消订单" :visible.sync="cancelOrder" width="50%" :before-close="handleClose">
        <el-input
          v-model="cancelReasonName"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入取消原因"
        />
        <div class="btn">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="cancellation">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-show="!assign">
      <el-button round @click="back">返回</el-button>
      <div style="margin-top:20px">
        <el-table :data="recoverList" border="" style="width: 100%">
          <el-table-column prop="name" label="昵称" align="center" />
          <el-table-column prop="mobilePhone" label="手机号" align="center" />
          <el-table-column prop="unFinishOrder" label="待完成订单" align="center" />
          <el-table-column prop="finishOrder" label="已完成订单" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="sureAssign(scope.row)">指派ta</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            :current-page="formData.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="recoverFrom.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count1"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
          />
        </div>
      </div>
      <!-- 指派弹窗 -->
      <el-dialog title="指派订单" :visible.sync="assignPopus" width="50%" :before-close="handleClose">
        <div class="popus">
          <div>订单号：{{ topData.orderId }}</div>
          <div>
            是否指派给：{{ assignObj.name }}
          </div>
          <div class="status">
            <div>待完成：{{ assignObj.unFinishOrder }}</div>
            <div style="margin-left:20px">已完成：{{ assignObj.finishOrder }}</div>
          </div>
        </div>
        <div class="btn">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="sureOrder">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import orderDetails from './orderDetails'
export default orderDetails
</script>
<style scoped>
.lastData>*{
margin-top: 20px;
}
.popus>*{
  margin-top: 20px;
}
.popus{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.status{
  display: flex;
}
.btn{
  margin-top: 20px;
  text-align: right;
}
</style>
