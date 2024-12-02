<template>
  <div v-if="sideList.children && sideList.children.length" class="sidebar">
    <dl>
      <dt class="sidebar-title">{{ sideList.dictName }}</dt>
      <el-row type="flex" :gutter="16" class="flex-wrap">
        <el-col v-for="item of sideList.children" :key="item.dictCode" :xs="12" :sm="8" :md="24" class="sidebar-item text-center" :class="{active: isContain(item.dictCode)}" tag="dd">
          <el-link :underline="false" class="sidebar-link" @click="onTap(item)">{{ item.dictName }}</el-link>
        </el-col>
      </el-row>
    </dl>
  </div>
</template>

<script>
export default {
  // 定义属性
  data() {
    return {
      sideList: {},
      activeId: null
    }
  },
  computed: {
    firstId({ sideList }) {
      if (sideList.children && sideList.children.length) {
        const arr = sideList.children[0].dictCode.split('_')
        return arr[arr.length - 1]
      }
      return ''
    }
    // activeId({ $route }) {
    //   return $route.params.type
    // }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.activeId = this.$route.params.type
    this.$EventBus.$on('nav', item => {
      this.sideList = item
      this.$nextTick(() => {
        if (item.children.length) {
          this.$router.push({
            params: {
              type: this.isContainItem() ? this.activeId : this.firstId
            },
            query: {
              q: this.$route.query.q
            }
          })
          this.activeId = this.firstId
        }
      })
    })
    this.$EventBus.$on('navRoute', (item, parentId) => {
      this.sideList = item
      // hasOwnProperty
      this.$nextTick(() => {
        if (parentId === 'index') {
          // const current = item.children[0]
          this.$router.push({
            params: {
              type: this.firstId
            },
            query: {
              q: this.$route.query.q
            }
          })
          this.activeId = this.firstId
          return
        }
        if (item.children.length) {
          const reg = this.isContainItem(parentId) ? new RegExp(parentId + '$') : new RegExp(this.firstId + '$')
          const current = item.children.filter(o => reg.test(o.dictCode))
          if (this.isContainItem(parentId)) {
            this.activeId = this.parseCode(current[0].dictCode)
            this.$emit('tap', current.length ? current[0].dictCode : item.children[0].dictCode)
          } else {
            // this.$router.replace({
            //   params: {
            //     type: this.firstId
            //   },
            //   query: {
            //     q: this.$route.query.q
            //   }
            // })
            this.activeId = this.firstId
            this.$emit('tap', item.children[0].dictCode)
          }
        }
      })
    })
  },
  // 方法集合
  methods: {
    isContain(code) {
      const reg = new RegExp(this.activeId + '$')
      return reg.test(code)
    },
    isContainItem(parentId) {
      const reg = new RegExp(parentId + '$')
      if (this.sideList.children && this.sideList.children.length) {
        const bull = this.sideList.children.some(item => reg.test(item.dictCode))
        return bull
      }
    },
    onTap(item) {
      const type = this.parseCode(item.dictCode)
      this.$router.push({
        params: {
          type: type
        },
        query: {
          q: this.$route.query.q
        }
      })
      this.activeId = type
      // this.$emit('tab', item.dictCode)
    },
    parseCode(code) {
      const arr = code.split('_')
      const type = arr[arr.length - 1]
      return type
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.sidebar {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: 10px 20px 20px;
  margin-bottom: 30px;
  border: 1px solid #e5e5e5;
  border-top: 2px solid $mainColor;
  background-color: #fff;
}
.sidebar-title {
  margin-bottom: 10px;
  font-size: 18px;
  color: $mainColor;
  line-height: 38px;
  font-weight: bold;
}
.sidebar-link {
  position: relative;
  display: block;
  font-size: 16px;
  line-height: 38px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: .3s ease;
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $mainColorHover;
    transform: rotateY(90deg);
    transform-origin: right;
    transition: transform .3s ease;
    z-index: -1;
  }
  &:hover {
    color: #fff;
    border-color: $mainColorHover;
    &::before {
      width: 100%;
      transform: rotateY(0deg);
      transform-origin: left;
    }
  }
}
.active {
  .sidebar-link {
    color: #fff;
    background-color: $mainColor;
    border-color: $mainColor;
  }
}
.sidebar-item {
  margin-bottom: 20px;
}
</style>
