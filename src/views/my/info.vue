<template>
  <el-form ref="form" v-loading="loading" class="info-form" :model="form" :rules="rules" label-width="108px" :label-position="mobile ? 'top' : 'right'">
    <el-row type="flex" :gutter="30" class="flex-wrap">
      <el-col :sm="12" :xs="24">
        <el-form-item label="企业名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item label="企业官网" prop="webUrl">
          <el-input v-model="form.webUrl" type="url" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item label="企业信用代码" prop="companyCode">
          <el-input v-model="form.companyCode" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item label="企业类型" prop="companyType">
          <el-select v-model="form.companyType" placeholder="请选择" filterable size="small" clearable class="filter-item">
            <el-option v-for="item of companyType" :key="item.id" :value="item.dictCode" :label="item.dictName" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item label="联系人" prop="contactName">
          <el-input v-model="form.contactName" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item label="联系人电话" prop="contactPhone">
          <el-input v-model.number="form.contactPhone" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item label="联系人邮箱" prop="contactEmail">
          <el-input v-model="form.contactEmail" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item label="主要交易平台" prop="mainTradings">
          <el-select
            v-model="platforms"
            value-key="id"
            filterable
            clearable
            multiple
            placeholder="请选择交易平台"
            style="width: 100%"
            @change="onSelectPlatform"
            @clear="clearSelect"
          >
            <el-option
              v-for="item of platformList"
              :key="item.id"
              :label="item.name"
              :value="item" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item label="省市区">
          <el-cascader
            v-model="region"
            placeholder="请选择省市区"
            :options="selectOption"
            filterable
            @change="changeRegion"
          />
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item label="详细地址" :rules="rules.addr" prop="addr">
          <el-input v-model="form.addr" placeholder="请填写具体地址" />
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item ref="logoUrl" label="企业LOGO" prop="logoUrl">
          <el-upload
            action="logoUrl"
            :show-file-list="false"
            :auto-upload="true"
            accept="image/png, image/jpeg"
            class="uploader"
            :before-upload="beforeUpload"
            :headers="headers"
            :http-request="onUpload"
          >
            <div v-if="!form.logoUrl" class="upload-preview">
              <i class="el-icon-upload2 uploader-icon" />
            </div>
            <div v-else>
              <el-image class="el-upload-list__item-thumbnail" :src="form.logoUrl" fit="contain" />
            </div>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :sm="12" :xs="24">
        <el-form-item ref="fileUrl" label="营业执照" prop="fileUrl">
          <el-upload
            action="fileUrl"
            :show-file-list="false"
            :auto-upload="true"
            class="uploader"
            :before-upload="beforeUpload"
            :headers="headers"
            :http-request="onUpload"
          >
            <div v-if="!form.fileUrl" class="upload-preview">
              <i class="el-icon-upload2 uploader-icon" />
            </div>
            <div v-else>
              <el-image class="el-upload-list__item-thumbnail" :src="form.fileUrl" fit="contain" />
            </div>
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :sm="24" :xs="24">
        <el-form-item label="主营品类" prop="mainBusiness">
          <el-input v-model="form.mainBusiness" placeholder="请填写主营品类" />
        </el-form-item>
      </el-col>
      <el-col :sm="24" :xs="24">
        <el-form-item label="企业简介" prop="about">
          <el-input v-model="form.about" placeholder="请输入简介" type="textarea" :rows="8" maxlength="300" resize="none" show-word-limit />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item class="text-center">
      <!-- <el-button type="primary" plain @click="onSubmit('form', false)">暂存</el-button> -->
      <el-button type="primary" :disabled="loading" @click="onSubmit('form', true)">{{ isEdit ? '修改' : '提交' }}</el-button>
      <!-- <p class="tip">提交后，预计两个工作日完成审核</p> -->
    </el-form-item>
  </el-form>
</template>

<script>
import { isValidPhone, isValidCode } from '@/utils/validate'
import { regionData } from 'element-china-area-data'
import { getToken } from '@/utils/auth'
import { getDictList, uploadFile } from '@/api/global'
import { companyAdd, companyUpdate, getOwnCompanyList, getPlatformList } from '@/api/company'
export default {
  name: 'MyInfo',
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!isValidPhone(value)) {
        callback(new Error('请输入正确的手机号！'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (!isValidCode(value)) {
        callback(new Error('企业信用代码输入有误！'))
      } else {
        callback()
      }
    }
    return {
      headers: {
        token: getToken() || '' // getToken()
      },
      loading: false,
      selectOption: regionData,
      companyType: [],
      region: [],
      form: {
        companyName: '',
        webUrl: '',
        contactName: '',
        contactPhone: null,
        companyType: '',
        contactEmail: '',
        addr: '',
        companyCode: '',
        logoUrl: '',
        fileUrl: '',
        about: '',
        mainBusiness: '',
        mainTradings: '',
        mainTradingNames: ''
      },
      rules: {
        companyName: [
          { required: true, message: '请输入企业名称！', trigger: 'blur' },
          { max: 25, message: '25个字符以内！', trigger: ['change', 'blur'] }
        ],
        companyCode: [
          { required: true, message: '请输入企业信用代码！', trigger: 'blur' },
          { validator: validateCode, trigger: ['blur', 'change'] }
        ],
        webUrl: [
          { required: false, message: '请输入企业官网！', trigger: 'blur' },
          { type: 'url', message: '请输入网址', trigger: ['change', 'blur'] },
          { max: 50, message: '50个字符以内！', trigger: ['change', 'blur'] }
        ],
        mainTradings: [
          { required: false, message: '请选择交易平台', trigger: 'change' }
        ],
        mainBusiness: [
          { required: true, message: '主营品类不能为空', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入联系人！', trigger: 'blur' },
          { max: 100, message: '100个字符以内！', trigger: ['change', 'blur'] }
        ],
        contactPhone: [
          { required: true, trigger: 'blur', message: '请输入手机号码！' },
          { trigger: ['blur', 'change'], validator: validatePhone }
        ],
        companyType: [{ required: true, message: '请选择企业类型', trigger: 'change' }],
        contactEmail: [
          { required: true, message: '请输入您的邮箱！', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱！', trigger: ['blur', 'change'] },
          { max: 100, message: '100个字符以内！', trigger: ['change', 'blur'] }
        ],
        addr: [
          { required: true, message: '请填写详情地址！', trigger: 'blur' }
        ],
        logoUrl: [
          { required: true, message: '请上传LOGO！', trigger: 'change' }
        ],
        fileUrl: [
          { required: true, message: '请上传营业执照！', trigger: 'change' }
        ],
        about: [
          { required: true, message: '请输入企业简介！', trigger: 'blur' }
        ]
      },
      platforms: [],
      platformList: [],
      isEdit: false
    }
  },
  computed: {
    mobile({ $store }) {
      return $store.getters.device === 'mobile'
    }
  },
  created() {
    this.getInfo()
    this.getDict()
    this.getPlatform()
  },
  methods: {
    getInfo() {
      getOwnCompanyList().then(res => {
        this.form = res.data
        this.region = [
          res.data.province,
          res.data.city,
          res.data.area
        ]
        if (res.data.mainTradings) {
          const names = res.data.mainTradingNames.split(',')
          const ids = res.data.mainTradings.split(',')
          this.platforms = ids.map((item, index) => {
            return {
              id: +item,
              name: names[index]
            }
          })
          this.isEdit = true
        }
      })
    },
    // 获取基本Map
    getDict() {
      getDictList('company_type').then(res => {
        this.companyType = res.list[0].children
      })
    },
    // 获取电商平台
    getPlatform() {
      getPlatformList({
        serviceType: 'features'
      }).then(res => {
        this.platformList = res.data
      })
    },
    // 选择平台
    onSelectPlatform() {
      const names = this.platforms.map(item => item.name).join(',')
      const ids = this.platforms.map(item => item.id).join(',')
      this.$set(this.form, 'mainTradingNames', names)
      this.$set(this.form, 'mainTradings', ids)
    },
    clearSelect() {
      this.$set(this.form, 'mainTradingNames', '')
      this.$set(this.form, 'mainTradings', '')
    },
    changeRegion(value) {
      this.$set(this.form, 'province', value[0])
      this.$set(this.form, 'city', value[1])
      this.$set(this.form, 'area', value[2])
    },
    onUpload(res) {
      const form = new FormData()
      form.append('file', res.file)
      uploadFile('test', form).then(result => {
        this.$set(this.form, res.action, result.url)
        this.$message.success('上传成功！')
        this.$refs[res.action].clearValidate()
      })
    },
    beforeUpload(file) {
      const isIMG = ['image/jpeg', 'image/png'].includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isIMG) {
        this.$message.error('上传头像图片只能是 JPG、PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isIMG && isLt2M
    },

    onSubmit(formName, bull) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (bull) {
            this.loading = true
            // 提交
            if (this.isEdit) {
              companyUpdate(this.form).then(res => {
                this.$message.success('更新成功！')
                this.loading = false
              }).catch(() => {
                this.loading = false
              })
            } else {
              companyAdd(this.form).then(res => {
                this.$message.success('添加成功！')
                this.getInfo()
                this.loading = false
              }).catch(() => {
                this.loading = false
              })
            }
          } else {
            // 暂存
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
.info-form {
  width: 92%;
  padding: 20px 0;
  .no-margin {
    .el-form-item{
      margin-bottom: 0;
    }
  }
  .el-select,
  .el-cascader {
    width: 100%;
  }
  .dot,
  .tip {
    margin-top: 10px;
    color: $redColor
  }
  .el-button {
    width: 180px;
    margin-top: 20px;
  }
  ::v-deep {
    .el-form-item__label{
      font-weight: normal;
    }
    .el-input{
      font-size: 14px;
      &__inner{
        border-radius: 2px;
        color: #666;
        vertical-align: middle;
        &::placeholder {
          color: rgba(0, 0, 0, 0.25);
        }
      }
    }
    .el-textarea__inner {
      line-height: 30px;
      border-radius: 2px;
      color: #666;
    }
    .el-upload {
      position: relative;
      width: 96px;
      height: 96px;
      border: 1px dashed rgba(0,0,0,0.25);
      border-radius: 2px;
      line-height: 94px;
      overflow: hidden;
      vertical-align: top;
      &:hover {
        border-color: $mainColor;
      }
      .uploader-icon {
        font-size: 24px;
      }
      .el-upload-list__item-thumbnail{
        width: 94px;
        height: 94px;
      }
    }
  }
}

@media only screen and (max-width:767px){
  .info-form {
    width: 100%;
    padding: 10px 0;
  }
}
</style>
