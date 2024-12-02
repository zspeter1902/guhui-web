<template>
  <div class="parse-box text-left">
    <global-title title="练习报告" :left="false"></global-title>
    <div class="score pass fail flex jc-center" v-if="report.percent >= 0.6">
      <div class="box text-center">
        <span class="tip">{{ evaluate }}</span>
        <h3 class="result">{{ report.score }}</h3>
        <span class="name">本次成绩</span>
      </div>
    </div>
    <div class="score fail flex jc-center" v-else>
      <div class="box text-center">
        <span class="tip">继续努力</span>
        <h3 class="result">{{ report.score }}</h3>
        <span class="name">本次成绩</span>
      </div>
    </div>
    <div class="statistics">
      <ul class="flex ai-center jc-around text-center">
        <li>
          <span class="value">{{ report.count }}</span>
          <span class="desc">共做答（道）</span>
        </li>
        <li>
          <span class="value">{{ report.percent * 100 + "%" }}</span>
          <span class="desc">正确率</span>
        </li>
        <li>
          <span class="value">{{ report.totaltime }}</span>
          <span class="desc">用时</span>
        </li>
      </ul>
    </div>
    <div class="state flex ai-center jc-between">
      <h4>答题卡</h4>
      <div class="flex">
        <p><span class="cycle right"></span>答对</p>
        <p><span class="cycle error"></span>答错</p>
        <p><span class="cycle no"></span>未作答</p>
      </div>
    </div>
    <div class="list">
      <h5>单项选择题（{{ list1.length }}题）</h5>
      <ul class="flex flex-wrap text-center">
        <li
          :class="{
            right: item.is_right == '1',
            error: item.answer.length && item.is_right != '1',
          }"
          v-for="(item, index) in list1"
          :key="item.id"
        >
          <span>{{ index + 1 }}</span>
        </li>
      </ul>
    </div>
    <div class="list">
      <h5>多项选择题（{{ list2.length }}题）</h5>
      <ul class="flex flex-wrap text-center">
        <li
          :class="{
            right: item.is_right == '1',
            error: item.answer.length && item.is_right != '1',
          }"
          v-for="(item, index) in list2"
          :key="item.id"
        >
          <span>{{ list1.length + index + 1 }}</span>
        </li>
      </ul>
    </div>
    <div class="list">
      <h5>判断题（{{ list3.length }}题）</h5>
      <ul class="flex flex-wrap text-center">
        <li
          :class="{
            right: item.is_right == '1',
            error: item.answer.length && item.is_right != '1',
          }"
          v-for="(item, index) in list3"
          :key="item.id"
        >
          <span>{{ list1.length + list2.length + index + 1 }}</span>
        </li>
      </ul>
    </div>
    <div class="footer-height"></div>
    <div class="footer flex text-center">
      <div
        @click="onLink('/mistalks-parse/' + tid + '/' + id)"
        class="btn btn-red"
      >
        错题解析
      </div>
      <div
        @click="onLink('/mistalks-parse/' + tid + '/' + id + '/all')"
        href=""
        class="btn btn-blue"
      >
        全部解析
      </div>
    </div>
  </div>
</template>

<script>
import GlobalTitle from '@/components/title.vue'
export default {
  name: 'AnswerReport',
  props: {
    report: {
      type: Object,
      default: () => {}
    },
    lists: {
      type: Array,
      default: () => []
    },
    type: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      tid: null,
      id: null,
      evaluate: '优秀',
      listsAll: {},
      list1: [],
      list2: [],
      list3: []
    }
  },
  watch: {
    lists: {
      handler(newVal, oldVal) {
        this.listsAll = newVal
        if (this.listsAll.length) {
          this.changeList()
        }
      },
      deep: true
    }
  },
  created() {
    this.tid = this.$route.params.tid
    this.id = this.$route.params.id
  },
  methods: {
    onLink(url) {
      this.$router.push(url + '?page_type=' + this.type)
    },
    changeList() {
      this.list1 = []
      this.list2 = []
      this.list3 = []
      for (let item of this.listsAll) {
        if (item.post_type == 1) {
          this.list1.push(item)
        }
        if (item.post_type == 2) {
          this.list2.push(item)
        }
        if (item.post_type == 3) {
          this.list3.push(item)
        }
      }
    },
    isEqual(arr1, arr2) {
      return this.xier(arr1).toString() == this.xier(arr2).toString();
    },
    xier(arr) {
      if (typeof arr == "string") {
        return [];
      }
      var interval = parseInt(arr.length / 2); //分组间隔设置
      while (interval > 0) {
        for (var i = 0; i < arr.length; i++) {
          var n = i;
          while (arr[n] < arr[n - interval] && n > 0) {
            var temp = arr[n];
            arr[n] = arr[n - interval];
            arr[n - interval] = temp;
            n = n - interval;
          }
        }
        interval = parseInt(interval / 2);
      }
      return arr;
    },
  },
  computed: {},
  components: {
    GlobalTitle,
  },
};
</script>
<style scoped>
.score {
  height: 6.653333rem;
}
.score .box {
  width: 3.906666rem;
  height: 3.96rem;
  margin-top: 0.76rem;
  color: #fff;
}
.fail {
  background: url(../image/fail_bg.png) no-repeat center top / cover;
}
.fail .box {
  background: url(../image/fail_icon.png) no-repeat center top / cover;
}
.pass {
  background: url(../image/pass_bg.png) no-repeat center top / cover;
}
.pass .box {
  background: url(../image/pass_icon.png) no-repeat center top / cover;
}
.tip {
  display: inline-block;
  margin-top: 0.72rem;
  font-size: 0.306666rem;
}
.result {
  margin: 0.053333rem 0;
  line-height: 1;
  font-size: 1.28rem;
}
.name {
  display: inline-block;
  font-size: 0.253333rem;
}
.statistics {
  position: relative;
  top: -1.293333rem;
  margin: 0 0.4rem;
}
.statistics ul {
  height: 2.4rem;
  background-color: #fff;
  border-radius: 0.266666rem;
  box-shadow: 0 0.146666rem 0.32rem 0 rgba(255, 159, 58, 0.08);
}
.statistics .value {
  display: block;
  color: #333;
  font-size: 0.48rem;
}
.statistics .desc {
  display: block;
  margin-top: 0.133333rem;
  color: #666;
  font-size: 0.346666rem;
}
.state {
  margin-top: -0.133333rem;
  padding: 0 0.4rem;
}
.state h4 {
  margin: 0;
  color: #333;
  font-size: 0.48rem;
}
.state p {
  margin: 0;
  font-size: 0.4rem;
  color: #666;
  line-height: 1;
}
.state .cycle {
  display: inline-block;
  width: 0.453333rem;
  height: 0.453333rem;
  margin-right: 0.133333rem;
  margin-left: 0.48rem;
  border-radius: 0.226666rem;
  border: 0.026666rem solid #e7e7e7;
  vertical-align: top;
  box-sizing: border-box;
}
.state .right {
  border-color: #5b8dfe;
  background-color: #5b8dfe;
}
.state .error {
  border-color: #f5444c;
  background-color: #f5444c;
}
.list {
  padding: 0 0.4rem;
  margin-bottom: 0.08rem;
}
.list h5 {
  margin: 0.693333rem 0 0.24rem;
  font-size: 0.4rem;
  color: #333;
  font-weight: normal;
}
.list ul {
  margin: 0 -0.333333rem;
}
.list span {
  display: inline-block;
  width: 0.973333rem;
  height: 0.973333rem;
  margin: 0.28rem 0.333333rem;
  border: 0.013333rem solid #e7e7e7;
  line-height: 0.973333rem;
  color: #666;
  font-size: 0.4rem;
  border-radius: 0.493333rem;
  box-sizing: border-box;
}
.list .right span {
  background-color: #5b8dfe;
  border-color: #5b8dfe;
  color: #fff;
}
.list .error span {
  background-color: #f5444c;
  border-color: #f5444c;
  color: #fff;
}
.footer-height {
  height: 1.8rem;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.footer .btn {
  display: inline-block;
  width: 50%;
  height: 1.226666rem;
  font-size: 0.426666rem;
  line-height: 1.226666rem;
}
.btn-red {
  background-color: #f5444c;
  color: #fff;
}
.btn-blue {
  background-color: #5b8dfe;
  color: #fff;
}
</style>
