<template>
  <div class="service-container">
    <!-- banner -->
    <banner :banner="banner" />
    <!-- 导航 -->
    <service-nav @nav="onSelectTapFirst" />
    <!-- layout -->
    <div class="container">
      <el-row :gutter="30" class="flex-wrap">
        <el-col :md="6" :sm="24">
          <!-- 侧边 导航 -->
          <el-tabs v-model="activeName">
            <el-tab-pane label="服务产品" name="first" />
            <el-tab-pane label="服务机构" name="second" />
          </el-tabs>
          <sidebar @tap="onSelectTap" />
          <!-- 需求 -->
        </el-col>
        <el-col :md="18" :sm="24" class="overseas">
          <div v-loading="loading">
            <el-tabs v-model="activeName">
              <el-tab-pane label="产品" name="first">
                <!-- 列表 -->
                <z-filter v-show="isLogistics" @start="selectStart" @end="selectEnd" />
                <z-filter-product v-show="isProduct" @select="selectType" />
                <div class="lists" :class="{'no-bg': !!lists.length}">
                  <card v-for="item of lists" :key="item.id" :info="item" />
                  <p v-if="!lists.length" class="tips text-center">暂无产品，敬请期待！</p>
                </div>
                <pagination
                  v-if="total>page.limit"
                  :total="total"
                  :page.sync="page.page"
                  :limit.sync="page.limit"
                  layout="prev, pager, next"
                  @pagination="getList"
                />
              </el-tab-pane>
              <el-tab-pane label="需求" name="second">
                <need :parent="page.categoryP" :current="page.categoryC" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Card from './components/Card.vue'
import ServiceNav from './components/Nav.vue'
import Banner from '@/components/Banner'
import Sidebar from './components/Sidebar.vue'
// import Need from './components/Need.vue'
import ZFilter from './components/FilterLogistics.vue'
import ZFilterProduct from './components/FilterProduct.vue'
import { getProductList } from '@/api/company'
export default {
  name: 'Service',
  components: { ServiceNav, Card, Banner, Pagination, Sidebar, Need: () => import('./components/Need.vue'), ZFilter, ZFilterProduct },
  data() {
    return {
      banner: require('img/service-banner.png'),
      total: 3,
      activeName: 'first',
      loading: false,
      page: {
        page: 1,
        limit: 10,
        origin: '',
        destination: '',
        keyword: '',
        categoryP: '',
        categoryC: ''
      },
      lists: [],
      parentId: null,
      parentName: '',
      currentId: null
    }
  },
  computed: {
    isLogistics({ parentName }) {
      return parentName.includes('物流')
    },
    isProduct({ parentName }) {
      return parentName.includes('电商')
    }
  },
  methods: {
    onSelectTapFirst(item) {
      this.parentId = item.dictCode
      this.page.categoryP = item.dictCode
      this.parentName = item.dictName
    },
    onSelectTap(item) {
      this.currentId = item
      this.page.categoryC = item
      if (!this.isLogistics) {
        this.$set(this.page, 'origin', '')
        this.$set(this.page, 'destination', '')
      }
      this.$nextTick(() => {
        this.getList()
      })
    },
    selectStart(val) {
      this.$set(this.page, 'origin', val)
      this.$nextTick(() => {
        this.getList()
      })
    },
    selectEnd(val) {
      this.$set(this.page, 'destination', val)
      this.$nextTick(() => {
        this.getList()
      })
    },
    selectType(val) {
      this.$set(this.page, 'keyword', val)
      this.$nextTick(() => {
        this.getList()
      })
    },
    getList() {
      // const loading = this.$loading({
      //   text: '加载中...'
      // })
      this.loading = true
      getProductList({
        type: '1',
        state: '1',
        ...this.page
      }).then(res => {
        this.total = res.page.totalCount
        this.lists = res.page.list
        // loading.close()
        setTimeout(() => {
          this.loading = false
        }, 300)
      }).catch(() => {
        // loading.close()
        console.log('产品列表错误')
        setTimeout(() => {
          this.loading = false
        }, 300)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';

.service-container {
  background-color: #f8f8f8;
  overflow: hidden;
  ::v-deep {
    .el-tabs__header {
      margin-bottom: 6px;
      padding: 6px 0;
      background-color: #fff;
    }
    .el-tabs__nav-wrap {
      max-width: 1200px;
      width: 92%;
      margin: 0 auto -1px;
    }
    .el-tabs__item {
      height: 30px;
      line-height: 30px;
      text-shadow: 0.2px 0.2px $menuText;
      &.is-active {
        text-shadow: 0.2px 0.2px $mainColor;
      }
    }
  }
  .overseas {
    min-height: 300px;
    ::v-deep {
      .el-tabs__header {
        display: none;
      }
    }
  }
  .container {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  .card {
    margin-bottom: 20px;
  }
  .lists:not(.no-bg) {
    background-color: #fff;
  }
  .tips {
    padding: 20px 20px 20px;
    font-size: 14px;
    color: $grayColor;
  }
}
@media only screen and (max-width:1199px){
}
@media only screen and (max-width:991px){
}
@media only screen and (max-width:767px){
  .service-container {
    .card-hover {
      margin-bottom: 15px;
    }
  }
}
</style>
