<template>
  <div class="search-select">
    <el-row type="flex" class="select-tab flex-wrap">
      <h5 class="select-title flex-fixed">起始国家/地区</h5>
      <el-radio-group v-model="start" size="small" :text-color="variables.menuColor" :fill="variables.helpColor" @change="onChangeStart">
        <el-radio-button v-for="info of startArea" :key="info.dictCode" :label="info.dictCode">{{ info.dictName }}</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-row type="flex" class="select-tab flex-wrap">
      <h5 class="select-title flex-fixed">目标国家/地区</h5>
      <el-radio-group v-model="end" size="small" :text-color="variables.menuColor" :fill="variables.helpColor" @change="onChangeEnd">
        <el-radio-button v-for="info of endArea" :key="info.dictCode" :label="info.dictCode">{{ info.dictName }}</el-radio-button>
      </el-radio-group>
    </el-row>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
import { getDictList } from '@/api/global'
export default {
  // 定义属性
  data() {
    return {
      start: '',
      end: '',
      startArea: [],
      endArea: []
    }
  },
  computed: {
    variables() {
      return variables
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getAreaList()
  },
  // 方法集合
  methods: {
    getAreaList() {
      getDictList('logistics_start').then(res => {
        this.startArea = res.list[0].children
      })
      getDictList('logistics_end').then(res => {
        this.endArea = res.list[0].children
      })
    },
    onChangeStart(val) {
      this.$emit('start', val)
    },
    onChangeEnd(val) {
      this.$emit('end', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.search-select {
  padding: 16px 24px;
  margin-bottom: 16px;
  border-radius: 6px;
  background-color: #fff;
  // .select-tab {
  //   margin-bottom: 10px;
  // }
  .select-title {
    width: 100px;
    font-size: 14px;
    line-height: 40px;
  }
  ::v-deep {
    .el-radio-button {
      margin-right: 0px;
      // margin-bottom: 5px;
    }
    .el-radio-button__inner {
      // min-width: 120px;
      border: none;
      background-color: transparent;
    }
    .el-radio-button--small .el-radio-button__inner {
      font-size: 14px;
      border-radius: 2px;
    }
  }
}
@media only screen and (max-width:1199px){
  .search-select {
    padding: 30px 24px 20px;
    .select-title {
      line-height: 48px;
    }
  }
}
@media only screen and (max-width:991px){
  .search-select {
    padding: 24px 20px 15px;
    .select-title {
      line-height: 46px;
    }
    .select-tab {
      margin-bottom: 15px;
    }
  }
}
@media only screen and (max-width:767px){
  .search-select {
    padding: 15px 15px;
    margin-bottom: 10px;
    .select-tab {
      margin-bottom: 10px;
    }
    .select-title {
      width: 100%;
      line-height: 42px;
    }
    ::v-deep {
      .el-radio-button {
        margin-right: 10px;
      }
    }
  }
}
</style>
