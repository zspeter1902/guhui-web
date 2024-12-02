<template>
  <div class="tab-content">
    <!-- banner -->
    <banner :banner="banner" />
    <div class="container">
      <div class="custom-tabs">
        <el-link :underline="false" :class="{active: active == 0}" @click="active = 0">平台培训</el-link>
      </div>
      <transition name="fade">
        <div v-if="active == 0" class="custom-tab-content">
          <!-- 活动预告 -->
          <h2 class="talent-title">活动预告</h2>
          <ul class="activity-lists">
            <el-row v-for="item of activityList" :key="item.id" type="flex" class="flex-wrap activity-list" tag="li">
              <div class="activity-thumb">
                <el-image class="img" :src="item.actImg" :preview-src-list="[item.actImg]" fit="cover" />
              </div>
              <div class="activity-info ov-h">
                <router-link class="activity-name el-link el-link--primary" :to="`activity/${item.id}`">{{ item.actName }}</router-link>
                <p class="column">活动地址：<el-link class="address" type="primary" :underline="false" @click="openMap(item.actAddr)">{{ item.actAddr }}</el-link></p>
                <p class="column">活动时间：<span class="warn">{{ item.startTime }}</span> - <span class="warn">{{ item.endTime }}</span></p>
                <p class="column">联系人：{{ item.contactName }}</p>
                <p class="column">联系方式：{{ item.contactPhone }}</p>
                <el-button class="btn" type="primary" size="medium" :disabled="item.status !== '1'" @click="handleApply(item)">{{ item.status !== '1' ? '报名尚未开始' : '立即报名' }}</el-button>
                <!-- <el-button class="btn" type="primary" size="medium" :disabled="item.status !== '1'" @click="handleSignIn(item)">签到</el-button> -->
                <!-- <el-link
                  v-else
                  class="btn el-button el-button--primary el-button--medium"
                  :underline="false"
                  type="primary"
                  :href="`/#/login?status=login&redirect=${path}`"
                >立即报名</el-link> -->
              </div>
            </el-row>
          </ul>
          <!-- 往期活动 -->
          <h2 class="talent-title">往期活动</h2>
          <ul class="activity-history-lists">
            <el-row v-for="item of activityListHistory" :key="item.id" type="flex" justify="space-between">
              <router-link class="activity-name el-link el-link--primary" :to="`activity/${item.id}`">{{ item.actName }}</router-link>
              <span>{{ item.startTime }}</span>
            </el-row>
          </ul>
          <pagination
            v-show="activityHistoryCount > page.limit"
            :total="activityHistoryCount"
            :page.sync="page.page"
            :limit.sync="page.limit"
            :auto-scroll="false"
            layout="prev, pager, next"
            @pagination="getHistoryLists"
          />
        </div>
      </transition>
    </div>
    <!-- 群二维码弹窗 -->
    <el-dialog
      title="活动二维码"
      :visible.sync="dialogVisible"
    >
      <el-image class="dialog-img" :src="dialogFile" fit="contain" />
    </el-dialog>
    <!-- 活动信息收集 -->
    <activity-form ref="activityForm" :info="formItem" @submit="handleSign" />
    <!-- 显示地图 -->
    <map-address ref="mapAddress" :address="address" />
  </div>
</template>

<script>
import MapAddress from './components/Map.vue'
import Banner from '@/components/Banner'
import { getActivityList, getActivityListHistory, signUpActivity } from '@/api/content'
export default {
  name: 'Train',
  components: {
    Banner,
    MapAddress,
    Pagination: () => import('@/components/Pagination'),
    ActivityForm: () => import('./form')
  },
  data() {
    return {
      name: '交流培训',
      banner: require('img/news-banner.png'),
      active: 0,
      formItem: {},
      dialogVisible: false,
      dialogFile: '',
      activityList: [],
      page: {
        page: 1,
        limit: 10
      },
      total: null,
      activityListHistory: [],
      activityHistoryCount: 0,
      address: ''
    }
  },
  computed: {
    isLogin({ $store }) {
      return $store.getters.token
    },
    path({ $route }) {
      return $route.path
    }
  },
  created() {
    this.getLists()
    this.getHistoryLists()
  },
  methods: {
    handleApply(item) {
      if (item.otherInfo || item.requiredFields) {
        this.formItem = item
        this.$nextTick(() => {
          this.$refs.activityForm.open()
        })
      } else if (this.isLogin) {
        this.onSignUp(item)
      } else {
        this.formItem = item
        this.$nextTick(() => {
          this.$refs.activityForm.open()
        })
      }
    },
    openMap(address) {
      this.address = address
      this.$nextTick(() => {
        this.$refs.mapAddress.open()
      })
    },
    handleSign(item) {
      this.onSignUp(this.formItem, item)
    },
    handleSignIn(item) {
      this.$router.push('/train/activity/sign-in/' + item.id)
    },
    onSignUp(item, otherData) {
      this.dialogFile = item.actCode
      signUpActivity(item.id, otherData).then(res => {
        this.$message({
          showClose: true,
          message: res.msg || '您已报名成功！',
          duration: 3000,
          type: 'success'
        })
        if (item.actCode) {
          setTimeout(() => {
            this.dialogVisible = true
          }, 600)
        }
      })
    },
    getLists() {
      getActivityList({
        pageNum: 1,
        pageSize: 10
      }).then(res => {
        // console.log(res)
        this.activityList = res.rows
      })
    },
    getHistoryLists() {
      getActivityListHistory(this.page).then(res => {
        this.activityListHistory = res.page.list
        this.activityHistoryCount = res.page.totalCount
      })
    },
    signUp(id) {

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
.tab-content {
  min-height: 300px;
  font-size: 16px;
  line-height: 36px;
  .indent {
    padding-left: 2em;
  }
  .indent-1 {
    padding-left: 4em;
  }
  p {
    margin-top: 10px;
    text-indent: 2em;
    .el-link {
      text-indent: 0;
    }
    .address {
      font-size: inherit;
    }
    &.column {
      text-indent: 0;
    }
  }
  .custom-tabs {
    margin-top: 16px;
    // background-color: $grayColor;
    border-bottom: 2px solid $mainColor;
    .el-link {
      width: 160px;
      padding: 0 20px;
      line-height: 40px;
      color: #333;
      font-size: 16px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      &.active {
        background-color: $mainColor;
        color: #fff;
      }
    }
  }
  .custom-tab-content {
    padding: 20px 16px 16px;
  }
  .activity-lists {
    margin-bottom: 30px;
    .activity-list {
      margin-bottom: 24px;
    }
  }
  .talent-title {
    position: relative;
    margin-bottom: 20px;
    line-height: 40px;
    font-size: 18px;
    color: $mainColor;
    font-weight: bold;
    border-bottom: 1px solid $infoColor;
  }
  .activity-thumb {
    margin-right: 24px;
    .img {
      width: 300px;
      height: 240px;
      vertical-align: top;
    }
  }
  .activity-info {
    p {
      margin-top: 5px;
      line-height: 28px;
    }
    .warn {
      color: $mainColor;
    }
    .btn {
      margin-top: 16px;
      &.el-link {
        color: #fff;
      }
    }
  }
  .activity-name {
    font-size: 18px;
    @include ellipsis()
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 140px;
      }
    }
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 100px;
        font-size: 14px;
        line-height: 32px;
      }
    }
  }
}
</style>
