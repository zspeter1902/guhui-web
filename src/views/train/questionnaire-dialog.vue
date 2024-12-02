<template>
  <el-dialog title="调查问卷" :visible.sync="visible" center>
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px" label-position="top" class="submit-form">
      <el-form-item v-for="item of question" :key="item.param" :label="item.title + (item.multiple ? '(多选)' : '')" :prop="item.param" :rules="[{ required: true, message: '问卷不能为空', trigger: 'blur' }]">
        <el-select v-if="item.children" v-model="formData[item.param]" :multiple="item.multiple" placeholder="请选择">
          <el-option v-for="(opt, cIndex) of item.children" :key="cIndex" :value="opt" :label="opt" />
        </el-select>
        <el-input v-else v-model="formData[item.param]" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button class="btn" @click="close('form')">取消</el-button>
      <el-button type="primary" class="btn" :disabled="loading" @click="onSubmit('form')">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addQuestionnaire } from '@/api/content'
export default {
  props: {
    info: {
      type: String,
      default: '',
      require: true
    }
  },
  // 定义属性
  data() {
    return {
      loading: false,
      visible: false,
      id: null,
      formData: {
      },
      rules: {
        region: [
          { required: true, message: '城市不能为空', trigger: 'blur' }
        ]
      },
      questionnaireInfo: ''
    }
  },
  computed: {
    question({ info }) {
      if (!info) { return [] }
      const originList = info.split(';')
      const questionList = []
      for (const item of originList) {
        if (item) {
          const arr = item.split(':')
          const obj = {
            param: arr[0],
            title: arr[1]
          }
          if (arr[1].includes('(') && arr[1].includes(')')) {
            const sIndex = arr[1].indexOf('(')
            const eIndex = arr[1].indexOf(')')
            const str = arr[1].substring(sIndex + 1, eIndex)
            obj.title = arr[1].substring(0, sIndex)
            obj.multiple = false
            obj.children = str.split(',')
          } else if (arr[1].includes('[') && arr[1].includes(']')) {
            const sIndex = arr[1].indexOf('[')
            const eIndex = arr[1].indexOf(']')
            const str = arr[1].substring(sIndex + 1, eIndex)
            obj.title = arr[1].substring(0, sIndex)
            obj.multiple = true
            obj.children = str.split(',')
          }
          questionList.push(obj)
        }
      }
      return questionList
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
  },
  // 方法集合
  methods: {
    open(id) {
      this.id = id
      this.visible = true
    },
    close() {
      this.visible = false
    },
    onSubmit(formName) {
      let col = ''
      if (this.question.length) {
        for (const item of this.question) {
          if (Array.isArray(this.formData[item.param])) {
            col += item.title + ':' + this.formData[item.param].join(',') + ';'
          } else if (this.formData[item.param]) {
            col += item.title + ':' + this.formData[item.param] + ';'
          }
        }
        this.questionnaireInfo = col
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          addQuestionnaire({
            id: this.id,
            questionnaireInfo: this.questionnaireInfo
          }).then(res => {
            this.visible = false
            this.$message.success('提交成功!')
            this.$emit('change-status', 3)
            this.$emit('get-code', res.data.questionnaireCode)
            this.$nextTick(() => {
              this.loading = false
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-form {
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-select {
    width: 100%;
  }
  ::v-deep {
    .el-form-item__label {
      line-height: 24px;
    }

  }
}
.el-select-dropdown {
  max-width: 100%;
}
::v-deep {
  .el-dialog__title {
    // fz24
  }
  .el-select-dropdown {
    max-width: 100%;
  }
}
</style>
