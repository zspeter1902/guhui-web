<template>
  <div ref="wrapper" class="gulu-sticky-wrapper" :style="{height}">
    <div ref="sticky" class="gulu-sticky" :class="{sticky}" :style="{left,width,top}">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    distance: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sticky: false,
      height: undefined,
      left: undefined,
      width: undefined,
      top: undefined,
      scrollTop: undefined
    }
  },
  mounted() {
    this.scrollTop = this.topScroll().top
    this.windowScrollHandler = this._windowScrollHandler.bind(this)
    window.addEventListener('scroll', this.windowScrollHandler)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.windowScrollHandler)
  },
  methods: {
    topScroll() {
      const { top, height } = this.$refs.sticky.getBoundingClientRect()
      return { top: top + window.scrollY, height }
    },
    _windowScrollHandler() {
      const scrollY = window.scrollY
      if (scrollY < this.scrollTop - this.distance) {
        this.height = undefined
        this.left = undefined
        this.width = undefined
        this.top = undefined
        this.sticky = false
      } else {
        this.height = this.topScroll().height + 'px'
        const { left, width } = this.$refs.wrapper.getBoundingClientRect()
        this.left = left + 'px'
        this.width = width + 'px'
        this.top = this.distance + 'px'
        this.sticky = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.gulu-sticky {
  &.sticky {
    position: fixed;
    top: 0;
  }
}
</style>
