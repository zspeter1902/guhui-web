<template>
  <div class="service-container">
    <el-checkbox-group v-model="checkedServices" :disabled="disabled" @change="onChange">
      <el-row v-for="item in services" :key="item.id" type="flex" class="flex-wrap item">
        <h5 class="name">{{ item.dictName }}</h5>
        <div class="flex-auto">
          <el-checkbox v-for="service in item.children" :key="service.id" :label="service.dictCode">{{ service.dictName }}</el-checkbox>
        </div>
      </el-row>
    </el-checkbox-group>
  </div>
</template>

<script>
import { getDictList } from '@/api/global'
export default {
  props: {
    list: {
      type: String,
      default: ''
    },
    check: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkedServices: [],
      services: []
    }
  },
  watch: {
    check(newVal) {
      if (newVal) {
        this.checkedServices = newVal.split(',')
      }
    }
  },
  created() {
    this.getServiceList()
    if (this.list) {
      this.initList()
    }
  },
  methods: {
    getServiceList() {
      getDictList('warehouse_service').then(res => {
        this.services = res.list[0].children
      })
    },
    initList() {
      const list = this.list.split(',')
      const newArr = []
      for (const item of this.services) {
        const o = Object.assign({}, item, { children: [] })
        for (const child of item.children) {
          if (list.includes(child.dictCode)) {
            o.child.push(child)
          }
        }
        newArr.push(o)
      }
      this.$set(this, 'services', newArr)
    },
    onChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
.service-container {
  .item {
    width: 100%;
    margin-bottom: 5px;
  }
  .name {
    width: 180px;
    margin-right: 12px;
    font-size: 14px;
  }
  .el-checkbox {
    // min-width: 180px;
    margin-bottom: 5px;
    width: calc(25% - 30px);
  }
  ::v-deep {
    .el-checkbox__inner {
      width: 16px;
      height: 16px;
      &::after {
        left: 5px;
        top: 2px;
      }
    }
    .el-checkbox__input.is-checked{
      .el-checkbox__inner{
        background-color: $mainColor;
        border-color: $mainColor;
      }
      & + .el-checkbox__label {
        color: $mainColor;
      }
    }
  }
}
</style>
