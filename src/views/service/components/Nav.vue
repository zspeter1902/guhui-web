<template>
  <nav class="service-nav">
    <div class="container">
      <el-scrollbar ref="scroll" class="service-scroll">
        <el-row type="flex" tag="ul">
          <li v-for="item of navList" :key="item.dictCode" class="nav-item flex-fixed" :class="{ active: activeMenu(item)}">
            <el-link :underline="false" class="nav-link" @click="onTap(item)">{{ item.dictName }}</el-link>
          </li>
        </el-row>
      </el-scrollbar>
    </div>
  </nav>
</template>

<script>
// import serviceRouter from '@/router/modules/service'
export default {
  data() {
    return {
      active: null,
      activeId: null
    }
  },
  computed: {
    navList({ $store }) {
      const list = $store.getters.navList.filter(item => ['portal_service'].includes(item.dictCode))
      return list[0].children
      // const list = serviceRouter.children
      // return list.slice(2)
    },
    firstId({ navList }) {
      return navList[0] && navList[0].dictCode
    }
    // activeId({ $route }) {
    //   return $route.params.type
    // }
  },
  watch: {
    '$route': 'routeUpdate'
  },
  created() {
    this.activeId = this.$route.params.type
  },
  mounted() {
    // 初始项
    this.initActive()
  },
  // 方法集合
  methods: {
    routeUpdate(to) {
      this.activeId = to.params.type
      if (this.activeId === 'index') {
        const item = this.navList[0]
        this.$emit('nav', item)
        this.$nextTick(() => {
          this.$EventBus.$emit('navRoute', item, this.activeId)
        })
        return
      }
      const reg = new RegExp(this.activeId + '$')
      this.navList.map(item => {
        const isHave = item.dictCode.includes(this.activeId) || item.children.some(item => reg.test(item.dictCode))
        if (isHave) {
          this.$emit('nav', item)
          this.$nextTick(() => {
            this.$EventBus.$emit('navRoute', item, this.activeId)
          })
        }
      })
    },
    initActive() {
      if (this.activeId === 'index') {
        const item = this.navList[0]
        this.$emit('nav', item)
        this.$nextTick(() => {
          this.$EventBus.$emit('navRoute', item, this.activeId)
        })
        return
      }
      const reg = new RegExp(this.activeId + '$')
      this.navList.map(item => {
        const isHave = item.dictCode.includes(this.activeId) || item.children.some(item => reg.test(item.dictCode))
        if (isHave) {
          this.$emit('nav', item)
          this.$nextTick(() => {
            this.$EventBus.$emit('navRoute', item, this.activeId)
          })
        }
      })
    },
    activeMenu(item) {
      const reg = new RegExp(this.activeId + '$')
      return reg.test(item.dictCode) || item.children.some(item => reg.test(item.dictCode))
    },
    onTap(item, index) {
      // this.active = item.dictCode
      if (item.dictCode === 'cross_overseas') {
        this.$router.push('/overseas')
        return
      }
      this.activeId = this.parseCode(item.dictCode)
      this.$emit('nav', item)
      this.$nextTick(() => {
        this.$EventBus.$emit('nav', item)
      })
      this.scroll(index)
    },
    scroll(index) {
      this.$refs['scroll'].wrap.scrollLeft = 104 * (index - 1)
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
.service {
  &-nav {
    height: 58px;
    background-color: #fff;
    box-shadow: 0px 1px 5px rgba($color: #000000, $alpha: .1);
    overflow: hidden;
  }
  &-scroll {
    height: 75px;
    width: 100%;
    .nav-item {
      display: inline-block;
      &.active {
        .nav-link {
          color: $mainColor;
          &::after {
            width: 120%;
          }
        }
      }
    }
    .nav-link {
      padding: 20px 0px;
      margin-right: 40px;
      color: #666;
      font-size: 16px;
      user-select: none;
      transition: .3s ease;
      &::after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        transform: translateX(-50%);
        background-color: $mainColor;
        transition: .3s ease;
      }
      &:hover {
        color: $mainColor;
      }
    }
  }
}
</style>
