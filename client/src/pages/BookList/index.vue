<style lang="less">
  #app, body, html {
    margin: 0;
    padding: 0;
  }
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
        .book-author {
          position: absolute;
          top: 60px;
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
          <img :src="item.config.cover || '//o4a7cbihz.qnssl.com/cover/7b5c8855-9a35-4c59-9432-7b3c0788f50c?imageView2/5/w/50/h/50'" @load="ckeckImg($event)">
        </div>
        <span class="book-title">{{ item.config.name }}</span>
        <span class="book-author">{{ item.author }}</span>
        <span class="description">{{ item.config.description }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Request from '../../utils/request'
import PREFIX from '../../utils/config'
import $ from 'jquery'

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
        url: '/api/wiki'
      }, (res) => {
        self.wikiList = res.result
      }, (err) => {
        console.log('fail', err)
      })
    },
    toDetail (item) {
      window.location.href = PREFIX + '/api/repos/' + item._id + '/_book/index.html'
    },
    ckeckImg (event) {
      let target = event.target
      let width = parseInt($(target).css('width'))
      let height = parseInt($(target).css('height'))
      if (width <= height) {
        $(target).css('width', '100%')
      } else {
        $(target).css('height', '100%')
      }
    }
  }
}
</script>
