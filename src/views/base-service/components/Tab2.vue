<template>
  <div v-loading="loading" class="tab-content">
    <div class="custom-tabs">
      <el-link :underline="false" :class="{active: active == 0}" @click="active = 0">主流平台</el-link>
      <el-link :underline="false" :class="{active: active == 1}" @click="active = 1">B2B平台</el-link>
      <el-link :underline="false" :class="{active: active == 2}" @click="active = 2">独立站</el-link>
    </div>
    <transition name="fade">
      <div v-if="active == 0" class="custom-tab-content">
        <p>简单理解，我们通过海外的购物平台，购买了一系列商品，这种行为就是跨境电商，跨境电商是指不同国境地域的交易主体之间，以电子商务的方式达成交易(在线订购、支付结算，并通过跨境物流递送商品，清关，最终送达，完成交易的一种国际商业活动。）而跨境电商平台就是为用户提供交易环境的承载体!</p>
        <p>随着近几年跨境电商的逐渐火热，跨境电商也成了家喻户晓的热门新兴行业，跨境电商平台也如雨后春笋一般争相开放，那么目前为止主流的跨境电商有哪些呢？</p>
        <el-row type="flex" tag="ul" class="flex-wrap">
          <el-col class="list" :span="24" tag="li">
            <h4>B2C跨境电商平台:</h4>
          </el-col>
          <el-col v-for="item of b2cList" :key="item.name" :sm="12" :md="8" tag="li" class="list">
            <div class="box">
              <el-image class="thumb" :src="item.thumb" fit="contain" :alt="item.name" />
              <p class="intro">{{ item.intro }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="active == 1" class="custom-tab-content">
        <p>B2B(Business ToBusiness)是企业与企业之间通过互联网进行产品、服务及信息的交换。从广义层面来看，跨境电商B2B指互联网化的企业对企业跨境贸易活动，也即“互联网+传统国际贸易”。从狭义层面来看，跨境电商B2B 指基于电子商务信息平台或交易平台的企业对企业跨境贸易活动。我们平时谈论的跨境电商B2B，一般都是使用这个狭义概念。</p>
        <el-row type="flex" tag="ul" class="flex-wrap">
          <el-col v-for="item of b2bList" :key="item.name" :span="24" tag="li" class="list">
            <el-row type="flex" class="box flex-wrap" :gutter="30">
              <el-col :md="8">
                <el-image class="thumb" :src="item.thumb" fit="contain" :alt="item.name" />
              </el-col>
              <el-col :md="16">
                <p class="intro indent">{{ item.intro }}</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div v-if="active == 2" class="custom-tab-content">
        <p>独立站是指基于SaaS技术平台建立的拥有独立域名，内容、数据、权益私有，具备独立经营主权和经营主体责任，由社会化云计算能力支撑，并可以自主、自由对接第三方软件工具、宣传推广媒体与渠道的新型官网（网站）是一个独立的网站，具有独立域名、服务器、程序的电商平台。简单来说就是建立自己独立的网站商店进行运营销售，可以和用户直接交易。</p>
        <p><br></p>
        <el-row type="flex" tag="ul" class="flex-wrap" :gutter="20">
          <el-col v-for="item of otherList" :key="item.name" :span="12" tag="li" class="list no-padding">
            <el-row type="flex" class="box flex-wrap" :gutter="10">
              <el-col :md="8">
                <el-image class="thumb" :src="item.thumb" :alt="item.name" fit="contain" />
              </el-col>
              <el-col :md="16">
                <p class="intro">{{ item.intro }}</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </transition>
    <div class="text-center">
      <router-link class="more el-button el-button--primary" to="/service/platformin">查看相关产品</router-link>
    </div>
  </div>
</template>

<script>
import { getPlatformList } from '@/api/company'
export default {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: '电商平台',
      active: 0,
      lists: [],
      loading: false,
      b2cList: [
        {
          name: '亚马逊',
          thumb: require('img/platform_logo_4.png'),
          intro: '3亿活跃付费账户，遍布全球的超过175个电商运营中心！'
        },
        {
          name: 'ebay',
          thumb: require('img/platform_logo_3.png'),
          intro: '老牌线上拍卖及购物平台，创立于1995年，业务覆盖全球29个国家。'
        },
        {
          name: 'AliExpress',
          thumb: require('img/platform_logo_8.png'),
          intro: '一个卖家账号可售卖全球230多个国家和地区。'
        },
        {
          name: 'Lazala',
          thumb: require('img/platform_logo_5.png'),
          intro: '东南亚排名前列的电商平台，业务覆盖6个东南亚国家。'
        },
        {
          name: 'Wish',
          thumb: require('img/logo8.jpg'),
          intro: '北美及欧洲知名移动电商平台，是成立于硅谷的高科技独角兽公司。'
        },
        {
          name: 'TikTok',
          thumb: require('img/platform_logo_9.jpg'),
          intro: '一款可以拍短视频的音乐创意短视频社交软件！'
        }
      ],
      b2bList: [
        {
          name: 'Alibaba',
          thumb: require('img/platform_logo_7.png'),
          intro: '全球最大的基于互联网的国际贸易供求交换市场。它提供来自178个国家（地区）和迅速发展的商界的最新商机信息。用户可以实时获得来自全球各行各业的商机、产品展示、信用管理等贸易服务。32个行业有700多个产品分类商机。'
        },
        {
          name: 'Made In China',
          thumb: require('img/platform_logo_10.jpg'),
          intro: '中国制造，为世界而造。全链路保障，一站式服务，助您强势出海！是一个中国产品信息荟萃的网上世界，面向全球提供国产品的电子商务服务，旨在利用互联网将中国制造的产品介绍给全球采购商。'
        }
      ],
      otherList: [
        {
          name: 'Shopify',
          thumb: require('img/platform_logo_11.jpg'),
          intro: '全球著名的电商类SaaS平台，赋能175个国家的60多万家中小商户。'
        },
        {
          name: 'Facebook',
          thumb: require('img/platform_logo_12.png'),
          intro: '打造真正全球业务, Facebook海外营销助您精准连接20亿真实用户。'
        },
        {
          name: 'SHOPLINE',
          thumb: require('img/platform_logo_13.png'),
          intro: 'SHOPLINE，专业的全球智慧建站SaaS平台。'
        },
        {
          name: 'Google',
          thumb: require('img/platform_logo_14.png'),
          intro: '谷歌跨地域跨平台的强大覆盖，助您赢得全球消费者的每时每刻！'
        },
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
    if (this.code === this.type) {
      this.getList()
    }
  },
  methods: {
    getList() {
      this.loading = true
      getPlatformList({
        serviceType: this.type,
        cancelHttp: true
      }).then(res => {
        this.lists = res.data
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
.tab-content {
  min-height: 300px;
  font-size: 14px;
  line-height: 28px;
  p {
    margin-top: 10px;
    text-indent: 2em;
    .el-link {
      text-indent: 0;
    }
  }
  .custom-tabs {
    background-color: $infoColor;
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
    margin-top: 25px;
    padding: 0 16px 50px;
  }
  .list {
    margin-top: 20px;
    padding: 0 40px;
    &.no-padding {
      padding: 0;
    }
  }
  .box {
    .thumb {
      width: 100%;
      height: 92px;
      padding: 10px;
      border: 1px solid $helpColor;
    }
    .intro {
      padding: 0 10px;
      text-indent: 0;
      margin-top: 2px;
      line-height: 24px;
      &.indent {
        text-indent: 2em;
      }
    }
  }
  h4 {
    display: inline-block;
    font-size: 18px;
    line-height: 40px;
    border-bottom: 1px solid #000;
  }
}
@media only screen and (max-width: 1199px) {
  .tab-content {
    .list {
      padding: 0 30px;
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
    .custom-tab-content {
      padding-bottom: 30px;
    }
    .list {
      padding: 0 20px;
    }
  }
}
@media only screen and (max-width: 767px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 100px;
        font-size: 14px;
        line-height: 32px;
      }
    }
    .custom-tab-content {
      padding-bottom: 20px;
    }
    .list {
      margin-top: 15px;
      padding: 0 15px;
    }
    .box {
      .thumb {
        height: 72px;
      }
    }
  }
}
</style>
