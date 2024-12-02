<template>
  <div class="question-bank">
    <question-title title="题库" :left="false" />
    <!-- 用户记录 -->
    <!-- <user-nav /> -->
    <!-- 类别功能 -->
    <div class="lists">
      <el-row tag="ul" type="flex" class="flex-wrap" :gutter="16">
        <el-col v-for="(list, index) in linkList" :key="index" :span="12" tag="li">
          <router-link :to="list.url">
            <h4>{{ list.name }}</h4>
            <p>{{ list.desc }}</p>
            <el-image class="icon" :src="list.icon" fit="contain" />
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import UserNav from './components/layout/user-nav.vue'
import QuestionTitle from './components/layout/Title.vue'
export default {
  name: 'QuestionsBank',
  components: {
    QuestionTitle,
    UserNav,
  },
  // 定义属性
  data() {
    return {
      linkList: [
        // {
        //   icon: require('./image/icon_5.png'),
        //   name: '章节练习',
        //   desc: '打卡提升能力',
        //   url: '/chapter-exercise/'
        // },

        // {
        //   icon: require('./image/icon_6.png'),
        //   name: '历年真题',
        //   desc: '消除薄弱知识',
        //   url: '/years-topic/'
        // },
        {
          icon: require('./image/icon_7.png'),
          name: '真题模拟',
          desc: '考前综合测验',
          url: '/question-bank/exam/1'
        },
        {
          icon: require('./image/icon_8.png'),
          name: '考前押题',
          desc: '掌握能力检测',
          url: '/exam-forecast/'
        },
        // {
        //   icon: require('./image/icon_9.png'),
        //   name: '考试大纲',
        //   desc: '了解最新动向',
        //   url: '/exam-outline/'
        // },
        // {
        //   icon: require('./image/icon_5.png'),
        //   name: '每日一练',
        //   desc: '每天进步一点',
        //   url: '/day-exam/'
        // }
      ]
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  // 方法集合
  methods: {}
}
</script>

<style lang="scss" scoped>
.question-bank {
  max-width: 640px;
  margin: 0 auto;
}
.lists {
  padding: 0 15px;
}
.lists li {
  margin-bottom: 15px;
}
.lists a {
  position: relative;
  display: block;
  padding: 15px 15px;
  border-radius: 10px;
}
.lists h4 {
  font-size: 16px;
  line-height: 26px;
}
.lists p {
  margin: 6px 0 0;
  font-size: 12px;
  line-height: 18px;
}
.lists .icon {
  position: absolute;
  bottom: 6px;
  right: 8px;
  width: 40px;
  height: 40px;
}
.lists li:nth-of-type(1) a {
  background-color: #ebf3ff;
  color: #7688b4;
}
.lists li:nth-of-type(2) a {
  background-color: #f5eeff;
  color: #9387b9;
}
.lists li:nth-of-type(3) a {
  background-color: #fff3e7;
  color: #ba8b73;
}
.lists li:nth-of-type(4) a {
  background-color: #ffeced;
  color: #af7c7d;
}
.lists li:nth-of-type(5) a {
  background-color: #ebf3ff;
  color: #7688b4;
}
.lists li:nth-of-type(6) a {
  background-color: #ebf3ff;
  color: #7688b4;
}
.lists li:nth-of-type(1) h4 {
  color: #00093a;
}
.lists li:nth-of-type(2) h4 {
  color: #190a56;
}
.lists li:nth-of-type(3) h4 {
  color: #502403;
}
.lists li:nth-of-type(4) h4 {
  color: #5c090b;
}
.lists li:nth-of-type(5) h4 {
  color: #00093a;
}
.lists li:nth-of-type(6) h4 {
  color: #00093a;
}
</style>
