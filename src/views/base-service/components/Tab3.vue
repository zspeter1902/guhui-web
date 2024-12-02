<template>
  <div class="tab-content">
    <div class="custom-tabs">
      <el-link :underline="false" class="active">国际物流</el-link>
    </div>
    <div class="custom-tab-content">
      <el-row v-for="item of lists" :key="item.name" type="flex" :gutter="50" class="list flex-wrap">
        <el-col :md="7" :lg="5">
          <div class="tab-content-title text-center">
            <el-image class="icon" :src="item.icon" fit="contain" />
            <h2 :class="{line: item.about}">{{ item.name }}</h2>
            <p v-if="item.about" class="about">{{ item.about }}</p>
          </div>
        </el-col>
        <el-col :md="17" :lg="19">
          <div v-if="item.types" class="types">
            <el-tag
              v-for="(tag, index) of item.types"
              :key="index"
              effect="dark"
            >
              {{ tag }}
            </el-tag>
          </div>
          <div v-if="item.desc" class="desc">
            <p v-for="(desc, di) of item.desc" :key="di">{{ desc }}</p>
          </div>
          <div v-if="item.thumb">
            <el-image :src="item.thumb" fit="cover" />
          </div>
        </el-col>
      </el-row>
      <div class="text-center">
        <router-link class="more el-button el-button--primary" to="/service/international">查看相关产品</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import { getPlatformList } from '@/api/company'
export default {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: '国际物流',
      active: 0,
      lists: [
        {
          name: '物流专线',
          icon: require('img/icon_logistics_1.png'),
          types: ['北美专线', '欧洲专线', '日韩专线', '东南亚专线'],
          desc: ['跨境物流是指把商品从一个国家运送至另外一个国家或地区，需要经过国内运输，双清报关，目的国内运输最终配送至买家。']
        },
        {
          name: 'FBA头程',
          icon: require('img/icon_logistics_2.png'),
          about: 'FBA是亚马逊提供仓储、配送、及退货处理等一条龙物流服务。',
          thumb: require('img/logistics.jpg')
        },
        {
          name: '物流小包',
          icon: require('img/icon_logistics_3.png'),
          types: ['邮政小包'],
          desc: ['重量在两千克以内，外包装长宽高之和小于90厘米，且最长边小于60厘米，通过邮政空邮服务寄往国外的小邮包，可以称为国际小包。']
        },
        {
          name: '海外仓',
          icon: require('img/icon_logistics_4.png'),
          types: ['美国仓', '欧洲仓', '日韩仓', '东南亚仓'],
          desc: ['海外仓是指建立在海外的仓储设施。跨境电商企业按照一般贸易方式，将商品批量出口到境外仓库，电商平台完成销售后，再将商品送达境外的消费者。']
        },
        {
          name: '国际快递',
          icon: require('img/icon_logistics_5.png'),
          types: ['国际快递'],
          desc: ['国际快递是指在两个或两个以上国家（或地区）之间所进行的快递、物流业务。跨国之间的包裹、文件等之间的快递物流业务,国际快件到达目的国之后在进行转运派送。国际快递包括了DHL国际快递、FedEx国际快递、UPS国际快递、TNT国际快递等国际快递公司。', '该物流模式依托于统一的信息化平台操作，其显著性的优点在于：货物运输时间较短，能够向消费者提供实时的物流信息，货物在运输过程中的丢包率较低。']
        }
      ]
    }
  },
  computed: {
    type({ $route }) {
      return $route.params.type
    }
  },
  watch: {
    type(newVal) {
      if (newVal === this.code && !this.lists.length) {
        this.getList()
      }
    }
  },
  created() {
    // if (this.code === this.type) {
    //   this.getList()
    // }
  },
  methods: {
    getList() {
      // getPlatformList({
      //   serviceType: this.type,
      //   cancelHttp: true
      // }).then(res => {
      //   this.lists = res.data
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
.tab-content {
  min-height: 300px;
  font-size: 16px;
  line-height: 32px;
  ::v-deep {
    p {
      margin-top: 10px;
      text-indent: 2em;
      .el-link {
        text-indent: 0;
      }
    }
  }
  .custom-tabs {
    background-color: $grayBg;
    border-bottom: 2px solid $mainColor;
    .el-link {
      width: 160px;
      padding: 0 20px;
      line-height: 40px;
      color: #333;
      font-size: 16px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      &.active {
        background-color: $mainColor;
        color: #fff;
      }
    }
  }
  .custom-tab-content {
    padding: 20px 16px 16px;
  }
  .list {
    margin-top: 30px;
    .types {
      margin-left: 90px;
    }
    .el-tag--dark {
      height: 40px;
      padding: 0 20px;
      margin-right: 20px;
      background-color: $mainColor;
      border-color: $mainColor;
      color: #fff;
      line-height: 38px;
      font-size: 18px;
      border-radius: 20px;
    }
    .desc {
      padding: 30px 0;
      border-bottom: 1px solid #000;
    }
  }
  .tab-content-title {
    position: relative;
    padding: 30px 25px;
    height: 100%;
    color: #fff;
    background-color: #6097ea;
    .icon {
      margin-bottom: 6px;
      vertical-align: top;
    }
    h2 {
      margin-bottom: 15px;
      font-size: 18px;
      line-height: 42px;
      &.line {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 48px;
          height: 3px;
          background-color: #fff;
          transform: translateX(-50%);
        }
      }
    }
    .about {
      font-size: 14px;
      line-height: 24px;
      text-indent: 2em;
      text-align: justify;
    }
    &::after {
      content: '';
      position: absolute;
      left: 100%;
      top: 30px;
      width: 0;
      height: 0;
      border-left: 20px solid #6097ea;
      border-right: 20px solid transparent;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
  }
}
@media only screen and (max-width: 1199px) {
  .tab-content {
    .list {
      margin-top: 20px;
      .types {
        margin-left: 0px;
      }
      .el-tag--dark {
        height: 32px;
        padding: 0 14px;
        margin-right: 16px;
        line-height: 30px;
        font-size: 16px;
      }
      .desc {
        padding: 20px 0;
      }
    }
    .tab-content-title {
      padding: 25px 20px;
    }
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 140px;
      }
    }
    .list {
      .el-tag--dark {
        height: 32px;
        padding: 0 14px;
        margin-right: 16px;
        margin-bottom: 16px;
        line-height: 30px;
        font-size: 16px;
      }
      .desc {
        padding: 20px 0;
      }
    }
    .tab-content-title {
      padding: 20px 15px;
      margin-bottom: 40px;
      height: auto;
      &::after {
        top: 99%;
        left: 50%;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-top: 18px solid #6097ea;
        border-bottom: 18px solid transparent;
        transform: translateX(-50%);
      }
    }
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 100px;
        font-size: 14px;
        line-height: 32px;
      }
    }
  }
}
</style>
