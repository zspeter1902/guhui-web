<template>
  <div v-if="false" class="search-select">
    <el-row type="flex" class="select-tab flex-wrap">
      <h5 class="select-title flex-fixed">产品类别</h5>
      <el-radio-group v-model="keyword" size="small" :text-color="variables.menuColor" :fill="variables.helpColor" @change="onChange">
        <el-radio-button v-for="info of typeList" :key="info.catId" :label="info.name">{{ info.name }}</el-radio-button>
      </el-radio-group>
    </el-row>
  </div>
</template>

<script>
import variables from '@/styles/variables.scss'
import { getProductType } from '@/api/global'
export default {
  // 定义属性
  data() {
    return {
      keyword: '',
      typeList: []
    }
  },
  computed: {
    variables() {
      return variables
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getType()
  },
  // 方法集合
  methods: {
    getType() {
      getProductType().then(res => {
        this.typeList = res.data
      })
    },
    onChange(val) {
      this.$emit('select', val)
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
