<template>
  <div v-loading="loading">
    <el-form ref="form" class="info-form" :model="form" :rules="rules" label-width="100px" :label-position="mobile ? 'top' : 'right'">
      <el-row type="flex" :gutter="30" class="flex-wrap">
        <el-col :sm="12" :xs="24">
          <el-form-item label="产品名称" prop="title">
            <el-input v-model="form.title" placeholder="请填入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="产品价格" prop="price">
            <el-input v-model="form.price" placeholder="请填入(1元/kg 或 面议)" />
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="选择类别" prop="categoryP">
            <el-select v-model="form.categoryP" placeholder="请选择" @change="onSelectChange">
              <el-option
                v-for="item in serviceList"
                :key="item.dictCode"
                :label="item.dictName"
                :value="item.dictCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="选择子类别" prop="categoryC">
            <el-select v-model="form.categoryC" placeholder="请选择" @change="onSelectChangeType">
              <el-option
                v-for="item in childList"
                :key="item.dictCode"
                :label="item.dictName"
                :value="item.dictCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="关键字">
            <el-input v-model="form.keyword" placeholder="请填入" />
            <!-- <el-select v-model="form.areaType" value-key="menuId" placeholder="请选择">
              <el-option
                v-for="item in childList"
                :key="item.menuId"
                :label="item.name"
                :value="item.menuId"
              />
            </el-select> -->
          </el-form-item>
        </el-col>

        <el-col :sm="12" :xs="24">
          <el-form-item label="对接平台">
            <el-input v-model="form.platform" placeholder="请填入" />
          </el-form-item>
        </el-col>

        <el-col :sm="24" :xs="24">
          <el-form-item ref="images" label="产品LOGO" prop="images">
            <el-upload
              action="images"
              :show-file-list="false"
              :auto-upload="true"
              accept="image/png, image/jpeg"
              class="uploader"
              :before-upload="beforeUpload"
              :headers="headers"
              :http-request="onUpload"
            >
              <div v-if="!form.images" class="upload-preview">
                <i class="el-icon-plus uploader-icon" />
              </div>
              <div v-else>
                <el-image class="el-upload-list__item-thumbnail" :src="form.images" fit="contain" />
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col v-if="isLogistics(form.categoryP)" :sm="12" :xs="24">
          <el-form-item label="始发地" prop="origin">
            <el-select v-model="form.origin" filterable placeholder="请选择">
              <el-option
                v-for="item in logisticsStart"
                :key="item.dictCode"
                :label="item.dictName"
                :value="item.dictCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="isLogistics(form.categoryP)" :sm="12" :xs="24">
          <el-form-item label="目的地" prop="destination">
            <el-select v-model="form.destination" filterable placeholder="请选择">
              <el-option
                v-for="item in logisticsEnd"
                :key="item.dictCode"
                :label="item.dictName"
                :value="item.dictCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="产品特色" prop="feature">
            <el-input v-model="form.feature" placeholder="请填入" />
          </el-form-item>
        </el-col>

        <el-col :sm="24" :xs="24">
          <el-form-item label="产品简介" prop="synopsis">
            <el-input v-model="form.synopsis" placeholder="请填入简介" type="textarea" :rows="6" maxlength="300" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="产品内容" prop="info">
            <tinymce ref="editor" v-model="form.info" :height="400" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item class="text-center">
        <el-button type="primary" :disabled="loading" @click="onSubmit('form')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import { getDictList, uploadFile } from '@/api/global'
import { getToken } from '@/utils/auth'
import { addProduct, getOwnCompanyList, getProductDetail, updateProduct } from '@/api/company'
import { getHaveApplyService } from '@/api/user'
export default {
  name: 'ProductRelease',
  components: { Tinymce },
  data() {
    return {
      loading: false,
      headers: {
        token: getToken()
      },
      companyType: '',
      form: {
        type: '1', // 1产品 2需求
        categoryP: '',
        categoryC: '',
        title: '',
        feature: '',
        synopsis: '',
        images: '',
        info: '',
        origin: '',
        destination: ''
      },
      rules: {
        categoryP: [{ required: true, message: '请选择产品分类', trigger: 'change' }],
        categoryC: [{ required: true, message: '请选择产品子分类', trigger: 'change' }],
        title: [
          { required: true, message: '请填入产品名称！', trigger: 'blur' },
          { max: 25, message: '25个字符以内！', trigger: ['change', 'blur'] }
        ],
        feature: [{ required: true, message: '请填入产品特色！', trigger: 'blur' }],
        info: [
          { required: true, message: '请填入企业简介！', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请填入产品价格！', trigger: 'blur' },
          // { pattern: /^\d+[.]?\d{0,2}$/, message: '请输入正确的格式,可保留两位小数' }
        ],
        images: [
          { required: true, message: '请上传产品LOGO！', trigger: 'change' }
        ],
        origin: [
          { required: true, message: '请选择始发地！', trigger: 'change' }
        ],
        destination: [
          { required: true, message: '请选择目的地！', trigger: 'change' }
        ]
      },
      serviceList: [],
      logisticsStart: [],
      logisticsEnd: []
    }
  },
  computed: {
    mobile({ $store }) {
      return $store.getters.device === 'mobile'
    },
    options({ $store }) {
      const lists = $store.getters.navList.filter(item => ['跨境汇'].includes(item.dictName))
      const list = lists[0].children
      return list
    },
    childList({ form, serviceList }) {
      const currentId = form.categoryP
      const currentItem = serviceList.filter(item => item.dictCode === currentId)
      return currentItem[0]?.children
    },
    id({ $route }) {
      return $route.params.id
    }
  },
  created() {
    // 获取企业信息
    this.getCompanyInfo()
    // 获取开通服务
    this.getService()
    // 获取始发地
    this.getStartArea()
    // 获取目的地
    this.getEndArea()
    // 编辑模式
    if (this.id) {
      this.getDetail(this.$route.params.id)
    }
  },
  methods: {
    isLogistics(code) {
      const result = this.serviceList.some(item => {
        if (item.dictCode === code) {
          return item.dictName.includes('物流')
        }
      })
      return result
    },
    getCompanyInfo() {
      // getOwnCompanyList().then(res => {
      //   this.companyType = res.data[0].companyType
      // })
    },
    getService() {
      getHaveApplyService().then(res => {
        this.serviceList = res.list
        // this.serviceList = this.options.filter(item => {
        //   return res.data.some(o => o.serviceCode === item.dictCode)
        // })
      })
    },
    getStartArea() {
      getDictList('logistics_start').then(res => {
        this.logisticsStart = res.list[0].children
      })
    },
    getEndArea() {
      getDictList('logistics_end').then(res => {
        this.logisticsEnd = res.list[0].children
      })
    },
    getDetail(id) {
      const ip = returnCitySN['cip']
      getProductDetail(id, ip).then(res => {
        this.form = res.supplyDemand
      })
    },
    onSelectChange() {
      this.$set(this.form, 'categoryC', '')
      this.$refs.form.clearValidate()
    },
    onSelectChangeType() {
      // this.getProductType()
    },
    getProductType() {
      const type = this.from.categoryC
      getDictList(type).then(res => {

      })
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
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.id) {
            this.updateProduct()
          } else {
            this.addProduct()
          }
        }
      })
    },
    addProduct() {
      addProduct(this.form).then(res => {
        this.loading = false
        this.$message.success('创建成功！')
        this.$router.push('product')
      }).catch(() => {
        this.loading = false
      })
    },
    updateProduct() {
      updateProduct(this.form).then(res => {
        this.loading = false
        this.$message.success('更新成功！')
        this.$router.push('product')
      }).catch(() => {
        this.loading = false
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
        font-size: 20px;
      }
      .el-upload-list__item-thumbnail{
        width: 94px;
        height: 94px;
      }
    }
  }
}

@media only screen and (max-width:1199px){
}
@media only screen and (max-width:991px){
}
@media only screen and (max-width:767px){
  .info-form {
    width: 100%;
    padding: 10px 0;
  }
}
</style>
