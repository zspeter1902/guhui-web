<template>
  <div class="top-info">
    <el-row type="flex" justify="space-between" align="middle" class="container">
      <div>
        <!-- <span>跨境汇欢迎您的使用！</span> -->
        <!-- <span>您好<strong v-if="isLogin" class="name">{{ name }}</strong></span> -->
        <el-link v-if="isLogin" class="logout hidden-xs-only" type="primary" :underline="false" @click="logout">退出</el-link>
      </div>
      <div>
        <el-link v-if="!isLogin" class="logout" :underline="false" href="/#/login">登录</el-link>
        <el-link v-if="!isLogin" class="logout" :underline="false" href="/#/register?status=register" target="_blank">注册</el-link>
        <!-- <el-dropdown v-if="isLogin" :trigger="device === 'mobile' ? 'click' : 'hover'" @command="handleCommand">
          <span class="el-dropdown-link">
            我的跨境汇<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <template v-for="item of navList">
              <el-dropdown-item v-if="item.meta.title !== '我的收藏' && !item.hidden" :key="item.meta.title" v-isOverseas="item.meta.title" :command="item.path">
                {{ item.meta.title }}
              </el-dropdown-item>
            </template>
            <el-dropdown-item command="修改密码" divided>修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <!-- <el-dropdown v-if="isLogin" class="hidden-xs-only" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-star-on el-icon--left" />收藏夹<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="item of collectList" :key="item.meta.title" :command="item.path">
              {{ item.meta.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
        <el-dropdown v-if="isLogin" class="hidden-xs-only" @command="handleCommand">
          <span class="el-dropdown-link">
            预订<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="会议室">
              会议室预订
            </el-dropdown-item>
            <el-dropdown-item command="广告位">
              广告位预订
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown v-if="isLogin" class="hidden-xs-only" @command="handleCommand">
          <span class="el-dropdown-link">
            申请<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="入驻">
              入驻申请
            </el-dropdown-item>
            <el-dropdown-item command="车位">
              停车位申请
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown v-if="isLogin" class="hidden-xs-only" @command="handleCommand">
          <span class="el-dropdown-link">
            物业<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="物业报修">
              物业报修
            </el-dropdown-item>
            <el-dropdown-item command="物业投诉">
              物业投诉
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-link class="link" :underline="false" href="/app/" target="_blank">用户中心</el-link> -->
        <!-- <router-link class="link" to="/law">相关法律</router-link> -->
      </div>
    </el-row>
    <change-password ref="changePassword" />
    <!-- 添加或修改工单对话框 -->
    <!-- 会议室租赁 -->
    <meeting-form v-show="visibleType === '会议室'" ref="meetingForm" />
    <!-- 广告位租赁 -->
    <adv-form v-show="visibleType === '广告位'" ref="advForm" />
    <!-- 车位租赁 -->
    <parking-form v-show="visibleType === '车位'" ref="parkingForm" />
    <!-- 入驻申请 -->
    <join-form v-show="visibleType === '入驻'" ref="joinForm" />
    <!-- 物业报修 -->
    <repair-form v-show="visibleType === '物业报修'" ref="repairForm" />
    <!-- 物业投诉 -->
    <complaints-form v-show="visibleType === '物业投诉'" ref="complaintsForm" />
  </div>
</template>

<script>
import isOverseas from '@/directive/isOverseas/index'
import { asyncRoutes } from '@/router'
import { isExternal } from '@/utils/validate'
export default {
  directives: {
    isOverseas
  },
  components: {
    ChangePassword: () => import('./Password.vue'),
    AdvForm: () => import('./DialogForm/AdvForm.vue'),
    JoinForm: () => import('./DialogForm/JoinForm.vue'),
    MeetingForm: () => import('./DialogForm/MeetingForm.vue'),
    ParkingForm: () => import('./DialogForm/ParkingForm.vue'),
    ComplaintsForm: () => import('./DialogForm/PropertyComplaintsForm.vue'),
    RepairForm: () => import('./DialogForm/PropertyRepairForm.vue')
  },
  data() {
    return {
      visibleType: ''
    }
  },
  computed: {
    device({ $store }) {
      return $store.getters.device
    },
    navList() {
      return asyncRoutes[0].children
    },
    activeMenu({ $route }) {
      const { meta, path } = $route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isLogin({ $store }) {
      return $store.getters.token
    },
    collectList({ navList }) {
      return navList.filter(item => item.meta.title === '我的收藏')[0].children
    },
    name({ $store }) {
      return $store.state.user.name
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/`)
    },
    async login(status) {
      this.$router.push(`/login?redirect=${this.$route.fullPath}&status=${status}`)
    },
    handleCommand(command) {
      const typeMap = {
        '广告位': { name: 'advForm', type: 'advertising_rent_applay' },
        '入驻': { name: 'joinForm', type: 'register_applay' },
        '会议室': { name: 'meetingForm', type: 'meeting_rent_applay' },
        '车位': { name: 'parkingForm', type: 'parking_rent_applay' },
        '物业报修': { name: 'repairForm', type: 'property_repair' },
        '物业投诉': { name: 'complaintsForm', type: 'property_complaints' }
      }
      this.visibleType = command
      for (const key in typeMap) {
        if (command.includes(key)) {
          const refName = typeMap[key].name
          const type = typeMap[key].type
          // console.log(refName)
          this.$nextTick(() => {
            this.$refs[refName]?.open(type)
          })
          // this.$set(this.form, 'ordType', item.value)
        }
      }

      // this.handleAdd()
      this.openType = false
    },
    handleCommand1(command) {
      if (command === '修改密码') {
        this.$refs['changePassword'].openDialog()
      } else if (isExternal(command)) {
        window.open(command)
      } else {
        this.$router.push('/my/collect/' + command)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.container {
  flex-wrap: wrap;
}
.top-info {
  padding: 5px 0;
  color: $blackColor;
  font-size: 14px;
  line-height: 30px;
  border-bottom: 1px solid $infoColor;
  // background-color:$grayColor;
  .logout {
    // margin-left: 15px;
    margin-right: 15px;
    color: $blackColor;
  }
  .link {
    // margin-right: 15px;
    margin-left: 15px;
    color: $blackColor;
  }
  .el-dropdown {
    margin-left: 15px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: $blackColor;
    .el-icon--left {
      margin-right: 5px;
    }
    .el-icon--right {
      margin-left: 5px;
      font-size: 12px;
    }
  }
  .name {
    margin: 0 5px;
  }
}
@media only screen and (max-width:991px){
}
@media only screen and (max-width:767px){
}
</style>
