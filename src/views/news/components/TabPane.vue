<template>
  <div v-loading="loading" class="container">
    <ul class="news-list">
      <li v-for="news of list" :key="news.id">
        <!-- <router-link class="flex-wrap" :to="'/news/detail/' + news.id"> -->
        <a class="flex-wrap" :href="news.contentUrl" target="_blank">
          <el-image v-if="news.imgUrl" class="thumb flex-fixed" :src="news.imgUrl" :alt="news.title" fit="cover" />
          <el-row type="flex" class="info flex-auto flex-column">
            <h5 class="name">{{ news.title }}</h5>
            <p class="desc">{{ news.digest }}</p>
          </el-row>
          <div class="time flex-fixed">
            <p class="date">{{ filterMD(news.createTime) }}</p>
            <p>{{ filterY(news.createTime) }}</p>
            <i class="el-icon-right hidden-xs-only" />
          </div>
        </a>
      </li>
    </ul>
    <pagination
      v-show="total>query.limit"
      :total="total"
      :page.sync="query.page"
      :limit.sync="query.limit"
      layout="prev, pager, next"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getNewsList } from '@/api/content'
export default {
  components: {
    Pagination
  },
  props: {
    parent: {
      type: String,
      default: ''
    },
    current: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      total: 0,
      loading: false,
      query: {
        page: 1,
        limit: 10,
        key: '',
        category: '',
        type: '',
        cancelHttp: true
      },
      list: [],
      cacheList: {}
    }
  },
  created() {
    this.$set(this.query, 'category', this.parent)
    this.$set(this.query, 'type', this.current)
    this.getList()
  },
  methods: {
    getList() {
      const data = Object.assign({}, this.query)
      const currentPageCache = this.cacheList[this.query.page]
      this.loading = true
      if (currentPageCache && currentPageCache.length) {
        this.list = currentPageCache
        this.loading = false
        return
      }
      getNewsList(data).then(res => {
        console.log(res)
        this.total = res.page.totalCount
        this.list = res.page.list
        this.$set(this.cacheList, this.query.page, res.page.list)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    filterY(date) {
      const time = new Date(date.replace(/-/g, '/'))
      return time.getFullYear()
    },
    filterMD(date) {
      const time = new Date(date.replace(/-/g, '/'))
      const m = time.getMonth() + 1
      const d = time.getDate()
      return m + '-' + d
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
.container {
  min-height: 300px;
  margin-top: 10px;
  margin-bottom: 30px;
}
.news-list {
  li {
    // line-height: 36px;
    background-color: #fff;
    & + li {
      margin-top: 30px;
    }
    a {
      display: flex;
      padding: 25px;
      justify-content: space-between;
      transition: all .3s ease;
      &:hover {
        box-shadow: 0 10px 30px rgba($color: #000000, $alpha: .06);
        .info, .time, .time .date {
          color: $mainColor;
        }
        .time i {
          border-color: $mainColor;
        }
      }
    }
  }
  .thumb {
    width: 300px;
    height: 170px;
  }
  .info {
    height: 142px;
    padding: 18px 70px 0 30px;
    overflow: hidden;
    .name {
      margin-bottom: 30px;
      font-size: 18px;
      line-height: 32px;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .desc {
      flex: 1;
      font-size: 14px;
      line-height: 28px;
      color: #666;
      overflow: hidden;
      &::before {
        content: '···';
        float: right;
        height: 100%;
        display: flex;
        align-items: flex-end;
        shape-outside: inset(calc(100% - 1.5em) 0 0);
      }
      &::after {
        content: '';
        position: absolute;
        width: 999vh;
        height: 999vh;
        background: #fff;
        box-shadow: -2em 2em #fff;
      }
    }
  }
  .time {
    padding-top: 18px;
    transition: all .3s ease;
    font-size: 18px;
    color: #999;
    line-height: 24px;
    font-weight: bold;
    .date {
      font-size: 32px;
      color: #666;
      line-height: 40px;
      margin-bottom: 5px;
      transition: all .3s ease;
    }
    i {
      width: 30px;
      height: 30px;
      margin-top: 25px;
      border: 1px solid #e5e5e5;
      font-size: 16px;
      line-height: 28px;
      text-align: center;
      border-radius: 15px;
      transition: all .3s ease;
    }
  }
}
@media only screen and (max-width:991px){
  .container {
    margin-top: 0px;
    margin-bottom: 20px;
  }
  .news-list {
    li {
      & + li {
        margin-top: 20px;
      }
      a {
        padding: 20px;
      }
    }
    .thumb {
      width: 240px;
      height: 136px;
    }
    .info {
      height: 114px;
      padding: 10px 40px 0 20px;
      .name {
        margin-bottom: 20px;
        font-size: 16px;
        line-height: 28px;
      }
    }
    .time {
      padding-top: 10px;
      font-size: 16px;
      .date {
        font-size: 24px;
      }
      i {
        margin-top: 20px;
      }
    }
  }
}
@media only screen and (max-width:767px){
  .news-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
    li {
      min-width: 240px;
      flex: 1 1 50%;
      padding: 0 8px 16px;
      background-color: transparent;
      & + li {
        margin-top: 0;
      }
      a {
        padding: 10px;
        background-color: #fff;
      }
    }
    .thumb {
      width: 100%;
      height: 120px;
    }
    .info {
      min-width: 100%;
      height: 108px;
      padding: 10px 0 0 0px;
      .name {
        margin-bottom: 10px;
      }
    }
    .time {
      width: 100%;
      display: flex;
      align-items: center;
      padding-top: 0px;
      font-size: 16px;
      color: #666;
      .date {
        margin: 0;
        font-size: 16px;
        order: 2;
        &::before {
          content: '-';
        }
      }
    }
  }
}
</style>
