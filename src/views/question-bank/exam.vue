<template>
  <el-row v-loading="loading" :element-loading-text="loadingText" type="flex" class="exam-container flex-column text-center">
    <el-row type="flex" class="detail-box flex-wrap">
      <article class="detail">
        <div class="article-header">
          <h4 class="article-title">{{ article.examinTitle }}</h4>
          <countdown ref="countdown" :total="article.ansTime" :start-time="startTime" :do-time="doTime" @remaining="onRemaining" />
        </div>
        <div v-if="startTime" class="article-content">
          <template v-for="(item, index) of article.quesList">
            <div v-show="currentIndex === index" :key="item.id" class="question">
              <div :is="typeMap[item.quesType]" :key="item.id" :info="item" :order="index + 1" :total="total" :btn="btn" :doing="!!article.ansTime" keep-alive @next="onNext" @prev="onPrev" @complete="onComplete" />
              <!-- 单选 -->
              <!-- <single-choice v-show="typeMap[item.quesType] === '单选'" :key="item.id" :info="item" :order="index + 1" keep-alive /> -->
              <!-- 多选 -->
              <!-- 填空 -->
            </div>
          </template>
        </div>
      </article>
      <!-- 答题卡 -->
      <answer-sheet
        v-if="total > 0"
        class="flex-auto-1"
        :lists="article.quesList"
        :total="total"
        @select="onSelect"
        @do="getDone"
      />
    </el-row>
    <div v-if="!startTime" class="start">
      <el-button class="start-btn btn" type="primary" @click.prevent="startTest">开始答题</el-button>
    </div>
  </el-row>
</template>

<script>
import { changeActivityTest, getTest, getActivityTestProgress, getQuestionAnswerResults, removeQuestionAnswer, startActivityTest, submitQuestionAnswer } from '@/api/content'
import Countdown from './components/countdown.vue'
import AnswerSheet from './AnswerSheet.vue'
// 单选 多选 填空
export default {
  name: 'AnswerQuestions',
  components: {
    SingleChoice: () => import('./components/SingleChoice.vue'),
    MultipleChoice: () => import('./components/MultipleChoice.vue'),
    Analysis: () => import('./components/Analysis.vue'),
    Countdown,
    AnswerSheet
  },
  data() {
    return {
      title: '答题竞赛',
      loading: false,
      loadingText: '正在提交中...',
      uuid: null,
      article: {},
      results: [],
      typeMap: {
        1: 'SingleChoice',
        2: 'MultipleChoice',
        3: 'Analysis'
      },
      startTime: null,
      doTime: 0,
      isComplete: false,
      currentIndex: 0,
      btn: 'prev, next'
    }
  },
  computed: {
    id({ $route }) {
      return $route.params.id
    },
    isLogin({ $store }) {
      return $store.getters.token
    },
    total({ article }) {
      return (article.quesList && article.quesList.length) || 0
    }
  },
  created() {
    if (this.isLogin) {
      this.getInfo()
    } else {
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
  methods: {
    getDone() {},
    onSelect(i) {
      this.currentIndex = i
    },
    onPrev() {
      this.currentIndex--
    },
    onNext(item) {
      if (this.isComplete) {
        if (this.currentIndex < this.total - 1) {
          this.currentIndex++
        }
        return
      }
      if (!this.article.ansTime) {
        if (this.currentIndex < this.total - 1) {
          this.currentIndex++
        }
        return
      }
      return submitQuestionAnswer({
        'examinId': this.article.id,
        'quesId': item.id,
        'mark': '0',
        'answer': item.answer
      }).then(res => {
        if (this.currentIndex < this.total - 1) {
          this.currentIndex++
        }
      })
    },
    onRemaining(time) {
      const status = time ? 1 : 2
      this.changeTestStatus(status, time)
    },
    async onComplete(item) {
      await this.onNext(item)
      this.isComplete = true
      this.$set(this.article, 'ansTime', 0)
      this.changeTestStatus(2, 0)
    },
    changeTestStatus(status, time) {
      changeActivityTest({
        'examinId': this.article.id, // 试卷id
        'ansTime': time, // 答题时间 秒
        'status': status // 是否提交：0 进行中，1暂存，2提交
      }).then(res => {
        if (status !== 2) {
          this.startTime = new Date()
        }
      })
    },
    startTest() {
      startActivityTest({
        'actId': this.id, // 活动id
        'examinId': this.article.id, // 试卷id
        'ansTime': 0, // 答题时间 秒
        'status': 0 // 是否提交：0 进行中，1暂存，2提交
      }).then(res => {
        this.startTime = new Date()
        this.$nextTick(() => {
          this.$refs.countdown.init()
        })
      })
    },
    getProgress() {
      getActivityTestProgress({
        'actId': this.id, // 活动id
        'examinId': this.article.id, // 试卷id
        'orderCol': 'update_time', // 试卷id
        'isAsc': false
      }).then(res => {
        if (res.page.list) {
          if (!res.page.list.length) { return }
          const data = res.page.list[0]
          this.startTime = new Date(data.updateTime)
          this.$set(this.article, 'ansTime', this.article.ansTime - data.ansTime > 0 ? this.article.ansTime - data.ansTime : 0)
          // 获取答题结果列表
          getQuestionAnswerResults(this.article.id).then(res => {
            this.results = res.list
            this.article.quesList.forEach((item, index) => {
              const list = res.list.filter(cur => cur.quesId === item.id)
              if (list.length) {
                this.$set(this.article.quesList[index], 'answerSelf', list[0].answer)
              }
            })
          })
          // removeQuestionAnswer([res.page.list[0].id]).then(res => {

          // })
          if (res.page.list[0].status !== 2) {
            this.$nextTick(() => {
              this.$refs.countdown.init()
            })
          } else {
            this.isComplete = true
            this.$set(this.article, 'ansTime', 0)
          }
        }
      })
    },
    getInfo() {
      this.loading = true
      this.loadingText = '试题加载中...'
      // const uuid = VueCookie.get('sign-uuid')
      getTest(this.id).then(res => {
        this.article = res.exerciseQuestion
        this.$nextTick(() => {
          this.getProgress()
          this.loading = false
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixin";
.exam-container {
  position: relative;
  max-width: 1200px;
  width: 96%;
  margin: 0 auto;
  min-height: 99vh;
}
.start {
  flex: 2;
  &-btn {
    min-width: 120px;
  }
}
.detail-box {
  padding: 60px 0;
}
.detail {
  flex: 1;
  min-width: 280px;
  min-height: 200px;
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
    max-width: 600px;
    width: 100%;
    font-size: 16px;
    line-height: 36px;
    text-align: justify;
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
