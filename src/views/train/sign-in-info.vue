<template>
  <div v-loading="loading" class="container">
    <div class="article-header">
      <div class="article-title ellipsis">{{ info.actName }}</div>
      <div class="flex ai-center jc-between">
        <div class="total">企业报名统计：<span class="num font-bold">{{ total }} </span>家</div>
      </div>
    </div>
    <!-- 列表 -->
    <ul class="lists">
      <li v-for="item of lists" :key="item.id">
        <el-row type="flex" justify="space-between" class="info flex-auto">
          <h5 class="name">{{ item.contactName }}-<span>{{ item.signCompanyName }}</span></h5>
          <p class="date flex-fixed">{{ filterYMD(item.createTime) }}</p>
        </el-row>
      </li>
      <p v-if="!lists.length" class="tips text-center">暂无报名信息，敬请期待！</p>
    </ul>
    <pagination
      v-show="total > page.limit"
      :total="total"
      :page.sync="page.page"
      :limit.sync="page.limit"
      layout="prev, pager, next"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getSignUpInfo, getActivityDetail } from '@/api/content'
export default {
  name: 'TrainSignInInfo',
  components: { Pagination },
  data() {
    return {
      total: 0,
      loading: false,
      info: {},
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
    this.getDetail()
    this.getList()
  },
  methods: {
    filterYMD(date) {
      const time = new Date(date.replace(/-/g, '/'))
      const y = time.getFullYear()
      const m = time.getMonth() + 1
      const d = time.getDate()
      return y + '-' + m + '-' + d
    },
    getDetail() {
      getActivityDetail(this.id).then(res => {
        this.info = res.exercise
      })
    },
    getList() {
      // const loading = this.$loading({
      //   text: '加载中...'
      // })
      if (!this.id) return
      this.loading = true
      getSignUpInfo({
        actId: this.id,
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
@import '~@/styles/mixin';

.container {
  min-height: 300px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.total {
  font-size: 20px;
  line-height: 36px;
  .num {
    color: $mainColor;
  }
}
.article-header {
  margin-bottom: 20px;
}
.article-title {
  margin-bottom: 5px;
  font-size: 28px;
  line-height: 48px;
  font-weight: bold;
}
.tips {
  padding: 20px 20px 20px;
  font-size: 14px;
  color: $grayColor;
}
.lists {
  li {
    // line-height: 36px;
    background-color: #fff;
    & + li {
      margin-top: 20px;
    }
  }
  .info {
    font-size: 18px;
    line-height: 32px;
    overflow: hidden;
    .name {
      font-size: 18px;
      line-height: 32px;
      @include ellipsis;
      span {
        // font-weight: bold;
        color: $mainColor;
      }
    }
  }
  .date {
    margin-left: 20px;
    color: #666;
    transition: all .3s ease;
  }
}
@media only screen and (max-width:991px){
  .container {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .lists {
    .info {
      font-size: 16px;
      line-height: 28px;
      .name {
        font-size: 16px;
        line-height: 28px;
      }
    }
  }
}

</style>
