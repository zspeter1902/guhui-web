<template>
  <div class="service-container">
    <div class="container">
      <slot name="title" />
      <el-row type="flex" :gutter="15" class="service-list flex-wrap" tag="ul">
        <el-col v-for="item in serviceList" :key="item.id" :span="12" :xs="12" tag="li">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <el-row type="flex" class="flex-wrap">
              <el-row type="flex" align="middle" justify="center" class="left-box">
                <el-image class="logo" :src="item.logo" :alt="item.title" fit="contain" />
              </el-row>
              <div class="box">
                <router-link class="name" to="/">{{ item.title }}</router-link>
                <p>{{ item.desc }}</p>
              </div>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <slot name="more" />
    </div>
  </div>
</template>

<script>
export default {
  // 定义属性
  data() {
    return {
      serviceList: [
        {
          id: 1,
          title: '万里汇',
          desc: '保证用户资金安全, 使每一笔交易拥有安全性保障。',
          logo: require('img/financial_logo_1.png')
        },
        {
          id: 2,
          title: 'OTT',
          desc: '保证用户资金安全, 使每一笔交易拥有安全性保障。',
          logo: require('img/financial_logo_2.png')
        },
        {
          id: 3,
          title: 'GLOCASH',
          desc: '安全、快捷、简便',
          logo: require('img/financial_logo_3.png')
        },
        {
          id: 4,
          title: 'Asiabill',
          desc: '打通信用卡快速收单业务，信用卡回款周期极快',
          logo: require('img/financial_logo_4.png')
        }
      ]
    }
  },
  // 方法集合
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixin';
.service-container {
  padding-bottom: 108px;
  background: url('~img/index_financial_service.jpg') no-repeat center / cover;
  .title {
    top: -27px;
  }
  .service-list {
    margin-top: 30px;
    margin-bottom: 15px;
    color: #333;
    li {
      margin-bottom: 15px;
      .el-card {
        height: 100%;
        border-color: $grayColor;
        border-radius: 12px;
      }
      .left-box {
        width: 122px;
        background-color: #ededed;
      }
      .logo {
        flex: 0 0 auto;
        width: 60px;
        height: 60px;
        mix-blend-mode: multiply;
      }
      .box {
        flex: 1 1 100px;
        padding: 20px;
        overflow: hidden;
      }
      .name {
        display: block;
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 26px;
        color: #606060;
        // @include ellipsis;
        &:hover {
          color: $mainColor;
        }
      }
      p {
        font-size: 12px;
        color: #a5a5a5;
        line-height: 20px;
        transition: all .3s;
        @include ellipsis;
      }
    }
  }
}
@media only screen and (max-width:1199px){
  .service-container {
    padding-bottom: 70px;
    .service-list{
      margin-top: 20px;
      li {
        .left-box {
          width: 110px;
        }
      }
    }
  }
}
@media only screen and (max-width:991px){
  .service-container {
    padding-bottom: 50px;
    .service-list{
      margin-top: 10px;
      li {
        margin-bottom: 15px;
        .left-box {
          width: 90px;
        }
        .logo {
          width: 55px;
          height: 55px;
        }
        .box {
          padding: 16px;
        }
      }
    }
  }
}
@media only screen and (max-width:767px){
  .service-container {
    padding-bottom: 30px;
    .service-list {
      margin-top: 0;
      li {
        margin-bottom: 12px;
        .left-box {
          width: 100%;
          padding: 15px;
        }
        .logo {
          width: 50px;
          height: 50px;
        }
        .name {
          margin-bottom: 6px;
          font-size: 14px;
          line-height: 22px;
        }
      }
    }
  }
}
</style>
