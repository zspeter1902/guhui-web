<template>
  <div class="point-container">
    <div class="container">
      <slot name="title" />
      <el-tabs v-model="activeName" :tab-position="isMobile ? 'top' : 'left'" class="platform-tabs">
        <template v-for="(item, index) of navList">
          <el-tab-pane v-if="handleImg(item.dictName)" :key="item.id" :name="'tab' + index">
            <div slot="label" class="custom-label"><el-image class="icon" :src="handleIcon(item.dictName)" fit="contain" /><span>{{ item.dictName }}</span></div>
            <router-link :to="handleRoute(item.dictCode)">
              <el-image class="img" :src="handleImg(item.dictName)" :alt="item.dictName" fit="cover" />
            </router-link>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
  </div>
</template>

<script>
const reg = new RegExp('introduce$')
export default {
  // 定义属性
  data() {
    return {
      activeName: 'tab0',
      filter: 'introduce',
      imgs: [
        {
          name: '电商平台',
          icon: require('img/icon_base_service_1.png'),
          img: require('img/base_service_1.png')
        },
        {
          name: '国际物流',
          icon: require('img/icon_base_service_2.png'),
          img: require('img/base_service_2.png')
        },
        {
          name: '跨境结算',
          icon: require('img/icon_base_service_3.png'),
          img: require('img/base_service_3.png')
        },
        {
          name: '税务服务',
          icon: require('img/icon_base_service_4.png'),
          img: require('img/base_service_4.png')
        },
        {
          name: '统计分析',
          icon: require('img/icon_base_service_5.png'),
          img: require('img/base_service_5.png')
        },
        {
          name: '跨境金融',
          icon: require('img/icon_base_service_6.png'),
          img: require('img/base_service_6.png')
        },
        {
          name: '跨境通关',
          icon: require('img/icon_base_service_7.png'),
          img: ''
        }
      ]
    }
  },
  computed: {
    isMobile({ $store }) {
      return $store.getters.device === 'mobile'
    },
    navList({ $store }) {
      const list = $store.getters.navList.filter(item => reg.test(item.dictCode))
      return list[0].children
    }
  },
  // 方法集合
  methods: {
    handleIcon(name) {
      const arr = this.imgs.filter(item => item.name === name)
      return arr.length ? arr[0].icon : ''
    },
    handleImg(name) {
      const arr = this.imgs.filter(item => item.name === name)
      return arr.length ? arr[0].img : ''
    },
    handleRoute(code) {
      const route = this.parseData(code)
      return `/introduce/${route}`
    },
    parseData(code) {
      const arr = code.split('_')
      return arr.length ? arr[arr.length - 1] : ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.point-container {
  padding-top: 60px;
  padding-bottom: 60px;
  background: url('~img/index_platform_service.jpg') no-repeat center top / cover;
  ::v-deep {
    .el-tabs__item {
      height: 48px;
      padding: 0 10px;
      line-height: 48px;
      margin-top: 8px;
      margin-bottom: 8px;
    }
  }
  .platform-tabs {
    margin-top: 30px;
  }
  .custom-label {
    padding: 0 24px;
    border: 1px solid $blackColor;
    text-align: center;
    font-size: 20px;
    border-radius: 34px;
    font-weight: 300;
    &:hover {
      background-color: #5eaaff;
      border-color: #5eaaff;
      color: #fff;
      .icon {
        filter: invert(100%);
      }
    }
  }
  .is-active {
    .custom-label {
      color: #fff;
      border-color: #5eaaff;
      background-color: #5eaaff;
      .icon {
        filter: invert(100%);
      }
    }
  }
  .icon {
    position: relative;
    top: -2px;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .img {
    max-width: 1200px;
    width: 100%;
  }
}
@media only screen and (max-width:1199px){
  .point-container {
    padding-top: 40px;
    padding-bottom: 40px;
    ::v-deep {
      .el-tabs__item {
        height: 40px;
        line-height: 40px;
      }
    }
    .platform-tabs {
      margin-top: 24px;
    }
    .custom-label {
      padding: 0 24px;
      font-size: 18px;
    }
    .icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }
}
@media only screen and (max-width:991px){
  .point-container {
    padding-top: 30px;
    padding-bottom: 30px;
    ::v-deep {
      .el-tabs__item {
        height: 32px;
        line-height: 32px;
      }
    }
    .platform-tabs {
      margin-top: 24px;
    }
    .custom-label {
      padding: 0 18px;
      font-size: 16px;
    }
    .icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }
}
@media only screen and (max-width:767px){
  .point-container {
    padding-top: 30px;
    padding-bottom: 40px;
  }
}
</style>
