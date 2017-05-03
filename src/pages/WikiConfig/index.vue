<style lang="less">
  .wiki-config {
    height: 100vh;
    background-color: #eee;
    .title {
      margin: 0;
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
          color: #aaa;
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
    .add-author {
      width: 400px;
      padding: 30px;
      margin: 15vh auto;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: #fff;

      label {
        display: block;
        width: 100%;
        margin-top: 30px;
      }
      input {
        width: 400px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: #555;
      }
      button {
        margin-top: 30px;
        width: 400px;
        height: 38px;
        border: 1px solid rgba(27,31,35,0.2);
        border-radius: 4px;
        color: #fff;
        background-color: #34d058;
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
        <input type="password" v-model="passWord"></input>
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
        showLogin: false
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
          url: 'http://localhost:8000/api/login',
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
        if (!self.author || !self.gitUrl) {
          window.alert('名字和项目地址不能为空')
          return
        }
        Request.post({
          url: 'http://localhost:8000/api/add',
          headers: {
            'Authorization': Cookie.getCookie('token')
          },
          data: {
            author: self.author,
            url: self.gitUrl
          }
        }, (res) => {
          if (res.statusCode === 0) {
            Cookie.delCookie('token', '/', 'xinsheng-wiki.com')
            if (window.confirm('登录信息失效，请重新登录！')) {
              window.location.reload()
            }
            return
          }
          console.log('success', res)
          window.alert('添加成功！')
        }, (err) => {
          console.log('err', err)
        })
      }
    }
  }
</script>
