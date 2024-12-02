<template>
  <div class="card" :class="{rotate: isRotate}">
    <div class="front" :style="'background: url(' + front + ')'">
      <div class="img">
        <img :src="icon" alt="">
      </div>
      <p class="title">{{ title }}</p>
      <el-link class="btn-more" :underline="false" @click="onRotate">了解详情</el-link>
    </div>
    <div class="back" @click="onRotateClose">
      <div class="body">
        <slot name="desc" />
      </div>
      <!-- <div v-if="url" class="more">
        <router-link to="/">了解详情</router-link>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: ''
    },
    front: {
      type: String,
      default: ''
    },
    backColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isRotate: false
    }
  },
  created() {
  },
  methods: {
    onRotate() {
      if (!this.isRotate) {
        this.isRotate = true
      }
    },
    onRotateClose() {
      if (this.isRotate) {
        this.isRotate = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.card {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  text-align: center;
  color: #f5f5f5;
  height: 450px;
  // overflow: hidden;
  position: relative;
  width: 100%;
  .front, .back {
    width: 100%;
    height: 100%;
    transition: 1.5s;
    background-color: $mainColorHover;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    // background-color: $helpColor;
  }
  .front {
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    .img {
      padding-top: 60px;
      margin-bottom: 10px;
    }
    .title {
      font-size: 28px;
      color: #fff;
      letter-spacing: 8px;
      margin-bottom: 12px;
      line-height: 1;
    }
    .btn-more {
      position: absolute;
      bottom: 25px;
      left: 50%;
      padding: 0 20px;
      margin-left: -60px;
      font-size: 14px;
      line-height: 30px;
      color: #fff;
      letter-spacing: 6px;
      border-radius: 10px;
      background-color: $mainColor;
    }
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateY(-180deg);
    background-color: $mainColor;
    backface-visibility: hidden;
    cursor: pointer;
    .body {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 100%;
      opacity: 0;
      // border-bottom: 1px solid #fff;
    }
    .desc {
      padding: 0 50px;
      font-size: 16px;
      line-height: 48px;
      color: #f5f5f5;
      text-align: justify;
    }
    .more {
      position: absolute;
      bottom: 15px;
      right: 20px;
      a {
        display: block;
        padding: 6px 0;
        font-size: 14px;
        line-height: 30px;
        letter-spacing: 6px;
        color: #f5f5f5;
      }
    }
  }
  &.rotate {
    // box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    .front {
      transform: rotateY(180deg);
    }
    .back {
      transform: rotateY(0deg);
      .body {
        opacity: 1
      }
    }
  }
}
@media only screen and (max-width:991px){
  .card {
    height: 360px;
    .front {
      .img {
        padding-top: 40px;
        img {
          width: 100px;
          height: auto;
        }
      }
      .title {
        font-size: 24px;
        letter-spacing: 6px;
      }
    }
    .back {
      .desc {
        padding: 0 30px;
        font-size: 16px;
        line-height: 42px;
      }
    }
  }
}
@media only screen and (max-width:767px){
  .card {
    .front {
      .img {
        img {
          width: 80px;
          height: auto;
        }
      }
      .title {
        font-size: 20px;
        letter-spacing: 4px;
      }
    }
    .back {
      .desc {
        padding: 0 24px;
        font-size: 16px;
        line-height: 32px;
      }
    }
  }
}
</style>
