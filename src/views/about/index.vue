<template>
  <div class="about-container">
    <!-- banner -->
    <banner :banner="banner" />
    <!-- 简介内容 -->
    <article class="container intro gutter-v">
      <div class="title">公司简介</div>
      <div class="article">
        <p>安徽省跨境电商创新服务中心公共服务平台（以下简称“跨境公服”）于2020年9月注册成立。</p>
        <p>安徽省跨境电商创新服务中心公共服务平台依托全球视野下的跨境公共服务资源，围绕跨境电商、数字贸易两大重要领域，深入运用大数据、区块链等先进技术，打造数据申报服务、政府服务、金融服务、物流服务、税务服务、法律服务等九大功能体系。</p>
        <p>作为跨境电商线上一站式服务系统，通过对接各市综合服务平台，安徽跨境公服覆盖跨境电子商务全部通关监管环节，结合生态服务体系，将充分支撑安徽省内的跨境电商相关服务的时效性，满足跨境电商产业链条各环节综合需求，致力于提升跨境贸易数字化、便利化水平，聚焦聚力中国（安徽）自贸试验区高质量发展、竞争力提升，推动数字贸易产业高质量发展。</p>
      </div>
    </article>
    <!-- 发展历程 -->
    <div class="history gutter-v">
      <div class="container">
        <div class="title">发展历程</div>
        <history />
      </div>
    </div>
    <!-- 联系我们 -->
    <div class="contact gutter-v">
      <div class="container">
        <div class="title">联系我们</div>
        <div class="map">
          <el-image class="map-img" :src="map" fit="cover" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import History from './components/History.vue'
export default {
  name: 'About',
  components: { Banner, History },
  data() {
    return {
      title: '关于我们',
      banner: require('img/about-banner.png'),
      map: require('img/position.png'),
      article: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
.gutter-v {
  padding: 40px 0;
}
.about-container {
  .title {
    padding-left: 20px;
    border-left: 4px solid $mainColor;
    font-size: 30px;
    font-weight: bold;
    letter-spacing: 0.1em;
    line-height: 40px;
  }
  .intro {
    .article {
      margin-top: 15px;
      font-size: 16px;
      line-height: 36px;
      text-indent: 2em;
      overflow: hidden;
      p {
        margin: 15px 0;
      }
    }
  }
  .history {
    background-color: #f8f8f8;
  }
  .contact {
    background: #2449a5 url('~img/contact_bg.jpg') no-repeat center / cover;
    .title {
      color: #fff;
    }
    .map {
      position: relative;
      margin-top: 30px;
    }
    .map-box {
      position: absolute;
      top: 30%;
      left: 50%;
      padding: 20px 40px;
      width: 33.333333%;
      background-color: #fff;
      border: 1px solid #ccc;
      line-height: 30px;
      opacity: 0.9;
      box-shadow: 4px 4px 4px #ccc;
      z-index: 10;
      .company {
        font-size: 18px;
        font-weight: bold;
      }
      p {
        font-size: 16px;
        line-height: 26px;
      }
    }
    .map-img {
      width: 100%;
    }
  }
}
@media only screen and (max-width:1199px){
  .gutter-v {
    padding: 36px 0;
  }
  .about-container {
    .title {
      font-size: 28px;
      line-height: 38px;
    }
    .contact {
      .map-box {
        top: 30%;
        left: 40%;
        padding: 20px 36px;
        width: 50%;
      }
    }
  }
}
@media only screen and (max-width:991px){
  .gutter-v {
    padding: 30px 0;
  }
  .about-container {
    .title {
      padding-left: 16px;
      font-size: 24px;
      line-height: 34px;
    }
    .intro {
      .article {
        margin-top: 10px;
      }
    }
    .contact {
      .map {
        margin-top: 20px;
      }
      .map-box {
        position: relative;
        top: 0;
        left: 0;
        padding: 20px 30px;
        width: 100%;
      }
    }
  }
}
@media only screen and (max-width:767px){
  .gutter-v {
    padding: 20px 0;
  }
  .about-container {
    .title {
      padding-left: 14px;
      font-size: 20px;
      line-height: 30px;
    }
    .intro {
      .article {
        p {
          margin: 10px 0;
        }
      }
    }
    .contact {
      .map-box {
        padding: 15px 20px;
        line-height: 30px;
      }
    }
  }
}
</style>
