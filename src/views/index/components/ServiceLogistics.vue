<template>
  <div class="service-container">
    <div class="container">
      <slot name="title" />
      <div class="text-center box">
        <el-image class="map" :src="map" fit="contain" />
        <div class="service-list">
          <el-row type="flex" justify="center" class="flex-wrap" tag="ul">
            <li v-for="item in serviceList" :key="item.id">
              <router-link to="/">
                <el-image class="logo" :src="item.logo" :alt="item.title" fit="contain" />
              </router-link>
            </li>
          </el-row>
          <slot name="more" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 定义属性
  data() {
    return {
      map: require('img/map.png'),
      serviceList: [
        {
          id: 1,
          title: '',
          desc: '',
          logo: require('img/logistics_logo_1.png')
        },
        {
          id: 2,
          title: '',
          desc: '',
          logo: require('img/logistics_logo_2.png')
        },
        {
          id: 3,
          title: '',
          desc: '',
          logo: require('img/logistics_logo_3.png')
        },
        {
          id: 4,
          title: '',
          desc: '',
          logo: require('img/logistics_logo_4.png')
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
.service-container {
  padding-bottom: 25px;
  .title {
    top: -27px;
  }
  .box {
    position: relative;
    margin-top: -46px;
  }
  .map {
    right: 60px;
  }
  .service-list {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: -20px;
    width: 100%;
    color: #333;
    li {
      margin-bottom: 15px;
      .logo {
        width: 136px;
        height: 136px;
        padding: 6px;
        border: 1px solid $grayColor;
        border-radius: 68px;
        margin: 0 12px;
        background-color: #fff;
      }
    }
    .more {
      margin-top: 10px;
    }
  }
}
@media only screen and (max-width:1199px){
  .service-container {
    .service-list {
      li {
        .logo {
          width: 125px;
          height: 125px;
          padding: 5px;
          border-radius: 64px;
        }
      }
    }
  }
}
@media only screen and (max-width:991px){
  .service-container {
    .title {
      top: -24px;
    }
    .map {
      width: 80%;
      right: 3%;
    }
    .service-list {
      li {
        .logo {
          width: 105px;
          height: 105px;
          padding: 4px;
          border-radius: 54px;
          margin: 0 10px;
        }
      }
    }
  }
}
@media only screen and (max-width:767px){
  .service-container {
    padding-bottom: 15px;
    .title {
      top: -21px;
    }
    .box {
      margin-top: -40px;
    }
    .map {
      width: 90%;
    }
    .service-list {
      top: 20%;
      transform: translateX(-50%);
      margin-top: 0px;
      li {
        .logo {
          width: 90px;
          height: 90px;
          padding: 3px;
          margin: 0 8px;
        }
      }
      .more {
        margin-top: 0px;
      }
    }
  }
}
@media only screen and (max-width:470px){
  .service-container {
    .service-list {
      li {
        .logo {
          width: 80px;
          height: 80px;
          margin: 0 6px;
        }
      }
    }
  }
}
@media only screen and (max-width:399px){
  .service-container {
    .service-list {
      li {
        .logo {
          width: 65px;
          height: 65px;
          margin: 0 4px;
        }
      }
    }
  }
}
</style>
