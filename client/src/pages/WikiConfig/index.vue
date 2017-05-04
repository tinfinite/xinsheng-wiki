<style lang="less">
  .wiki-config {
    height: 100vh;
    background-color: #eee;
    .title {
      margin: 0;
      padding: 15vh;
      min-width: 160px;
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
        padding: 20px;
        border: 1px solid #ccc;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -170px;
        margin-top: -170px;
        z-index: 9999;

        label {
          display: block;
          width: 240px;
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
          color: #333;
        }

        .sign-in {
          width: 266px;
          height: 40px;
          display: block;
          font-size: 18px;
          text-align: center;
          line-height: 30px;
          margin: 40px auto;
          border: 1px solid rgba(27,31,35,0.2);
          border-radius: 5px;
          background-color: #34d058;

          &:active, &:hover {
            background-color: #28a745;
          }
        }
      }
    }
    .add-author {
      width: 400px;
      padding: 40px;
      margin: 0 auto;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;

      label {
        display: block;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 15px;
      }
      input {
        width: 400px;
        height: 30px;
        padding: 2px;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: #555;
      }

      input::-webkit-input-placeholder { 
        color: #aaa;
        font-size: 12px;
      }
      input::-moz-placeholder {
        color:  #aaa;
        font-size: 12px;
      }
      input::-moz-placeholder {
        color:  #aaa;
        font-size: 12px;
      }
      input::-ms-input-placeholder {
        color: #aaa;
        font-size: 12px;
      }

      button {
        margin-top: 40px;
        width: 404px;
        height: 38px;
        border: 1px solid rgba(27,31,35,0.2);
        border-radius: 4px;
        color: #fff;
        background-color: #34d058;

        &:active, &:hover {
          background-color: #28a745;
        }
      }
    }
  }
</style>
<template>
  <div class="wiki-config">
    <h2 class="title">wiki 关联配置</h2>
    <div class="login-con" v-show="showLogin">
      <div class="login">
        <label>用户名：</label>
        <input type="text" v-model="userName"></input>
        <label>密&nbsp;&nbsp;&nbsp;码：</label>
        <input type="password" v-model="passWord" @keydown="keyDown($event)"></input>
        <button class="sign-in" @click="signIn">登录</button>
      </div>
    </div>
    <div class="add-author">
      <label>作者:</label>
      <input type="text" v-model="author" placeholder=" 请输入作者名字~"></input>
      <label>git项目地址:</label>
      <input type="text" v-model="gitUrl" placeholder=" 请输入书籍关联的git项目的https地址~"></input>
      <button @click="addWiki">添加到书籍列表</button>
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
        rqStatus: true
      }
    },
    created () {
      let token = Cookie.getCookie('wiki_token')
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
          url: 'http://localhost:8000/api/login',
          data: {
            username: self.userName,
            password: self.passWord
          }
        }, (res) => {
          if (res.statusCode === 1) {
            Cookie.setCookie('wiki_token', res.result, 'wiki.xinshengdaxue.com', 10)
            self.showLogin = false
          } else {
            window.alert('账号或密码错误！')
          }
        }, (err) => {
          console.log('err', err)
        })
      },
      addWiki () {
        let self = this
        if (!self.rqStatus) {
          window.alert('处理中，请稍后！')
          return
        }
        if (!self.author || !self.gitUrl) {
          window.alert('名字和项目地址不能为空')
          return
        }
        self.rqStatus = false
        Request.post({
          url: 'http://localhost:8000/api/add',
          headers: {
            'Authorization': Cookie.getCookie('wiki_token')
          },
          data: {
            author: self.author,
            url: self.gitUrl
          }
        }, (res) => {
          if (res.statusCode === 401) {
            Cookie.delCookie('wiki_token', '/', 'wiki.xinshengdaxue.com')
            if (window.confirm('登录信息失效，请重新登录！')) {
              window.location.reload()
            }
            return
          }
          if (res.statusCode === 400) {
            window.alert('添加失败！')
            return
          }
          console.log('success', res)
          self.rqStatus = true
          window.alert('添加成功！')
        }, (err) => {
          console.log('err', err)
        })
      },
      keyDown (e) {
        console.log(e.keyCode)
        if (e.keyCode === 13) {
          this.signIn()
        }
      }
    }
  }
</script>
