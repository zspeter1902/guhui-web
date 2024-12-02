<template>
  <el-dialog title="活动签到" :visible.sync="visible" center>
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px" label-position="top" class="submit-form">
      <!-- 预订信息 -->
      <el-row :gutter="20">
        <el-col v-if="status == 4" :sm="24">
          <el-form-item label="" prop="signCompanyName">
            <!-- <el-input v-model="formData.signCompanyName" placeholder="请输入" /> -->
            <el-autocomplete
              v-model="formData.signCompanyName"
              class="inline-input"
              :fetch-suggestions="querySearch"
              placeholder="请填写您的公司名称"
              :trigger-on-focus="false"
              :disabled="!!formData.signCompanyCode"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="status == 4" :sm="24">
          <el-form-item label="" prop="contactName">
            <el-input v-model="formData.contactName" placeholder="请填写您的姓名" />
          </el-form-item>
        </el-col>
        <el-col :sm="24">
          <el-form-item label="" prop="contactPhone">
            <el-input v-model.number="formData.contactPhone" placeholder="请填写您的手机号码" />
          </el-form-item>
        </el-col>
        <el-col v-if="status == 4 || status == 1" :sm="24">
          <el-form-item label="" prop="contactEmail">
            <el-input v-model="formData.contactEmail" placeholder="请填写您的邮箱" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button class="btn" @click="close('form')">取消</el-button>
      <el-button type="primary" class="btn" :disabled="loading" @click="onSubmit('form')">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getSearchCompanyList } from '@/api/company'
import { isValidPhone } from '@/utils/validate'
import { signInActivity } from '@/api/content'
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
      require: true
    },
    status: {
      type: Number,
      default: 0
    }
  },
  // 定义属性
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!isValidPhone(value)) {
        callback(new Error('手机号输入有误！'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      visible: false,
      formData: {
        actId: null,
        signCompanyName: '',
        signCompanyCode: '',
        contactName: '',
        contactPhone: '',
        contactEmail: ''
      },
      rules: {
        signCompanyName: [
          { required: true, message: '企业名称不能为空', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '您的姓名不能为空', trigger: 'blur' }
        ],
        contactPhone: [
          { required: true, message: '您的手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        contactEmail: [
          { required: true, message: '您的邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      },
      setQuery: {},
      disabled: '',
      companyList: []
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCompanyNameList()
  },
  // 方法集合
  methods: {
    getCompanyNameList() {
      getSearchCompanyList().then(res => {
        this.companyList = res.data.map(item => {
          return { value: item }
        })
      })
    },
    querySearch(queryString, cb) {
      var companyList = this.companyList
      var results = queryString ? companyList.filter(this.createFilter(queryString)) : companyList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        console.log(restaurant.value, queryString)
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
      }
    },
    open(actId, signInId) {
      if (!actId) return
      this.visible = true
      this.$nextTick(() => {
        this.formData.actId = actId
        this.formData.signInId = signInId
      })
    },
    close() {
      this.visible = false
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$emit('submit', this.formData)
          this.onSignIn(this.formData)
        }
      })
    },
    onSignIn(otherData) {
      signInActivity(otherData).then(res => {
        if (res.code === 13005) {
          this.$emit('change-status', 4)
          this.$message({
            showClose: true,
            message: '您尚完报名,请完善信息！',
            type: 'warning'
          })
        } else {
          this.loading = true
          this.visible = false
          this.$nextTick(() => {
            this.loading = false
          })
          if (this.info.questionnaire) {
            this.$emit('change-status', 2)
          } else {
            this.$emit('change-status', 1)
          }
          this.$emit('change', res.data)
          this.$message({
            showClose: true,
            message: res.msg || '您已签到成功！',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-form {
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-autocomplete,
  .el-select {
    width: 100%;
  }
  ::v-deep {
    .el-form-item__label {
      line-height: 24px;
    }

  }
}
.el-select-dropdown {
  max-width: 100%;
}
::v-deep {
  .el-dialog__title {
    // fz24
  }
  .el-select-dropdown {
    max-width: 100%;
  }
}
</style>
