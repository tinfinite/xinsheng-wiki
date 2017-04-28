<style lang="less">
  .wiki-config {
    .title, .sub-title {
      padding: 30px;
      text-align: center;
    }
    .login-con {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);

      .login {
        width: 300px;
        height: 300px;
        border: 1px solid #ccc;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -150px;
        margin-top: -150px;
        z-index: 9999;

        label {
          display: block;
          width: 100%;
          padding: 10px 20px;
          margin-top: 10px;
          color: #333;
          font-weight: 700;
        }
        input {
          width: 240px;
          height: 26px;
          padding: 6px 12px;
          margin-left: 18px;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: #555;
        }

        .sign-in {
          width: 266px;
          height: 40px;
          display: block;
          font-size: 18px;
          text-align: center;
          line-height: 30px;
          margin: 40px auto;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    }
    .author-list {
      width: 400px;
      margin: 50px auto;

      .list-con {
        height: 110px;
        overflow: hidden;

        .git-link {
          margin-left: 30px;
        }
      }

      .more {
        height: auto;
      }
      .show-more {
        float: right;
        color: #bbb;
      }
    }
    .add-author {
      width: 400px;
      margin: 20px auto;
      label {
        display: block;
        width: 100%;
        margin-top: 30px;
      }
      input {
        width: 300px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: #555;
      }
      button {
        width: 80px;
        height: 30px;
      }
    }
  }
</style>
<template>
	<div class="wiki-config">
    <h2 class="title">wiki配置</h2>
    <div class="login-con" v-show="showLogin">
      <div class="login">
        <label>用户名：</label>
        <input type="text" v-model="userName"></input>
        <label>密&nbsp;&nbsp;&nbsp;码：</label>
        <input type="password" v-model="passWord"></input>
        <button class="sign-in" @click="signIn">登录</button>
      </div>
    </div>
    <div class="author-list">
      <div class="list-con" :class="{ 'more': isShowMore }">
        <div class="item" v-for="item in 8">
          <span class="author">张军祥</span><span class="git-link">git@github.com:tinfinite/saas-h5-act.git</span>
        </div>
      </div>
      <span v-show="!isShowMore" class="show-more" @click="isShowMore = true">展开全部</span>
    </div>
    <h4 class="sub-title">添加新作者</h4>
    <div class="add-author">
      <label>作者:</label>
      <input type="text" v-model="author" placeholder=" 请输入作者名字~"></input>
      <label>git项目地址:</label>
      <input type="text" v-model="gitUrl" placeholder=" 请输入书籍关联的git项目的https地址~"></input>
      <button @click="addWiki">添加</button>
    </div>
	</div>
</template>
<script>
  import Request from '../../utils/request'
  import Cookie from '../../utils/cookie'
  export default {
    name: 'config',
    data () {
      return {
        userName: '',
        passWord: '',
        author: '',
        gitUrl: '',
        showLogin: false,
        isShowMore: false
      }
    },
    created () {
      let token = Cookie.getCookie('token')
      if (!token) {
        this.showLogin = true
      }
    },
    methods: {
      signIn () {
        let self = this
        if (!self.userName || !self.passWord) {
          window.alert('账号密码不能为空')
          return
        }
        Request.post({
          url: 'http://7efcf792.ngrok.io/api/login',
          data: {
            username: self.userName,
            password: self.passWord
          }
        }, (res) => {
          Cookie.setCookie('token', res.result, 'xinsheng-wiki.com', 10)
          self.showLogin = false
        }, (err) => {
          console.log('err', err)
        })
      },
      addWiki () {
        let self = this
        Request.post({
          url: 'http://7efcf792.ngrok.io/api/add',
          headers: {
            'Authorization': Cookie.getCookie('token')
          },
          data: {
            author: self.author,
            url: self.gitUrl
          }
        }, (res) => {
          console.log('success', res)
        }, (err) => {
          console.log('err', err)
        })
      }
    }
  }
</script>
