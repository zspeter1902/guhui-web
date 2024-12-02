<template>
  <div class="footer-container">
    <div class="container">
      <el-tabs v-model="activeName">
        <!-- <el-tab-pane label="监管单位" name="tab0">
          <el-row type="flex" tag="ul" :gutter="20" class="list flex-wrap">
            <el-col v-for="news of list" :key="news.id" :sm="12" :md="8" :lg="6" tag="li">
              <el-link :underline="false" :href="news.link" target="_blank">
                <h5>{{ news.title }}</h5>
              </el-link>
            </el-col>
          </el-row>
        </el-tab-pane> -->
        <el-tab-pane label="联系我们" name="tab1">
          <el-row type="flex" class="footer-contact flex-wrap">
            <div class="footer-contact-left">
              <p>电话：0551-66856580</p>
              <p>邮箱：ahceisc@ahceisc.com</p>
              <p>地址：安徽省合肥市蜀山区经济开发区沁源路667号跨境电商监管区7号楼</p>
            </div>
            <div class="footer-contact-right text-center">
              <el-image class="qrcode" :src="qrCode" fit="contain" />
              <h6>公众号</h6>
            </div>
            <div class="footer-contact-right text-center">
              <el-image class="qrcode" :src="code" fit="contain" />
              <h6>小程序</h6>
            </div>

          </el-row>

        </el-tab-pane>
        <el-tab-pane label="平台声明" name="tab2">
          <div class="desc">
            <!-- 本网站“下载服务”版块中所载的材料和信息 -->
            本网站所载的材料和信息，均源自第三方企业提供。安徽省跨境电商创新服务中心公共服务平台对此等材料和信息的准确性、完整性、充分性和可靠性不做评判，并且声明不对此等材料和信息的错误或遗漏承担任何法律责任，也无法对此等材料和信息作出任何明示或默示的担保，不构成对这些产品、服务的认可或推荐。
            <!-- 所载的企业按企业中文名称首字拼音排序，排名不分先后。 -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="友情链接" name="tab3">
          <div class="desc">
            <el-row type="flex" tag="ul" :gutter="20" class="list flex-wrap">
              <el-col v-for="news of list" :key="news.id" :sm="12" :md="8" :lg="6" tag="li">
                <el-link :underline="false" :href="news.link" target="_blank">
                  <h5>{{ news.title }}</h5>
                </el-link>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- <h5 class="title">友情链接</h5>
      <el-row type="flex" tag="ul" :gutter="20" class="list flex-wrap">
        <el-col v-for="news of list" :key="news.id" :sm="12" :md="8" :lg="6" tag="li">
          <el-link :underline="false" :href="news.link" target="_blank">
            <h5>{{ news.title }}</h5>
          </el-link>
        </el-col>
      </el-row> -->
      <div class="copyright text-center">
        <p>Copyright © {{ currentYear }} Anhui Cross Service Ecological Technology Co., Ltd 安徽省跨服生态科技有限公司
        </p>
        <p>
          <a target="_blank" rel="noopener norefferrer nofollow" href="https://beian.miit.gov.cn/">皖ICP备2022015170号-1</a>
          <el-image class="icon" :src="icon" fit="contain" />
          <a target="_blank" rel="noopener norefferrer nofollow" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34010402703712">皖公网安备 34010402703712号</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 定义属性
  data() {
    return {
      icon: require('img/beian.png'),
      activeName: 'tab1',
      list: [
        // {
        //   id: 1,
        //   title: '安徽省商务厅',
        //   link: 'http://commerce.ah.gov.cn'
        // }
      ],
      qrCode: require('img/qrcode.jpg'),
      code: require('img/code.jpg')
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear() || 2022
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixin';
.footer-container {
  padding: 20px 0;
  // box-shadow: 0 -15px 30px rgba($color: #000000, $alpha: .1);
  background-color: #333;
  .el-tabs {
    margin-top: 10px;
  }
  ::v-deep {
    .el-tabs__nav-wrap::after {
      display: block;
      height: 1px;
      background-color: #555;
    }
    .el-tabs__item {
      width: 120px;
      padding: 0;
      font-size: 16px;
      outline: none !important;
      user-select: none;
      box-shadow: none !important;
      color: #666;
      text-align: center;
      &:hover,
      &.is-active {
        color: #fff;
      }
    }
    .el-tabs__active-bar {
      height: 1px;
      background-color: #e0e3e6;
    }
    .el-tabs__header {
      margin-bottom: 20px;
    }
  }
  .title {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #fff;
  }
  .footer-contact {
    color: $grayColor;
    font-size: 14px;
    line-height: 36px;
    &-left {
      width: 30%;
      min-width: 240px;
      margin-right: 30px;
    }
    &-right {
      margin: 0 10px;
      h6 {
        margin: 0;
      }
      .qrcode {
        width: 120px;
        height: 120px;
      }
      .el-image {
        vertical-align: top;
      }
    }
  }
  .desc {
    line-height: 28px;
    color: #999;
    text-indent: 2em;
  }
  .copyright {
    margin-top: 20px;
    padding: 10px;
    line-height: 28px;
    border-top: 1px dashed #666; //ccc
    color: #666;
    p {
      margin-top: 10px;
    }
    .icon {
      position: relative;
      top: -1px;
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
    a {
      margin: 0 15px;
      &:hover {
        color: $mainColor;
      }
    }
  }
}
.list {
  li {
    margin-bottom: 4px;
    line-height: 36px;
  }
  a {
    display: block;
    overflow: hidden;
    color: #999;
    h5 {
      font-size: 14px;
    }
    &:hover {
      color: $mainColor;
      h5 {
        &::before {
          background-color: $mainColor;
        }
      }
    }
  }
}
@media only screen and (max-width:767px){
  .list li {
    width: auto;
  }
  .copyright .icon {
    display: block;
    margin: 0 auto;
  }
}

</style>
