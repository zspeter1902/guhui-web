<template>
  <div class="login-container">
    <z-login v-if="!isReg" @toggle="onToggle" />
    <z-register v-if="isReg" @toggle="onToggle" @dialog="openDialog" />
    <!-- 版权 -->
    <div class="copyright text-center">
      <el-image class="logo" :src="logo" fit="contain" />
      <p>Copyright © 2021 Cross-border E-commerce Innovation Service Center of Anhui Province 安徽省跨境电商创新服务中心公共服务平台</p>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="用户服务协议" :visible.sync="visible" :before-close="handleBeforeClose" center>
      <protocol />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
    ZLogin: () => import('./components/Login'),
    ZRegister: () => import('./components/Register'),
    Protocol: () => import('./components/Protocol')
  },
  data() {
    return {
      logo: require('img/logo.png'),
      visible: false,
      isReg: false, // TODO:默认为false
      allowClose: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        if (route.query.status) {
          this.isReg = route.query.status !== 'login'
        }
      },
      immediate: true
    }
  },
  methods: {
    onToggle() {
      this.isReg = !this.isReg
    },
    openDialog() {
      this.visible = true
      // this.countDownTime()
    },
    handleBeforeClose(done) {
      done()
      // if (this.allowClose) {
      //   this.allowClose = false
      //   done()
      // }
    },
    countDownTime() {
      if (this.allowClose) return
      let time = 5
      let timer = setInterval(() => {
        if (time === 0) {
          this.allowClose = true
          clearInterval(timer)
        } else {
          this.allowClose = false
        }
        time--
      }, 1000)
      this.$on('hook:beforeDestroy', () => {
        clearInterval(timer)
        timer = null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$light_gray: #fff;
.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  min-height: 100%;
  padding: 30px 0;
  display: flex;
  align-items: center;
  // background-color: $bg;
  background: url('~img/login_bg.jpg') no-repeat center center / cover;
  z-index: 2;
  overflow: hidden;
  .copyright {
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    max-width: 1200px;
    margin: 0 auto;
    color: #fff;
    z-index: -1;
    .logo {
      width: 445px;
      height: 46px;
    }
    p {
      margin-top: 16px;
    }
  }
}
::v-deep {
  .el-dialog {
    max-width: 1200px;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 36px;
      color: $light_gray;
      margin: 0px auto 18px;
      text-align: center;
      font-weight: bold;
      letter-spacing: 4px;
    }
  }
  .bg {
    padding: 26px 28px 20px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(2px);
  }
  .el-form-item {
    margin-bottom: 20px;
    color: $light_gray;
    .el-form-item__label {
      font-size: 15px;
      font-weight: normal;
      color: $bg;
    }
  }
}
@media only screen and (max-width:767px){
  ::v-deep {
    .title-container {
      .title {
        font-size: 24px;
      }
    }
    .bg {
      padding-top: 20px;
      padding-left: 15px;
      padding-right: 15px;
    }
    .el-form-item {
      .el-form-item__label {
        font-size: 14px;
      }
    }
  }
}
</style>
