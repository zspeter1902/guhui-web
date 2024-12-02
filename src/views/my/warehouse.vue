<template>
  <div class="my-table">
    <!-- 列表 -->
    <el-row type="flex" :gutter="12" class="filter-container flex-wrap">
      <el-col :lg="6" :sm="9" :xs="24">
        <el-input v-model="listQuery.wareName" placeholder="请输入海外仓名称" size="small" class="filter-item" @keyup.enter.native="handleFilter" />
      </el-col>
      <el-col :lg="3" :sm="5" :xs="12">
        <el-select v-model="listQuery.state" placeholder="请选择" size="small" clearable class="filter-item">
          <el-option v-for="(value, key) in productStatus" :key="key" :label="value" :value="key" />
        </el-select>
      </el-col>
      <el-col :lg="3" :sm="5" :xs="12">
        <el-select v-model="listQuery.examine" placeholder="请选择" size="small" clearable class="filter-item">
          <el-option v-for="(value, key) in auditStatus" :key="key" :label="value" :value="key" />
        </el-select>
      </el-col>
      <el-col :lg="8">
        <el-button v-waves class="filter-item" type="primary" size="small" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves class="filter-item" type="primary" size="small" icon="el-icon-upload2" @click="handleOnShelf()">
          上架
        </el-button>
        <el-button v-waves class="filter-item" type="primary" size="small" icon="el-icon-download" @click="handleOffShelf()">
          下架
        </el-button>
      </el-col>
    </el-row>
    <!-- table列表 -->
    <el-table
      ref="table"
      v-loading="loading"
      fit
      row-key="id"
      highlight-current-row
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :width="isMobile ? '36' : '50'" />
      <el-table-column
        prop="wareName"
        label="海外仓名称"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <router-link :to="'/overseas/detail/' + row.id">
            {{ row.wareName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="geographicPosition"
        label="地理位置"
        min-width="80"
        align="center"
      />
      <el-table-column
        prop="examine"
        label="审核状态"
        min-width="80"
        align="center"
      >
        <template slot-scope="{ row }">
          <el-tag size="medium" :type="row.examine | tagState">{{ auditStatus[row.examine] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        label="产品状态"
        min-width="80"
        align="center"
      >
        <template slot-scope="{ row }">
          <!-- success warning -->
          <el-tag size="medium" :type="row.state | tagState">{{ productStatus[row.state] }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-if="!isMobile"
        prop="createTime"
        label="创建日期"
        sortable
        align="center"
        min-width="100"
      >
        <template slot-scope="{ row }">
          {{ parseTime(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="!isMobile"
        prop="address"
        label="操作"
        align="center"
        min-width="210"
        fixed="right"
      >
        <template slot-scope="{row, $index}">
          <el-button
            v-if="row.state != 1"
            v-waves
            size="mini"
            type="primary"
            plain
            @click="handleOnShelf($index, row)"
          >上架</el-button>
          <el-button
            v-else
            v-waves
            size="mini"
            type="primary"
            plain
            @click="handleOffShelf($index, row)"
          >下架</el-button>
          <el-button
            v-waves
            size="mini"
            type="primary"
            plain
            @click="handleDelete($index, row)"
          >删除</el-button>
          <el-button
            v-waves
            size="mini"
            type="primary"
            plain
            @click="handleEdit($index, row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import Pagination from '@/components/Pagination'
import { getWarehouseOwner, putoffWarehouse, putonWarehouse, removeWarehouse } from '@/api/company'
import { parseTime } from '@/utils'
import { getDictMap } from '@/api/global'
export default {
  name: 'MyWarehouse',
  components: { Pagination },
  directives: {
    waves
  },
  filters: {
    tagState(code) {
      const states = {
        '0': 'warning',
        '1': 'success',
        '2': 'danger'
      }
      return states[code]
    }
  },
  data() {
    return {
      loading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        wareName: '',
        examine: '',
        state: ''
      },
      multipleSelection: [],
      productStatus: {},
      auditStatus: {},
      tableData: []
    }
  },
  computed: {
    isMobile({ $store }) {
      return $store.getters.device === 'mobile'
    }
  },
  created() {
    this.getDict()
    this.getList()
  },
  methods: {
    getDict() {
      getDictMap('audit').then(res => {
        this.auditStatus = res.data
      })
      getDictMap('listed_state').then(res => {
        this.productStatus = res.data
      })
    },
    parseTime(time) {
      return parseTime(new Date(time.replace(/-/g, '/')), '{y}-{m}-{d}')
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleOnShelf(index, row) {
      let ids = []
      if (index >= 0) {
        ids.push(row.id)
        putonWarehouse(ids).then(res => {
          this.$message.success('上架成功！')
          this.getList()
        })
        return
      }
      if (this._isSelection()) {
        ids = this.multipleSelection.map(item => item.id)
        putonWarehouse(ids).then(res => {
          this.$message.success('上架成功！')
          this.getList()
        })
      }
    },
    handleOffShelf(index, row) {
      let ids = []
      if (index >= 0) {
        ids.push(row.id)
        putoffWarehouse(ids).then(res => {
          this.$message.success('下架成功！')
          this.getList()
        })
        return
      }
      if (this._isSelection()) {
        ids = this.multipleSelection.map(item => item.id)
        putoffWarehouse(ids).then(res => {
          this.$message.success('下架成功！')
          this.getList()
        })
      }
    },
    handleEdit(index, row) {
      this.$router.push('/my/info/storehouse-edit/' + row.id)
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeWarehouse([row.id]).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.tableData.splice(index, 1)
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getList() {
      this.loading = true
      getWarehouseOwner(this.listQuery).then(res => {
        this.tableData = res.page.list
        this.total = res.page.totalCount
        this.loading = false
      }).catch(() => {
        this.loading = false
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
.my-table {
  width: 100%;
  .filter-container {
    .el-select {
      width: 100%;
    }
    .el-col {
      margin-top: 12px;
    }
  }
  .el-table {
    margin-top: 20px;
    a {
      &:hover {
        color: $mainColor;
      }
    }
    ::v-deep {
      th {
        background-color: #f8f8f8;
      }
    }
  }
}
@media only screen and (max-width:1199px){
}
@media only screen and (max-width:991px){
}
@media only screen and (max-width:767px){
}
</style>
