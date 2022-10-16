<template>
  <div>
    <el-upload
      :loading="false"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :limit="1"
      class="custom-upload"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <img style="width:100%;" :src="previewImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDgDiATYUGstsvsQzTzsqnbebS8hBYxHl5',
  SecretKey: 'Lqmv4V3b0VA2oVJygN9oSzOf8YotnV3W'
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      dialogVisible: false,
      previewImgUrl: ''
    }
  },
  watch: {
    defaultUrl() {
      this.fileList.push({
        name: 'default',
        url: this.defaultUrl
      })
    }
  },
  methods: {
    onPreview(file) {
      this.dialogVisible = true
      this.previewImgUrl = file.url
    },
    onRemove(ile, fileList) {
      this.fileList = fileList
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      // console.log(file)
      this.loading = true
      cos.putObject({
        Bucket: 'hz-33-1314348497', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, // 上传文件对象
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) return this.$message.error('上传图片失败')
        this.loading = false
        this.$emit('on-success', {
          imgurl: 'https://' + data.Location
        })
      })
    },
    beforeUpload(file) {
      // 循环查找某一个数据是否在数组中
      // 1. some某一个数据是否在数组中
      // 2.find查找,返回找到的那一项
      // 3.findIndex()查找,找到的那一项的索引更复杂的查找
      // 4. indexof( '1'）查找,返回的索引[{id: 1],{id: 23]用于简单类型数组// 5. incLudes查找,返回的是布尔简单类型数组
      const allowType = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
      if (!allowType.includes(file.type)) {
        console.log(file.type)
        this.$message.error('上传图片只能是' + allowType.join(',') + '格式!')
        return false
      }
      // 限制图片大小
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传图片不能超过1mb')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .custom-upload {
     width: 148px;
     height: 148px;
     overflow: hidden;
   }
</style>
