<template>
  <div class="tool-container">
    <div class="container">
      <!-- title -->
      <div class="title">
        <h4>工具导航</h4>
        <p>TOOL NAVIGATION</p>
      </div>
      <!-- 展示 -->
      <div class="tool-list">
        <ul class="flex flex-wrap" :gutter="22">
          <li v-for="item in toolList" :key="item.id">
            <a class="block" :href="item.url" target="_blank">
              <el-image class="logo" :src="item.logo" fit="contain" alt="" />
              <span class="name">{{ item.title }}</span>
            </a>
          </li>
        </ul>
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
      toolList: [
        {
          id: 1,
          title: '单位换算',
          logo: require('img/tool_logo_1.png'),
          url: 'https://cn.unithelper.com/'
        },
        {
          id: 2,
          title: '全球海关数据',
          logo: require('img/tool_logo_2.png'),
          url: 'https://comtradeplus.un.org/'
        },
        {
          id: 3,
          title: '世界时间',
          logo: require('img/tool_logo_3.png'),
          url: 'https://time.24436.com/'
        },
        {
          id: 4,
          title: '国际区号',
          logo: require('img/tool_logo_4.png'),
          url: 'http://www.customs.gov.cn/eportal/ui?pageId=1894998&tableName=zfs_table_gbdq'
        },
        {
          id: 5,
          title: 'PayPal手续费',
          logo: require('img/tool_logo_5.png'),
          url: 'https://www.salecalc.com/paypal'
        },
        {
          id: 6,
          title: '邮编查询',
          logo: require('img/tool_logo_6.png'),
          url: 'https://www.nowmsg.com/'
        },
        {
          id: 7,
          title: '货币符号查询',
          logo: require('img/tool_logo_7.png'),
          url: 'https://www.iamwawa.cn/huobi.html'
        },
        {
          id: 8,
          title: '英文大小写转换',
          logo: require('img/tool_logo_8.png'),
          url: 'https://www.m123.com/tools/toggleCase'
        },
        {
          id: 9,
          title: '在线全球时间换算',
          logo: require('img/tool_logo_9.png'),
          url: 'https://www.m123.com/tools/timeGlobal'
        },
        {
          id: 10,
          title: '汇率换算器',
          logo: require('img/tool_logo_10.png'),
          url: 'https://chl.cn/?huansuan'
        },
        {
          id: 11,
          title: '卖家精灵计算器',
          logo: require('img/tool_logo_11.png'),
          url: 'https://www.sellersprite.com/v2/tools/fba-calculator'
        },
        {
          id: 12,
          title: 'CHATGPT指令大全',
          logo: require('img/tool_logo_12.png'),
          url: 'https://www.salecalc.com/paypal'
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
.flex {
  display: flex;
}
.title {
  position: relative;
  margin: 0 auto;
  line-height: 24px;
  color: $blackColor;
  user-select: none;
  h4 {
    display: inline-block;
    margin-bottom: 5px;
    // border: 2px solid transparent;
    line-height: 38px;
    font-size: 32px;
    border-radius: 22px;
  }
  p {
    font-size: 14px;
    line-height: 20px;
    font-weight: 300;
  }
}

.tool-container {
  padding: 30px 0 12px;
  .tool-list {
    margin: 20px auto 8px;
    li {
      margin-bottom: 12px;
      margin-right: 16px;
      padding: 6px 16px;
      border: 1px solid $grayBg;
      transition: all .3s;
      .logo {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .name {
        vertical-align: middle;
      }
      a:hover {
        color: $mainColor;
      }
      &:hover {
        border-color: $mainColor;
      }
    }
  }
}
@media only screen and (max-width:1199px){
  .title {
    h4 {
      font-size: 28px;
    }
  }
}
@media only screen and (max-width:991px){
  .title {
    h4 {
      // margin-bottom: 8px;
      line-height: 30px;
      font-size: 24px;
    }
    p {
      font-size: 12px;
    }
  }
}
@media only screen and (max-width:767px){
  .title {
    h4 {
      margin-bottom: 0;
      line-height: 24px;
      font-size: 18px;
    }
  }
  .tool-container {
    .tool-list {
      li {
        margin-right: 12px;
        padding: 6px 12px 6px 6px;
        .logo {
          width: 30px;
          height: 30px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
