import { getUserManagerList, getOrganization, typeValue, addUers, deleteUers, updataPwd } from '@/api/user'
import { Message } from 'element-ui'
export default {
  name: 'UserManager',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (/[\u4E00-\u9FA5]/g.test(value)) {
          callback(new Error('密码不能输入汉字!'))
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.updataForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      options: [],
      list: [], // 表格列表
      jobList: [],
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      input1: '',
      input2: '',
      input3: '',
      organization: [], // 组织机构
      rtArr: [],
      dialogVisible: false, // 新增弹窗
      dialogUpdata: false, // 修改密码弹窗
      pageSize: {
        page: 1,
        limit: 10,
        code: '', // 账号
        name: '', // 名称
        orgId: '', // 部门
        state: '', // 状态
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        jobType0: '', // 职务
        jobType1: '' // 职务明细
      },
      // 新增表单内容
      ruleForm: {
        name: '',
        code: '',
        orgId: '',
        state: '',
        jobType0: '',
        jobType1: ''
      },
      updataForm: {
        name: '',
        code: '',
        password: '',
        surePassword: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        orgId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ],
        jobType0: [
          { required: true, message: '请选择职务', trigger: 'change' }
        ],
        jobType1: [
          { required: true, message: '请选择职务明细', trigger: 'change' }
        ]
      },
      updataRules: {
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        surePassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      props: {
        value: 'id',
        label: 'name',
        children: 'children',
        checkStrictly: true
      },
      props1: {
        value: 'id',
        label: 'name',
        children: 'childen',
        checkStrictly: true
      }
    }
  },
  created() {
    this.getList() // 列表
    this.getOrganization() // 组织机构
    this.getTypeValue({ type: 'user_state' }) // 获取状态类型
    this.getTypeValue({ type: 'job_type' }) // 岗位类型
  },
  methods: {
    // 列表查询
    getList() {
      getUserManagerList(this.pageSize).then(res => {
        console.log(res.data, '列表')
        if (res.code === 0) {
          this.list = res.data
        }
      }).catch(err => {
        console.log(err)
        // reject(err)
      })
    },
    getTypeValue(obj) {
      // 类型查询
      typeValue(obj).then(res => {
        console.log(res, '用户状态')
        if (res.code === 0) {
          switch (obj.type) {
            // 获取状态类型
            case 'user_state':
              res.data.forEach(element => {
                element.label = element.name
              })
              this.options = res.data
              break
            // 岗位类型
            case 'job_type':
              console.log(res.data, '岗位类型')
              this.jobList = res.data
              break
            default:
              break
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 组织机构
    getOrganization() {
      getOrganization({ id: sessionStorage.getItem('userId') }).then(res => {
        if (res.code === 0) {
          // const arr = this.getNewData(res.data)
          this.organization = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 修改密码
    updataPwd(index, con) {
      console.log(con)
      this.updataForm.name = con.name
      this.updataForm.code = con.code
      this.dialogUpdata = true
    },
    // 编辑
    handleEdit(index, con) {
      console.log(index, con)
    },
    // 删除
    handleDelete(index, con) {
      console.log(index, con.id)
      deleteUers({ id: con.id }).then(res => {
        console.log(res)
        if (res.code === 0) {
          Message({
            message: res.msg,
            title: res.msg,
            type: 'success'
          })
          this.getList()
        }
      }).catch(err => {
        Message.error({
          message: err.msg
        })
      })
    },
    // 修改密码确认
    updataPwdSubmit() {
      this.$refs['updataForm'].validate((valid) => {
        if (valid) {
          updataPwd({ password: this.updataForm.password }).then(res => {
            if (res.code === 0) {
              Message({
                message: res.msg,
                title: res.msg,
                type: 'success'
              })
              this.getList()
              this.resetUpdataForm()
            }
          }).catch(err => {
            Message.error({
              message: err.msg
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 选择组织机构
    handleChange(item) {
      console.log(item)
      if (item == '') {
        this.pageSize.orgId = ''
      }
      if (item[0]) {
        if (item[1]) {
          this.pageSize.orgId = item[1]
        } else {
          this.pageSize.orgId = item[0]
        }
      }
    },
    // 搜索
    search() {
      this.getList()
    },
    // 选择岗位
    handleChange1(item) {
      if (item == '') {
        this.pageSize.jobType0 = ''
        this.pageSize.jobType1 = ''
      }
      if (item[0]) {
        this.pageSize.jobType0 = item[0]
        if (item[1]) {
          this.pageSize.jobType1 = item[1]
        }
      }
    },
    // 新增提交
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          addUers(this.ruleForm).then(res => {
            if (res.code === 0) {
              Message({
                message: res.msg,
                title: res.msg,
                type: 'success'
              })
              this.getList()
              this.resetForm()
            }
          }).catch(err => {
            Message.error({
              message: err.msg
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 日期选择器
    handleChangeData(item) {
      console.log(item)
      if (item == '') {
        this.pageSize.startTime = ''
        this.pageSize.endTime = ''
      }
      if (item[0]) {
        this.pageSize.startTime = item[0]
        if (item[1]) {
          this.pageSize.endTime = item[1]
        }
      }
    },
    // 重置修改密码表单
    resetUpdataForm() {
      this.$refs['updataForm'].resetFields()
      this.dialogUpdata = false
    },
    // 新增选择职务
    addChange1(item) {
      if (item[0]) {
        this.ruleForm.jobType0 = item[0]
        if (item[1]) {
          this.ruleForm.jobType1 = item[1]
        }
      }
    },
    // 用户新增
    add() {
      this.dialogVisible = true
    },
    // 重置表单
    resetForm(formName) {
      this.$refs['ruleForm'].resetFields()
      this.dialogVisible = false
    },
    // 弹窗关闭
    handleClose() {

    },
    addChange(item) {
      if (item[0]) {
        if (item[1]) {
          this.ruleForm.orgId = item[1]
        } else {
          this.ruleForm.orgId = item[0]
        }
      }
    }
  }
}
