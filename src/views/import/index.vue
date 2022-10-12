<template>
  <div>
    <upload-excel :on-success="handleSuccess" />
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
import { importEmployee } from '@/api/employees'
export default {
  name: 'HrsaasIndex',
  components: {
    UploadExcel
  },
  methods: {
    async handleSuccess({ header, results }) {
      console.log(header, results)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        console.log(item)
        // 拿到每个key值 key拿到的是中文
        // userRelations[key] 英文属性
        // userinfo添加属性  userinfo.timeOfEntry属性
        const userinfo = {}
        Object.keys(item).forEach(key => {
          userinfo[userRelations[key]] = item[key]
        })
        arr.push(userinfo)
      })
      console.log(arr)
      //   调批量新增的接口  然后把数据给后端
      // 封装接口
      // 提示
      // 返回上一页
      await importEmployee(arr)
      this.$message.success('批量导入成功')
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
