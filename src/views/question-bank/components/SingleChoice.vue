<template>
  <div class="topic-info">
    <div class="flex jc-between ai-center">
      <h4 class="title">第{{ order }}题 单项选择题</h4>
    </div>
    <div class="topic-title-info" v-text="info.quesTitle" />
    <ul class="topic-content">
      <template v-for="(value, key, index) in questionMap">
        <li
          v-if="index <= optionIndex"
          :key="index"
          class="flex"
          :class="{
            selected: current == optionName[index]
          }"
        >
          <a class="item" href="javascript:;" rel="noopener noreferrer" @click="onChange(index)">
            <span class="icon">{{ optionName[index] }}.</span>
            <span class="option" v-text="info[key]" />
          </a>
        </li>
      </template>
    </ul>
    <el-row type="flex" justify="center">
      <el-button v-if="isBtn('prev')" class="btn" type="primary" :disabled="order === 1" @click.prevent="onPrev">上一题</el-button>
      <el-button v-if="isBtn('pause') && doing" class="btn" type="primary" @click.prevent="onPause">暂停</el-button>
      <el-button v-if="isBtn('next') && order !== total" class="btn" type="primary" :disabled="order === total" @click.prevent="onNext">下一题</el-button>
      <el-button v-if="order === total && doing" class="btn" type="primary" :disabled="order !== total" @click.prevent="onComplete">结束考试</el-button>
    </el-row>
    <!-- 解析 -->
    <mark v-if="status !== '2' && current" class="parse">
      <h4 class="title">试题解析:</h4>
      <ul>
        <template v-for="(value, key, index) in questionMap">
          <li v-if="index <= optionIndex" :key="index">
            {{ optionName[index] + ' ' + info[value] }}
          </li>
        </template>
        <li class="answer">
          正确答案是: {{ info.answer }}
        </li>
      </ul>
    </mark>
  </div>
</template>

<script>
export default {
  name: 'SingleChoice',
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    total: {
      type: Number,
      default: 0
    },
    order: {
      type: Number,
      default: 1
    },
    doing: {
      type: Boolean,
      default: false
    },
    btn: {
      type: String,
      default: 'pause, next'
    },
    status: {
      type: String,
      default: '2'
    }
  },
  data() {
    return {
      optionName: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      questionMap: {
        'ansA': 'ansAInfo',
        'ansB': 'ansBInfo',
        'ansC': 'ansCInfo',
        'ansD': 'ansDInfo',
        'ansE': 'ansEInfo'
      },
      current: null
    }
  },
  computed: {
    optionIndex({ info, questionMap }) {
      let index = 0
      for (const key in questionMap) {
        if (info[key] && key !== 'ansA') {
          index++
        }
      }
      return index
    }
  },
  watch: {
    'info.answerSelf': {
      handler(newVal, oldVal) {
        if (newVal) {
          this.current = newVal
        }
      }
      // deep: true
    }
  },
  methods: {
    isBtn(val) {
      return this.btn.indexOf(val) > -1
    },
    onPrev() {
      this.$emit('prev')
    },
    onPause() {
      this.$emit('pause')
    },
    onComplete() {
      this.$emit('complete', {
        id: this.info.id,
        answer: this.current
      })
    },
    onNext() {
      if (!this.current && this.doing) {
        this.$message.info('您需要选择一项答案！')
        return
      }
      this.$emit('next', {
        id: this.info.id,
        answer: this.current
      })
    },
    onChange(index) {
      if (!this.doing) {
        return
      }
      this.current = this.optionName[index]
    }
  }
}
</script>
<style scoped>
.title {
  position: relative;
  margin: 18px 0;
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  color: #333;
}
.topic-info {
  margin-bottom: 10px;
  padding: 0 15px;
}
.topic-info img {
  width: 14px;
}
.topic-title-info {
  margin-bottom: 30px;
  line-height: 36px;
  color: #333;
  font-size: 18px;
}
.topic-content li {
  margin-top: 10px;
  border-radius: 10px;
  font-size: 18px;
  color: #666;
  background-color: #fafbfd;
}
.topic-content li .item {
  display: block;
  padding: 16px 12px;
  color: inherit;
  line-height: 24px;
}
.topic-content li .icon {
  flex: 0 0 auto;
  display: inline-block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 14px;
  vertical-align: middle;
}
.topic-content li .option {
  vertical-align: middle;
}
.topic-content .icon {
  margin-right: 4px;
}

.topic-content li.selected.error {
  background-color: #fef5f6;
  color: #f5444c;
}
.topic-content li.selected.error .icon {
  background-color: #f5444c;
  color: #fff;
}
.topic-content li.selected {
  background-color: #f7f9ff;
  color: #5b8dfe;
}
.topic-content li.selected .icon {
  background-color: #5b8dfe;
  color: #fff;
}

.topic-content li.right {
  background-color: #f7f9ff;
  color: #5b8dfe;
}
.topic-content li.right .icon {
  background-color: #5b8dfe;
  color: #fff;
}
.btn {
  margin-top: 20px;
}
.parse {
  display: block;
  width: 100%;
  margin-top: 30px;
  padding: 15px 20px;
}
.answer {
  font-weight: bold;
  color: green
}
</style>
