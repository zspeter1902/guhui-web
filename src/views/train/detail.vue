<template>
  <div class="news-container">
    <!-- banner -->
    <banner :banner="banner" />
    <div class="container">
      <breadcrumb />
      <article class="detail">
        <div class="article-header text-center">
          <h4 class="article-title">{{ article.actName }}</h4>
          <el-row type="flex" align="middle" justify="center" class="flex-wrap other">
            <span>发布时间：{{ article.createTime }}</span>
            <span>主办方：{{ article.actSponsor }}</span>
          </el-row>
        </div>
        <div class="article-content">
          <el-image class="img" :src="article.actImg" fit="cover" :preview-src-list="[article.actImg]" :alt="article.actName" />
          <p class="column">活动地址：<el-link class="address" type="primary" :underline="false" @click="openMap(article.actAddr)">{{ article.actAddr }}</el-link></p>
          <p class="column">活动时间：<span class="warn">{{ article.startTime }}</span> - <span class="warn">{{ article.endTime }}</span></p>
          <p class="column">联系人：{{ article.contactName }}</p>
          <p class="column">联系方式：{{ article.contactPhone }}</p>
          <p v-if="!isHistory(article.endTime)">
            <el-button class="btn" type="primary" size="medium" :disabled="article.status !== '1'" @click="handleApply()">{{ article.status !== '1' ? '报名尚未开始' : '立即报名' }}</el-button>
            <el-button v-if="isAdmin" class="btn" type="primary" size="medium" :disabled="article.status !== '1'" @click="handleSignIn()">签到</el-button>
            <!-- <el-link
              v-else
              class="btn el-button el-button--primary el-button--medium"
              :underline="false"
              type="primary"
              target="_blank"
              :href="`/#/login?status=login&redirect=${path}`"
            >立即报名</el-link> -->
          </p>
          <p v-if="isAdmin">
            <el-button v-if="article.questionnaire" class="btn" type="primary" size="medium" @click="handleQuestionnaire()">调查问卷</el-button>
            <el-button v-if="isTest" class="btn" type="primary" size="medium" @click="handleQuestion()">答题竞赛</el-button>
            <el-button class="btn" type="primary" size="medium" @click="handleSignInInfo()">报名信息</el-button>
          </p>
          <div class="about" v-html="article.actAbout" />
        </div>
        <!-- <div class="article-footer"></div> -->
      </article>
    </div>
    <!-- 群二维码弹窗 -->
    <el-dialog
      title="活动二维码"
      :visible.sync="dialogVisible"
    >
      <el-image class="dialog-img" :src="dialogFile" fit="contain" />
    </el-dialog>
    <!-- 活动信息收集 -->
    <activity-form ref="activityForm" :info="article" @submit="handleSign" />
    <!-- 显示地图 -->
    <map-address ref="mapAddress" :address="address" />
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Banner from '@/components/Banner'
import MapAddress from './components/Map.vue'
import { getActivityDetail, getActivityTest, signUpActivity } from '@/api/content'
import { checkAdmin } from '@/api/user'
export default {
  name: 'TrainDetail',
  components: { Banner, Breadcrumb, MapAddress, ActivityForm: () => import('./form') },
  data() {
    return {
      title: '活动详情',
      banner: require('img/news-banner.png'),
      dialogVisible: false,
      dialogFile: '',
      article: {},
      address: '',
      isTest: false,
      isAdmin: false
    }
  },
  computed: {
    id({ $route }) {
      return $route.params.id
    },
    isLogin({ $store }) {
      return $store.getters.token
    },
    path({ $route }) {
      return $route.path
    }
  },
  created() {
    this.getInfo()
    if (this.isLogin) {
      this.checkAdmin()
    }
  },
  methods: {
    openMap(address) {
      this.address = address
      this.$nextTick(() => {
        this.$refs.mapAddress.open()
      })
    },
    isHistory(time) {
      if (!time) { return false }
      const end = new Date(time.replace(/-/g, '/'))
      const current = new Date()
      return current - end > 0
    },
    checkAdmin() {
      checkAdmin().then(res => {
        this.isAdmin = res.isAdmin
        if (this.isAdmin) {
          this.getExercise()
        }
      })
    },
    getExercise() {
      getActivityTest(this.id).then(res => {
        this.isTest = res.exerciseQuestion && res.exerciseQuestion.id
      })
    },
    handleApply() {
      if (this.article.otherInfo || this.article.requiredFields) {
        this.$nextTick(() => {
          this.$refs.activityForm.open()
        })
      } else if (this.isLogin) {
        this.onSignUp()
      } else {
        this.$nextTick(() => {
          this.$refs.activityForm.open()
        })
      }
    },
    handleSignIn() {
      this.$router.push('/train/activity/sign-in/' + this.id)
    },
    handleSignInInfo() {
      this.$router.push('/train/activity/sign-in-info/' + this.id)
    },
    handleQuestionnaire() {
      this.$router.push('/train/activity/questionnaire/' + this.id)
    },
    handleQuestion() {
      this.$router.push('/question-bank/activity-answer-questions/' + this.id)
    },
    handleSign(item) {
      this.onSignUp(item)
    },
    onSignUp(otherData) {
      this.dialogFile = this.article.actCode
      signUpActivity(this.id, otherData).then(res => {
        this.$message({
          showClose: true,
          message: res.msg || '您已报名成功！',
          type: 'success'
        })
        if (this.article.actCode) {
          setTimeout(() => {
            this.dialogVisible = true
          }, 600)
        }
      })
    },
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
.detail {
  padding: 20px 0 40px;
  .article-header {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #ddd;
  }
  .article-title {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .other {
    color: #999;
    line-height: 24px;
    span {
      margin: 0 20px;
    }
  }
  .article-content {
    font-size: 16px;
    line-height: 36px;
    text-indent: 2em;
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
      &.el-link {
        color: #fff;
      }
    }
    .warn {
      color: $redColor;
    }
    .address {
      font-size: inherit;
      text-indent: 0;
    }
    .about {
      margin-top: 40px;
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
    .other {
      span {
        margin: 0 10px;
      }
    }
    .article-content {
      font-size: 14px;
      line-height: 34px;
      .img {
        display: block;
        text-indent: -2em;
      }
    }
  }
}
</style>
