<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <!-- 放置页签 -->
        <el-tab-pane label="角色管理" name="first">
          <!-- 新增角色按钮 -->
          <el-row :gutter="10">
            <el-button icon="el-icon-plus" size="small" type="primary" style="margin-left:10px;" @click="dialogVisible=true">新增角色</el-button>
          </el-row>
          <!-- 表格 -->
          <el-table :data="roleList">
            <el-table-column label="序号" width="120" type="index" />
            <el-table-column label="角色名称" width="240" prop="name" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作" width="240px">
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row :gutter="10" type="flex" justify="end" align="middle" style="height: 60px">
            <!-- 分页组件 -->
            <el-pagination
              v-if="total>0"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[1,2,4,5,10]"
              :total="total"
              layout="prev, pager, next, sizes"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <addRole ref="addRole" :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import addRole from './components/addRole.vue'
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import { mapGetters } from 'vuex'

export default {
  name: 'HrsaasIndex',
  components: { addRole },
  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      dialogVisible: false,
      companyInfo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRoleList()
  },
  created() {
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      try {
        const { total, rows } = await getRoleList(this.page)
        // console.log(rows)
        this.total = total
        this.roleList = rows
        if (total > 0 && rows.length === 0) {
          this.page.page = this.page.page - 1
          this.getRoleList()
        }
      } catch (error) {
        console.log(error)
      }
    },
    editRole(row) {
      this.$refs.addRole.formData = { ...row }
      this.dialogVisible = true
    },
    async delRole(id) {
      try {
        await this.$confirm('确认删除角色吗？', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        })
        // 只有点击了确定 才能进入到下方
        await deleteRole(id)// 调用删除接口
        this.getRoleList() // 重新加载数据
      } catch (e) {
        console.log('取消')
      }
    },
    // 获取的公司的信息
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.companyId)
      // console.log(this.companyInfo)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
