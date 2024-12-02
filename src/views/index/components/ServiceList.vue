<template>
  <div class="reg-container">
    <slot name="title" />
    <!-- 服务功能 -->
    <div class="container">
      <el-row type="flex" justify="space-between" tag="ul" class="service-list text-center">
        <el-col v-for="(item, index) of lists" :key="index" tag="li" :xs="6" :sm="4" :md="3" :xl="4" class="box">
          <router-link to="/regist/index">
            <el-image class="icon" :src="item.icon" :alt="item.name" />
          </router-link>
          <!-- <el-link class="name" :underline="false">{{ item.name }}</el-link> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // 定义属性
  data() {
    return {
      name: '入驻指引',
      lists: [
        {
          name: '前置资质办理',
          icon: require('img/reg1.png'),
          iconHover: require('img/reg1_checked.png')
        },
        {
          name: '公服用户注册',
          icon: require('img/reg2.png'),
          iconHover: require('img/reg2_checked.png')
        },
        {
          name: '服务类型开通',
          icon: require('img/reg3.png'),
          iconHover: require('img/reg3_checked.png')
        }
      ]

    }
  },
  // 方法集合
  methods: {
    toServiceRouter(item) {
      this.$router.push({
        path: '/service/index',
        query: {
          id: item.menuId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.reg-container {
  margin-top: 40px;
  margin-bottom: 40px;
  background: url('~img/reg_bg.png') no-repeat center bottom / contain;
}
.service-list {
  position: relative;
  margin-top: 6.6666667%;
  li {
    position: relative;
    .name {
      font-size: 16px;
      color: $mainColor;
    }
    .icon {
      max-width: 192px;
      width: 100%;
      border-radius: 50%;
      background-color: #fff;
    }
  }
}

@media only screen and (max-width:1199px){
  .reg-container {
    margin-top: 30px;
    margin-bottom: 30px;
    background-size: 1680px auto
  }
  .service-list {
    li {
      .name {
        font-size: 14px;
      }
    }
  }
}
@media only screen and (max-width:991px){
  .reg-container {
    background-size: 1440px auto
  }
}
@media only screen and (max-width:767px){
  .reg-container {
    margin-top: 20px;
    margin-bottom: 20px;
    background-size: 960px auto
  }
}
</style>
