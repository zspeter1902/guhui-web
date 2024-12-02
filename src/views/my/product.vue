<template>
  <div class="my-table">
    <!-- 列表 -->
    <el-row type="flex" :gutter="12" class="filter-container flex-wrap">
      <el-col :lg="6" :sm="9" :xs="24">
        <el-input v-model="listQuery.key" placeholder="请输入产品名称" size="small" class="filter-item" @keyup.enter.native="handleFilter" />
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
        <el-button v-waves class="filter-item" type="primary" size="small" icon="el-icon-upload2" @click="puton()">
          上架
        </el-button>
        <el-button v-waves class="filter-item" type="primary" size="small" icon="el-icon-download" @click="putoff()">
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
        prop="title"
        label="产品名称"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <router-link :to="'/service/detail/' + row.id">
            {{ row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="categoryP"
        label="产品品类"
        min-width="80"
        align="center"
      >
        <template slot-scope="{ row }">
          {{ typesMap[row.categoryP] }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="!isMobile"
        prop="categoryC"
        label="子品类"
        min-width="80"
        align="center"
      >
        <template slot-scope="{ row }">
          {{ typesMap[row.categoryC] }}
        </template>
      </el-table-column>
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
            @click="puton(row)"
          >上架</el-button>
          <el-button
            v-else
            v-waves
            size="mini"
            type="primary"
            plain
            @click="putoff(row)"
          >下架</el-button>
          <el-button
            v-waves
            size="mini"
            type="primary"
            plain
            @click="handleDelete(row)"
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
import { getProductListOwner, putoffProduct, putonProduct, removeProduct } from '@/api/company'
import { parseTime } from '@/utils'
import { getDictList, getDictMap } from '@/api/global'
export default {
  name: 'MyProduct',
  components: { Pagination },
  directives: {
    waves
  },
  filters: {
    tagState(code) {
      const states = {
        '0': 'warning',
        '1': 'success',
        '2': 'info'
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
        key: '',
        type: '1', // 1 产品 2 需求
        examine: '',
        state: ''
      },
      multipleSelection: [],
      productStatus: {},
      auditStatus: {},
      tableData: [],
      typesMap: {}
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
      getDictMap('portal_service').then(res => {
        this.typesMap = res.data
      })
    },
    parseTime(time) {
      return parseTime(new Date(time.replace(/-/g, '/')), '{y}-{m}-{d}')
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleEdit(index, row) {
      this.$router.push(`/my/info/product-edit/${row.id}`)
    },
    handleDelete(row) {
      const ids = [row.id]
      removeProduct(ids).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
      })
    },
    puton(row) {
      // row.status = status
      const ids = row ? [row.id] : this.multipleSelection.map(item => item.id)
      putonProduct(ids).then(res => {
        this.getList()
        this.$message({
          message: res.msg,
          type: 'success'
        })
      })
    },
    putoff(row) {
      const ids = row ? [row.id] : this.multipleSelection.map(item => item.id)
      putoffProduct(ids).then(res => {
        this.getList()
        this.$message({
          message: res.msg,
          type: 'success'
        })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getList() {
      this.loading = true
      getProductListOwner(this.listQuery).then(res => {
        this.tableData = res.page.list
        this.total = res.page.totalCount
        this.loading = false
      }).catch((err) => {
        this.loading = false
        this.$message.error(err)
        this.$router.go(-1)
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
