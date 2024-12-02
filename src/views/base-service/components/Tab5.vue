<template>
  <div class="tab-content">
    <div class="custom-tabs">
      <el-link :underline="false" :class="{active: active == 0}" @click="active = 0">跨境金融</el-link>
      <el-link :underline="false" :class="{active: active == 1}" @click="active = 1">融资渠道</el-link>
      <el-link :underline="false" :class="{active: active == 2}" @click="active = 2">融资方案</el-link>
      <el-link :underline="false" :class="{active: active == 3}" @click="active = 3">境外银行</el-link>
    </div>
    <transition name="fade">
      <!-- 专利 -->
      <div v-if="active == 0" class="custom-tab-content">
        <p>跨境金融泛指P2P网络以及电商提供的诸如互联网信贷、供应链金融、预售订单融资、跨界合作金融、中间业务、货币汇兑、账户预存款、支付工具、移动支付等金融业务。跨境电商融资随着经济的快速发展，我国电商企业对资金的需求越来越大。那么跨境电商企业融资的模式是什么？</p>
        <p>政府补助、银行贷款等传统资金来源已不能满足企业的资金需求。跨境融资企业要想更快更好地发展，迫切需要找到更多更便捷的融资渠道。</p>
        <p>融资的目的是使公司更好地调整盈余和亏损，并在不同用户之间整合所收购的资产。也就是说，融资实际上是公司筹款的行为。融资一般而言指的是货币资金的流通，即公司按照一定方法在金融市场上募集资金的全部过程。简而言之，跨境融资实际上是每个国家需要资金的主体以某种方式在全世界寻求跨境资金的过程。</p>
      </div>
      <div v-if="active == 1" class="custom-tab-content">
        <p>1、企业国际股票融资。</p>
        <p>2、在其他国家发行国际债券。</p>
        <p>3、吸收外国直接投资。</p>
        <p>4、国际银行贷款。</p>
        <p>5、贸易融资。目前比较流行的贸易融资方式主要有担保支付代理、出口信贷、票据发行等。</p>
      </div>
      <div v-if="active == 2" class="custom-tab-content">
        <p>在我跨境电商企业主要的贷款方案有如下几种：</p>
        <p>一、申请银行系消费金融公司的流水贷：根据题主的个人与公司的流水、利润情况申请的个人流水贷款。</p>
        <p>二、电商贷：电商信贷是指诸如阿里巴巴、苏宁等电子商务企业利用其自身电商平台优势直接向平台上的供应商和个人提供借贷的一种经济活动。电商贷主要申请的途径：1、电商公司：京东、阿里等 ；2、非银行金融机构的电商产品;3、银行系的电商贷，一般申请难度较大，要求比较高。</p>
      </div>
      <div v-if="active == 3" class="custom-tab-content">
        <p>出征海外电商市场并不是想象的容易，除了运营好电商市场之外，还要解决电商付款难的问题，特别是在资金支付、难以付款等方面吃亏的企业，浪费了时间，还可能会面临着违约的风险。</p>
        <p>面对这种情况要如何解决呢？还有什么更好的解决方案吗？肯定有，那就是海外银行账户，刚刚好可以帮助跨境电商解决付款难题。毕竟资金交易的流动是跨境电商市场极为重要的一部分。为何跨境电商需要有一个海外银行账户呢？</p>
        <p>一是考虑到跨境电商的业务肯定是来自世界各地的，对资金的到账速度肯定是有一定需求的，牵动着电商们的资金流动，海外银行账户的拥有，更加提高了国际汇款、跨境转账等资金到账的效率。</p>
        <p>二是现在海外银行开户也简单，远程视频或电话的形式国内见证开户是最便利的服务，不仅拥有专业的银行服务，更是可以通过网上银行24小时对境外账户进行管理和操作。</p>
      </div>
    </transition>
    <div class="custom-tab-content">


      <!-- <p v-for="item of lists" :key="item.id">{{ item.name }}</p> -->
    </div>
    <div class="text-center">
      <router-link class="more el-button el-button--primary" to="/service/financing">查看相关产品</router-link>
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
      name: '跨境金融',
      active: 0,
      lists: [
        {
          id: 1,
          name: '中国建设银行',
          about: '',
          companyUrl: ''
        },
        {
          id: 2,
          name: '中国工商银行',
          about: '',
          companyUrl: ''
        },
        {
          id: 3,
          name: '中国农业银行',
          about: '',
          companyUrl: ''
        },
        {
          id: 4,
          name: '中国交通银行',
          about: '',
          companyUrl: ''
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
    if (this.code === this.type) {
      this.getList()
    }
  },
  methods: {
    getList() {
      getPlatformList({
        serviceType: this.type,
        cancelHttp: true
      }).then(res => {
        if (res.data.length) {
          this.lists = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
.tab-content {
  min-height: 300px;
  font-size: 16px;
  line-height: 36px;
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
    padding: 20px 16px 16px;
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 140px;
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
