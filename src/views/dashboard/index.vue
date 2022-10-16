<template>
  <div class="dashboard-container">
    <upload-img @on-success="onSuccess1" />
    <upload-img @on-success="onSuccess=2" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    // UploadExcel
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSuccess(data) {
      console.log('data', data)
    },
    beforeUpload(file) {
      console.log('file', file)
      if (file.size > 1024) {
        this.$message.error('to Big')
        return false
      }
      return true
    },
    onSuccess1(val) {
      console.log('123', val)
    },
    onSuccess2(val) {
      console.log('456', val)
    }
  }

}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
