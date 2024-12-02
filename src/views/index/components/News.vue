<template>
  <div class="container new-container">
    <slot name="title" />
    <el-row type="flex" class="news-box flex-wrap">
      <div class="flex-fixed swiper-box hidden-xs-only hidden-sm-only">
        <swiper ref="mySwiper" class="swiper flex-fixed" :options="swiperOptions">
          <swiper-slide v-for="item of lists" :key="item.id">
            <img class="thumb" :src="item.imgUrl">
            <div class="info">
              <el-link :underline="false" class="name" :href="item.contentUrl" target="_blank">{{ item.title }}</el-link>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-button-prev" />
        <div class="swiper-button-next" />
      </div>
      <div class="flex-auto ov-h">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) of tabs" :key="item.id" :label="item.dictName" :name="'tab' + index">
            <keep-alive>
              <news-tap parent="cross_news" :current="item.dictCode" />
            </keep-alive>
          </el-tab-pane>
        </el-tabs>
      </div>

    </el-row>
    <slot name="more" />
  </div>

</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { getDictListFilter } from '@/api/global'
import NewsTap from './NewsTap.vue'
import { getNewsList } from '@/api/content'
export default {
  components: {
    NewsTap,
    Swiper,
    SwiperSlide
  },
  // 定义属性
  data() {
    return {
      activeName: 'tab0',
      tabs: [
      ],
      swiperOptions: {
        autoplay: {
          delay: 6000
        },
        slidesPerView: 1,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      lists: []
    }
  },
  // 方法集合
  beforeMount() {
    this.getTabs()
    this.getList()
  },
  methods: {
    getTabs() {
      //  cross_news news
      getDictListFilter({ dictParentCode: 'news' }).then(res => {
        if (res.data.length) {
          this.tabs = res.data
        }
      })
    },
    getList() {
      getNewsList({
        page: 1,
        limit: 6,
        type: 'industry',
        cancelHttp: true
      }).then(res => {
        this.lists = res.page.list
      })
    },
    handleClick() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixin';
.new-container {
  margin-top: 20px;
}
.news-box {
  margin-top: 40px;
  margin-bottom: 40px;
}
.swiper-container {
  width: 400px;
}
.info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba($color: $blackColor, $alpha: .8);
}
.info .name {
  padding: 5px 16px;
  color: #fff;
  line-height: 24px;
  @include ellipsis;
  &:hover {
    color: $helpColor;
  }
}
.thumb {
  width: 400px;
  height: 300px;
  object-fit: cover;
}
.swiper-box {
  position: relative;
  margin-right: 20px;
  .swiper-button-prev,
  .swiper-button-next {
    --swiper-navigation-size: 36px;
  }
  .swiper-button-prev {
    left: 10px;
  }
  .swiper-button-next {
    right: 10px;
  }
}
::v-deep {
  .el-tabs__header {
    background-color: $mainColor;
  }
  .el-tabs__item {
    min-width: 100px;
    height: 42px;
    font-size: 16px;
    line-height: 42px;
    text-align: center;
    letter-spacing: 2px;
    color: #fff;
    &.is-active {
      color: #000;
      background-color: $helpColor;
    }
  }
  .el-tabs__nav-wrap {
    max-width: 1200px;
    width: 92%;
    margin-left: auto;
    margin-right: auto;
  }
}
@media only screen and (max-width:1399px){
}
@media only screen and (max-width:1199px){
  ::v-deep {
  }
}
@media only screen and (max-width:991px){
  .news-box {
    margin-top: 30px;
    margin-bottom: 30px;
  }
  ::v-deep {
    .el-tabs__item {
      min-width: 116px;
      height: 42px;
      line-height: 42px;
    }
  }
}
@media only screen and (max-width:767px){
  .news-box {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  ::v-deep {
    .el-tabs__item {
      min-width: 70px;
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>
