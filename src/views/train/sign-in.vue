<template>
  <div class="container">
    <article class="detail text-center">
      <div class="article-header">
        <h4 class="article-title">{{ article.actName }}</h4>
      </div>
      <div class="article-content">
        <el-image class="img" :src="article.actImg" fit="cover" :alt="article.actName" />
        <p class="column">活动地址：{{ article.actAddr }}</p>
        <p class="column">活动时间：<span class="warn">{{ article.startTime }}</span> - <span class="warn">{{ article.endTime }}</span></p>
        <p class="column">联系人：{{ article.contactName }}</p>
        <p class="column">联系方式：{{ article.contactPhone }}</p>
        <p>
          <el-button v-if="status == 0 || status == 4" class="btn" type="primary" size="medium" @click="handleSignIn()">立即签到</el-button>
          <el-button v-else-if="status == 2" class="btn" type="primary" size="medium" :disabled="status != 2" @click="handleApply()">填写调查问卷</el-button>
          <el-button v-else-if="status == 3" class="btn" type="primary" size="medium" :disabled="status != 3" @click="showCode()">兑奖码</el-button>
          <el-tag v-else-if="status == 5" type="success" effect="dark">
            已兑奖
          </el-tag>
          <el-tag v-else-if="status == 1 || status != 4" type="success" effect="dark">
            已签到
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
    <!-- 签到信息收集 -->
    <sign-in-form ref="signInForm" :info="article" :status="status" @change-status="changeStatus" @change="getSign" />
    <!-- 调查问卷 -->
    <questionnaire-dialog ref="questionnaire" :info="article.questionnaire" @change-status="changeStatus" @get-code="getCode" />
  </div>
</template>

<script>
import VueCookie from 'vue-cookie'
import { getActivityDetail, checkSignInActivity } from '@/api/content'
import { getUUID } from '@/utils'
export default {
  name: 'TrainSignIn',
  components: { SignInForm: () => import('./sign-in-form'), QuestionnaireDialog: () => import('./questionnaire-dialog') },
  data() {
    return {
      uuid: null,
      title: '活动签到',
      dialogVisible: false,
      dialogFile: '',
      status: null,
      article: {},
      signId: null,
      questionnaireCode: null
    }
  },
  computed: {
    id({ $route }) {
      return $route.params.id
    }
  },
  created() {
    this.getInfo()
    this.getStatus()
  },
  methods: {
    handleSignIn() {
      this.$nextTick(() => {
        this.$refs.signInForm.open(this.id, this.uuid)
      })
    },
    handleApply() {
      this.$nextTick(() => {
        this.$refs.questionnaire.open(this.signId)
      })
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
        if (res.data && res.data.status === '3') {
          this.status = 5
          return
        }
        if (res.code === 13001) { // 设备MAC地址获取失败
        // 加邮箱
          this.status = 1
        } else if (res.code === 13002) { // 活动已签到未填报
          if (this.article.questionnaire) {
            this.status = 2
          } else {
            this.status = 1
          }
          this.getSign(res.data)
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
    // 签到
    getSign(data) {
      this.signId = data.id
    },
    // 填写问卷调查
    // this.dialogFile = this.article.actCode
    getInfo() {
      getActivityDetail(this.id).then(res => {
        this.article = res.exercise
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
</style>
