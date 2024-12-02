<template>
  <el-dialog v-loading="loading" title="忘记密码" :visible.sync="visible" :append-to-body="true">
    <el-form ref="form" :model="formData" :rules="rules" label-width="100px" :label-position="mobile ? 'top' : 'left'" class="submit-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" name="username" type="text" tabindex="1" placeholder="请输入用户名" @change="getEmail" />
      </el-form-item>
      <el-form-item v-if="formData.email" label="邮箱" prop="email">
        <el-input v-model="formData.email" name="email" type="text" placeholder="请输入邮箱" disabled />
      </el-form-item>
      <el-form-item label="邮箱验证码" prop="emailCode">
        <el-row type="flex" justify="space-between">
          <el-button class="btn btn-yzm" size="small" type="primary" @click="getCode">获取邮箱验证码</el-button>
          <el-input
            v-model="formData.emailCode"
            type="text"
            placeholder="输入验证码"
            name="emailCode"
            tabindex="2"
            style="flex: 1; min-width: 100px"
          />
        </el-row>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          ref="password"
          v-model="formData.password"
          type="password"
          placeholder="含数字、大小写字母及特殊符号"
          name="password"
          tabindex="3"
          show-password
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="rePassword">
        <el-input
          ref="rePassword"
          v-model="rePassword"
          type="password"
          placeholder="确认密码"
          name="rePassword"
          tabindex="4"
          show-password
          auto-complete="on"
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="info" class="btn" @click="closeDialog">取消</el-button>
      <el-button type="primary" class="btn" :disabled="loading" @click="onSubmit('form')">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { isValidPassword } from '@/utils/validate'
import { findPassword, getEmailCaptcha, getUserEmail } from '@/api/user'
import ResizeMixin from '@/layout/mixin/ResizeHandler'
export default {
  mixins: [ResizeMixin],
  // 定义属性
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 8 || value.length > 20) {
        callback(new Error('密码长度在8到20之间'))
      } else if (!isValidPassword(value)) {
        callback(new Error('含数字、大小写字母、特殊符号'))
      } else {
        if (this.rePassword !== '') {
          this.$refs.form.validateField('rePassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (this.rePassword === '') {
        callback(new Error('请再次输入密码'))
      } else if (this.rePassword !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      loading: false,
      formData: {
        username: '',
        userId: '',
        email: '',
        emailCode: '',
        password: ''
      },
      rePassword: '',
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [{ required: true, message: '您输入的用户不是注册用户！', trigger: 'blur' }],
        emailCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        password: [{ required: true, trigger: ['blur', 'change'], validator: validatePass }],
        rePassword: [{ required: true, trigger: ['blur', 'change'], validator: validatePass2 }]
      }
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
  // 方法集合
  methods: {
    openDialog() {
      this.visible = true
    },
    closeDialog() {
      this.visible = false
    },
    async getEmail(val) {
      if (val) {
        getUserEmail(val).then(res => {
          this.$set(this.formData, 'userId', res.data.userId)
          this.$set(this.formData, 'email', res.data.email)
        })
      }
    },
    async getCode() {
      const form = this.formData
      if (!form.email) {
        this.$message.warning('您输入的用户名非注册用户！')
        return
      }
      getEmailCaptcha({
        title: '跨境公服密码找回',
        emailAddr: form.email
      }).then(res => {
        this.$message.success('已发送验证码至您的邮箱！')
      }).catch(err => {
        this.$message.error(err || '获取验证码失败！')
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          findPassword(this.formData).then(res => {
            this.loading = false
            this.$message({
              type: 'success',
              message: '密码更新成功！',
              onClose: () => {
                this.closeDialog()
              }
            })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-yzm {
  margin-right: 15px;
}
@media only screen and (max-width:991px){
  .btn-yzm {
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
  }
  .submit-form {
    ::v-deep {
      .el-input {
        height: 32px;
        .el-input__inner {
          padding-left: 12px;
          padding-right: 12px;
        }
        input {
          height: 32px;
          line-height: 32px;
        }
        .el-input__icon {
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
