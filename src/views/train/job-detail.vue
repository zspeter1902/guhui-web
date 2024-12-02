<template>
  <div class="news-container">
    <!-- banner -->
    <banner :banner="banner" />
    <div class="container">
      <breadcrumb />
      <article v-loading="loading" class="detail">
        <div class="article-header">
          <h4 class="article-title">{{ article.post }}</h4>
        </div>
        <div class="article-content">
          <el-row type="flex" justify="space-between">
            <div>
              <p class="column">招聘公司：{{ article.companyName }}</p>
              <p class="column">招聘人数：{{ article.postNum }}</p>
              <!-- warn -->
              <p class="column">学历要求：<span class="">{{ article.education }}</span></p>
              <p class="column">工作地点：{{ article.workPlace }}</p>
              <p class="column">薪酬：{{ article.salary }}</p>
              <p class="column">发布时间：<span class="">{{ article.updateTime || article.createTime }}</span></p>

              <div class="about">
                <p class="column">职位描述：</p>
                <div v-html="article.duty" />
              </div>
            </div>
            <div>
              <el-button type="primary" @click="visible = true">立即投递</el-button>
            </div>
          </el-row>
        </div>
        <!-- <div class="article-footer"></div> -->
      </article>
    </div>
    <!--简历投递 -->
    <el-dialog title="填写投递信息" :visible.sync="visible" :before-close="beforeClose">
      <el-form ref="form" class="info-form" :model="formData" :rules="rules" label-width="100px" :label-position="mobile ? 'top' : 'right'">
        <el-row type="flex" :gutter="30" class="flex-wrap">
          <el-col :sm="12" :xs="24">
            <el-form-item label="您的姓名" prop="customerName">
              <el-input v-model="formData.customerName" placeholder="请填入您的姓名" />
            </el-form-item>
          </el-col>
          <el-col :sm="12" :xs="24">
            <el-form-item label="您的手机" prop="customerPhone">
              <el-input v-model="formData.customerPhone" placeholder="请填入您的手机" />
            </el-form-item>
          </el-col>

          <el-col :sm="24" :xs="24">
            <el-form-item label="您的邮箱" prop="customerEmail">
              <el-input v-model="formData.customerEmail" placeholder="请填入您的邮箱" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :xs="24">
            <el-form-item label="简介" prop="about">
              <el-input v-model="formData.about" placeholder="请填入简介" type="textarea" :rows="4" maxlength="300" show-word-limit />
            </el-form-item>
          </el-col>

          <el-col :sm="24" :xs="24">
            <el-form-item ref="file" label="简历" prop="file">
              <el-upload
                ref="upload"
                action="file"
                :show-file-list="true"
                :auto-upload="false"
                accept="image/png, image/jpeg, application/msword, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                class="uploader"
                :limit="1"
                :before-upload="beforeUpload"
                :on-remove="handleRemove"
                :on-change="handleUploadChange"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">推荐上传jpg/png/pdf/doc/docx文件，且不超过3MB</div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item class="text-center">
          <el-button type="primary" :disabled="disabled" @click="onSubmit('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { isValidPhone } from '@/utils/validate'
import Breadcrumb from '@/components/Breadcrumb'
import Banner from '@/components/Banner'
import { getJobDetail, sendResume } from '@/api/content'
export default {
  name: 'TrainJobDetail',
  components: { Banner, Breadcrumb },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!isValidPhone(value)) {
        callback(new Error('请输入正确的手机号！'))
      } else {
        callback()
      }
    }
    return {
      title: '职业详情',
      visible: false,
      loading: false,
      banner: require('img/news-banner.png'),
      article: {},
      disabled: false,
      formData: {
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        about: '',
        targetCompanyCode: '',
        title: '',
        file: null
      },
      rules: {
        customerName: [
          { required: true, message: '请填入您的姓名！', trigger: 'blur' },
          { max: 30, message: '姓名超出30个字符串！' }
        ],
        customerPhone: [
          { required: true, trigger: 'blur', validator: validatePhone }
        ],
        customerEmail: [
          { required: true, message: '请填入您的邮箱！', trigger: 'blur' },
          { type: 'email', message: '请输入正确的联系人邮箱', trigger: ['blur', 'change'] }
        ],
        about: [
          { required: true, message: '请填入简介！', trigger: 'change' }
        ],
        file: [
          { required: true, message: '请上传简历！', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    id({ $route }) {
      return $route.params.id
    },
    mobile({ $store }) {
      return $store.getters.device === 'mobile'
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.loading = true
      getJobDetail(this.id).then(res => {
        this.article = res.recruit
        this.$set(this.formData, 'targetCompanyCode', res.recruit.companyCode)
        this.$set(this.formData, 'title', res.recruit.post)
        this.setTitle(res.recruit.post)
        this.loading = false
      })
    },
    beforeUpload(file) {
      const isIMG = ['image/jpeg', 'image/png', 'application/msword', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 3
      if (!isIMG) {
        this.$message.error('上传文件推荐 JPG、PNG、DOC、DOCX、PDF等格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 3MB!')
      }
      return isIMG && isLt2M
    },
    handleRemove(file, fileList) {
      this.$set(this.formData, 'file', '')
    },
    handleUploadChange(file, fileList) {
      this.$set(this.formData, 'file', file)
    },
    beforeClose(done) {
      !this.disabled && done()
    },
    onSubmit(formName) {
      this.disabled = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.send()
        } else {
          console.error('error submit!!')
          this.disabled = false
          return false
        }
      })
    },
    send() {
      const form = new FormData()
      for (const key in this.formData) {
        if (key === 'file') {
          form.append(key, this.formData[key].raw)
        }
        form.append(key, this.formData[key])
      }
      sendResume(form).then(res => {
        this.disabled = false
        this.visible = false
        this.$message.success('上传成功！')
        this.$refs.form.clearValidate()
      }).catch(err => {
        console.log(err)
        this.disabled = false
      })
    },
    setTitle(title) {
      this.$route.meta.title = title
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
.detail {
  padding: 20px 0 40px;
  .article-header {
    margin-bottom: 20px;
    padding-bottom: 0px;
    border-bottom: 1px dashed #ddd;
  }
  .article-title {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 20px;
    text-indent: 1em;
    font-weight: bold;
  }
  .article-content {
    font-size: 16px;
    line-height: 36px;
    text-indent: 2em;
    text-align: justify;
    .warn {
      color: $redColor;
    }
    .about {
      margin-top: 10px;
      ::v-deep {
        a {
          color: $mainColor;
          text-decoration: underline;
        }
      }
    }
  }
}
@media only screen and (max-width: 1199px) {
  .detail {
    padding: 18px 0 36px;
  }
}
@media only screen and (max-width: 991px) {
  .detail {
    padding: 15px 0 30px;
  }
}
@media only screen and (max-width: 767px) {
  .detail {
    padding: 10px 0 20px;
    .article-header {
      margin-bottom: 15px;
      padding-bottom: 15px;
    }
    .article-title {
      font-size: 20px;
      line-height: 30px;
      margin-bottom: 15px;
    }
    .article-content {
      font-size: 14px;
      line-height: 34px;
    }
  }
}
</style>
