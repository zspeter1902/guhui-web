<template>
  <div class="service-container">
    <!-- banner -->
    <banner :banner="banner" :show="true" />
    <div class="container">
      <breadcrumb />
      <brief class="brief" :info="detail" />
    </div>
    <!-- 图片 -->
    <div class="container">
      <article>
        <div class="intro">
          <h5 class="intro-title">
            <span>详情介绍</span>
          </h5>
          <p class="intro-desc">{{ detail.synopsis }}</p>
        </div>
        <div class="article-content" v-html="detail.info" />
      </article>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Banner from '@/components/Banner'
import Brief from './components/Brief.vue'
import { getProductDetail } from '@/api/company'
export default {
  name: 'OverseasDetail',
  components: { Banner, Breadcrumb, Brief },
  data() {
    return {
      banner: require('img/service-banner.png'),
      detail: {}
    }
  },
  created() {
    const id = this.$route.params.id
    this.getDetail(id)
  },
  methods: {
    getDetail(id) {
      const ip = returnCitySN['cip']
      getProductDetail(id, ip).then(res => {
        this.detail = res.supplyDemand
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
.service-container {
  .brief {
    margin-top: 10px;
    margin-bottom: 50px;
  }
}
.intro {
  padding-bottom: 30px;
  font-size: 16px;
  line-height: 36px;

  text-align: justify;
  &-title {
    margin-bottom: 15px;
    font-size: 18px;
    color: $mainColor;
    line-height: 40px;
    border-bottom: 1px solid #e5e5e5;
    span {
      display: inline-block;
      border-bottom: 4px solid $mainColor;
    }
  }
  &-desc {
    text-indent: 2em;
  }
}
.article-content {
  padding-bottom: 60px;
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
@media only screen and (max-width: 1199px) {
  .overseas-container {
    .brief {
      margin-top: 5px;
      margin-bottom: 40px;
    }
  }
  .article-content {
    padding-bottom: 50px;
  }
}
@media only screen and (max-width: 991px) {
  .overseas-container {
    .brief {
      margin-bottom: 30px;
    }
  }
  .article-content {
    padding-bottom: 35px;
  }
}
@media only screen and (max-width: 767px) {
  .overseas-container {
    .brief {
      margin-top: 0px;
      margin-bottom: 20px;
    }
  }
  .article-content {
    padding-bottom: 20px;
  }
}
</style>
