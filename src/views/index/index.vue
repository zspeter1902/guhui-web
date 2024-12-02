<template>
  <div class="dashboard-container">
    <!-- 碎片之banner -->
    <banner-content />
    <!-- slide -->
    <service-list>
      <index-title slot="title" name="入驻指引" sub-name="SETTLEMENT GUIDE" :icon="require('img/icon_reg.png')" />
    </service-list>
    <!-- 要点 -->
    <points>
      <index-title slot="title" name="平台服务" sub-name="PLATFORM SERVICE" :icon="require('img/icon_platform.png')" />
    </points>
    <!-- 基础服务 -->
    <!-- <latest-service></latest-service> -->
    <!-- 人气推荐 -->
    <!-- <recommend>
      <index-title slot="title" name="人气推荐" sub-name="RECOMMEND" />
    </recommend> -->
    <div class="concat">
      <!-- 新闻 -->
      <news>
        <!-- title -->
        <index-title slot="title" name="最新资讯" sub-name="NEWS" />
        <!-- more -->
        <more slot="more" to="/news" />
      </news>
    </div>

    <!-- 电商平台 -->
    <!-- <enterprise> -->
      <!-- title -->
      <!-- <index-title slot="title" name="电商平台" sub-name="E-COMMERCE PLATFORM" /> -->
      <!-- more -->
      <!-- <more slot="more" to="/" /> -->
    <!-- </enterprise> -->

    <!-- 金融服务 -->
    <!-- <service-financial> -->
      <!-- title -->
      <!-- <index-title slot="title" theme="blue" name="金融服务" sub-name="FINANCIAL SERVICES" /> -->
      <!-- more -->
      <!-- <more slot="more" to="/" /> -->
    <!-- </service-financial> -->
    <!-- 物流服务 -->
    <!-- <service-logistics> -->
      <!-- title -->
      <!-- <index-title slot="title" theme="blue" name="物流服务" sub-name="LOGISTICS SERVICE" /> -->
      <!-- more -->
      <!-- <more slot="more" to="/" /> -->
    <!-- </service-logistics> -->

    <partner>
      <index-title slot="title" name="合作平台" sub-name="JOINT VENTURE" />
    </partner>
    <!-- 工具导航 -->
    <tool-nav />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BannerContent from './components/BannerContent'
import Points from './components/Points'
import LatestService from './components/LatestService'
import Recommend from './components/Recommend'
import News from './components/News'
import Partner from './components/Partner'
import Enterprise from './components/Enterprise.vue'
import ServiceFinancial from './components/ServiceFinancial.vue'
import ServiceLogistics from './components/ServiceLogistics.vue'
import ServiceList from './components/ServiceList.vue'
import More from './components/More.vue'
import IndexTitle from './components/Title.vue'
// 引入tool-nav.vue
import ToolNav from './components/ToolNav.vue'

export default {
  name: 'Index',
  components: { BannerContent, Points, LatestService, Recommend, Enterprise, ServiceFinancial, ServiceLogistics, News, Partner, ServiceList, More, IndexTitle, ToolNav },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.concat {
  margin-bottom: 40px;
}

@media only screen and (max-width:1199px){
  .concat {
    margin-bottom: 30px;
  }
}
@media only screen and (max-width:991px){
  .concat {
    margin-bottom: 20px;
    ::v-deep {
      .recommend-container {
        padding: 0;
        border: none;
        margin-top: 40px;
      }
    }
  }
}
@media only screen and (max-width:767px){
  .concat {
    margin-bottom: 15px;
    ::v-deep {
      .recommend-container {
        margin-top: 30px;
      }
    }
  }
}
</style>
