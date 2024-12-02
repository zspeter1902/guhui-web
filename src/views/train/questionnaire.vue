<template>
  <div class="container">
    <article class="detail text-center">
      <div class="article-header">
        <h4 class="article-title">{{ article.actName }}</h4>
      </div>
      <div class="article-content">
        <el-form ref="form" :model="formData" :rules="rules" label-position="top" class="submit-form">
          <el-form-item label="企业名称" prop="signCompanyName">
            <el-autocomplete
              v-model="formData.signCompanyName"
              class="inline-input"
              :fetch-suggestions="querySearch"
              placeholder="请填写您的公司名称"
              :trigger-on-focus="false"
              :disabled="!!formData.signCompanyCode"
            />
          </el-form-item>
          <el-form-item v-for="item of question" :key="item.param" :label="item.title + (item.multiple ? '(多选)' : '')" :prop="item.param" :rules="[{ required: true, message: '问卷不能为空', trigger: 'blur' }]">
            <el-select v-if="item.children" v-model="formData[item.param]" :multiple="item.multiple" placeholder="请选择">
              <el-option v-for="(opt, cIndex) of item.children" :key="cIndex" :value="opt" :label="opt" />
            </el-select>
            <el-input v-else v-model="formData[item.param]" placeholder="请输入" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn" :disabled="loading" @click="onSubmit('form')">提交</el-button>
          </el-form-item>
        </el-form>
        <p>
          <el-button v-if="status == 3" class="btn" type="primary" size="medium" :disabled="status != 3" @click="showCode()">兑奖码</el-button>
          <el-tag v-if="status == 5" type="success" effect="dark">
            已兑奖
          </el-tag>
        </p>
      </div>
    </article>
    <!-- 兑奖码 -->
    <el-dialog
      title="兑奖码"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      center
      top="30vh"
    >
      <div class="text-center code">
        <el-tag type="success">{{ questionnaireCode }}</el-tag>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VueCookie from 'vue-cookie'
import { getActivityDetail, checkSignInActivity, addQuestionnaireNoSign } from '@/api/content'
import { getUUID } from '@/utils'
import { getSearchCompanyList } from '@/api/company'
export default {
  name: 'TrainQuestionnaire',
  data() {
    return {
      loading: false,
      uuid: null,
      title: '调查问卷',
      dialogVisible: false,
      dialogFile: '',
      status: null,
      article: {},
      questionnaireCode: null,
      formData: {
      },
      rules: {
      },
      questionnaireInfo: '',
      companyList: []
    }
  },
  computed: {
    id({ $route }) {
      return $route.params.id
    },
    question({ article }) {
      if (!article.questionnaire) { return [] }
      const originList = article.questionnaire.split(';')
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
    }
  },
  created() {
    this.getInfo()
    this.getCompanyNameList()
    this.getStatus()
  },
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
    getCode(code) {
      this.questionnaireCode = code
      this.showCode()
    },
    showCode() {
      this.dialogVisible = true
    },
    // 获取签到状态
    changeStatus(status) {
      this.status = status
    },
    getStatus() {
      const uuid = VueCookie.get('sign-uuid')
      if (uuid) {
        this.uuid = uuid
      } else {
        this.uuid = getUUID()
        VueCookie.set('sign-uuid', this.uuid, { expires: '5h' })
      }
      checkSignInActivity(this.id, this.uuid).then(res => {
        if (res.data?.status === '3') {
          this.status = 5
          return
        }
        if (res.code === 13001) { // 设备MAC地址获取失败
        // 加邮箱
          this.status = 1
        } else if (res.code === 13002) { // 活动已签到未填报
          this.status = 2
        } else if (res.code === 13003) { // 调查问卷已填报，活动已签到
          this.status = 3
          this.getCode(res.data.questionnaireCode) // 兑奖码
        } else if (res.code === 13005) { // 未报名
          this.status = 4
        } else if (res.code === 0) { // 未签到
          this.status = 0
        }
      })
    },
    // 填写问卷调查
    // this.dialogFile = this.article.actCode
    getInfo() {
      getActivityDetail(this.id).then(res => {
        this.article = res.exercise
      })
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
        this.questionnaireInfo = col
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addQuestionnaireNoSign({
            actId: this.id,
            signInId: this.uuid,
            signCompanyName: this.formData.signCompanyName,
            questionnaireInfo: this.questionnaireInfo
          }).then(res => {
            this.$message.success('提交成功!')
            this.changeStatus(3)
            this.getCode(res.data.questionnaireCode)
            this.$nextTick(() => {
              this.loading = false
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixin";
.dialog-img {
  width: 100%;
  height: auto;
}

.code {
  .el-tag {
    height: 70px;
    line-height: 68px;
    font-size: 48px;
    background-color: transparent;
    border: none;
  }
}

.detail {
  padding: 20px 0;
  .el-tag {
    margin-top: 20px;
    height: 70px;
    padding: 0 50px;
    line-height: 68px;
    font-size: 32px;
  }
  .article-header {
    margin-bottom: 20px;
  }
  .article-title {
    font-size: 20px;
    line-height: 32px;
    font-weight: bold;
  }
  .article-content {
    display: inline-block;
    max-width: 500px;
    width: 100%;
    font-size: 16px;
    line-height: 36px;
    text-align: justify;
    .img {
      height: auto;
    }
    ::v-deep {
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
    .btn {
      margin-top: 16px;
      text-indent: 0;
    }
    .warn {
      color: $redColor;
    }
  }
}
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
  .el-select-dropdown {
    max-width: 100%;
  }
}
</style>
