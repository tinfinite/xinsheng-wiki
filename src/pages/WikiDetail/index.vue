<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }
  .wiki-detail {
    min-width: 1000px; 
    .header {
      padding: 20px 50px;
      border-bottom: 1px solid #ccc;
    }
    .nav {
      float: left;
      width: 12%;
      min-height: 100vh;
      padding: 2%;
      border-right: 1px solid #ccc;
    }

    .content {
      float: right;
      width: 76%;
      padding: 2%;
      min-height: 100vh;
    }
  }
</style>
<template>
  <div class="wiki-detail">
    <p class="header">新生大学-wiki</p>
    <wiki-nav :nav="nav"></wiki-nav>
    <wiki-content></wiki-content>
  </div>
</template>
  
<script>
import wikiNav from '../../components/Nav'
import wikiContent from '../../components/Content'
import Request from '../../utils/request'

export default {
  name: 'detail',
  data () {
    return {
      nav: ''
    }
  },
  components: {
    wikiNav,
    wikiContent
  },
  created () {
    let wid = this.$route.query.wid
    this.getWikiDetail(wid)
  },
  watch: {
    nav (val) {
      console.log(val)
      let reg = new RegExp('\\((.| )+?\\)', 'igm')
      let links = val.match(reg)
      for (let i of links) {
        console.log(i)
      }
    }
  },
  methods: {
    getWikiDetail (wid) {
      let self = this
      Request.get({
        url: 'http://7efcf792.ngrok.io/api/repos/' + wid + '/TOC.md'
      }, (res) => {
        self.nav = res
      }, (err) => {
        console.log('fail', err)
      })
    }
  }
}
</script>
