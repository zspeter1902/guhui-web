<template>
  <div class="tab-content">
    <banner :banner="banner" />
    <div class="container">
      <!-- 搜索 -->
      <el-form ref="form" :model="formData" :rules="rules" class="search-form">
        <el-form-item prop="keyword">
          <el-input v-model="formData.keyword" placeholder="请输入搜索词" @keyup.enter.native="search('form')">
            <el-button slot="append" icon="el-icon-search" @click.prevent="search('form')" />
          </el-input>
        </el-form-item>
      </el-form>
      <!--  -->
      <!-- <div class="custom-tabs">
        <el-link v-for="(item, index) of types" :key="item.id" :underline="false" :class="{active: active == index}" @click="onSelect(index)">{{ item.dictName }}</el-link>
      </div> -->
      <transition name="fade">
        <!-- 名称、生成日期、摘要、图片、链接 -->
        <div class="custom-tab-content">
          <div v-for="item of lists" :key="item.id" class="list">
            <el-row type="flex" justify="space-between" align="top">
              <h4 class="name">
                <el-link
                  class="url"
                  :underline="false"
                  type="primary"
                  target="_blank"
                  :href="item.contentUrl"

                ><span v-html="highlightKeyword(item.title, formData.keyword)"></span></el-link>
              </h4>
              <el-tag type="warning">{{ typesMap[item.type] }}</el-tag>
            </el-row>
            <p class="date">{{ item.releaseTime }}</p>
            <!-- <p class="tag">{{ typesMap[item.type] }}</p> -->
          </div>
          <pagination
            :total="total"
            :page.sync="page.page"
            :limit.sync="page.limit"
            layout="prev, pager, next"
            @pagination="getList"
          />
        </div>

      </transition>
    </div>

  </div>
</template>

<script>
import Banner from '@/components/Banner'
import { getDictListFilter, getDictMap } from '@/api/global'
import { getNewsList } from '@/api/content'
export default {
  name: 'Law',
  components: {
    Pagination: () => import('@/components/Pagination'),
    Banner
  },
  data() {
    return {
      name: '法律服务',
      typesMap: {},
      banner: require('img/news-banner.png'),
      formData: {
        keyword: ''
      },
      rules: {},
      page: {
        page: 1,
        limit: 12
      },
      total: 0,
      lists: [],
    }
  },
  created() {
    // 获取分类
    this.getType()
    // 获取默认数据列表
    // this.getList()
  },
  methods: {
    onSelect(index) {
      this.active = index
      this.getList()
    },
    getType() {
      // getDictListFilter({
      //   dictParentCode: 'laws_file'
      // }).then(res => {
      //   this.types = res.data
      //   this.getList()
      // })
      getDictMap('laws_file').then(res => {
        this.typesMap = res.data
        console.info('请求列表数据')
        this.getList()
      })
    },
    getList() {
      // const type = this.types[this.active].dictCode
      const index = this.active + 1
      getNewsList({
        category: 'laws_file',
        // type: type,
        ...this['page']
      }).then(res => {
        this.$set(this, 'total', res.page.totalCount)
        this.$set(this, 'lists', res.page.list)
      })
    },
    search() {

    },
    // 高亮搜索关键词
    highlightKeyword(text, keyword) {
      if (!keyword) return text; // 如果没有关键词，直接返回原文本
      const regex = new RegExp(`(${keyword})`, 'gi'); // 创建不区分大小写的正则表达式
      return text.replace(regex, '<mark>$1</mark>'); // 用 <mark> 标签包裹高亮
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
$bg: #fff;
$dark_gray: #333;
$cursor: #283443;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .el-input input {
    color: $cursor;
  }
}
.tab-content {
  min-height: 100vh;
  font-size: 16px;
  line-height: 30px;
  .indent {
    padding-left: 2em;
  }
  .indent-1 {
    padding-left: 4em;
  }
  .name {
    font-size: 16px;
  }
  .thumb {
    height: 200px;
  }
  .desc {

  }
  .date {
    color: $grayColor;
  }
  .url {
    font-size: 16px;
    font-weight: bold;
  }
  // p {
  //   margin-top: 10px;
  //   text-indent: 2em;
  //   .el-link {
  //     text-indent: 0;
  //   }
  // }
  .custom-tabs {
    margin-top: 16px;
    background-color: $infoColor;
    border-bottom: 2px solid $mainColor;
    .el-link {
      width: 160px;
      padding: 0 20px;
      line-height: 40px;
      color: #333;
      font-size: 16px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      &.active {
        background-color: $mainColor;
        color: #fff;
      }
    }
  }
  .custom-tab-content {
    padding: 20px 16px 16px;
    .list {
      margin-bottom: 30px;
    }
  }
}
.el-tag {
  margin-left: 30px;
}
.search-form {
  width: 100%;
  margin: 30px auto 10px;
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-input {
    height: 50px;
    font-size: 16px;
    ::v-deep {
      .el-input__inner {
        -webkit-appearance: none;
        border-radius: 30px 0 0 30px;
        color: $dark_gray;
        padding: 0 42px;
        height: 50px;
        caret-color: $cursor;
        border-color: $helpColor;
        user-select: none;
        &::placeholder {
          color: $grayColor;
        }
        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }
  ::v-deep {
    .el-input-group__append {
      border: none;
      border-radius: 0 25px 25px 0;
      padding: 0 24px;
      color: #666;
      background-color: $helpColor;
    }
    .el-form-item__error {
      font-size: 16px;
      padding-top: 0;
      line-height: 50px;
      top: 0;
      right: 90px;
      left: auto;
      user-select: none;
    }
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 140px;
      }
    }
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 100px;
        font-size: 14px;
        line-height: 32px;
      }
    }
  }
}
</style>
