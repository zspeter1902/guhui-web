<template>
  <div class="service-container">
    <div class="container">
      <el-row v-if="false" :gutter="15" class="service-list" tag="ul">
        <el-col :span="6" :xs="24" tag="li">
          <div class="box no-hover">
            <el-image class="img" :src="icon" fit="cover" />
            <div class="title">
              <h3>最新服务</h3>
              <h5>LATEST SERVICE</h5>
              <p>新产品上线，欢迎咨询!</p>
            </div>
          </div>
        </el-col>
        <el-col v-for="item in serviceList" :key="item.id" tag="li" :span="6" :xs="12">
          <div class="box">
            <el-row type="flex">
              <h4>{{ item.title }}</h4>
              <el-image class="img" :src="item.pic" fit="cover" />
            </el-row>
            <p>{{ item.desc }}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // 定义属性
  data() {
    return {
      icon: require('img/icon_27.png'),
      serviceList: [
        {
          id: 1,
          title: '中银跨境e商通',
          desc: '合规筛查高效、系统功能强大、货币兑换灵活',
          pic: require('img/service_2.jpg')
        },
        {
          id: 2,
          title: '天戈德国海外仓',
          desc: 'FBA移仓换标、中转，一件代发，头程',
          pic: require('img/service_2.jpg')
        },
        {
          id: 3,
          title: '天戈法国海外仓',
          desc: 'FBA移仓换标、中转，一件代发，头程',
          pic: require('img/service_2.jpg')
        },
        {
          id: 4,
          title: '天戈美国海外仓',
          desc: 'FBA移仓换标、中转，一件代发，头程',
          pic: require('img/service_2.jpg')
        },
        {
          id: 5,
          title: '天戈英国海外仓',
          desc: 'FBA移仓换标、中转，一件代发，头程',
          pic: require('img/service_2.jpg')
        },
        {
          id: 6,
          title: '跨境电商海外公司注册境外商标注册审计',
          desc: '全球一站式企业配套服务的工商税务服务平台',
          pic: require('img/service_3.jpg')
        }
      ]
    }
  },
  // 方法集合
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixin';
.service-container {
  padding: 100px 0 85px;
  background: #fff url('~img/latest_bg.jpg') no-repeat center bottom / cover;
  .title {
    margin-bottom: 50px;
    color: #000;
    h3 {
      font-size: 24px;
      line-height: 42px;
    }
    h5 {
      font-size: 12px;
    }
    p {
      margin-top: 20px;
      color: #000 !important;
    }
  }
  .service-list {
    flex-wrap: wrap;
    color: #333;
    .img {
      width: 22px;
      height: 22px;
      margin-left: 15px;
    }
    .no-hover .img {
      width: 60px;
      height: 60px;
      margin-left: 0;
      margin-bottom: 16px;
    }
    li {
      height: 180px;
      margin-bottom: 15px;
      .box {
        position: relative;
        height: 100%;
        padding: 40px;
        transition: all .3s;
        background-color: #fff;
        overflow: hidden;
        h4 {
          margin-bottom: 10px;
          font-size: 16px;
          line-height: 26px;
          color: #606060;
          @include ellipsis;
        }
        p {
          font-size: 12px;
          color: #a5a5a5;
          line-height: 20px;
          transition: all .3s;
        }
        &:hover:not(.no-hover) {
          transform: translate3d(0, -5px, 0);
          box-shadow: 0 15px 30px rgb(0 0 0 / 20%);
          p {
            color: #333;
          }
        }
      }
      &:first-child {
        height: 375px;
        .box {
          background-color: rgba($color: #fff, $alpha: .7);
        }
      }
    }
  }
}
@media only screen and (max-width:1199px){
  .service-container {
    padding: 70px 0 55px;
    .title {
      h3 {
        font-size: 22px;
        line-height: 44px;
      }
    }
    .service-list {
      li {
        .box {
          padding: 30px;
        }
      }
    }
  }
}
@media only screen and (max-width:991px){
  .service-container {
    padding: 45px 0 30px;
    .title {
      h3 {
        font-size: 20px;
        line-height: 40px;
      }
      p {
        margin-top: 15px;
      }
    }
    .service-list {
      .img {
        margin-left: 10px;
      }
      .no-hover .img {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
      }
      li {
        height: 120px;
        .box {
          padding: 20px;
        }
        &:first-child {
          height: 255px;
        }
      }
    }
  }
}
@media only screen and (max-width:767px){
  .service-container {
    padding: 30px 0 15px;
    .title {
      margin-bottom: 10px;
      h3 {
        font-size: 18px;
        line-height: 30px;
      }
      p {
        margin-top: 10px;
      }
    }
    .service-list {
      .no-hover {
        display: flex;
        .img {
          width: 30px;
          height: 30px;
          margin-top: 6px;
          margin-right: 20px;
          margin-bottom: 0;
        }
      }
      li {
        height: 120px;
        margin-bottom: 15px;
        .box {
          padding: 12px;
        }
        &:first-child {
          height: auto;
        }
      }
    }
  }
}
</style>
