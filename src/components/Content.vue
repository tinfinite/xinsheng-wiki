<style lang='less'>
</style>
<template>
  <div class="content" v-html="content">
  </div>
</template>

<script>
import MarkdownIt from 'zjx-markdown-it'

export default {
  name: 'content',
  data () {
    return {
      content: ''
    }
  },
  created () {
    this.content = '### 第一篇内容'
    this.content = MarkdownIt().set({
      html: true,
      breaks: true
    }).render(this.content)
  }
}
</script>
