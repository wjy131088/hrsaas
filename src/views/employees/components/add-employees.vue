<template>
  <el-dialog title="新增员工" :visible="dialogVisible" @close="handleClose">
    <!-- 表单 -->
    <el-form ref="addEmploy" :rules="rules" label-width="120px" :model="formData">
      <el-form-item prop="username" label="姓名">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="mobile" label="手机">
        <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item prop="timeOfEntry" label="入职时间">
        <el-date-picker v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item prop="formOfEmployment" label="聘用形式">
        <el-select v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择">
          <el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item prop="workNumber" label="工号">
        <el-input v-model="formData.workNumber" style="width:80%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item prop="departmentName" label="部门">
        <el-input v-model="formData.departmentName" style="width:80%" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree
          v-show="isShow"
          v-loading="loading"
          style="width:80%"
          :data="treeData"
          default-expand-all
          :props="{label:'name'}"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item prop="correctionTime" label="转正时间">
        <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import employeesEnum from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import { addEmployee } from '@/api/employees'
import { tranListToTreeData } from '@/utils/index'
export default {
  name: 'HrsaasAddEmployee',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      hireType: employeesEnum.hireType,
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间', trigger: 'blur' }
        ]
      },
      treeData: [
        { name: '行政部', manger: '刘备' }
      ],
      isShow: false,
      loading: false
    }
  },
  methods: {
    handleClose() {
      this.$refs.addEmploy.resetFields()
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$emit('update:dialogVisible')
    },
    async getDepartments() {
      this.isShow = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) {
      this.formData.departmentName = node.name
      this.isShow = false
    },
    // 点击确实调用接口
    async btnOk() {
      try {
        // 表单校验通过
        await this.$refs.addEmploy.validate()
        // 调用接口
        await addEmployee(this.formData)
        // 关掉弹窗
        this.handleClose()
        // 调用父组件方法  获取列表的方法
        this.$parent.getEmployeeList()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>

</style>
