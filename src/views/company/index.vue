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
      <div class="intro">
        <h5 class="intro-title">
          <span>产品列表</span>
        </h5>
        <template v-for="item of lists">
          <card :key="item.id" :info="item" />
        </template>
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="page.page"
          :limit.sync="page.limit"
          layout="prev, pager, next"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Breadcrumb from '@/components/Breadcrumb'
import Banner from '@/components/Banner'
import Brief from './components/Brief.vue'
import Card from '@/views/service/components/Card.vue'
import { getCompanyInfo, getProductList } from '@/api/company'
import Axios from 'axios'
export default {
  name: 'CompanyDetail',
  components: { Banner, Breadcrumb, Pagination, Brief, Card },
  data() {
    return {
      banner: require('img/overseas-banner.jpg'),
      detail: {},
      total: 0,
      page: {
        page: 1,
        limit: 10
      },
      lists: []
    }
  },
  computed: {
    id({ $route }) {
      return $route.params.id
    }
  },
  created() {
    this.getInfo()
    this.getList()
  },
  methods: {
    setTitle(title) {
      this.$route.meta.title = title
    },
    getInfo() {
      const ip = returnCitySN['cip']
      // Axios('http://pv.sohu.com/cityjson?ie=utf-8')
      getCompanyInfo(this.id, ip).then(res => {
        this.detail = res.company
        this.setTitle(res.company.companyName)
      })
    },
    getList() {
      getProductList({
        page: this.page.page,
        limit: this.page.limit,
        type: '1',
        examine: '1',
        state: '1',
        companyId: this.id
      }).then(res => {
        this.total = res.page.totalCount
        this.lists = res.page.list
      })
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
  ::v-deep {
    .card {
      margin-bottom: 20px;
      border: 1px solid #e5e5e5;
    }
  }
}
.intro {
  padding-bottom: 30px;
  font-size: 16px;
  line-height: 36px;

  text-align: justify;
  &-title {
    margin-bottom: 20px;
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
  .service-container {
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
  .service-container {
    .brief {
      margin-bottom: 30px;
    }
  }
  .article-content {
    padding-bottom: 35px;
  }
}
@media only screen and (max-width: 767px) {
  .service-container {
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
