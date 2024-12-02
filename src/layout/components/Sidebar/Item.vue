<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  render(h, context) {
    const { title, icon, showIcon } = context.props
    const vnodes = []
    if (icon && showIcon) {
      vnodes.push(<i class={[icon, 'sub-el-icon']} />)
    }
    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
