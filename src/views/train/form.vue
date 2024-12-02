<template>
  <el-dialog title="活动信息收集" :visible.sync="visible" center>
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px" label-position="top" class="submit-form">
      <!-- 预订信息 -->
      <el-row :gutter="20">
        <el-col :sm="24">
          <el-form-item label="企业名称" prop="signCompanyName">
            <!-- <el-input v-model="formData.signCompanyName" placeholder="请输入" /> -->
            <el-autocomplete
              v-model="formData.signCompanyName"
              class="inline-input"
              :fetch-suggestions="querySearch"
              placeholder="请输入"
              :trigger-on-focus="false"
              :disabled="!!formData.signCompanyCode"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :sm="12">
          <el-form-item label="您的姓名" prop="contactName">
            <el-input v-model="formData.contactName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item label="您的电话" prop="contactPhone">
            <el-input v-model.number="formData.contactPhone" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :sm="24">
          <el-form-item label="您的邮箱" prop="contactEmail">
            <el-input v-model="formData.contactEmail" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="info.shareFlag === '1'" :gutter="20">
        <!-- <el-col :sm="12">
          <el-form-item label="所在城市" prop="region">
            <el-input v-model="formData.region" placeholder="请输入" />
          </el-form-item>
        </el-col> -->
        <el-col :sm="24">
          <el-form-item label="您是否愿意将您的信息共享给服务商" prop="shareFlag">
            <el-select v-model="formData.shareFlag" placeholder="请选择">
              <el-option value="1" label="是" />
              <el-option value="0" label="否" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item v-for="item of question" :key="item.param" :label="item.title + (item.multiple ? '(多选)' : '')" :prop="item.param" :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]">
        <el-select v-if="item.children" v-model="formData[item.param]" :multiple="item.multiple" :disabled="disabled === item.param" placeholder="请选择">
          <el-option v-for="(opt, cIndex) of item.children" :key="cIndex" :value="opt" :label="opt" />
        </el-select>
        <el-input v-else v-model="formData[item.param]" placeholder="请输入" :disabled="disabled === item.param" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button class="btn" @click="close('form')">取消</el-button>
      <el-button type="primary" class="btn" :disabled="loading" @click="onSubmit('form')">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getOwnCompanyList, getSearchCompanyList } from '@/api/company'
import { isValidPhone } from '@/utils/validate'
// import { CodeToText } from 'element-china-area-data'
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
      require: true
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
        signCompanyName: '',
        signCompanyCode: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        // region: '',
        otherInfo: '',
        shareFlag: ''
      },
      rules: {
        signCompanyName: [
          { required: false, message: '企业名称不能为空', trigger: 'blur' }
        ],
        contactName: [
          { required: false, message: '您的姓名不能为空', trigger: 'blur' }
        ],
        shareFlag: [
          { required: true, message: '您选择是否同意共享信息' }
        ],
        contactPhone: [
          { required: false, message: '您的手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        contactEmail: [
          { required: false, message: '您的邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        region: [
          { required: true, message: '城市不能为空', trigger: 'blur' }
        ]
      },
      setQuery: {},
      disabled: '',
      companyList: []
    }
  },
  computed: {
    question({ info, setQuery }) {
      if (!info.otherInfo) { return [] }
      const originList = info.otherInfo.split(';')
      const questionList = []
      for (const item of originList) {
        if (item) {
          const arr = item.split(':')
          const obj = {
            param: arr[0],
            title: arr[1]
          }
          if (arr[1].includes('(') && arr[1].includes(')')) {
            const sIndex = arr[1].indexOf('(')
            const eIndex = arr[1].indexOf(')')
            const str = arr[1].substring(sIndex + 1, eIndex)
            obj.title = arr[1].substring(0, sIndex)
            obj.multiple = false
            obj.children = str.split(',')
          } else if (arr[1].includes('[') && arr[1].includes(']')) {
            const sIndex = arr[1].indexOf('[')
            const eIndex = arr[1].indexOf(']')
            const str = arr[1].substring(sIndex + 1, eIndex)
            obj.title = arr[1].substring(0, sIndex)
            obj.multiple = true
            obj.children = str.split(',')
          }
          questionList.push(obj)
        }
      }
      return questionList
    },
    isLogin({ $store }) {
      return !!$store.getters.token
    },
    userInfo({ $store }) {
      return $store.getters.userInfo
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getInfo()
    this.getCompanyNameList()
    // 邀约渠道
    const query = this.$route.query
    const cache = JSON.parse(localStorage.getItem('invitation'))
    query.id = this.$route.params.id
    if (query.title) {
      this.setQuery = query
      localStorage.setItem('invitation', JSON.stringify(query))
    } else {
      if (cache.id === this.$route.params.id) {
        this.setQuery = cache
      }
    }
  },
  // 方法集合
  methods: {
    isHave(key) {
      return this.info.requiredFields.indexOf(key) > -1
    },
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
    open() {
      this.visible = true
      this.$nextTick(() => {
        this.handleRule()
        const current = this.question.filter(item => item.title === this.setQuery.title)
        console.log(this.question, current, this.setQuery)
        if (current.length) {
          this.disabled = current[0].param
          this.$set(this.formData, current[0].param, this.setQuery.channel || '')
        }
      })
    },
    close() {
      this.visible = false
    },
    getInfo() {
      if (!this.isLogin) { return }
      getOwnCompanyList().then(res => {
        // res.data
        this.$set(this.formData, 'signCompanyCode', res.data.companyCode)
        this.$set(this.formData, 'signCompanyName', res.data.companyName)
        this.$set(this.formData, 'contactName', res.data.contactName)
        this.$set(this.formData, 'contactPhone', res.data.contactPhone)
        this.$set(this.formData, 'contactEmail', res.data.contactEmail)
        // this.$set(this.formData, 'region', CodeToText[res.data.city])
      }).catch(err => {
        console.warn(err)
        this.$set(this.formData, 'contactName', this.userInfo.username)
        this.$set(this.formData, 'contactPhone', this.userInfo.mobile)
        this.$set(this.formData, 'contactEmail', this.userInfo.email)
      })
    },
    handleRule() {
      const defaultRule = this.info.requiredFields.split(',') || [
        'signCompanyName',
        'contactName',
        'contactPhone',
        'contactEmail'
      ]
      for (const item of defaultRule) {
        this.$refs['form'].rules[item][0].required = true
      }
    },
    onSubmit(formName) {
      let col = ''
      if (this.question.length) {
        for (const item of this.question) {
          if (Array.isArray(this.formData[item.param])) {
            col += item.title + ':' + this.formData[item.param].join(',') + ';'
          } else if (this.formData[item.param]) {
            col += item.title + ':' + this.formData[item.param] + ';'
          }
        }
        this.formData.otherInfo = col
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$emit('submit', this.formData)
          this.visible = false
          this.$nextTick(() => {
            this.loading = false
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
