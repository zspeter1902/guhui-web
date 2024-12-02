<template>
  <div>
    <div class="bg" @click="onClose" />
    <div class="layer text-center">
      <slot name="title" />
      <h4 v-if="content" class="layer-content">{{ content }}</h4>
      <!-- <button type="button" class="close" @click="onClose"><img src="../../../views/image/delete.png" /></button> -->
      <div class="flex ai-center jc-around btn-box">
        <button type="button" class="btn" @click="onBtn()">{{ btn }}</button>
        <button type="button" class="btn btn2" @click="onBtn2()">
          {{ btn2 }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layer',
  props: {
    content: {
      type: String,
      default: ''
    },
    btn: {
      type: String,
      default: '直接退出'
    },
    btn2: {
      type: String,
      default: '提交答案'
    }
  },
  data() {
    return {}
  },

  created() {},
  mounted() {},
  methods: {
    onClose() {
      this.$emit('close')
    },
    onBtn() {
      this.$emit('btn')
    },
    onBtn2() {
      this.$emit('btn2')
    }
  }
}
</script>
<style scoped>
.bg {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
}
.layer {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 80%;
  margin-top: -0.933333rem;
  padding-top: 0.466666rem;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 0.266666rem;
  z-index: 10;
}
.layer-content {
  margin: 0.4rem 0 0.733333rem;
  font-size: 0.4rem;
  color: #333;
  line-height: 0.533333rem;
  font-weight: normal;
}
.close {
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  outline: none;
}
.btn-box {
  position: relative;
}
.btn-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #e7e7e7;
  transform: scale(1, 0.5);
  transform-origin: center bottom;
}
.btn-box::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  background-color: #e7e7e7;
  transform: scale(0.5, 1);
  transform-origin: center bottom;
}
.btn {
  padding: 0.28rem;
  font-size: 0.426666rem;
  color: #666;
  border: none;
  background-color: transparent;
  outline: none;
}
.btn2 {
  color: #ff6801;
}
.close,
.btn:hover {
  opacity: 0.8;
}
</style>
