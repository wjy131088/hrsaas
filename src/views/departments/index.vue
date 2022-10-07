<template>
  <div>
    <div v-loading="loading" class="departments-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <tree-tools :tree-node="company" :is-root="false" @addDept="handleAddDepts" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
      </el-card>
      <el-tree style="padding:0 20px;" :data="departs" :props="defaultProps" default-expand-all>
        <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
        <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
        <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
        <tree-tools slot-scope="{ data }" :tree-node="data" @refreshList="getDepartments" @editDept="editDept" @addDept="handleAddDepts" />
      </el-tree>
      <add-dept ref="addDept" :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept' // 引入新增部门组件
export default {
  name: 'HrsaasIndex',
  components: { TreeTools, AddDept },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人', id: '' },
      departs: [
        { name: '总裁办', manager: '曹操',
          children: [
            { name: '董事会', manager: '曹丕' }
          ]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      dialogVisible: false,
      currentNode: {},
      losding: false
    }
  },

  mounted() {

  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { companyName, depts, companyMange } = await getDepartments()
        this.company = { name: companyName, manager: companyMange, id: '' }
        this.departs = tranListToTreeData(depts, '')
      } finally {
        this.loading = false
      }
    },
    handleAddDepts(node) {
      this.dialogVisible = true // 显示弹层
      this.currentNode = node
    },
    editDept(node) {
      this.dialogVisible = true // 显示弹层
      this.currentNode = { ...node }
      this.$refs.addDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss" scoped>
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree-node__content {
      padding-right: 20px;
    }
}
</style>
