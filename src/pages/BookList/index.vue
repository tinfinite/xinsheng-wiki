<style lang="less">
  .book-list {
    .title {
      padding: 30px 50px;
    }
    .list-con {
      padding: 50px;
      .book-item {
        width: 200px;
        height: 100px;
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 10px;
        background-color: #eee;
        overflow: hidden;
        position: relative;
        transition: all .3s ease-in-out;

        .book-pic {
          width: 50px;
          height: 50px;
          position: absolute;
          top: 25px;
          left: 20px;
          border-radius: 50%;
          overflow: hidden;
        }
        .book-title {
          position: absolute;
          top: 20px;
          left: 80px;
          font-size: 14px;
        }
        .description {
          color: #fff;
          font-size: 14px;
          padding: 10px 15px;
          position: absolute;
          top: 100px;
          left: 0;
        }
      }
      .book-item:hover {
        transition: all .5s ease-in-out;
        background-color: #666;

        .description {
          top: 0;
          transition: all .5s ease-in-out;
        }
      }
    }
  }
</style>
<template>
  <div class="book-list">
    <h2 class="title">文档列表</h2>
    <div class="list-con">
      <div class="book-item" v-for="item in wikiList" @click="toDetail(item)" v-if="item.config">
        <div class="book-pic">
          <img :src="item.config.cover || 'http://o4a7cbihz.qnssl.com/cover/15a7cea0-948f-46ad-aef4-d4b1f9c80d0a?imageView2/5/w/320/h/320'">
          <img src="http://o4a7cbihz.qnssl.com/cover/15a7cea0-948f-46ad-aef4-d4b1f9c80d0a?imageView2/5/w/50/h/50">
        </div>
        <span class="book-title">{{ item.config.name || '没有书名' }}</span>
        <span class="description">{{ item.config.description || '书籍简介' }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Request from '../../utils/request'

export default {
  name: 'book-list',
  data () {
    return {
      wikiList: []
    }
  },
  created () {
    this.getWikiList()
  },
  methods: {
    getWikiList () {
      let self = this
      Request.get({
        url: 'http://7efcf792.ngrok.io/api/wiki'
      }, (res) => {
        self.wikiList = res.result
      }, (err) => {
        console.log('fail', err)
      })
    },
    toDetail (item) {
      this.$router.push({name: 'WikiDetail', query: { wid: item._id }})
    }
  }
}
</script>
