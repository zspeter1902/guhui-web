<template>
  <div class="history-container">
    <swiper ref="mySwiper" class="swiper" :options="swiperOptions">
      <swiper-slide v-for="item of historyList" :key="item.id">
        <div class="top">
          <span class="time text-center">{{ item.time }}</span>
        </div>
        <div class="line" />
        <div class="bottom">
          <p class="desc" :title="item.content">{{ item.content }}</p>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-prev" />
    <div class="swiper-button-next" />
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
  data() {
    return {
      swiperOptions: {
        slidesPerView: 5,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1200: {
            slidesPerView: 4
          },
          992: {
            slidesPerView: 3
          },
          640: {
            slidesPerView: 2
          },
          320: {
            slidesPerView: 1
          }
        }
      },
      historyList: [
        {
          id: 1,
          content: '安徽省跨境电商服务中心正式成立。',
          time: '2020年9月'
        },
        {
          id: 2,
          content: '安徽省跨境电商出口9610第一单顺利走通。',
          time: '2020年9月'
        },
        {
          id: 3,
          content: '跨境电商9610+中欧班列模式首发试运营。',
          time: '2020年12月'
        },
        {
          id: 4,
          content: '服务中心正式成立，首批入驻率达93%',
          time: '2021年1月'
        },
        {
          id: 5,
          content: 'eBay金鹰卖家实战训练营（合肥站）首站开班',
          time: '2021年3月'
        },
        {
          id: 6,
          content: '跨境电商9610+中欧班列模式常态化运营',
          time: '2021年4月'
        },
        {
          id: 7,
          content: '合肥跨境包机：合肥-洛杉矶清关9万票',
          time: '2021年5月'
        },
        {
          id: 8,
          content: '安徽自贸实验区合肥片区中欧班列启动',
          time: '2021年6月'
        },
        {
          id: 9,
          content: '安徽省首票跨境电商B2B出口海外仓（9810）业务开通',
          time: '2021年7月'
        },
        {
          id: 10,
          content: '合肥跨境包机：合肥-芝加哥清关8万票',
          time: '2021年8月'
        },
        {
          id: 11,
          content: '服务中心入选“焦点访谈：中部崛起开新局”专题片示范案例',
          time: '2021年9月'
        },
        {
          id: 12,
          content: '首趟中欧班列“威廉港-合肥”回程班列启程',
          time: '2021年9月'
        },
        {
          id: 13,
          content: '入选“安徽自贸试验区建设十件大事”',
          time: '2021年10月'
        },
        {
          id: 14,
          content: '中欧班列“合肥-汉堡”跨境专列顺利发车',
          time: '2021年11月'
        }
      ]
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    // this.swiper.slideTo(3, 1000, false)
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
.history-container {
  position: relative;
  padding: 0 60px;
  margin-top: 30px;
  .swiper-button-prev, .swiper-button-next {
    width: 44px;
    height: 44px;
    margin-top: -22px;
    color: #fff;
    border-radius: 22px;
    background-color: #009ee7;
    &::after {
      font-size: 18px;
    }
  }
}
.swiper {
  height: 400px;
  width: 100%;

  .top, .bottom {
    position: relative;
    height: 48%;
    width: 100%;
    box-sizing: border-box;
  }
  .line {
    position: relative;
    width: 100%;
    border-top: 1px dotted #009ee7;
    &::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #009ee7;
      border-radius: 4px;
      left: 50%;
      transform: translate(-4px, -4px);
    }
  }
  .desc {
    position: absolute;
    max-height: calc(100% - 20px);
    padding: 0 20px;
    font-size: 14px;
    color: #333;
    line-height: 24px;
    overflow: hidden;
  }
  .time {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    padding: 6px 15px;
    background: #009ee7;
    white-space: nowrap;
    &::before {
      content: '';
      width: 0;
      height: 0;
      position: absolute;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    // background-color: #fff;
    &:nth-child(odd) {
      .bottom {
        order: 1;
      }
      .line {
        order: 2;
      }
      .top {
        order: 3;
      }
      .desc {
        bottom: 20px;
      }
      .time {
        top: 20px;
        &::before {
          border-bottom: 10px solid #009ee7;
          top: -21%;
        }
      }
    }
    &:nth-child(even) {
      .desc {
        top: 20px;
      }
      .time {
        bottom: 20px;
        &::before {
          border-top: 10px solid #009ee7;
          bottom: -21%;
        }
      }
    }
  }

}

</style>
