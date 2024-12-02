<template>
  <div class="banner-container">
    <swiper ref="mySwiper" class="swiper" :options="swiperOptions">
      <swiper-slide v-for="item of lists" :key="item.id">
        <el-link v-if="item.targetUrl" :underline="false" :href="item.targetUrl" target="_blank" class="block">
          <img class="banner" :src="item.url">
        </el-link>
        <img v-else class="banner" :src="item.url">
      </swiper-slide>
    </swiper>
    <!-- 分页器 -->
    <div class="swiper-pagination" />
    <div class="swiper-button-prev"><i class="el-icon-back" /></div>
    <div class="swiper-button-next">
      <i class="el-icon-right" />
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { getHomeBanner } from '@/api/global'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  // 定义属性
  data() {
    return {
      lists: [],
      filters: {
        page: 1,
        limit: 4
      },
      swiperOptions: {
        autoplay: {
          delay: 5000
        },
        slidesPerView: 1,
        effect: 'fade',
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    this.swiper.slideTo(1, 100, false)
    this.getList()
  },
  // 方法集合
  methods: {
    getList() {
      getHomeBanner().then(res => {
        this.lists = res.page.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.block {
  display: block;
}
.banner-container {
  position: relative;
  // box-shadow: 0 3px 8px rgba($color: #000000, $alpha: .24) inset;
  .banner {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
  ::v-deep {
    .swiper-pagination-bullet-active{
      --swiper-pagination-color: #024f87;
    }
    .swiper-pagination-bullet{
      opacity: 1;
      width: 20px;
      height: 20px;
      margin: 0 4px;
    }
  }
  .swiper-pagination {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 36px;
    text-align: center;
  }
  .swiper-button-prev,
  .swiper-button-next {
    --swiper-navigation-size: 80px;
    --swiper-navigation-color: #969696;
    width: 80px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border-radius: 40px;
    font-size: 40px;
    background-color: rgba(255,255,255,0.6);
    transition: color .3s, background-color .3s;
    &::after {
      content: '';
    }
    &:hover {
      background-color: $mainColor;
      color: #fff;
    }
  }
  .swiper-button-prev {
    left: 40px;
  }
  .swiper-button-next {
    right: 40px;
  }
}
.swiper {
  // height: 480px;
  width: 100%;
}
@media only screen and (max-width:1199px){
  .banner-container {
    ::v-deep {
      .swiper-pagination-bullet{
        width: 16px;
        height: 16px;
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
      --swiper-navigation-size: 60px;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border-radius: 30px;
      font-size: 32px;
    }
    .swiper-button-prev {
      left: 30px;
    }
    .swiper-button-next {
      right: 30px;
    }
  }
}
@media only screen and (max-width:991px){
  .banner-container {
    ::v-deep {
      .swiper-pagination-bullet{
        width: 12px;
        height: 12px;
        margin: 0 3px;
      }
    }
    .swiper-pagination {
      bottom: 16px;
    }
    .swiper-button-prev,
    .swiper-button-next {
      --swiper-navigation-size: 48px;
      width: 48px;
      height: 48px;
      text-align: center;
      line-height: 48px;
      font-size: 24px;
    }
  }
}
@media only screen and (max-width:767px){
  .banner-container {
    ::v-deep {
      .swiper-pagination-bullet{
        width: 8px;
        height: 8px;
        margin: 0 2px;
      }
    }
    .swiper-pagination {
      bottom: 10px;
    }
    .swiper-button-prev,
    .swiper-button-next {
      --swiper-navigation-size: 36px;
      width: 36px;
      height: 36px;
      line-height: 36px;
      font-size: 18px;
    }
    .swiper-button-prev {
      left: 24px;
    }
    .swiper-button-next {
      right: 24px;
    }
  }
}
</style>
