<template>
  <div class="my-collect">
    <!-- 列表 -->
    <el-row type="flex" :gutter="12" align="middle" class="filter-container flex-wrap">
      <el-col :lg="7" :sm="9" :xs="24">
        <el-input v-model="listQuery.key" placeholder="请输入产品名称" size="small" class="filter-item" @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :lg="3" :sm="5" :xs="12">
        <el-select v-model="listQuery.serviceType" placeholder="请选择" size="small" clearable class="filter-item">
          <el-option v-for="item of types" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" />
        </el-select>
      </el-col>
      <el-col :lg="5" :sm="10">
        <el-button v-waves class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves class="filter-item" type="primary" size="small" @click="handleShow">
          {{ isCheckShow ? '取消管理' : '批量管理' }}
        </el-button>
      </el-col>
      <el-col :lg="9">
        <el-checkbox v-show="isCheckShow" v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <el-link v-show="isCheckShow" :underline="false" @click="onDeleteAll"><i class="el-icon-delete el-icon--left" />删除选中</el-link>
      </el-col>
    </el-row>

    <!-- 列表 -->
    <el-checkbox-group v-model="checked" @change="handleCheckedChange">
      <ul class="collect-list">
        <li v-for="item of lists" :key="item.id" class="collect-item" @mouseenter="onMouseenter(item)" @mouseleave="onMouseleave(item)">
          <card :info="item" />
          <transition name="fade">
            <el-checkbox-button v-show="isCheckShow" :label="item.id"><i class="el-icon-check" /></el-checkbox-button>
          </transition>
          <transition name="fade">
            <el-link v-show="item.show" type="primary" class="btn-delete" :underline="false" @click="onDelete(item)"><i class="el-icon-delete el-icon--left" />删除</el-link>
          </transition>
        </li>
      </ul>
    </el-checkbox-group>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves/index.js' // 水波纹指令
import { getCollectList, removeCollect } from '@/api/user'
export default {
  name: 'MyCollectProduct',
  components: {
    Pagination: () => import('@/components/Pagination'),
    Card: () => import('./components/Card.vue')
  },
  directives: {
    waves
  },
  data() {
    return {
      loading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 6,
        key: '',
        serviceType: ''
      },
      multipleSelection: [],
      lists: [],
      isCheckShow: false,
      isIndeterminate: false,
      checkAll: false,
      checked: []
    }
  },
  computed: {
    types({ $store }) {
      const list = $store.getters.navList.filter(item => item.dictName.includes('跨境汇'))
      return list[0].children
    },
    isMobile({ $store }) {
      return $store.getters.device === 'mobile'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    onMouseenter(item) {
      this.$set(item, 'show', true)
    },
    onMouseleave(item) {
      this.$set(item, 'show', false)
    },
    onDelete(item) {
      const ids = [item.id]
      removeCollect(ids).then(res => {
        this.getList()
        this.$message.success('已移除收藏！')
      })
    },
    onDeleteAll() {
      if (!this.checked.length) {
        this.$message.warning('请选择产品！')
        return
      }
      removeCollect(this.checked).then(res => {
        this.getList()
        this.$message.success('已移除选中收藏！')
      })
    },
    handleCheckAllChange(val) {
      this.checked = val ? this.lists.map(item => item.id) : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.lists.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.lists.length
    },
    handleShow() {
      this.isCheckShow = !this.isCheckShow
    },
    getList() {
      getCollectList('product', this.listQuery).then(res => {
        this.lists = res.page.list
        this.total = res.page.totalCount
      })
    },
    // 是否有商品选择项
    _isSelection() {
      this.$message.closeAll()
      if (!this.multipleSelection.length) {
        this.$message({
          message: '您需要先选择产品！',
          duration: 1500,
          offset: 120
        })
        return false
      }
      return true
    },
    // 清除选择
    _clearSelection() {
      if (this.multipleSelection.length) {
        this.$refs.table.clearSelection()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
.my-collect {
  width: 100%;
  .filter-container {
    .el-select {
      width: 100%;
    }
    .el-col {
      margin-top: 12px;
    }
    .el-link {
      margin-left: 12px;
    }
  }
  .collect-list {
    margin-top: 10px;
    overflow: hidden;
    .collect-item {
      margin-top: 20px;
      position: relative;
    }
    .btn-delete {
      position: absolute;
      right: 20px;
      top: 20px;
      z-index: 2;
    }
    .el-checkbox-button {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      ::v-deep {
        .el-checkbox-button__inner {
          width: 50px;
          height: 50px;
          padding: 8px 12px 12px 6px;
          font-size: 24px;
          border-bottom-right-radius: 50px;
          border: none;
        }
      }
    }
    .card {
      border: 1px solid #e5e5e5;
    }
  }
}
::v-deep {
  .el-checkbox-button__inner {
    color: #fff;
    background-color: #e5e5e5;
  }
}
@media only screen and (max-width:1199px){
}
@media only screen and (max-width:991px){
}
@media only screen and (max-width:767px){
}
</style>
