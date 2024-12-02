<template>
  <div v-loading="loading" class="container">
    <ul class="news-list">
      <el-row v-for="news of list" :key="news.id" type="flex" align="middle" justify="space-between" tag="li">
        <a class="flex-wrap" :href="news.contentUrl" target="_blank">
          <h5>{{ news.title }}</h5>
        </a>
        <span class="date">{{ parseTime(news.createTime) }}</span>
      </el-row>
    </ul>
  </div>
</template>

<script>
import { getNewsList } from '@/api/content'
import { parseTime } from '@/utils'
export default {
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
        limit: 6,
        key: '',
        // category: '',
        type: '',
        cancelHttp: true
      },
      list: [],
      cacheList: {}
    }
  },
  created() {
    // this.$set(this.query, 'category', this.parent)
    this.$set(this.query, 'type', this.current)
    this.getList()
  },
  methods: {
    parseTime(time) {
      return parseTime(new Date(time.replace(/-/g, '/')), '{y}-{m}-{d}')
    },
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
@import '~@/styles/mixin';
.news-list {
  list-style: disc;
  li {
    margin-bottom: 6px;
    line-height: 36px;
  }
  a {
    display: block;
    overflow: hidden;
    color: #666;
    h5 {
      font-size: 14px;
      @include ellipsis;
      &::before {
        content: '';
        position: relative;
        top: -1px;
        display: inline-block;
        width: 6px;
        height: 6px;
        margin-right: 10px;
        background-color: #999;
        border-radius: 3px;
        transition: all .3s;
      }
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
  .date {
    flex: 0 0 auto;
    margin-left: 10px;
    color: #a5a5a5;
  }
}
</style>
