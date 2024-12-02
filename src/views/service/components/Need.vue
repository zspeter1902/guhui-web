<template>
  <div class="need">
    <dl v-if="lists.length">
      <!-- <dt class="need-title">{{ title }}</dt> -->
      <dd v-for="item of lists" :key="item.id" class="need-item">
        <router-link class="need-link" :to="'/service/need-detail/' + item.id">{{ item.title }}</router-link>
      </dd>
    </dl>
    <p v-else class="tips text-center">暂无需求，敬请期待！</p>
  </div>
</template>

<script>
import { getProductList } from '@/api/company'

export default {
  props: {
    parent: {
      type: String,
      required: true
    },
    current: {
      type: String,
      required: true
    }
  },
  // 定义属性
  data() {
    return {
      title: '需求推荐',
      active: 0,
      page: {
        page: 1,
        limit: 6
      },
      lists: []
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getNeed()
  },
  // 方法集合
  methods: {
    getNeed(item) {
      getProductList({
        type: '2',
        state: '1',
        ...this.page,
        categoryP: this.parent,
        categoryC: this.current,
        cancelHttp: true
      }).then(res => {
        this.lists = res.page.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixin';
.need {
  margin-bottom: 30px;
  padding: 10px 20px 20px;
  // border: 1px solid #e5e5e5;
  // border-top: 2px solid $mainColor;
  background-color: #fff;
}
// .need-title {
//   margin-bottom: 10px;
//   font-size: 18px;
//   color: $mainColor;
//   line-height: 38px;
//   font-weight: bold;
// }
.need-link {
  position: relative;
  font-size: 14px;
  line-height: 24px;
  transition: .3s ease;
  @include ellipsis;
  &:hover {
    color: $mainColor;
  }
}
.need-item {
  margin-bottom: 10px;
}
.tips {
  margin-top: 10px;
  font-size: 14px;
  color: $grayColor;
}
</style>
