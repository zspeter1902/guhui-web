<template>
  <component :is="useComponent" :key="current" :code="code" />
</template>

<script>
export default {
  components: {
    Tab2: () => import('./Tab2.vue'),
    Tab3: () => import('./Tab3.vue'),
    Tab4: () => import('./Tab4.vue'),
    Tab5: () => import('./Tab5.vue'),
    Tab6: () => import('./Tab6.vue'),
    Tab7: () => import('./Tab7.vue'),
    Tab10: () => import('./Tab10.vue'),
    Tab11: () => import('./Tab11.vue')
  },
  props: {
    current: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    }
  },
  computed: {
    type({ $route }) {
      return $route.params.type
    },
    useComponent({ current }) {
      const o = {
        '电商平台': 'Tab2',
        '国际物流': 'Tab3',
        '跨境结算': 'Tab4',
        '跨境金融': 'Tab5',
        '税务服务': 'Tab6',
        '知识产权': 'Tab7',
        '统计分析': 'Tab10',
        '跨境通关': 'Tab11'
      }
      return o[current] || 'Tab1'
    }
  }
}
</script>
