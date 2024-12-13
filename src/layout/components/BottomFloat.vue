<template>
  <div>
    <div ref="float" class="float-container">
      <transition name="fade">
        <div v-show="visible" class="float-box">
          <el-link v-for="(item, index) of lists" :key="index" class="item text-center" :underline="false" @click.prevent="goBack">
            <i :class="item.icon" />
          </el-link>
        </div>
      </transition>
      <el-badge :is-dot="isHave">
        <el-link class="item text-center" :underline="false" title="在线客服" @click.prevent="openChat">
          <!-- <i class="el-icon-s-comment" /> -->
          <el-image class="icon-chat" :src="iconChat" fit="contain" />
        </el-link>
      </el-badge>
      <el-link class="item item-icon text-center" :underline="false" title="园区咨询" @click.prevent="visibleConsult = true">
        <i class="el-icon-s-comment" />
        <!-- <el-image class="icon-chat" :src="iconChat" fit="contain" /> -->
      </el-link>
    </div>
    <!-- TODO: 意见反馈 或 在线客服 园区咨询-->
    <el-dialog title="客服中心" :visible.sync="visibleChat" @close="watchChat">
      <el-row type="flex">
        <!--  -->
        <div class="flex-auto">
          <!-- 聊天内容记录 -->
          <el-scrollbar ref="myScrollbar" class="chat-content">
            <el-row type="flex" tag="ul" class="flex-column scrollbar-container">
              <!-- 历史聊天 -->
              <template v-if="historyList.length">
                <el-link v-if="isMore" :underline="false" @click="onPrev">查看更多</el-link>
                <li v-for="item of historyList" :key="item.id" :class="{'right': item.userFrom === userId}">
                  <span v-if="item.userFrom !== userId" class="chat-name"><el-image class="figure el-icon--left" :src="iconFigure" fit="contain" />客服人员({{ item.userFrom }})</span>
                  <span @click="onChatTap($event)" v-html="parseHtml(item.message)" />
                  <span v-if="item.userFrom === userId" class="chat-name">{{ item.userFrom }}<el-image class="figure el-icon--right" :src="iconFigure2" fit="contain" /></span>
                </li>
              </template>
              <!-- 最新聊天 -->
              <li v-for="(item, index) of chatList" :key="index" :class="{'right': item.username === userId}">
                <span v-if="item.username !== userId" class="chat-name"><el-image class="figure el-icon--left" :src="iconFigure" fit="contain" />客服人员({{ item.username }})</span>
                <span @click="onChatTap($event)" v-html="parseHtml(item.textMessage)" />
                <span v-if="item.username === userId" class="chat-name">{{ item.username }}<el-image class="figure el-icon--right" :src="iconFigure2" fit="contain" /></span>
              </li>
            </el-row>
          </el-scrollbar>
          <!-- 聊天表单 -->
          <div class="chat-form">
            <el-input v-model="message" type="textarea" rows="3" placeholder="请输入" resize="none" @keyup.enter.native="websocketsend()" />
            <el-row type="flex" justify="space-between">
              <el-button class="chat-btn" type="primary" @click.prevent="visibleSelect = true">选择客服人员</el-button>
              <el-button class="chat-btn" type="primary" @click.prevent="websocketsend()">发送消息</el-button>
            </el-row>
          </div>
        </div>
        <!-- 常见问题 -->
        <div class="faq flex-fixed">
          <el-tabs v-model="activeName">
            <!-- commonQuestions -->
            <el-tab-pane label="常见问题" name="tab0">
              <el-scrollbar ref="faqScrollbar" class="faq-content">
                <el-collapse>
                  <el-collapse-item v-for="(item, index) of commonQuestions" :key="index" :title="item.question" :name="item.id">
                    <div v-html="item.answer" />
                  </el-collapse-item>
                </el-collapse>
              </el-scrollbar>
            </el-tab-pane>
            <!-- <el-tab-pane label="在线留言" name="tab1">
              <el-collapse>
                <el-collapse-item v-for="(item, index) of commonQuestions" :key="index" :title="item.question" :name="item.id">
                  <div>{{ item.answer }}</div>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </el-row>
    </el-dialog>
    <!-- 客服人员列表选择 -->
    <el-dialog title="在线客服人员" :visible.sync="visibleSelect">
      <el-radio-group v-model="tousername" class="no-select" size="medium">
        <el-radio-button v-for="item of serviceList" :key="item.id" :label="item.id">{{ item.name }}</el-radio-button>
      </el-radio-group>
    </el-dialog>
    <!-- 园区咨询 -->
    <el-dialog title="园区咨询" :visible.sync="visibleConsult" center>
      <el-form ref="form" :model="formData" :rules="rules" label-width="80px" class="submit-form">
        <el-form-item label="咨询标题" prop="customerCompanyName">
          <el-input v-model="formData.customerCompanyName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="咨询内容" prop="customerCompanyName">
          <el-input v-model="formData.customerCompanyName" type="textarea" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="您的姓名" prop="customerName">
          <el-input v-model="formData.customerName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="您的电话" prop="customerPhone">
          <el-input v-model.number="formData.customerPhone" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="您的邮箱" prop="customerEmail">
          <el-input v-model="formData.customerEmail" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="备注" prop="about">
          <el-input v-model="formData.about" type="textarea" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="info" class="btn" @click="visibleConsult = false">取消</el-button>
        <el-button type="primary" class="btn" :disabled="loading" @click="onSubmitConsult('form')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { changeRead, getChatRecord, getCustomer, getQuestionList, getUnread } from '@/api/global'
import { getName } from '@/utils/auth'
import { isValidPhone } from '@/utils/validate'
import { getRandomUUID } from '@/utils'
import { replaceLink } from '@/utils/htmlParse'
export default {
  // 定义属性
  props: {
    backPosition: {
      type: Number,
      default: 0
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!isValidPhone(value)) {
        callback(new Error('请输入正确的手机号！'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      visible: false,
      visibleChat: false,
      visibleConsult: false,
      visibleSelect: false,
      activeName: 'tab0',
      formData: {
        createBy: '', // ip
        customerName: '',
        customerCompanyName: '',
        customerPhone: '',
        customerEmail: '',
        targetCompanyCode: '',
        about: ''
      },
      rules: {
        customerName: [
          { required: true, trigger: 'blur', message: '请输入您的姓名' }
        ],
        customerCompanyName: [
          { required: true, trigger: 'blur', message: '请输入企业名称' }
        ],
        customerPhone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        customerEmail: [
          { required: true, message: '请输入您的邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
        ]
      },
      lists: [
        {
          title: '返回顶部',
          icon: 'el-icon-caret-top' // el-icon-arrow-up el-icon-caret-top
        }
      ],
      iconChat: require('img/cs1.png'),
      iconFigure: require('img/figure.png'),
      iconFigure2: require('img/figure2.png'),
      isMoving: false,
      interval: null,
      webSocket: null,
      message: '',
      isMore: false,
      page: 1,
      historyList: [],
      chatList: [],
      tousername: '',
      serviceList: [
        // { name: '岳芮', id: 'yuerui' }, { name: '何梦天', id: 'hemengtian' }
      ],
      isHave: false,
      haveTime: null,
      commonQuestions: []
    }
  },
  computed: {
    isLogin({ $store }) {
      return !!$store.getters.token
    },
    userId() {
      return getName() || sessionStorage.getItem('randomUser') || '用户' + getRandomUUID()
    }
  },
  mounted() {
    this.getQuestions()
    this.getUser()
    if (!this.isLogin && !sessionStorage.getItem('randomUser')) {
      sessionStorage.setItem('randomUser', this.userId)
    }
    // this.initWebSocket()
    // this.watchChat()
    window.addEventListener('scroll', this.scrollToTop)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollToTop)
    if (this.interval) {
      clearInterval(this.interval)
    }
    if (this.haveTime) {
      clearInterval(this.haveTime)
    }
  },
  // 方法集合
  methods: {
    scrollToTop() {
      this.visible = window.pageYOffset > window.outerHeight / 3
    },
    goBack() {
      if (this.isMoving) return
      const start = window.pageYOffset
      let i = 0
      this.isMoving = true
      // 实现滚动效果
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500))
        if (next <= this.backPosition) {
          window.scrollTo(0, this.backPosition)
          clearInterval(this.interval)
          this.isMoving = false
        } else {
          window.scrollTo(0, next)
        }
        i++
      }, 16.7)
    },
    openChat() {
      this.visibleChat = true
      this.$nextTick(() => {
        this.scrollDown()
        if (this.isHave) {
          this.changeRead()
        }
      })
    },
    watchChat() {
      this.haveTime = setInterval(() => {
        if (this.isHave) {
          clearInterval(this.haveTime)
          return
        }
        this.getRead()
      }, 10000)
    },
    getUser() {
      getCustomer().then(res => {
        this.tousername = res.value
        this.$nextTick(() => {
          this.historyList = []
          this.getHistory()
        })
      })
    },
    getQuestions() {
      // 常见问题
      getQuestionList({
        plate: '1'
      }).then(res => {
        this.commonQuestions = res.page.list
      })
    },
    getQuestionsRecommended() {
      getQuestionList({
        question: '',
        keyword: '',
        ket: '',
        plate: '2'
      }).then(res => {
        this.commonQuestions = res.page.list
      })
    },
    getRead() {
      getUnread(this.userId, this.tousername).then(res => {
        this.isHave = res.data && !!res.data.length
      }).catch(() => {
        clearInterval(this.haveTime)
      })
    },
    changeRead() {
      changeRead(this.tousername, this.userId).then(res => {
        console.log('消息已读')
        this.isHave = false
        if (this.haveTime) {
          clearInterval(this.haveTime)
        }
      })
    },
    onPrev() {
      this.page++
      this.getHistory()
    },
    getHistory() {
      getChatRecord(this.userId, this.tousername, this.page).then(res => {
        const arr = res.page.list.reverse()
        this.historyList.unshift(...arr)
        this.isMore = this.page < res.page.totalPage
        this.$nextTick(() => {
          this.scrollUp()
        })
      })
    },
    scrollUp() {
      if (this.$refs['myScrollbar']) {
        this.$refs['myScrollbar'].wrap.scrollTop = 0
      }
    },
    scrollDown() {
      this.$refs['myScrollbar'].wrap.scrollTop = this.$refs['myScrollbar'].wrap.scrollHeight
    },
    initWebSocket() {
      this.webSocket = null
      // 判断当前浏览器是否支持WebSocket

      if ('WebSocket' in window) {
        // 初始化weosocket(必须)  配置服务器端 WebSocket 接受 url， 此处按照自己的项目路径进行配置
        const socketUrl = `wss://www.ahceisc.com:443/wss/onlineServer/${this.userId}`
        this.webSocket = new WebSocket(socketUrl) // 新建一个webstock对象
        this.webSocket.onopen = this.webSocketOnOpen
        this.webSocket.onmessage = this.webSocketOnMessage
        this.webSocket.onerror = this.webSocketOnError
        this.webSocket.onclose = this.webSocketOnClose
      } else {
        this.$message.error('当前浏览器不支持 websocket')
      }
    },
    webSocketOnOpen() {
      console.log('---socket连接建立成功---')
    },
    webSocketOnError() {},
    webSocketOnMessage(e) {
      const res = JSON.parse(e.data)
      // 更新content的内容（上线）
      // if (res.messageType === 1) {}
      // 更新content的内容（下线）
      // if (res.messageType === 2) {}
      // 更新content的内容（更新用户列表）
      // if (res.messageType === 3) {}
      // 更新content的内容（更新用户群发消息）
      if (res.messageType === 400 || res.messageType === 4) {
        this.handleData(res)
        this.$nextTick(() => {
          this.scrollDown()
        })
      }
    },
    handleData(res) {
      // textMessage
      this.chatList.push(res)
    },
    websocketsend() {
      if (!this.tousername || !this.message) {
        this.$message.warning('请输入要发送的信息！')
        return
      }
      // 数据发送
      const param = {}
      param['username'] = this.userId
      param['message'] = this.message
      param['type'] = 'general message'
      param['tousername'] = this.tousername
      this.webSocket.send(JSON.stringify(param))
      this.message = ''
      this.watchChat()
    },
    webSocketOnClose(e) {
      console.log('断开连接', e)
    },
    easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b
      return -c / 2 * (--t * (t - 2) - 1) + b
    },
    parseHtml(html) {
      return replaceLink(html)
    },
    onChatTap(e) {
      const val = e.target.getAttribute('data-value').trim()
      const param = {}
      param['username'] = this.userId
      param['message'] = val
      param['type'] = 'general message'
      param['tousername'] = this.tousername
      this.webSocket.send(JSON.stringify(param))
      this.watchChat()
      // this.handleData(val)
      // this.$nextTick(() => {
      //   this.scrollDown()
      // })
    },
    onSubmitConsult(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          // promptlyConsult(this.formData).then(res => {
          //   this.loading = false
          //   this.$message.success(res.msg)
          // }).catch(() => {
          //   this.loading = false
          // })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.faq {
  width: 200px;
  padding: 0 10px;
  margin-left: 20px;
  border: 1px solid #DCDFE6;
  &-content {
    height: 390px;
    font-size: 14px;
    color: $blackColor;
    line-height: 24px;
    ::v-deep {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
}
.no-select {
  user-select: none;
}
::v-deep {
  .el-dialog {
    max-width: 1200px;
  }
  .el-tabs__item {
    font-size: 14px;
  }
  .el-tabs__header {
    margin-bottom: 0;
  }
}
.float-container {
  position: fixed;
  bottom: 100px;
  right: 20px;
  z-index: 3001;
  .float-box {
    margin-bottom: 10px;
  }
  ::v-deep {
    .el-badge__content {
      &.is-dot {
        width: 12px;
        height: 12px;
      }
      &.is-fixed {
        top: 5px;
        &.is-dot {
          right: 15px;
        }
      }
    }
  }

  .item {
    display: block;
    width: 60px;
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    border-radius: 30px;
    background-color: #fff;
    margin-bottom: 10px;
    box-shadow: 0 0 5px rgba($color: #000000, $alpha: .08);
    & + .item {
      margin-top: 10px;
    }
    &-icon {
      // font-size: 0;
      font-size: 32px;
    }
    .icon-chat {
      width: 26px;
      height: 26px;
      line-height: 26px;
      vertical-align: middle;
      filter: contrast(0.36);
    }
  }
}
.chat {
  &-box {
  }
  &-content {
    height: 300px;
    font-size: 14px;
    color: $blackColor;
    line-height: 24px;
    border: 1px solid #DCDFE6;
    ul {
      padding: 15px;
      overflow: hidden;
      li {
        margin-bottom: 10px;
      }
    }
    .chat-name {
      margin-right: 10px;
      margin-left: 0;
      font-weight: bold;
      color: $mainColor;
    }
    .figure {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    .right {
      align-self: end;
      .chat-name {
        margin-right: 0;
        margin-left: 10px;
      }
    }
    ::v-deep {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .link-search {
        color: $mainColor;
      }
    }
  }
  &-form {
    margin-top: 10px;
  }
  &-btn {
    // width: 100%;
    margin-top: 10px;
  }

}
@media only screen and (max-width:1199px){
  .float-container {
    bottom: 80px;
    .item {
      width: 50px;
      height: 50px;
      line-height: 50px;
      border-radius: 25px;
      .icon-chat {
        width: 22px;
        height: 22px;
        line-height: 22px;
      }
    }
  }
}

@media only screen and (max-width:767px){
  .float-container {
    bottom: 60px;
    .item {
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      .icon-chat {
        width: 18px;
        height: 18px;
        line-height: 18px;
      }
    }
  }
}
</style>
