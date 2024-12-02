<template>
  <div
    class="question-title text-center"
  >
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'QuestionTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>
<style scoped>
.question-title {
  padding: 0 20px;
  overflow: hidden;
}
.question-title h2 {
  margin: 20px 0;
  font-size: 28px;
  color: #333;
  line-height: 48px;
  font-weight: bold;
}
</style>
