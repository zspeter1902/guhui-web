<template>
  <div v-loading="loading">
    <el-form ref="form" class="info-form" :model="form" :rules="rules" label-width="100px" :label-position="mobile ? 'top' : 'right'">
      <el-row type="flex" :gutter="30" class="flex-wrap">
        <el-col :sm="12" :xs="24">
          <el-form-item label="选择类别" prop="categoryP">
            <el-select v-model="form.categoryP" placeholder="请选择" @change="onSelectChange">
              <el-option
                v-for="item in options"
                :key="item.dictCode"
                :label="item.dictName"
                :value="item.dictCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="12" :xs="24">
          <el-form-item label="选择子类别" prop="categoryC">
            <el-select v-model="form.categoryC" placeholder="请选择">
              <el-option
                v-for="item in childList"
                :key="item.dictCode"
                :label="item.dictName"
                :value="item.dictCode"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="需求名称" prop="title">
            <el-input v-model="form.title" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="简介" prop="synopsis">
            <el-input v-model="form.synopsis" placeholder="请输入简介" type="textarea" :rows="6" maxlength="300" show-word-limit />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :xs="24">
          <el-form-item label="内容" prop="info">
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
import { addProduct } from '@/api/company'

export default {
  name: 'ProductRelease',
  components: { Tinymce },
  data() {
    return {
      loading: false,
      form: {
        type: '2', // 1产品 2需求
        categoryP: '',
        categoryC: '',
        title: '',
        synopsis: '',
        info: ''
      },
      rules: {
        categoryP: [{ required: true, message: '请选择产品分类', trigger: 'change' }],
        categoryC: [{ required: true, message: '请选择产品子分类', trigger: 'change' }],
        title: [
          { required: true, message: '请填入产品名称！', trigger: 'blur' },
          { max: 25, message: '25个字符以内！', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  computed: {
    mobile({ $store }) {
      return $store.getters.device === 'mobile'
    },
    options({ $store }) {
      const list = $store.getters.navList.filter(item => ['跨境汇'].includes(item.dictName))
      return list[0].children
    },
    childList({ form, options }) {
      const currentId = form.categoryP
      const currentItem = options.filter(item => item.dictCode === currentId)
      return currentItem[0]?.children
    }
  },
  methods: {
    onSelectChange() {
      this.$set(this.form, 'categoryC', '')
      this.$refs.form.clearValidate()
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addProduct(this.form).then(res => {
            this.loading = false
            this.$message.success('创建成功！')
            this.$router.push('need')
          }).catch(() => {
            this.loading = false
          })
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
