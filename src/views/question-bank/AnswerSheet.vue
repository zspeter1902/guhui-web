<template>
  <div class="parse-box text-left">
    <el-row type="flex" align="middle" justify="space-between" class="state">
      <p><span class="cycle" />未做 : {{ total - done }}</p>
      <p><span class="cycle right" />已做 : {{ done }}</p>
    </el-row>
    <div class="list">
      <el-row v-if="lists.length" type="flex" tag="ul" class="flex-wrap text-center">
        <template v-for="(item, index) of sheetList">
          <li
            :key="item.id"
            :class="item.classObj"
          >
            <el-link :underline="false" @click.prevent="onSelect(index)">
              <span>{{ index + 1 }}</span>
            </el-link>
          </li>
        </template>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnswerSheet',
  props: {
    lists: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sheetList: [],
      done: 0
    }
  },
  watch: {
    lists: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.sheetList = newVal.map(item => {
            const classObj = this.judgment(item)
            item.classObj = classObj
            return item
          })
        }
      },
      deep: true
    }
  },
  methods: {
    onSelect(index) {
      this.$emit('select', index)
    },
    judgment(item) {
      const { answer, answerSelf } = item
      const classObj = { right: false, error: false }
      if (answer && answerSelf) {
        this.done++
        const rightAnswer = answer.split('、').sort()
        const userAnswer = answerSelf.split(',').sort()
        classObj.right = rightAnswer.toString() === userAnswer.toString()
        classObj.error = !classObj.right
      }
      return classObj
    }
  }
}
</script>
<style scoped>
.parse-box {
  min-width: 280px;
  /* width: 100%; */
  padding: 0 15px;
}
.state {
  height: 42px;
  padding: 0 15px;
  background-color: #f8f8f8;
}
.state p {
  margin: 0 18px 0 0;
  font-size: 14px;
  color: #666;
  line-height: 1;
}
.state .cycle {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 5px;
  border-radius: 6px;
  border: 1px solid #e7e7e7;
  background-color: #e7e7e7;
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
  margin-top: 10px;
  padding: 0 15px;
  margin-bottom: 8px;
  overflow: hidden;
}
.list h5 {
  margin: 20px 0 8px;
  font-size: 14px;
  color: #333;
  font-weight: normal;
}
.list ul {
  margin: 0 -12px;
}
.list span {
  display: inline-block;
  width: 36px;
  height: 36px;
  margin: 10px 10px;
  border: 1px solid #e7e7e7;
  background-color: #e7e7e7;
  line-height: 36px;
  color: #666;
  font-size: 14px;
  border-radius: 18px;
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
</style>
