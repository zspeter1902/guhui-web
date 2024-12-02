<template>
  <div class="service-container">
    <!-- banner -->
    <banner :banner="banner" />
    <div class="container">
      <breadcrumb />
      <article class="detail">
        <div class="article-header text-center">
          <h4 class="article-title">{{ article.title }}</h4>
          <el-row type="flex" align="middle" justify="center" class="flex-wrap other">
            <span>发布时间：{{ article.updateTime }}</span>
            <span>来源：{{ article.createBy }}</span>
          </el-row>
        </div>
        <!-- 简介 -->
        <div class="article-content" v-html="article.synopsis" />
        <!-- 详情 -->
        <div class="article-content" v-html="article.info" />
        <!-- <div class="article-footer"></div> -->
      </article>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Banner from '@/components/Banner'
import { getProductDetail } from '@/api/company'
export default {
  name: 'ServiceNeedDetail',
  components: { Banner, Breadcrumb },
  data() {
    return {
      title: '需求详情',
      banner: require('img/service-banner.png'),
      article: {}
    }
  },
  computed: {
    id({ $route }) {
      return $route.params.id
    }
  },
  created() {
    const id = this.$route.params.id
    this.getInfo(id)
  },
  methods: {
    getInfo(id) {
      const ip = returnCitySN['cip']
      getProductDetail(id, ip).then(res => {
        this.article = res.supplyDemand
        this.setTitle(res.supplyDemand.title)
      })
    },
    setTitle(title) {
      this.$route.meta.title = title
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
@import "~@/styles/mixin";
.detail {
  padding: 20px 0 40px;
  .article-header {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #ddd;
  }
  .article-title {
    font-size: 24px;
    line-height: 32px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .other {
    color: #999;
    line-height: 24px;
    span {
      margin: 0 20px;
    }
  }
  .article-content {
    font-size: 16px;
    line-height: 36px;
    text-indent: 2em;
    text-align: justify;
    ::v-deep {
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
  }
}
@media only screen and (max-width: 1199px) {
  .detail {
    padding: 18px 0 36px;
  }
}
@media only screen and (max-width: 991px) {
  .detail {
    padding: 15px 0 30px;
  }
}
@media only screen and (max-width: 767px) {
  .detail {
    padding: 10px 0 20px;
    .article-header {
      margin-bottom: 15px;
      padding-bottom: 15px;
    }
    .article-title {
      font-size: 20px;
      line-height: 30px;
      margin-bottom: 15px;
    }
    .other {
      span {
        margin: 0 10px;
      }
    }
    .article-content {
      font-size: 14px;
      line-height: 34px;
    }
  }
}
</style>
