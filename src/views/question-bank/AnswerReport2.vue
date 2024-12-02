<template>
  <div class="parse-box text-left">
    <global-title title="答题报告" :left="false" />
    <div v-if="listsAll.percent >= 0.6" class="score pass fail flex jc-center">
      <div class="box text-center">
        <span class="tip">{{ evaluate }}</span>
        <h3 class="result">{{ listsAll.score }}</h3>
        <span class="name">本次成绩</span>
      </div>
    </div>
    <div class="score fail flex jc-center" v-else>
      <div class="box text-center">
        <span class="tip">继续努力</span>
        <h3 class="result">{{ listsAll.score }}</h3>
        <span class="name">本次成绩</span>
      </div>
    </div>
    <div class="statistics">
      <ul class="flex ai-center jc-around text-center">
        <li>
          <span class="value">{{ listsAll.count }}</span>
          <span class="desc">共做答（道）</span>
        </li>
        <li>
          <span class="value">{{ listsAll.percent * 100 + "%" }}</span>
          <span class="desc">正确率</span>
        </li>
        <li>
          <span class="value">{{ listsAll.timing }}</span>
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
    <div class="list" v-if="list1.posts">
      <h5>单项选择题（{{ list1.count }}题）</h5>
      <ul class="flex flex-wrap text-center">
        <li
          :class="{ right: item.is_right == '1', error: item.is_right == '2' }"
          v-for="(item, index) in list1.posts"
          :key="item.id"
        >
          <span>{{ index + 1 }}</span>
        </li>
      </ul>
    </div>
    <div class="list" v-if="list2.posts">
      <h5>多项选择题（{{ list2.count }}题）</h5>
      <ul class="flex flex-wrap text-center">
        <li
          :class="{ right: item.is_right == '1', error: item.is_right == '2' }"
          v-for="(item, index) in list2.posts"
          :key="item.id"
        >
          <span>{{ list1.count + index + 1 }}</span>
        </li>
      </ul>
    </div>
    <div class="list" v-if="list3.posts">
      <h5>判断题（{{ list3.count }}题）</h5>
      <ul class="flex flex-wrap text-center">
        <li
          :class="{ right: item.is_right == '1', error: item.is_right == '2' }"
          v-for="(item, index) in list3.posts"
          :key="item.id"
        >
          <span>{{ list1.count + list2.count + index + 1 }}</span>
        </li>
      </ul>
    </div>
    <div class="list" v-if="list4.posts">
      <h5>不定项选择题（{{ list4.count }}题）</h5>
      <ul class="flex flex-wrap text-center">
        <li
          :class="{ right: item.is_right == '1', error: item.is_right == '2' }"
          v-for="(item, index) in list4.posts"
          :key="item.id"
        >
          <span>{{ list1.count + list2.count + list3.count + index + 1 }}</span>
        </li>
      </ul>
    </div>
    <div class="list" v-if="listsAll.is_5">
      <h5>综合填空题（{{ list5.count }}题）</h5>
      <ul class="flex flex-wrap text-center">
        <li
          v-for="(item, index) in list5.posts"
          :key="item.id"
          :class="{ right: item.is_right == '1', error: item.is_right == '2' }"
        >
          <span>{{
            list1.count + list2.count + list3.count + list4.count + index + 1
          }}</span>
        </li>
      </ul>
    </div>

    <div class="footer-height"></div>
    <div class="footer flex text-center">
      <router-link :to="'/mistalks-parse/' + tid + '/' + id" class="btn btn-red"
        >错题解析</router-link
      >
      <router-link
        :to="'/mistalks-parse/' + tid + '/' + id + '/all'"
        href=""
        class="btn btn-blue"
        >全部解析</router-link
      >
    </div>
  </div>
</template>

<script>
import GlobalTitle from "@/components/title.vue";
export default {
  name: "AnswerReport2",
  data() {
    return {
      tid: null,
      id: null,
      order: null,
      evaluate: "优秀",
      listsAll: {},
      list1: {},
      list2: {},
      list3: {},
      list4: {},
      list5: {},
    };
  },

  created() {
    this.tid = this.$route.params.tid;
    this.id = this.$route.params.id;
    this.order = this.$route.params.order;
    this.init();
  },
  methods: {
    init() {
      this.getInfo();
    },
    getInfo() {
      this.$api("topicExaminationSelfRatingReport", {
        out_order: this.order,
      }).then((res) => {
        if (res.code == 1) {
          console.log(res);
          this.listsAll = res.data;
          if (res.data.question["1"]) {
            this.list1 = res.data.question["1"];
          }
          if (res.data.question["2"]) {
            this.list2 = res.data.question["2"];
          }
          if (res.data.question["3"]) {
            this.list3 = res.data.question["3"];
          }
          if (res.data.question["4"]) {
            this.list4 = res.data.question["4"];
          }
          if (res.data.question["5"]) {
            this.list5 = res.data.question["5"];
          }
          return;
        }
        this.$message({
          message: res.message,
          type: "error",
          duration: 2 * 1000,
          onClose: () => {
            this.$router.go(-1);
          },
        });
      });
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
  font-size: 1.28rem;
  line-height: 1;
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
