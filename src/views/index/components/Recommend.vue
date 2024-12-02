<template>
  <div class="service-container">
    <div class="container">
      <slot name="title" />
      <el-row type="flex" :gutter="15" class="service-list flex-wrap" tag="ul">
        <el-col v-for="(item, index) in serviceList" :key="item.id" :span="6" :xs="12" tag="li">
          <div class="box">
            <el-row type="flex">
              <h4><i class="ranking" :class="{'first': index === 0, 'second': index === 1, 'three': index === 2}">{{ '0' + `${index + 1}` }}</i>{{ item.title }}</h4>
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
      serviceList: [
        {
          id: 1,
          title: '跨境支付',
          desc: '实名制交易、贸易真实性、国际收支申报、风险管理'
        },
        {
          id: 2,
          title: '义速宝日本快捷',
          desc: ''
        },
        {
          id: 3,
          title: '香港海外仓(FC01)',
          desc: ''
        },
        {
          id: 4,
          title: '跨境电商货物处理中心',
          desc: '一站式交运，便利化操作'
        },
        {
          id: 5,
          title: '跨境电商仓储解决方案',
          desc: '快捷、高效'
        },
        {
          id: 6,
          title: 'CNE全球特惠',
          desc: ''
        },
        {
          id: 7,
          title: '仓储、航空干线、进口关务服务',
          desc: '综合性、 全自动化'
        },
        {
          id: 8,
          title: '圆通进口BBC专线',
          desc: ''
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
  padding: 80px 0;
  background: #f8f8f8;
  .title {
    margin-bottom: 50px;
    color: #333;
    h3 {
      font-size: 24px;
      line-height: 48px;
    }
    h5 {
      font-size: 12px;
    }
    p {
      margin-top: 20px;
      color: #333 !important;
    }
  }
  .service-list {
    flex-wrap: wrap;
    color: #333;

    li {
      margin-bottom: 15px;
      .box {
        position: relative;
        padding: 30px;
        height: 100%;
        transition: all .3s;
        background-color: #fff;
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
        .ranking {
          margin-right: 10px;
          color: rgba($color: #000, $alpha: .4);
          &.first {
            color: rgba($color: #f40, $alpha: 1);
          }
          &.second {
            color: rgba($color: #ff7e00, $alpha: 1);
          }
          &.three {
            color: rgba($color: #ffae00, $alpha: 1);
          }
        }
        &:hover {
          transform: translate3d(0, -5px, 0);
          box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
          p {
            color: #333;
          }
        }
      }
    }
  }
}
@media only screen and (max-width:1199px){
  .service-container {
    padding: 60px 0;
    .title {
      h3 {
        font-size: 22px;
        line-height: 44px;
      }
    }
    .service-list {
      li {
        .box {
          padding: 24px;
        }
      }
    }
  }
}
@media only screen and (max-width:991px){
  .service-container {
    padding: 40px 0;
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
      li {
        .box {
          padding: 20px;
        }
      }
    }
  }
}
@media only screen and (max-width:767px){
  .service-container {
    padding: 30px 0;
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
      li {
        .box {
          padding: 12px;
        }
      }
    }
  }
}
</style>
