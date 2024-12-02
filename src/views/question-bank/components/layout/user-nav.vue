<template>
  <div class="user-nav">
    <swiper :options="swiperOptions">
      <swiper-slide v-for="(nav, index) in navList" :key="index">
        <router-link :to="nav.url" class="link">
          <img :src="nav.icon" class="icon">
          <div class="name">{{ nav.name }}</div>
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  // 定义属性
  data() {
    return {
      navList: [
        {
          icon: require('../../image/icon_1.png'),
          name: '错题重做',
          url: './mistalks-exam/'
        },
        {
          icon: require('../../image/icon_2.png'),
          name: '我的收藏',
          url: '/exam-mycollection/'
        },
        {
          icon: require('../../image/icon_3.png'),
          name: '做题记录',
          url: '/exam-record/'
        },
        {
          icon: require('../../image/icon_4.png'),
          name: '我的笔记',
          url: '/topic-my-notes/'
        }
      ],
      swiperOptions: {
        slidesPerView: 4, // 显示的数量
        spaceBetween: 0,
        pagination: { // 分页
          el: '.swiper-pagination',
          clickable: true,
          renderBullet(index, className) { // 自定义分页的按钮
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  }
}
</script>

<style lang="scss" scoped>
.user-nav {
  margin: 15px;
  padding: 24px 0px 14px;
  background-color: #fff;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
    box-shadow: -2px 2px 15px -2px rgba(0,0,0,0.04);
}
.user-nav .link {
  display: block;
  margin: 0 auto;
  text-align: center;
}
.user-nav .icon {
  width: 48px;
  height: 48px;
  object-fit: cover;
}
.user-nav .name {
  margin-top: 8px;
  font-size: 12px;
  color: #333;
}
.user-nav .link:hover,
.user-nav .link:focus {
  opacity: 0.8;
}
</style>
