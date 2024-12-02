<template>
  <div class="search-select">
    <el-row type="flex" class="select-tab flex-wrap">
      <h5 class="select-title flex-fixed">所在国家地区</h5>
      <el-tabs v-model="activeCountryName" class="flex-auto" @tab-click="handleClickCountry">
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane v-for="(item, index) of tabCountry" :key="item.id" :label="item.name" :name="'tab' + (index + 1)">
          <el-radio-group v-model="radio" size="small" :text-color="variables.menuColor" :fill="variables.helpColor" @change="changeCountry">
            <el-radio-button v-for="info of item.child" :key="info.id" :label="info.id">{{ info.name }}</el-radio-button>
          </el-radio-group>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- <el-row type="flex" class="select-tab flex-wrap">
      <h5 class="select-title flex-fixed">配套服务</h5>
      <el-tabs v-model="activeServiceName" class="flex-auto" @tab-click="handleClickService">
        <el-tab-pane label="全部" name="all" />
        <el-tab-pane v-for="(item, index) of tabService" :key="item.id" :label="item.name" :name="'tab' + (index + 1)">
          <el-checkbox-group v-model="checkbox" size="small" :text-color="variables.menuColor" :fill="variables.helpColor" @change="changeService">
            <el-checkbox-button v-for="info of item.child" :key="info.id" :label="info.id">{{ info.name }}</el-checkbox-button>
          </el-checkbox-group>
        </el-tab-pane>
      </el-tabs>
    </el-row> -->
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
export default {
  // 定义属性
  data() {
    return {
      activeCountryName: 'all',
      radio: '',
      activeServiceName: 'all',
      checkbox: [],
      tabCountry: [
        {
          id: 1,
          name: '热门',
          child: [
            {
              id: 11,
              name: '美国'
            },
            {
              id: 12,
              name: '德国'
            },
            {
              id: 13,
              name: '加拿大'
            },
            {
              id: 14,
              name: '英国'
            },
            {
              id: 15,
              name: '泰国'
            },
            {
              id: 16,
              name: '西班牙'
            },
            {
              id: 17,
              name: '印度'
            },
            {
              id: 18,
              name: '葡萄牙'
            }
          ]
        },
        {
          id: 2,
          name: '亚洲',
          child: [
            {
              id: 21,
              name: '蒙古'
            }
          ]
        },
        {
          id: 3,
          name: '欧洲',
          child: [
            {
              id: 31,
              name: '芬兰'
            }
          ]
        },
        {
          id: 4,
          name: '大洋洲',
          child: [
            {
              id: 41,
              name: '澳大利亚'
            }
          ]
        },
        {
          id: 5,
          name: '北美洲',
          child: [
            {
              id: 51,
              name: '美国'
            }
          ]
        },
        {
          id: 6,
          name: '南美洲',
          child: [
            {
              id: 61,
              name: '哥伦比亚'
            }
          ]
        }
      ],
      tabService: [
        {
          id: 1,
          name: '海关物流服务',
          child: [
            {
              id: 11,
              name: '头程运输'
            },
            {
              id: 12,
              name: '报送服务'
            },
            {
              id: 13,
              name: '清关服务'
            },
            {
              id: 14,
              name: '尾程配送'
            }
          ]
        },
        {
          id: 2,
          name: '金融保险服务',
          child: [
            {
              id: 21,
              name: '帐期'
            },
            {
              id: 22,
              name: '保险'
            },
            {
              id: 23,
              name: '商品质押'
            }
          ]
        }
      ]
    }
  },
  computed: {
    variables() {
      return variables
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  // 方法集合
  methods: {
    handleClickCountry(tab, event) {
      // if (tab.name === 'all') {

      // } else {

      // }
    },
    handleClickService(tab, event) {

    },
    changeCountry(label) {
      console.log(label)
    },
    changeService(label) {
      console.log(label)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.search-select {
  padding: 34px 24px 20px;
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: #fff;
  .select-tab {
    margin-bottom: 20px;
  }
  .select-title {
    width: 100px;
    font-size: 14px;
    line-height: 50px;
  }
  ::v-deep {
    .el-tabs {
      width: 100%;
      padding: 0 20px;
      background-color: #fff;
    }
    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        padding-left: 15px;
    }
    .el-tabs--top .el-tabs__item.is-top:last-child {
        padding-right: 15px;
    }
    .el-tabs__nav-wrap::after {
      display: block;
      background-color: #f5f5f5;
    }
    .el-tabs__active-bar {
      background-color: $mainColor;
    }
    .el-tabs__item {
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      font-size: 14px;
    }

    .el-tabs__header {
      margin-bottom: 10px;
    }
    .el-radio-button, .el-checkbox-button {
      margin-right: 15px;
      // margin-bottom: 5px;
    }
    .el-radio-button__inner, .el-checkbox-button__inner {
      // min-width: 120px;
      border: none;
      background-color: transparent;
    }
    .el-checkbox-button--small .el-checkbox-button__inner,
    .el-radio-button--small .el-radio-button__inner {
      font-size: 14px;
      border-radius: 2px;
    }
  }
}
@media only screen and (max-width:1199px){
  .search-select {
    padding: 30px 24px 20px;
    .select-title {
      line-height: 48px;
    }
    ::v-deep {
      .el-tabs__item {
        height: 48px;
        line-height: 48px;
      }

      .el-tabs__header {
        margin-bottom: 8px;
      }
    }
  }
}
@media only screen and (max-width:991px){
  .search-select {
    padding: 24px 20px 15px;
    .select-title {
      line-height: 46px;
    }
    .select-tab {
      margin-bottom: 15px;
    }
    ::v-deep {
      .el-tabs__item {
        height: 46px;
        line-height: 46px;
      }

      .el-tabs__header {
        margin-bottom: 6px;
      }
    }
  }
}
@media only screen and (max-width:767px){
  .search-select {
    padding: 15px 15px;
    margin-bottom: 10px;
    .select-tab {
      margin-bottom: 10px;
    }
    .select-title {
      width: 100%;
      line-height: 42px;
    }
    ::v-deep {
      .el-tabs {
        padding: 0 0px;
      }
      .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
          padding-left: 10px;
      }
      .el-tabs--top .el-tabs__item.is-top:last-child {
          padding-right: 10px;
      }
      .el-tabs__item {
        height: 42px;
        line-height: 42px;
        padding: 0 10px;
      }

      .el-tabs__header {
        margin-bottom: 5px;
      }
      .el-radio-button, .el-checkbox-button {
        margin-right: 10px;
      }
    }
  }
}
</style>
