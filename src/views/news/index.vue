<template>
  <div class="news-container">
    <!-- banner -->
    <banner :banner="banner" />
    <!-- 新闻分类 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) of tabs" :key="index" :label="item.dictName" :name="'tab' + index">
        <keep-alive>
          <!-- cross_news -->
          <tab-pane parent="news" :current="item.dictCode" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import Banner from '@/components/Banner'
import TabPane from './components/TabPane.vue'
import { getDictListFilter } from '@/api/global'
export default {
  name: 'News',
  components: { Banner, TabPane },
  data() {
    return {
      activeName: 'tab0',
      banner: require('img/news-banner.png'),
      tabs: [
        { dictName: '通知公告', dictCode: 'notice' },
        { dictName: '园区新闻', dictCode: 'industry' }

      ]
    }
  },
  created() {
    // this.getTabs()
  },
  methods: {
    getTabs() {
      // cross_news
      getDictListFilter({ dictParentCode: 'news' }).then(res => {
        if (res.data.length) {
          this.tabs = res.data
        }
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixin';
.news-container {
  background-color: #f8f8f8;
  ::v-deep {
    .el-tabs__header {
      padding: 6px 0;
      background-color: #fff;
    }
    .el-tabs__nav-wrap {
      max-width: 1200px;
      width: 92%;
      margin: 0 auto -1px;
    }
    .el-tabs__item {
      height: 50px;
      line-height: 50px;
    }
  }
}
@media only screen and (max-width:767px){
  .news-container {
    ::v-deep {
      .el-tabs__item {
        height: 40px;
        padding: 0 10px;
        line-height: 40px;
      }
    }
  }
}
</style>
