<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="formData"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">帐号登录</h3>
      </div>
      <div class="bg">
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="formData.username"
            placeholder="请输入手机、邮箱或者用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          >
            <i slot="prepend" class="icon el-icon-user" />
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            ref="password"
            v-model="formData.password"
            type="password"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
          >
            <i slot="prepend" class="icon el-icon-lock" />
          </el-input>
        </el-form-item>
        <el-form-item v-if="captchaEnabled" prop="code">
          <el-row type="flex" justify="space-between" class="flex-wrap">
            <el-input
              ref="captcha"
              v-model="formData.code"
              type="text"
              placeholder="输入验证码"
              name="captcha"
              tabindex="3"
              style="flex: 1; min-width: 100px"
              @keyup.enter.native="handleLogin"
            >
              <i slot="prepend" class="icon el-icon-key" />
            </el-input>
            <el-image class="captcha" :src="captcha" fit="contain" @click="getCaptcha" />
          </el-row>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          class="submit"
          @click.native.prevent="handleLogin"
        >登录</el-button>

        <el-row type="flex" justify="space-between">
          <el-link @click="forgetPassword">忘记密码</el-link>
          <el-link @click="onToggle">立即注册</el-link>
        </el-row>
      </div>
    </el-form>
    <change-password ref="changePassword" />
  </div>
</template>

<script>
import { getCaptcha } from '@/api/user'
export default {
  components: {
    ChangePassword: () => import('@/layout/components/Password.vue')
  },
  data() {
    return {
      captchaEnabled: true,
      formData: {
        uuid: '',
        username: '',
        password: '',
        code: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入帐号' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 8, max: 20, message: '长度为8到20位' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '请输入验证码' }
        ]
      },
      captcha: '',
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    forgetPassword() {
      this.$refs['changePassword'].openDialog()
    },
    getCaptcha() {
      // this.$set(this.formData, 'uuid', getUUID())
      getCaptcha().then(res => {
        // this.captcha = window.URL.createObjectURL(res)
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
        if (this.captchaEnabled) {
          this.captcha = 'data:image/gif;base64,' + res.img
          this.formData.uuid = res.uuid
        }
      })
    },
    onToggle() {
      this.$emit('toggle')
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.formData)
            .then(() => {
              if (this.source && this.source === 'portal') {
                window.location = window.location.origin + '/' + this.redirect
              } else {
                this.$router.push({ path: this.redirect || '/' })
              }
              this.loading = false
            })
            .catch(() => {
              this.getCaptcha()
              this.$set(this.formData, 'code', '')
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_gray: #fff;
$dark_gray: #333;
$cursor: #283443;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .el-input input {
    color: $cursor;
  }
}
.login {
  width: 100%;
}
.flex-wrap {
  flex-wrap: wrap;
}
/* reset element-ui css */
.el-input {
  height: 36px;
  .icon {
    font-size: 18px;
    vertical-align: middle;
    line-height: 36px;
  }
  ::v-deep {
    .el-input__inner {
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $dark_gray;
      height: 36px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
}
::v-deep {
  .el-input-group__prepend {
    background-color: #c2cdd4;
    color: $light_gray;
    padding: 0 10px;
    border-radius: 0;
    border: none;
  }
}

.login-form {
  position: relative;
  max-width: 440px;
  width: 90%;
  padding: 0;
  margin: 0 auto;
  overflow: hidden;
}

.el-link {
  font-size: 16px;
  color: $dark_gray;
}
.captcha {
  height: 36px;
  margin-left: 5px;
}
.submit {
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
