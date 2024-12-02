<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible" title="图片上传">
      <el-upload
        :multiple="true"
        :headers="headers"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :before-upload="beforeUpload"
        :http-request="onUpload"
        class="editor-slide-upload"
        action="images"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          点击上传
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        完成
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { uploadFile } from '@/api/global'
// import { getToken } from 'api/qiniu'
let uploadLoading = null
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      headers: {
        token: getToken()
      }
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功。如果是网络问题，请刷新页面重新上传!')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    onUpload(res) {
      const form = new FormData()
      form.append('file', res.file)
      form.append('cancelHttp', true)
      uploadLoading = this.$loading({
        text: '图片上传中...'
      })
      return uploadFile('product-content', form)
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      uploadLoading.close()
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.url
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleError() {
      uploadLoading.close()
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const isIMG = ['image/jpeg', 'image/png'].includes(file.type)
      const isLt1M = file.size / 1024 / 1024 < 2
      if (!isIMG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      if (!isIMG || !isLt1M) {
        return false
      }
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
