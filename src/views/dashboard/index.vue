<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <UploadExcel :on-success="handleSuccess" :before-upload="beforeUpload" /> -->
  </div>
</template>

<script>
// import UploadExcel from '@/components/UploadExcel'
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
