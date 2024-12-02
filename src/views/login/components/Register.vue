<template>
  <div class="register">
    <el-form ref="registerForm" :model="formData" :rules="loginRules" class="register-form" autocomplete="off" :label-width="mobile ? '80px' : '90px'" :label-position="mobile ? 'top' : 'left'">
      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>
      <div class="bg">
        <!-- 手机注册 -->
        <el-form-item label="用 户 名" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="off"
          />
        </el-form-item>
        <!-- v-show="isPhone" -->
        <!-- <el-form-item label="登录手机" prop="mobile">
          <el-input
            ref="phone"
            v-model="formData.mobile"
            placeholder="请输入11位数的手机号"
            name="mobile"
            type="text"
            tabindex="1"
            autocomplete="on"
            @change="checkUser('mobile', $event)"
          />
        </el-form-item> -->
        <!-- 邮箱注册 -->
        <!-- <el-form-item v-show="!isPhone" label="登录邮箱" prop="email">
          <el-input
            ref="email"
            v-model="formData.email"
            placeholder="请输入邮箱"
            name="email"
            type="text"
            tabindex="1"
            autocomplete="on"
            @change="checkUser('email', $event)"
          />
        </el-form-item> -->

        <el-form-item label="设置密码" prop="password">
          <el-input
            ref="password"
            v-model="formData.password"
            type="password"
            placeholder="含数字、大小写字母及特殊符号"
            name="password"
            tabindex="2"
            autocomplete="new-password"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            ref="confirmPassword"
            v-model="formData.confirmPassword"
            type="password"
            placeholder="确认密码"
            name="confirmPassword"
            tabindex="3"
            auto-complete="on"
          />
        </el-form-item>
        <el-form-item v-if="captchaEnabled" label="验 证 码" prop="code">
          <el-row type="flex" justify="space-between" class="flex-wrap">
            <el-input
              v-model="formData.code"
              type="text"
              placeholder="输入验证码"
              name="emailCode"
              tabindex="4"
              style="flex: 1; min-width: 100px"
            />
            <el-image class="captcha" :src="captcha" fit="contain" @click="getCaptcha" />
          </el-row>
        </el-form-item>

        <el-button :loading="loading" type="primary" class="submit" @click.native.prevent="handleLogin">立即注册</el-button>
        <el-row type="flex" justify="center">
          <!-- <el-checkbox v-model="checked" tabindex="4"><el-link class="link" :underline="false" type="danger" @click.prevent="openDialog">请阅读并同意《安徽省跨境电商创新服务中心公共服务平台用户服务协议》</el-link></el-checkbox> -->
        </el-row>
        <el-row v-if="source !== 'app'" type="flex" justify="end">
          <!-- <el-link @click="onToggleReg">{{ isPhone ? '邮箱注册' : '手机注册' }}</el-link> -->
          <el-link class="btn-link" @click="onToggle">立即登录</el-link>
        </el-row>
      </div>
    </el-form>
  </div>

</template>

<script>
import { isValidPhone, isValidPassword } from '@/utils/validate'
import ResizeMixin from '@/layout/mixin/ResizeHandler'
import { checkUser, getCaptcha, register } from '@/api/user'
export default {
  mixins: [ResizeMixin],
  data() {
    // const validatePhone = (rule, value, callback) => {
    //   if (!isValidPhone(value)) {
    //     callback(new Error('请输入正确的手机号！'))
    //   } else {
    //     callback()
    //   }
    // }

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 8 || value.length > 20) {
        callback(new Error('密码长度在8到20之间'))
      } else if (!isValidPassword(value)) {
        callback(new Error('含数字、大小写字母、特殊符号'))
      } else {
        if (this.formData.confirmPassword !== '') {
          this.$refs.registerForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      checked: false,
      isPhone: false,
      captchaEnabled: true,
      captcha: '',
      formData: {
        // mobile: '',
        // email: '',
        username: '',
        password: '',
        // emailCode: '',
        code: '',
        uuid: '',
        confirmPassword: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        // mobile: [{ required: true, trigger: 'blur', validator: validatePhone }],
        // email: [
        //   { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        //   { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        // ],
        password: [{ required: true, trigger: ['blur', 'change'], validator: validatePass }],
        confirmPassword: [{ required: true, trigger: ['blur', 'change'], validator: validatePass2 }],
        code: [{ required: true, trigger: 'blur', message: '验证码不能为空' }]
      },
      isRepeatUser: false,
      loading: false,
      source: ''
    }
  },
  computed: {
    device({ $store }) {
      return $store.state.app.device
    },
    mobile() {
      return this.device === 'mobile'
    }
  },
  created() {
    // this.source = this.$route.query.source
    // if (this.source && this.source === 'app') {
    //   const city = localStorage.getItem('city-navList')
    //   const title = city ? '合肥市跨境电子商务公共服务平台' : '安徽跨境电子商务公共服务平台'
    //   this.$route.meta.title = title
    //   this.$router.replace({
    //     query: {
    //       temp: Date.now(),
    //       source: 'app',
    //       status: 'register'
    //     }
    //   })
    // }
    // if (this.source && this.source === 'portal') {
    //   this.$router.replace({
    //     query: {
    //       temp: Date.now(),
    //       source: 'portal',
    //       status: 'register'
    //     }
    //   })
    // }
    this.getCaptcha()
  },
  methods: {
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
    openDialog() {
      this.$emit('dialog')
    },
    // onToggleReg() {
    //   this.isPhone = !this.isPhone
    // },
    handleLogin() {
      this.$refs.registerForm.validate(valid => {
        // if (!this.checked) {
        //   this.$message({
        //     showClose: true,
        //     message: '请阅读并同意《安徽省跨境电商创新服务中心公共服务平台用户服务协议》'
        //   })
        //   return
        // }
        if (valid) {
          this.loading = true
          register(this.formData).then(() => {
            this.$message({
              message: '注册成功!',
              type: 'success',
              onClose: () => {
                // if (this.source && this.source === 'app') {
                //   window.location = window.location.origin + '/app/'
                // } else {
                // }
                this.onToggle()
              }
            })
            this.loading = false
          }).catch(() => {
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

$bg:#fff;
$light_gray:#fff;
$dark_gray:#333;
$cursor: #283443;

.flex-wrap {
  flex-wrap: wrap;
}

.register-form {
  position: relative;
  max-width: 440px;
  width: 90%;
  padding: 0;
  margin: 0 auto;
  overflow: hidden;
}

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.el-input {
  display: inline-block;
  height: 36px;
  width: 100%;
  ::v-deep {
    input {
      border: 0px;
      -webkit-appearance: none;
      color: $dark_gray;
      height: 36px;
      line-height: 36px;
      caret-color: $cursor;
      vertical-align: top;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
}
.btn {
  height: 36px;
  margin-right: 10px;
}
.btn-link {
  margin-top: 20px;
  font-size: 16px;
  color: $dark_gray;
}
.link {
  color: red;
  vertical-align: top;
}
.submit {
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  margin-bottom: 20px;
}
.register {
  width: 100%;
}
@media only screen and (max-width:991px){
  .register-form {
    ::v-deep {
      .el-input {
        height: 32px;
        input {
          height: 32px;
          line-height: 32px;
        }
      }
      .el-form-item__content {
        line-height: 32px;
      }
      .el-form-item__label {
        padding-bottom: 6px;
        line-height: 24px;
      }
    }
  }
}
</style>
