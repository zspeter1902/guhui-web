<template>
  <div class="search-container">
    <div class="container">
      <!-- 搜索 -->
      <el-form ref="form" :model="formData" :rules="rules" class="search-form">
        <el-form-item prop="keyword">
          <el-input v-model="formData.keyword" placeholder="请输入搜索词" @keyup.enter.native="submitForm('form')">
            <el-button slot="append" icon="el-icon-search" @click.prevent="submitForm('form')" />
          </el-input>
        </el-form-item>
        <div class="hot text-center">
          <span>热门搜索：<el-link :underline="false" @click="search('税务')">税务</el-link>、<el-link :underline="false" @click="search('平台入驻')">平台入驻</el-link>、<el-link :underline="false" @click="search('特殊综合保税区')">特殊综合保税区</el-link>、<el-link :underline="false" @click="search('配送')">配送</el-link>、<el-link :underline="false" @click="search('融资')">融资</el-link>、<el-link :underline="false" @click="search('融资')">数据分析</el-link></span>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import serviceRouter from '@/router/modules/service'
export default {
  // 定义属性
  data() {
    return {
      formData: {
        keyword: ''
      },
      rules: {
        keyword: [
          { required: true, message: '请输入关键词', trigger: 'blur' }
        ]
      }
    }
  },
  // 方法集合
  methods: {
    search(keyword) {
      this.$set(this.formData, 'keyword', keyword)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({
            path: '/service/search',
            query: {
              keyword: this.formData.keyword
            }
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
@import '~@/styles/variables';

$bg: #fff;
$dark_gray: #333;
$cursor: #283443;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .el-input input {
    color: $cursor;
  }
}
.search-container {
  .container {
    width: 100%;
  }
}
.search-form {
  width: 100%;
  margin: 0 auto 10px;
  .hot {
    line-height: 24px;
    color: $dark_gray;
    a {
      width: auto !important;
      color: $dark_gray;
      &:hover {
        color: $mainColor
      }
    }
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-input {
    height: 50px;
    font-size: 16px;
    ::v-deep {
      .el-input__inner {
        -webkit-appearance: none;
        border-radius: 30px 0 0 30px;
        color: $dark_gray;
        padding: 0 42px;
        height: 50px;
        caret-color: $cursor;
        border-color: $helpColor;
        user-select: none;
        &::placeholder {
          color: $grayColor;
        }
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }
  ::v-deep {
    .el-input-group__append {
      border: none;
      border-radius: 0 25px 25px 0;
      padding: 0 24px;
      color: #666;
      background-color: $helpColor;
    }
    .el-form-item__error {
      font-size: 16px;
      padding-top: 0;
      line-height: 50px;
      top: 0;
      right: 90px;
      left: auto;
      user-select: none;
    }
  }
}

@media only screen and (max-width:991px){
  .search-form {
    .el-input {
      height: 40px;
      font-size: 16px;
      ::v-deep {
        .el-input__inner {
          padding: 0 26px;
          height: 40px;
        }
      }
    }
    ::v-deep {
      .el-form-item__error {
        right: 70px;
        font-size: 14px;
        line-height: 40px;
      }
      .el-input-group__append {
        padding: 0 20px;
      }
    }
  }
}
@media only screen and (max-width:767px){
  .search-form {
    .el-input {
      height: 36px;
      font-size: 14px;
      ::v-deep {
        .el-input__inner {
          padding: 0 18px;
          height: 36px;
        }
      }
    }
    .hot {
      font-size: 12px;
      line-height: 22px;
    }
    ::v-deep {
      .el-form-item {
        margin-bottom: 10px;
      }
      .el-input-group__append {
        padding: 0 18px;
      }
      .el-form-item__error {
        font-size: 14px;
        line-height: 36px;
        right: 60px;
      }
    }
  }
}
</style>
