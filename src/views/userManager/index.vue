<template>
  <div class="app-container">
    <div class="search">
      <el-input
        v-model="pageSize.code"
        clearable
        placeholder="请输入账号"
        size="small"
        style="width:200px"
      >
        <template slot="prepend">账号</template>
      </el-input>
      <el-input
        v-model="pageSize.name"
        clearable
        placeholder="请输入名称"
        size="small"
        style="width:200px"
      >
        <template slot="prepend">名称</template>
      </el-input>
      <div class="block">
        <el-cascader
          style="width:180px"
          :props="props"
          :options="organization"
          placeholder="请选择部门"
          size="small"
          clearable
          @change="handleChange"
        />
      </div>
      <el-select
        v-model="pageSize.state"
        clearable
        placeholder="请选择状态"
        size="small"
        style="width:180px"
      >
        <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id" />
      </el-select>
      <div class="block">
        <el-cascader
          style="width:180px"
          :props="props1"
          :options="jobList"
          placeholder="请选择岗位"
          size="small"
          clearable
          @change="handleChange1"
        />
      </div>
      <div class="block">
        <el-date-picker
          v-model="value4"
          value-format="yyyy-MM-dd"
          size="small"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleChangeData"
        />
      </div>
      <div>
        <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="add">新增</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div style="margin-top:20px">
      <el-table :data="list" border="" style="width: 100%" align="center">
        <el-table-column prop="id" label="id" width="100" />
        <el-table-column prop="code" label="用户名" width="100" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="orgName" label="机构" />
        <el-table-column prop="stateText" label="状态" width="100" />
        <el-table-column prop="jobType0Text" label="职位" width="100" />
        <el-table-column prop="jobType1Text" label="职位明细" width="100" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="warning" size="mini" @click="updataPwd(scope.$index, scope.row)">修改密码</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="新增用户" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="用户账号" prop="code">
          <el-input v-model="ruleForm.code" />
        </el-form-item>
        <el-form-item label="所在部门" prop="orgId">
          <el-cascader
            style="width:180px"
            :props="props"
            :options="organization"
            placeholder="请选择部门"
            size="small"
            clearable
            @change="addChange"
          />
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select
            v-model="ruleForm.state"
            clearable
            placeholder="请选择状态"
            size="small"
            style="width:180px"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="职务类型" prop="jobType1">
          <el-cascader
            style="width:180px"
            :props="props1"
            :options="jobList"
            placeholder="请选择岗位"
            size="small"
            clearable
            @change="addChange1"
          />
        </el-form-item>
        <el-form-item class="sumit">
          <el-button @click="resetForm(ruleForm)">取 消</el-button>
          <el-button type="primary" @click="submitForm(ruleForm)">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改密码弹窗 -->
    <el-dialog title="修改密码" :visible.sync="dialogUpdata" width="50%" :before-close="handleClose">
      <el-form
        ref="updataForm"
        :model="updataForm"
        :rules="updataRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="updataForm.name" />
        </el-form-item>
        <el-form-item label="用户账号" prop="code">
          <el-input v-model="updataForm.code" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="updataForm.password" />
        </el-form-item>
        <el-form-item label="密码确认" prop="surePassword">
          <el-input v-model="updataForm.surePassword" />
        </el-form-item>
        <el-form-item class="sumit">
          <el-button @click="resetUpdataForm(updataForm)">取 消</el-button>
          <el-button type="primary" @click="updataPwdSubmit(ruleForm)">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import UserManager from './userManager.js'
export default UserManager
</script>
<style scoped>
.search {
  display: flex;
  align-items: center;
  flex: 1;
}
.search > * {
  margin-right: 20px;
}
.sumit {
  text-align: right;
}
</style>
