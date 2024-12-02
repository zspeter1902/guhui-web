<template>
  <div class="partner-container">
    <div class="container">
      <el-row type="flex" class="flex-column">
        <el-row type="flex" justify="center" tag="ul" class="partner-middle order-two flex-wrap">
          <li class="hidden-xs-only">
            <div class="img">
              <el-image class="bg" :src="leftImg" fit="cover" />
            </div>
          </li>
          <li>
            <div class="img">
              <slot name="title" class="partner-title" />
            </div>
          </li>
          <li class="hidden-xs-only">
            <div class="img">
              <el-image class="bg" :src="rightImg" fit="cover" />
            </div>
          </li>
        </el-row>
        <router-link class="more hidden-xs-only" to="/service">查看更多</router-link>
        <el-row type="flex" justify="center" class="flex-wrap order-one">
          <el-row type="flex" justify="center" tag="ul" class="partner-top-left flex-wrap">
            <li v-for="item of topLeftList" :key="item.id">
              <a href="" target="_blank">
                <el-image class="img" :src="item.logo" fit="contain" />
              </a>
            </li>
          </el-row>
          <el-row type="flex" justify="center" tag="ul" class="partner-top-right flex-wrap">
            <li v-for="item of topRightList" :key="item.id">
              <a href="" target="_blank">
                <el-image class="img" :src="item.logo" fit="contain" />
              </a>
            </li>
          </el-row>
        </el-row>
        <el-row type="flex" justify="center" class="flex-wrap order-three">
          <el-row type="flex" justify="center" tag="ul" class="partner-bottom-left flex-wrap">
            <li v-for="item of bottomLeftList" :key="item.id">
              <a href="" target="_blank">
                <el-image class="img" :src="item.logo" fit="contain" />
              </a>
            </li>
          </el-row>
          <el-row type="flex" justify="center" tag="ul" class="partner-bottom-right flex-wrap">
            <li v-for="item of bottomRightList" :key="item.id">
              <a href="" target="_blank">
                <el-image class="img" :src="item.logo" fit="contain" />
              </a>
            </li>
          </el-row>
        </el-row>
      </el-row>
      <!-- <el-row type="flex" justify="center" tag="ul" class="bottom-list">
        <li v-for="item of bottomList" :key="item.id">
          <a href="" target="_blank">
            <el-image class="img" :src="item.logo" fit="contain" />
          </a>
        </li>
      </el-row> -->
    </div>
  </div>
</template>

<script>

export default {
  // 定义属性
  data() {
    return {
      leftImg: require('img/partner_bg1.png'),
      rightImg: require('img/partner_bg2.png'),
      tobList: [
        {
          id: 1,
          logo: require('img/financial_logo_5.png')
        },
        {
          id: 2,
          logo: require('img/financial_logo_6.png')
        },
        {
          id: 3,
          logo: require('img/financial_logo_7.png')
        },
        {
          id: 4,
          logo: require('img/logistics_logo_3.png')
        },
        {
          id: 5,
          logo: require('img/logistics_logo_4.png')
        },
        {
          id: 6,
          logo: require('img/logistics_logo_5.png')
        },
        {
          id: 7,
          logo: require('img/platform_logo_3.png')
        },
        {
          id: 8,
          logo: require('img/platform_logo_4.png')
        },
        {
          id: 9,
          logo: require('img/platform_logo_5.png')
        },
        {
          id: 10,
          logo: require('img/financial_logo_3.png')
        },
        {
          id: 11,
          logo: require('img/logistics_logo_2.png')
        },
        {
          id: 12,
          logo: require('img/platform_logo_6.png')
        }
      ]
    }
  },
  computed: {
    topLeftList({ tobList }) {
      return tobList.slice(0, 3)
    },
    topRightList({ tobList }) {
      return tobList.slice(3, 6)
    },
    bottomLeftList({ tobList }) {
      return tobList.slice(6, 9)
    },
    bottomRightList({ tobList }) {
      return tobList.slice(9, 12)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';

.order-one {
  order: 1;
}
.order-two {
  order: 2;
}
.order-three {
  order: 3;
}
.partner-container {
  padding: 80px 0;
  background-color: #f8f8f8;
  .bg {
    width: 100%;
    height: 100%;
  }
  .more {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 84px;
    padding: 3px 12px;
    border: 1px solid #fff;
    border-radius: 10px;
    font-size: 16px;
    color: #fff;
    z-index: 10;
    &:hover {
      border-color: $mainColor;
      color: $mainColor;
    }
  }
  .partner-bottom-right,
  .partner-bottom-left,
  .partner-top-right,
  .partner-top-left {
    width: 368px;
    margin: 0 22px;
    li {
      width: 122px;
      height: 122px;
      border: 1px solid #ddd;
      transform: rotate(45deg);
      background-color: #fff;
      a {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        box-shadow: 0 0px 36px rgba($color: #000000, $alpha: 0.1);
        &:hover {
          box-shadow: 0 0px 36px rgba($color: #000000, $alpha: 0.24);
        }
      }
    }
    .img {
      width: 100%;
      height: 100%;
      padding: 5px;
      transform: rotate(90deg);
      ::v-deep {
        img {
          top: 0;
          left: 0;
          transform: rotate(-135deg);
        }
      }
    }
  }
  .partner-top-right,
  .partner-top-left {
    li {
      & + li {
        margin-left: 70px;
      }
      &:last-child {
        margin-top: -26px;
        margin-left: 0 !important;
      }
    }
  }
  .partner-bottom-right,
  .partner-bottom-left {
    li {
      margin-left: 70px;
      &:first-child {
        margin: 0 70px -26px!important;
      }
      &:nth-child(2) {
        margin-left: 0 !important;
      }
    }
  }
  .partner-middle {
    margin-top: -80px;
    margin-bottom: -80px;
    li {
      width: 260px;
      height: 260px;
      transform: rotate(45deg);
      background-color: #fff;
      box-shadow: 0 0px 10px rgba($color: #000000, $alpha: 0.15);
      & + li {
        margin-left: 152px;
      }
    }
    .img {
      position: relative;
      width: 100%;
      height: 100%;
      // transform: rotate(90deg);
      background-color: $helpColor;
      ::v-deep {
        img {
          top: 0;
          left: 0;
          // transform: rotate(-135deg);
        }
      }
    }
    ::v-deep .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      white-space: nowrap;
    }
  }
}

@media only screen and (max-width:1299px){
  .partner-container {
    padding: 60px 0;
    .more {
      margin-top: 72px;
    }
    .partner-bottom-right,
    .partner-bottom-left,
    .partner-top-right,
    .partner-top-left {
      width: 280px;
      margin: 0 16px;
      li {
        width: 96px;
        height: 96px;
      }
    }
    .partner-top-right,
    .partner-top-left {
      li {
        & + li {
          margin-left: 50px;
        }
        &:last-child {
          margin-top: -24px;
        }
      }
    }
    .partner-bottom-right,
    .partner-bottom-left {
      li {
        margin-left: 50px;
        &:first-child {
          margin: 0 50px -24px!important;
        }
      }
    }
    .partner-middle {
      margin-top: -65px;
      margin-bottom: -65px;
      li {
        width: 200px;
        height: 200px;
        & + li {
          margin-left: 112px;
        }
      }
    }
  }
}
@media only screen and (max-width:991px){
  .partner-container {
    padding: 40px 0;
    .more {
      padding: 3px 7px;
      font-size: 14px;
      margin-top: 56px;
    }
    .partner-bottom-right,
    .partner-bottom-left,
    .partner-top-right,
    .partner-top-left {
      width: 224px;
      margin: 0 12px;
      li {
        width: 74px;
        height: 74px;
      }
    }
    .partner-top-right,
    .partner-top-left {
      li {
        & + li {
          margin-left: 40px;
        }
        &:last-child {
          margin-top: -18px;
        }
      }
    }
    .partner-bottom-right,
    .partner-bottom-left {
      li {
        margin-left: 40px;
        &:first-child {
          margin: 0 40px -18px!important;
        }
      }
    }
    .partner-middle {
      margin-top: -50px;
      margin-bottom: -50px;
      li {
        width: 154px;
        height: 154px;
        & + li {
          margin-left: 90px;
        }
      }
    }
  }

}
@media only screen and (max-width:767px){
  .order-two {
    order: 0;
  }
  .partner-container {
    padding: 20px 0;
    .more {
      top: 36px;
      right: 20px;
      left: auto;
      transform: none;
      padding: 0px 8px;
      font-size: 14px;
      line-height: 26px;
      margin-top: 0;
    }
    .partner-bottom-right,
    .partner-bottom-left,
    .partner-top-right,
    .partner-top-left {
      width: 100%;
      margin: 0 0 10px;
      li {
        width: calc(33.333333% - 10px);
        height: auto;
        transform: rotate(0deg);
      }
      .img {
        transform: rotate(0deg);
        ::v-deep {
          img {
            transform: rotate(0deg);
          }
        }
      }
    }
    .partner-top-right,
    .partner-top-left {
      li {
        margin: 0 5px;
        & + li {
          margin-left: 5px;
        }
        &:last-child {
          margin-top: 0;
          margin-left: 5px !important;
        }
      }
    }
    .partner-bottom-right,
    .partner-bottom-left {
      li {
        margin: 0 5px;
        &:first-child {
          margin: 0 5px !important;
        }
        &:nth-child(2) {
          margin-left: 5px !important;
        }
      }
    }
    .partner-middle {
      margin-top: 0px;
      margin-bottom: 10px;
      li {
        width: 100%;
        height: 100px;
        transform: rotate(0deg);
        margin: 0 5px;
        & + li {
          margin-left: 5px;
        }
      }
      ::v-deep .title {
        padding-top: 20px;
        margin-left: 20px;
        position: static;
        transform: none;
        text-align: left;
      }
    }
  }
}
</style>
