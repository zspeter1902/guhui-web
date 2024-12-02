<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :hide-on-single-page="currentPage == 1 && total <= limit"
      prev-text="«"
      next-text="»"
      :total="total"
      v-bind="$attrs"
      :pager-count="pagerCount"
      :small="mobile"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'
export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    // 'total, sizes, prev, pager, next, jumper'
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    },
    device({ $store }) {
      return $store.state.app.device
    },
    mobile({ device }) {
      return device === 'mobile'
    },
    pagerCount({ mobile }) {
      return mobile ? 4 : 7
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.pagination-container {
  padding: 20px 0;
  text-align: center;
  &.text-right {
    text-align: right;
  }
  ::v-deep {
    .el-pagination__total {
      font-size: 14px !important;
      line-height: 40px;
      color: rgba(0, 0, 0, 0.45);
    }
    .el-pagination__sizes {
      .el-input {
        .el-input__inner {
          font-size: 14px;
          height: 40px;
          color: rgba(0, 0, 0, 0.65);
          border-color: rgba(0, 0, 0, 0.15);
        }
      }
    }
    .el-pagination {
      &.is-background {
        .el-pager {
          li {
            &:not(.disabled).active {
              background-color: $mainColor;
              border-color: $mainColor;
              color: #fff;
            }
          }
        }
        .btn-next, .btn-prev, .el-pager li{
          padding: 0 5px;
          min-width: 40px;
          margin: 0 5px;
          height: 40px;
          line-height: 38px;
          font-size: 12px;
          border: 1px solid rgba(0,0,0,0.15);
          background-color: #fff;
          color: #333;
          font-weight: normal;
          transition: all 0.3s;
          &:hover, &:focus{
            color: $mainColor;
            border-color: $mainColor;
          }
          &:disabled {
            color: #d9d9d9;
            border-color: #d9d9d9;
          }
        }
        .btn-next, .btn-prev {
          font-size: 0;
        }
      }

      .el-select {
        .el-input {
          .el-input__inner {
            border-radius: 2px;
          }
        }
      }
      span:not([class*=suffix]) {
        min-width: 48px;
        font-size: 18px;
        height: auto;
        color: rgba(0, 0, 0, 0.65);
        vertical-align: middle;
      }
      &--small {
        &.is-background {
          .btn-next, .btn-prev, .el-pager li{
            min-width: 28px;
            margin: 0 3px;
            height: 32px;
            line-height: 30px;
          }
        }
        span:not([class*=suffix]) {
          min-width: 20px;
        }
        .el-pagination__total,
        .el-pagination__sizes {
          display: none;
        }
      }
    }
  }
}
.pagination-container.hidden {
  display: none;
}
</style>
