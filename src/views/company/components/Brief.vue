<template>
  <div v-loading="loading" class="service-detail">
    <el-row type="flex" justify="center" class="flex-wrap">
      <div class="pics">
        <el-image class="logo flex-fixed" :src="info.logoUrl" fit="contain" />
        <el-row type="flex" align="middle" justify="space-between">
          <el-link :underline="false" class="btn-collect" :class="{'active': info.collectFlag !== '0'}" @click="onCollect(info)"><i class="el-icon--left" :class="info.collectFlag === '0' ?'el-icon-star-off' : 'el-icon-star-on'" />企业收藏</el-link>
          <span class="hits">浏览 {{ info.viewsNum }} 次</span>
        </el-row>
      </div>
      <div class="flex-auto column-info-box">
        <h4 class="name">{{ info.companyName }}<!-- <el-image class="icon el-icon--right" :src="icon" fit="contain" /> --></h4>
        <div class="info">
          <h5 v-if="info.webUrl" class="info-name">官方网址：</h5>
          <el-link v-if="info.webUrl" type="primary" :underline="false" :href="info.webUrl" target="_blank">{{ info.webUrl }}</el-link>
          <h5 v-if="info.about" class="info-name">公司简介：</h5>
          <p v-if="info.about" class="desc" :title="info.about">{{ info.about }}</p>
        </div>
        <div class="column-info">
          <el-button type="primary" size="small" class="btn" @click="openDialog">立即咨询</el-button>
        </div>
      </div>
    </el-row>
    <!-- 弹窗 -->
    <el-dialog title="您的联系方式将推送给专业客户经理会提供一对一服务" :visible.sync="visible" center>
      <el-form ref="form" :model="formData" :rules="rules" label-width="94px" class="submit-form">
        <!-- 预订信息 -->
        <el-form-item label="企业名称" prop="customerCompanyName">
          <el-input v-model="formData.customerCompanyName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系人姓名" prop="customerName">
          <el-input v-model="formData.customerName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="customerPhone">
          <el-input v-model.number="formData.customerPhone" placeholder="请输入" />
        </el-form-item>

        <el-form-item label="联系人邮箱" prop="customerEmail">
          <el-input v-model="formData.customerEmail" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="备注" prop="about">
          <el-input v-model="formData.about" type="textarea" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="info" class="btn" @click="closeDialog">取消</el-button>
        <el-button type="primary" class="btn" :disabled="loading" @click="onSubmit('form')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { isValidPhone } from '@/utils/validate'
import { addCollect, promptlyConsult, removeCollect } from '@/api/user'
export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {}
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
      visible: false,
      loading: false,
      icon: require('img/certification.png'),
      formData: {
        targetCompanyCode: '',
        customerName: '',
        customerCompanyName: '',
        customerPhone: '',
        customerEmail: '',
        about: '',
        createBy: ''
      },
      rules: {
        customerCompanyName: [
          { required: true, trigger: 'blur', message: '请输入企业名称' }
        ],
        customerName: [
          { required: true, trigger: 'blur', message: '请输入联系人姓名' }
        ],
        customerPhone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        customerEmail: [
          { required: true, message: '请输入联系人邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的联系人邮箱', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {
    isLogin({ $store }) {
      return $store.getters.token
    }
  },
  watch: {
    info: {
      handler(val) {
        // console.log(val)
        val && this.$set(this.formData, 'targetCompanyCode', val.companyCode)
      },
      deep: true
    }
  },
  mounted() {
    const ip = returnCitySN['cip']
    // this.$set(this.formData, 'targetCompanyCode', this.info.companyCode)
    this.$set(this.formData, 'createBy', ip)
  },
  methods: {
    openDialog() {
      this.visible = true
    },
    closeDialog() {
      this.visible = false
    },
    isShowDialog() {
      return this.visible
    },
    onLink(id) {
      this.$router.push(`/company/${id}`)
    },
    onCollect(info) {
      if (!this.isLogin) {
        this.$message.warning('您需求先登录！')
        return
      }
      if (this.info.collectFlag === '0') {
        addCollect('company', info.id).then(res => {
          this.$set(this.info, 'collectFlag', res.collectId)
          this.$message.success('收藏成功！')
        })
      } else {
        removeCollect([info.collectFlag]).then(res => {
          this.$set(this.info, 'collectFlag', '0')
          this.$message.success('已取消收藏！')
        })
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          promptlyConsult({
            ...this.formData
          }).then(res => {
            this.$message(res.msg)
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.error('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
.service-detail {
  .pics {
    margin-right: 30px;
  }
  .logo {
    width: 320px;
    height: 320px;
    padding: 20px;
    border-radius: 6px;
    border: 1px solid #e5e5e5;
    margin-bottom: 10px;
  }
  .name {
    padding-bottom: 10px;
    margin-bottom: 5px;
    font-size: 20px;
    line-height: 30px;
    font-weight: bold;
    color: $mainColor;
    .icon {
      width: 72px;
      height: 16px;
    }
  }
  .info {
    line-height: 30px;
    &-name {
      font-weight: bold;
    }
    .desc {
      position: relative;
      height: 120px;
      color: #666;
      overflow: hidden;
      &::before {
        content: '···';
        float: right;
        height: 100%;
        display: flex;
        align-items: flex-end;
        shape-outside: inset(calc(100% - 1.5em) 0 0);
      }
      &::after {
        content: '';
        position: absolute;
        width: 999vh;
        height: 999vh;
        background: #fff;
        box-shadow: -2em 2em #fff;
      }
    }
  }
  .el-button {
    width: 200px;
    margin-top: 20px;
    line-height: 20px;
  }
}
.submit-form {
  max-width: 470px;
  width: 100%;
  margin: 0 auto;
  ::v-deep {
    .el-form-item__label {
      font-weight: normal;
    }
    .el-form-item__content {
      padding-left: 12px;
    }
    .el-form-item:last-of-type {
      margin-bottom: 0;
    }
  }
}
.btn {
  min-width: 100px;
}
.btn-collect {
  &.active {
    color: $mainColor;
    i {
      color: $mainColor;
    }
  }

}
.hits {
  color: #666;
}
::v-deep {
  .el-dialog {
    max-width: 750px;
    &__header {
      background-color: $mainColorHover;
    }
    &__title {
      color: #fff;
      letter-spacing: 1px;
    }
    &__headerbtn {
      font-size: 20px;
      top: 18px;
      .el-dialog__close {
        color: #fff;
      }
    }
  }
}
@media only screen and (max-width: 1199px) {
}
@media only screen and (max-width: 991px) {
  .service-detail {
    .logo {
      width: 280px;
      height: 280px;
    }
    .name {
      margin-bottom: 0px;
      font-size: 18px;
      line-height: 28px;
    }
    .column-info {
      .el-button {
        width: 180px;
      }
    }
  }
}
@media only screen and (max-width: 767px) {
  .service-detail {
    .pics {
      margin-right: 0;
      margin-bottom: 20px;
    }
    .logo {
      width: 200px;
      height: 200px;
      padding: 30px;
      margin-bottom: 10px;
    }
    .name {
      padding-bottom: 5px;
    }
    .info {
      .desc {
        height: 90px;
      }
    }
    .column-info-box {
      padding: 0 16px;
    }
  }
  .submit-form {
    ::v-deep {
      .el-form-item__content {
        padding-left: 0px;
      }
    }
  }
}

</style>
