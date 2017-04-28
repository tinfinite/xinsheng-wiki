<style lang='less'>
  .nav {
    min-width: 150px;

    ul {
      list-style: none;
      text-decoration: none;

      ul {
        margin-left: 20px;
      }

      a {
        display: block;
        text-align: left;
        text-decoration: none;
        width: auto;
        color: black;
        white-space: nowrap;
        line-height: 2.4em;
        text-shadow: 1px 1px 0 white;
        border-radius: 1px;
      }
      a:hover {
        position: relative;
        background-color: #eee;
        box-shadow: 0 0 2px #ccc;
      }
      a:focus {
        outline: 0;
      }
    }
  }
</style>
<template>
  <div class="nav" v-html="str">
  </div>
</template>

<script>
import MarkdownIt from 'zjx-markdown-it'

export default {
  name: 'nav',
  props: {
    nav: {
      type: String,
      required: true
    }
  },
  watch: {
    nav (val) {
      console.log(val)
    },
    str (val) {
      console.log(val)
    }
  },
  created () {
    this.str = MarkdownIt().set({
      html: true,
      breaks: false
    }).render(this.nav)
  }
}
</script>
