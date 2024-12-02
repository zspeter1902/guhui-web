<template>
  <div class="enterprise-container">
    <div class="container">
      <!-- title -->
      <slot name="title" />
      <!-- 展示 -->
      <div class="enterprise-list">
        <el-row type="flex" justify="space-around" align="middle" class="flex-wrap" tag="ul" :gutter="22">
          <el-col v-for="item in enterpriseList" :key="item.id" tag="li" :sm="6" :xs="12">
            <router-link class="block" to="/">
              <el-image class="logo" :src="item.logo" fit="contain" :alt="item.title" />
            </router-link>
          </el-col>
        </el-row>
      </div>
      <!-- more -->
      <slot name="more" />
    </div>
  </div>
</template>

<script>
export default {
  // 定义属性
  data() {
    return {
      enterpriseList: [
        {
          id: 1,
          title: '',
          logo: require('img/platform_logo_1.png')
        },
        {
          id: 2,
          title: '',
          logo: require('img/platform_logo_2.png')
        },
        {
          id: 3,
          title: '',
          logo: require('img/platform_logo_3.png')
        },
        {
          id: 4,
          title: '',
          logo: require('img/platform_logo_4.png')
        },
        {
          id: 5,
          title: '',
          logo: require('img/platform_logo_5.png')
        },
        {
          id: 6,
          title: '',
          logo: require('img/platform_logo_6.png')
        },
        {
          id: 7,
          title: '',
          logo: require('img/platform_logo_7.png')
        },
        {
          id: 8,
          title: '',
          logo: require('img/platform_logo_8.png')
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
.enterprise-container {
  padding: 120px 0 110px;
  .enterprise-list {
    max-width: 970px;
    margin: 50px auto 8px;
    li {
      margin-bottom: 22px;
      a {
        padding: 10px;
        border: 1px solid $grayColor;
      }
      .logo {
        width: 100%;
        height: 100px;
        vertical-align: top;
      }
    }
  }
}
@media only screen and (max-width:1199px){
  .enterprise-container {
    padding: 90px 0 80px;
    .enterprise-list {
      margin-top: 40px;
    }
  }
}
@media only screen and (max-width:991px){
  .enterprise-container {
    padding: 60px 0 50px;
    .enterprise-list {
      margin-top: 30px;
      li {
        .logo {
          height: 80px;
        }
      }
    }
  }
}
@media only screen and (max-width:767px){
  .enterprise-container {
    padding: 30px 0 40px;
    .enterprise-list {
      margin-top: 20px;
      li {
        .logo {
          height: 60px;
        }
      }
    }
  }
}
</style>
