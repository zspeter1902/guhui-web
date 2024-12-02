<template>
  <div class="partner-container">
    <div class="container">
      <div class="title">
        <h3>合作平台</h3>
        <h5>PARTNER</h5>
      </div>
      <el-row type="flex" justify="center" tag="ul" class="top-list flex-wrap">
        <li v-for="item of tobList" :key="item.id">
          <a href="" target="_blank">
            <el-image class="img" :src="item.logo" fit="contain" />
          </a>
        </li>
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
      tobList: [
        {
          id: 1,
          logo: require('img/logo1.png')
        },
        {
          id: 2,
          logo: require('img/logo2.png')
        },
        {
          id: 3,
          logo: require('img/logo3.png')
        },
        {
          id: 4,
          logo: require('img/logo4.png')
        },
        {
          id: 5,
          logo: require('img/logo5.png')
        },
        {
          id: 6,
          logo: require('img/logo6.jpg')
        },
        {
          id: 7,
          logo: require('img/logo7.png')
        },
        {
          id: 8,
          logo: require('img/logo8.jpg')
        },
        {
          id: 9,
          logo: require('img/logo9.jpg')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.title {
  margin-bottom: 50px;
  color: #333;
  h3 {
    font-size: 24px;
    line-height: 48px;
  }
  h5 {
    font-size: 12px;
    color: #a5a5a5;
  }
}
.partner-container {
  padding: 80px 0;
  background-color: #f8f8f8;
  li {
    margin: 0 36px;
    border: 1px solid #ddd;
    transform: rotate(45deg);
    background-color: #fff;
    a {
      position: relative;
      display: block;
      &:hover {
        box-shadow: 0 0px 36px rgba($color: #000000, $alpha: 0.1);
      }
    }
  }
  .img {
    width: 140px;
    height: 140px;
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
@media only screen and (min-width:992px){
  .partner-container li:nth-child(n+6) {
    margin-top: -30px;
  }
}
@media only screen and (max-width:1199px){
  .partner-container  {
    padding: 60px 0;
    .img {
      width: 108px;
      height: 108px;
    }
  }
}
@media only screen and (max-width:991px){
  .title {
    margin-bottom: 30px;
    h3 {
      font-size: 22px;
      line-height: 42px;
    }
  }
  .partner-container {
    padding: 40px 0;
    li {
      min-width: 140px;
      width: 33.3%;
      margin: 0;
      border: none;
      text-align: center;
      transform: rotate(0);
    }
    .img {
      width: 140px;
      height: 140px;
      transform: rotate(0deg);
      ::v-deep {
        img {
          transform: rotate(0);
        }
      }
    }
  }
}
@media only screen and (max-width:767px){
  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 18px;
      line-height: 38px;
    }
  }
  .partner-container {
    padding: 30px 0;
    li {
      min-width: 90px;
    }
    .img {
      width: 90px;
      height: 90px;
    }
  }
}
</style>
